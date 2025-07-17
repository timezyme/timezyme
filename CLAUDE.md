# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 Starter Kit for building SaaS applications. It uses a layered architecture with modular features that can be enabled/disabled as needed.

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

### Testing
```bash
pnpm test:e2e         # Run Playwright E2E tests
pnpm test:e2e:ui      # Run Playwright tests with UI
```

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
- **testimonials**: Customer testimonials feature
- **waitlist**: Early access signup system

### Key Technologies
- **Frontend**: Vue 3, Nuxt UI Pro, UnoCSS/Tailwind
- **Backend**: Nitro server, H3 utilities
- **Database**: SQLite with Drizzle ORM (via NuxtHub)
- **Authentication**: nuxt-auth-utils with session management
- **Deployment**: NuxtHub (Cloudflare Pages + Workers)

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
- Email provider: `NUXT_PRIVATE_EMAIL_*` (Resend or Plunk)
- Payment: `NUXT_PRIVATE_POLAR_*`
- Security: `NUXT_SESSION_PASSWORD` (32+ characters)
- General: `NUXT_PUBLIC_BASE_URL`

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

### Deployment
- Automatic deployment via GitHub Actions on push
- E2E tests run in CI before deployment
- Deployed to NuxtHub (Cloudflare infrastructure)
- Database, KV store, and blob storage managed by NuxtHub

## Security Notes
- **Password Hashing**: This project uses Scrypt for password hashing (NOT bcrypt)
- Always use Scrypt-based utilities when working with password hashing/verification

## Allowed Development Commands
The following commands are approved for use in this project:
- `pnpm` - Package manager (all pnpm commands are allowed)
- `curl` - For testing API endpoints
- `ps aux` - For checking running processes
- `grep` - For searching files and content
- `tail` - For viewing log files
- `chmod` - For setting file permissions

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
