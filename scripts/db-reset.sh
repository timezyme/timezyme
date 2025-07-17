#!/bin/bash

# Reset local NuxtHub database

echo "🗄️  Resetting NuxtHub local database..."
echo "=================================="

# Color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Confirm reset
echo -e "${YELLOW}⚠️  This will delete all local data!${NC}"
read -p "Are you sure? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled"
    exit 0
fi

# Remove NuxtHub local data
if [ -d .data/hub ]; then
    echo "Removing .data/hub directory..."
    rm -rf .data/hub
    echo -e "${GREEN}✓ Database removed${NC}"
else
    echo -e "${YELLOW}No database found to remove${NC}"
fi

# Run migrations to recreate schema
echo ""
echo "Regenerating database schema..."
pnpm db:generate

echo ""
echo -e "${GREEN}✅ Database reset complete!${NC}"
echo "The database will be recreated when you start the dev server."