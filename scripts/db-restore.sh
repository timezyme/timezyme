#!/bin/bash

# Restore NuxtHub database from backup

echo "📥 Restoring NuxtHub database from backup..."
echo "========================================"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if backups exist
if [ ! -d backups ] || [ -z "$(ls -A backups/nuxthub_backup_*.tar.gz 2>/dev/null)" ]; then
    echo -e "${RED}❌ No backups found!${NC}"
    exit 1
fi

# List available backups
echo "Available backups:"
echo ""
PS3="Select backup to restore (or press Ctrl+C to cancel): "
select BACKUP in backups/nuxthub_backup_*.tar.gz; do
    if [ -n "$BACKUP" ]; then
        break
    fi
done

echo ""
echo -e "${YELLOW}⚠️  This will replace the current database!${NC}"
read -p "Are you sure? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 0
fi

# Remove existing database
if [ -d .data/hub ]; then
    echo "Removing current database..."
    rm -rf .data/hub
fi

# Restore from backup
echo "Restoring from $BACKUP..."
tar -xzf "$BACKUP"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database restored successfully!${NC}"
else
    echo -e "${RED}❌ Restore failed!${NC}"
    exit 1
fi