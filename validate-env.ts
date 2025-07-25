import { createEnv } from '@t3-oss/env-nuxt'
import { z } from 'zod'

// eslint-disable-next-line node/prefer-global/process
const skipValidation = import.meta.server || process.env.GITHUB_ACTIONS === 'true'

export const env = createEnv({
  client: {
    NUXT_PUBLIC_ADMIN_DEMO_MODE_ENABLED: z.boolean({ coerce: true }).optional(),
    NUXT_PUBLIC_BASE_URL: z.string().url(),
    NUXT_PUBLIC_PREVIEW_MODE: z.boolean({ coerce: true }).optional(),
  },
  server: {
    NUXT_OAUTH_GITHUB_CLIENT_ID: z.string().min(10).optional(),
    NUXT_OAUTH_GITHUB_CLIENT_SECRET: z.string().min(10).optional(),
    NUXT_OAUTH_GOOGLE_CLIENT_ID: z.string().min(10).optional(),
    NUXT_OAUTH_GOOGLE_CLIENT_SECRET: z.string().min(10).optional(),
    NUXT_PRIVATE_EMAIL_CONTACT: z.string().email(),
    NUXT_PRIVATE_EMAIL_PROVIDER: z.enum(['resend', 'plunk']),
    NUXT_PRIVATE_EMAIL_SEND_IN_DEV_MODE: z.boolean({ coerce: true }),
    NUXT_PRIVATE_FROM_EMAIL: z.string().email(),
    NUXT_PRIVATE_PLUNK_API_KEY: z.string().min(32).optional(),
    NUXT_PRIVATE_PLUNK_API_URL: z.string().url().optional(),
    NUXT_PRIVATE_POLAR_ACCESS_TOKEN: z.string().min(10),
    NUXT_PRIVATE_POLAR_ORGANIZATION_ID: z.string().min(10).optional(),
    NUXT_PRIVATE_POLAR_SERVER: z.enum(['sandbox', 'production']),
    NUXT_PRIVATE_POLAR_WEBHOOK_SECRET: z.string().min(10),
    NUXT_PRIVATE_RESEND_API_TOKEN: z.string().min(32).optional(),
    NUXT_SESSION_PASSWORD: z.string().min(32),
    // NUXT_UI_PRO_LICENSE: z.string().uuid(),
  },
  skipValidation,
})
