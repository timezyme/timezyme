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
  try {
    // Use seed-user endpoint that properly hashes passwords
    const response = await fetch('http://localhost:9009/api/seed-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        password: user.password,  // Send plain password, endpoint will hash it
        role: user.role
      })
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log(`✓ ${result.updated ? 'Updated' : 'Created'} ${user.role}: ${user.email}`)
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

# No need to check or create seed endpoint - it already exists

# Run seeding
echo ""
echo "Seeding database..."
node /tmp/seed-db.mjs

# Cleanup
rm /tmp/seed-db.mjs

echo ""
echo -e "${GREEN}✅ Database seeded successfully!${NC}"