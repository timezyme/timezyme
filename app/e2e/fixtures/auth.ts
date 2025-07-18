import { test as base } from '@nuxt/test-utils/playwright'
import type { Page } from '@playwright/test'

import { testUsers } from './users'

export const test = base.extend<{
  adminPage: Page
  authenticatedPage: Page
}>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    // Login as admin user
    await page.goto('/auth/login')
    await page.fill('input[name="email"]', testUsers.admin.email)
    await page.fill('input[name="password"]', testUsers.admin.password)
    await page.click('button[type="submit"]')

    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 })

    // Save authentication state
    await context.storageState({ path: 'app/e2e/.auth/admin.json' })

    await use(page)
    await context.close()
  },

  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    // Login as regular user
    await page.goto('/auth/login')
    await page.fill('input[name="email"]', testUsers.regular.email)
    await page.fill('input[name="password"]', testUsers.regular.password)
    await page.click('button[type="submit"]')

    // Wait for redirect to dashboard
    await page.waitForURL('**/dashboard', { timeout: 10000 })

    // Save authentication state
    await context.storageState({ path: 'app/e2e/.auth/user.json' })

    await use(page)
    await context.close()
  },
})

export { expect } from '@playwright/test'
