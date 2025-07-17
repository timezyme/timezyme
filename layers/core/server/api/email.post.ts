import z from 'zod'

const bodySchema = z.object({
  html: z.string(),
  subject: z.string().min(10),
  to: z.string().email(),
})

const LOGGER_PREFIX = '[email.post]:'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()

  const { html, subject, to } = await readValidatedBody(event, bodySchema.parse)

  try {
    const { private: { fromEmail } } = useRuntimeConfig(event)
    const emailOptions = {
      from: fromEmail,
      html,
      subject,
      to,
    }
    await getEmailProvider().send(emailOptions)
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to send email`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
