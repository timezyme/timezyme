import { useAdminDb } from '~~/layers/db/server/utils/useAdminDb'
import z from 'zod'

const bodySchema = z.object({
  email: z.string().email('Invalid email'),
  emailVerified: z.boolean().optional().default(false),
  name: z.string().min(1).max(255),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

const LOGGER_PREFIX = '[admin/index.post]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  try {
    const { email, emailVerified, name, password } = await readValidatedBody(event, bodySchema.parse)
    const hashedPassword = await hashPassword(password)

    const { getSanitizedUser, getUserByEmail } = useUserDb()
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User already exists',
      })
    }

    const { createNewUser } = useAdminDb()
    const newUser = await createNewUser({
      email,
      emailVerified,
      hashedPassword,
      name,
    })

    const { generateEmailVerificationCode, generateOneTimePassword } = useAuthDb()
    const emailVerificationCode = await generateEmailVerificationCode(newUser.id)
    const oneTimePassword = await generateOneTimePassword(newUser.id, email, UserOneTimePasswordType.SIGNUP)

    const { sendVerificationEmail } = useEmail()
    await sendVerificationEmail(newUser.name, email, oneTimePassword, emailVerificationCode)

    setResponseStatus(event, 201)
    return getSanitizedUser(newUser)
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to create new user`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
