import { readFileSync } from 'node:fs'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import remarkDirective from 'remark-directive'
import { shikiConfig } from '@explainer/mdx/shiki'
import { remarkAutoImport } from '@explainer/mdx/remark-auto-import'
import { remarkDirectiveHandler } from '@explainer/mdx/remark-directive-handler'
import { remarkCodeBlocks } from '@explainer/mdx/remark-code-blocks'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'
import { remarkDocsLinks } from './src/plugins/remark-docs-links'

function loadRootEnv() {
  try {
    const content = readFileSync('../../.env', 'utf-8')
    const env: Record<string, string> = {}
    for (const line of content.split('\n')) {
      const match = line.match(/^\s*([\w.]+)\s*=\s*(.*)?\s*$/)
      if (match) env[match[1]] = match[2]?.replace(/^['"]|['"]$/g, '') ?? ''
    }
    return env
  } catch {
    return {}
  }
}

const env = loadRootEnv()

export default defineConfig({
  site: process.env.PUBLIC_BLOG_URL || env.PUBLIC_BLOG_URL,
  integrations: [
    react(),
    mdx({
      remarkPlugins: [
        remarkAutoImport,
        remarkCodeBlocks,
        remarkDirective,
        [remarkDocsLinks, { docsUrl: process.env.PUBLIC_DOCS_URL || env.PUBLIC_DOCS_URL }],
        remarkDirectiveHandler,
      ],
    }),
    thumbnailIntegration({
      appName: 'Blog',
      content: { type: 'collection', dir: './src/content/posts' },
       primaryColor: '#F97316',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envDir: '../../',
  },
  markdown: {
    shikiConfig,
  },
})
