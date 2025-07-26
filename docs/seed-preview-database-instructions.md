# Seeding Preview Database Instructions

Since the preview environment is protected by Cloudflare Access, we need to seed the database directly through the Cloudflare D1 console.

## Steps to Seed the Preview Database

### 1. Access the D1 Console
You're already in the Cloudflare D1 console for the `timezyme-preview` database (as shown in your screenshot).

### 2. Run the SQL Commands
In the Query editor (where it shows "Ln 1 Col 1"), paste and run the following SQL commands:

```sql
-- Demo User
INSERT INTO users (
  id,
  email,
  name,
  hashedPassword,
  role,
  emailVerified,
  onboarded,
  banned,
  createdAt,
  updatedAt
) VALUES (
  'cm07xxxxxdemouser',
  'demo-user@nuxtstarterkit.com',
  'Demo User',
  '$scrypt$16384$8$1$1kUCNMhRO6c0Y+R7EE+TSQ$RNz0Kslx1vNQE3IFEdGLo9UHl/ycL5YLnmVYDJR+vFqcOHBVlBW0sB1dFpqVlOqOcdK6vFLulv9jseqLcdXoFw',
  'user',
  1,
  1,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT(email) DO UPDATE SET
  name = excluded.name,
  hashedPassword = excluded.hashedPassword,
  role = excluded.role,
  updatedAt = CURRENT_TIMESTAMP;
```

Then run:

```sql
-- Demo Admin
INSERT INTO users (
  id,
  email,
  name,
  hashedPassword,
  role,
  emailVerified,
  onboarded,
  banned,
  createdAt,
  updatedAt
) VALUES (
  'cm07xxxxxdemoadmin',
  'demo-admin@nuxtstarterkit.com',
  'Demo Admin',
  '$scrypt$16384$8$1$wZxgsnY7CEzCFkVCKmQNiA$CJ/CPBqHMXrqcr8BFLSJqR0A+i7jJVxuLaZH5a3lFW1akmjTKJlYOLhudD6lLdJz1OFW0e8fZ/GG8K3ZZHsRJA',
  'admin',
  1,
  1,
  0,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT(email) DO UPDATE SET
  name = excluded.name,
  hashedPassword = excluded.hashedPassword,
  role = excluded.role,
  updatedAt = CURRENT_TIMESTAMP;
```

### 3. Verify the Users Were Created
After running the INSERT commands, run this query to verify:

```sql
SELECT id, email, name, role FROM users;
```

You should see two rows:
- demo-user@nuxtstarterkit.com (role: user)
- demo-admin@nuxtstarterkit.com (role: admin)

### 4. Click the Run Button
Click the blue "Run" button in the top right of the query editor to execute each SQL command.

## Alternative: Using Wrangler CLI

If you prefer to use the command line, you can also seed the database using wrangler:

```bash
# First, ensure you're logged into wrangler
wrangler login

# Execute SQL file
wrangler d1 execute timezyme-preview --file=./scripts/seed-preview-db.sql
```

## Demo User Credentials

After seeding, the following users will be available:

1. **Demo User**
   - Email: demo-user@nuxtstarterkit.com
   - Password: demoUserNuxtStarterKit

2. **Demo Admin**
   - Email: demo-admin@nuxtstarterkit.com
   - Password: demoAdminNuxtStarterKit0815#

## Notes

- The preview environment is protected by Cloudflare Access, which is why direct API calls are being redirected
- The SQL commands use `ON CONFLICT` to handle cases where the users might already exist
- The hashed passwords are pre-computed using the Scrypt algorithm that the application expects
- The IDs are placeholder values - D1 will generate proper UUIDs if needed