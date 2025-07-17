#!/bin/bash

# Environment setup checklist script

echo "🔧 Setting up local environment for Nuxt Starter Kit..."
echo "=================================================="

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node version
echo -n "Node.js version: "
NODE_VERSION=$(node -v 2>/dev/null)
if [[ $NODE_VERSION == v22* ]] || [[ $NODE_VERSION == v23* ]]; then
  echo -e "${GREEN}$NODE_VERSION ✓${NC}"
else
  echo -e "${RED}$NODE_VERSION ✗ (v22+ required)${NC}"
fi

# Check pnpm
echo -n "pnpm: "
if command -v pnpm &> /dev/null; then
  PNPM_VERSION=$(pnpm -v)
  echo -e "${GREEN}$PNPM_VERSION ✓${NC}"
else
  echo -e "${RED}Not installed ✗${NC}"
  echo "  Install with: npm install -g pnpm"
fi

# Check if package.json exists
if [ ! -f package.json ]; then
  echo -e "${RED}❌ package.json not found. Are you in the project root?${NC}"
  exit 1
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
  echo -e "${YELLOW}📦 Installing dependencies...${NC}"
  pnpm install
else
  echo -e "${GREEN}✓ Dependencies installed${NC}"
fi

# Check .env file
echo -n ".env file: "
if [ -f .env ]; then
  echo -e "${GREEN}exists ✓${NC}"
  
  # Check critical environment variables
  echo "Checking critical environment variables:"
  
  # Session password
  echo -n "  NUXT_SESSION_PASSWORD: "
  if grep -q "^NUXT_SESSION_PASSWORD=.\{32,\}" .env; then
    echo -e "${GREEN}set (32+ chars) ✓${NC}"
  else
    echo -e "${YELLOW}missing or too short (needs 32+ chars) ⚠️${NC}"
    echo "    Generate with: openssl rand -base64 32"
  fi
  
  # Base URL
  echo -n "  NUXT_PUBLIC_BASE_URL: "
  if grep -q "^NUXT_PUBLIC_BASE_URL=.\\+" .env; then
    echo -e "${GREEN}set ✓${NC}"
  else
    echo -e "${YELLOW}not set ⚠️${NC}"
    echo "    Set to: http://localhost:9009 for local dev"
  fi
  
  # Admin demo mode
  echo -n "  NUXT_PUBLIC_ADMIN_DEMO_MODE_ENABLED: "
  if grep -q "^NUXT_PUBLIC_ADMIN_DEMO_MODE_ENABLED=" .env; then
    echo -e "${GREEN}configured ✓${NC}"
  else
    echo -e "${YELLOW}not set ⚠️${NC}"
  fi
  
else
  echo -e "${YELLOW}missing ⚠️${NC}"
  echo "  Creating from .env.example..."
  cp .env.example .env
  echo -e "  ${GREEN}Created .env file ✓${NC}"
  echo -e "  ${YELLOW}⚠️  Please configure your environment variables${NC}"
fi

# Check database
echo -n "Database: "
if [ -d .data/hub ]; then
  echo -e "${GREEN}NuxtHub local storage exists ✓${NC}"
else
  echo -e "${YELLOW}Will be created on first run ⚠️${NC}"
fi

# Check for common issues
echo ""
echo "Checking for common issues:"

# Port availability
echo -n "  Port 9009: "
if lsof -i :9009 &> /dev/null; then
  echo -e "${RED}in use ✗${NC}"
  echo "    Kill process: lsof -ti :9009 | xargs kill"
else
  echo -e "${GREEN}available ✓${NC}"
fi

# Git status
echo -n "  Git repository: "
if [ -d .git ]; then
  echo -e "${GREEN}initialized ✓${NC}"
else
  echo -e "${YELLOW}not initialized ⚠️${NC}"
fi

echo ""
echo "=================================================="
echo "Setup check complete!"
echo ""
echo "Quick commands:"
echo "  Start dev:  ./scripts/dev-start.sh"
echo "  Stop dev:   ./scripts/dev-stop.sh"
echo "  Run tests:  pnpm test:e2e"
echo "  Lint code:  pnpm lint:fix"
echo ""

# Final status
if grep -q "✗" <<< "$NODE_VERSION" || ! command -v pnpm &> /dev/null || [ ! -f .env ]; then
  echo -e "${YELLOW}⚠️  Some issues need attention${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Ready for development!${NC}"
fi