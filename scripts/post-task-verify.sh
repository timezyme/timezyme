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

# Step 1: TypeScript Check
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

# Step 3: Quick Auth Check
echo ""
echo "3️⃣  Checking authentication system..."
if ./scripts/quick-test.sh > /tmp/quick-test.log 2>&1; then
    echo -e "${GREEN}   ✅ Auth system: Operational${NC}"
else
    echo -e "${RED}   ❌ Auth system: Issues detected${NC}"
    cat /tmp/quick-test.log
fi

# Step 4: Run Critical Tests (if requested)
if [ "$RUN_FULL" = true ]; then
    echo ""
    echo "4️⃣  Running full critical tests..."
    if ./scripts/run-critical-tests.sh --full; then
        echo -e "${GREEN}   ✅ All tests: Passed${NC}"
    else
        echo -e "${RED}   ❌ Tests: Failed${NC}"
        exit 1
    fi
else
    echo ""
    echo "4️⃣  Skipping full tests (use --full to run)"
fi

# Summary
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Verification complete!${NC}"
echo ""
echo "Next steps:"
echo "• Review any warnings above"
echo "• Run './scripts/post-task-verify.sh --full' for comprehensive tests"
echo "• Commit your changes when ready"
echo ""

# Clean up temp files
rm -f /tmp/typecheck.log /tmp/lint.log /tmp/quick-test.log 2>/dev/null || true