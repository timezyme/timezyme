import { generateId } from '~~/layers/core/utils/common'
import { tables, useDB } from '~~/layers/db/server/utils/db'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const { email, name, password, role } = await readBody(event)

  try {
    const db = useDB()

    // Hash the password using nuxt-auth-utils
    const hashedPassword = await hashPassword(password)

    // Check if user exists
    const existingUser = await db
      .select()
      .from(tables.users)
      .where(eq(tables.users.email, email))
      .get()

    if (existingUser) {
      // Update existing user with properly hashed password
      await db.update(tables.users)
        .set({
          emailVerified: true,
          hashedPassword,
          name,
          role,
          updatedAt: new Date(),
        })
        .where(eq(tables.users.email, email))

      return { email, updated: true }
    }
    else {
      // Create new user
      const userId = generateId('usr')

      await db.insert(tables.users)
        .values({
          createdAt: new Date(),
          email,
          emailVerified: true,
          hashedPassword,
          id: userId,
          name,
          role,
          updatedAt: new Date(),
        })

      return { created: true, email }
    }
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }
})
