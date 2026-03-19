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

export default defineConfig({
  site: process.env.PUBLIC_DOCS_URL || undefined,
  devToolbar: { enabled: false },
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkAutoImport, remarkCodeBlocks, remarkDirective, remarkDirectiveHandler],
    }),
    thumbnailIntegration({
      appName: 'Docs',
      content: { type: 'collection', dir: './src/content/docs' },
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
