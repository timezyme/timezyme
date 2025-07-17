import { desc, eq, like, or, sql } from 'drizzle-orm'
import type { H3Event } from 'h3'

import type { InsertUser } from './schema'
import type { AdminUsersResponse, AdminUsersTableFilter } from './useAdminDb.types'

const LOGGER_PREFIX = '[useAdminDb]:'

export function useAdminDb () {
  const serverLogger = useServerLogger()

  const getAllUsers = async ({ filter = 'all', page = 1, pageSize = 10, search = '' }: { event: H3Event, filter?: AdminUsersTableFilter, page?: number, pageSize: number, search: string }): Promise<AdminUsersResponse | null> => {
    try {
      const offset = (page - 1) * pageSize

      let query: any = useDB()
        .select({
          lifeTimeDealProductId: sql`GROUP_CONCAT(DISTINCT ${tables.userLifeTimeDeals.productId})`.as('lifeTimeDealProductId'),
          oauthAccounts: sql`GROUP_CONCAT(DISTINCT ${tables.userOauthAccounts.providerId})`.as('linkedAccounts'),
          subscriptionName: sql`GROUP_CONCAT(DISTINCT ${tables.userSubscriptions.name})`.as('subscriptionName'),
          subscriptionProductId: sql`GROUP_CONCAT(DISTINCT ${tables.userSubscriptions.productId})`.as('subscriptionProductId'),
          subscriptionStatus: sql`GROUP_CONCAT(DISTINCT ${tables.userSubscriptions.status})`.as('subscriptionStatus'),
          user: tables.users,
        })
        .from(tables.users)
        .leftJoin(tables.userOauthAccounts, eq(tables.users.id, tables.userOauthAccounts.userId))
        .leftJoin(tables.userSubscriptions, eq(tables.users.id, tables.userSubscriptions.userId))
        .leftJoin(tables.userLifeTimeDeals, eq(tables.users.id, tables.userLifeTimeDeals.userId))

      // Apply search
      if (search) {
        query = query.where(or(like(tables.users.name, `%${search}%`), like(tables.users.email, `%${search}%`)))
      }

      // Apply filter
      if (filter === 'verified') {
        query = query.where(eq(tables.users.emailVerified, true))
      }
      else if (filter === 'unverified') {
        query = query.where(eq(tables.users.emailVerified, false))
      }
      else if (filter === 'google') {
        query = query.where(eq(tables.userOauthAccounts.providerId, 'google'))
      }
      else if (filter === 'github') {
        query = query.where(eq(tables.userOauthAccounts.providerId, 'github'))
      }
      else if (filter === 'proPlan') {
        query = query.where(or(
          sql`${tables.userSubscriptions.productId} IS NOT NULL`,
          sql`${tables.userLifeTimeDeals.productId} IS NOT NULL`,
        ))
      }

      query = query
        .groupBy(tables.users.id)
        .orderBy(desc(tables.users.createdAt))
        .limit(pageSize)
        .offset(offset)

      const records = await query

      const totalUsersCount = await useDB()
        .select({ count: sql`count(*)` })
        .from(tables.users)
      const totalCount = totalUsersCount[0]?.count ?? 0

      const users: Array<AdminSelectUser> = records.map((record: any) => {
        return {
          ...record.user,
          hasLifeTimeDeal: !!record.lifeTimeDealProductId,
          linkedAccounts: record.oauthAccounts ? record.oauthAccounts.split(',') : [],
          subscription: {
            id: record.subscriptionProductId,
            name: record.subscriptionName,
            status: record.subscriptionStatus,
          },
        }
      })

      return {
        page,
        pageSize,
        totalCount: totalCount as number,
        users,
      }
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to get all users`, error)
      return null
    }
  }

  const createNewUser = async (payload: InsertUser) => {
    try {
      const newUser = await useDB()
        .insert(tables.users)
        .values(payload)
        .returning()
        .get()
      return newUser
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to create new user`, error)
      throw new Error('Failed to create new user')
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      const deleted = await useDB()
        .delete(tables.users)
        .where(eq(tables.users.id, userId))
        .returning()
        .get()
      return deleted
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to delete user`, error)
      throw new Error('Failed to delete user')
    }
  }

  const updateBannedStatus = async (body: { bannedReason: string, status: boolean, userId: string }) => {
    try {
      const record = await useDB()
        .update(tables.users)
        .set({ banned: body.status, bannedReason: body.bannedReason })
        .where(eq(tables.users.id, body.userId))
        .returning()
        .get()
      return record
    }
    catch (error: any) {
      serverLogger.error(`${LOGGER_PREFIX} Failed to update ban status of user`, error)
      throw new Error('Failed to ban user')
    }
  }

  return {
    createNewUser,
    deleteUser,
    getAllUsers,
    updateBannedStatus,
  }
}
