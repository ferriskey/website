import type { AstroIntegration } from 'astro'
import matter from 'gray-matter'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { generateThumbnail } from './generator'
import { renderThumbnail, renderThumbnailToFile } from './renderer'

export interface ThumbnailConfig {
  appName: string
  primaryColor?: string
  content:
    | { type: 'collection'; dir: string }
    | {
        type: 'static'
        pages: Array<{ path: string; title: string; description?: string }>
      }
}

interface ContentEntry {
  filePath: string
  title: string
  description?: string
  shortDescription?: string
  /** URL pathname this entry maps to (without leading slash) */
  urlPath: string
}

/**
 * Scan a content directory and build a map of URL paths to content metadata.
 * Supports both flat structures (blog posts) and nested structures (docs with project/version/locale).
 */
async function buildContentIndex(
  contentDir: string,
): Promise<Map<string, ContentEntry>> {
  const entries = new Map<string, ContentEntry>()
  const allFiles = await readdir(contentDir, { recursive: true })
  const mdxFiles = allFiles.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))

  for (const file of mdxFiles) {
    const filePath = join(contentDir, file)
    if (file.startsWith('_') || file.includes('/_')) continue

    try {
      const fileContent = await readFile(filePath, 'utf8')
      const { data } = matter(fileContent)

      // Derive URL path from file path by stripping extension
      const urlPath = file
        .replace(/\.(mdx|md)$/, '')
        .replace(/\/index$/, '')

      const entry: ContentEntry = {
        filePath,
        title: data.title ?? urlPath.split('/').pop() ?? '',
        description: data.description,
        shortDescription: data.short_description,
        urlPath,
      }

      // Store by the raw file-based path
      entries.set(urlPath, entry)

      // If this has a permalink, also index by that
      if (data.permalink) {
        const permalink = data.permalink.replace(/^\//, '').replace(/\/$/, '')
        entries.set(permalink, entry)
      }
    } catch {
      // Skip files that can't be read
    }
  }

  return entries
}

export function thumbnailIntegration(config: ThumbnailConfig): AstroIntegration {
  // Lazily built content index, shared between dev and build
  let contentIndex: Map<string, ContentEntry> | null = null

  async function getContentIndex(): Promise<Map<string, ContentEntry>> {
    if (!contentIndex && config.content.type === 'collection') {
      const contentDir = join(process.cwd(), config.content.dir)
      contentIndex = await buildContentIndex(contentDir)
    }
    return contentIndex ?? new Map()
  }

  return {
    name: '@explainer/thumbnail',
    hooks: {
      'astro:config:setup': ({ updateConfig, logger }) => {
        const cache = new Map<string, Buffer>()

        updateConfig({
          vite: {
            plugins: [
              {
                name: '@explainer/thumbnail-dev',
                configureServer(server) {
                  server.middlewares.use(async (req, res, next) => {
                    if (!req.url?.endsWith('/thumbnail.png')) {
                      return next()
                    }

                    const cached = cache.get(req.url)
                    if (cached) {
                      res.setHeader('Content-Type', 'image/png')
                      res.setHeader('Cache-Control', 'no-cache')
                      res.end(cached)
                      return
                    }

                    try {
                      const { headline, title, description } = resolvePageMeta(
                        config,
                        req.url,
                        await getContentIndex(),
                      )

                      const svg = await generateThumbnail({
                        headline,
                        title,
                        description,
                        primaryColor: config.primaryColor,
                      })

                      const png = await renderThumbnail(svg)

                      cache.set(req.url, png)
                      logger.info(`Dev thumbnail generated for ${req.url}`)

                      res.setHeader('Content-Type', 'image/png')
                      res.setHeader('Cache-Control', 'no-cache')
                      res.end(png)
                    } catch (error) {
                      logger.warn(`Failed to generate dev thumbnail for ${req.url}: ${error}`)
                      next()
                    }
                  })
                },
              },
            ],
          },
        })
      },

      'astro:build:done': async ({ dir, pages, logger }) => {
        const outputDir = dir.pathname
        const index = await getContentIndex()

        if (config.content.type === 'static') {
          for (const page of config.content.pages) {
            try {
              const svg = await generateThumbnail({
                title: page.title,
                description: page.description,
                primaryColor: config.primaryColor,
              })
              const pagePath = page.path === '/' ? '' : page.path.replace(/^\//, '')
              const outputPath = join(outputDir, pagePath, 'thumbnail.png')
              await renderThumbnailToFile(svg, outputPath)
              logger.info(`Thumbnail generated for ${page.path}`)
            } catch (error) {
              logger.warn(`Failed to generate thumbnail for ${page.path}: ${error}`)
            }
          }
          return
        }

        // Collection mode
        const tasks = pages.map((page) => async () => {
          const pathname = page.pathname.replace(/\/$/, '')
          if (!pathname) return

          try {
            const { headline, title, description } = resolveFromIndex(
              pathname,
              index,
              config.appName,
            )

            const svg = await generateThumbnail({
              headline,
              title,
              description,
              primaryColor: config.primaryColor,
            })

            const outputPath = join(outputDir, pathname, 'thumbnail.png')
            await renderThumbnailToFile(svg, outputPath)
            logger.info(`Thumbnail generated for ${pathname}`)
          } catch (error) {
            logger.warn(`Failed to generate thumbnail for ${pathname}: ${error}`)
          }
        })

        await Promise.all(tasks.map((task) => task()))
      },
    },
  }
}

interface PageMeta {
  headline?: string
  title: string
  description?: string
}

function resolvePageMeta(
  config: ThumbnailConfig,
  url: string,
  index: Map<string, ContentEntry>,
): PageMeta {
  if (config.content.type === 'static') {
    const pagePath = url.replace(/\/thumbnail\.png$/, '') || '/'
    const page = config.content.pages.find((p) => p.path === pagePath)
    return {
      title: page?.title ?? config.appName,
      description: page?.description,
    }
  }

  const pathname = url.replace(/\/thumbnail\.png$/, '').replace(/^\//, '')
  return resolveFromIndex(pathname, index, config.appName)
}

/**
 * Resolve page metadata from the content index.
 * Tries the pathname directly first, then tries all entries to find a match
 * (handles URL↔filesystem path mismatches like docs project/version/locale reordering).
 */
function resolveFromIndex(
  pathname: string,
  index: Map<string, ContentEntry>,
  appName: string,
): PageMeta {
  // Direct match (works for blog where URL path = file path)
  const direct = index.get(pathname)
  if (direct) {
    return {
      headline: appName,
      title: direct.title,
      description: direct.shortDescription ?? direct.description,
    }
  }

  // Fuzzy match: find entry whose urlPath segments are a subset/reordering of the pathname segments
  // This handles docs where URL is en/my-lib/api/reference but file is my-lib/default/en/api/reference
  const pathSegments = pathname.split('/')

  for (const [, entry] of index) {
    const entrySegments = entry.urlPath.split('/')

    // Check if the last N segments match (the actual content path portion)
    // and the pathname contains all entry segments
    if (entrySegments.length >= 2 && pathSegments.length >= 2) {
      // Compare trailing segments (the content-specific part)
      const entryTail = entrySegments.slice(-2).join('/')
      const pathTail = pathSegments.slice(-2).join('/')

      if (entryTail === pathTail) {
        return {
          headline: appName,
          title: entry.title,
          description: entry.shortDescription ?? entry.description,
        }
      }
    }
  }

  // Last resort: match just by the final segment
  const lastSegment = pathSegments[pathSegments.length - 1]
  for (const [, entry] of index) {
    const entryLast = entry.urlPath.split('/').pop()
    if (entryLast === lastSegment) {
      return {
        headline: appName,
        title: entry.title,
        description: entry.shortDescription ?? entry.description,
      }
    }
  }

  return {
    headline: appName,
    title: pathname.split('/').pop() ?? appName,
  }
}
