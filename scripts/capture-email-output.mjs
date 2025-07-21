#!/usr/bin/env node

/**
 * Capture full email output by modifying the logging
 */

import { readFileSync, writeFileSync } from 'node:fs'

// Read the useEmail.ts file
const filePath = '/Users/spasco/Projects/timezyme-nuxtstarterkit/layers/email/server/utils/useEmail.ts'
const content = readFileSync(filePath, 'utf8')

// Update to log full HTML
const updatedContent = content.replace(
  "console.log(html.substring(0, 500) + '...')",
  "console.log('===EMAIL HTML START==='); console.log(html); console.log('===EMAIL HTML END===')",
)

// Write back
writeFileSync(filePath, updatedContent)

console.log('✅ Updated email logging to capture full HTML')
console.log('📝 Now restart the server and test again to see full email content')
