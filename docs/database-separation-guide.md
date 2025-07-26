# Database Separation Guide

This guide explains how to separate preview and production databases in NuxtHub to prevent data conflicts and accidental deletions.

## Current Architecture (Shared Database)

Currently, both preview and production environments share the same database:

```
Production (main branch) → NuxtHub Production DB
Preview (preview branch) → NuxtHub Production DB (SAME!)
```

This causes issues:
- Data changes in preview affect production
- Accidental deletions impact all environments
- Testing in preview can corrupt production data

## New Architecture (Separated Databases)

We'll implement separate databases for each environment:

```
Production (main branch) → NuxtHub Production DB
Preview (preview branch) → NuxtHub Preview DB (SEPARATE!)
```

## Implementation Steps

### Step 1: Create Preview Database in NuxtHub

1. Go to [NuxtHub Dashboard](https://admin.hub.nuxt.com)
2. Navigate to your project
3. Go to **Storage** → **Database**
4. Create a new database binding:
   - Name: `DB_PREVIEW` or `PREVIEW_DB`
   - Environment: Staging/Preview
   - Database: Create new D1 database

### Step 2: Configure NuxtHub Environments

1. In NuxtHub Dashboard, go to **Settings** → **Environments**
2. Create or edit the "preview" environment:
   ```
   Name: preview
   Branch Pattern: preview
   Database Binding: DB_PREVIEW
   ```

### Step 3: Update Environment Variables

In your GitHub repository settings, update the staging environment:

```bash
# GitHub Settings → Environments → staging
NUXT_HUB_DATABASE_URL=<preview-database-url>
NUXT_HUB_ENV=preview
```

### Step 4: Update nuxt.config.ts for Environment Detection

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  hub: {
    database: process.env.NUXT_HUB_ENV === 'preview' 
      ? process.env.NUXT_HUB_DATABASE_URL 
      : true, // Use default production database
  },
  // ... rest of config
})
```

### Step 5: Update Database Connection Logic

Create a server utility to handle environment-specific databases:

```typescript
// server/utils/database.ts
export function useDatabase() {
  const isPreview = process.env.NUXT_HUB_ENV === 'preview'
  
  // NuxtHub will automatically use the correct database based on environment
  return hubDatabase()
}
```

### Step 6: Run Migrations on Preview Database

After creating the preview database, you need to run migrations:

1. Deploy to preview branch to trigger migrations
2. Or manually run migrations via NuxtHub CLI:
   ```bash
   npx nuxthub database migrations apply --env preview
   ```

### Step 7: Seed Preview Database

Create a one-time script to seed the preview database with test data:

```bash
# scripts/seed-preview-db.sh
#!/bin/bash

echo "Seeding preview database..."

# Use the preview URL
PREVIEW_URL="https://your-preview-deployment.workers.dev"

# Run your seeding logic against preview
curl -X POST "$PREVIEW_URL/api/seed-preview" \
  -H "Content-Type: application/json" \
  -H "X-Preview-Secret: $PREVIEW_SEED_SECRET"
```

## Environment-Specific Features

### Automatic Environment Detection

The system will automatically detect which environment it's running in:

```typescript
// server/api/health.get.ts
export default defineEventHandler(async () => {
  const env = process.env.NUXT_HUB_ENV || 'production'
  const dbInfo = await hubDatabase().prepare('SELECT COUNT(*) as count FROM users').first()
  
  return {
    environment: env,
    database: env === 'preview' ? 'preview' : 'production',
    userCount: dbInfo?.count || 0
  }
})
```

### Preview-Only Features

Enable certain features only in preview:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      isPreview: process.env.NUXT_HUB_ENV === 'preview',
      previewFeatures: process.env.NUXT_HUB_ENV === 'preview' ? {
        debugMode: true,
        seedEndpoint: true,
        resetDatabase: true
      } : {}
    }
  }
})
```

## Migration Plan

### Phase 1: Setup (No Downtime)
1. Create preview database in NuxtHub
2. Update configuration files
3. Test locally with preview database

### Phase 2: Data Migration
1. Backup production database
2. Export essential test data
3. Import into preview database

### Phase 3: Deployment
1. Deploy updated configuration to preview branch
2. Verify preview uses separate database
3. Run comprehensive tests

### Phase 4: Cleanup
1. Remove any preview-specific data from production
2. Document new database boundaries
3. Update team procedures

## Verification

After implementation, verify the separation:

1. **Check Database Isolation**:
   - Create a test user in preview
   - Verify it doesn't appear in production
   - Delete a user in preview
   - Verify it still exists in production

2. **Check Environment Variables**:
   ```bash
   # In preview deployment
   curl https://preview-deployment.workers.dev/api/health
   # Should show: { "database": "preview", ... }
   
   # In production deployment
   curl https://timezyme.com/api/health
   # Should show: { "database": "production", ... }
   ```

## Best Practices

1. **Never Share Credentials**: Keep preview and production credentials separate
2. **Use Environment Detection**: Always check which environment you're in
3. **Limit Preview Access**: Use Cloudflare Access to protect preview
4. **Regular Backups**: Backup both databases regularly
5. **Clear Data Policies**: Document what data belongs in each environment

## Rollback Plan

If issues occur, you can rollback to shared database:

1. Update NuxtHub environment to use production database
2. Redeploy preview branch
3. All environments will share database again

## Security Considerations

1. **Different Passwords**: Use different `NUXT_SESSION_PASSWORD` for each environment
2. **Separate OAuth Apps**: Create separate OAuth applications for preview
3. **Access Control**: Implement Cloudflare Access on preview URLs
4. **Data Sanitization**: Never copy sensitive production data to preview

## Monitoring

Set up monitoring to ensure databases remain separate:

1. **Health Checks**: Regular API calls to verify environment
2. **Alerts**: Set up alerts for cross-environment data access
3. **Audit Logs**: Track database operations by environment