import z from 'zod'

const paramsSchema = z.object({
  id: z.string(),
})

const LOGGER_PREFIX = '[admin/waitlist/[id].delete]:'

export default defineEventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { deleteItem } = useWaitlistDb()
    await deleteItem(id)

    return { success: true }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to delete waitlist item`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
