import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only allow in development
  if (import.meta.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  const { email } = await readBody(event)
  const db = await hubDatabase()

  await db.update(tables.users)
    .set({
      emailVerified: true,
      role: email.includes('admin') ? 'admin' : 'user',
    })
    .where(eq(tables.users.email, email))

  return { email, success: true }
})
