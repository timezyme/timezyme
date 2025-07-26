// Health check endpoint to verify environment and database connectivity
import { sql, tables, useDB } from '~~/layers/db/server/utils/db'

// Environment detection utilities
function getEnvironment () {
  return process.env.NUXT_HUB_ENV || process.env.NODE_ENV || 'production'
}

function getEnvironmentConfig () {
  const env = getEnvironment()
  const isPreview = env === 'preview' || env === 'staging'
  const isProduction = env === 'production'
  const isDevelopment = env === 'development'

  // Detect which database binding is actually available
  // @ts-expect-error - globalThis bindings are not typed
  const hasDbPreview = !!(globalThis.DB_PREVIEW || process.env.DB_PREVIEW)
  const actualDbBinding = isPreview && hasDbPreview ? 'DB_PREVIEW' : 'DB'

  return {
    databaseName: isPreview ? 'DB_PREVIEW' : 'DB',
    dbBinding: actualDbBinding,
    dbPreviewAvailable: hasDbPreview,
    environment: env,
    features: {
      debugMode: !isProduction,
      resetDatabase: isDevelopment,
      seedEndpoint: isPreview || isDevelopment,
      testUsers: isPreview,
    },
    isDevelopment,
    isPreview,
    isProduction,
  }
}

export default defineEventHandler(async () => {
  const config = getEnvironmentConfig()

  try {
    const db = useDB()

    // Get user count to verify database connectivity
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(tables.users)
      .get()

    return {
      database: {
        binding: config.dbBinding,
        connected: true,
        dbPreviewAvailable: config.dbPreviewAvailable,
        name: config.databaseName,
        userCount: result?.count || 0,
      },
      environment: config.environment,
      features: config.features,
      status: 'healthy',
      timestamp: new Date().toISOString(),
    }
  }
  catch (error: any) {
    return {
      database: {
        connected: false,
        error: error.message,
        name: config.databaseName,
      },
      environment: config.environment,
      features: config.features,
      status: 'error',
      timestamp: new Date().toISOString(),
    }
  }
})
