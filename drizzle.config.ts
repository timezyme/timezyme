import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  out: './server/database/migrations',
  schema: './layers/db/server/utils/schema.ts',
})
