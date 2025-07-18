import { expect, test } from '@nuxt/test-utils/playwright'

import { HomePage } from '../page/home.page'
import { waitForNetworkIdle } from '../utils/test-helpers'

test.describe('Home Page', () => {
  test('should display heading and CTA', async ({ goto, page }) => {
    const homePage = new HomePage(page)

    await goto('/', { waitUntil: 'hydration' })
    await waitForNetworkIdle(page)

    await homePage.expectHeadingToBeVisible()
    await homePage.expectGetStartedButtonToBeVisible()
  })

  test('should have no console errors or warnings', async ({ goto, page }) => {
    const ignoreWarnings: Array<string> = [
      'The `integrity` attribute is currently ignored for preload destinations that do not support subresource integrity.',
      'Extraneous non-props attributes (aria-describedby, data-state, data-grace-area-trigger)',
      'Extraneous non-emits event listeners (click, focus, pointermove, pointerleave, pointerdown, blur)',
    ]
    const ignoreErrors: Array<string> = [
      'Failed to load resource: the server responded with a status of 404 (Server Error)',
    ]

    const foundWarnings: Array<{ message: string, pageUrl: string }> = []
    const foundErrors: Array<{ message: string, pageUrl: string }> = []

    page.on('console', (message) => {
      if (message.type() === 'warning') {
        const isIgnoredWarning = ignoreWarnings.some(exclude => message.text().includes(exclude))
        if (!isIgnoredWarning) {
          foundWarnings.push({ message: message.text(), pageUrl: page.url() })
        }
      }

      if (message.type() === 'error') {
        const isIgnoredError = ignoreErrors.some(exclude => message.text().includes(exclude))
        if (!isIgnoredError) {
          foundErrors.push({ message: message.text(), pageUrl: page.url() })
        }
      }
    })

    await goto('/', { waitUntil: 'hydration' })
    await waitForNetworkIdle(page)

    expect(foundWarnings, { message: 'Found warnings in the console output' }).toStrictEqual([])
    expect(foundErrors, { message: 'Found errors in the console output' }).toStrictEqual([])
  })

  test('should navigate to login page', async ({ goto, page }) => {
    await goto('/', { waitUntil: 'hydration' })

    // Click on login link
    await page.getByRole('link', { name: 'Login' }).click()

    // Should redirect to login page
    await expect(page).toHaveURL(/.*\/auth\/login/)
  })

  test('should navigate to pricing page', async ({ goto, page }) => {
    await goto('/', { waitUntil: 'hydration' })

    // Click on pricing link
    await page.getByRole('link', { name: 'Pricing' }).click()

    // Should redirect to pricing page
    await expect(page).toHaveURL(/.*\/pricing/)
  })
})
