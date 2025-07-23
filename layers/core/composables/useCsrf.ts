export function useCsrf () {
  // Get the CSRF token from the meta tag (nuxt-csurf adds this)
  let csrf = ''

  if (import.meta.client) {
    const metaTag = document.querySelector('meta[name="csrf-token"]')
    csrf = metaTag?.getAttribute('content') || ''
  }

  // On server, get from the nuxt app context if available
  if (import.meta.server) {
    const { ssrContext } = useNuxtApp()
    csrf = ssrContext?.event?.context?.csrfToken || ''
  }

  return {
    csrf,
    headerName: 'x-csrf-token',
  }
}
