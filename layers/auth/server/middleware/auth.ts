export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname

  const authPathPatterns = [
    '/api/auth/user',
    '/api/auth/user/*',
    '/api/payment/checkout',
    '/api/payment/status',
    '/api/payment/customer-portal',
  ]

  // Check if the current path matches any of the public patterns
  const isAuthPath = authPathPatterns.some((pattern) => {
    // Convert the pattern to a regex
    const regexPattern = pattern.replace('*', '.*')
    const regex = new RegExp(`^${regexPattern}$`)
    return regex.test(path)
  })

  if (!isAuthPath) {
    return
  }

  const session = await getUserSession(event)
  if (session.user) {
    event.context.user = session.user
    return
  }

  throw createError({
    message: 'Unauthorized',
    statusCode: 401,
  })
})
