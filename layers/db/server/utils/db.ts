import type { D1Database } from '@cloudflare/workers-types'
import { drizzle } from 'drizzle-orm/d1'

import * as schema from './schema'

export { and, eq, or, sql } from 'drizzle-orm'

export const tables = schema

// Environment detection utility
function getEnvironment () {
  return process.env.NUXT_HUB_ENV || process.env.NODE_ENV || 'production'
}

export function useDB () {
  const env = getEnvironment()
  const isPreview = env === 'preview' || env === 'staging'

  // In preview environments, use the DB_PREVIEW binding if available
  if (isPreview) {
    // Check if DB_PREVIEW binding exists
    // @ts-expect-error - globalThis bindings are not typed
    const dbPreview = globalThis.DB_PREVIEW || process.env.DB_PREVIEW
    if (dbPreview) {
      // Using DB_PREVIEW database binding
      return drizzle(dbPreview as D1Database, { schema })
    }
    // DB_PREVIEW binding not found, falling back to default database
  }

  // In development and production, use the default NuxtHub database
  return drizzle(hubDatabase(), { schema })
}
