import z from 'zod'

const paramsSchema = z.object({
  userId: z.string().min(1),
})

const LOGGER_PREFIX = '[admin/:userId/impersonate.post]:'

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

    const session = await getUserSession(event)
    const impersonatedByUserId = session.user?.id

    serverLogger.info(`${LOGGER_PREFIX} Impersonating user ${userRecord.id} from user ${impersonatedByUserId}`)

    // Set the user session to impersonate the selected user
    await setUserSession(event, {
      impersonatedBy: impersonatedByUserId,
      user: userRecord,
    })

    return { success: true }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to impersonate user`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
