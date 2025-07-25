# Preview Deployment Guide

This guide explains how to set up and use preview deployments for TimeZyme.

## Overview

TimeZyme uses a two-tier preview system:

1. **Stable Preview Environment** (preview.timezyme.com) - Production-like settings deployed from `preview` branch
2. **PR Preview Deployments** - Temporary previews for pull requests with sandbox settings

## Quick Start

1. **Add GitHub Secrets** (see Required Secrets section)
2. **Create preview branch**: `git checkout -b preview && git push -u origin preview`
3. **Deploy**: Push to preview branch or run `./scripts/preview-deploy.sh`
4. **Access**: https://preview.timezyme.com

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

### 1. Configure Environment Variables in NuxtHub

Go to [NuxtHub Dashboard](https://admin.hub.nuxt.com) → Your Project → Settings → Environments → Preview

Add the following environment variables:

**Base Configuration**:
- `NUXT_PUBLIC_BASE_URL`: `https://preview.timezyme.com`
- `NUXT_PUBLIC_AUTH_ENABLED`: `true`
- `NUXT_PUBLIC_ADMIN_DEMO_MODE_ENABLED`: `false`
- `NUXT_PUBLIC_PREVIEW_MODE`: `true`

**Polar (Production)**:
- `NUXT_PRIVATE_POLAR_SERVER`: `production`
- `NUXT_PRIVATE_POLAR_ACCESS_TOKEN`: Your production token
- `NUXT_PRIVATE_POLAR_WEBHOOK_SECRET`: Your production webhook secret
- `NUXT_PRIVATE_POLAR_ORGANIZATION_ID`: Your production org ID

**OAuth Providers**:
- `NUXT_OAUTH_GITHUB_CLIENT_ID`: Your GitHub OAuth client ID
- `NUXT_OAUTH_GITHUB_CLIENT_SECRET`: Your GitHub OAuth client secret
- `NUXT_OAUTH_GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `NUXT_OAUTH_GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret

**Email & Auth**:
- `NUXT_SESSION_PASSWORD`: Your session password (32+ characters)
- `NUXT_PRIVATE_EMAIL_CONTACT`: Contact email
- `NUXT_PRIVATE_FROM_EMAIL`: From email address
- `NUXT_PRIVATE_EMAIL_PROVIDER`: `resend`
- `NUXT_PRIVATE_RESEND_API_TOKEN`: Your Resend API token
- `NUXT_PRIVATE_EMAIL_SEND_IN_DEV_MODE`: `false`

### 2. DNS Configuration (Already Done)

The preview.timezyme.com custom domain is already configured in Cloudflare Workers.

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

1. **NuxtHub Environments**: Preview environment variables are now managed directly in NuxtHub
2. **Deployment Flag**: GitHub Actions uses `--environment=preview` to deploy to preview environment
3. **Single Worker**: Both production and preview use the same Cloudflare Worker
4. **Domain Routing**: preview.timezyme.com routes to the Worker with preview configuration
5. **Preview Detection**: App detects preview mode via URL or environment variable

## Environment Differences

| Feature | Production | Preview | PR Preview |
|---------|------------|---------|------------|
| URL | timezyme.com | preview.timezyme.com | *.workers.dev |
| Branch | main | preview | any (PR) |
| Auth | Disabled* | Enabled | Disabled |
| Polar | Production | Production | Sandbox |
| Database | Production | Production** | Production** |

\* Currently disabled in production  
\** Shares production database (use caution)

## Testing Checklist

- [ ] Preview banner appears at top of page
- [ ] Authentication flow works (login/logout)
- [ ] OAuth providers connect properly
- [ ] Payment flows use production Polar
- [ ] No console errors

## Troubleshooting

### Preview Not Updating
1. Check GitHub Actions logs
2. Ensure secrets are set correctly
3. Verify preview branch is pushed

### Auth Not Working
1. Check OAuth redirect URIs include preview domain
2. Verify SESSION_PASSWORD is 32+ characters
3. Ensure NUXT_PUBLIC_AUTH_ENABLED=true in workflow

### DNS Issues
1. preview.timezyme.com should already resolve
2. If not, check Cloudflare Workers custom domains

## Important Notes

1. **Database Sharing**: Preview uses production database. Be careful with data modifications.
2. **Environment Variables**: Now managed directly in NuxtHub Dashboard under Environments → Preview.
3. **Deployment**: Push to preview branch or run `./scripts/preview-deploy.sh` to deploy with new settings.

## Files Reference

- **Workflows**: `.github/workflows/preview-branch-deployment.yml`
- **Script**: `scripts/preview-deploy.sh`
- **Component**: `app/components/PreviewModeBanner.vue`

## Future Enhancements

- [ ] Cloudflare Access protection
- [ ] Separate preview database
- [ ] Preview-specific analytics
- [ ] Staging environment