// Test endpoint to verify password hashing
export default defineEventHandler(async (event) => {
  const { hash, password } = await readBody(event)

  if (!password || !hash) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password and hash are required',
    })
  }

  try {
    // Test the verifyPassword function
    const isValid = await verifyPassword(hash, password)

    // Also generate a new hash for comparison
    const newHash = await hashPassword(password)

    return {
      isValid,
      newHash,
      passwordLength: password.length,
      providedHash: hash,
    }
  }
  catch (error: any) {
    return {
      error: error.message,
      stack: error.stack,
    }
  }
})
