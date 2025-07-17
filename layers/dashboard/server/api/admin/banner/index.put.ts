import z from 'zod'

import { BANNER_KV_KEY } from '../../../utils/banner.constants'
import type { Banner } from '../../../utils/banner.types'

const bodySchema = z.object({
  banner: z.custom<Banner>(),
  ttl: z.number().int().positive().optional(),
})

const LOGGER_PREFIX = '[admin/banner/index.put]:'

export default defineEventHandler(async (event) => {
  const { banner, ttl } = await readValidatedBody(event, bodySchema.parse)

  const serverLogger = useServerLogger()

  try {
    await hubKV().setItem(BANNER_KV_KEY, banner, { ttl })

    return {
      success: true,
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to update banner`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
