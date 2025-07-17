/**
 * This script generates TypeScript types and API functions from an OpenAPI specification
 *
 * Usage:
 *   pnpm generate:api
 *
 * The script expects an OpenAPI spec file at ./openapi.json and will generate
 * types and functions in the appropriate directories.
 */

import { exec } from 'node:child_process'
import { existsSync } from 'node:fs'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

async function generateApi () {
  // eslint-disable-next-line no-console
  console.log('🔧 Generating API types and functions...')

  // Check if OpenAPI spec exists
  if (!existsSync('./openapi.json')) {
    // eslint-disable-next-line no-console
    console.error('❌ OpenAPI spec not found at ./openapi.json')
    // eslint-disable-next-line no-console
    console.log('Please add your OpenAPI specification file')
    process.exit(1)
  }

  try {
    // Generate TypeScript types
    // eslint-disable-next-line no-console
    console.log('📝 Generating TypeScript types...')
    await execAsync('npx openapi-typescript ./openapi.json -o ./types/api.d.ts')

    // Generate API client functions (if using a generator)
    // eslint-disable-next-line no-console
    console.log('🚀 Generating API client functions...')
    // Add your API client generation command here
    // Example: await execAsync('npx openapi-generator-cli generate -i ./openapi.json -g typescript-fetch -o ./api')

    // eslint-disable-next-line no-console
    console.log('✅ API generation complete!')
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error generating API:', error)
    process.exit(1)
  }
}

// Run the generator
generateApi()
