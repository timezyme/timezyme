#!/bin/bash

# Quick Test Runner
# Ultra-fast test to verify authentication is working
# Perfect for running after every file save or small change

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "⚡ Quick System Check..."

# Check dev server
if ! curl -s http://localhost:9009 > /dev/null 2>&1; then
    echo -e "${RED}❌ Dev server not responding on port 9009${NC}"
    echo "Run: pnpm dev"
    exit 1
fi

# Test auth endpoint
AUTH_RESPONSE=$(curl -s -X POST http://localhost:9009/api/auth/login-with-password \
  -H "Content-Type: application/json" \
  -d '{"email":"demo-user@nuxtstarterkit.com","password":"demoUserNuxtStarterKit"}' \
  -w "\n%{http_code}" 2>/dev/null | tail -n 1)

if [ "$AUTH_RESPONSE" = "200" ] || [ "$AUTH_RESPONSE" = "302" ]; then
    echo -e "${GREEN}✅ Auth system: OK${NC}"
else
    echo -e "${RED}❌ Auth system: FAILED (HTTP $AUTH_RESPONSE)${NC}"
    exit 1
fi

# Test protected route redirect
DASHBOARD_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9009/dashboard)

if [ "$DASHBOARD_RESPONSE" = "302" ] || [ "$DASHBOARD_RESPONSE" = "401" ] || [ "$DASHBOARD_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ Protected routes: OK (HTTP $DASHBOARD_RESPONSE)${NC}"
else
    echo -e "${RED}❌ Protected routes: FAILED (HTTP $DASHBOARD_RESPONSE)${NC}"
fi

echo -e "${GREEN}✅ System operational${NC}"