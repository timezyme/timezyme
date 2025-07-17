import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { confirm, input } from '@inquirer/prompts'
import { consola } from 'consola'

consola.box(`ℹ️ Important information ℹ️
  - This script will generate server composables and API endpoints for a new table.
  - Be aware, that these routes are only generated for the CRUD operations 
  and you might need to adjust them to your needs.`)

const confirmAnswer = await confirm({ message: 'Did you already create a new table in "/layers/db/server/utils/schema.ts"?' })
if (!confirmAnswer) {
  consola.error(new Error('Please create a new table in "/layers/db/server/utils/schema.ts" before running this script'))
  process.exit(1)
}

const tableName = await input({ message: 'Enter the name of your new table' })
if (!tableName) {
  consola.error(new Error('Table name is required'))
  process.exit(1)
}
const capitalizedTableName = tableName.charAt(0).toUpperCase() + tableName.slice(1)

// Directory paths
const serverComposablesPath = path.join('layers', 'db', 'server', 'utils')
const serverApiDirectoryPath = path.resolve('server', 'api', tableName)

const serverComposableName = `use${capitalizedTableName}Db`

const serverComposableMethodNames = {
  delete: `delete${capitalizedTableName}`,
  getAll: `getAll${capitalizedTableName}`,
  getAllByUserId: `getAll${capitalizedTableName}ByUserId`,
  getById: `get${capitalizedTableName}ById`,
  update: `update${capitalizedTableName}`,
  upsert: `upsert${capitalizedTableName}`,
}

const insertType = `Insert${capitalizedTableName}`
// const selectType = `Select${capitalizedTableName}`

// Template for serverComposables
const serverComposablesTemplate = `
import { eq } from 'drizzle-orm'

import type { ${insertType} } from './schema'

const LOGGER_PREFIX = '[${serverComposableName}]:'

export function ${serverComposableName} () {
  const serverLogger = useServerLogger()

  const ${serverComposableMethodNames.getAll} = async () => {
    try {
      return useDB()
        .select()
        .from(tables.${tableName})
    }
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to get all ${tableName}\`, error)
      throw new Error('Failed to get all ${tableName}');
    }
  }

  const ${serverComposableMethodNames.getAllByUserId} = async (userId: string) => {
    try {
      return useDB()
        .select()
        .from(tables.${tableName})
        .where(eq(tables.${tableName}.userId, userId))
    }
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to get all ${tableName} by user ID \${userId}\`, error)
            throw new Error(\`Failed to get all ${tableName} by user ID \${userId}\`);
    }
  }

  const ${serverComposableMethodNames.getById} = async (id: string) => {
    try {
      return useDB()
        .select()
        .from(tables.${tableName})
        .where(eq(tables.${tableName}.id, id))
        .get()
    }
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to get ${tableName} by ID \${id}\`, error)
      throw new Error(\`Failed to get ${tableName} by ID \${id}\`);
    }
  }

  const ${serverComposableMethodNames.update} = async (payload: ${insertType}, id: string) => {
    try {
      return useDB()
        .update(tables.${tableName})
        .set(payload)
        .where(eq(tables.${tableName}.id, id))
        .returning()
        .get()
    }
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to update ${tableName} with ID \${id}\`, error)
      throw new Error(\`Failed to update ${tableName} with ID \${id}\`);
    }
  }

  const ${serverComposableMethodNames.upsert} = async (payload: ${insertType}, userId: string) => {
    try {
      return useDB()
        .insert(tables.${tableName})
        .values({ ...payload, userId })
        .onConflictDoUpdate({
          target: tables.${tableName}.id,
          set: payload,
        })
        .returning()
        .get();
    }
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to upsert ${tableName} for user ID \${userId}\`, error)
      throw new Error(\`Failed to upsert ${tableName} for user ID \${userId}\`);
    }
  }

  const ${serverComposableMethodNames.delete} = async (id: string) => {
    try {
      return useDB()
        .delete(tables.${tableName})
        .where(eq(tables.${tableName}.id, id))
        .returning()
        .get();
    }
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to delete ${tableName} by ID \${id}\`, error)
      throw new Error(\`Failed to delete ${tableName} by ID \${id}\`);
    }
  }

  return {
    ${Object.values(serverComposableMethodNames).join(',\n    ')}
  }
}
`

// Write server composable to file
fs.writeFileSync(
  path.join(serverComposablesPath, `${serverComposableName}.ts`),
  serverComposablesTemplate.trim(),
)
consola.success(`Created server composable "${serverComposableName}.ts" at "${serverComposablesPath}"`)

const serverApiTemplates = {
  '[id].delete.ts': `
  import z from 'zod'
  
  const paramsSchema = z.object({
    id: z.string().nonempty(),
  })
  
  const LOGGER_PREFIX = '[${tableName}/[id].delete]:'
  
  export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, paramsSchema.parse)
  
    const serverLogger = useServerLogger()
  
    try {
      const { ${serverComposableMethodNames.delete}, ${serverComposableMethodNames.getById} } = ${serverComposableName}()

     const { user } = await requireUserSession(event)

      const record = await ${serverComposableMethodNames.getById}(id);
      if (!record || record.userId !== user.id) {
        const error = createError({ statusCode: 404, message: "${capitalizedTableName} not found" });
        serverLogger.error(\`\${LOGGER_PREFIX} Record not found\`, error)
        throw createError(error);
      }

      await ${serverComposableMethodNames.delete}(id)
      return { success: true }
    } 
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to create ${tableName}\`, error)
      throw createError({
        ...error,
        statusCode: error.status || error.statusCode || 500,
        statusMessage: error.statusMessage || error.message,
      })
    }
  })
  `,
  '[id].get.ts': `
  import z from 'zod'
  
  const paramsSchema = z.object({
    id: z.string().nonempty(),
  })
  
  const LOGGER_PREFIX = '[${tableName}/[id].get]:'
  
  export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, paramsSchema.parse)
  
    const serverLogger = useServerLogger()
  
    try {
      const { ${serverComposableMethodNames.getById} } = ${serverComposableName}()
      return ${serverComposableMethodNames.getById}(id)
    } 
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to get ${tableName} by ID \${id}\`, error)
      throw createError({
        ...error,
        statusCode: error.status || error.statusCode || 500,
        statusMessage: error.statusMessage || error.message,
      })
    }
  })
  `,
  '[id].patch.ts': `
  import z from 'zod'
  
  const paramsSchema = z.object({
    id: z.string().nonempty(),
  })

  const bodySchema = z.custom<${insertType}>()
  
  const LOGGER_PREFIX = '[${tableName}/[id].patch]:'
  
  export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, paramsSchema.parse)
    const payload = await readValidatedBody(event, bodySchema.parse)
  
    const serverLogger = useServerLogger()
  
    try {
      const { ${serverComposableMethodNames.update}, ${serverComposableMethodNames.getById} } = ${serverComposableName}()

     const { user } = await requireUserSession(event)

      const record = await ${serverComposableMethodNames.getById}(id);
      if (!record || record.userId !== user.id) {
        const error = createError({ statusCode: 404, message: "${capitalizedTableName} not found" });
        serverLogger.error(\`\${LOGGER_PREFIX} Record not found\`, error)
        throw createError(error);
      }

      return ${serverComposableMethodNames.update}(payload, id)
    } 
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to update ${tableName}\`, error)
      throw createError({
        ...error,
        statusCode: error.status || error.statusCode || 500,
        statusMessage: error.statusMessage || error.message,
      })
    }
  })
  `,
  'index.get.ts': `
  import z from 'zod'
  
  const querySchema = z.object({
    email: z.string().email(),
  })
  
  const LOGGER_PREFIX = '[${tableName}/index.get]:'
  
  export default defineEventHandler(async (event) => {
    const { email } = await getValidatedQuery(event, querySchema.parse)
  
    const serverLogger = useServerLogger()
  
    try {
      const { ${serverComposableMethodNames.getAll} } = ${serverComposableName}()
      return ${serverComposableMethodNames.getAll}()
    }
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to get all ${tableName}\`, error)
      throw createError({
        ...error,
        statusCode: error.status || error.statusCode || 500,
        statusMessage: error.statusMessage || error.message,
      })
    }
  })
  `,
  'index.post.ts': `
  import z from 'zod'
  
  const bodySchema = z.custom<${insertType}>()
  
  const LOGGER_PREFIX = '[${tableName}/index.post]:'
  
  export default defineEventHandler(async (event) => {
    const payload = await readValidatedBody(event, bodySchema.parse)
  
    const serverLogger = useServerLogger()
  
    try {
     const { user } = await requireUserSession(event)

      const { ${serverComposableMethodNames.upsert} } = ${serverComposableName}()
      return ${serverComposableMethodNames.upsert}(payload, user.id)
    }
    catch (error: any) {
      serverLogger.error(\`\${LOGGER_PREFIX} Failed to create ${tableName}\`, error)
      throw createError({
        ...error,
        statusCode: error.status || error.statusCode || 500,
        statusMessage: error.statusMessage || error.message,
      })
    }
  })
  `,
}

// Write API endpoint files
for (const [fileName, template] of Object.entries(serverApiTemplates)) {
  if (!fs.existsSync(serverApiDirectoryPath)) {
    fs.mkdirSync(serverApiDirectoryPath)
  }
  fs.writeFileSync(path.join(serverApiDirectoryPath, fileName), template.trim())
}

consola.success(`Your API endpoints are ready 🚀 (generated at ${serverApiDirectoryPath})`)

// Run linter in background to fix any formatting issues
exec('pnpm lint:fix')
