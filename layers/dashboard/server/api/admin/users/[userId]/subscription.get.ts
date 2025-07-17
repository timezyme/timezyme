import { useSubscriptionsDb } from '~~/layers/db/server/utils/useSubscriptionsDb'
import z from 'zod'

const LOGGER_PREFIX = '[admin/users/:userId/subscription.get]:'

const paramsSchema = z.object({
  userId: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { userId } = await getValidatedRouterParams(event, paramsSchema.parse)

    const { getSubscriptionByUserId } = useSubscriptionsDb()
    const result = await getSubscriptionByUserId(userId)

    if (!result) {
      throw createError({
        message: 'Failed to get user subscription',
        statusCode: 500,
      })
    }

    const allPaymentProducts = await usePayment(event).getAllProducts()
    const product = allPaymentProducts.find(product => product.id === result.productId)

    return {
      product,
      subscription: result,
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get user subscription`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
