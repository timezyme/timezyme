import { usePayment } from '../../utils/usePayment'

const LOGGER_PREFIX = '[payment/products.get]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const allProducts = await usePayment(event).getAllProducts()
    return allProducts
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get all products`, error)

    // Handle Polar API authentication errors
    if (error.statusCode === 401 || error.message?.includes('invalid_token')) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Payment provider configuration error. Please contact support.',
      })
    }

    throw createError({
      statusCode: error.status || error.statusCode || 500,
      statusMessage: 'Unable to load products. Please try again later.',
    })
  }
})
