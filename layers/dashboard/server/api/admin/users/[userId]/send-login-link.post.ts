import z from 'zod'

const paramsSchema = z.object({
  userId: z.string().min(1),
})

const LOGGER_PREFIX = '[admin/:userId/send-login-link.post]:'

export default defineEventHandler(async (event) => {
  const { userId } = await getValidatedRouterParams(event, paramsSchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { getUserById } = useUserDb()
    const { generateEmailVerificationCode, generateOneTimePassword } = useAuthDb()
    const { sendVerificationEmail } = useEmail()

    const userRecord = await getUserById(userId)
    if (!userRecord) {
      throw createError({
        message: 'User not found',
        statusCode: 400,
      })
    }
    if (!userRecord.emailVerified) {
      throw createError({
        message: 'User has not verified their email',
        statusCode: 400,
      })
    }

    const emailVerificationCode = await generateEmailVerificationCode(userRecord.id)
    const oneTimePassword = await generateOneTimePassword(userRecord.id, userRecord.email, 'LOGIN')
    await sendVerificationEmail(userRecord.name, userRecord.email, oneTimePassword, emailVerificationCode)

    return {
      message: 'One Time Password sent to your email',
      status: 'success',
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to send login link`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
