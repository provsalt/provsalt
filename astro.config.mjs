import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';
import reactI18next from 'astro-react-i18next';
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
// https://astro.build/config
export default defineConfig({
  site: "https://raymond.moe",
  trailingSlash: "ignore",
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },

  integrations: [mdx(), react(), partytown(), reactI18next({
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
      imagesConfig: {
        sizes: [320, 480, 640, 750, 828, 960, 1200, 1600, 2048, 2560, 3200, 3840],
      },
      devImageService: "sharp",
      isr: {
        expiration: 60 * 60 * 24,
        exclude: ["/api/photos"],
      }
    }
  ),
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
});
