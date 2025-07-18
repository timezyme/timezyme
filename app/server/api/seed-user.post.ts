import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const { email, hashedPassword, name, role } = await readBody(event)

  try {
    const db = useDB()

    // Check if user exists
    const existingUser = await db
      .select()
      .from(tables.users)
      .where(eq(tables.users.email, email))
      .limit(1)

    if (existingUser.length > 0) {
      // Update existing user
      await db.update(tables.users)
        .set({
          name,
          role,
          updatedAt: new Date(),
        })
        .where(eq(tables.users.email, email))

      // Update password in users table
      await db.update(tables.users)
        .set({
          hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(tables.users.id, existingUser[0]!.id))

      return { email, updated: true }
    }
    else {
      // Create new user
      const userId = nanoid()

      await db.insert(tables.users)
        .values({
          createdAt: new Date(),
          email,
          hashedPassword,
          id: userId,
          name,
          role,
          updatedAt: new Date(),
        })

      // Password is stored in users table, no separate insert needed

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
