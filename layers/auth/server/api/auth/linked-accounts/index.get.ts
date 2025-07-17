const LOGGER_PREFIX = '[auth/linked-accounts.get]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { user } = await requireUserSession(event)
    if (!user.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User not found',
      })
    }

    const { getLinkedOAuthAccountsByUserId } = useUserDb()
    const accounts = await getLinkedOAuthAccountsByUserId(user.id)
    return { accounts }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get linked accounts`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
