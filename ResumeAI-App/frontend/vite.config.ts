// frontend/vite.config.ts
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
        '/builder', '/ats', '/templates', '/interview', 
        '/github', '/email', '/privacy', '/terms', '/refund'
      ],
      generateRobotsTxt: true,
      // Isko default rehne do, Netlify dist folder handle kar leta hai
    }),
  ],
  server: {
    // Ye local development ke liye hai
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
    // ✅ GOOGLE LOGIN FIX: Ye headers wapas chahiye warna login popup block hoga
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  // ✅ PRODUCTION FIX: Build ke waqt base URL sahi rakho
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})