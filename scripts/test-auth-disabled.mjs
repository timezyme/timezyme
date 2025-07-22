#!/usr/bin/env node

import { chromium } from '@playwright/test'

const BASE_URL = 'http://localhost:9009'

async function testAuthDisabled () {
  console.log('🧪 Testing authentication disabled features...\n')

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  const results = []

  // Test 1: Homepage should not show login/register buttons
  console.log('1️⃣ Testing homepage UI...')
  await page.goto(BASE_URL)
  const loginButton = await page.locator('a[href="/auth/login"]').count()
  const registerButton = await page.locator('a[href="/auth/register"]').count()
  results.push({
    test: 'Homepage auth buttons hidden',
    passed: loginButton === 0 && registerButton === 0,
    expected: 'No login/register buttons',
    actual: `Login: ${loginButton}, Register: ${registerButton}`,
  })

  // Test 2: Auth routes should redirect to home
  console.log('2️⃣ Testing auth route redirects...')
  const authRoutes = ['/auth/login', '/auth/register', '/dashboard', '/admin', '/pricing']
  for (const route of authRoutes) {
    await page.goto(BASE_URL + route)
    await page.waitForLoadState()
    const currentUrl = page.url()
    results.push({
      test: `${route} redirects to home`,
      passed: currentUrl === `${BASE_URL}/`,
      expected: `${BASE_URL}/`,
      actual: currentUrl,
    })
  }

  // Test 3: API endpoints should return 404
  console.log('3️⃣ Testing API endpoints...')
  const apiEndpoints = [
    '/api/auth/google',
    '/api/auth/github',
    '/api/auth/login-with-password',
    '/api/auth/register',
  ]

  for (const endpoint of apiEndpoints) {
    const response = await page.request.get(BASE_URL + endpoint)
    results.push({
      test: `${endpoint} returns 404`,
      passed: response.status() === 404,
      expected: '404',
      actual: response.status().toString(),
    })
  }

  // Test 4: Waitlist should still work
  console.log('4️⃣ Testing waitlist functionality...')
  await page.goto(BASE_URL)
  const waitlistForm = await page.locator('input[type="email"]').count()
  results.push({
    test: 'Waitlist form visible',
    passed: waitlistForm > 0,
    expected: 'Form visible',
    actual: waitlistForm > 0 ? 'Form visible' : 'Form not found',
  })

  // Test 5: Navigation menu should not have pricing
  console.log('5️⃣ Testing navigation menu...')
  const pricingLink = await page.locator('a[href="/pricing"]').count()
  results.push({
    test: 'Pricing link hidden',
    passed: pricingLink === 0,
    expected: 'No pricing link',
    actual: pricingLink === 0 ? 'No pricing link' : 'Pricing link found',
  })

  await browser.close()

  // Print results
  console.log('\n📊 Test Results:\n')
  let passedCount = 0
  results.forEach((result) => {
    const icon = result.passed ? '✅' : '❌'
    console.log(`${icon} ${result.test}`)
    if (!result.passed) {
      console.log(`   Expected: ${result.expected}`)
      console.log(`   Actual: ${result.actual}`)
    }
    if (result.passed)
      passedCount++
  })

  console.log(`\n📈 Summary: ${passedCount}/${results.length} tests passed`)

  process.exit(passedCount === results.length ? 0 : 1)
}

testAuthDisabled().catch(console.error)
