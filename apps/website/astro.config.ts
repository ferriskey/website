import react from '@astrojs/react'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'
import { siteCard, whyCard } from '@explainer/thumbnail'
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
          {
            path: '/why',
            title: 'Why an IAM?',
            description: 'Who are you, and what are you allowed to do?',
            card: whyCard('en'),
          },
          {
            path: '/thumbnails/fr/why',
            title: 'Pourquoi un IAM ?',
            description: "Qui es-tu, et qu'as-tu le droit de faire ?",
            card: whyCard('fr'),
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
