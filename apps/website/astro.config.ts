import react from '@astrojs/react'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: process.env.PUBLIC_WEBSITE_URL || undefined,
  integrations: [
    react(),
    thumbnailIntegration({
      appName: 'Explainer',
      content: {
        type: 'static',
        pages: [
          {
            path: '/',
            title: 'Explainer v2',
            description: 'Documentation boilerplate for developers.',
          },
          {
            path: '/thumbnails/fr',
            title: 'Explainer v2',
            description: 'Boilerplate de documentation pour les développeurs.',
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envDir: '../../',
  },
})
