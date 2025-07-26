# Database Separation Setup Guide

This guide explains how to set up separate databases for preview and production environments in NuxtHub.

## Overview

NuxtHub doesn't directly create additional D1 databases. Instead, you must:
1. Create the D1 database manually in the Cloudflare dashboard
2. Configure it as an additional binding in your NuxtHub project

## Step 1: Create DB_PREVIEW Database in Cloudflare

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com
   - Select your account

2. **Navigate to Storage & Databases > D1 SQL Database**
   - Click on "Create Database"
   - Name it: `timezyme-preview` (or your preferred name)
   - (Optional) Select your preferred location hint for optimal performance
   - Click "Create"

3. **Copy the Database ID**
   - After creation, you'll see the database details
   - Copy the Database ID (it looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

## Step 2: Configure NuxtHub

1. **Update Environment Variables**
   - In your NuxtHub dashboard (https://admin.hub.nuxt.com)
   - Go to your project settings
   - Add a new environment variable:
     - Key: `NUXT_DB_PREVIEW_ID`
     - Value: [The Database ID you copied]
   - Make sure this is set for the preview environment

2. **Deploy to Preview**
   ```bash
   git push origin preview
   ```

## Step 3: Verify Configuration

The configuration in `nuxt.config.ts` is already set up:

```typescript
hub: {
  bindings: {
    d1_databases: {
      DB_PREVIEW: {
        database_id: process.env.NUXT_DB_PREVIEW_ID || '',
      },
    },
  },
}
```

The `useDB()` function will automatically use DB_PREVIEW when in preview environment:

```typescript
// In preview environments, uses DB_PREVIEW
// In production/development, uses the default DB
const db = useDB()
```

## Step 4: Initialize Preview Database

Once deployed, the preview database will need its migrations:

```bash
# Run migrations on preview database
npx nuxthub database migrations list --preview
```

If migrations haven't been applied:
```bash
npx nuxthub database migrations mark-all-applied --preview
```

## Step 5: Seed Preview Database

The seed-user endpoint is available in preview mode. You can seed the preview database with demo users:

```bash
# From the preview URL
curl -X POST https://preview.timezyme.com/api/seed-user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo-user@nuxtstarterkit.com",
    "name": "Demo User",
    "hashedPassword": "$scrypt$16384$8$1$1kUCNMhRO6c0Y+R7EE+TSQ$RNz0Kslx1vNQE3IFEdGLo9UHl/ycL5YLnmVYDJR+vFqcOHBVlBW0sB1dFpqVlOqOcdK6vFLulv9jseqLcdXoFw",
    "role": "user"
  }'
```

## Troubleshooting

### DB_PREVIEW not found
If you see "DB_PREVIEW binding not found" in logs:
1. Verify the NUXT_DB_PREVIEW_ID environment variable is set
2. Ensure you've deployed after setting the variable
3. Check that the D1 database exists in your Cloudflare account

### Database locked errors
If you encounter database lock errors:
1. This usually happens in development
2. Restart the development server
3. Clear cache: `rm -rf .data/hub/cache.db*`

## Environment Detection

The system automatically detects the environment:
- `NUXT_HUB_ENV=preview` → Uses DB_PREVIEW
- `NUXT_HUB_ENV=production` or unset → Uses default DB
- Development always uses local SQLite

Check current environment at: `/api/health`