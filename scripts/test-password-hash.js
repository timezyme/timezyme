#!/usr/bin/env node

// Test password hashing with the known demo user credentials
const passwords = [
  { hash: '$scrypt$16384$8$1$1kUCNMhRO6c0Y+R7EE+TSQ$RNz0Kslx1vNQE3IFEdGLo9UHl/ycL5YLnmVYDJR+vFqcOHBVlBW0sB1dFpqVlOqOcdK6vFLulv9jseqLcdXoFw', password: 'demoUserNuxtStarterKit', user: 'demo-user' },
  { hash: '$scrypt$16384$8$1$wZxgsnY7CEzCFkVCKmQNiA$CJ/CPBqHMXrqcr8BFLSJqR0A+i7jJVxuLaZH5a3lFW1akmjTKJlYOLhudD6lLdJz1OFW0e8fZ/GG8K3ZZHsRJA', password: 'demoAdminNuxtStarterKit0815#', user: 'demo-admin' },
]

async function testPasswords () {
  try {
    // Import the necessary modules
    const { hashPassword, verifyPassword } = await import('../.nuxt/types/nitro-imports.js').catch(() => {
      console.error('Could not import from Nuxt build. Make sure to run "pnpm build" first.')
      process.exit(1)
    })

    console.log('Testing password verification...\n')

    for (const { hash, password, user } of passwords) {
      console.log(`Testing ${user}:`)
      console.log(`  Password: ${password}`)
      console.log(`  Hash: ${hash.substring(0, 50)}...`)

      try {
        const isValid = await verifyPassword(hash, password)
        console.log(`  Valid: ${isValid ? '✅' : '❌'}`)

        // Also generate a new hash to compare
        const newHash = await hashPassword(password)
        console.log(`  New hash: ${newHash.substring(0, 50)}...`)
        console.log(`  Hashes match: ${hash === newHash ? 'Yes' : 'No (expected - salt is random)'}`)
      }
      catch (error) {
        console.log(`  Error: ${error.message}`)
      }
      console.log('')
    }
  }
  catch (error) {
    console.error('Error:', error)
  }
}

testPasswords()
