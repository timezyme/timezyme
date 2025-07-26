# Password Hash Format Fix

## Issue
Authentication was failing with "Invalid credentials" error despite correct passwords. The root cause was a password hash format mismatch between the seed script and the application's expectations.

## Root Cause
The `db-seed.sh` script was creating password hashes in an incompatible format:
- **Seed script format**: `salt:derivedKey` (e.g., `"abc123:def456"`)
- **Expected format**: `$scrypt$ln=16,r=8,p=1$<base64-salt>$<base64-hash>`

The application uses `nuxt-auth-utils` which expects password hashes in the standard scrypt format, but the seed script was manually creating hashes using a simple concatenation format.

## Solution
1. Updated `/app/server/api/seed-user.post.ts` to:
   - Accept plain passwords instead of pre-hashed passwords
   - Use the framework's `hashPassword` function from `nuxt-auth-utils`
   - Set `emailVerified: true` for seeded users

2. Updated `/scripts/db-seed.sh` to:
   - Send plain passwords to the seed endpoint
   - Remove the manual password hashing logic
   - Let the endpoint handle proper password hashing

## Key Changes

### Before (seed-user.post.ts)
```typescript
const { email, name, hashedPassword, role } = await readBody(event)
// ... directly used hashedPassword
```

### After (seed-user.post.ts)
```typescript
const { email, name, password, role } = await readBody(event)
// Hash the password using nuxt-auth-utils
const hashedPassword = await hashPassword(password)
```

### Before (db-seed.sh)
```javascript
function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const derivedKey = crypto.scryptSync(password, salt, SCRYPT_PARAMS.dkLen, {
    N: SCRYPT_PARAMS.N,
    r: SCRYPT_PARAMS.r,
    p: SCRYPT_PARAMS.p
  })
  return salt.toString('hex') + ':' + derivedKey.toString('hex')
}
```

### After (db-seed.sh)
```javascript
// No manual hashing - send plain password
body: JSON.stringify({
  email: user.email,
  name: user.name,
  password: user.password,  // Send plain password
  role: user.role
})
```

## Important Notes
- This aligns with CLAUDE.md documentation: "Always use Scrypt-based utilities when working with password hashing/verification"
- The issue was NOT related to Cloudflare Access (which was already disabled)
- The issue was NOT related to CSRF removal (unrelated to password verification)

## Testing
After the fix, authentication works correctly:
```bash
curl -X POST http://localhost:9009/api/auth/login-with-password \
  -H "Content-Type: application/json" \
  -d '{"email":"demo-user@nuxtstarterkit.com","password":"demoUserNuxtStarterKit"}'
# Returns: 302 redirect to /dashboard with session cookie
```

## Deployment
To deploy this fix:
1. Commit the updated `seed-user.post.ts` endpoint
2. Deploy to preview environment
3. Run the seed script on preview to update demo users with correct password hashes