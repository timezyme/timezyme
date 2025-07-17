import { useAdminDb } from '~~/layers/db/server/utils/useAdminDb'
import z from 'zod'

const bodySchema = z.object({
  bannedReason: z.string().min(10).optional(),
  status: z.boolean(),
})

const paramsSchema = z.object({
  userId: z.string().min(1),
})

const LOGGER_PREFIX = '[admin/:userId/ban.post]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { userId } = await getValidatedRouterParams(event, paramsSchema.parse)
    const { bannedReason, status } = await readValidatedBody(event, bodySchema.parse)

    const { getSanitizedUser, getUserById } = useUserDb()
    const { updateBannedStatus } = useAdminDb()

    const userRecord = await getUserById(userId)
    if (!userRecord) {
      throw createError({
        message: 'User not found',
        statusCode: 400,
      })
    }

    const record = await updateBannedStatus({ bannedReason: bannedReason ?? userRecord.bannedReason ?? '', status, userId })
    return getSanitizedUser(record)
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to ban user`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
