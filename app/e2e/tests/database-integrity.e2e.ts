import { expect, test } from '@nuxt/test-utils/playwright'

import { testUsers } from '../fixtures/users'
import { LoginPage } from '../page/auth/login.page'

test.describe('Database Integrity Checks', () => {
  test('should verify demo users exist in database', async ({ page }) => {
    const loginPage = new LoginPage(page)

    // Test that demo admin can login
    await loginPage.goto()
    await loginPage.login(testUsers.demoAdmin.email, testUsers.demoAdmin.password)
    await loginPage.expectSuccessfulLogin()

    // Logout
    await page.click('button[aria-label="User menu"]')
    await page.click('text=Logout')
    await page.waitForURL('**/')

    // Test that demo user can login
    await loginPage.goto()
    await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)
    await loginPage.expectSuccessfulLogin()
  })

  test('should verify user data persistence', async ({ goto, page }) => {
    const loginPage = new LoginPage(page)

    // Login as demo user
    await loginPage.goto()
    await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)
    await loginPage.expectSuccessfulLogin()

    // Navigate to account page
    await goto('/dashboard/account')

    // Check that user data is displayed
    await expect(page.getByText(testUsers.demoUser.email)).toBeVisible()
    await expect(page.getByText(testUsers.demoUser.name)).toBeVisible()
  })

  test('should verify database tables exist', async ({ request }) => {
    // This would typically call an API endpoint that checks database health
    // For now, we verify by checking if auth endpoints work

    const loginResponse = await request.post('/api/auth/login', {
      data: {
        email: testUsers.demoUser.email,
        password: testUsers.demoUser.password,
      },
    })

    // If database is working, login should either succeed or fail with proper error
    expect([200, 401, 422]).toContain(loginResponse.status())

    // Check if we can reach the signup endpoint
    const signupResponse = await request.get('/auth/signup')
    expect(signupResponse.ok()).toBe(true)
  })

  test('should have at least expected number of users', async ({ page }) => {
    const loginPage = new LoginPage(page)

    // Login as admin to check user count
    await loginPage.goto()
    await loginPage.login(testUsers.demoAdmin.email, testUsers.demoAdmin.password)
    await loginPage.expectSuccessfulLogin()

    // Navigate to admin users page
    await page.goto('/admin/users')

    // Wait for users list to load
    await page.waitForSelector('table', { timeout: 10000 })

    // Count users in the table
    const userRows = await page.$$('table tbody tr')

    // Should have at least the demo users
    expect(userRows.length).toBeGreaterThanOrEqual(2)
  })

  test('should verify critical database fields are populated', async ({ page }) => {
    const loginPage = new LoginPage(page)

    // Login and check profile data
    await loginPage.goto()
    await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)
    await loginPage.expectSuccessfulLogin()

    // Go to account settings
    await page.goto('/dashboard/account')

    // Check critical fields are present
    const emailField = page.getByText(testUsers.demoUser.email)
    const nameField = page.getByText(testUsers.demoUser.name)

    await expect(emailField).toBeVisible()
    await expect(nameField).toBeVisible()

    // Check that user has expected role (not admin)
    const adminLink = page.getByRole('link', { name: 'Admin' })
    await expect(adminLink).not.toBeVisible()
  })
})

// Critical test that must always pass
test('CRITICAL: Database must contain seeded data', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const criticalUsers = [
    testUsers.demoAdmin,
    testUsers.demoUser,
  ]

  for (const user of criticalUsers) {
    await loginPage.goto()

    // Each demo user must be able to login
    await loginPage.login(user.email, user.password)

    // Must successfully redirect to dashboard
    await loginPage.expectSuccessfulLogin()

    // Logout for next test
    await page.click('button[aria-label="User menu"]')
    await page.click('text=Logout')
    await page.waitForURL('**/')
  }

  // If we get here, database has not been deleted
  expect(true).toBe(true)
})
