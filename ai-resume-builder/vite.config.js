import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- YEH NAYA CODE HAI ---
  // Netlify Dev server ke liye proxy setup
  server: {
    proxy: {
      '/.netlify': {
        target: 'http://localhost:8888', // Netlify server ka port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // -------------------------
})