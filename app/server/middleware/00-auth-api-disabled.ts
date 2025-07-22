export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  // Check if auth is disabled
  if (!config.public.authEnabled) {
    // Get the URL path
    const url = event.path || event.node.req.url

    // Check if the current path is an auth API endpoint
    if (url && url.startsWith('/api/auth/')) {
      // Set response status and end the response immediately
      event.node.res.statusCode = 404
      event.node.res.statusMessage = 'Not Found'
      event.node.res.setHeader('Content-Type', 'application/json')
      event.node.res.end(JSON.stringify({
        statusCode: 404,
        statusMessage: 'Not Found',
      }))
    }
  }
})
