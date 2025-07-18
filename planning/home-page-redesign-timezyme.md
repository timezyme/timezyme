# Home Page Redesign - TimeZyme Branding

## 📝 Feature Overview

- **Problem Statement:** The current home page needs to be updated to match the modern, dark-themed design shown in the reference screenshot while maintaining the existing navigation elements and functionality.
- **Solution Vision:** Transform the home page into a modern, dark-themed landing page with gradient effects, centered content, and the TimeZyme branding. The design will use Nuxt UI Pro components with TailwindCSS 4 styling while preserving all current navigation links and authentication states. The new design will feature a purple/magenta gradient theme, centered hero content with a "Transform Reading into Understanding" tagline, and a prominent "Join Waitlist" CTA button. The footer will be redesigned to match the reference with Quick Links and Company sections.
- **Success Metrics:**
  - Clean, modern dark-themed design matching the reference
  - Maintained navigation functionality
  - Responsive design working on all screen sizes
  - No broken authentication flows
  - All existing tests passing

## 👥 User Stories

1. As a visitor, I want to see a modern, professional landing page that clearly communicates TimeZyme's value proposition so that I understand what the product offers
2. As a returning user, I want to easily find the login/dashboard buttons in the navigation so that I can quickly access my account
3. As a new user, I want a prominent call-to-action button to join the waitlist so that I can be notified when new features are available
4. As a mobile user, I want the landing page to be fully responsive so that I have a great experience on any device

## ✅ Acceptance Criteria

- **UI / UX:**
  - Dark navy/black background with purple/magenta gradient accents
  - TimeZyme logo prominently displayed in the navigation
  - Centered hero content with proper spacing
  - "Transform Reading into Understanding" tagline with "LightSpeed" in accent color
  - Subtitle: "TimeZyme transforms any document into interactive visual stories."
  - Prominent "Join Waitlist" CTA button with gradient background
  - **Sections to keep**: Hero, Features, Pricing, FAQ, Waitlist
  - **Sections to remove**: Testimonials, Logo marquee, Final CTA
  - **Footer redesign**:
    - Left section: TimeZyme logo with tagline and social icons (Discord, X/Twitter, link icon)
    - Middle section: "Quick Links" with Dashboard, Login, Feedback (with "New" badge)
    - Right section: "Company" with About, Career (with "Hiring" badge), Discover Zymes, Contact, Support
  - All existing navigation links preserved (Docs, FAQ, Testimonials, Pricing, Blog, Changelog, Contact)
  - Login/Dashboard buttons remain functional

- **Performance:**
  - Page load time under 3 seconds
  - Smooth transitions and animations
  - Optimized logo images loaded

- **Accessibility:**
  - Proper contrast ratios for dark theme
  - Keyboard navigation support
  - Screen reader friendly
  - Proper heading hierarchy

- **Security & Privacy:**
  - No changes to authentication flow
  - Existing security measures preserved
  - Session management intact

## 🔧 Technical Requirements

- **Architectural Approach:**
  - Modify existing `app/pages/index.vue` to implement new design
  - Update `config/siteConfig.ts` to reflect TimeZyme branding
  - Update `layers/core/components/Logo.vue` to use TimeZyme logo
  - Update `layers/core/components/AppFooter.vue` for new footer design
  - Update color scheme in `app/app.config.ts` to purple/magenta theme
  - Preserve all existing functionality and navigation structure

- **Data-Model / Schema Changes:**
  - None required

- **API Endpoints (if any):**
  - No new endpoints needed

- **Third-Party Integrations:**
  - None required

- **Key Security Considerations:**
  - Maintain existing authentication middleware
  - Preserve protected route functionality
  - Keep session management intact

- **Middleware Requirements:**
  - No changes to existing middleware
  - Global auth middleware remains functional

- **Navigation/Redirect Logic:**
  - Existing navigation logic preserved
  - Dashboard redirect for authenticated users maintained
  - "Join Waitlist" button scrolls to waitlist section

- **Icon/Asset Dependencies:**
  - TimeZyme logo files: `just-logo.png`, `logo-dark.png`, `logo-light.png`
  - Existing Lucide icons from Nuxt UI
  - Discord icon for footer social links

- **UI Component Library:** Nuxt UI - [Documentation](https://ui.nuxt.com/getting-started)

## 🧪 Testing Strategy

- **Unit Tests:**
  - No new unit tests required

- **Integration / E2E Tests:**
  - Run existing test suite to ensure no regressions
  - Verify authentication flow still works
  - Check navigation links functionality
  - Test responsive design on different screen sizes

- **Manual QA Checklist:**
  - [ ] Logo displays correctly in light and dark modes
  - [ ] Navigation links work as expected
  - [ ] Login/Register buttons visible when logged out
  - [ ] Dashboard button visible when logged in
  - [ ] "Join Waitlist" button scrolls to waitlist section
  - [ ] Footer links are functional
  - [ ] Footer badges display correctly
  - [ ] Page is responsive on mobile, tablet, and desktop
  - [ ] Dark theme displays correctly
  - [ ] All text is readable with proper contrast

- **Performance / Load Tests:**
  - Verify page load time remains under 3 seconds
  - Check logo image optimization

- **Development Server Testing:**
  - Test with demo credentials: demo-user@nuxtstarterkit.com / demoUserNuxtStarterKit
  - Verify authentication state changes update navigation
  - Check dark/light mode toggle functionality

- **Browser Testing with Playwright:**
  - **Use Playwright MCP server** for automated browser testing
  - **Test Credentials:** demo-user@nuxtstarterkit.com / demoUserNuxtStarterKit
  - Test critical user flows:
    - Landing page loads correctly
    - Navigation links work
    - Authentication flow functions
    - Theme toggle works
    - Footer links navigate properly

- **Test Script Location:** All test scripts MUST be placed in the `/scripts` directory, never in the project root
- **Screenshot Documentation:** Use Snap-Happy MCP server to capture visual states during testing

## 📋 Implementation Plan

| Phase | Description | Estimated Effort | Dependencies / Risks |
| ----- | ----------- | ---------------- | -------------------- |
| 0     | Verify dev environment & test existing functionality | S | Dev server port conflicts |
| 1     | Update site configuration and branding | S | None |
| 2     | Update Logo component to use TimeZyme logos | S | Logo file verification |
| 3     | Update color scheme to purple/magenta theme | S | Theme compatibility |
| 4     | Redesign hero section with new layout | M | Component structure changes |
| 5     | Remove testimonials and logo marquee sections | S | None |
| 6     | Update text content and translations | S | i18n file updates |
| 7     | Redesign footer with new layout and links | M | Component restructure |
| 8     | Add gradient effects and styling | M | CSS complexity |
| 9     | Test responsive design and functionality | S | Browser compatibility |
| Final | Run linting & fix all issues | S | Code style compliance |

## ❓ Open Questions

- None - all questions have been answered

## 🚀 Definition of Done

- [ ] Code merged & all tests green
- [ ] All linting issues resolved (`pnpm lint` passes)
- [ ] Manual testing completed with real user scenarios
- [ ] Navigation flows verified with browser developer tools
- [ ] Docs / changelog updated
- [ ] Feature flagged & rollout plan approved
- [ ] Success metrics instrumented
- [ ] No console errors or warnings in development mode

## ⚠️ Common Pitfalls to Avoid

- [ ] Not testing with actual user credentials before implementing
- [ ] Assuming middleware names match file names (e.g., 'auth' vs 'auth.global.ts')
- [ ] Using client-side navigation functions incorrectly (navigateTo vs window.location)
- [ ] Not checking for port conflicts when running dev server
- [ ] Forgetting to verify icon availability in the UI library
- [ ] Not considering the order of operations in async authentication flows
