import z from 'zod'

export const bodySchema = z
  .object({
    avatarUrl: z.string().optional(),
    name: z.string().min(1).optional(),
    password: z.string().min(8, 'Password must be at least 8 characters long').optional(),
  })
  .refine(data => data.name || data.password || data.avatarUrl, {
    message: 'Nothing to update',
  })

const LOGGER_PREFIX = '[auth/user/index.patch]:'

export default defineEventHandler(async (event) => {
  const { avatarUrl, name, password } = await readValidatedBody(event, bodySchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { getSanitizedUser, updateUser } = useUserDb()

    const { user } = event.context

    const updatedUser = await updateUser(user.id, {
      avatarUrl,
      name,
      password: password ? await hashPassword(password) : undefined,
    })

    const transformedUser = getSanitizedUser(updatedUser)
    await setUserSession(event, { user: transformedUser! })
    return transformedUser
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to update user`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
