import { usePayment } from '../../utils/usePayment'

const LOGGER_PREFIX = '[payment/status.get]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { user } = event.context
    const { getSubscriptionByUserId } = useSubscriptionsDb()

    const [subscription, products] = await Promise.all([
      getSubscriptionByUserId(user.id),
      usePayment(event).getAllProducts(),
    ])

    return {
      activeSubscription: subscription,
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
