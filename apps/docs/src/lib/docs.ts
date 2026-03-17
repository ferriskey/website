import type { CollectionEntry } from 'astro:content'

export interface MetaFile {
  title?: string
  icon?: string
  order?: number
  type?: 'group' | 'category'
}

export interface NavItem {
  type: 'page' | 'category' | 'group'
  title: string
  slug: string
  href: string
  icon?: string
  order: number
  children?: NavItem[]
}

export interface ProjectInfo {
  name: string
  versions: string[]
  hasVersioning: boolean
  icon?: string
}

export interface DocsContext {
  project: string
  version: string
  locale: string
  projects: ProjectInfo[]
  locales: string[]
}

interface ParsedPath {
  project: string
  version: string
  locale: string
  segments: string[]
}

export function parsePath(id: string): ParsedPath {
  const parts = id.replace(/\.mdx$/, '').split('/')
  return {
    project: parts[0],
    version: parts[1],
    locale: parts[2],
    segments: parts.slice(3),
  }
}

export function buildHref(entry: CollectionEntry<'docs'>): string {
  if (entry.data.permalink) {
    return entry.data.permalink
  }

  const { project, version, locale, segments } = parsePath(entry.id)
  return buildHrefFromParts(project, version, locale, segments)
}

export function buildHrefFromParts(
  project: string,
  version: string,
  locale: string,
  segments: string[],
): string {
  const versionSegment = version === 'default' ? '' : `/${version}`
  return `/${locale}/${project}${versionSegment}/${segments.join('/')}`
}

/** Extract all unique projects with their versions from the collection */
export function getProjectsInfo(entries: CollectionEntry<'docs'>[], metaFiles?: Record<string, MetaFile>): ProjectInfo[] {
  const projectMap = new Map<string, Set<string>>()

  for (const entry of entries) {
    const { project, version } = parsePath(entry.id)
    if (!projectMap.has(project)) {
      projectMap.set(project, new Set())
    }
    projectMap.get(project)!.add(version)
  }

  return Array.from(projectMap.entries()).map(([name, versions]) => ({
    name,
    versions: Array.from(versions).sort(),
    hasVersioning: versions.size > 1 || !versions.has('default'),
    icon: metaFiles?.[name]?.icon,
  }))
}

/** Extract all unique locales from the collection */
export function getLocales(entries: CollectionEntry<'docs'>[]): string[] {
  const locales = new Set<string>()
  for (const entry of entries) {
    locales.add(parsePath(entry.id).locale)
  }
  return Array.from(locales).sort()
}

/** Build the full docs context for the current page */
export function buildDocsContext(
  entries: CollectionEntry<'docs'>[],
  currentEntry: CollectionEntry<'docs'>,
  metaFiles?: Record<string, MetaFile>,
): DocsContext {
  const { project, version, locale } = parsePath(currentEntry.id)
  return {
    project,
    version,
    locale,
    projects: getProjectsInfo(entries, metaFiles),
    locales: getLocales(entries),
  }
}

/**
 * Build a URL to switch project/version/locale while preserving the current page path.
 * Falls back to the first page of the target if the equivalent page doesn't exist.
 */
export function buildSwitchHref(
  entries: CollectionEntry<'docs'>[],
  current: { project: string; version: string; locale: string; segments: string[] },
  target: { project?: string; version?: string; locale?: string },
): string {
  const newProject = target.project ?? current.project
  const newVersion = target.version ?? current.version
  const newLocale = target.locale ?? current.locale

  // Try to find the same page in the new context
  const targetEntry = entries.find((e) => {
    const parsed = parsePath(e.id)
    return (
      parsed.project === newProject &&
      parsed.version === newVersion &&
      parsed.locale === newLocale &&
      parsed.segments.join('/') === current.segments.join('/')
    )
  })

  if (targetEntry) {
    return buildHref(targetEntry)
  }

  // Fallback: try same locale, different page
  const fallback = entries.find((e) => {
    const parsed = parsePath(e.id)
    return (
      parsed.project === newProject &&
      parsed.version === newVersion &&
      parsed.locale === newLocale
    )
  })

  if (fallback) {
    return buildHref(fallback)
  }

  // Last resort: fallback to English
  const enFallback = entries.find((e) => {
    const parsed = parsePath(e.id)
    return parsed.project === newProject && parsed.version === newVersion && parsed.locale === 'en'
  })

  return enFallback ? buildHref(enFallback) : '/'
}

export function buildNavTree(
  entries: CollectionEntry<'docs'>[],
  metaFiles: Record<string, MetaFile>,
  project: string,
  version: string,
  locale: string,
): NavItem[] {
  const filtered = entries.filter((entry) => {
    const parsed = parsePath(entry.id)
    return parsed.project === project && parsed.version === version && parsed.locale === locale
  })

  const root: NavItem[] = []
  const categoryMap = new Map<string, NavItem>()

  for (const entry of filtered) {
    const { segments } = parsePath(entry.id)
    let currentLevel = root
    let currentPath = `${project}/${version}/${locale}`

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      const isLast = i === segments.length - 1

      if (isLast) {
        currentLevel.push({
          type: 'page',
          title: entry.data.title,
          slug: entry.id,
          href: buildHref(entry),
          icon: entry.data.icon,
          order: entry.data.order ?? Infinity,
        })
      } else {
        currentPath += `/${segment}`

        if (!categoryMap.has(currentPath)) {
          const meta = metaFiles[currentPath]
          const category: NavItem = {
            type: meta?.type === 'group' ? 'group' : 'category',
            title: meta?.title ?? formatTitle(segment),
            slug: currentPath,
            href: '',
            icon: meta?.icon,
            order: meta?.order ?? Infinity,
            children: [],
          }
          categoryMap.set(currentPath, category)
          currentLevel.push(category)
        }

        currentLevel = categoryMap.get(currentPath)!.children!
      }
    }
  }

  sortNavItems(root)
  return root
}

function sortNavItems(items: NavItem[]) {
  items.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order
    return a.title.localeCompare(b.title)
  })
  for (const item of items) {
    if (item.children) {
      sortNavItems(item.children)
    }
  }
}

function formatTitle(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function getFlatEntries(
  entries: CollectionEntry<'docs'>[],
  project: string,
  version: string,
  locale: string,
): CollectionEntry<'docs'>[] {
  return entries
    .filter((entry) => {
      const parsed = parsePath(entry.id)
      return parsed.project === project && parsed.version === version && parsed.locale === locale
    })
    .sort((a, b) => {
      const orderA = a.data.order ?? Infinity
      const orderB = b.data.order ?? Infinity
      if (orderA !== orderB) return orderA - orderB
      return a.data.title.localeCompare(b.data.title)
    })
}

export function getPagination(
  currentHref: string,
  flatEntries: CollectionEntry<'docs'>[],
): { prev: { title: string; href: string } | null; next: { title: string; href: string } | null } {
  const hrefs = flatEntries.map((e) => buildHref(e))
  const index = hrefs.indexOf(currentHref)

  return {
    prev: index > 0 ? { title: flatEntries[index - 1].data.title, href: hrefs[index - 1] } : null,
    next:
      index < flatEntries.length - 1
        ? { title: flatEntries[index + 1].data.title, href: hrefs[index + 1] }
        : null,
  }
}

export interface BreadcrumbItem {
  title: string
  href?: string
}

export function getBreadcrumb(navItems: NavItem[], currentPath: string): BreadcrumbItem[] {
  const result: BreadcrumbItem[] = []

  function walk(items: NavItem[]): boolean {
    for (const item of items) {
      if (item.type === 'page' && item.href === currentPath) {
        result.push({ title: item.title })
        return true
      }
      if ((item.type === 'category' || item.type === 'group') && item.children) {
        if (walk(item.children)) {
          result.unshift({ title: item.title })
          return true
        }
      }
    }
    return false
  }

  walk(navItems)
  return result
}

export function loadMetaFiles(
  globs: Record<string, unknown>,
): Record<string, MetaFile> {
  const result: Record<string, MetaFile> = {}

  for (const [path, mod] of Object.entries(globs)) {
    const meta = (mod as { default?: MetaFile }).default ?? (mod as MetaFile)
    const match = path.match(/content\/docs\/(.+)\/_meta\.json$/)
    if (match) {
      result[match[1]] = meta
    }
  }

  return result
}
