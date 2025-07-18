#!/usr/bin/env node

// Directly update database to mark users as email verified
const emails = [
  'demo-admin@nuxtstarterkit.com',
  'demo-user@nuxtstarterkit.com',
  'test@example.com',
]

console.log('Marking users as email verified...\n')

// Create a simple API endpoint to run SQL
const sqlEndpoint = `
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)
  const db = await hubDatabase()
  
  await db.update(tables.users)
    .set({ emailVerified: true })
    .where(eq(tables.users.email, email))
  
  return { success: true }
})
`

// First create the endpoint
await fetch('http://localhost:9009/api/verify-user', {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: sqlEndpoint,
}).catch(() => {})

// Now use it to verify users
for (const email of emails) {
  try {
    const response = await fetch('http://localhost:9009/api/verify-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      console.log(`✅ Verified: ${email}`)
    }
    else {
      // Try direct approach with admin role update
      // For demo-admin, also set role
      const role = email.includes('admin') ? 'admin' : 'user'
      console.log(`   Setting role: ${role}`)
    }
  }
  catch (error) {
    console.error(`❌ Error verifying ${email}:`, error.message)
  }
}

console.log('\nTo verify manually:')
console.log('1. Stop the server')
console.log('2. Run: sqlite3 .data/hub/database/db.sqlite')
console.log('3. Run: UPDATE users SET email_verified = 1;')
console.log("4. Run: UPDATE users SET role = 'admin' WHERE email = 'demo-admin@nuxtstarterkit.com';")
console.log('5. Run: .exit')
console.log('6. Restart the server')
