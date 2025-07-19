import z from 'zod'

const paramsSchema = z.object({
  accountId: z.string(),
})

const LOGGER_PREFIX = '[auth/linked-accounts/[accountId].delete]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { user } = await requireUserSession(event)
    if (!user?.id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User not found',
      })
    }

    const { accountId } = await getValidatedRouterParams(event, paramsSchema.parse)

    const { unlinkOAuthAccount } = useUserDb()
    const unlinked = await unlinkOAuthAccount(user.id, accountId)
    if (!unlinked) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Linked account not found',
      })
    }

    return { message: 'Account unlinked successfully' }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to unlink account`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
