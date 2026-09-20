import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import AstroPWA from '@vite-pwa/astro';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ibrahimturan.dev',
  output: 'static',
  integrations: [
    react(),
    AstroPWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      workbox: {
        navigateFallback: null,
      },
      manifest: {
        name: 'ibrahimturan',
        short_name: 'ibrahimturan',
        description:
          'Full-stack engineer with 6+ years of experience building scalable web applications and modern user interfaces.',
        theme_color: '#12161d',
        background_color: '#12161d',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  server: {
    port: 8080,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
