import { useEmail } from '~~/layers/email/server/utils/useEmail'
import z from 'zod'

const registrationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(255),
  password: z.string().min(8),
})

const LOGGER_PREFIX = '[auth/register.post]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { email, name, password } = await readValidatedBody(event, registrationSchema.parse)

    const { createUserWithPassword, getSanitizedUser, getUserByEmail } = useUserDb()
    const { generateEmailVerificationCode, generateOneTimePassword } = useAuthDb()

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      serverLogger.warn(`${LOGGER_PREFIX} User with email "${email}" already exists`)
      throw createError({
        status: 400,
        statusMessage: 'User already exists',
      })
    }

    const hashedPassword = await hashPassword(password)
    const user = await createUserWithPassword({ email, hashedPassword, name })

    const emailVerificationCode = await generateEmailVerificationCode(user.id)
    const oneTimePassword = await generateOneTimePassword(user.id, email, UserOneTimePasswordType.SIGNUP)

    const { sendVerificationEmail } = useEmail()
    await sendVerificationEmail(user.name, email, oneTimePassword, emailVerificationCode)

    setResponseStatus(event, 201)
    return getSanitizedUser(user)
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to register user`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
