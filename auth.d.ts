declare module '#auth-utils' {
  interface User {
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
