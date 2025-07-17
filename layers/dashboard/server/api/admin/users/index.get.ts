import { useAdminDb } from '~~/layers/db/server/utils/useAdminDb'
import { adminUsersTableFilters, zodEnum } from '~~/layers/db/server/utils/useAdminDb.types'
import type { AdminSelectUser, AdminUsersResponse } from '~~/layers/db/server/utils/useAdminDb.types'
import z from 'zod'

const LOGGER_PREFIX = '[admin/users/index.get]:'

const querySchema = z.object({
  filter: z.enum(zodEnum(adminUsersTableFilters)).optional().default('all'),
  page: z.number({ coerce: true }).int().positive().default(1),
  pageSize: z.number({ coerce: true }).int().positive().default(10),
  search: z.string().optional().default(''),
})

export default defineEventHandler(async (event): Promise<AdminUsersResponse> => {
  const serverLogger = useServerLogger()

  const { public: { adminDemoModeEnabled } } = useRuntimeConfig(event)

  try {
    const { filter, page, pageSize, search } = await getValidatedQuery(event, querySchema.parse)

    const { getAllUsers } = useAdminDb()
    const result = await getAllUsers({
      event,
      filter,
      page,
      pageSize,
      search,
    })

    if (!result) {
      throw createError({
        message: 'Failed to fetch user data',
        statusCode: 500,
      })
    }

    const { getSanitizedUser } = useUserDb()
    const cleanedRecords = result.users.map(record => ({
      ...getSanitizedUser(record, true),
      ...(adminDemoModeEnabled && {
        avatarUrl: '/images/user-avatars/avatar-placeholder.png',
        email: mask(record.email),
        id: mask(record.id),
        name: mask(record.name),
      }),
      hasPassword: !!record.hashedPassword,
      linkedAccounts: record.linkedAccounts,
    } as AdminSelectUser))

    return {
      page: result.page,
      pageSize: result.pageSize,
      totalCount: result.totalCount,
      users: cleanedRecords,
    }
  }
  catch (error: any) {
    serverLogger.error(`${LOGGER_PREFIX} Failed to get all users`, error)
    throw createError({
      ...error,
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
    })
  }
})
