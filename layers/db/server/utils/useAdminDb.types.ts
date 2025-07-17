export type AdminUsersTableFilter = 'all' | 'github' | 'google' | 'proPlan' | 'unverified' | 'verified'

export const adminUsersTableFilters = ['all', 'github', 'google', 'unverified', 'verified', 'proPlan'] satisfies Array<AdminUsersTableFilter>

export const zodEnum = <T>(array: Array<T>): [T, ...Array<T>] => array as [T, ...Array<T>]

interface AdminSelectUserSubscription {
  id: string
  name: string
  status: string
}

export interface AdminSelectUser extends SelectUser {
  hasLifeTimeDeal: boolean
  hasPassword?: boolean
  linkedAccounts: Array<string>
  subscription: AdminSelectUserSubscription | null
}

export interface AdminUsersResponse {
  page: number
  pageSize: number
  totalCount: number
  users: Array<AdminSelectUser>
}
