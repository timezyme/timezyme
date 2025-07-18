import { expect, test } from '@playwright/test'

/**
 * System Health Check Tests
 *
 * These tests verify the most critical functionality is working.
 * They are designed to be fast and reliable.
 */

test.describe('System Health Check', () => {
  test('Authentication system is operational', async ({ page, request }) => {
    const results = {
      authApiWorks: false,
      loginPageWorks: false,
      protectedRoutesSecured: false,
    }

    // 1. Login page is accessible
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')
    results.loginPageWorks = page.url().includes('/auth/login')

    // 2. Auth API responds (using curl we know this works)
    try {
      const response = await request.post('/api/auth/login-with-password', {
        data: {
          email: 'demo-user@nuxtstarterkit.com',
          password: 'demoUserNuxtStarterKit',
        },
        failOnStatusCode: false,
        maxRedirects: 0,
      })
      // Playwright follows redirects, so 200 means it worked
      results.authApiWorks = response.status() === 200 || response.status() === 302
    }
    catch {
      results.authApiWorks = false
    }

    // 3. Protected routes redirect to login
    await page.context().clearCookies()
    await page.goto('/dashboard', { waitUntil: 'networkidle' })
    results.protectedRoutesSecured = page.url().includes('/auth/login')

    // Report
    console.log('System Health Check Results:', results)

    // All must pass
    expect(results.loginPageWorks).toBe(true)
    expect(results.authApiWorks).toBe(true)
    expect(results.protectedRoutesSecured).toBe(true)
  })

  test('Navigation between pages works', async ({ page }) => {
    // Start at home
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    expect(page.url()).toBe('http://localhost:9009/')

    // Navigate to login
    await page.getByRole('link', { name: 'Log In' }).click()
    await page.waitForURL('**/auth/login')
    expect(page.url()).toContain('/auth/login')

    // Navigate to register
    await page.getByRole('link', { name: 'Sign up' }).click()
    await page.waitForURL('**/auth/register')
    expect(page.url()).toContain('/auth/register')
  })
})
