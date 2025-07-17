import { expect, test } from '@playwright/test'

import { HomePage } from './page/home.page'

test('heading & CTA are visible', async ({ page }) => {
  const homePage = new HomePage(page)

  await homePage.goto()

  await homePage.expectHeadingToBeVisible()
  await homePage.expectGetStartedButtonToBeVisible()
})

test('no warnings & errors are in browser console', async ({ page }) => {
  const ignoreWarnings: Array<string> = [
    'The `integrity` attribute is currently ignored for preload destinations that do not support subresource integrity.',
    'Extraneous non-props attributes (aria-describedby, data-state, data-grace-area-trigger)', // TODO: this error appeared after a dependency update
    'Extraneous non-emits event listeners (click, focus, pointermove, pointerleave, pointerdown, blur)', // TODO: this error appeared after a dependency update
  ]
  const ignoreErrors: Array<string> = [
    'Failed to load resource: the server responded with a status of 404 (Server Error)', // the testimonial images are only available if you are running the development remote server
  ]
  const ignoreErrorLocationPatterns: Array<RegExp> = [
  ]

  const foundWarnings: Array<{ message: string, pageUrl: string }> = []
  const foundErrors: Array<{ message: string, pageUrl: string }> = []

  // Listen for console events and check for warnings & errors
  page.on('console', (message) => {
    if (message.type() === 'warning') {
      const isIgnoredWarning = ignoreWarnings.some(exclude => message.text().includes(exclude))
      if (isIgnoredWarning) {
        return
      }

      foundWarnings.push({ message: message.text(), pageUrl: page.url() })
    }

    if (message.type() === 'error') {
      const isIgnoredError = ignoreErrors.some(exclude => message.text().includes(exclude))
      if (isIgnoredError) {
        return
      }

      const isIgnoredErrorLocation = ignoreErrorLocationPatterns.some(pattern => pattern.test(message.location().url))
      if (isIgnoredErrorLocation) {
        return
      }

      foundErrors.push({ message: message.text(), pageUrl: page.url() })
    }
  })

  await page.goto('/', { waitUntil: 'networkidle' })

  expect(foundWarnings, { message: 'Found warnings in the console output' }).toStrictEqual([])
  expect(foundErrors, { message: 'Found error in the console output' }).toStrictEqual([])
})
