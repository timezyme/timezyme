import { expect, test } from '@nuxt/test-utils/playwright'

import { testUsers } from '../fixtures/users'
import { LoginPage } from '../page/auth/login.page'
import { SignupPage } from '../page/auth/signup.page'
import { generateTestEmail, waitForToast } from '../utils/test-helpers'

test.describe('Authentication Flows', () => {
  test.describe('Login', () => {
    test('should login with valid credentials', async ({ page }) => {
      const loginPage = new LoginPage(page)

      await loginPage.goto()
      await loginPage.expectToBeOnLoginPage()

      // Use demo user that should exist from seed
      await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)

      // Should redirect to dashboard after successful login
      await loginPage.expectSuccessfulLogin()

      // Verify user is authenticated
      const cookies = await page.context().cookies()
      expect(cookies.some(c => c.name === 'nuxt-session')).toBe(true)
    })

    test('should show error with invalid credentials', async ({ page }) => {
      const loginPage = new LoginPage(page)

      await loginPage.goto()

      // Try to login with wrong password
      await loginPage.login(testUsers.demoUser.email, 'wrongpassword')

      // Should show error message
      await loginPage.expectErrorMessage('Invalid email or password')

      // Should still be on login page
      await loginPage.expectToBeOnLoginPage()
    })

    test('should show error with non-existent user', async ({ page }) => {
      const loginPage = new LoginPage(page)

      await loginPage.goto()

      // Try to login with non-existent user
      await loginPage.login('nonexistent@test.com', 'password123')

      // Should show error message
      await loginPage.expectErrorMessage('Invalid email or password')
    })

    test('should validate email format', async ({ page }) => {
      const loginPage = new LoginPage(page)

      await loginPage.goto()

      // Try to login with invalid email
      await loginPage.login('notanemail', 'password123')

      // Check for HTML5 validation or custom validation
      const emailInput = loginPage.emailInput
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    })

    test('should redirect authenticated users away from login', async ({ goto, page }) => {
      const loginPage = new LoginPage(page)

      // First login
      await loginPage.goto()
      await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)
      await loginPage.expectSuccessfulLogin()

      // Try to visit login page again
      await goto('/auth/login')

      // Should redirect to dashboard
      await expect(page).toHaveURL(/.*\/dashboard/)
    })
  })

  test.describe('Signup', () => {
    test('should create new account with valid data', async ({ page }) => {
      const signupPage = new SignupPage(page)
      const newEmail = generateTestEmail()

      await signupPage.goto()
      await signupPage.expectToBeOnSignupPage()

      // Fill signup form
      await signupPage.signup(
        'Test User',
        newEmail,
        'ValidPassword123!',
        'ValidPassword123!',
      )

      // Should show success message or redirect to verification
      await Promise.race([
        signupPage.expectSuccessMessage(),
        signupPage.expectRedirectToVerification(),
      ])
    })

    test('should validate password requirements', async ({ page }) => {
      const signupPage = new SignupPage(page)

      await signupPage.goto()

      // Try with short password
      await signupPage.signup(
        'Test User',
        generateTestEmail(),
        '123',
        '123',
      )

      // Should show error about password requirements
      await signupPage.expectErrorMessage(/password/i)
    })

    test('should prevent duplicate email registration', async ({ page }) => {
      const signupPage = new SignupPage(page)

      await signupPage.goto()

      // Try to register with existing email
      await signupPage.signup(
        'Another User',
        testUsers.demoUser.email,
        'ValidPassword123!',
        'ValidPassword123!',
      )

      // Should show error about email already in use
      await signupPage.expectErrorMessage(/already exists|already in use/i)
    })

    test('should validate matching passwords', async ({ page }) => {
      const signupPage = new SignupPage(page)

      await signupPage.goto()

      // Fill with mismatched passwords
      await signupPage.signup(
        'Test User',
        generateTestEmail(),
        'Password123!',
        'DifferentPassword123!',
      )

      // Should show error about passwords not matching
      await signupPage.expectErrorMessage(/passwords.*match/i)
    })
  })

  test.describe('Password Reset', () => {
    test('should request password reset', async ({ goto, page }) => {
      await goto('/auth/forgot-password')

      // Fill email
      await page.fill('input[name="email"]', testUsers.demoUser.email)
      await page.click('button[type="submit"]')

      // Should show success message
      const toast = await waitForToast(page, 'reset link')
      await expect(toast).toBeVisible()
    })

    test('should handle non-existent email gracefully', async ({ goto, page }) => {
      await goto('/auth/forgot-password')

      // Fill non-existent email
      await page.fill('input[name="email"]', 'nonexistent@test.com')
      await page.click('button[type="submit"]')

      // Should still show success (for security reasons)
      const toast = await waitForToast(page, 'reset link')
      await expect(toast).toBeVisible()
    })
  })

  test.describe('Logout', () => {
    test('should logout successfully', async ({ goto, page }) => {
      const loginPage = new LoginPage(page)

      // First login
      await loginPage.goto()
      await loginPage.login(testUsers.demoUser.email, testUsers.demoUser.password)
      await loginPage.expectSuccessfulLogin()

      // Find and click logout
      await page.click('button[aria-label="User menu"]')
      await page.click('text=Logout')

      // Should redirect to home or login
      await page.waitForURL('**/')

      // Verify user is logged out
      const cookies = await page.context().cookies()
      expect(cookies.some(c => c.name === 'nuxt-session')).toBe(false)

      // Try to access protected route
      await goto('/dashboard')

      // Should redirect to login
      await expect(page).toHaveURL(/.*\/auth\/login/)
    })
  })
})
