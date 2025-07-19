/* eslint-disable node/prefer-global/process */
import vue from '@vitejs/plugin-vue'
import { defineOrganization } from 'nuxt-schema-org/schema'

import './validate-env'
import { siteConfig } from './config/siteConfig'

const REDIRECT_INTRUDERS_GIF = 'https://i.imgur.com/1Ia9tTG.gif'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  colorMode: {
    fallback: 'dark',
    preference: 'dark',
  },

  compatibilityDate: '2025-03-12',

  css: ['~/assets/css/main.css'],

  devServer: {
    port: 9009,
  },

  devtools: { enabled: true },

  eslint: {
    config: {
      standalone: false,
    },
  },

  experimental: {
    typedPages: true,
  },

  extends: [
    './layers/core',
    './layers/db',
    './layers/email',
    './layers/auth',
    './layers/dashboard',
    './layers/payment',
    './layers/docs',
    './layers/blog',
    './layers/testimonials',
    './layers/waitlist',
  ],

  future: {
    // Nuxt 4 directory structure and features
    // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
    compatibilityVersion: 4,
  },

  hub: {
    blob: true,
    database: true,
    kv: true,
  },

  i18n: {
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    lazy: true,
    locales: [{
      code: 'de',
      file: 'de.json',
      name: 'Deutsch',
    }, {
      code: 'en',
      file: 'en.json',
      name: 'English',
    }],
    strategy: 'no_prefix',
  },

  image: {
    provider: 'ipx',
    providers: {
      customCloudflare: {
        options: {
          prodSiteURL: siteConfig.url,
        },
        provider: '~/providers/customCloudflare.ts',
      },
    },
  },

  llms: {
    description: siteConfig.description,
    domain: siteConfig.domain,
    title: siteConfig.name,
  },

  modules: [
    '@nuxt/ui-pro',
    '@nuxthub/core',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@polar-sh/nuxt',
    '@nuxtjs/i18n',
    'nuxt-umami',
    '@nuxt/content',
    'nuxt-security',
    '@nuxt/image',
    '@nuxt/fonts',
    'nuxt-llms',
  ],

  nitro: {
    cloudflare: {
      pages: {
        routes: {
          exclude: [
            // we know that the following pages are pre-rendered
            // see https://hub.nuxt.com/docs/recipes/pre-rendering#cloudflare-100-routes-limit
            '/docs/*',
            '/blog/*',
          ],
        },
      },
    },
    experimental: {
      // Enable Server API documentation within NuxtHub
      openAPI: true,
    },
    rollupConfig: {
      // @ts-expect-error - Rollup plugin type mismatch between versions
      plugins: [vue()], // see https://vuemail.net/getting-started/nuxt-nitro
    },
  },

  ogImage: {
    enabled: true,
    zeroRuntime: true, // see https://nuxtseo.com/docs/og-image/guides/zero-runtime
  },

  robots: {
    disallow: [
      '/admin',
    ],
  },

  routeRules: {
    /* eslint-disable perfectionist/sort-objects */
    '/': { prerender: true },
    '/blog': { prerender: true }, // individual blog posts are pre-rendered inside /blog component
    '/changelog': { prerender: true },
    '/contact': { prerender: true },
    '/dashboard/**': { ssr: false },
    '/docs': { prerender: true }, // individual docs pages are pre-rendered inside /docs component
    '/faq': { prerender: true },
    '/legal/**': { prerender: true },
    '/pricing': { prerender: true },
    '/testimonials': { prerender: true },
    '/api/**': { cors: true },
    // Redirect intruder
    '/.env': { redirect: { statusCode: 302, to: REDIRECT_INTRUDERS_GIF } },
    '/.info.php': { redirect: { statusCode: 302, to: REDIRECT_INTRUDERS_GIF } },
    '/.phpinfo.php': { redirect: { statusCode: 302, to: REDIRECT_INTRUDERS_GIF } },
    '/wp-admin': { redirect: { statusCode: 302, to: REDIRECT_INTRUDERS_GIF } },
    '/wp-admin/**': { redirect: { statusCode: 302, to: REDIRECT_INTRUDERS_GIF } },
    '/wp-includes/**': { redirect: { statusCode: 302, to: REDIRECT_INTRUDERS_GIF } },
    '/wp-login': { redirect: { statusCode: 302, to: REDIRECT_INTRUDERS_GIF } },
    '/wp-login.php ': { redirect: { statusCode: 302, to: REDIRECT_INTRUDERS_GIF } },
    /* eslint-enable perfectionist/sort-objects */
  },

  runtimeConfig: {
    private: {
      emailContact: '',
      emailPlunkApiKey: '',
      emailPlunkApiUrl: '',
      emailProvider: '',
      emailResendApiToken: '',
      emailSendInDevMode: false,
      fromEmail: '',
      polarAccessToken: '',
      polarOrganizationId: '',
      polarServer: 'sandbox',
      polarWebhookSecret: '',
    },
    public: {
      adminDemoModeEnabled: process.env.NUXT_PUBLIC_ADMIN_DEMO_MODE_ENABLED === 'true',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },

  schemaOrg: {
    identity: defineOrganization({
      logo: siteConfig.logoUrl,
      name: siteConfig.name,
    }),
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          '\'self\'',
          'data:',
          'https://avatars.githubusercontent.com',
          'https://lh3.googleusercontent.com',
          siteConfig.url,
        ],
        'script-src': [
          '\'self\'',
          '\'unsafe-inline\'',
          '\'unsafe-eval\'',
        ],
        'script-src-attr': [
          '\'self\'',
          '\'unsafe-inline\'',
          '\'unsafe-eval\'',
        ],
      },
      crossOriginEmbedderPolicy: false,
    },
    rateLimiter: false,
  },

  site: {
    defaultLocale: 'en-US',
    description: siteConfig.description,
    name: siteConfig.name,
    url: siteConfig.url,
  },

  sitemap: { exclude: ['/admin/**'] },

  typescript: {
    strict: true,
    tsConfig: {
      include: ['./types/**/*'],
    },
  },

  umami: {
    domains: [siteConfig.domain],
    ignoreLocalhost: true,
    proxy: 'cloak',
  },
})
