export default defineNuxtRouteMiddleware((to) => {
  const { isDisabled: isAuthDisabled } = useAuthFeature()

  // Only run if auth is disabled
  if (!isAuthDisabled.value) {
    return
  }

  // List of routes to block when auth is disabled
  const blockedRoutes = [
    '/auth',
    '/dashboard',
    '/admin',
    '/pricing',
  ]

  // Check if the current route should be blocked
  const shouldBlock = blockedRoutes.some(route => to.path.startsWith(route))

  if (shouldBlock) {
    return navigateTo('/')
  }
})
