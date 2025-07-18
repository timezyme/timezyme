import { eq } from 'drizzle-orm'

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
    const db = await hubDatabase()

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

      // Update password
      await db.update(tables.passwords)
        .set({
          hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(tables.passwords.userId, existingUser[0].id))

      return { email, updated: true }
    }
    else {
      // Create new user
      const userId = generateId('usr')

      await db.insert(tables.users)
        .values({
          createdAt: new Date(),
          email,
          id: userId,
          name,
          role,
          updatedAt: new Date(),
        })

      await db.insert(tables.passwords)
        .values({
          createdAt: new Date(),
          hashedPassword,
          updatedAt: new Date(),
          userId,
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
