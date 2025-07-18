# 🚨 CRITICAL TEST REQUIREMENTS - QUICK REFERENCE

## Must Run After EVERY Task
```bash
./scripts/post-task-verify.sh
```

## If Tests Fail
1. **STOP** - Do not mark task complete
2. **FIX** - Repair the breaking changes
3. **RETEST** - Run tests again
4. **REPEAT** - Until all tests pass

## Critical Features That MUST Work
- ✅ **Auth**: demo-user@nuxtstarterkit.com can login
- ✅ **Payments**: /pricing shows Polar plans
- ✅ **Admin**: demo-admin@nuxtstarterkit.com has access
- ✅ **Security**: /dashboard redirects when logged out
- ✅ **Database**: Demo users exist

## Test Commands
```bash
# Quick check during dev (2 seconds)
./scripts/quick-test.sh

# Required after task completion
./scripts/post-task-verify.sh

# Full test suite (recommended)
./scripts/post-task-verify.sh --full

# Run specific test suites
pnpm playwright test app/e2e/tests/system-health.e2e.ts
pnpm playwright test app/e2e/tests/payment-integration.e2e.ts
pnpm playwright test app/e2e/tests/admin-functionality.e2e.ts
```

## Why This Matters
**A previous Claude session deleted the database**, causing data loss. These tests prevent that from happening again.

## The Golden Rule
**No task is complete until all tests pass.**
