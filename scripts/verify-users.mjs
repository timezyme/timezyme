#!/usr/bin/env node

// Script to mark users as email verified for testing

const emails = [
  'demo-admin@nuxtstarterkit.com',
  'demo-user@nuxtstarterkit.com',
  'test@example.com',
]

console.log('Marking users as email verified...\n')

for (const email of emails) {
  try {
    const response = await fetch('http://localhost:9009/api/_db/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `UPDATE users SET email_verified = 1 WHERE email = '${email}'`,
      }),
    })

    if (response.ok) {
      console.log(`✅ Verified: ${email}`)
    }
    else {
      console.error(`❌ Failed to verify ${email}`)
    }
  }
  catch (error) {
    console.error(`❌ Error verifying ${email}:`, error.message)
  }
}

console.log('\nUsers should now be able to login!')
