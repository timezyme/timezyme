# Preview Build Troubleshooting

## Common Build Errors and Solutions

### 1. Environment Variables Missing
**Error**: "Environment variable NUXT_DB_PREVIEW_ID is not set"

**Solution**: 
- Go to GitHub → Settings → Environments → staging
- Add the following secrets:
  ```
  NUXT_DB_PREVIEW_ID=e29e8ae4-e425-4ae7-b0bf-eeb65b7ba324
  CLOUDFLARE_API_TOKEN=<your-token>
  CLOUDFLARE_ACCOUNT_ID=<your-account-id>
  D1_DATABASE_ID=<preview-database-id>
  ```

### 2. Database Backup Script Fails
**Error**: "Backup failed, continuing deployment"

**Solution**:
- This is a non-blocking error
- The deployment continues even if backup fails
- Check that `CLOUDFLARE_API_TOKEN` has D1 permissions

### 3. NuxtHub Project Key
**Error**: "Invalid project key"

**Solution**:
- Verify `NUXT_HUB_PROJECT_KEY: timezyme-revq` is correct
- Check NuxtHub dashboard for the correct project key

### 4. Build Failures
**Error**: TypeScript or ESLint errors

**Solution**:
```bash
# Run locally to check for errors
pnpm typecheck
pnpm lint
```

### 5. D1 Database Binding
**Error**: "DB_PREVIEW binding not found"

**Solution**:
- Ensure `NUXT_DB_PREVIEW_ID` is set in GitHub secrets
- Database ID should be: `e29e8ae4-e425-4ae7-b0bf-eeb65b7ba324`

## Quick Checks

1. **Verify GitHub Secrets** (Settings → Environments → staging):
   - [ ] NUXT_UI_PRO_LICENSE
   - [ ] NUXT_DB_PREVIEW_ID
   - [ ] CLOUDFLARE_API_TOKEN
   - [ ] CLOUDFLARE_ACCOUNT_ID
   - [ ] All OAuth secrets (if auth is enabled)

2. **Check Build Logs**:
   - Look for "Environment variable X is not set"
   - Check for TypeScript compilation errors
   - Verify database binding initialization

3. **Local Testing**:
   ```bash
   # Test the build locally
   pnpm build
   
   # Test with preview environment
   NUXT_HUB_ENV=preview pnpm build
   ```

## GitHub Actions Debug

To get more detailed logs, you can modify the workflow temporarily:

```yaml
- name: Build & Deploy to NuxtHub
  uses: nuxt-hub/action@v2
  env:
    ACTIONS_STEP_DEBUG: true  # Add this for verbose logging
    NUXT_HUB_PROJECT_KEY: timezyme-revq
    NUXT_HUB_ENV: preview
```

## Contact Support

If the issue persists:
1. Check [NuxtHub Status](https://status.nuxt.com/)
2. Review [GitHub Actions logs](https://github.com/timezyme/timezyme/actions)
3. Contact NuxtHub support with the deployment ID