# Cloudflare Access Setup for Preview Environment

This guide explains how to set up Cloudflare Access to protect the preview.timezyme.com deployment.

## Prerequisites

- Cloudflare account with timezyme.com domain
- Admin access to Cloudflare dashboard
- NuxtHub preview deployment working

## Setup Steps

### 1. Create Access Application

1. **Log in to Cloudflare Dashboard**
2. Navigate to **Zero Trust** → **Access** → **Applications**
3. Click **Create Application**
4. Select **Self-hosted**

### 2. Configure Application Settings

**Application Configuration:**
```
Application name: TimeZyme Preview
Session Duration: 24 hours
Application domain: preview.timezyme.com
Path: / (root)
```

### 3. Set Authentication Methods

Choose one or more authentication methods:

**Recommended Setup:**
- **Email OTP**: For team members without SSO
- **GitHub OAuth**: For developers with GitHub access
- **Google OAuth**: For broader team access

### 4. Create Access Policies

**Policy 1: Team Access**
```
Policy name: TimeZyme Team
Action: Allow
Include:
  - Emails ending in: @timezyme.com
  - GitHub teams: timezyme/developers
  - Specific emails: [list authorized users]
```

**Policy 2: Service Token (for CI/CD)**
```
Policy name: CI/CD Access
Action: Service Auth
Include:
  - Service Token: [generate token for GitHub Actions]
```

### 5. Generate Service Token for GitHub Actions

1. Go to **Access** → **Service Tokens**
2. Click **Create Service Token**
3. Name: `GitHub Actions Preview`
4. Duration: Non-expiring (or set rotation schedule)
5. Copy the Client ID and Client Secret

### 6. Add Service Token to GitHub Secrets

Add these secrets to your GitHub repository:
- `CLOUDFLARE_ACCESS_CLIENT_ID`
- `CLOUDFLARE_ACCESS_CLIENT_SECRET`

### 7. Update GitHub Actions Workflow

Add the service token to deployment steps:

```yaml
- name: Build & Deploy Preview to NuxtHub
  uses: nuxt-hub/action@v2
  env:
    CLOUDFLARE_ACCESS_CLIENT_ID: ${{ secrets.CLOUDFLARE_ACCESS_CLIENT_ID }}
    CLOUDFLARE_ACCESS_CLIENT_SECRET: ${{ secrets.CLOUDFLARE_ACCESS_CLIENT_SECRET }}
    # ... other env vars
```

## Testing Access

### Manual Testing
1. Navigate to https://preview.timezyme.com
2. You should see Cloudflare Access login page
3. Authenticate using configured method
4. Verify preview site loads after authentication

### Automated Testing
```bash
# Test with service token
curl -H "CF-Access-Client-Id: ${CLIENT_ID}" \
     -H "CF-Access-Client-Secret: ${CLIENT_SECRET}" \
     https://preview.timezyme.com
```

## Troubleshooting

### Access Denied Issues
- Check user email is in allowed list
- Verify authentication method is configured
- Check Access logs in Cloudflare dashboard

### Service Token Issues
- Regenerate token if expired
- Verify secrets are correctly set in GitHub
- Check token has correct permissions

### Domain Not Protected
- Ensure Access application is active
- Verify domain matches exactly
- Check DNS is proxied through Cloudflare

## Maintenance

### Regular Tasks
- Review Access logs monthly
- Rotate service tokens quarterly
- Update team member list as needed
- Monitor failed authentication attempts

### Adding New Team Members
1. Go to Access application settings
2. Edit the Team Access policy
3. Add email to allowed list
4. Save and deploy changes

### Removing Access
1. Remove user from Access policy
2. Optionally revoke active sessions
3. Document change in team records

## Security Best Practices

1. **Least Privilege**: Only grant access to those who need it
2. **Regular Audits**: Review access logs and user list monthly
3. **Token Rotation**: Rotate service tokens quarterly
4. **Session Duration**: Keep sessions reasonably short (24h recommended)
5. **Multi-factor**: Encourage GitHub/Google auth over email OTP

## Integration with NuxtHub

The preview deployment will work seamlessly with Cloudflare Access:
- Users authenticate once per session
- API calls inherit the Access session
- WebSocket connections maintained after auth
- Static assets served through Access proxy

## Next Steps

1. Set up Access application in Cloudflare
2. Configure authentication methods
3. Add authorized team members
4. Generate service token for CI/CD
5. Update GitHub secrets
6. Test manual and automated access