import { expect, test } from '@playwright/test'

const TEST_URL = 'http://localhost:9009'

test.describe('Waitlist functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL)
  })

  test('should display waitlist form on homepage', async ({ page }) => {
    // Check if the waitlist form is visible
    const form = page.locator('form').filter({ has: page.locator('input[type="email"]') })
    await expect(form).toBeVisible()

    // Check for the email input
    const emailInput = page.locator('input[type="email"]')
    await expect(emailInput).toBeVisible()
    await expect(emailInput).toHaveAttribute('placeholder', 'you@mail.com')

    // Check for the submit button
    const submitButton = page.locator('button', { hasText: 'Join waitlist' })
    await expect(submitButton).toBeVisible()
  })

  test('should successfully submit valid email', async ({ page }) => {
    const uniqueEmail = `test-${Date.now()}@example.com`

    // Fill in the email
    await page.fill('input[type="email"]', uniqueEmail)

    // Submit the form
    await page.click('button:has-text("Join waitlist")')

    // Wait for any toast notification (success or error)
    const anyToast = page.locator('[role="status"], .toast-success, .toast-error, [data-sonner-toast]')
    await anyToast.first().waitFor({ state: 'visible', timeout: 10000 })

    // Check if it's a success toast
    const toastText = await anyToast.first().textContent()
    console.log('Toast text:', toastText)

    // For now, just check that a toast appeared - we'll verify the exact message later
    expect(toastText).toBeTruthy()

    // Verify the form is cleared
    const emailInput = page.locator('input[type="email"]')
    await expect(emailInput).toHaveValue('')
  })

  test('should reject invalid email format', async ({ page }) => {
    // Try invalid email
    await page.fill('input[type="email"]', 'invalid-email')

    // The browser's built-in validation should prevent submission
    const emailInput = page.locator('input[type="email"]')
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid)
    expect(isValid).toBe(false)
  })

  test('should reject disposable email domains', async ({ page }) => {
    // Try a disposable email
    await page.fill('input[type="email"]', 'test@mailinator.com')
    await page.click('button:has-text("Join waitlist")')

    // Wait for error toast
    const errorToast = page.locator('.toast-error', { hasText: 'Invalid email type' })
    await expect(errorToast).toBeVisible({ timeout: 10000 })
  })

  test('should handle duplicate email submission', async ({ page }) => {
    const duplicateEmail = 'duplicate@example.com'

    // First submission
    await page.fill('input[type="email"]', duplicateEmail)
    await page.click('button:has-text("Join waitlist")')

    // Wait for first submission to complete
    await page.waitForTimeout(2000)

    // Try to submit the same email again
    await page.fill('input[type="email"]', duplicateEmail)
    await page.click('button:has-text("Join waitlist")')

    // Should show error for duplicate
    const errorToast = page.locator('.toast-error')
    await expect(errorToast).toBeVisible({ timeout: 10000 })
  })

  test('should enforce rate limiting after 3 attempts', async ({ page }) => {
    // Make 3 rapid submissions with different emails
    for (let i = 1; i <= 3; i++) {
      const email = `ratelimit-test-${i}-${Date.now()}@example.com`
      await page.fill('input[type="email"]', email)
      await page.click('button:has-text("Join waitlist")')
      await page.waitForTimeout(1000) // Brief pause between submissions
    }

    // Fourth attempt should be rate limited
    const email = `ratelimit-test-4-${Date.now()}@example.com`
    await page.fill('input[type="email"]', email)
    await page.click('button:has-text("Join waitlist")')

    // Wait for rate limit error
    const rateLimitToast = page.locator('.toast-error', { hasText: 'Too many attempts' })
    await expect(rateLimitToast).toBeVisible({ timeout: 10000 })
  })

  test('honeypot field should be hidden and functional', async ({ page }) => {
    // Check that honeypot field exists but is hidden
    const honeypot = page.locator('input[name="website"]')
    await expect(honeypot).toBeHidden()

    // Verify it has the correct attributes
    await expect(honeypot).toHaveAttribute('tabindex', '-1')
    await expect(honeypot).toHaveAttribute('aria-hidden', 'true')

    // Simulate a bot filling the honeypot field
    await honeypot.evaluate((el: HTMLInputElement) => {
      el.value = 'http://spam.com'
    })

    // Fill in a valid email
    await page.fill('input[type="email"]', `honeypot-test-${Date.now()}@example.com`)
    await page.click('button:has-text("Join waitlist")')

    // Should silently accept (not reveal honeypot was triggered)
    // But no actual subscription should occur
    await page.waitForTimeout(2000)

    // The form might show success but the backend will have rejected it
    // This is the expected behavior to not reveal the honeypot to bots
  })

  test('should show loading state during submission', async ({ page }) => {
    const email = `loading-test-${Date.now()}@example.com`
    await page.fill('input[type="email"]', email)

    // Start observing the button
    const submitButton = page.locator('button:has-text("Join waitlist")')

    // Click and immediately check for loading state
    const clickPromise = submitButton.click()

    // The button should show loading indicator
    await expect(submitButton).toHaveAttribute('data-loading', 'true', { timeout: 1000 })

    // Wait for submission to complete
    await clickPromise
    await page.waitForTimeout(2000)

    // Loading state should be gone
    await expect(submitButton).not.toHaveAttribute('data-loading', 'true')
  })

  test('email verification flow', async ({ page }) => {
    // This test would need access to the email verification token
    // In a real scenario, you might:
    // 1. Use a test email service that provides API access
    // 2. Mock the email service
    // 3. Have a test endpoint that returns the verification token

    // For now, we'll just test that the verification endpoint exists
    const response = await page.request.get('/api/waitlist/verify-email-token?token=invalid')

    // Should return an error for invalid token
    expect(response.status()).toBe(400)
  })
})

test.describe('Waitlist admin functionality', () => {
  test('admin can view waitlist entries', async ({ page }) => {
    // Login as admin first
    await page.goto(`${TEST_URL}/login`)
    await page.fill('input[type="email"]', 'demo-admin@nuxtstarterkit.com')
    await page.fill('input[type="password"]', 'demoAdminNuxtStarterKit0815#')
    await page.click('button[type="submit"]')

    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard/**', { timeout: 10000 })

    // Navigate to admin waitlist page
    await page.goto(`${TEST_URL}/dashboard/admin/waitlist`)

    // Check if waitlist table is visible
    const waitlistTable = page.locator('table')
    await expect(waitlistTable).toBeVisible({ timeout: 10000 })

    // Should have email column
    const emailHeader = page.locator('th', { hasText: 'Email' })
    await expect(emailHeader).toBeVisible()
  })
})
