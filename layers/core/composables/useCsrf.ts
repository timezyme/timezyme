export function useCsrf () {
  const csrfCookie = useCookie('csrf', {
    httpOnly: false,
    sameSite: 'strict',
    secure: true,
  })

  return {
    csrf: csrfCookie.value || '',
  }
}
