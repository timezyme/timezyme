# Auth Layer

This layer provides authentication functionality using `nuxt-auth-utils`.

## TypeScript Type Definitions

The User interface is augmented in `/auth.d.ts` (project root) to include all necessary user properties.

**Important**: The type declaration file MUST be in the project root, not in the auth layer or types directory.

## User Properties

The following properties are available on the User object:

- `id`: Unique user identifier
- `email`: User email address
- `name`: Display name
- `avatarUrl`: Optional profile picture URL
- `role`: User role (e.g., 'admin', 'user')
- `banned`: Boolean indicating if user is banned
- `bannedReason`: Optional reason for ban
- `emailVerified`: Email verification status
- `onboarded`: Onboarding completion status
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp
- `lastActive`: Last activity timestamp
- `hashedPassword`: Hashed password (server-only)

## Usage

```typescript
const { user } = await useUserSession()

if (user.value) {
  // Access user properties
  const userId = user.value.id
  const userEmail = user.value.email
  const userRole = user.value.role
}
```

## Server-side Usage

```typescript
const user = await requireUser(event)
// or
const user = await requireUser(event, { message: 'Forbidden', statusCode: 403 })

// For admin-only routes
const admin = await requireAdmin(event)
```
