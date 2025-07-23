# TimeZyme: Illuminating Knowledge, Connecting Insights

TimeZyme transforms dense documents into interactive, layered knowledge maps called **Zymes**. Built with Nuxt 4, this platform enables professionals to understand complex material faster and discover connections across their knowledge ecosystem.

## 🚀 Overview

TimeZyme is a graph-native knowledge platform that revolutionizes how professionals interact with complex documents—legal opinions, research papers, financial reports, and more. By converting static documents into dynamic, interconnected Zymes, users can:

- **Understand Faster**: Grasp key takeaways in minutes, not hours (e.g., 47-min legal opinion → 12-min Zyme)
- **Explore Flexibly**: Navigate through progressive layers (L0 Abstract → L1 Bullets → L2 Summary → L3 Source)
- **Connect Instantly**: Discover relationships between documents, concepts, and entities without breaking flow

## 🏗️ Architecture

Built on a modern tech stack leveraging Nuxt 4's modular layer system:

### Core Technologies
- **Framework**: Nuxt 4 with Vue 3
- **UI**: Nuxt UI Pro with TailwindCSS 4
- **Database**: SQLite with Drizzle ORM (via NuxtHub)
- **Authentication**: OAuth (GitHub, Google) and password auth
- **Payments**: Polar integration for subscriptions
- **Deployment**: NuxtHub (Cloudflare Workers)

### Modular Layers
- **core**: Common components and utilities
- **auth**: Authentication system with session management
- **dashboard**: User and admin dashboards
- **payment**: Subscription and billing management
- **docs**: Documentation system
- **blog**: Content management
- **waitlist**: Early access system

## 🚀 Quick Start

### Prerequisites
- Node.js 22+
- pnpm package manager

### Setup
```bash
# Clone the repository
git clone https://github.com/timezyme/timezyme.git
cd timezyme

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
pnpm dev
```

The app will be available at `http://localhost:9009`

### Demo Accounts
After seeding the database:
- **Admin**: demo-admin@nuxtstarterkit.com / demoAdminNuxtStarterKit0815#
- **User**: demo-user@nuxtstarterkit.com / demoUserNuxtStarterKit

## 🧪 Development

### Essential Commands
```bash
pnpm dev              # Start dev server on port 9009
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm typecheck        # Run TypeScript checks
pnpm lint             # Run ESLint
pnpm test:e2e         # Run Playwright tests
```

### Testing
Always run tests after making changes:
```bash
./scripts/post-task-verify.sh        # Quick verification
./scripts/post-task-verify.sh --full # Full test suite
```

### Database
```bash
pnpm db:generate      # Generate database migrations
./scripts/db-reset.sh # Reset database (with confirmation)
./scripts/db-seed.sh  # Seed with demo data
```

## 🚀 Deployment

Deploy to NuxtHub (Cloudflare):
```bash
pnpm deploy
```

The GitHub Actions workflow automatically deploys on push to main branch.

## 🔐 Environment Variables

Key environment variables (see `validate-env.ts` for full list):
- `NUXT_SESSION_PASSWORD`: 32+ character session secret
- `NUXT_PUBLIC_BASE_URL`: Your app URL
- OAuth: `NUXT_OAUTH_GITHUB_*`, `NUXT_OAUTH_GOOGLE_*`
- Payments: `NUXT_PRIVATE_POLAR_*` (use sandbox for dev)
- Email: `NUXT_PRIVATE_EMAIL_*` (Resend)

## 📚 Documentation

- [TimeZyme Specification](docs/TimeZyme-specification.md)
- [Executive Overview](docs/TimeZyme-executive.md)
- [Technical Blueprint](docs/TimeZyme-blueprint.md)
- [Testing Guide](docs/testing/testing-guide.md)

## 🤝 Contributing

See [CLAUDE.md](CLAUDE.md) for development guidelines and important notes about working with this codebase.

## ⚠️ Important Notes

- This project uses **Nuxt 4**, not Nuxt 3
- Always run tests before considering any task complete
- Never delete the `.data` directory without backing up first
- Use Scrypt for password hashing (not bcrypt)

## 📝 License

© 2024 TimeZyme. All rights reserved.