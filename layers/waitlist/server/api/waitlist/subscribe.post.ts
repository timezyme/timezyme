import { nanoid } from 'nanoid'
import z from 'zod'

import { validateEmail } from '../../../utils/emailValidation'

const bodySchema = z.object({
  email: z.string().email(),
  turnstileToken: z.string(),
  // Honeypot field - should be empty for legitimate users
  website: z.string().optional(),
})

const LOGGER_PREFIX = '[waitlist/subscribe.post]:'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse)
  const { email, turnstileToken, website } = body

  const serverLogger = useServerLogger()

  // Verify Turnstile token first
  const isValid = await verifyTurnstileToken(turnstileToken)
  if (!isValid) {
    serverLogger.warn(`${LOGGER_PREFIX} Invalid Turnstile token`, { email })
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid security verification. Please try again.',
    })
  }

  // Check for honeypot field
  if (website && website.length > 0) {
    serverLogger.warn(`${LOGGER_PREFIX} Honeypot triggered`, { email })
    // Return success to not reveal the honeypot
    return { message: 'Thank you for your interest!', success: true }
  }

  // Check for rate limiting (handled by nuxt-security middleware)
  const rateLimitHeader = getHeader(event, 'x-ratelimit-remaining')
  if (rateLimitHeader === '0') {
    serverLogger.warn(`${LOGGER_PREFIX} Rate limit exceeded`, { email })
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.',
    })
  }

  // Validate email and check for disposable domains
  const emailValidation = validateEmail(email)
  if (!emailValidation.isValid) {
    serverLogger.warn(`${LOGGER_PREFIX} Invalid email`, { email, errors: emailValidation.errors })
    throw createError({
      statusCode: 400,
      statusMessage: emailValidation.errors.join(', '),
    })
  }

  try {
    const { addItem, getItemByEmail } = useWaitlistDb()
    const { sendWaitlistVerificationEmail } = useEmail()

    const existingRecord = await getItemByEmail(email)
    if (existingRecord) {
      if (!existingRecord.emailVerified) {
        serverLogger.info(`${LOGGER_PREFIX} Already subscribed to waitlist but email is not verified`, { email })
        throw createError({
          statusCode: 409,
          statusMessage: 'Already subscribed to waitlist but email is not verified',
        })
      }

      serverLogger.info(`${LOGGER_PREFIX} Already subscribed to waitlist`, { email })
      throw createError({
        statusCode: 409,
        statusMessage: 'Already subscribed to waitlist',
      })
    }

    const emailVerificationToken = nanoid()
    const record = await addItem({ email, emailVerificationToken })

    await sendWaitlistVerificationEmail(email, emailVerificationToken)

    return record
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to add to waitlist`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
