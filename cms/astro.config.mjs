import node from '@astrojs/node';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import emdash, { local } from 'emdash/astro';
import { sqlite } from 'emdash/db';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    fallback: { tr: 'en' },
  },
  integrations: [
    react(),
    emdash({
      database: sqlite({ url: process.env.EMDASH_DATABASE_URL ?? 'file:./data.db' }),
      storage: local({
        directory: './uploads',
        baseUrl: '/_emdash/api/media/file',
      }),
    }),
  ],
});
