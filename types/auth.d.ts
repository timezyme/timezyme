declare module '#auth-utils' {
  interface User extends InsertUser {
  }

  interface UserSession {
    impersonatedBy?: string
  }
}
export {}
