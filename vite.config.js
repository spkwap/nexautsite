import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import inject from 'vite-plugin-html-inject';

export default defineConfig({
  plugins: [
    tailwindcss(),
    inject(),
  ],
  appType: 'mpa',
  base: '/',
  // base: '/nexautsite/' albo base: './', zeby dzialalo na github pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'o-nas/index.html'),
        offer: path.resolve(__dirname, 'oferta/index.html'),
        projects: path.resolve(__dirname, 'projekty/index.html'),
        career: path.resolve(__dirname, 'kariera/index.html'),
        contact: path.resolve(__dirname, 'kontakt/index.html'),
        oferta: path.resolve(__dirname, 'oferta/index.html'),
        ofertaProjektowanie: path.resolve(__dirname, 'oferta/projektowanie/index.html'),
        ofertaPlc: path.resolve(__dirname, 'oferta/programowanie-plc/index.html'),
        ofertaRobotyka: path.resolve(__dirname, 'oferta/robotyka/index.html'),
        ofertaScada: path.resolve(__dirname, 'oferta/hmi-scada/index.html'),
      }
    }
  },
  server: {
    port: 3000,
  }
})