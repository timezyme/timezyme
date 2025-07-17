/**
 *  /middlewares/checkout.ts adds some query parameters for this request
 */
export default defineEventHandler((event) => {
  const { private: { polarAccessToken, polarServer } } = useRuntimeConfig(event)

  const requestUrl = getRequestURL(event)

  const checkoutHandler = Checkout({
    accessToken: polarAccessToken,
    server: polarServer as 'production' | 'sandbox',
    successUrl: `${requestUrl.origin}/dashboard/settings/billing`,
  })

  return checkoutHandler(event)
})
