import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';
import reactI18next from 'astro-react-i18next';
import sitemap from "@astrojs/sitemap";
// https://astro.build/config
export default defineConfig({
  site: "https://raymond.moe",
  integrations: [react(), partytown(), reactI18next({
    defaultLocale: "en",
    locales: ["en", "ja"],
  }), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  }
});