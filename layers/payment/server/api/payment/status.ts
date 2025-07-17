import { usePayment } from '../../utils/usePayment'

const LOGGER_PREFIX = '[payment/status.get]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { user } = event.context
    const { getSubscriptionByUserId } = useSubscriptionsDb()
    const { getLifeTimeDealByUserId } = useLifeTimeDealsDb()

    const [lifeTimeDeal, subscription, products] = await Promise.all([
      getLifeTimeDealByUserId(user.id),
      getSubscriptionByUserId(user.id),
      usePayment(event).getAllProducts(),
    ])

    return {
      activeSubscription: subscription,
      lifeTimeDeal,
      products,
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get subscription`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
