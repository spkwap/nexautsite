import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: '/nexautsite/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        offer: path.resolve(__dirname, 'offer.html'),
        projects: path.resolve(__dirname, 'projects.html'),
        career: path.resolve(__dirname, 'career.html'),
        contact: path.resolve(__dirname, 'contact.html'),
      }
    }
  },
  server: {
    port: 3000,
  }
})
