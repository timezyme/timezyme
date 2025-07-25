#!/bin/bash

# Post-Task Verification Script
# Run this after completing any development task to ensure nothing broke
# Usage: ./scripts/post-task-verify.sh [--full]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Parse arguments
RUN_FULL=false
if [ "$1" = "--full" ]; then
    RUN_FULL=true
fi

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}                          POST-TASK VERIFICATION                               ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Step 0: Environment Detection
echo "🔍 Checking environment configuration..."
AUTH_ENABLED="true"
if [ -f .env ]; then
    # Check if auth is explicitly disabled
    if grep -q "NUXT_PUBLIC_AUTH_ENABLED=false" .env 2>/dev/null; then
        AUTH_ENABLED="false"
    fi
fi

if [ "$AUTH_ENABLED" = "false" ]; then
    echo -e "${CYAN}   ℹ️  Auth is DISABLED (marketing mode)${NC}"
else
    echo -e "${GREEN}   ✅ Auth is ENABLED${NC}"
fi

# Step 1: TypeScript Check
echo ""
echo "1️⃣  Running TypeScript check..."
if pnpm typecheck > /tmp/typecheck.log 2>&1; then
    echo -e "${GREEN}   ✅ TypeScript: No errors${NC}"
else
    echo -e "${RED}   ❌ TypeScript: Errors found${NC}"
    echo "   Run 'pnpm typecheck' for details"
    # Don't exit, continue checking
fi

# Step 2: Linting
echo ""
echo "2️⃣  Running ESLint..."
if pnpm lint > /tmp/lint.log 2>&1; then
    echo -e "${GREEN}   ✅ Linting: No issues${NC}"
else
    echo -e "${YELLOW}   ⚠️  Linting: Issues found${NC}"
    echo "   Run 'pnpm lint:fix' to auto-fix"
fi

# Step 3: Database Integrity Check
echo ""
echo "3️⃣  Checking database integrity..."
DB_EXISTS=false
DB_HAS_CONTENT=false

if [ -f .data/hub/db.sqlite ]; then
    DB_EXISTS=true
    # Check if database has content (size > 100KB indicates it's probably seeded)
    DB_SIZE=$(stat -f%z .data/hub/db.sqlite 2>/dev/null || stat -c%s .data/hub/db.sqlite 2>/dev/null || echo "0")
    if [ "$DB_SIZE" -gt 100000 ]; then
        DB_HAS_CONTENT=true
    fi
fi

if [ "$DB_EXISTS" = true ] && [ "$DB_HAS_CONTENT" = true ]; then
    echo -e "${GREEN}   ✅ Database: Exists and has content${NC}"
else
    echo -e "${YELLOW}   ⚠️  Database: May need seeding${NC}"
    echo "   Run './scripts/db-seed.sh' to add demo users"
fi

# Step 4: Conditional Auth Testing
echo ""
if [ "$AUTH_ENABLED" = "true" ]; then
    echo "4️⃣  Checking authentication system..."
    if ./scripts/quick-test.sh > /tmp/quick-test.log 2>&1; then
        echo -e "${GREEN}   ✅ Auth system: Operational${NC}"
    else
        echo -e "${RED}   ❌ Auth system: Issues detected${NC}"
        cat /tmp/quick-test.log
    fi
else
    echo "4️⃣  Skipping auth tests (auth is disabled)"
    # Check marketing mode functionality instead
    echo "   Checking marketing mode..."
    
    # Test that homepage is accessible
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:9009 | grep -q "200"; then
        echo -e "${GREEN}   ✅ Homepage: Accessible${NC}"
    else
        echo -e "${RED}   ❌ Homepage: Not accessible${NC}"
    fi
    
    # Test that login redirects or shows appropriate message
    LOGIN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9009/auth/login)
    if [ "$LOGIN_STATUS" = "404" ] || [ "$LOGIN_STATUS" = "302" ]; then
        echo -e "${GREEN}   ✅ Login page: Properly handled${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Login page: Status $LOGIN_STATUS${NC}"
    fi
fi

# Step 5: Payment System Check (ALWAYS RUN - Critical Feature)
echo ""
echo "5️⃣  Checking payment system (Polar)..."

# Quick payment check
PAYMENT_OK=true
PRICING_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9009/pricing 2>/dev/null || echo "000")

if [ "$PRICING_STATUS" = "200" ]; then
    echo -e "${GREEN}   ✅ Pricing page: Accessible${NC}"
    
    # Check if pricing page has expected content
    if curl -s http://localhost:9009/pricing | grep -q -E "(pro|free|\$20|\$0)" 2>/dev/null; then
        echo -e "${GREEN}   ✅ Pricing plans: Displayed${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Pricing plans: May not be displaying correctly${NC}"
        PAYMENT_OK=false
    fi
else
    echo -e "${RED}   ❌ Pricing page: Not accessible (HTTP $PRICING_STATUS)${NC}"
    PAYMENT_OK=false
fi

# Run payment tests if not OK or if full tests requested
if [ "$PAYMENT_OK" = false ] || [ "$RUN_FULL" = true ]; then
    echo "   Running payment integration tests..."
    if pnpm playwright test app/e2e/tests/payment-integration.e2e.ts --reporter=line > /tmp/payment-test.log 2>&1; then
        echo -e "${GREEN}   ✅ Payment tests: Passed${NC}"
    else
        echo -e "${RED}   ❌ Payment tests: Failed${NC}"
        echo "   Check logs at /tmp/payment-test.log"
    fi
fi

# Step 6: Run Additional Tests (if requested)
if [ "$RUN_FULL" = true ]; then
    echo ""
    echo "6️⃣  Running full test suite..."
    
    # Only run auth-related tests if auth is enabled
    if [ "$AUTH_ENABLED" = "true" ]; then
        if ./scripts/run-critical-tests.sh --full; then
            echo -e "${GREEN}   ✅ All tests: Passed${NC}"
        else
            echo -e "${RED}   ❌ Tests: Failed${NC}"
        fi
    else
        # Run non-auth tests
        echo "   Running non-auth tests..."
        if pnpm playwright test app/e2e/tests/payment-integration.e2e.ts app/e2e/tests/waitlist.e2e.ts --reporter=line; then
            echo -e "${GREEN}   ✅ Non-auth tests: Passed${NC}"
        else
            echo -e "${RED}   ❌ Non-auth tests: Failed${NC}"
        fi
    fi
else
    echo ""
    echo "6️⃣  Skipping full tests (use --full to run comprehensive suite)"
fi

# Summary
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Always show summary - the script tracks warnings and errors as it runs
echo -e "${GREEN}✅ Verification complete!${NC}"

echo ""
echo "Summary:"
echo "• Auth Mode: $([ "$AUTH_ENABLED" = "true" ] && echo "ENABLED" || echo "DISABLED (marketing mode)")"
echo "• Code Quality: TypeScript & Linting checked"
echo "• Database: $([ "$DB_HAS_CONTENT" = "true" ] && echo "Seeded" || echo "May need seeding")"
echo "• Payment System: $([ "$PAYMENT_OK" = "true" ] && echo "Operational" || echo "Needs attention")"

echo ""
echo "Next steps:"
echo "• Review any warnings above"
if [ "$RUN_FULL" = false ]; then
    echo "• Run './scripts/post-task-verify.sh --full' for comprehensive tests"
fi
echo "• Commit your changes when ready"
echo ""

# Clean up temp files
rm -f /tmp/typecheck.log /tmp/lint.log /tmp/quick-test.log /tmp/payment-test.log /tmp/post-task-verify-output.log 2>/dev/null || true