import z from 'zod'

import { isWithinExpiryDate } from '../../../utils/otp'

const bodySchema = z.object({
  email: z.string().email(),
})

const LOGGER_PREFIX = '[auth/otp/resend.post]:'

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, bodySchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { getUserByEmail } = useUserDb()
    const {
      deleteOneTimePassword,
      generateEmailVerificationCode,
      generateOneTimePassword,
      getEmailVerificationCodeByUserId,
      getLatestOneTimePasswordByEmail,
    } = useAuthDb()

    const user = await getUserByEmail(email)

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User not found',
      })
    }

    const latestOtp = await getLatestOneTimePasswordByEmail(email, 'LOGIN')
    let oneTimePassword
    let emailVerificationCode: string

    if (latestOtp && isWithinExpiryDate(latestOtp.expiresAt as unknown as number)) {
      // Resend existing OTP if it's still valid
      oneTimePassword = latestOtp.code
      const verificationCodeRecord = await getEmailVerificationCodeByUserId(user.id)

      if (!verificationCodeRecord) {
        emailVerificationCode = await generateEmailVerificationCode(user.id)
      }
      else {
        emailVerificationCode = verificationCodeRecord.code
      }
    }
    else {
      // Delete expired OTP if exists
      if (latestOtp) {
        await deleteOneTimePassword(latestOtp.id)
      }
      // Generate new OTP and email verification code
      emailVerificationCode = await generateEmailVerificationCode(user.id)
      oneTimePassword = await generateOneTimePassword(user.id, email, 'LOGIN')
    }

    const { sendVerificationEmail } = useEmail()
    await sendVerificationEmail(user.name, email, oneTimePassword, emailVerificationCode)

    return {
      message: 'One Time Password sent to your email',
      status: 'success',
    }
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
