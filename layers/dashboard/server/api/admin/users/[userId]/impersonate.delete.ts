import z from 'zod'

const paramsSchema = z.object({
  userId: z.string().min(1),
})

const LOGGER_PREFIX = '[admin/:userId/impersonate.delete]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  const { userId } = await getValidatedRouterParams(event, paramsSchema.parse)

  try {
    const { getUserById } = useUserDb()

    const userRecord = await getUserById(userId)
    if (!userRecord) {
      throw createError({
        message: 'User not found',
        statusCode: 400,
      })
    }

    serverLogger.info(`${LOGGER_PREFIX} Resetting impersonating user to ${userRecord.id}`)

    await replaceUserSession(event, {
      impersonatedBy: undefined,
      user: userRecord,
    })

    return { success: true }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to reset impersonating user`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
