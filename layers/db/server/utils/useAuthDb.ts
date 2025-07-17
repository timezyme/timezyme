import { and, desc, eq } from 'drizzle-orm'
import { customAlphabet, nanoid } from 'nanoid'

const LOGGER_PREFIX = '[useAuthDb]:'

export function useAuthDb () {
  const serverLogger = useServerLogger()

  const generateEmailVerificationCode = async (
    userId: string,
    expiresIn: number = 1000 * 60 * 60 * 3, // 3 hours default
  ): Promise<string> => {
    const code = nanoid(32)

    try {
      await useDB()
        .insert(tables.userEmailVerificationCodes)
        .values({
          code,
          expiresAt: new Date(new Date().getTime() + expiresIn),
          userId,
        })

      return code
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to generate email verification code`, error)
      throw new Error('Failed to generate email verification code')
    }
  }

  const generateOneTimePassword = async (
    userId: string,
    identifier: string,
    type: OneTimePassword,
    expiresIn: number = 1000 * 60 * 60 * 3, // 3 hours default
  ): Promise<string> => {
    try {
      const code = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)()

      await useDB()
        .insert(tables.userOneTimePasswords)
        .values({
          code,
          expiresAt: new Date(new Date().getTime() + expiresIn),
          identifier,
          type,
          userId,
        })

      return code
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to generate one time password`, error)
      throw new Error('Failed to generate one time password')
    }
  }

  const getOneTimePassword = async (code: string, type: string, identifier: string) => {
    try {
      const storedOtp = await useDB()
        .select()
        .from(tables.userOneTimePasswords)
        .where(
          and(
            eq(tables.userOneTimePasswords.code, code),
            eq(tables.userOneTimePasswords.type, type),
            eq(tables.userOneTimePasswords.identifier, identifier),
          ),
        )
        .get()

      return storedOtp || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to find one time password`, error)
      throw new Error('Failed to find one time password')
    }
  }

  const getOneTimePasswordByUserId = async (userId: string) => {
    try {
      const storedOtp = await useDB()
        .select()
        .from(tables.userOneTimePasswords)
        .where(eq(tables.userOneTimePasswords.userId, userId))
        .get()

      return storedOtp || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to find one time password`, error)
      throw new Error(`Failed to find one time password: ${error}`)
    }
  }

  const getLatestOneTimePasswordByEmail = async (email: string, type: string) => {
    try {
      const [latestOtp] = await useDB()
        .select()
        .from(tables.userOneTimePasswords)
        .where(and(eq(tables.userOneTimePasswords.identifier, email), eq(tables.userOneTimePasswords.type, type)))
        .orderBy(desc(tables.userOneTimePasswords.expiresAt))
        .limit(1)

      return latestOtp || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to find latest one time password`, error)
      throw new Error(`Failed to find latest one time password: ${error}`)
    }
  }

  const deleteOneTimePassword = async (id: string) => {
    try {
      const record = await useDB()
        .delete(tables.userOneTimePasswords)
        .where(eq(tables.userOneTimePasswords.id, id))
        .returning()
        .get()

      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to delete one time password`, error)
      throw new Error(`Failed to delete one time password: ${error}`)
    }
  }

  const getEmailVerificationCode = async (code: string) => {
    try {
      const existingCode = await useDB()
        .select()
        .from(tables.userEmailVerificationCodes)
        .where(eq(tables.userEmailVerificationCodes.code, code))
        .get()
      return existingCode || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to find verification code`, error)
      throw new Error('Failed to find verification code')
    }
  }

  const getEmailVerificationCodeByUserId = async (userId: string) => {
    try {
      const existingCode = await useDB()
        .select()
        .from(tables.userEmailVerificationCodes)
        .where(eq(tables.userEmailVerificationCodes.userId, userId))
        .get()
      return existingCode || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to find verification code for user ${userId}`, error)
      return null
    }
  }

  const deleteEmailVerificationCode = async (id: number) => {
    try {
      const record = await useDB()
        .delete(tables.userEmailVerificationCodes)
        .where(eq(tables.userEmailVerificationCodes.id, id))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to delete email verification code`, error)
      throw new Error(`Failed to delete email verification code: ${error}`)
    }
  }

  const generateResetPasswordToken = async (
    userId: string,
    expiresIn: number = 1000 * 60 * 60 * 3, // 3 hours default
  ): Promise<string> => {
    try {
      const code = nanoid(32)

      await useDB()
        .insert(tables.userPasswordResetTokens)
        .values({
          code,
          expiresAt: new Date(new Date().getTime() + expiresIn),
          userId,
        })

      return code
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to generate password reset token`, error)
      throw new Error('Failed to generate password reset token')
    }
  }

  const getPasswordResetToken = async (code: string) => {
    try {
      const existingToken = await useDB()
        .select()
        .from(tables.userPasswordResetTokens)
        .where(eq(tables.userPasswordResetTokens.code, code))
        .get()
      return existingToken || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get password reset token`, error)
      throw new Error('Failed to get password reset token')
    }
  }

  const deletePasswordResetToken = async (id: number) => {
    try {
      const record = await useDB()
        .delete(tables.userPasswordResetTokens)
        .where(eq(tables.userPasswordResetTokens.id, id))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to delete password reset token`, error)
      throw new Error('Failed to delete password reset token')
    }
  }

  return {
    deleteEmailVerificationCode,
    deleteOneTimePassword,
    deletePasswordResetToken,
    generateEmailVerificationCode,
    generateOneTimePassword,
    generateResetPasswordToken,
    getEmailVerificationCode,
    getEmailVerificationCodeByUserId,
    getLatestOneTimePasswordByEmail,
    getOneTimePassword,
    getOneTimePasswordByUserId,
    getPasswordResetToken,
  }
}
