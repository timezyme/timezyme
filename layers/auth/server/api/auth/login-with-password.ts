import z from 'zod'

const bodySchema = z.object({
  email: z
    .string()
    .email()
    .min(1)
    .max(255)
    .transform(v => v.toLowerCase()),
  password: z.string().min(8).max(255),
})

const LOGGER_PREFIX = '[auth/login-with-password.post]:'

async function handleUserValidation (email: string, password: string) {
  const { getOauthAccountByUserId, getUserByEmail } = useUserDb()

  const user = await getUserByEmail(email)

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  if (!user.hashedPassword && user.emailVerified) {
    const connectedOauthAccount = await getOauthAccountByUserId(user.id)
    const oAuthProvider = connectedOauthAccount?.providerId

    if (oAuthProvider) {
      throw createError({
        statusCode: 400,
        statusMessage: `Account connected with ${oAuthProvider}. Please continue with ${oAuthProvider} to login.`,
      })
    }
    else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Please request a password reset to login.',
      })
    }
  }

  const isPasswordCorrect = await verifyPassword(user.hashedPassword ?? '', password)
  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid credentials',
    })
  }

  if (!user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You haven\'t verified your email yet.',
    })
  }

  if (user.banned) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Your account has been banned',
    })
  }
  return user
}

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  const serverLogger = useServerLogger()

  try {
    const user = await handleUserValidation(email, password)

    const { getSanitizedUser, updateLastActive } = useUserDb()
    await updateLastActive(user.id)

    const sanitizedUser = getSanitizedUser(user)
    await setUserSession(event, { user: sanitizedUser! })
    return sendRedirect(event, '/dashboard')
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to login with password`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
