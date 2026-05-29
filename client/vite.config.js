import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['pdfjs-dist']
  },
  build: {
    target: 'esnext',
    // This ensures the worker file is copied correctly to your build folder
    assetsInlineLimit: 0 
  }
})