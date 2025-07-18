import { expect, test } from '@nuxt/test-utils/playwright'

import { testUsers } from '../fixtures/users'
import { LoginPage } from '../page/auth/login.page'

test.describe('Protected Routes', () => {
  test('should redirect unauthenticated users to login', async ({ goto, page }) => {
    const protectedRoutes = [
      '/dashboard',
      '/dashboard/account',
      '/dashboard/billing',
      '/admin',
      '/admin/users',
    ]

    for (const route of protectedRoutes) {
      await goto(route)

      // Should redirect to login page
      await expect(page).toHaveURL(/.*\/auth\/login/)

      // Should show login form
      await expect(page.getByLabel('Email')).toBeVisible()
    }
  })

  test('should allow authenticated users to access dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page)

    // Login first
    await loginPage.goto()
    await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)
    await loginPage.expectSuccessfulLogin()

    // Should be able to access dashboard routes
    const dashboardRoutes = [
      '/dashboard',
      '/dashboard/account',
      '/dashboard/billing',
    ]

    for (const route of dashboardRoutes) {
      await page.goto(route)
      await page.waitForLoadState('networkidle')

      // Should stay on the route (not redirect)
      expect(page.url()).toContain(route)

      // Should show dashboard content
      await expect(page.getByRole('navigation')).toBeVisible()
    }
  })

  test('should restrict admin routes to admin users', async ({ page }) => {
    const loginPage = new LoginPage(page)

    // Login as regular user
    await loginPage.goto()
    await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)
    await loginPage.expectSuccessfulLogin()

    // Try to access admin route
    await page.goto('/admin')

    // Should either redirect or show forbidden
    const url = page.url()
    const isForbidden = await page.getByText(/forbidden|unauthorized|access denied/i).isVisible().catch(() => false)

    expect(url.includes('/admin') === false || isForbidden).toBe(true)
  })

  test('should allow admin users to access admin routes', async ({ page }) => {
    const loginPage = new LoginPage(page)

    // Login as admin user
    await loginPage.goto()
    await loginPage.login(testUsers.demoAdmin.email, testUsers.demoAdmin.password)
    await loginPage.expectSuccessfulLogin()

    // Should be able to access admin routes
    await page.goto('/admin')
    await page.waitForLoadState('networkidle')

    // Should show admin dashboard
    expect(page.url()).toContain('/admin')
    await expect(page.getByRole('heading', { name: /admin/i })).toBeVisible()
  })

  test('should preserve redirect URL after login', async ({ goto, page }) => {
    const targetUrl = '/dashboard/billing'

    // Try to access protected route
    await goto(targetUrl)

    // Should redirect to login
    await expect(page).toHaveURL(/.*\/auth\/login/)

    // Login
    const loginPage = new LoginPage(page)
    await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)

    // Should redirect back to original URL
    await page.waitForURL(`**${targetUrl}`)
    expect(page.url()).toContain(targetUrl)
  })

  test('should handle session expiry gracefully', async ({ context, page }) => {
    const loginPage = new LoginPage(page)

    // Login first
    await loginPage.goto()
    await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)
    await loginPage.expectSuccessfulLogin()

    // Clear cookies to simulate session expiry
    await context.clearCookies()

    // Try to access protected route
    await page.goto('/dashboard')

    // Should redirect to login
    await expect(page).toHaveURL(/.*\/auth\/login/)
  })
})
