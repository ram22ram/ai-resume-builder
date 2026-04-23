// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  build: {
    emptyOutDir: false,
  },
  assetsInclude: ['**/*.lottie'],
  plugins: [
    react(),
    // ✅ SITEMAP — generates /sitemap.xml on every build for Google indexing
    Sitemap({
      hostname: 'https://resume-ai.co.in',
      dynamicRoutes: [
        '/',
        '/builder',
        '/ats',
        '/templates',
        '/interview',
        '/github',
        '/email',
        '/privacy',
        '/terms',
        '/refund',
        '/start',
      ],
      generateRobotsTxt: false, // We have our own robots.txt
    }),
  ],
  server: {
    // ⚠️ COOP/COEP removed from dev server — they break Google OAuth popup
    proxy: {
      '/.netlify': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  }
});