#!/usr/bin/env node

import crypto from 'node:crypto'

// Scrypt parameters matching the app's implementation
const SCRYPT_PARAMS = {
  N: 16384,
  r: 8,
  p: 1,
  dkLen: 64,
}

function hashPassword (password) {
  const salt = crypto.randomBytes(16)
  const derivedKey = crypto.scryptSync(password, salt, SCRYPT_PARAMS.dkLen, {
    N: SCRYPT_PARAMS.N,
    r: SCRYPT_PARAMS.r,
    p: SCRYPT_PARAMS.p,
  })
  return `${salt.toString('hex')}:${derivedKey.toString('hex')}`
}

const email = process.argv[2] || 'test@example.com'
const password = process.argv[3] || 'testPassword123!'
const name = process.argv[4] || email.split('@')[0]
const role = process.argv[5] || 'user'

console.log(`Creating user: ${email}`)

const hashedPassword = hashPassword(password)

const response = await fetch('http://localhost:9009/api/seed-user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    name,
    hashedPassword,
    role,
  }),
})

const result = await response.json()

if (response.ok) {
  console.log('✅ User created successfully!')
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)
}
else {
  console.error('❌ Failed to create user:', result)
}
