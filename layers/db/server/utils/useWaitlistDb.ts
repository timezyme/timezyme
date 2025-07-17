import { desc, eq } from 'drizzle-orm'

import type { InsertWaitlist } from './schema'

const LOGGER_PREFIX = '[useWaitlistDb]:'

export function useWaitlistDb () {
  const serverLogger = useServerLogger()

  const getItemById = async (id: string) => {
    try {
      const item = await useDB()
        .select()
        .from(tables.waitlist)
        .where(eq(tables.waitlist.id, id))
        .get()
      return item || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get waitlist item by user ID ${id}`, error)
      throw new Error('Failed to get waitlist item by user ID')
    }
  }

  const getItemByVerificationToken = async (emailVerificationToken: string) => {
    try {
      const item = await useDB()
        .select()
        .from(tables.waitlist)
        .where(eq(tables.waitlist.emailVerificationToken, emailVerificationToken))
        .get()
      return item || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get waitlist item by email verification token: ${emailVerificationToken}`, error)
      throw new Error('Failed to get waitlist item by email verification token')
    }
  }

  const getItemByEmail = async (email: string) => {
    try {
      const item = await useDB()
        .select()
        .from(tables.waitlist)
        .where(eq(tables.waitlist.email, email))
        .get()
      return item || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get waitlist item for email: ${email}`, error)
      throw new Error('Failed to get waitlist item by email')
    }
  }

  const addItem = async (payload: InsertWaitlist) => {
    try {
      const record = await useDB()
        .insert(tables.waitlist)
        .values(payload)
        .onConflictDoUpdate({
          set: payload,
          target: tables.waitlist.id,
        })
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to add waitlist item`, error)
      throw new Error('Failed to add waitlist item')
    }
  }

  const updateItem = async (item: InsertWaitlist) => {
    try {
      const record = await useDB()
        .update(tables.waitlist)
        .set({ ...item })
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to update waitlist item`, error)
      throw new Error('Failed to update waitlist item')
    }
  }

  const deleteItem = async (id: string) => {
    try {
      const record = await useDB()
        .delete(tables.waitlist)
        .where(eq(tables.waitlist.id, id))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to delete waitlist item`, error)
      throw new Error('Failed to delete waitlist item')
    }
  }

  const getAllItems = async () => {
    try {
      const records = await useDB()
        .select()
        .from(tables.waitlist)
        .orderBy(desc(tables.waitlist.createdAt))
      return records
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get waitlist items`, error)
      return []
    }
  }

  return {
    addItem,
    deleteItem,
    getAllItems,
    getItemByEmail,
    getItemById,
    getItemByVerificationToken,
    updateItem,
  }
}
