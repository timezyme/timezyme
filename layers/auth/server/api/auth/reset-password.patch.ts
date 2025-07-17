import z from 'zod'

import { isWithinExpiryDate } from '../../utils/otp'

const bodySchema = z.object({
  code: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

const LOGGER_PREFIX = '[auth/reset-password.patch]:'

export default defineEventHandler(async (event) => {
  const { code, password } = await readValidatedBody(event, bodySchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { deletePasswordResetToken, getPasswordResetToken } = useAuthDb()

    const resetPasswordToken = await getPasswordResetToken(code)
    if (!resetPasswordToken) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password reset link expired',
      })
    }
    if (!isWithinExpiryDate(resetPasswordToken.expiresAt as unknown as number)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password reset token has expired',
      })
    }

    const { getUserById, updatePassword } = useUserDb()
    const user = await getUserById(resetPasswordToken.userId)
    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User not found',
      })
    }
    if (!user.emailVerified) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User has not verified their email',
      })
    }

    const hashedPassword = await hashPassword(password)
    await updatePassword(user.id, hashedPassword)
    await deletePasswordResetToken(resetPasswordToken.id)
    return {
      message: 'Password has been successfully reset',
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
