import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Flavor Lab',
        short_name: 'FlavorLab',
        start_url: '/home',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/FlavorLab.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
