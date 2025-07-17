const LOGGER_PREFIX = '[useLifeTimeDealsDb]:'

export function useLifeTimeDealsDb () {
  const serverLogger = useServerLogger()

  const getLifeTimeDealByUserId = async (userId: string) => {
    try {
      const product = await useDB()
        .select()
        .from(tables.userLifeTimeDeals)
        .where(eq(tables.userLifeTimeDeals.userId, userId))
        .get()
      return product || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get by user ID ${userId}`, error)
      return null
    }
  }

  const createLifeTimeDeal = async (payload: InsertUserLifeTimeDeals) => {
    try {
      const result = await useDB()
        .insert(tables.userLifeTimeDeals)
        .values(payload)
        .returning()
        .get()

      return result || null
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to create lifetime deal`, error)
      throw new Error('Failed to create lifetime deal', { cause: error })
    }
  }

  return {
    createLifeTimeDeal,
    getLifeTimeDealByUserId,
  }
}
