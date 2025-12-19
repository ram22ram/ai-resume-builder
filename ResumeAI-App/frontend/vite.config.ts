// frontend/vite.config.ts (Updated)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://resume-ai.co.in',
      dynamicRoutes: [
        '/builder',
        '/ats',
        '/templates',
        '/interview',
        '/github',
        '/email',
        '/privacy',
        '/terms',
        '/refund'
      ],
      generateRobotsTxt: true,
    }),
  ],
  server: {
    proxy: {
      '/.netlify': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
      // Keep the API proxy. It works with the backend's cors() middleware.
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
    // REMOVE the 'headers' section that sets COOP/COEP policies.
  },
})