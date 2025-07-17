import z from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
})

const LOGGER_PREFIX = '[auth/reset-password.post]:'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, bodySchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { getUserByEmail } = useUserDb()

    const user = await getUserByEmail(email)

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email not found',
      })
    }

    if (!user.emailVerified) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email not verified',
      })
    }

    const { generateResetPasswordToken } = useAuthDb()
    const resetPasswordToken = await generateResetPasswordToken(user.id)

    const { sendPasswordResetEmail } = useEmail()
    await sendPasswordResetEmail(user.name, email, resetPasswordToken)

    setResponseStatus(event, 201)
    return {
      message: 'Password reset link sent to your email',
      status: 'success',
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to reset password`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
