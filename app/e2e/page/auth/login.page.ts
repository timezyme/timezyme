import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

import { BasePage } from '../base.page'

export class LoginPage extends BasePage {
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly signupLink: Locator
  readonly forgotPasswordLink: Locator
  readonly githubButton: Locator
  readonly googleButton: Locator
  readonly errorMessage: Locator

  constructor (page: Page) {
    super(page)
    this.emailInput = page.locator('input[name="email"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.submitButton = page.getByRole('button', { name: /login|sign in/i })
    this.signupLink = page.getByRole('link', { name: /sign up/i })
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot.*password/i })
    this.githubButton = page.getByRole('button', { name: /GitHub/i })
    this.googleButton = page.getByRole('button', { name: /Google/i })
    this.errorMessage = page.getByRole('alert')
  }

  override async goto () {
    await super.goto('/auth/login')
    await this.waitForHydration()
  }

  async login (email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

  async expectToBeOnLoginPage () {
    await expect(this.page).toHaveURL(/.*\/auth\/login/)
    await expect(this.emailInput).toBeVisible()
    await expect(this.passwordInput).toBeVisible()
    await expect(this.submitButton).toBeVisible()
  }

  async expectErrorMessage (text: string) {
    await expect(this.errorMessage).toBeVisible()
    await expect(this.errorMessage).toContainText(text)
  }

  async expectSuccessfulLogin () {
    // After successful login, should redirect to dashboard
    await this.page.waitForURL('**/dashboard', { timeout: 10000 })
    await expect(this.page).toHaveURL(/.*\/dashboard/)
  }
}
