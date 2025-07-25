# Cloudflare DNS Configuration for preview.timezyme.com

## Prerequisites

- Access to Cloudflare dashboard for timezyme.com domain
- NuxtHub deployment URL (typically `timezyme-revq.nuxt.dev`)

## Step-by-Step DNS Configuration

### 1. Access Cloudflare Dashboard

1. Go to https://dash.cloudflare.com
2. Log in with your credentials
3. Select the `timezyme.com` domain from your account

### 2. Navigate to DNS Settings

1. Click on "DNS" in the left sidebar
2. You should see the DNS management interface

### 3. Add CNAME Record for Preview Subdomain

Click "Add record" and configure as follows:

| Field | Value |
|-------|-------|
| **Type** | CNAME |
| **Name** | preview |
| **Target** | timezyme-revq.nuxt.dev |
| **Proxy status** | Proxied (orange cloud ON) |
| **TTL** | Auto |

**Important**: 
- The "Name" field should only contain `preview` (not the full domain)
- Make sure the proxy status is **enabled** (orange cloud)
- The target should be your NuxtHub deployment domain

### 4. Verify SSL/TLS Settings

1. Go to "SSL/TLS" in the left sidebar
2. Under "Overview", ensure encryption mode is set to:
   - **Full** (recommended) or
   - **Full (strict)** (if you have valid certificates)

### 5. (Optional) Page Rules for Preview

To ensure preview deployments are not cached:

1. Go to "Rules" → "Page Rules"
2. Create a new page rule:
   - **URL**: `preview.timezyme.com/*`
   - **Settings**:
     - Cache Level: **Bypass**
     - Always Use HTTPS: **On**

### 6. DNS Propagation

After adding the record:
- DNS propagation typically takes 5-15 minutes
- Maximum propagation time is 48 hours (rare)

## Verification Steps

### 1. Check DNS Resolution

```bash
# Check if DNS is resolving
dig preview.timezyme.com

# Alternative method
nslookup preview.timezyme.com

# Check specific nameserver
dig @8.8.8.8 preview.timezyme.com
```

Expected result: Should show CNAME pointing to timezyme-revq.nuxt.dev

### 2. Test HTTPS Connection

```bash
# Test SSL/HTTPS
curl -I https://preview.timezyme.com

# Verbose SSL information
openssl s_client -connect preview.timezyme.com:443 -servername preview.timezyme.com
```

### 3. Check Cloudflare Proxy

The response headers should include:
- `CF-Ray`: Cloudflare request ID
- `Server: cloudflare`

## Troubleshooting

### DNS Not Resolving

1. **Double-check the CNAME record**:
   - Name: `preview` (not `preview.timezyme.com`)
   - Target: Correct NuxtHub URL
   - Proxy: Enabled

2. **Clear DNS cache**:
   ```bash
   # macOS
   sudo dscacheutil -flushcache
   
   # Windows
   ipconfig /flushdns
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

3. **Wait for propagation**:
   - Use https://www.whatsmydns.net/#CNAME/preview.timezyme.com

### SSL Certificate Errors

1. **Ensure proxy is enabled** (orange cloud)
2. **Check SSL/TLS mode** is "Full" or higher
3. **Wait for certificate provisioning** (usually automatic)

### 502/503 Errors

1. **Verify NuxtHub deployment exists**
2. **Check if target URL is accessible**:
   ```bash
   curl https://timezyme-revq.nuxt.dev
   ```
3. **Ensure deployment is successful** in GitHub Actions

## Alternative Configuration (Workers Route)

If CNAME doesn't work, use Workers Routes:

1. Go to "Workers Routes" in Cloudflare
2. Add route:
   - Route: `preview.timezyme.com/*`
   - Worker: Select your deployed worker
   - Zone: timezyme.com

## Security Considerations

### 1. Access Control (Optional)

To restrict access to preview:

1. Go to "Zero Trust" → "Access" → "Applications"
2. Add application:
   - Name: TimeZyme Preview
   - Domain: preview.timezyme.com
   - Policy: Configure access rules

### 2. Firewall Rules

Consider adding firewall rules:
- Block suspicious traffic
- Rate limiting
- Geographic restrictions

## Monitoring

### 1. Analytics

Monitor preview subdomain traffic:
- Cloudflare Analytics → DNS
- Look for preview.timezyme.com queries

### 2. Health Checks

Set up health monitoring:
1. Go to "Traffic" → "Health Checks"
2. Create check for https://preview.timezyme.com

## Final Checklist

- [ ] CNAME record added for `preview`
- [ ] Proxy status enabled (orange cloud)
- [ ] SSL/TLS mode set to "Full" or higher
- [ ] DNS propagation verified
- [ ] HTTPS connection tested
- [ ] Preview deployment accessible

## Support Resources

- Cloudflare DNS Docs: https://developers.cloudflare.com/dns/
- NuxtHub Support: https://hub.nuxt.com/docs
- DNS Propagation Checker: https://www.whatsmydns.net/

## Next Steps

After DNS setup:
1. Create a test PR to trigger preview deployment
2. Wait for GitHub Actions to complete
3. Access https://preview.timezyme.com
4. Verify preview functionality