import type { OAuthUser } from '~~/layers/db/server/utils/useUserDb'

export default defineOAuthGoogleEventHandler({
  onError (event, error) {
    const serverLogger = useServerLogger()
    serverLogger.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
  async onSuccess (event, { user }) {
    const { getSanitizedUser, handleOAuthLogin } = useUserDb()

    const oauthUser: OAuthUser = {
      avatarUrl: user.picture,
      email: user.email,
      name: user.name,
      providerId: 'google',
      providerUserId: user.sub,
    }
    const dbUser = await handleOAuthLogin(oauthUser)
    if (dbUser.banned) {
      throw createError({
        statusCode: 403,
        statusMessage: 'You account has been banned',
      })
    }

    const sanitizedUser = getSanitizedUser(dbUser)
    await setUserSession(event, { user: sanitizedUser! })
    return sendRedirect(event, '/dashboard')
  },
})
