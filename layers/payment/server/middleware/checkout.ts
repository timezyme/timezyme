export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/payment/checkout')) {
    return
  }

  const requestUrl = getRequestURL(event)

  const customerExternalId = requestUrl.searchParams.get('customerExternalId')
  if (customerExternalId) {
    return
  }

  const { user } = event.context

  requestUrl.searchParams.set('customerExternalId', user.id)
  requestUrl.searchParams.set('customerEmail', user.email)
  requestUrl.searchParams.set('customerName', user.name)

  return sendRedirect(event, requestUrl.toString())
})
