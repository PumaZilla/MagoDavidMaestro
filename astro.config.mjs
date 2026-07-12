// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import indexNow from 'astro-indexnow';

// https://astro.build/config
export default defineConfig({
  site: 'https://magodavidmaestro.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-ES' },
      },
    }),
    indexNow({
      key: 'cdf5665bfab28219cf70a46f604ff1e0b4b0f398c9544d70b618fee932a6a5d3',
    }),
  ],
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
