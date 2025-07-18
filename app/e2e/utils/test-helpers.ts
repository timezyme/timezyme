import type { Page } from '@playwright/test'
import { nanoid } from 'nanoid'

export function generateTestEmail (): string {
  return `test-${nanoid(8)}@test.com`
}

export async function waitForToast (page: Page, text: string) {
  const toast = page.getByRole('alert').filter({ hasText: text })
  await toast.waitFor({ state: 'visible', timeout: 5000 })
  return toast
}

export async function dismissToast (page: Page) {
  const closeButton = page.getByRole('button', { name: 'Close' })
  if (await closeButton.isVisible()) {
    await closeButton.click()
  }
}

export async function clearDatabase () {
  // This would call an API endpoint to clear test data
  // For now, we'll rely on the db-reset script
  console.log('Database cleanup should be handled by db-reset script')
}

export async function seedTestUsers () {
  // This would call the seed script or API
  console.log('User seeding should be handled by db-seed script')
}

export async function waitForNetworkIdle (page: Page, timeout = 3000) {
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(timeout)
}

export async function checkAccessibility (page: Page) {
  // Basic accessibility checks
  const missingAltTexts = await page.$$eval('img:not([alt])', imgs => imgs.length)
  const missingLabels = await page.$$eval('input:not([aria-label]):not([id])', inputs => inputs.length)

  return {
    hasIssues: missingAltTexts > 0 || missingLabels > 0,
    missingAltTexts,
    missingLabels,
  }
}
