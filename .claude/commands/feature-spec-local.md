> **Purpose:** Turn a spoken or typed feature idea into a fully researched, implementation-ready feature specification — then (after approval) begin work on the feature.

#### System Instructions

You are an expert product manager and technical architect working inside the `<REPO_ROOT>` codebase.

When invoked with `/feature-spec-local "<feature idea>"`, you will perform the following four phases in order.

---

#### Phase 1 — Code-Base Grounding

First, deeply analyze the existing codebase to understand the context for this new feature.

- Recursively scan the repository to identify all relevant files, components, and existing patterns.
- Map potential dependencies and identify edge cases with the current architecture.
- **Test the current functionality**: Run the development server and verify existing features work before planning changes.
- **Check authentication flow**: If the feature involves user roles or authentication, trace the complete auth flow including middleware, redirects, and session management.
- **Identify naming conventions**: Note the project's conventions for files, components, routes, and middleware.
- Summarize how this new feature will integrate with or extend the current architecture, highlighting any refactors that may be required.

#### Phase 2 — Best-Practice & Pattern Research

Next, research external best practices to ensure a high-quality implementation.

- Search the web, official documentation for our libraries, and open-source repositories for proven design patterns related to this feature.
- **Use Context7 MCP server** to fetch up-to-date documentation for any libraries/frameworks being used (Nuxt, Vue, Nuxt UI, etc.)
- **Use Cloudflare MCP server** for deployment and edge computing best practices if relevant
- **Use Mastra MCP server** for AI/ML integration patterns if the feature involves AI capabilities
- Enumerate at least two alternative implementation approaches.
- Evaluate the trade-offs for each approach (e.g., developer experience, performance, cost, security risks) and recommend the best path forward.
- Surface any non-obvious security, privacy, or accessibility pitfalls discovered during your research.

#### Phase 3 — Draft Feature Specification

Now, produce a comprehensive feature specification in a Markdown document. Use the following heading structure **exactly**.

```markdown
### 📝 Feature Overview

- **Problem Statement:**
- **Solution Vision:** (A concise paragraph describing how the feature will work)
- **Success Metrics:**

### 👥 User Stories

1. As a …, I want … so that …
2. …
3. …

### ✅ Acceptance Criteria

- **UI / UX:**
- **Performance:**
- **Accessibility:**
- **Security & Privacy:**

### 🔧 Technical Requirements

- **Architectural Approach:**
- **Data-Model / Schema Changes:**
- **API Endpoints (if any):**
- **Third-Party Integrations:**
- **Key Security Considerations:**
- **Middleware Requirements:** (Specify if global vs route-specific middleware is needed)
- **Navigation/Redirect Logic:** (Detail exact redirect flows and edge cases)
- **Icon/Asset Dependencies:** (List any UI icons or assets that need to be verified)
- **UI Component Library:** Nuxt UI - [Documentation](https://ui.nuxt.com/getting-started)

### 🧪 Testing Strategy

- **Unit Tests:**
- **Integration / E2E Tests:**
- **Manual QA Checklist:**
- **Performance / Load Tests:**
- **Development Server Testing:** (Include specific test scenarios with test credentials)
- **Browser Testing with Playwright:** (Provide test scripts for critical user flows)
  - **Use Playwright MCP server** for automated browser testing
  - **Test Credentials:** test@test.com / 12345678
- **Test Script Location:** All test scripts MUST be placed in the `/scripts` directory, never in the project root
- **Screenshot Documentation:** Use Snap-Happy MCP server to capture visual states during testing

### 📋 Implementation Plan

| Phase | Description | Estimated Effort | Dependencies / Risks |
| ----- | ----------- | ---------------- | -------------------- |
| 0     | Verify dev environment & test existing functionality | S | Dev server port conflicts |
| 1     | …           | S / M / L        | …                    |
| 2     | …           | …                | …                    |
| 3     | …           | …                | …                    |
| Final | Run linting & fix all issues | S | Code style compliance |

### ❓ Open Questions

- …

### 🚀 Definition of Done

- [ ] Code merged & all tests green
- [ ] All linting issues resolved (`pnpm lint` passes)
- [ ] Manual testing completed with real user scenarios
- [ ] Navigation flows verified with browser developer tools
- [ ] Docs / changelog updated
- [ ] Feature flagged & rollout plan approved
- [ ] Success metrics instrumented
- [ ] No console errors or warnings in development mode
```

### ⚠️ Common Pitfalls to Avoid

- [ ] Not testing with actual user credentials before implementing
- [ ] Assuming middleware names match file names (e.g., 'auth' vs 'auth.global.ts')
- [ ] Using client-side navigation functions incorrectly (navigateTo vs window.location)
- [ ] Not checking for port conflicts when running dev server
- [ ] Forgetting to verify icon availability in the UI library
- [ ] Not considering the order of operations in async authentication flows

#### Phase 4 — Human Review, Planning Storage, & Implementation

Finally, present the draft for approval, save it to a local file (under /planning) for record-keeping.

1.  **Present the draft** from Phase 3 for approval and ask the user:
    _“Does this plan look good to proceed, or would you like any changes before I begin?”_

2.  **Wait for approval.**

3.  **If the user replies “yes”, “looks good”, or “approved”**:
    - First, write the entire Markdown content from Phase 3 into a new file in the `/planning` directory. The filename should be based on the feature idea.

    - Confirm to the user that the file has been saved locally to `/planning/$FILENAME`.

4.  **If the user requests changes**, revise the draft from Phase 3 and repeat this Phase 4 check.

5.  **Post-Implementation Testing**: After implementation, always:
    - Create a Playwright test script to verify the main user flow (place in `/scripts` directory)
    - Test with real credentials (not just mock data)
    - Verify all navigation paths work as expected
    - Check browser console for errors
    - Run `pnpm lint` and fix all issues before completing
    - All test scripts MUST be created in the `/scripts` directory, not in the project root

6.  **Complex Problem Analysis**: If facing difficult implementation challenges:
    - Use Sequential Thinking MCP server to break down complex problems
    - Document the thinking process for future reference

7.  **Payment Integration**: If the feature involves payment functionality:
    - Use Polar MCP server to manage products, subscriptions, and customer data
    - Ensure proper sandbox/production environment separation

8.  **Cleanup**: After testing is complete:
    - Kill any background development servers:
      - `pkill -f "pnpm dev"` - Kill pnpm dev processes
      - `pkill -f "nuxt dev"` - Kill nuxt dev processes
      - `ps aux | grep -E "(node|nuxt|pnpm)" | grep -v grep` - Check for remaining processes
    - Remove temporary test files created during implementation:
      - Check `/scripts` directory for test files (`.mjs`, `.png`, etc.)
      - Remove any `cookies.txt` or authentication state files
      - Delete any `.log` files created during testing
    - Close any browser instances opened by Playwright:
      - `ps aux | grep -E "(chromium|playwright)" | grep -v grep` - Check for browser processes
    - Clear any test data or logs created during testing
    - Verify no orphaned processes are consuming resources
    - Check the project root directory for any test scripts that should have been in `/scripts`
    - **IMPORTANT**: Always clean up ALL test artifacts and processes to avoid resource leaks

---

**Feature to research and plan:**
$ARGUMENTS
