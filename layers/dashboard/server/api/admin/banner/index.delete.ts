import { BANNER_KV_KEY } from '../../../utils/banner.constants'

const LOGGER_PREFIX = '[admin/banner/index.delete]:'

export default defineEventHandler(async () => {
  const serverLogger = useServerLogger()

  try {
    await hubKV().removeItem(BANNER_KV_KEY)

    return {
      success: true,
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to delete banner`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
