#!/usr/bin/env node

import { $fetch } from 'ofetch'

const BASE_URL = 'http://localhost:9009'

async function testAuth () {
  console.log('Testing authentication endpoints...\n')

  // Test 1: Check login page is accessible
  try {
    await $fetch('/auth/login', { baseURL: BASE_URL })
    console.log('✅ Login page is accessible')
  }
  catch (error) {
    console.error('❌ Cannot access login page:', error.message)
  }

  // Test 2: Try to login with demo user
  try {
    console.log('\nAttempting login with demo user...')
    const response = await $fetch('/api/auth/login-with-password', {
      baseURL: BASE_URL,
      method: 'POST',
      body: {
        email: 'demo-user@nuxtstarterkit.com',
        password: 'demoUserNuxtStarterKit',
      },
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('✅ Login successful:', response)
  }
  catch (error) {
    console.error('❌ Login failed:', error.data || error.message)
  }

  // Test 3: Try to login with wrong password
  try {
    console.log('\nAttempting login with wrong password...')
    await $fetch('/api/auth/login-with-password', {
      baseURL: BASE_URL,
      method: 'POST',
      body: {
        email: 'demo-user@nuxtstarterkit.com',
        password: 'wrongpassword',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('❓ Unexpected: Login should have failed')
  }
  catch {
    console.log('✅ Login correctly failed with wrong password')
  }

  // Test 4: Check if demo admin exists
  try {
    console.log('\nAttempting login with demo admin...')
    const response = await $fetch('/api/auth/login-with-password', {
      baseURL: BASE_URL,
      method: 'POST',
      body: {
        email: 'demo-admin@nuxtstarterkit.com',
        password: 'demoAdminNuxtStarterKit0815#',
      },
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('✅ Admin login successful:', response)
  }
  catch (error) {
    console.error('❌ Admin login failed:', error.data || error.message)
  }
}

testAuth().catch(console.error)
