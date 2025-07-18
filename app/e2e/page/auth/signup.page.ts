import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

import { BasePage } from '../base.page'

export class SignupPage extends BasePage {
  readonly nameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly confirmPasswordInput: Locator
  readonly submitButton: Locator
  readonly loginLink: Locator
  readonly termsCheckbox: Locator
  readonly errorMessage: Locator
  readonly successMessage: Locator

  constructor (page: Page) {
    super(page)
    this.nameInput = page.locator('input[name="name"]')
    this.emailInput = page.locator('input[name="email"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.confirmPasswordInput = page.getByLabel('Confirm Password')
    this.submitButton = page.getByRole('button', { name: /create|sign up/i })
    this.loginLink = page.getByRole('link', { name: /sign in|log in/i })
    this.termsCheckbox = page.getByRole('checkbox', { name: /terms/i })
    this.errorMessage = page.getByRole('alert')
    this.successMessage = page.getByText(/verification email/i)
  }

  override async goto () {
    await super.goto('/auth/register')
    await this.waitForHydration()
  }

  async signup (name: string, email: string, password: string, confirmPassword?: string) {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)

    // Check if confirm password field exists
    const confirmPasswordVisible = await this.confirmPasswordInput.isVisible().catch(() => false)
    if (confirmPasswordVisible) {
      await this.confirmPasswordInput.fill(confirmPassword || password)
    }

    // Check if terms checkbox exists
    const termsVisible = await this.termsCheckbox.isVisible().catch(() => false)
    if (termsVisible) {
      await this.termsCheckbox.check()
    }

    await this.submitButton.click()
  }

  async expectToBeOnSignupPage () {
    await expect(this.page).toHaveURL(/.*\/auth\/register/)
    await expect(this.nameInput).toBeVisible()
    await expect(this.emailInput).toBeVisible()
    await expect(this.passwordInput).toBeVisible()
    await expect(this.submitButton).toBeVisible()
  }

  async expectErrorMessage (text: RegExp | string) {
    await expect(this.errorMessage).toBeVisible()
    await expect(this.errorMessage).toContainText(text)
  }

  async expectSuccessMessage () {
    await expect(this.successMessage).toBeVisible()
  }

  async expectRedirectToVerification () {
    await this.page.waitForURL('**/auth/verify', { timeout: 10000 })
    await expect(this.page).toHaveURL(/.*\/auth\/verify/)
  }
}
