#!/bin/bash

# Critical Tests Runner
# This script runs essential tests to verify system integrity after development tasks
# It provides quick feedback on whether critical features are still working

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🧪 Running Critical System Tests..."
echo "=================================="

# Check if dev server is running
if ! lsof -i :9009 > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Dev server not running on port 9009${NC}"
    echo "Starting dev server..."
    pnpm dev > dev.log 2>&1 &
    DEV_PID=$!
    echo "Waiting for server to start..."
    sleep 10
    
    # Verify server started
    if ! lsof -i :9009 > /dev/null 2>&1; then
        echo -e "${RED}❌ Failed to start dev server${NC}"
        exit 1
    fi
    STOP_SERVER=true
else
    echo -e "${GREEN}✅ Dev server is running${NC}"
    STOP_SERVER=false
fi

# Run critical tests only
echo ""
echo "Running system health tests..."
pnpm playwright test app/e2e/tests/system-health.e2e.ts --reporter=line

# Run payment integration tests if requested
if [ "$1" = "--with-payment" ] || [ "$1" = "--full" ]; then
    echo ""
    echo "Running payment integration tests..."
    pnpm playwright test app/e2e/tests/payment-integration.e2e.ts --reporter=line
fi

# Run admin functionality tests if requested
if [ "$1" = "--with-admin" ] || [ "$1" = "--full" ]; then
    echo ""
    echo "Running admin functionality tests..."
    pnpm playwright test app/e2e/tests/admin-functionality.e2e.ts --reporter=line
fi

# Check test results
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All critical tests passed!${NC}"
    echo ""
    echo "System Status:"
    echo "- Authentication: Working ✅"
    echo "- Database: Users exist ✅"
    echo "- Protected routes: Secured ✅"
    echo "- Navigation: Functional ✅"
    TESTS_PASSED=true
else
    echo ""
    echo -e "${RED}❌ Critical tests failed!${NC}"
    echo ""
    echo "Please check the following:"
    echo "1. Database is seeded (run: ./scripts/db-seed.sh)"
    echo "2. No syntax errors in recent changes"
    echo "3. Authentication endpoints are accessible"
    echo ""
    echo "Run full tests for details: pnpm test:e2e"
    TESTS_PASSED=false
fi

# Stop dev server if we started it
if [ "$STOP_SERVER" = true ] && [ -n "$DEV_PID" ]; then
    echo ""
    echo "Stopping dev server..."
    kill $DEV_PID 2>/dev/null || true
    rm -f dev.log
fi

# Exit with appropriate code
if [ "$TESTS_PASSED" = true ]; then
    exit 0
else
    exit 1
fi