import z from 'zod'

const paramsSchema = z.object({
  userId: z.string().min(1),
})

const LOGGER_PREFIX = '[admin/:userId/send-password-reset-email.post]:'

export default defineEventHandler(async (event) => {
  const { userId } = await getValidatedRouterParams(event, paramsSchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { getUserById } = useUserDb()
    const { generateResetPasswordToken } = useAuthDb()
    const { sendPasswordResetEmail } = useEmail()

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

    const resetPasswordToken = await generateResetPasswordToken(userRecord.id)
    await sendPasswordResetEmail(userRecord.name, userRecord.email, resetPasswordToken)

    return {
      message: 'Password reset link sent to your email',
      status: 'success',
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to send password reset email`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
