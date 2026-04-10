import react from '@astrojs/react'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: process.env.PUBLIC_WEBSITE_URL || undefined,
  integrations: [
    react(),
    thumbnailIntegration({
      appName: 'FerrisKey',
      primaryColor: '#F97316',
      content: {
        type: 'static',
        pages: [
          {
            path: '/',
            title: 'FerrisKey',
            description: 'A modern IAM built for distributed systems',
          },
          {
            path: '/thumbnails/fr',
            title: 'FerrisKey',
            description: 'A modern IAM built for distributed systems',
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envDir: '../../',
    server: {
      allowedHosts: ['unlimitedly-uncompletable-addilyn.ngrok-free.dev']
    }
  },
})
