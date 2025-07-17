import { eq } from 'drizzle-orm'

const LOGGER_PREFIX = '[useSubscriptionsDb]:'

export function useSubscriptionsDb () {
  const serverLogger = useServerLogger()

  const getSubscriptionByUserId = async (userId: string) => {
    try {
      const subscription = await useDB()
        .select()
        .from(tables.userSubscriptions)
        .where(eq(tables.userSubscriptions.userId, userId))
        .get()

      return subscription || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get subscription for user ID ${userId}`, error)
      return null
    }
  }

  const upsertSubscription = async (payload: InsertSubscription) => {
    try {
      const result = await useDB()
        .insert(tables.userSubscriptions)
        .values(payload)
        .onConflictDoUpdate({
          set: payload,
          target: tables.userSubscriptions.id,
        })
        .returning()
        .get()

      return result || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to upsert subscription`, error)
      throw new Error('Failed to upsert subscription', { cause: error })
    }
  }

  const deleteSubscription = async (userId: string) => {
    try {
      return useDB()
        .delete(tables.userSubscriptions)
        .where(eq(tables.userSubscriptions.userId, userId))
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to delete subscription`, error)
      throw new Error('Failed to delete subscription', { cause: error })
    }
  }

  return {
    deleteSubscription,
    getSubscriptionByUserId,
    upsertSubscription,
  }
}
