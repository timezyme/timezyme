# Preview Deployment Implementation for TimeZyme

## Overview

This document provides a complete guide for implementing preview deployments for TimeZyme with a custom domain (preview.timezyme.com) using NuxtHub and Cloudflare Workers.

## Quick Start

1. **Deploy a preview manually**:
   ```bash
   ./scripts/preview-deploy.sh
   ```

2. **Automatic PR deployments**: Create a PR and the preview will deploy automatically

3. **Access preview**: https://preview.timezyme.com (after DNS setup)

## Implementation Details

### 1. GitHub Actions Workflow

**File**: `.github/workflows/preview-deployment.yml`

This workflow:
- Triggers on pull requests to `main` or `develop`
- Deploys to NuxtHub as a preview environment
- Comments on PRs with deployment URLs
- Uses sandbox Polar credentials
- Enables demo mode for testing

### 2. DNS Configuration (Cloudflare)

To set up `preview.timezyme.com`:

1. **Login to Cloudflare Dashboard**
2. **Navigate to DNS for timezyme.com**
3. **Add CNAME Record**:
   ```
   Type: CNAME
   Name: preview
   Target: timezyme-revq.nuxt.dev
   Proxy: Enabled (orange cloud)
   ```

4. **Wait for propagation** (5-15 minutes)

### 3. Environment Configuration

Preview deployments use these environment overrides:

```env
NUXT_PUBLIC_BASE_URL=https://preview.timezyme.com
NUXT_PRIVATE_POLAR_SERVER=sandbox
NUXT_PUBLIC_ADMIN_DEMO_MODE_ENABLED=true
```

### 4. NuxtHub Setup

1. **Ensure you have a NuxtHub account**
2. **Get your user token**:
   ```bash
   pnpx nuxthub login
   pnpx nuxthub whoami
   ```

3. **Add token to GitHub Secrets**:
   - Go to repository Settings → Secrets
   - Add `NUXT_HUB_USER_TOKEN`

### 5. Testing

#### Local Preview Deployment
```bash
# Deploy as preview
./scripts/preview-deploy.sh

# Dry run (no actual deployment)
./scripts/preview-deploy.sh --dry-run
```

#### Verify Deployment
```bash
# Check DNS
dig preview.timezyme.com

# Test with curl
curl -I https://preview.timezyme.com
```

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   GitHub PR     │────▶│  GitHub Actions  │────▶│    NuxtHub      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                           │
                                                           ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ preview.        │◀────│   Cloudflare     │◀────│   Cloudflare    │
│ timezyme.com    │     │      DNS         │     │    Workers      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## Features

### Automatic PR Comments
Every PR gets a comment with:
- Custom domain URL (preview.timezyme.com)
- Direct deployment URL
- Commit hash and branch info
- Environment warnings

### Isolated Environment
- Separate from production
- Sandbox payment processing
- Demo mode enabled
- Safe for testing

### Quick Iterations
- Push to PR → Auto deploy
- ~2-3 minute deployment time
- Instant feedback

## Troubleshooting

### DNS Not Resolving
```bash
# Check DNS propagation
nslookup preview.timezyme.com
dig preview.timezyme.com

# Clear DNS cache (macOS)
sudo dscacheutil -flushcache
```

### Deployment Failures
1. Check GitHub Actions logs
2. Verify `NUXT_HUB_USER_TOKEN` is set
3. Ensure NuxtHub project exists
4. Check build errors in logs

### SSL Certificate Issues
- Cloudflare auto-provisions SSL
- Ensure proxy is enabled (orange cloud)
- Check SSL/TLS settings: Full or Full (strict)

### Preview Not Updating
1. Check if deployment succeeded
2. Clear Cloudflare cache:
   - Cloudflare Dashboard → Caching → Purge Everything
3. Wait for Worker propagation (1-2 minutes)

## Security Considerations

1. **Sandbox Only**: Preview always uses sandbox credentials
2. **No Production Data**: Isolated from production database
3. **Demo Mode**: Safe defaults for testing
4. **Access Control**: Can add Cloudflare Access if needed

## Advanced Usage

### Manual Deployment Trigger
```yaml
# In GitHub Actions
workflow_dispatch:
  inputs:
    branch:
      description: 'Branch to deploy'
      required: true
```

### Multiple Preview Environments
Add more CNAME records:
- `staging.timezyme.com`
- `qa.timezyme.com`
- `feature-x.timezyme.com`

### Environment-Specific Config
```typescript
// nuxt.config.ts
const isPreview = process.env.NUXT_PUBLIC_BASE_URL?.includes('preview')

export default defineNuxtConfig({
  // Preview-specific config
  ...(isPreview && {
    nitro: {
      experimental: {
        wasm: true
      }
    }
  })
})
```

## Maintenance

### Regular Tasks
- Clean old deployments monthly
- Review preview usage/costs
- Update dependencies quarterly

### Monitoring
- Set up Cloudflare Analytics
- Monitor deployment success rate
- Track preview environment usage

## Cost Considerations

NuxtHub/Cloudflare Workers pricing:
- **Free tier**: 100,000 requests/day
- **Preview usage**: Typically minimal
- **Storage**: Shared with production

## Next Steps

1. **Set up DNS record** in Cloudflare
2. **Add GitHub secret** for NuxtHub token
3. **Test with a PR** to verify setup
4. **Configure access controls** if needed

## Support

- NuxtHub Docs: https://hub.nuxt.com/docs
- Cloudflare Workers: https://developers.cloudflare.com/workers
- Repository Issues: Create an issue for help