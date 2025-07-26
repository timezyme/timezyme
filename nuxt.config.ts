/* eslint-disable node/prefer-global/process */
import vue from '@vitejs/plugin-vue'
import { defineOrganization } from 'nuxt-schema-org/schema'

import './validate-env'
import { siteConfig } from './config/siteConfig'

const REDIRECT_INTRUDERS_GIF = 'https://i.imgur.com/1Ia9tTG.gif'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
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
    './layers/docs2',
    './layers/testimonials',
    './layers/waitlist',
  ],

  future: {
    // Nuxt 4 directory structure and features
    // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
    compatibilityVersion: 4,
  },

  hub: {
    // Additional bindings for preview database
    bindings: {
      // @ts-expect-error - d1_databases is a valid property but not in the type definition yet
      d1_databases: {
        // This will be available when the D1 database is created in Cloudflare
        // The database_id will need to be added after creation
        DB_PREVIEW: {
          database_id: process.env.NUXT_DB_PREVIEW_ID || '',
        },
      },
    },
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
    '@nuxtjs/turnstile',
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
    '/': { prerender: false }, // Must be dynamic for waitlist form
    '/blog': { prerender: true }, // individual blog posts are pre-rendered inside /blog component
    '/changelog': { prerender: true },
    '/contact': { prerender: false }, // Must be dynamic for contact form
    '/dashboard/**': { ssr: false },
    '/docs': { prerender: true }, // individual docs pages are pre-rendered inside /docs component
    '/faq': { prerender: true },
    '/legal/**': { prerender: true },
    '/pricing': { prerender: true },
    '/testimonials': { prerender: true },
    '/llms.txt': { prerender: false }, // Dynamic route that makes POST requests
    '/api/**': { cors: true },
    '/api/waitlist/subscribe': {
      cors: true,
      // Rate limiting will be configured at the global level
    },
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
      authEnabled: process.env.NUXT_PUBLIC_AUTH_ENABLED !== 'false',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      // Environment detection for database separation
      environment: process.env.NUXT_HUB_ENV || process.env.NODE_ENV || 'production',
      isPreview: process.env.NUXT_HUB_ENV === 'preview',
      previewMode: process.env.NUXT_PUBLIC_PREVIEW_MODE === 'true',
    },
    turnstile: {
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA', // Test secret for development
    },
  },

  schemaOrg: {
    identity: defineOrganization({
      logo: siteConfig.logoUrl,
      name: siteConfig.name,
    }),
  },

  security: {
    // CSRF disabled - will use Cloudflare Turnstile for form protection
    csrf: false,
    headers: {
      contentSecurityPolicy: {
        'frame-src': [
          '\'self\'',
          'https://challenges.cloudflare.com', // For Turnstile iframe
        ],
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
          'https://challenges.cloudflare.com', // For Turnstile
        ],
        'script-src-attr': [
          '\'self\'',
          '\'unsafe-inline\'',
          '\'unsafe-eval\'',
        ],
      },
      crossOriginEmbedderPolicy: false,
    },
    rateLimiter: {
      driver: {
        name: 'lruCache',
      },
      interval: 60000, // 1 minute
      // Global rate limiter configuration
      tokensPerInterval: 100,
    },
  },

  site: {
    defaultLocale: 'en-US',
    description: siteConfig.description,
    name: siteConfig.name,
    url: siteConfig.url,
  },

  sitemap: { exclude: ['/admin/**'] },

  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA', // Test key for development
  },

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
