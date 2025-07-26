# Preview Deployment Guide

This guide explains how to set up and use preview deployments for TimeZyme.

## Overview

TimeZyme uses a two-tier preview system:

1. **Stable Preview Environment** (preview.timezyme.com) - Production-like settings deployed from `preview` branch
2. **PR Preview Deployments** - Temporary previews for pull requests with sandbox settings

## Quick Start

1. **Create GitHub Environment** (see GitHub Setup section)
2. **Configure NuxtHub** (see NuxtHub Setup section)  
3. **Create preview branch**: `git checkout -b preview && git push -u origin preview`
4. **Deploy**: Push to preview branch
5. **Access**: Workers URL (e.g., https://9837932f-timezyme-preview.timezyme.workers.dev/)

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  preview branch │────▶│ GitHub Actions   │────▶│ NuxtHub Deploy  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                                           │
                                                           ▼
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ preview.        │◀────│ Cloudflare       │◀────│ Same Worker as  │
│ timezyme.com    │     │ Custom Domain    │     │ Production      │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

## Setup Instructions

### 1. GitHub Setup

#### Create Staging Environment

1. Go to your repository → Settings → Environments
2. Click "New environment"
3. Name it "staging"
4. Add the following secrets:

**Required Secrets**:
- `NUXT_UI_PRO_LICENSE`: Your Nuxt UI Pro license key

**Environment Variables** (add all as environment secrets):
- `NUXT_SESSION_PASSWORD`: Generate a 32+ character password
- `NUXT_PUBLIC_BASE_URL`: `https://preview.timezyme.com`
- `NUXT_PRIVATE_POLAR_SERVER`: `production`
- `NUXT_PRIVATE_POLAR_ACCESS_TOKEN`: Your Polar production token
- `NUXT_PRIVATE_POLAR_WEBHOOK_SECRET`: Your Polar webhook secret  
- `NUXT_PRIVATE_POLAR_ORGANIZATION_ID`: Your Polar organization ID

### 2. NuxtHub Setup (Optional)

If you want to configure custom domains or environment-specific settings:

1. Go to [NuxtHub Dashboard](https://admin.hub.nuxt.com)
2. Navigate to Settings → Environments
3. Create a custom environment (e.g., "staging" or "preview-prod")
4. Set branch pattern to match "preview"
5. Configure the same environment variables as above

**Additional Optional Variables**:
- `NUXT_PUBLIC_AUTH_ENABLED`: `true` (defaults to true)
- `NUXT_PUBLIC_ADMIN_DEMO_MODE_ENABLED`: `false`
- `NUXT_PUBLIC_PREVIEW_MODE`: `true`
- OAuth credentials (if using OAuth)
- Email provider credentials (if using email)

### 3. Create Preview Branch

```bash
git checkout -b preview
git push -u origin preview
```

## Deployment Methods

### Method 1: Automatic (Recommended)
Push to the `preview` branch:
```bash
git checkout preview
git merge main  # or cherry-pick specific commits
git push
```

### Method 2: Manual Script
```bash
./scripts/preview-deploy.sh
```

### Method 3: PR Previews
Create a pull request → Automatic temporary preview with sandbox settings

## How It Works

1. **GitHub Environment**: Uses "staging" environment in GitHub for secrets management
2. **NuxtHub Deployment**: Deploys to NuxtHub's preview environment automatically
3. **Build Process**: nuxt-hub/action builds with correct Cloudflare preset
4. **Environment Variables**: Secrets from GitHub staging environment are used during build
5. **Preview URL**: Generates a workers.dev URL for the preview deployment

## Environment Differences

| Feature | Production | Preview Branch | PR Preview |
|---------|------------|----------------|------------|
| URL | timezyme.com | *.workers.dev | *.workers.dev |
| Branch | main | preview | any (PR) |
| Auth | Disabled* | Enabled | Disabled |
| Polar | Production | Production | Sandbox |
| Database | Production | Production** | Production** |
| GitHub Env | production | staging | none |

\* Currently disabled in production  
\** Shares production database (use caution)

## Testing Checklist

- [ ] Preview banner appears at top of page
- [ ] Authentication flow works (login/logout)
- [ ] OAuth providers connect properly
- [ ] Payment flows use production Polar
- [ ] No console errors

## Troubleshooting

### Common Issues

#### "Missing NUXT_UI_PRO_LICENSE"
- Ensure the secret is added to the GitHub staging environment
- Check that the workflow specifies `environment: staging`

#### Build Errors (401 Unauthorized)
- Add Polar credentials to GitHub staging environment
- Ensure NUXT_PRIVATE_POLAR_SERVER is set to "production"

#### Preview Not Updating
1. Check GitHub Actions logs
2. Verify all required secrets are in staging environment
3. Ensure preview branch is pushed

### Auth Not Working
1. Check OAuth redirect URIs include preview domain
2. Verify SESSION_PASSWORD is 32+ characters
3. Ensure NUXT_PUBLIC_AUTH_ENABLED=true in workflow

### DNS Issues
1. preview.timezyme.com should already resolve
2. If not, check Cloudflare Workers custom domains

## Important Notes

1. **Database Sharing**: Preview uses production database. Be careful with data modifications.
2. **GitHub Staging Environment**: All secrets must be added to the GitHub "staging" environment.
3. **Build-time Variables**: Polar credentials are required during build for pre-rendering.
4. **Deployment URL**: Access via the generated workers.dev URL until custom domain is configured.

## Files Reference

- **Workflows**: `.github/workflows/preview-branch-deployment.yml`
- **Script**: `scripts/preview-deploy.sh`
- **Component**: `app/components/PreviewModeBanner.vue`

## Required Secrets Summary

**GitHub Repository Secret**:
- `NUXT_UI_PRO_LICENSE`: Required for Nuxt UI Pro

**GitHub Staging Environment Secrets**:
- `NUXT_UI_PRO_LICENSE`: Same as above (required in environment too)
- `NUXT_SESSION_PASSWORD`: 32+ character password
- `NUXT_PUBLIC_BASE_URL`: https://preview.timezyme.com
- `NUXT_PRIVATE_POLAR_SERVER`: production
- `NUXT_PRIVATE_POLAR_ACCESS_TOKEN`: Your Polar token
- `NUXT_PRIVATE_POLAR_WEBHOOK_SECRET`: Your webhook secret
- `NUXT_PRIVATE_POLAR_ORGANIZATION_ID`: Your org ID

## Future Enhancements

- [ ] Custom domain configuration (preview.timezyme.com)
- [ ] Cloudflare Access protection
- [ ] Separate preview database
- [ ] Preview-specific analytics