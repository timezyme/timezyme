import type { InsertUser } from '~/layers/db/server/utils/schema'

declare module '#auth-utils' {
  interface User extends InsertUser {
    avatarUrl?: null | string
    banned: boolean
    bannedReason?: null | string
    createdAt?: Date
    email: string
    emailVerified: boolean
    hashedPassword?: null | string
    id: string
    lastActive?: Date
    name: string
    onboarded: boolean
    role: string
    updatedAt?: Date
  }

  interface UserSession {
    impersonatedBy?: string
  }
}
export {}
