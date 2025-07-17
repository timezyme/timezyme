const LOGGER_PREFIX = '[admin/waitlist/index.get]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { getAllItems } = useWaitlistDb()
    const { public: { adminDemoModeEnabled } } = useRuntimeConfig(event)

    let records = await getAllItems()

    if (adminDemoModeEnabled) {
      records = records?.map(record => ({
        ...record,
        email: mask(record.email),
      })) ?? []
    }

    return records
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get waitlist items`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
