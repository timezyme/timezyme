const LOGGER_PREFIX = '[auth/user/index.delete]:'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const serverLogger = useServerLogger()

  try {
    const { deleteUser } = useUserDb()

    if (!user.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User not found',
      })
    }

    const userRecord = await deleteUser(user.id)
    if (!userRecord) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User not found',
      })
    }

    await clearUserSession(event)
    setResponseStatus(event, 200)
    return {
      message: 'Account deleted',
      status: 'success',
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to delete user`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
