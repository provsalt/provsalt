import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';
import reactI18next from 'astro-react-i18next';
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
// https://astro.build/config
export default defineConfig({
  site: "https://raymond.moe",

  integrations: [react(), partytown(), reactI18next({
    defaultLocale: "en",
    locales: ["en", "ja"],
  }), sitemap({
    i18n: {
      defaultLocale: "en",
      locales: {
        en: "en",
        ja: "ja"
      }
    }
  })],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(
    {
      webAnalytics: {
        enabled: true,
      },
      imageService: true,
      devImageService: "sharp",
      isr: {
        expiration: 60 * 60 * 24,
      }
    }
  ),
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
});