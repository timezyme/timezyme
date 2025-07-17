export default eventHandler(async (event) => {
  const { pathname } = event.context.params || {}

  if (!pathname) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Image not found',
    })
  }

  return hubBlob().serve(event, pathname)
})
