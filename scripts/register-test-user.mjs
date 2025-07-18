#!/usr/bin/env node

const users = [
  {
    email: 'demo-admin@nuxtstarterkit.com',
    name: 'Demo Admin',
    password: 'demoAdminNuxtStarterKit0815#',
  },
  {
    email: 'demo-user@nuxtstarterkit.com',
    name: 'Demo User',
    password: 'demoUserNuxtStarterKit',
  },
  {
    email: 'test@example.com',
    name: 'Test User',
    password: 'testPassword123!',
  },
]

console.log('Creating test users...\n')

for (const user of users) {
  try {
    const response = await fetch('http://localhost:9009/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (response.ok) {
      await response.json()
      console.log(`✅ Created: ${user.email}`)
      console.log(`   Name: ${user.name}`)
      console.log(`   Password: ${user.password}`)
      console.log('')
    }
    else if (response.status === 400) {
      console.log(`⚠️  User already exists: ${user.email}`)
    }
    else {
      const error = await response.text()
      console.error(`❌ Failed to create ${user.email}: ${error}`)
    }
  }
  catch (error) {
    console.error(`❌ Error creating ${user.email}:`, error.message)
  }
}

console.log('\nDemo credentials:')
console.log('================')
users.forEach((user) => {
  console.log(`${user.email.padEnd(30)} | ${user.password}`)
})
