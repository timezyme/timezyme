const LOGGER_PREFIX = '[auth/user/index.get]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { user } = event.context
    const { getSanitizedUser, getUserById } = useUserDb()
    const userDetails = await getUserById(user.id)

    if (!userDetails) {
      throw createError({
        message: 'User not found',
        statusCode: 404,
      })
    }

    return getSanitizedUser(userDetails)
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get user`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
