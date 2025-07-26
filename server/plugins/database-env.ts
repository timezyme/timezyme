// Plugin to log database environment on startup

// Environment detection utilities (inline to avoid import issues)
function getEnvironment () {
  return process.env.NUXT_HUB_ENV || process.env.NODE_ENV || 'production'
}

function getEnvironmentConfig () {
  const env = getEnvironment()
  const isPreview = env === 'preview' || env === 'staging'
  const isProduction = env === 'production'
  const isDevelopment = env === 'development'

  return {
    databaseName: isPreview ? 'DB_PREVIEW' : 'DB',
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

export default defineNitroPlugin((_nitroApp) => {
  const _config = getEnvironmentConfig()

  // Database Environment Configuration loaded
  // This plugin ensures database environment is properly initialized
})
