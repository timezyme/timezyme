import type { Testimonial } from '~~/layers/testimonials/server/utils/testimonial.types'
import { TESTIMONIALS_KV_KEY } from '~~/layers/testimonials/server/utils/testimonials.constants'
import z from 'zod'

const bodySchema = z.object({
  testimonials: z.custom(Array<Testimonial>),
})

const LOGGER_PREFIX = '[admin/testimonials/index.patch]:'

export default defineEventHandler(async (event) => {
  const { testimonials } = await readValidatedBody(event, bodySchema.parse)

  const serverLogger = useServerLogger()

  try {
    await hubKV().setItem(TESTIMONIALS_KV_KEY, testimonials)

    return {
      success: true,
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to set testimonials`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
