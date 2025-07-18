#!/bin/bash

# Seed database with demo data

echo "🌱 Seeding database with demo data..."
echo "===================================="

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if dev server is running
if [ ! -f .dev.pid ] || ! ps -p $(cat .dev.pid) > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Dev server not running. Starting it now...${NC}"
    ./scripts/dev-start.sh
    sleep 5
fi

# Create seed script
cat > /tmp/seed-db.mjs << 'EOF'
import crypto from 'crypto'

// Scrypt parameters matching the app's implementation
const SCRYPT_PARAMS = {
  N: 16384,
  r: 8,
  p: 1,
  dkLen: 64
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const derivedKey = crypto.scryptSync(password, salt, SCRYPT_PARAMS.dkLen, {
    N: SCRYPT_PARAMS.N,
    r: SCRYPT_PARAMS.r,
    p: SCRYPT_PARAMS.p
  })
  return salt.toString('hex') + ':' + derivedKey.toString('hex')
}

// Demo users
const users = [
  {
    email: 'demo-admin@nuxtstarterkit.com',
    name: 'Demo Admin',
    password: 'demoAdminNuxtStarterKit0815#',
    role: 'admin'
  },
  {
    email: 'demo-user@nuxtstarterkit.com',
    name: 'Demo User',
    password: 'demoUserNuxtStarterKit',
    role: 'user'
  },
  {
    email: 'test@example.com',
    name: 'Test User',
    password: 'testPassword123!',
    role: 'user'
  }
]

console.log('Creating demo users...')

for (const user of users) {
  const hashedPassword = hashPassword(user.password)
  
  try {
    const response = await fetch('http://localhost:9009/api/seed-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        hashedPassword,
        role: user.role
      })
    })
    
    if (response.ok) {
      console.log(`✓ Created ${user.role}: ${user.email}`)
    } else {
      console.error(`✗ Failed to create ${user.email}:`, await response.text())
    }
  } catch (error) {
    console.error(`✗ Error creating ${user.email}:`, error.message)
  }
}

console.log('\nDemo credentials:')
console.log('================')
users.forEach(user => {
  console.log(`${user.role.padEnd(6)} | ${user.email.padEnd(30)} | ${user.password}`)
})
EOF

# Check if seed endpoint exists
echo "Checking for seed endpoint..."
if ! grep -r "api/seed-user" app/server/api/ > /dev/null 2>&1; then
    echo -e "${YELLOW}Creating seed endpoint...${NC}"
    
    # Create seed API endpoint
    mkdir -p app/server/api
    cat > app/server/api/seed-user.post.ts << 'EOF'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden'
    })
  }
  
  const { email, name, hashedPassword, role } = await readBody(event)
  
  try {
    const db = await hubDatabase()
    
    // Check if user exists
    const existingUser = await db
      .select()
      .from(tables.users)
      .where(eq(tables.users.email, email))
      .limit(1)
    
    if (existingUser.length > 0) {
      // Update existing user
      await db.update(tables.users)
        .set({
          name,
          role,
          updatedAt: new Date()
        })
        .where(eq(tables.users.email, email))
      
      // Update password
      await db.update(tables.passwords)
        .set({
          hashedPassword,
          updatedAt: new Date()
        })
        .where(eq(tables.passwords.userId, existingUser[0].id))
      
      return { updated: true, email }
    } else {
      // Create new user
      const userId = generateId('usr')
      
      await db.insert(tables.users)
        .values({
          id: userId,
          email,
          name,
          role,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      
      await db.insert(tables.passwords)
        .values({
          userId,
          hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      
      return { created: true, email }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})
EOF
fi

# Run seeding
echo ""
echo "Seeding database..."
node /tmp/seed-db.mjs

# Cleanup
rm /tmp/seed-db.mjs

echo ""
echo -e "${GREEN}✅ Database seeded successfully!${NC}"