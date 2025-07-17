import z from 'zod'

import { isWithinExpiryDate } from '../../../utils/otp'

export const bodySchema = z.object({
  code: z.string().length(6),
  email: z
    .string()
    .email()
    .min(1)
    .max(255)
    .transform(v => v.toLowerCase()),
  type: z.nativeEnum(UserOneTimePasswordType),
})

const LOGGER_PREFIX = '[auth/otp/verify.post]:'

export default defineEventHandler(async (event) => {
  const { code, email, type } = await readValidatedBody(event, bodySchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { deleteEmailVerificationCode, deleteOneTimePassword, getEmailVerificationCodeByUserId, getOneTimePassword } = useAuthDb()
    const { getSanitizedUser, getUserById, setEmailVerified, updateLastActive } = useUserDb()

    const otp = await getOneTimePassword(code, type, email)
    if (!otp) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid OTP' })
    }

    if (!isWithinExpiryDate(otp.expiresAt as unknown as number)) {
      throw createError({ statusCode: 400, statusMessage: 'OTP has expired' })
    }

    const user = await getUserById(otp.userId)
    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    if (type === 'SIGNUP') {
      await setEmailVerified(otp.userId)
    }

    await deleteOneTimePassword(otp.id)

    const emailVerificationCode = await getEmailVerificationCodeByUserId(user.id)
    if (emailVerificationCode) {
      await deleteEmailVerificationCode(emailVerificationCode.id)
    }

    if (user.banned) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Your account has been banned',
      })
    }

    await updateLastActive(user.id)
    const sanitizedUser = getSanitizedUser(user)

    await setUserSession(event, { user: sanitizedUser! })
    return sendRedirect(event, '/dashboard')
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to verify one time password`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
