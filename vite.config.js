import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Use a production base for GH Pages, but '/' during dev so Vite HMR/ping works correctly
  base: mode === 'production' ? '/cv-site/' : '/',
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
}))