const LOGGER_PREFIX = '[admin.ts]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  if (event.path.startsWith('/api/admin')) {
    const { impersonatedBy, user } = await requireUserSession(event)

    if (impersonatedBy) {
      serverLogger.info(`${LOGGER_PREFIX} Impersonated user is trying to access admin routes -> allow it`)
      return
    }

    if (user.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        statusMessage: 'You are not authorized to perform this action',
      })
    }
  }

  const { public: { adminDemoModeEnabled } } = useRuntimeConfig(event)

  if (
    event.path.startsWith('/api/admin')
    || event.path.startsWith('/api/auth/user')
    || event.path.startsWith('api/auth/linked-accounts')) {
    const { user } = await requireUserSession(event)
    if (!adminDemoModeEnabled || user.role !== 'ADMIN') {
      return
    }

    const disallowedRequestMethods = ['POST', 'PUT', 'PATCH', 'DELETE']
    if (disallowedRequestMethods.includes(event.method)) {
      throw createError({
        statusCode: 405,
        statusMessage: 'This action is not allowed in admin demo mode',
      })
    }
  }
})
