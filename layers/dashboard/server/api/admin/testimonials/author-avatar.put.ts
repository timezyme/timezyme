const LOGGER_PREFIX = '[admin/testimonials/author-avatar.put]:'

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
        prefix: 'testimonials-avatars',
      },
    })
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to upload author avatar`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
