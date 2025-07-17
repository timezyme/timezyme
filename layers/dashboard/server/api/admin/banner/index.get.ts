import { BANNER_KV_KEY } from '../../../utils/banner.constants'
import type { Banner } from '../../../utils/banner.types'

const LOGGER_PREFIX = '[admin/banner/index.get]:'

export default defineEventHandler(async () => {
  const serverLogger = useServerLogger()

  try {
    const item = hubKV().getItem(BANNER_KV_KEY, {
      defaultValue: null,
    })
    return item as Promise<Banner | null>
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get banner`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
