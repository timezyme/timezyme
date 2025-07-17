### 📝 Feature Overview

- **Problem Statement:** The app cannot load products from Polar due to an invalid API token and incorrect price type checking logic in the payment utility
- **Solution Vision:** Fix the Polar integration by ensuring proper API credentials are configured and correcting the product/price mapping logic to properly handle one-time purchases, monthly subscriptions, and yearly subscriptions according to Polar's actual API structure
- **Success Metrics:**
  - Products successfully load from Polar API
  - All product types (one-time, monthly, yearly) display correctly
  - Pricing information shows accurate amounts and currencies
  - No API authentication errors

### 👥 User Stories

1. As a visitor, I want to see all available products and pricing plans so that I can choose the best option for my needs
2. As a developer, I want the Polar integration to correctly map product types so that all pricing options are displayed accurately
3. As an admin, I want to ensure the API credentials are valid so that products can be fetched reliably

### ✅ Acceptance Criteria

- **UI / UX:**
  - All active products from Polar display on the pricing page
  - One-time purchases, monthly, and yearly subscriptions are correctly identified
  - Prices display in the correct currency format (dollars, not cents)
  - Loading states handle API errors gracefully

- **Performance:**
  - Products load within 2 seconds
  - API errors are cached to prevent repeated failed requests

- **Accessibility:**
  - Error messages are clear and actionable
  - Loading states are announced to screen readers

- **Security & Privacy:**
  - API tokens are never exposed in client-side code
  - Error messages don't leak sensitive information

### 🔧 Technical Requirements

- **Architectural Approach:**
  - Fix the price type checking logic in `usePayment.ts`
  - Ensure proper environment variable configuration
  - Add error handling for invalid API tokens

- **Data-Model / Schema Changes:**
  - No schema changes required

- **API Endpoints (if any):**
  - `/api/payment/products` - Already exists, needs proper error handling

- **Third-Party Integrations:**
  - Polar SDK (@polar-sh/sdk) - Already integrated

- **Key Security Considerations:**
  - Validate Polar API credentials on server startup
  - Add proper error messages without exposing token details

- **Middleware Requirements:** None - using existing authentication
- **Navigation/Redirect Logic:** None - pricing page is public
- **Icon/Asset Dependencies:** None - using existing UI components
- **UI Component Library:** Nuxt UI - [Documentation](https://ui.nuxt.com/getting-started)

### 🧪 Testing Strategy

- **Unit Tests:**
  - Test product mapping logic with various price configurations
  - Test error handling for invalid API responses

- **Integration / E2E Tests:**
  - Test pricing page loads without errors
  - Verify all product types display correctly

- **Manual QA Checklist:**
  - ✓ Verify Polar API credentials are set correctly
  - ✓ Check all product types load and display
  - ✓ Confirm prices show in correct currency format
  - ✓ Test error states with invalid credentials

- **Performance / Load Tests:**
  - Verify API response caching works correctly

- **Development Server Testing:**
  - Test with valid Polar credentials
  - Test with invalid credentials to verify error handling

- **Browser Testing with Playwright:**
  - Script to verify pricing page loads products
  - **Test Credentials:** Use actual Polar sandbox credentials

- **Test Script Location:** All test scripts MUST be placed in the `/scripts` directory, never in the project root

### 📋 Implementation Plan

| Phase | Description | Estimated Effort | Dependencies / Risks |
| ----- | ----------- | ---------------- | -------------------- |
| 0     | Verify dev environment & test existing functionality | S | Dev server port conflicts |
| 1     | Fix price type checking logic in usePayment.ts | S | None |
| 2     | Add proper error handling for API authentication | S | None |
| 3     | Test with valid Polar credentials | S | Requires valid API token |
| 4     | Create Playwright test for pricing page | S | None |
| Final | Run linting & fix all issues | S | Code style compliance |

### ❓ Open Questions

- Do you have valid Polar API credentials (access token and organization ID)?
- Should we add a fallback for when products can't be loaded?
- Do you want to cache product data to reduce API calls?

### 🚀 Definition of Done

- [ ] Code merged & all tests green
- [ ] All linting issues resolved (`pnpm lint` passes)
- [ ] Manual testing completed with real user scenarios
- [ ] Navigation flows verified with browser developer tools
- [ ] Docs / changelog updated
- [ ] Feature flagged & rollout plan approved
- [ ] Success metrics instrumented
- [ ] No console errors or warnings in development mode

### ⚠️ Common Pitfalls to Avoid

- [ ] Not testing with actual user credentials before implementing
- [ ] Assuming middleware names match file names (e.g., 'auth' vs 'auth.global.ts')
- [ ] Using client-side navigation functions incorrectly (navigateTo vs window.location)
- [ ] Not checking for port conflicts when running dev server
- [ ] Forgetting to verify icon availability in the UI library
- [ ] Not considering the order of operations in async authentication flows
