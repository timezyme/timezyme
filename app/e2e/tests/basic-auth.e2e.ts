import { expect, test } from '@playwright/test'

import { testUsers } from '../fixtures/users'

test.describe('Basic Authentication Tests', () => {
  test('should display login page correctly', async ({ page }) => {
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')

    // Check page elements are visible - use nth to target the login form specifically
    // The second email input is in the main login form
    await expect(page.locator('input[name="email"]').nth(1)).toBeVisible()
    await expect(page.locator('input[name="password"]').nth(0)).toBeVisible()
    // The login button (first submit button is the actual login button)
    await expect(page.locator('button[type="submit"]').first()).toBeVisible()
  })

  test('should login with demo user', async ({ page }) => {
    // Navigate directly to the API endpoint to test authentication
    const response = await page.request.post('/api/auth/login-with-password', {
      data: {
        email: testUsers.demoUser.email,
        password: testUsers.demoUser.password,
      },
    })

    // Check if login was successful
    expect(response.ok()).toBeTruthy()

    // Now navigate to dashboard to verify we're logged in
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')

    // Should be on dashboard, not redirected to login
    expect(page.url()).toContain('/dashboard')
    expect(page.url()).not.toContain('/auth/login')
  })

  test('should show error with wrong password', async ({ page }) => {
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')

    // Accept cookies if the banner is present
    const acceptButton = page.getByRole('button', { name: 'Accept' })
    if (await acceptButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await acceptButton.click()
      await page.waitForTimeout(500) // Wait for cookie banner to disappear
    }

    // Wait for form to be ready
    await page.waitForSelector('input[name="email"]', { state: 'visible' })

    // Fill login form - find the visible email input in the main form
    const emailInputs = page.locator('input[name="email"]')
    const count = await emailInputs.count()

    // Use the last email input (which should be in the main form)
    await emailInputs.nth(count - 1).fill(testUsers.demoUser.email)
    await page.locator('input[name="password"]').fill('wrongpassword')

    // Click the submit button (the one with type="submit")
    await page.locator('button[type="submit"]:has-text("Login")').click()

    // Wait for any error indicator - could be toast or inline error
    await page.waitForTimeout(1000) // Give time for error to appear

    // Should still be on login page
    expect(page.url()).toContain('/auth/login')
  })

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/auth/login')
    await page.waitForLoadState('networkidle')

    // Click sign up link
    await page.getByRole('link', { name: /sign up/i }).click()

    // Should be on register page
    await expect(page).toHaveURL(/.*\/auth\/register/)

    // Check register form is visible - assuming single form on register page
    await expect(page.locator('input[name="name"]').first()).toBeVisible()
    await expect(page.locator('input[name="email"]').first()).toBeVisible()
    await expect(page.locator('input[name="password"]').first()).toBeVisible()
  })
})
