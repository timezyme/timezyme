import type { H3Event } from 'h3'

import type { Testimonial } from '../utils/testimonial.types'
import { TESTIMONIALS_KV_KEY } from '../utils/testimonials.constants'

const LOGGER_PREFIX = '[testimonials.get]:'

export default cachedEventHandler(async () => {
  const serverLogger = useServerLogger()

  try {
    const item = await hubKV().getItem(TESTIMONIALS_KV_KEY, {
      defaultValue: [],
    })
    return item as Array<Testimonial>
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get testimonials`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
}, {
  getKey: (event: H3Event) => event.path,
  maxAge: 60 * 60, // 1 hour)
})
