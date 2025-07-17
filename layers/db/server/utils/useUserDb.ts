import type { InsertUser } from './schema'

const LOGGER_PREFIX = '[useUserDb]:'

export interface OAuthUser {
  avatarUrl: string
  email: string
  name: string
  providerId: 'github' | 'google'
  providerUserId: string
}

export function useUserDb () {
  const serverLogger = useServerLogger()

  const getOauthAccountByUserId = async (userId: string) => {
    try {
      const oauthAccount = await useDB()
        .select()
        .from(tables.userOauthAccounts)
        .where(eq(tables.userOauthAccounts.userId, userId))
        .get()
      return oauthAccount || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to find OAuth account by user ID "${userId}"`, error)
      throw new Error('Failed to find OAuth account by user ID')
    }
  }

  const createUserWithOAuthAccount = async (payload: InsertUser) => {
    try {
      const record = await useDB()
        .insert(tables.users)
        .values(payload)
        .onConflictDoUpdate({
          set: {
            avatarUrl: payload.avatarUrl,
            emailVerified: true,
            name: payload.name,
          },
          target: tables.users.email,
        })
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to create user with OAuth account`, error)
      throw new Error('Failed to create user with OAuth account')
    }
  }

  const getUserByEmail = async (email: string) => {
    try {
      const existingUser = await useDB()
        .select()
        .from(tables.users)
        .where(eq(tables.users.email, email))
        .get()
      return existingUser || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get user by email "${email}"`, error)
      return null
    }
  }

  const getUserById = async (userId: string) => {
    try {
      const existingUser = await useDB()
        .select()
        .from(tables.users)
        .where(eq(tables.users.id, userId))
        .get()
      return existingUser || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get user by ID "${userId}"`, error)
      return null
    }
  }

  const createUserWithPassword = async (payload: InsertUser) => {
    try {
      const record = await useDB()
        .insert(tables.users)
        .values(payload)
        .onConflictDoUpdate({
          set: {
            hashedPassword: payload.hashedPassword,
            name: payload.name,
          },
          target: tables.users.email,
        })
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to upsert user`, error)
      throw new Error('Failed to upsert user')
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const record = await useDB()
        .delete(tables.users)
        .where(eq(tables.users.id, userId))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to delete user`, error)
      throw new Error(`Failed to delete user: ${error}`)
    }
  }

  const updateUser = async (userId: string, payload: { avatarUrl?: string, name?: string, password?: string }) => {
    try {
      const record = await useDB()
        .update(tables.users)
        .set(payload)
        .where(eq(tables.users.id, userId))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to update user`, error)
      throw new Error('Failed to update user')
    }
  }

  const setEmailVerified = async (userId: string) => {
    try {
      const record = await useDB()
        .update(tables.users)
        .set({ emailVerified: true })
        .where(eq(tables.users.id, userId))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to verify user`, error)
      throw new Error('Failed to verify user')
    }
  }

  const updateLastActive = async (userId: string) => {
    try {
      const record = await useDB()
        .update(tables.users)
        .set({ lastActive: new Date() })
        .where(eq(tables.users.id, userId))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to update last active`, error)
      throw new Error('Failed to update last active')
    }
  }

  const updatePassword = async (userId: string, hashedPassword: string) => {
    try {
      const record = await useDB()
        .update(tables.users)
        .set({ hashedPassword })
        .where(eq(tables.users.id, userId))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to update user password`, error)
      throw new Error('Failed to update user password')
    }
  }

  const verifyUser = async (userId: string) => {
    try {
      const record = await useDB()
        .update(tables.users)
        .set({ emailVerified: true })
        .where(eq(tables.users.id, userId))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to verify user`, error)
      throw new Error('Failed to verify user')
    }
  }

  const getSanitizedUser = (user: InsertUser, showBannedData: boolean = false) => {
    if (!user) {
      return null
    }

    if (!showBannedData) {
      delete user.banned
      delete user.bannedReason
    }

    delete user.hashedPassword
    return user
  }

  const getLinkedOAuthAccountsByUserId = async (userId: string) => {
    try {
      const linkedAccounts = await useDB()
        .select()
        .from(tables.userOauthAccounts)
        .where(eq(tables.userOauthAccounts.userId, userId))
      return linkedAccounts
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get linked accounts by user ID ${userId}`, error)
      throw new Error('Failed to find linked accounts by user ID')
    }
  }

  const unlinkOAuthAccount = async (userId: string, accountId: string) => {
    try {
      const result = await useDB()
        .delete(tables.userOauthAccounts)
        .where(and(
          eq(tables.userOauthAccounts.userId, userId),
          eq(tables.userOauthAccounts.id, accountId),
        ))
        .returning()
      return result.length > 0
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to unlink account`, error)
      throw new Error('Failed to unlink account')
    }
  }

  const linkOAuthAccount = async (userId: string, providerId: string, providerUserId: string) => {
    try {
      const record = await useDB()
        .insert(tables.userOauthAccounts)
        .values({
          providerId,
          providerUserId,
          userId,
        })
        .onConflictDoNothing()
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to link OAuth account`, error)
      throw new Error('Failed to link OAuth account')
    }
  }

  async function handleOAuthLogin (oauthUser: OAuthUser) {
    let user = await getUserByEmail(oauthUser.email)
    if (!user) {
      user = await createUserWithOAuthAccount({
        avatarUrl: oauthUser.avatarUrl,
        email: oauthUser.email,
        emailVerified: true,
        name: oauthUser.name,
      })
    }
    else if (!user.avatarUrl) {
      user = await updateUser(user.id, {
        avatarUrl: oauthUser.avatarUrl,
      })
    }

    await linkOAuthAccount(user.id, oauthUser.providerId, oauthUser.providerUserId)

    return user
  }

  return {
    createUserWithOAuthAccount,
    createUserWithPassword,
    deleteUser,
    getLinkedOAuthAccountsByUserId,
    getOauthAccountByUserId,
    getSanitizedUser,
    getUserByEmail,
    getUserById,
    handleOAuthLogin,
    linkOAuthAccount,
    setEmailVerified,
    unlinkOAuthAccount,
    updateLastActive,
    updatePassword,
    updateUser,
    verifyUser,
  }
}
