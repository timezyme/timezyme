# Database Backup and Restore Guide

This guide explains how to backup and restore databases in the TimeZyme application.

## Overview

Database backups are crucial for:
- Preventing data loss during deployments
- Recovery from accidental deletions
- Testing and debugging production issues
- Migrating data between environments

## Backup Methods

### 1. Manual Backup (Local Development)

Use the provided backup script:

```bash
# Backup local database
./scripts/db-backup-automated.sh local

# Backup specific environment
./scripts/db-backup-automated.sh production
./scripts/db-backup-automated.sh preview
./scripts/db-backup-automated.sh staging

# Backup all environments
./scripts/db-backup-automated.sh all
```

### 2. Automated Backup (CI/CD)

Backups are automatically created:
- **Production**: Before each deployment to main branch
- **Preview**: Before each deployment to preview branch
- **PR Previews**: Optional, can be enabled in workflow

### 3. NuxtHub CLI Backup

Using NuxtHub CLI directly:

```bash
# Install NuxtHub CLI
pnpm add -g @nuxthub/cli

# Export production database
npx nuxthub database export --output backup.sql

# Export preview database
npx nuxthub database export --env preview --output preview-backup.sql
```

### 4. Cloudflare D1 API Backup

For programmatic access:

```bash
# Set environment variables
export CLOUDFLARE_API_TOKEN="your-token"
export CLOUDFLARE_ACCOUNT_ID="your-account-id"
export D1_DATABASE_ID="your-database-id"

# Create backup via API
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/d1/database/$D1_DATABASE_ID/backup" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json"
```

## Backup Storage

### Local Backups
- Stored in `.backups/` directory
- Compressed with gzip to save space
- Includes metadata JSON file
- Automatically rotated (keeps last 10)

### Remote Backups
- GitHub Actions artifacts (7 days retention)
- Cloudflare D1 automatic backups (30 days)
- External storage (S3, R2) - optional

## Restore Procedures

### 1. Restore from Local Backup

```bash
# List available backups
ls -la .backups/*.gz

# Extract backup
gunzip -c .backups/production_20240125_143022.sql.gz > restore.sql

# Import to local database
sqlite3 .data/hub/db.sqlite < restore.sql
```

### 2. Restore to NuxtHub

```bash
# Import to production
npx nuxthub database import --input restore.sql

# Import to preview
npx nuxthub database import --env preview --input restore.sql
```

### 3. Restore Specific Tables

```sql
-- Extract specific tables from backup
sqlite3 restore.sql

-- Export users table
.mode insert users
.output users_only.sql
SELECT * FROM users;
.quit

-- Import specific table
sqlite3 .data/hub/db.sqlite < users_only.sql
```

## Backup Best Practices

### 1. Regular Backups
- **Production**: Daily automated backups
- **Before deployments**: Always backup
- **Before migrations**: Critical backups
- **Weekly archives**: Long-term storage

### 2. Backup Validation
```bash
# Verify backup integrity
gzip -t backup.sql.gz

# Check backup size
ls -lh backup.sql.gz

# Test restore to temporary database
sqlite3 temp.db < backup.sql
sqlite3 temp.db "SELECT COUNT(*) FROM users;"
```

### 3. Security
- Encrypt sensitive backups
- Restrict access to backup files
- Never commit backups to git
- Use secure transfer methods

## Disaster Recovery

### Scenario 1: Accidental Data Deletion

```bash
# 1. Stop all services
./scripts/dev-stop.sh

# 2. Find latest backup before deletion
ls -la .backups/*.gz | grep "before_deletion_time"

# 3. Restore from backup
gunzip -c .backups/selected_backup.sql.gz > restore.sql
npx nuxthub database import --input restore.sql

# 4. Verify restoration
# Check user count, recent data, etc.
```

### Scenario 2: Corrupted Database

```bash
# 1. Create backup of corrupted database (for analysis)
./scripts/db-backup-automated.sh production

# 2. Find last known good backup
# Check backup metadata for healthy state

# 3. Restore from healthy backup
npx nuxthub database import --input healthy_backup.sql

# 4. Reapply recent changes if needed
```

### Scenario 3: Migration Rollback

```bash
# 1. Identify pre-migration backup
ls -la .backups/*_pre_migration_*.gz

# 2. Restore to pre-migration state
gunzip -c .backups/pre_migration_backup.sql.gz | \
  npx nuxthub database import --input -

# 3. Revert code changes
git revert <migration-commit>
```

## Automated Backup Configuration

### GitHub Actions Secrets

Add these secrets to your repository:

```yaml
CLOUDFLARE_API_TOKEN: Your Cloudflare API token
CLOUDFLARE_ACCOUNT_ID: Your account ID
D1_DATABASE_ID: Your D1 database ID
```

### Backup Retention Policy

Configure in `scripts/db-backup-automated.sh`:

```bash
# Maximum number of local backups to keep
MAX_BACKUPS=10

# Backup directory
BACKUP_DIR=".backups"
```

### Scheduled Backups

Add to `.github/workflows/scheduled-backup.yml`:

```yaml
name: Scheduled Database Backup

on:
  schedule:
    # Daily at 2 AM UTC
    - cron: '0 2 * * *'
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Backup Production Database
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          D1_DATABASE_ID: ${{ secrets.D1_DATABASE_ID }}
        run: ./scripts/db-backup-automated.sh production
        
      - name: Upload to External Storage
        # Add your S3/R2 upload logic here
        run: echo "Upload backup to external storage"
```

## Monitoring and Alerts

### Backup Health Checks

1. **Size Monitoring**: Alert if backup size changes significantly
2. **Integrity Checks**: Verify backup can be decompressed
3. **Age Monitoring**: Alert if no recent backups exist
4. **Restore Testing**: Periodic restore to test environment

### Example Monitoring Script

```bash
#!/bin/bash
# Check backup health

LATEST_BACKUP=$(ls -t .backups/*.gz | head -1)
BACKUP_AGE=$(find "$LATEST_BACKUP" -mtime +1 | wc -l)

if [ "$BACKUP_AGE" -gt 0 ]; then
  echo "WARNING: Latest backup is older than 24 hours"
  # Send alert
fi
```

## Troubleshooting

### Common Issues

1. **"Database is locked"**
   - Stop all services accessing the database
   - Wait for operations to complete
   - Retry backup

2. **"Backup too large"**
   - Increase compression level
   - Clean up old data before backup
   - Use incremental backups

3. **"Import failed"**
   - Check database schema compatibility
   - Verify backup integrity
   - Check available disk space

### Debug Commands

```bash
# Check database size
du -h .data/hub/db.sqlite

# List tables
sqlite3 .data/hub/db.sqlite ".tables"

# Check record counts
sqlite3 .data/hub/db.sqlite "SELECT COUNT(*) FROM users;"

# Verify backup
gzip -t backup.sql.gz && echo "Backup is valid"
```