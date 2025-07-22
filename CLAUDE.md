# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚨 CRITICAL: Test Requirements for All Tasks

**MANDATORY**: This codebase has working authentication, payment integration (Polar), and admin functionality that MUST NOT be broken.

### Before Starting Any Task
1. Understand that existing features are working and tested
2. Review the test suite in `/app/e2e/tests/` to understand critical functionality
3. Run `./scripts/quick-test.sh` to verify the system is healthy

### After Completing Any Task
**You MUST run the following verification**:
```bash
./scripts/post-task-verify.sh
```

If ANY tests fail, you MUST fix the issues before considering the task complete.

### Critical Features That Must Not Break
1. **Authentication**: Login with demo-user@nuxtstarterkit.com must work
2. **Payment System**: Polar integration on /pricing and /dashboard/billing
3. **Admin Access**: Admin user (demo-admin@nuxtstarterkit.com) functionality
4. **Protected Routes**: /dashboard must redirect to login when unauthenticated
5. **Database Integrity**: Demo users must remain in the database

**Note**: A previous Claude session accidentally deleted the database, causing significant data loss. The test suite was created specifically to prevent this from happening again.

## Project Overview

This is a **Nuxt 4** app for building the TimeZyme SaaS application. TimeZyme docs can be found here: /doc/TimeZyme-*. The app uses a layered architecture with modular features that can be enabled/disabled as needed.

### Important: This project uses Nuxt 4
- This project is built with **Nuxt 4**, not Nuxt 3
- TypeScript support has been enhanced with proper type definitions
- When searching for documentation or solutions, ensure you're looking at Nuxt 4 specific resources

## Essential Commands

### Development
```bash
pnpm dev              # Start development server on port 9009
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm typecheck        # Run TypeScript type checking
pnpm lint             # Run ESLint
pnpm lint:fix         # Run ESLint with auto-fix
```

### Testing (MANDATORY after any changes)
```bash
# REQUIRED: Run after completing ANY task
./scripts/post-task-verify.sh        # Quick verification (TypeScript, lint, auth)
./scripts/post-task-verify.sh --full # Full test suite (includes all E2E tests)

# Quick checks during development
./scripts/quick-test.sh              # Ultra-fast auth check (<2s)

# Full test suites
pnpm test:e2e                        # Run all Playwright E2E tests
pnpm test:e2e:ui                     # Run Playwright tests with UI

# Specific critical test suites (13 tests total)
pnpm playwright test app/e2e/tests/system-health.e2e.ts        # Auth & navigation (2 tests)
pnpm playwright test app/e2e/tests/payment-integration.e2e.ts  # Polar payments (6 tests)
pnpm playwright test app/e2e/tests/admin-functionality.e2e.ts  # Admin features (5 tests)
```

**⚠️ IMPORTANT**: If any tests fail after your changes, you MUST fix them before the task is complete.

### Database
```bash
pnpm db:generate      # Generate Drizzle database migrations
```

### Deployment
```bash
pnpm deploy           # Deploy to NuxtHub (Cloudflare)
```

## Architecture

### Layered Structure
The application uses Nuxt layers for modular functionality. Each layer is in `app/layers/`:

- **core**: Common components, utilities, and logging
- **db**: Database schema (Drizzle ORM) and utilities
- **auth**: Authentication system with OAuth and password auth
- **email**: Email templates and provider integration (Resend/Plunk)
- **dashboard**: Admin and user dashboard functionality
- **payment**: Subscription management with Polar
- **docs**: Documentation system using Nuxt Content
- **blog**: Blog functionality with Nuxt Content
- **waitlist**: Early access signup system

### Key Technologies
- **Framework**: Nuxt 4 (NOT Nuxt 3) with Vue 3
- **Frontend**: Nuxt UI Pro, TailwindCSS 4 (NOT UnoCSS)
- **Backend**: Nitro server, H3 utilities
- **Database**: SQLite with Drizzle ORM (via NuxtHub)
- **Authentication**: nuxt-auth-utils with session management
- **Deployment**: NuxtHub (Cloudflare Workers)

### Important Files & Directories
- `nuxt.config.ts`: Main configuration extending all layers
- `validate-env.ts`: Environment variable validation with Zod
- `app/server/`: Server-side API routes and utilities
- `app/composables/`: Shared Vue composables
- `app/e2e/`: Playwright E2E tests
- `.github/workflows/nuxthub.yml`: CI/CD pipeline

## Development Guidelines

### Environment Setup
Required environment variables are validated in `validate-env.ts`. Key variables:
- OAuth credentials: `NUXT_OAUTH_GITHUB_*`, `NUXT_OAUTH_GOOGLE_*`
- Email provider: `NUXT_PRIVATE_EMAIL_*` (Resend)
- Payment: `NUXT_PRIVATE_POLAR_*`
- Security: `NUXT_SESSION_PASSWORD` (32+ characters)
- General: `NUXT_PUBLIC_BASE_URL`

### Polar Payment Configuration
**Important**: Polar has separate sandbox and production environments.

#### Local Development (.env file)
Always use Polar **sandbox** credentials for local development:
```bash
NUXT_PRIVATE_POLAR_ACCESS_TOKEN=<sandbox_token>
NUXT_PRIVATE_POLAR_WEBHOOK_SECRET=<sandbox_webhook_secret>
NUXT_PRIVATE_POLAR_ORGANIZATION_ID=<sandbox_org_id>
NUXT_PRIVATE_POLAR_SERVER=sandbox
```

#### Production (NuxtHub Dashboard)
Set Polar **production** credentials in NuxtHub environment variables:
- Go to [NuxtHub dashboard](https://admin.hub.nuxt.com)
- Navigate to Settings → Environment Variables
- Set production values with `NUXT_PRIVATE_POLAR_SERVER=production`

**Available Pricing Plans**:
- `free` - Free tier (one-time, $0)
- `proMonthly` - Pro Monthly subscription ($20/month)
- `proYearly` - Pro Yearly subscription ($200/year)

**Note**: Lifetime deals have been removed from the codebase.

### Database Operations
- Schema definitions in `app/layers/db/server/database/schema/`
- Use server utilities in `app/layers/db/server/utils/` for database operations
- Migrations are generated with `pnpm db:generate`

### Authentication Flow
- OAuth providers configured in `app/layers/auth/server/api/auth/`
- Session management via `nuxt-auth-utils`
- User authentication state available via `useUser()` composable

### API Routes
- Server routes in `app/server/api/` and layer-specific `server/api/` directories
- Use H3 utilities for request/response handling
- Authentication required routes use `requireUser()` or `requireAdmin()`

### Testing Strategy
- E2E tests with Playwright in `app/e2e/`
- Tests run against development server
- Screenshots/videos captured on failure
- Run specific test: `pnpm test:e2e <test-file>`

### Code Quality
- ESLint runs on pre-commit via Husky
- TypeScript strict mode enabled
- Import sorting enforced by perfectionist plugin
- Use single quotes for strings
- 2-space indentation
- **ESLint Configuration**: Uses `eslint.config.mjs` (flat config format)
  - The `.eslintignore` file is deprecated - use the `ignores` property in the config
  - To ignore directories, add them to the `ignores` array:
    ```javascript
    {
      ignores: ['.github/*', 'planning/**/*'],
    }
    ```

### Deployment
- Automatic deployment via GitHub Actions on push
- E2E tests run in CI before deployment
- Deployed to NuxtHub (Cloudflare infrastructure)
- Database, KV store, and blob storage managed by NuxtHub

## Security Notes
- **Password Hashing**: This project uses Scrypt for password hashing (NOT bcrypt)
- Always use Scrypt-based utilities when working with password hashing/verification

## TypeScript Configuration

### Module Augmentation for nuxt-auth-utils
When extending the `User` interface from nuxt-auth-utils, you MUST place the type declaration file (`auth.d.ts`) in the **project root directory**, not in a subdirectory like `types/`.

**Correct location**: `/auth.d.ts`

Example `auth.d.ts`:
```typescript
declare module '#auth-utils' {
  interface User {
    avatarUrl?: null | string
    banned: boolean
    bannedReason?: null | string
    createdAt?: Date
    email: string
    emailVerified: boolean
    hashedPassword?: null | string
    id: string
    lastActive?: Date
    name: string
    onboarded: boolean
    role: string
    updatedAt?: Date
  }

  interface UserSession {
    impersonatedBy?: string
  }
}
export {}
```

### TypeScript Configuration in nuxt.config.ts
The project includes TypeScript configuration to support strict type checking:
```typescript
typescript: {
  strict: true,
  tsConfig: {
    include: ['./types/**/*'],
  },
},
```

### Common TypeScript Issues and Solutions

1. **"Property 'id' does not exist on type 'User'"**
   - Solution: Ensure `auth.d.ts` is in the project root, not in `types/` directory
   - Run `pnpm nuxi prepare` to regenerate types after adding/moving the file

2. **UI Component Color Props**
   - Nuxt UI components only accept specific color values
   - Valid colors: `"error" | "info" | "primary" | "secondary" | "success" | "warning" | "neutral"`
   - Do NOT use custom colors like "cyan"

3. **Window Object Access in Vue Components**
   - Create a proper function instead of inline access:
   ```typescript
   function scrollToTop() {
     if (typeof window !== 'undefined') {
       window.scrollTo({ behavior: 'smooth', top: 0 })
     }
   }
   ```

4. **Array Type Definitions**
   - Use generic syntax: `Array<FooterLink>` instead of `FooterLink[]`
   - This follows the project's ESLint rules

### Running Type Checks
Always run TypeScript checks after making changes:
```bash
pnpm typecheck
```

## Allowed Development Commands
The following commands are approved for use in this project:
- `pnpm` - Package manager (all pnpm commands are allowed)
- `curl` - For testing API endpoints
- `ps aux` - For checking running processes
- `grep` - For searching files and content
- `tail` - For viewing log files
- `chmod` - For setting file permissions

## ⚠️ CRITICAL DATABASE SAFETY WARNING ⚠️
**NEVER** use the following destructive commands:
- `rm -rf .data` or any variation that could delete the database
- Direct deletion of `.data/hub/*.db` files
- Any command that could wipe user data or database contents

**ALWAYS** use the provided database scripts instead:
- `./scripts/db-backup.sh` - Create a backup BEFORE any risky operations
- `./scripts/db-reset.sh` - Safe database reset with confirmation prompt
- `./scripts/db-restore.sh` - Restore from backup if something goes wrong

**Note**: The `rm` command has been explicitly removed from Claude's permissions to prevent accidental data loss.

## Available MCP Servers

Claude has access to the following MCP (Model Context Protocol) servers to enhance development capabilities:

### 1. **Context7** - Documentation & Code Examples
- Fetch up-to-date documentation for any library/framework
- Access thousands of code snippets and examples
- Usage: Automatically used when you need library documentation

### 2. **Supabase** - Database & Backend Services
- Manage Supabase projects, databases, and edge functions
- Execute SQL queries and migrations
- Usage: For database operations and Supabase-specific tasks

### 3. **Playwright** - Browser Automation & Testing
- Automate browser interactions and testing
- Take screenshots, navigate pages, fill forms
- Usage: For E2E testing and web scraping tasks

### 4. **Cloudflare** - Edge Computing & CDN
- Search Cloudflare documentation
- Help with Workers, Pages, R2, and other Cloudflare services
- Usage: For deployment and edge computing questions

### 5. **Sequential Thinking** - Complex Problem Solving
- Break down complex problems into steps
- Provides structured thinking for difficult tasks
- Usage: Automatically used for complex problem-solving

### 6. **Snap-Happy** - Screenshot Management
- Take and manage screenshots
- List windows and capture specific applications
- Usage: For visual documentation and debugging

### 7. **Mastra** - AI Framework Documentation
- Access Mastra.ai documentation and examples
- Learn about AI agents, workflows, and tools
- Usage: For AI/ML integration questions

### 8. **Polar** - Payment & Subscription Management
- Manage products, subscriptions, and customers
- Handle payment-related operations
- Usage: For payment system integration

## Quick Commands Reference

### Development Scripts
```bash
# Environment & Setup
./scripts/setup-local.sh      # Check environment setup
./scripts/dev-start.sh        # Start dev server with PID tracking
./scripts/dev-stop.sh         # Stop dev server cleanly

# Database Management
./scripts/db-reset.sh         # Reset database (deletes all data)
./scripts/db-seed.sh          # Seed with demo users
./scripts/db-backup.sh        # Create timestamped backup
./scripts/db-restore.sh       # Restore from backup
```

### Common Tasks
```bash
# Quick start
./scripts/setup-local.sh && ./scripts/dev-start.sh

# Reset and seed database
./scripts/db-reset.sh && ./scripts/db-seed.sh

# Check what's running
ps aux | grep -E "(node|nuxt|pnpm)" | grep -v grep
lsof -i :9009  # Check if port is in use

# View logs
tail -f dev.log  # If using dev-start.sh

# Demo credentials (after seeding)
# Admin: demo-admin@nuxtstarterkit.com / demoAdminNuxtStarterKit0815#
# User:  demo-user@nuxtstarterkit.com / demoUserNuxtStarterKit
```

## Troubleshooting

### Polar API Authentication Errors
If you see "401 invalid_token" errors:
1. Verify you're using the correct environment (sandbox vs production)
2. Check that the @polar-sh/nuxt module is configured in the payment layer's nuxt.config.ts
3. Ensure your Polar products exist in the environment you're using
4. For local development, always use sandbox credentials

### Port Conflicts
If the dev server tries to use port 3000 instead of 9009:
- Kill existing processes: `pkill -f "nuxt dev"`
- Use the helper script: `./scripts/dev-start.sh`

### Database Write Errors
If you see "attempt to write a readonly database":
- **WARNING**: Only clear cache files, NEVER the main database
- Clear ONLY the cache: `rm -rf .data/hub/cache.db*` (cache.db ONLY!)
- Restart the dev server

## Development Cleanup Guidelines
When testing features or running development tasks, always clean up afterwards:

### Process Cleanup
- Kill any background dev servers: `./scripts/dev-stop.sh` or `pkill -f "pnpm dev"`
- Check for orphaned processes: `ps aux | grep -E "(node|nuxt|pnpm)" | grep -v grep`
- Kill any Playwright/browser processes: `ps aux | grep -E "(chromium|playwright)" | grep -v grep`

### File Cleanup
- Remove test scripts from `/scripts` directory (keep only essential scripts)
- Delete any screenshots, log files, or temporary files created during testing
- Remove any `cookies.txt` or authentication state files
- Check project root for misplaced test files

### Best Practices
- Always use `/scripts` directory for test scripts, never the project root
- Clean up immediately after testing to avoid resource leaks
- Verify no processes are consuming resources after development sessions
- Use the provided helper scripts for consistent process management
- **IMPORTANT**: Run `./scripts/post-task-verify.sh` after completing any development task to ensure critical features remain intact

## 🛡️ Comprehensive E2E Test Suite

A comprehensive test suite protects critical features from regression. **These tests MUST pass after any changes.**

### Test Coverage (13 Critical Tests)
1. **Authentication System** (2 tests)
   - Login functionality with demo users
   - Protected route security

2. **Payment Integration** (6 tests)
   - Polar pricing page
   - Billing dashboard access
   - Payment system configuration

3. **Admin Functionality** (5 tests)
   - Admin user authentication
   - Role-based access control
   - Admin dashboard features

### Running Tests Is MANDATORY

**After ANY code changes, you MUST run**:
```bash
./scripts/post-task-verify.sh        # Quick check (required minimum)
./scripts/post-task-verify.sh --full # Full verification (recommended)
```

**If tests fail**:
1. DO NOT consider the task complete
2. Fix the breaking changes immediately
3. Re-run tests until all pass
4. Only then is the task done

### Test Execution Times
- Quick test: < 2 seconds
- Post-task verify: < 30 seconds
- Full test suite: < 10 seconds

### Why This Matters
This test suite was created after a database deletion incident caused significant data loss. The tests ensure that critical features (authentication, payments, admin access) that "we've worked hard to complete" remain functional after any changes.

**Remember**: Breaking existing functionality is NOT acceptable. All tests must pass.

See `/docs/testing-guide.md` for detailed testing documentation.

## 📋 Task Completion Checklist

Before marking ANY task as complete, ensure:
- [ ] All existing features still work (auth, payments, admin)
- [ ] `./scripts/post-task-verify.sh` runs without errors
- [ ] No TypeScript errors introduced
- [ ] No ESLint errors that break functionality
- [ ] Demo users can still log in
- [ ] Protected routes still redirect when unauthenticated
- [ ] Pricing page still displays Polar plans
- [ ] Admin user still has appropriate access

**FINAL REMINDER**: The test suite exists because a previous Claude session deleted the database. Do not let this happen again. Run the tests.
