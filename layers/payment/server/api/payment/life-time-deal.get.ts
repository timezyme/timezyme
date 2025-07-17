const LOGGER_PREFIX = '[payment/life-time-deal.get]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { user } = event.context
    const { getLifeTimeDealByUserId } = useLifeTimeDealsDb()

    const lifeTimeDeal = await getLifeTimeDealByUserId(user.id)

    return lifeTimeDeal
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get life time deal`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
