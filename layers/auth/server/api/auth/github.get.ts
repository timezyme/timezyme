import type { OAuthUser } from '~~/layers/db/server/utils/useUserDb'

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  onError (event, error) {
    const serverLogger = useServerLogger()
    serverLogger.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
  async onSuccess (event, { user }) {
    const { getSanitizedUser, handleOAuthLogin } = useUserDb()

    const oauthUser: OAuthUser = {
      avatarUrl: user.avatar_url,
      email: user.email || '',
      name: user.name,
      providerId: 'github',
      providerUserId: user.id.toString(),
    }
    const dbUser = await handleOAuthLogin(oauthUser)
    if (dbUser.banned) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Your account has been banned',
      })
    }

    const sanitizedUser = getSanitizedUser(dbUser)
    await setUserSession(event, { user: sanitizedUser! })
    return sendRedirect(event, '/dashboard')
  },
})
