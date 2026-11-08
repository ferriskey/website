import react from '@astrojs/react'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'
import { siteCard } from '@explainer/thumbnail'
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
            card: siteCard('en'),
          },
          {
            path: '/thumbnails/fr',
            title: 'FerrisKey',
            description: 'Un IAM moderne conçu pour les systèmes distribués',
            card: siteCard('fr'),
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
