import z from 'zod'

import { isWithinExpiryDate } from '../../utils/otp'

const querySchema = z.object({
  token: z.string().min(1),
})

const LOGGER_PREFIX = '[auth/verify-email-token.get]:'

export default defineEventHandler(async (event) => {
  const { token } = await getValidatedQuery(event, querySchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { deleteEmailVerificationCode, deleteOneTimePassword, getEmailVerificationCode, getOneTimePasswordByUserId } = useAuthDb()
    const { getSanitizedUser, getUserById, updateLastActive, verifyUser } = useUserDb()

    const storedToken = await getEmailVerificationCode(token)
    if (!storedToken) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid verification code',
      })
    }

    if (!isWithinExpiryDate(storedToken.expiresAt as unknown as number)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Verification code has expired',
      })
    }

    const user = await getUserById(storedToken.userId)
    if (!user) {
      throw createError({ statusCode: 400, statusMessage: 'User not found' })
    }
    if (!user.emailVerified) {
      await verifyUser(user.id)
    }
    if (user.banned) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You account has been banned',
      })
    }

    await updateLastActive(user.id)
    const transformedUser = getSanitizedUser(user)
    await setUserSession(event, { user: transformedUser ?? undefined })
    await deleteEmailVerificationCode(storedToken.id)
    const otp = await getOneTimePasswordByUserId(user.id)
    if (otp) {
      await deleteOneTimePassword(otp.id)
    }

    return sendRedirect(event, '/dashboard')
  }

  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to verify email token`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
