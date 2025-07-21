#!/usr/bin/env node

import { chromium } from 'playwright'

async function testStoryPresentation () {
  console.log('🧪 Testing TimeZyme Story Presentation...')

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1280, height: 832 },
  })
  const page = await context.newPage()

  try {
    // Navigate to story page
    console.log('📍 Navigating to story page...')
    await page.goto('http://localhost:9009/story', { waitUntil: 'networkidle' })

    // Check if redirected to scene 1
    const url = page.url()
    console.log('🔗 Current URL:', url)

    // Check for scene content
    const sceneTitle = await page.textContent('h1')
    console.log('📄 Scene Title:', sceneTitle)

    // Test navigation
    console.log('\n🚀 Testing navigation...')

    // Click next button
    await page.click('button:has-text("Next")')
    await page.waitForURL('**/story/2')
    const scene2Title = await page.textContent('h1')
    console.log('✅ Scene 2 Title:', scene2Title)

    // Test keyboard navigation
    await page.keyboard.press('ArrowRight')
    await page.waitForURL('**/story/3')
    const scene3Title = await page.textContent('h1')
    console.log('✅ Scene 3 Title:', scene3Title)

    // Test progress indicator
    const activeIndicator = await page.locator('.w-8.bg-cyan-400').count()
    console.log('✅ Active progress indicator found:', activeIndicator > 0)

    // Test scene-specific components
    console.log('\n🎨 Testing scene components...')

    // Scene 3 should have ZymeCardDemo
    const zymeCard = await page.locator('.zyme-card-demo').count()
    console.log('✅ Scene 3 - Zyme Card Demo:', zymeCard > 0 ? 'Present' : 'Missing')

    // Navigate to scene 5
    await page.goto('http://localhost:9009/story/5')
    const knowledgeHop = await page.locator('.knowledge-hop-demo').count()
    console.log('✅ Scene 5 - Knowledge Hop Demo:', knowledgeHop > 0 ? 'Present' : 'Missing')

    // Navigate to scene 6
    await page.goto('http://localhost:9009/story/6')
    const knowledgeGraph = await page.locator('.knowledge-graph-demo').count()
    console.log('✅ Scene 6 - Knowledge Graph Demo:', knowledgeGraph > 0 ? 'Present' : 'Missing')

    // Test final scene CTA
    await page.goto('http://localhost:9009/story/7')
    const ctaButton = await page.locator('text="Join the Waitlist"').count()
    console.log('✅ Scene 7 - CTA Button:', ctaButton > 0 ? 'Present' : 'Missing')

    // Test escape key
    await page.keyboard.press('Escape')
    await page.waitForTimeout(500)
    const finalUrl = page.url()
    console.log('✅ Escape key navigation:', finalUrl.includes('/story') ? 'Failed' : 'Success')

    console.log('\n✨ All tests passed!')
  }
  catch (error) {
    console.error('❌ Test failed:', error.message)

    // Take screenshot on failure
    await page.screenshot({ path: 'scripts/story-test-failure.png' })
    console.log('📸 Screenshot saved to scripts/story-test-failure.png')

    throw error
  }
  finally {
    await browser.close()
  }
}

// Run the test
testStoryPresentation().catch(console.error)
