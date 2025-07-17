import z from 'zod'

const bodySchema = z.object({
  html: z.string(),
  subject: z.string(),
})

const LOGGER_PREFIX = '[admin/waitlist/email.post]:'

export default defineEventHandler(async (event) => {
  const { html, subject } = await readValidatedBody(event, bodySchema.parse)

  const serverLogger = useServerLogger()

  try {
    const { getAllItems } = useWaitlistDb()
    const { private: { fromEmail } } = useRuntimeConfig(event)

    const records = await getAllItems()

    if (!records || records.length === 0) {
      return {
        message: 'No waitlist entries found',
      }
    }

    const emailOptions = {
      from: fromEmail,
      html,
      subject,
      to: records.map(record => record.email),
    }
    await getEmailProvider().send(emailOptions)

    return { message: `Email sent to ${records.length} waitlist entries` }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to send email to waitlist entries`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
