import type { SelectWaitlist } from '~~/layers/db/server/utils/schema'
import z from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

const LOGGER_PREFIX = '[admin/waitlist/[id].get]:'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { getItemById } = useWaitlistDb()
    const { public: { adminDemoModeEnabled } } = useRuntimeConfig(event)

    let record: null | SelectWaitlist = await getItemById(id)

    if (adminDemoModeEnabled) {
      record = {
        ...record,
        email: mask(record?.email ?? ''),
      } as SelectWaitlist
    }

    return record
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get waitlist item`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
