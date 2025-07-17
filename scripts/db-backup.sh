#!/bin/bash

# Backup local NuxtHub database

echo "💾 Backing up NuxtHub local database..."
echo "====================================="

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Create backups directory
mkdir -p backups

# Check if database exists
if [ ! -d .data/hub ]; then
    echo -e "${YELLOW}⚠️  No database found to backup${NC}"
    exit 1
fi

# Generate backup filename with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backups/nuxthub_backup_${TIMESTAMP}.tar.gz"

# Create backup
echo "Creating backup..."
tar -czf "$BACKUP_FILE" .data/hub

if [ $? -eq 0 ]; then
    SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✅ Backup created successfully!${NC}"
    echo "   File: $BACKUP_FILE"
    echo "   Size: $SIZE"
    
    # Keep only last 5 backups
    echo ""
    echo "Cleaning old backups..."
    cd backups
    ls -t nuxthub_backup_*.tar.gz | tail -n +6 | xargs -r rm
    cd ..
    
    echo -e "${GREEN}✓ Kept last 5 backups${NC}"
else
    echo -e "${RED}❌ Backup failed!${NC}"
    exit 1
fi