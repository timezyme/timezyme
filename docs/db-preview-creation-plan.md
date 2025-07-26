# DB_PREVIEW Creation Action Plan

## Overview
This document provides a comprehensive action plan for creating the DB_PREVIEW database in Cloudflare Dashboard, based on analysis of requirements, Cloudflare documentation, and potential issues.

## Prerequisites Checklist

### Account Requirements
- [ ] **Cloudflare Account**: Access to Cloudflare Dashboard with permissions to create D1 databases
- [ ] **NuxtHub Account**: Access to NuxtHub Dashboard with permissions to set environment variables
- [ ] **D1 Feature Access**: Verify D1 is available (Free and Paid plans supported)
- [ ] **Git Repository Access**: Ability to push to the `preview` branch

### Technical Requirements
- [ ] **Wrangler CLI**: Version 3.33.0 or later installed (for migrations)
- [ ] **NuxtHub CLI**: Latest version installed (`npx nuxthub`)
- [ ] **Database Configuration**: Code already implemented (completed in previous steps)

## Step-by-Step Action Plan

### Phase 1: Pre-Creation Verification

1. **Verify Account Access**
   - Log in to Cloudflare Dashboard: https://dash.cloudflare.com
   - Confirm you can see your account and have appropriate permissions
   - Navigate to ensure D1 is available in your account

2. **Check Existing Databases**
   - Look for any existing databases that might conflict
   - Ensure `timezyme-preview` name is not already taken

### Phase 2: Create D1 Database

1. **Navigate to D1 Section**
   - Go to **Storage & Databases** > **D1 SQL Database**
   - ⚠️ Note: Not "Workers & Pages > D1" as incorrectly stated in some docs

2. **Create New Database**
   - Click **Create Database**
   - **Name**: `timezyme-preview`
   - **Location Hint** (Optional but Recommended):
     - Consider where your preview deployments typically run
     - Choose the closest region for optimal performance
     - Examples: `weur` (Western Europe), `enam` (Eastern North America)

3. **Copy Database ID**
   - ⚠️ **CRITICAL**: Copy the Database ID immediately after creation
   - Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (UUID)
   - Save this ID securely - it cannot be retrieved from the dashboard later

### Phase 3: Configure NuxtHub Environment

1. **Access NuxtHub Dashboard**
   - Navigate to: https://admin.hub.nuxt.com
   - Select your project

2. **Set Environment Variable**
   - Go to project settings → Environment Variables
   - Add new variable:
     - **Key**: `NUXT_DB_PREVIEW_ID`
     - **Value**: [The Database ID from Phase 2]
   - **Scope**: Ensure it's set for **preview environment only**

### Phase 4: Deploy and Activate

1. **Deploy to Preview Branch**
   ```bash
   git push origin preview
   ```
   - This triggers the deployment with the new database binding
   - Wait for deployment to complete (usually 2-5 minutes)

2. **Verify Deployment**
   - Check NuxtHub deployment logs for any errors
   - Confirm the binding configuration is recognized

### Phase 5: Initialize Database

1. **Check Migration Status**
   ```bash
   npx nuxthub database migrations list --preview
   ```

2. **Apply Migrations** (if needed)
   ```bash
   npx nuxthub database migrations mark-all-applied --preview
   ```

3. **Verify Database Connection**
   - Visit: `https://preview.timezyme.com/api/health`
   - Check response for:
     - `"environment": "preview"`
     - `"database.binding": "DB_PREVIEW"`
     - `"database.dbPreviewAvailable": true`

### Phase 6: Seed Test Data

1. **Create Demo Users**
   ```bash
   # Demo User
   curl -X POST https://preview.timezyme.com/api/seed-user \
     -H "Content-Type: application/json" \
     -d '{
       "email": "demo-user@nuxtstarterkit.com",
       "name": "Demo User",
       "hashedPassword": "$scrypt$16384$8$1$1kUCNMhRO6c0Y+R7EE+TSQ$RNz0Kslx1vNQE3IFEdGLo9UHl/ycL5YLnmVYDJR+vFqcOHBVlBW0sB1dFpqVlOqOcdK6vFLulv9jseqLcdXoFw",
       "role": "user"
     }'

   # Demo Admin
   curl -X POST https://preview.timezyme.com/api/seed-user \
     -H "Content-Type: application/json" \
     -d '{
       "email": "demo-admin@nuxtstarterkit.com",
       "name": "Demo Admin",
       "hashedPassword": "$scrypt$16384$8$1$wZxgsnY7CEzCFkVCKmQNiA$CJ/CPBqHMXrqcr8BFLSJqR0A+i7jJVxuLaZH5a3lFW1akmjTKJlYOLhudD6lLdJz1OFW0e8fZ/GG8K3ZZHsRJA",
       "role": "admin"
     }'
   ```

### Phase 7: Final Verification

1. **Run Database Separation Test**
   ```bash
   ./scripts/test-db-separation.sh
   ```

2. **Verify Isolation**
   - Confirm preview database has its own users
   - Verify production database remains unaffected
   - Test authentication works on preview site

## Troubleshooting Guide

### Common Issues and Solutions

1. **"DB_PREVIEW binding not found"**
   - Verify NUXT_DB_PREVIEW_ID is set in NuxtHub
   - Ensure deployment completed after setting the variable
   - Check environment variable scope (must be for preview)

2. **Database ID Format Issues**
   - Must be a valid UUID format
   - No spaces or extra characters
   - Case-sensitive

3. **Migration Failures**
   - Ensure you're using `--preview` flag
   - Check wrangler version (must be 3.33.0+)
   - Verify database was created successfully

4. **Connection Timeouts**
   - Allow 2-5 minutes after deployment for propagation
   - Check location hint if latency is high
   - Verify Cloudflare service status

## Security Considerations

1. **Database Naming Convention**
   - Use environment prefix: `timezyme-preview`
   - Avoid production data in preview database

2. **Access Control**
   - Environment variable scoped to preview only
   - Binding only available in preview deployments

3. **Data Isolation**
   - Never copy production data to preview
   - Use test/demo data only

## Post-Creation Checklist

- [ ] Database created in Cloudflare with correct name
- [ ] Database ID copied and saved securely
- [ ] Environment variable set in NuxtHub for preview
- [ ] Deployment to preview branch successful
- [ ] Migrations applied to preview database
- [ ] Health endpoint shows correct binding
- [ ] Test data seeded successfully
- [ ] Database separation verified with test script
- [ ] Authentication works on preview site

## Additional Notes

- **Cost**: D1 charges based on queries and storage, not number of databases
- **Backups**: D1 includes automatic Time Travel backups for 30 days
- **Performance**: Location hint can significantly improve query latency
- **Monitoring**: Check Cloudflare Analytics for D1 usage metrics

## Quick Reference Commands

```bash
# Check migration status
npx nuxthub database migrations list --preview

# Apply migrations
npx nuxthub database migrations mark-all-applied --preview

# Verify health
curl https://preview.timezyme.com/api/health | jq .

# Run separation test
./scripts/test-db-separation.sh
```

## Success Criteria

The DB_PREVIEW creation is successful when:
1. Preview environment uses its own database (DB_PREVIEW)
2. Production environment continues using the default database
3. No data is shared between environments
4. Authentication works independently in each environment
5. All tests pass in `test-db-separation.sh`