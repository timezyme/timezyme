// Environment detection utilities for database separation

export function getEnvironment () {
  // Priority order for environment detection:
  // 1. NUXT_HUB_ENV (set by NuxtHub deployment)
  // 2. NODE_ENV (standard Node.js environment)
  // 3. Default to 'production' for safety
  return process.env.NUXT_HUB_ENV || process.env.NODE_ENV || 'production'
}

export function isPreviewEnvironment () {
  const env = getEnvironment()
  return env === 'preview' || env === 'staging'
}

export function isProductionEnvironment () {
  const env = getEnvironment()
  return env === 'production'
}

export function isDevelopmentEnvironment () {
  const env = getEnvironment()
  return env === 'development'
}

// Get database name based on environment
export function getDatabaseName () {
  const env = getEnvironment()

  switch (env) {
    case 'preview':
    case 'staging':
      return 'DB_PREVIEW'
    case 'production':
      return 'DB'
    case 'development':
      return 'DB'
    default:
      return 'DB'
  }
}

// Get environment-specific configuration
export function getEnvironmentConfig () {
  const env = getEnvironment()

  return {
    databaseName: getDatabaseName(),
    environment: env,
    // Add flags for environment-specific features
    features: {
      debugMode: !isProductionEnvironment(),
      resetDatabase: isDevelopmentEnvironment(),
      seedEndpoint: isPreviewEnvironment() || isDevelopmentEnvironment(),
      testUsers: isPreviewEnvironment(),
    },
    isDevelopment: isDevelopmentEnvironment(),
    isPreview: isPreviewEnvironment(),
    isProduction: isProductionEnvironment(),
  }
}
