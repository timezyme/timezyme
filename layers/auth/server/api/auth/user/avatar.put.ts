const LOGGER_PREFIX = '[auth/user/avatar.put]:'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const serverLogger = useServerLogger()

  try {
    return hubBlob().handleUpload(event, {
      ensure: {
        types: ['image/jpeg', 'image/png', 'image/webp'],
      },
      multiple: false,
      put: {
        addRandomSuffix: false,
        prefix: 'user-avatars',
      },
    })
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to upload avatar image`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
