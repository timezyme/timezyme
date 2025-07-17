import { Polar } from '@polar-sh/sdk'

const LOGGER_PREFIX = '[payment/customer-portal.get]'

export default defineEventHandler((event) => {
  const { private: { polarAccessToken, polarServer } } = useRuntimeConfig(event)
  const serverLogger = useServerLogger()

  const { user } = event.context

  const polar = new Polar({
    accessToken: polarAccessToken,
    server: polarServer as 'production' | 'sandbox',
  })

  const customerPortalHandler = CustomerPortal({
    accessToken: polarAccessToken,
    getCustomerId: async () => {
      serverLogger.info(`${LOGGER_PREFIX} Get customer ID for user ID ${user.id}`)

      const customer = await polar.customers.getExternal({
        externalId: user.id,
      })

      return customer.id
    },
    server: polarServer as 'production' | 'sandbox',
  })

  return customerPortalHandler(event)
})
