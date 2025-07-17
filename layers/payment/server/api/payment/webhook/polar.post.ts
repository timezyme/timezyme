import { Polar } from '@polar-sh/sdk'

export default defineEventHandler(async (event) => {
  const serverLogger = useServerLogger()
  const { private: { polarWebhookSecret } } = useRuntimeConfig(event)

  const webhooksHandler = Webhooks({
    onCheckoutUpdated: async (payload) => {
      const LOGGER_PREFIX = '[payment/webhook/polar.post][onCheckoutUpdated]:'

      serverLogger.info(`${LOGGER_PREFIX} type: ${payload.type}`)

      try {
        const { data: { product: { recurringInterval } } } = payload

        if (recurringInterval) {
          serverLogger.info(`${LOGGER_PREFIX} Checkout of product with recurring interval -> handled by onCustomerStateChanged`)
          return
        }

        // Skip one-time purchases as we no longer offer lifetime deals
        serverLogger.info(`${LOGGER_PREFIX} One-time purchase detected -> skipping (lifetime deals no longer offered)`)
      }
      catch (error: any) {
        serverLogger.error(`${LOGGER_PREFIX} Failed to process checkout update`, error)
      }
    },
    onCustomerStateChanged: async (payload) => {
      const LOGGER_PREFIX = '[payment/webhook/polar.post][onCustomerStateChanged]:'

      serverLogger.info(`${LOGGER_PREFIX} type: ${payload.type}`)

      try {
        const { data: { activeSubscriptions, externalId, id } } = payload

        if (!externalId) {
          const error = createError({ statusCode: 400, statusMessage: 'Missing external ID' })
          serverLogger.error(`${LOGGER_PREFIX} Missing external ID`, error)
          return
        }

        const { deleteSubscription, getSubscriptionByUserId, upsertSubscription } = useSubscriptionsDb()
        const subscription = await getSubscriptionByUserId(externalId)

        // we only allow one active subscription per customer, this a Polar setting configuration
        const activeSubscription = activeSubscriptions[0]

        if (subscription && !activeSubscription) {
          serverLogger.info(`${LOGGER_PREFIX} no active subscription in state but found subscription but in DB -> delete subscription row`)
          await deleteSubscription(externalId)
          return
        }
        else if (!activeSubscription) {
          serverLogger.info(`${LOGGER_PREFIX} no active subscription in state and no subscription in DB -> skipping`)
          return
        }

        const { private: { polarAccessToken, polarServer } } = useRuntimeConfig(event)
        const polar = new Polar({
          accessToken: polarAccessToken,
          server: polarServer as 'production' | 'sandbox',
        })
        const product = await polar.products.get({ id: activeSubscription.productId })

        const insertSubscription: InsertSubscription = {
          amount: activeSubscription.amount ?? 0,
          createdAt: activeSubscription.createdAt,
          currency: activeSubscription.currency ?? '[missing]',
          endsAt: activeSubscription.endsAt,
          id,
          name: product.name,
          priceId: (activeSubscription as any).priceId ?? '[missing]',
          productId: activeSubscription.productId ?? '[missing]',
          recurringInterval: activeSubscription.recurringInterval ?? '[missing]',
          startedAt: activeSubscription.startedAt,
          status: activeSubscription.status ?? '[missing]',
          userId: externalId,
        }
        serverLogger.info(`${LOGGER_PREFIX} onCustomerStateChanged with active subscription, upsert subscription row`, insertSubscription)

        await upsertSubscription(insertSubscription)
      }
      catch (error: any) {
        serverLogger.error(`${LOGGER_PREFIX} Failed to process customer state change`, error)
      }
    },
    webhookSecret: polarWebhookSecret,
  })

  return webhooksHandler(event)
})
