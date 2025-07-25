import z from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
  name: z.string().min(3),
  turnstileToken: z.string(),
})

const LOGGER_PREFIX = '[contact.post]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  const { email, message, name, turnstileToken } = await readValidatedBody(event, bodySchema.parse)

  // Verify Turnstile token
  const isValid = await verifyTurnstileToken(turnstileToken)
  if (!isValid) {
    serverLogger.warn(`${LOGGER_PREFIX} Invalid Turnstile token`)
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid security verification. Please try again.',
    })
  }

  try {
    await useEmail().sendContactSubmissionEmail(name, email, message)
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to send contact email`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
