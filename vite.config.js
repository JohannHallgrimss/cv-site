import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cv-site/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor.react';
            if (id.includes('framer-motion')) return 'vendor.motion';
            if (id.includes('@heroicons')) return 'vendor.icons';
            return 'vendor';
          }
        }
      }
    }
  }
})