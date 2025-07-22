### 📝 Feature Overview

- **Problem Statement:** Need to disable all authentication features (login, register, OAuth) in the UI and API while keeping the codebase intact for future use. The waitlist functionality must remain active.
- **Solution Vision:** Implement a feature flag system using Nuxt runtime configuration to conditionally disable authentication UI elements, routes, and API endpoints. This approach allows for easy re-enabling of authentication features when ready without any code deletion or major refactoring.
- **Success Metrics:**
  - All authentication UI elements hidden
  - Authentication routes return 404 or redirect
  - Authentication API endpoints blocked
  - Waitlist form remains functional
  - Feature can be toggled with single environment variable
  - No broken UI elements or console errors

### 👥 User Stories

1. As a site visitor, I want to browse the site without seeing login/register options so that I focus on the product information
2. As a potential customer, I want to sign up for the waitlist so that I can be notified when the product launches
3. As a developer, I want to easily toggle authentication features on/off so that I can control feature availability without code changes
4. As a security-conscious developer, I want authentication endpoints to be inaccessible so that potential vulnerabilities are not exposed

### ✅ Acceptance Criteria

- **UI / UX:**
  - No login/register buttons visible in navigation header (desktop and mobile)
  - Authentication routes (/auth/*) redirect to home or show 404
  - Dashboard routes (/dashboard/*) redirect to home
  - Admin routes (/admin/*) redirect to home
  - Pricing page (/pricing) redirects to home or shows coming soon
  - Waitlist form remains functional
  - No broken links or UI elements

- **Performance:**
  - No unnecessary authentication-related JavaScript loaded
  - No performance degradation from feature flag checks

- **Accessibility:**
  - Navigation remains fully accessible without authentication links
  - All content readable without login requirements

- **Security & Privacy:**
  - Authentication API endpoints return 404
  - No authentication cookies or sessions created
  - OAuth endpoints disabled
  - CSRF protection remains active for waitlist
  - No logging of auth endpoint access attempts

### 🔧 Technical Requirements

- **Architectural Approach:**
  - Use Nuxt runtime configuration for feature flags
  - Environment variable `NUXT_PUBLIC_AUTH_ENABLED` controls authentication
  - Conditional rendering in components based on feature flag
  - Route middleware to block authentication pages
  - Server-side API route protection

- **Data-Model / Schema Changes:**
  - None - all authentication tables remain intact

- **API Endpoints (if any):**
  - Disable: `/api/auth/login-with-password`, `/api/auth/register`, `/api/auth/google`, `/api/auth/github`, `/api/auth/logout`, `/api/auth/otp/*`
  - Keep active: `/api/waitlist/subscribe`

- **Third-Party Integrations:**
  - OAuth providers (Google, GitHub) - callbacks will be blocked

- **Key Security Considerations:**
  - Block all authentication API endpoints at server level
  - Ensure middleware runs before any auth logic
  - Maintain CSRF protection for remaining endpoints
  - Return 404 for disabled endpoints (industry standard)

- **Middleware Requirements:** 
  - Create `auth-disabled.global.ts` middleware to handle auth route redirects
  - Modify existing middleware to respect feature flag

- **Navigation/Redirect Logic:**
  - `/auth/*` routes → redirect to `/`
  - `/dashboard/*` routes → redirect to `/`
  - `/admin/*` routes → redirect to `/`
  - `/pricing` route → redirect to `/`

- **Icon/Asset Dependencies:** None - using existing icons

- **UI Component Library:** Nuxt UI - [Documentation](https://ui.nuxt.com/getting-started)

### 🧪 Testing Strategy

- **Unit Tests:**
  - Test feature flag composable returns correct values
  - Verify conditional rendering logic

- **Integration / E2E Tests:**
  - Test authentication routes redirect properly
  - Verify waitlist form submission works
  - Ensure no authentication UI elements visible
  - Test API endpoints return appropriate errors
  - Verify pricing page redirects

- **Manual QA Checklist:**
  - [ ] Visit homepage - no login/register buttons
  - [ ] Check mobile menu - no auth options
  - [ ] Try accessing /auth/login - redirects to home
  - [ ] Try accessing /dashboard - redirects to home
  - [ ] Try accessing /pricing - redirects to home
  - [ ] Try API endpoints - return 404
  - [ ] Submit waitlist form - works correctly
  - [ ] Check console - no auth-related errors

- **Performance / Load Tests:**
  - Verify no performance impact from feature flags

- **Development Server Testing:**
  - Test with `NUXT_PUBLIC_AUTH_ENABLED=false`
  - Test toggling to `NUXT_PUBLIC_AUTH_ENABLED=true`
  - **Test Credentials:** test@test.com / 12345678

- **Browser Testing with Playwright:**
  - Create test script in `/scripts/test-auth-disabled.mjs`
  - Verify all auth routes redirect
  - Confirm no auth UI elements visible

- **Test Script Location:** All test scripts MUST be placed in the `/scripts` directory, never in the project root

- **Screenshot Documentation:** Use Snap-Happy MCP server to capture before/after states

### 📋 Implementation Plan

| Phase | Description | Estimated Effort | Dependencies / Risks |
| ----- | ----------- | ---------------- | -------------------- |
| 0     | Verify dev environment & test existing functionality | S | Dev server port conflicts |
| 1     | Add feature flag to runtime config | S | None |
| 2     | Create useAuthFeature composable | S | None |
| 3     | Modify AppHeader component to hide auth buttons | S | Conditional rendering |
| 4     | Create auth-disabled middleware for routes | M | Route precedence |
| 5     | Block authentication API endpoints | M | Server-side logic |
| 6     | Disable pricing page | S | Route redirect |
| 7     | Test all auth paths are blocked | S | Comprehensive testing |
| 8     | Update any other components with auth UI | S | Find all references |
| Final | Run linting & fix all issues | S | Code style compliance |

### ❓ Open Questions

None - all questions have been answered

### 🚀 Definition of Done

- [ ] Code merged & all tests green
- [ ] All linting issues resolved (`pnpm lint` passes)
- [ ] Manual testing completed with real user scenarios
- [ ] Navigation flows verified with browser developer tools
- [ ] Docs / changelog updated
- [ ] Feature flagged & rollout plan approved
- [ ] Success metrics instrumented
- [ ] No console errors or warnings in development mode
- [ ] Authentication completely hidden from UI
- [ ] Auth routes redirect to home
- [ ] Auth API endpoints return 404
- [ ] Pricing page redirects to home
- [ ] Waitlist remains functional
- [ ] Can toggle auth back on with environment variable

### ⚠️ Common Pitfalls to Avoid

- [ ] Not testing with actual user credentials before implementing
- [ ] Assuming middleware names match file names (e.g., 'auth' vs 'auth.global.ts')
- [ ] Using client-side navigation functions incorrectly (navigateTo vs window.location)
- [ ] Not checking for port conflicts when running dev server
- [ ] Forgetting to verify icon availability in the UI library
- [ ] Not considering the order of operations in async authentication flows
- [ ] Missing components that show auth UI (footers, CTAs, etc.)
- [ ] Not handling edge cases like direct API calls
- [ ] Forgetting to test both authenticated and unauthenticated states
- [ ] Not checking for auth references in pricing page