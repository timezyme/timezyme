### 📝 Feature Overview

- **Problem Statement:** Need to set up the Nuxt Starter Kit project locally and verify that authentication, particularly admin login functionality, is working correctly before development.
- **Solution Vision:** A streamlined local development setup process that ensures all dependencies are installed, environment is properly configured, development server runs on the correct port, and admin authentication can be tested using Playwright-based verification scripts.
- **Success Metrics:**
  - Development server starts successfully on port 9009
  - Admin login works with demo credentials
  - Playwright tests confirm authentication flow
  - No console errors during authentication
  - Admin dashboard is accessible after login

### 👥 User Stories

1. As a developer, I want to set up the project locally so that I can start developing features
2. As a developer, I want to verify admin authentication works so that I can test admin-specific features
3. As a developer, I want automated tests for login flows so that I can ensure authentication remains functional
4. As a QA engineer, I want Playwright scripts to test authentication so that I can verify login scenarios work correctly

### ✅ Acceptance Criteria

- **UI / UX:**
  - Login page loads without errors
  - Demo admin credentials are visible on login page
  - Login form accepts email and password inputs
  - Successful login redirects to dashboard
  - Admin dashboard shows admin-specific navigation
  - Logout functionality works correctly

- **Performance:**
  - Dev server starts within 30 seconds
  - Login process completes within 2 seconds
  - Page transitions are smooth without flicker
  - No memory leaks during authentication flow

- **Accessibility:**
  - Login form is keyboard navigable
  - Form inputs have proper labels
  - Error messages are announced to screen readers
  - Focus management is correct after login

- **Security & Privacy:**
  - Passwords are not logged in console
  - Session tokens are properly stored
  - Demo mode restrictions work for admin account
  - Environment variables are not exposed

### 🔧 Technical Requirements

- **Architectural Approach:**
  - Use existing Nuxt 3 layered architecture
  - Leverage nuxt-auth-utils for session management
  - SQLite database via NuxtHub for local development
  - Playwright for E2E authentication testing

- **Data-Model / Schema Changes:**
  - None required - use existing user schema with ADMIN role

- **API Endpoints (if any):**
  - `/api/auth/login-with-password` - existing endpoint
  - `/api/auth/user` - session verification
  - `/api/admin/*` - admin-specific endpoints

- **Third-Party Integrations:**
  - Playwright for browser automation testing
  - Better-sqlite3 for database inspection

- **Key Security Considerations:**
  - Ensure NUXT_SESSION_PASSWORD is 32+ characters
  - Never commit .env or auth state files
  - Use demo mode for public admin account

- **Middleware Requirements:**
  - `auth.ts` middleware for protected routes (route-specific)
  - `admin.ts` middleware for admin routes (route-specific)
  - Both have client and server-side implementations

- **Navigation/Redirect Logic:**
  - Unauthenticated users redirect to `/auth/login`
  - Successful login redirects to `/dashboard`
  - Non-admin users cannot access `/dashboard/admin/*`
  - Admin users see additional navigation items

- **Icon/Asset Dependencies:**
  - Lucide icons via @iconify-json/lucide
  - All UI components from Nuxt UI Pro

- **UI Component Library:** Nuxt UI - [Documentation](https://ui.nuxt.com/getting-started)

### 🧪 Testing Strategy

- **Unit Tests:**
  - Password hashing/verification utilities
  - Session management functions
  - Role-based access control logic

- **Integration / E2E Tests:**
  - Full login flow with valid credentials
  - Login failure with invalid credentials
  - Admin dashboard access verification
  - Session persistence across page reloads
  - Logout functionality

- **Manual QA Checklist:**
  - [ ] Can access login page at http://localhost:9009/auth/login
  - [ ] Demo admin alert is visible
  - [ ] Can login with demo admin credentials
  - [ ] Dashboard shows admin menu items
  - [ ] Can access /dashboard/admin routes
  - [ ] Logout works and clears session

- **Performance / Load Tests:**
  - Verify dev server handles multiple concurrent logins
  - Check for memory leaks during repeated auth cycles

- **Development Server Testing:**
  - Run on port 9009 to avoid conflicts
  - Test with actual database queries
  - Verify all middleware executes correctly

- **Browser Testing with Playwright:**
  - Test admin login: `demo-admin@nuxtstarterkit.com` / `demoAdminNuxtStarterKit0815#`
  - Test regular user creation and login
  - Test invalid credential scenarios
  - Verify session persistence

- **Test Script Location:** All test scripts MUST be placed in the `/scripts` directory, never in the project root

### 📋 Implementation Plan

| Phase | Description | Estimated Effort | Dependencies / Risks |
| ----- | ----------- | ---------------- | -------------------- |
| 0     | Verify dev environment & test existing functionality | S | Dev server port conflicts |
| 1     | Install dependencies and verify environment setup | S | pnpm version compatibility |
| 2     | Configure environment variables from .env.example | S | Missing required variables |
| 3     | Start development server and verify it runs | S | Port 9009 availability |
| 4     | Create Playwright test for admin login verification | M | Playwright installation |
| 5     | Test authentication flow and admin access | M | Database state |
| 6     | Document any issues and create helper scripts | S | None |
| Final | Run linting & fix all issues | S | Code style compliance |

### ❓ Open Questions

- Should we create a database seeding script for consistent test data?
- Do we need to test OAuth providers locally or just password auth?
- Should the Playwright tests be added to the existing E2E test suite?

### 🚀 Definition of Done

- [ ] Code merged & all tests green
- [ ] All linting issues resolved (`pnpm lint` passes)
- [ ] Manual testing completed with real user scenarios
- [ ] Navigation flows verified with browser developer tools
- [ ] Docs / changelog updated
- [ ] Feature flagged & rollout plan approved
- [ ] Success metrics instrumented
- [ ] No console errors or warnings in development mode
- [ ] Playwright test script created in `/scripts` directory
- [ ] Admin login verified working with demo credentials

### ⚠️ Common Pitfalls to Avoid

- [ ] Not testing with actual user credentials before implementing
- [ ] Assuming middleware names match file names (e.g., 'auth' vs 'auth.global.ts')
- [ ] Using client-side navigation functions incorrectly (navigateTo vs window.location)
- [ ] Not checking for port conflicts when running dev server
- [ ] Forgetting to verify icon availability in the UI library
- [ ] Not considering the order of operations in async authentication flows
- [ ] Creating test files in project root instead of `/scripts` directory
- [ ] Not setting NUXT_SESSION_PASSWORD to 32+ characters
- [ ] Forgetting to check database initialization before testing
