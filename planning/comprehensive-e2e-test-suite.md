### 📝 Feature Overview

- **Problem Statement:** Previous database deletion incident caused significant data loss and disrupted development workflow. Critical features like authentication and payment integration need continuous verification to prevent regression and ensure system integrity.

- **Solution Vision:** Implement a comprehensive E2E test suite that automatically validates critical application functionality after every task completion. The test suite will focus on authentication flows, payment integration, user management, and database integrity, providing immediate feedback when features break.

- **Success Metrics:**
  - Zero critical feature regressions reaching production
  - 100% test coverage of authentication flows
  - 100% test coverage of payment workflows
  - <5 minute test execution time for critical path tests
  - Automatic test execution after development tasks

### 👥 User Stories

1. As a developer, I want automated tests to verify authentication flows work correctly so that I know user login/signup hasn't been broken by recent changes
2. As a developer, I want payment integration tests to validate Polar webhooks and subscription states so that billing functionality remains intact
3. As a system administrator, I want database integrity checks so that I can ensure no data loss occurs during development
4. As a developer, I want quick feedback on test failures so that I can fix issues immediately before they compound
5. As a team lead, I want test results documented after each task so that we maintain quality standards

### ✅ Acceptance Criteria

- **UI / UX:**
  - Test output clearly indicates pass/fail status
  - Failed tests provide actionable error messages
  - Visual regression tests capture UI changes
  - Console errors and warnings are captured

- **Performance:**
  - Critical path tests complete within 5 minutes
  - Tests can run in parallel where possible
  - Tests use authenticated session state to avoid redundant logins
  - Database seeding is optimized for speed

- **Accessibility:**
  - Tests verify accessibility attributes (aria-labels, roles)
  - Keyboard navigation is tested for critical flows
  - Screen reader compatibility is validated

- **Security & Privacy:**
  - Test credentials stored securely in environment variables
  - No production data used in tests
  - Authentication tokens properly handled
  - Payment sandbox environment strictly enforced

### 🔧 Technical Requirements

- **Architectural Approach:**
  - Page Object Model pattern for maintainability
  - Fixture-based test data management
  - Playwright for browser automation
  - Integration with existing Nuxt test utils

- **Data-Model / Schema Changes:**
  - No schema changes required
  - Test user roles: test-user@test.com, test-admin@test.com
  - Dedicated test organization in Polar sandbox

- **API Endpoints (if any):**
  - Utilize existing API endpoints for testing
  - Mock external services where necessary

- **Third-Party Integrations:**
  - Polar sandbox for payment testing
  - Email provider sandbox/mock for email verification
  - OAuth mock providers for social login

- **Key Security Considerations:**
  - Separate test environment credentials
  - No hardcoded secrets in test files
  - Git-ignored authentication state files
  - Sandbox-only payment testing

- **Middleware Requirements:**
  - Test authentication middleware behavior
  - Verify role-based access control
  - Test redirect logic for protected routes

- **Navigation/Redirect Logic:**
  - Unauthenticated user → login page redirect
  - Post-login → dashboard redirect
  - Payment required → pricing page redirect
  - Admin routes → admin verification

- **Icon/Asset Dependencies:**
  - Verify all UI icons load correctly
  - Test image optimization features
  - Validate asset paths in production build

- **UI Component Library:** Nuxt UI - [Documentation](https://ui.nuxt.com/getting-started)

### 🧪 Testing Strategy

- **Unit Tests:**
  - Component isolation tests for critical UI components
  - Utility function tests for auth helpers
  - API response parsing tests

- **Integration / E2E Tests:**
  - Complete authentication flow (signup → verify → login)
  - Payment subscription lifecycle (select plan → checkout → webhook)
  - Admin user management (list → ban → unban)
  - Password reset flow
  - OAuth login flows

- **Manual QA Checklist:**
  - Visual inspection of UI after test runs
  - Performance profiling of slow tests
  - Cross-browser compatibility check
  - Mobile responsiveness validation

- **Performance / Load Tests:**
  - Concurrent user login stress test
  - Database query optimization validation
  - API endpoint response time checks

- **Development Server Testing:**
  - Port 9009 availability check
  - Environment variable validation
  - Database connection verification
  - **Test Credentials:**
    - Regular user: test-user@test.com / TestUser123!
    - Admin user: test-admin@test.com / TestAdmin123!
    - Demo users from seed script

- **Browser Testing with Playwright:**
  - **Use Playwright MCP server** for automated browser testing
  - Critical user flows:
    - User registration with email verification
    - Password and OAuth login
    - Subscription purchase and management
    - Admin dashboard operations
  - **Test Credentials:** As specified above

- **Test Script Location:** All test scripts MUST be placed in the `/scripts` directory, never in the project root

- **Screenshot Documentation:** Use Snap-Happy MCP server to capture visual states during testing

### 📋 Implementation Plan

| Phase | Description | Estimated Effort | Dependencies / Risks |
| ----- | ----------- | ---------------- | -------------------- |
| 0     | Verify dev environment & test existing functionality | S | Dev server port conflicts |
| 1     | Set up Playwright configuration and test structure | S | Nuxt test utils compatibility |
| 2     | Implement authentication flow tests | M | OAuth provider mocking |
| 3     | Implement payment integration tests | M | Polar sandbox setup |
| 4     | Implement admin functionality tests | S | Role-based access |
| 5     | Create test runner script for post-task execution | S | CI/CD integration |
| 6     | Document test usage and maintenance | S | Team adoption |
| Final | Run linting & fix all issues | S | Code style compliance |

### ❓ Open Questions

- ~Should we implement visual regression testing with Percy or similar?~ No
- ~Do we need API contract testing with Pact?~ No
- Should test execution be mandatory in pre-commit hooks? (TBD - start without, add if needed)
- How do we handle flaky tests in CI/CD pipeline? (Will implement retry logic and investigate root causes)
- Should we implement performance budgets for page load times? (Monitor first, implement if issues arise)

### 🚀 Definition of Done

- [ ] Code merged & all tests green
- [ ] All linting issues resolved (`pnpm lint` passes)
- [ ] Manual testing completed with real user scenarios
- [ ] Navigation flows verified with browser developer tools
- [ ] Docs / changelog updated
- [ ] Feature flagged & rollout plan approved
- [ ] Success metrics instrumented
- [ ] No console errors or warnings in development mode
- [ ] Test execution integrated into development workflow
- [ ] Team trained on test maintenance

### ⚠️ Common Pitfalls to Avoid

- [ ] Not testing with actual user credentials before implementing
- [ ] Assuming middleware names match file names (e.g., 'auth' vs 'auth.global.ts')
- [ ] Using client-side navigation functions incorrectly (navigateTo vs window.location)
- [ ] Not checking for port conflicts when running dev server
- [ ] Forgetting to verify icon availability in the UI library
- [ ] Not considering the order of operations in async authentication flows
- [ ] Using production payment credentials in tests
- [ ] Hardcoding test data instead of using fixtures
- [ ] Not cleaning up test data after test runs
- [ ] Ignoring flaky tests instead of fixing root causes
