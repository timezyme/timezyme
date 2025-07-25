# Preview Deployment Guide for preview.timezyme.com

This guide helps you set up a protected preview environment at `preview.timezyme.com` using Cloudflare Access.

## Step 1: Cloudflare Access Configuration

### Create Access Policy First (Recommended):

In Cloudflare Dashboard:

1. **Navigate to Zero Trust → Access → Policies**
2. **Click "Create a policy"**
3. **Configure the policy:**

**Policy Configuration:**
- **Policy name**: "TimeZyme Preview Access"
- **Decision**: Allow
- **Precedence**: 1

**Configure rules (choose one or combine):**
- **Include:**
  - **Email**: `your-email@example.com` (recommended for single user)
  - **Email domain**: `@yourdomain.com` (for team access)
  - **Access groups**: If you have predefined groups
- **Require (optional):**
  - **Authentication method**: MFA (for extra security)
  - **Device posture**: Specific device requirements

### Create Application:

1. **Navigate to Zero Trust → Access → Applications**
2. **Click "Add an application"**
3. **Select "Self-hosted"**

**Application Configuration:**
- **Application name**: TimeZyme Preview
- **Session duration**: 24 hours (or your preference)
- **Type**: `self_hosted`

**Application domain:**
- **Subdomain**: `preview`
- **Domain**: `timezyme.com`
- **Path**: Leave blank (protects entire subdomain)

**Select existing policy:**
- Choose the "TimeZyme Preview Access" policy you created
- Set precedence if you have multiple policies

**Additional settings:**
- **Auto-redirect to identity provider**: false (optional)
- **Enable App Launcher**: true (optional, for easy access)

## Step 2: DNS Configuration

In Cloudflare DNS:
1. Add a CNAME record:
   - **Name**: `preview`
   - **Target**: Your NuxtHub deployment URL
   - **Proxy status**: Proxied (orange cloud ON)

## Step 3: NuxtHub Deployment Configuration

### In NuxtHub Dashboard:

1. **Navigate to your project settings**
2. **Add a custom domain**: `preview.timezyme.com`
3. **Configure branch deployments**:
   - Enable deployments for `preview/dashboard-gated` branch
   - Set custom domain to `preview.timezyme.com`

### Environment Variables for Preview Branch:

Set these in NuxtHub for the `preview/dashboard-gated` branch:

```bash
# Base configuration
NUXT_PUBLIC_BASE_URL=https://preview.timezyme.com
NUXT_PUBLIC_AUTH_ENABLED=true
NUXT_PUBLIC_ADMIN_DEMO_MODE_ENABLED=false
NUXT_PUBLIC_PREVIEW_MODE=true

# Use the same auth providers as main
NUXT_OAUTH_GITHUB_CLIENT_ID=<your-github-client-id>
NUXT_OAUTH_GITHUB_CLIENT_SECRET=<your-github-client-secret>
NUXT_OAUTH_GOOGLE_CLIENT_ID=<your-google-client-id>
NUXT_OAUTH_GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Use production Polar for preview (optional)
NUXT_PRIVATE_POLAR_SERVER=production
NUXT_PRIVATE_POLAR_ACCESS_TOKEN=<production-token>
NUXT_PRIVATE_POLAR_WEBHOOK_SECRET=<production-webhook>
NUXT_PRIVATE_POLAR_ORGANIZATION_ID=<production-org-id>

# Email settings
NUXT_PRIVATE_FROM_EMAIL=support@timezyme.com
NUXT_PRIVATE_EMAIL_CONTACT=support@timezyme.com
NUXT_PRIVATE_EMAIL_PROVIDER=resend
NUXT_PRIVATE_EMAIL_RESEND_API_TOKEN=<your-resend-token>

# Session password (generate a new one for preview)
NUXT_SESSION_PASSWORD=<generate-new-32-char-password>

# Turnstile (if different for preview)
NUXT_PUBLIC_TURNSTILE_SITE_KEY=<your-key>
NUXT_TURNSTILE_SECRET_KEY=<your-secret>
```

## Step 4: Code Configuration

The following changes have been made to support preview mode:

1. **Environment variable added**: `NUXT_PUBLIC_PREVIEW_MODE=true` in `.env`
2. **Auth is enabled**: `NUXT_PUBLIC_AUTH_ENABLED=true` for full dashboard access

## Step 5: Deployment

1. **Commit and push** your changes:
   ```bash
   git add .
   git commit -m "feat: configure preview deployment for dashboard development"
   git push origin preview/dashboard-gated
   ```

2. **GitHub Actions** will automatically deploy to NuxtHub
3. **NuxtHub** will deploy to the configured domain
4. **Cloudflare Access** will protect the subdomain

## Step 6: Testing Access

1. Visit `https://preview.timezyme.com`
2. You'll see the Cloudflare Access login page
3. Authenticate with your configured method (email, etc.)
4. You'll be redirected to your protected preview site

## Optional: Service Token for CI/CD

If you need programmatic access:

1. In Cloudflare Access, create a Service Token
2. Add to your CI/CD secrets:
   - `CF_ACCESS_CLIENT_ID`
   - `CF_ACCESS_CLIENT_SECRET`
3. Use in automated tests:
   ```bash
   curl -H "CF-Access-Client-Id: ${CF_ACCESS_CLIENT_ID}" \
        -H "CF-Access-Client-Secret: ${CF_ACCESS_CLIENT_SECRET}" \
        https://preview.timezyme.com
   ```

## Troubleshooting

- **403 Forbidden**: Check Cloudflare Access policies
- **DNS not found**: Ensure CNAME record is created and proxied
- **SSL errors**: Wait for Cloudflare to provision SSL (can take up to 24h)
- **Deployment not updating**: Check NuxtHub branch deployment settings

## Security Notes

- Only authenticated users can access `preview.timezyme.com`
- All traffic is proxied through Cloudflare's network
- Access logs are available in Cloudflare Zero Trust dashboard
- Consider rotating service tokens periodically