import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';
import reactI18next from 'astro-react-i18next';
// https://astro.build/config
export default defineConfig({
  integrations: [react(), partytown(), reactI18next({
    defaultLocale: "en",
    locales: ["en", "ja"],
  })],

  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  }
});