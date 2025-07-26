# DB_PREVIEW Creation Quick Reference

## 🚀 Quick Steps

### 1️⃣ Cloudflare Dashboard
```
URL: https://dash.cloudflare.com
Path: Storage & Databases > D1 SQL Database > Create Database
Name: timezyme-preview
Location: (Optional - choose closest to preview deployment)
Action: COPY THE DATABASE ID IMMEDIATELY!
```

### 2️⃣ NuxtHub Dashboard
```
URL: https://admin.hub.nuxt.com
Path: Project Settings > Environment Variables
Key: NUXT_DB_PREVIEW_ID
Value: [Database ID from step 1]
Scope: Preview Environment Only
```

### 3️⃣ Deploy
```bash
git push origin preview
```

### 4️⃣ Initialize
```bash
# Check migrations
npx nuxthub database migrations list --preview

# Apply if needed
npx nuxthub database migrations mark-all-applied --preview
```

### 5️⃣ Verify
```bash
# Check health
curl https://preview.timezyme.com/api/health | jq .

# Look for:
# - "environment": "preview"
# - "database.binding": "DB_PREVIEW"
# - "dbPreviewAvailable": true
```

### 6️⃣ Seed Data
```bash
# Demo User
curl -X POST https://preview.timezyme.com/api/seed-user \
  -H "Content-Type: application/json" \
  -d '{"email":"demo-user@nuxtstarterkit.com","name":"Demo User","hashedPassword":"$scrypt$16384$8$1$1kUCNMhRO6c0Y+R7EE+TSQ$RNz0Kslx1vNQE3IFEdGLo9UHl/ycL5YLnmVYDJR+vFqcOHBVlBW0sB1dFpqVlOqOcdK6vFLulv9jseqLcdXoFw","role":"user"}'

# Demo Admin
curl -X POST https://preview.timezyme.com/api/seed-user \
  -H "Content-Type: application/json" \
  -d '{"email":"demo-admin@nuxtstarterkit.com","name":"Demo Admin","hashedPassword":"$scrypt$16384$8$1$wZxgsnY7CEzCFkVCKmQNiA$CJ/CPBqHMXrqcr8BFLSJqR0A+i7jJVxuLaZH5a3lFW1akmjTKJlYOLhudD6lLdJz1OFW0e8fZ/GG8K3ZZHsRJA","role":"admin"}'
```

### 7️⃣ Test Separation
```bash
./scripts/test-db-separation.sh
```

## ⚠️ Critical Points

1. **COPY DATABASE ID** - Cannot retrieve later from dashboard!
2. **Environment Scope** - Variable MUST be set for preview only
3. **Wait Time** - Allow 2-5 minutes after deployment
4. **Use --preview Flag** - For all migration commands

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| DB_PREVIEW not found | Check env var in NuxtHub, redeploy |
| Migration fails | Update wrangler, use --preview flag |
| Connection timeout | Wait 5 min, check location hint |
| Wrong environment | Verify NUXT_HUB_ENV=preview |

## 📝 Database ID Format
```
Example: a1b2c3d4-e5f6-7890-abcd-ef1234567890
Type: UUID v4
Length: 36 characters (including hyphens)
```