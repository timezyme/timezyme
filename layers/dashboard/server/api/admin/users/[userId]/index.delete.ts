import { useAdminDb } from '~~/layers/db/server/utils/useAdminDb'
import z from 'zod'

const paramsSchema = z.object({
  userId: z.string().min(1),
})

const LOGGER_PREFIX = '[admin/:userId/index.delete]:'

export default defineEventHandler(async (event) => {
  const { userId } = await getValidatedRouterParams(event, paramsSchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { deleteUser } = useAdminDb()
    const deleted = await deleteUser(userId)

    if (!deleted) {
      throw createError({
        message: 'Failed to delete user',
        statusCode: 500,
      })
    }

    return { message: 'User deleted successfully' }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to delete user`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
