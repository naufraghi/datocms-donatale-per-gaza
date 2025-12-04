import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  security: {
    checkOrigin: false,
  },

  env: {
    schema: {
      DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),

      DATOCMS_CMA_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),
      SECRET_API_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
      }),
      SIGNED_COOKIE_JWT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FORWARD_EMAIL_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      ADMIN_EMAIL: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
    validateSecrets: true,
  },

  integrations: [tailwind()],
  adapter: netlify(),
});
