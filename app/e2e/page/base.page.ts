import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly acceptCookiesButton: Locator

  constructor (page: Page) {
    this.page = page
    this.acceptCookiesButton = page.getByRole('button', { name: 'Accept' })
  }

  async goto (path: string, options?: { waitUntil?: 'commit' | 'domcontentloaded' | 'load' | 'networkidle' }) {
    await this.page.goto(path, { waitUntil: options?.waitUntil || 'networkidle' })
  }

  async acceptCookiesIfPresent () {
    try {
      await this.acceptCookiesButton.click({ timeout: 3000 })
    }
    catch {
      // Cookies banner might not be present
    }
  }

  async waitForHydration () {
    // Wait for Nuxt hydration to complete
    await this.page.waitForFunction(() => window.useNuxtApp?.()?.isHydrating === false, { timeout: 10000 })
  }

  async expectNoConsoleErrors () {
    const errors: Array<string> = []
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    // Allow page to settle
    await this.page.waitForTimeout(1000)

    expect(errors).toHaveLength(0)
  }

  async takeScreenshot (name: string) {
    await this.page.screenshot({
      fullPage: true,
      path: `app/e2e/screenshots/${name}.png`,
    })
  }

  async isAuthenticated (): Promise<boolean> {
    // Check if user is authenticated by looking for auth cookie or session
    const cookies = await this.page.context().cookies()
    return cookies.some(cookie => cookie.name === 'nuxt-session')
  }

  async logout () {
    await this.page.goto('/api/auth/logout', { waitUntil: 'networkidle' })
  }
}
