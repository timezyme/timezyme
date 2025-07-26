// Debug endpoint to test auth configuration
export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  try {
    // Test database connection
    const { getUserByEmail } = useUserDb()
    const user = await getUserByEmail(email)

    // Get runtime config
    const config = useRuntimeConfig(event)

    return {
      authEnabled: config.public.authEnabled,
      emailVerified: user?.emailVerified,
      environment: config.public.environment,
      hasHashedPassword: !!user?.hashedPassword,
      hashedPasswordLength: user?.hashedPassword?.length || 0,
      // Test if password functions are available
      hashPasswordAvailable: typeof hashPassword === 'function',
      isPreview: config.public.isPreview,
      sessionPasswordConfigured: !!config.session?.password,
      userEmail: user?.email,
      userFound: !!user,
      verifyPasswordAvailable: typeof verifyPassword === 'function',
    }
  }
  catch (error: any) {
    return {
      error: error.message,
      stack: error.stack,
    }
  }
})
