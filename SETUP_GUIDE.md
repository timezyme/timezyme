# Nuxt Starter Kit - Complete Setup Guide

This guide will help you set up the Nuxt Starter Kit for local development.

## Prerequisites

- Node.js v22+
- pnpm package manager
- Git

## Initial Setup

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/NuxtStarterKit/nuxtstarterkit.git
   cd nuxtstarterkit
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env`
   - Fill in the required environment variables (see below)

4. **Generate database migrations**:
   ```bash
   pnpm db:generate
   ```

## Environment Variables

The most critical environment variables for local development:

```env
# Required
NUXT_SESSION_PASSWORD=your-32-character-or-longer-password-here
NUXT_PUBLIC_BASE_URL=http://localhost:9009

# Email (choose one provider)
NUXT_PRIVATE_FROM_EMAIL=noreply@yourdomain.com
NUXT_PRIVATE_EMAIL_CONTACT=contact@yourdomain.com
NUXT_PRIVATE_EMAIL_SEND_IN_DEV_MODE=false
NUXT_PRIVATE_EMAIL_PROVIDER=resend
NUXT_PRIVATE_EMAIL_RESEND_API_TOKEN=your-resend-api-token

# Payment (Polar)
NUXT_PRIVATE_POLAR_ACCESS_TOKEN=your-polar-token
NUXT_PRIVATE_POLAR_WEBHOOK_SECRET=your-webhook-secret
NUXT_PRIVATE_POLAR_SERVER=sandbox

# Optional OAuth (for production)
NUXT_OAUTH_GITHUB_CLIENT_ID=your-github-client-id
NUXT_OAUTH_GITHUB_CLIENT_SECRET=your-github-client-secret
NUXT_OAUTH_GOOGLE_CLIENT_ID=your-google-client-id
NUXT_OAUTH_GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Database Setup

NuxtHub uses a local SQLite database for development. The database is automatically created when you start the dev server.

### Creating Initial Users

Since there's no built-in seeding mechanism, I've created utility scripts to help:

1. **Seed demo users** (run this after starting the dev server at least once):
   ```bash
   node scripts/seed-demo-admin-simple.mjs
   ```

   This creates two users:
   - **Demo Admin**: `demo-admin@nuxtstarterkit.com` / `demoAdminNuxtStarterKit0815#` (ADMIN role)
   - **Test User**: `test@test.com` / `12345678` (USER role)

2. **Check existing users**:
   ```bash
   node scripts/check-users.mjs
   ```

3. **Update user roles** (interactive):
   ```bash
   node scripts/update-user-role.mjs
   ```

## Running the Development Server

1. **Start the local development server**:
   ```bash
   pnpm dev
   ```
   The app will be available at `http://localhost:9009`

2. **For remote development** (connects to deployed NuxtHub resources):
   ```bash
   pnpm dev:remote
   ```

## Logging In

1. Navigate to `http://localhost:9009/auth/login`
2. You have three options:
   - Click the "Login" button in the yellow demo admin banner
   - Use the demo admin credentials manually
   - Use the test user credentials

## Common Issues & Solutions

### Issue: "User not found" when logging in
**Solution**: Run the seed script to create the demo users:
```bash
node scripts/seed-demo-admin-simple.mjs
```

### Issue: Missing environment variables
**Solution**: The app will show which variables are missing when you start the dev server. Check `.env.example` for all available options.

### Issue: Database not found
**Solution**: Start the dev server at least once to create the database structure:
```bash
pnpm dev
```

### Issue: Need to make a user an admin
**Solution**: Use the role update script:
```bash
node scripts/update-user-role.mjs
```

## Admin Features

Once logged in as an admin, you can:
- Manage users at `/dashboard/admin/users`
- Manage waitlist at `/dashboard/admin/waitlist`
- Configure banners at `/dashboard/admin/banner`
- Preview email templates at `/dashboard/admin/email-templates`
- Manage testimonials at `/dashboard/admin/testimonials`

## Next Steps

1. Configure your payment provider (Polar) in the `.env` file
2. Set up OAuth providers for production
3. Customize the app according to your needs
4. Deploy to NuxtHub when ready: `pnpm deploy`

## Additional Scripts

- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test:e2e` - Run Playwright E2E tests
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
