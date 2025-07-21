import { Resend } from 'resend'

import type { SendEmailHandler } from '../utils/getEmailProvider.types'

const LOGGER_PREFIX = '[email/providers/resend]:'

export function resendProvider (): EmailProvider {
  const event = useEvent()
  const { private: { emailResendApiToken } } = useRuntimeConfig(event)
  const serverLogger = useServerLogger()

  if (!emailResendApiToken) {
    const error = createError({
      status: 500,
      statusMessage: 'Resend API token is not configured',
    })
    serverLogger.error(`${LOGGER_PREFIX} Resend API token is not configured`, error)
    throw error
  }

  // Initialize Resend SDK - Use process.env directly as a fallback
  const apiKey = emailResendApiToken || process.env.NUXT_PRIVATE_EMAIL_RESEND_API_TOKEN
  const resend = new Resend(apiKey)

  const send: SendEmailHandler = async ({ from, html, subject, text, to }) => {
    try {
      // Prepare email options - only include html OR text, not both
      const emailOptions: any = {
        from,
        subject,
        to: Array.isArray(to) ? to : [to],
      }

      // Resend SDK requires either html, text, or react - not multiple
      if (html) {
        emailOptions.html = html
      }
      else if (text) {
        emailOptions.text = text
      }
      else {
        // Default to text if neither is provided
        emailOptions.text = ''
      }

      const { data, error } = await resend.emails.send(emailOptions)

      if (error) {
        const catchError = createError({
          statusCode: 500,
          statusMessage: error.message || 'Failed to send email',
        })
        serverLogger.error(`${LOGGER_PREFIX} Failed to send email to "${to}" with Resend`, catchError)
        throw catchError
      }

      serverLogger.info(`${LOGGER_PREFIX} Email sent successfully`, { emailId: data?.id, to })
      // Return void as per the interface
    }
    catch (error: any) {
      const catchError = createError({
        ...error,
        statusCode: error.status || error.statusCode || 500,
        statusMessage: error.statusMessage || error.message || 'Unknown error occurred',
      })
      serverLogger.error(`${LOGGER_PREFIX} Failed to send email to "${to}" with Resend`, catchError)
      throw catchError
    }
  }

  return { send }
}
