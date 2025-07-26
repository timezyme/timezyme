# DB_PREVIEW Verification Checklist

## Pre-Verification Requirements
- [ ] DB_PREVIEW created in Cloudflare Dashboard
- [ ] Database ID saved and configured in NuxtHub
- [ ] Deployment to preview branch completed
- [ ] At least 5 minutes have passed since deployment

## Step 1: Environment Verification

### Check Health Endpoint
```bash
curl -s https://preview.timezyme.com/api/health | jq .
```

**Expected Response Fields:**
- [ ] `"status": "healthy"`
- [ ] `"environment": "preview"`
- [ ] `"database.connected": true`
- [ ] `"database.name": "DB_PREVIEW"`
- [ ] `"database.binding": "DB_PREVIEW"`
- [ ] `"database.dbPreviewAvailable": true`

## Step 2: Database Initialization

### Check Migration Status
```bash
npx nuxthub database migrations list --preview
```

**Verification Points:**
- [ ] Command executes without errors
- [ ] Shows migration list or "No migrations"
- [ ] If migrations exist, they show as "applied"

## Step 3: Data Seeding Verification

### Seed Demo User
```bash
curl -X POST https://preview.timezyme.com/api/seed-user \
  -H "Content-Type: application/json" \
  -d '{"email":"test-preview@timezyme.com","name":"Test Preview User","hashedPassword":"$scrypt$16384$8$1$1kUCNMhRO6c0Y+R7EE+TSQ$RNz0Kslx1vNQE3IFEdGLo9UHl/ycL5YLnmVYDJR+vFqcOHBVlBW0sB1dFpqVlOqOcdK6vFLulv9jseqLcdXoFw","role":"user"}'
```

**Expected Response:**
- [ ] `{"created": true, "email": "test-preview@timezyme.com"}` OR
- [ ] `{"updated": true, "email": "test-preview@timezyme.com"}`

### Verify User Count Changed
```bash
# Check health endpoint again
curl -s https://preview.timezyme.com/api/health | jq '.database.userCount'
```

- [ ] User count has increased from initial value

## Step 4: Database Isolation Test

### Run Separation Test Script
```bash
./scripts/test-db-separation.sh
```

**Verification Points:**
- [ ] Production health endpoint responds correctly
- [ ] Preview health endpoint responds correctly
- [ ] Both show different database bindings
- [ ] No errors during test execution

## Step 5: Authentication Test (When Auth Enabled)

### Test Login on Preview
1. Navigate to https://preview.timezyme.com
2. Attempt to log in with seeded demo credentials

**Verification:**
- [ ] Login page loads correctly
- [ ] Authentication works with preview database users
- [ ] User session is created successfully

## Step 6: Production Isolation Verification

### Check Production Health
```bash
curl -s https://timezyme.com/api/health | jq .
```

**Verification Points:**
- [ ] `"environment": "production"`
- [ ] `"database.binding": "DB"`
- [ ] `"database.dbPreviewAvailable": false`
- [ ] User count unchanged from before preview setup

## Common Issues Checklist

### If DB_PREVIEW Not Available:
- [ ] Verify database ID format (UUID)
- [ ] Check environment variable name exactly matches `NUXT_DB_PREVIEW_ID`
- [ ] Confirm variable is set for preview environment in NuxtHub
- [ ] Redeploy if variable was added after deployment

### If Migrations Fail:
- [ ] Verify wrangler version: `wrangler --version` (must be 3.33.0+)
- [ ] Ensure using `--preview` flag with migration commands
- [ ] Check Cloudflare service status

### If Seeding Fails:
- [ ] Verify preview URL is accessible
- [ ] Check seed endpoint is enabled (non-production only)
- [ ] Ensure JSON format is correct in curl command

## Final Verification Summary

**All Systems Operational When:**
- [ ] Preview uses DB_PREVIEW binding
- [ ] Production uses DB binding
- [ ] Databases are completely isolated
- [ ] No data shared between environments
- [ ] Both environments function independently

## Sign-Off

- **Date**: _______________
- **Verified By**: _______________
- **Notes**: _________________________________

## Quick Debug Commands

```bash
# Full system check
curl -s https://preview.timezyme.com/api/health | jq . && \
curl -s https://timezyme.com/api/health | jq . && \
echo "✅ Both environments responding"

# Database binding check
echo "Preview DB:" && \
curl -s https://preview.timezyme.com/api/health | jq '.database.binding' && \
echo "Production DB:" && \
curl -s https://timezyme.com/api/health | jq '.database.binding'
```