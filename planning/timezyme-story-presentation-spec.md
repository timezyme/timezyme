### 📝 Feature Overview

- **Problem Statement:** TimeZyme needs to communicate its complex value proposition to investors through an engaging, interactive web-based presentation that tells the story of transforming chaotic research into structured knowledge.

- **Solution Vision:** Create a series of web pages (approximately 1280 x 832 viewport) that present the TimeZyme story through 6-7 interactive scenes following the narrative arc from the reel plan. Each scene will be its own page with smooth transitions, using Nuxt UI Pro components and TailwindCSS animations instead of video. The presentation will be accessible via a dedicated "Product Story" button in the main navigation.

- **Success Metrics:**
  - Investors can understand TimeZyme's value proposition within 2-3 minutes
  - Smooth navigation between story scenes with clear progression
  - Professional, polished appearance that matches TimeZyme's brand
  - Mobile-responsive design that works on investor devices

### 👥 User Stories

1. As an investor, I want to quickly understand what problem TimeZyme solves so that I can evaluate its market potential
2. As an investor, I want to see how the product works through an interactive demonstration so that I can assess its technical viability
3. As an investor, I want to visualize the knowledge graph concept so that I can understand TimeZyme's unique value proposition
4. As a visitor, I want to navigate through the story at my own pace so that I can focus on the parts most relevant to me
5. As a mobile user, I want the story presentation to work well on my device so that I can view it anywhere

### ✅ Acceptance Criteria

- **UI / UX:**
  - Each scene fits within a 1280x832 viewport with responsive scaling
  - Navigation includes both next/previous buttons and scene indicators
  - Smooth transitions between scenes using Vue transitions
  - Icons enhance visual storytelling without overwhelming the content
  - Image placeholders clearly indicate what images are needed
  - Consistent TimeZyme branding (cyan gradients, dark theme)
  - Manual progression through scenes (no auto-advance)
  - Progress indicator showing current scene

- **Performance:**
  - Page transitions complete within 300ms
  - No layout shift when navigating between scenes
  - Lazy loading for image assets when implemented
  - Total bundle size under 500KB for all story pages
  - Scenes preloaded for smoother transitions

- **Accessibility:**
  - Keyboard navigation support (arrow keys, tab)
  - Screen reader friendly with proper ARIA labels
  - Minimum contrast ratios met (WCAG AA)
  - Alternative text for all visual elements

- **Security & Privacy:**
  - No external dependencies or tracking
  - All assets served from same domain
  - No user data collection on story pages
  - No analytics tracking

### 🔧 Technical Requirements

- **Architectural Approach:**
  - Create a new `/story` route with dynamic scene routing (`/story/scene-1`, etc.)
  - Use a dedicated `story` layout for consistent navigation
  - Implement a Pinia store for story state management
  - Leverage Vue 3 transitions for scene animations

- **Data-Model / Schema Changes:**
  - None required - all content is static

- **API Endpoints (if any):**
  - None required

- **Third-Party Integrations:**
  - None required

- **Key Security Considerations:**
  - Ensure no sensitive business data is exposed
  - Validate scene parameters to prevent XSS

- **Middleware Requirements:**
  - None - story pages are publicly accessible

- **Navigation/Redirect Logic:**
  - Add "Product Story" to main navigation between "About" and "Docs"
  - Story pages accessible at `/story` (redirects to `/story/1`)
  - Scene URLs: `/story/1` through `/story/7`
  - Navigation controls: Next/Previous buttons, scene dots indicator
  - Escape key or close button returns to previous page

- **Icon/Asset Dependencies:**
  - Lucide icons for navigation (chevron-left, chevron-right, x)
  - Scene-specific icons from Lucide set
  - Custom SVG animations for knowledge graph visualization

- **UI Component Library:** Nuxt UI - [Documentation](https://ui.nuxt.com/getting-started)

### 🧪 Testing Strategy

- **Unit Tests:**
  - Story navigation logic
  - Scene transition animations
  - Keyboard navigation handlers

- **Integration / E2E Tests:**
  - Complete story walkthrough
  - Navigation between all scenes
  - Mobile responsiveness
  - Browser back/forward button behavior

- **Manual QA Checklist:**
  - [ ] All scenes load correctly
  - [ ] Transitions are smooth
  - [ ] Icons display properly
  - [ ] Image placeholders are clear
  - [ ] Mobile view is responsive
  - [ ] Keyboard navigation works
  - [ ] Story completes successfully

- **Performance / Load Tests:**
  - Measure transition performance
  - Check memory usage during navigation
  - Verify no memory leaks

- **Development Server Testing:**
  - Test on port 9009
  - Verify no console errors
  - Check all navigation paths

- **Browser Testing with Playwright:**
  - Automated story progression test
  - Screenshot each scene for documentation
  - Test responsive breakpoints

- **Test Script Location:** `/scripts/test-story-presentation.mjs`

- **Screenshot Documentation:** Capture each scene state for design review

### 📋 Implementation Plan

| Phase | Description | Estimated Effort | Dependencies / Risks |
| ----- | ----------- | ---------------- | -------------------- |
| 0     | Verify dev environment & test existing functionality | S | Dev server port conflicts |
| 1     | Create story layout and navigation components | M | UI component availability |
| 2     | Implement Scene 1-3 (Problem → Solution → L0 Demo) | L | Icon selection, animations |
| 3     | Implement Scene 4-5 (Progressive Layers → Knowledge Hop) | L | Complex transitions |
| 4     | Implement Scene 6-7 (Knowledge Graph → Call to Action) | M | SVG animations |
| 5     | Add navigation, transitions, and polish | M | Performance optimization |
| 6     | Mobile responsiveness and accessibility | M | Testing on devices |
| 7     | Integration testing and documentation | S | Playwright setup |
| Final | Run linting & fix all issues | S | Code style compliance |

### ❓ Open Questions

- ~~Should the story auto-advance or require manual progression?~~ **Manual progression**
- ~~Do we want to track story completion analytics?~~ **No**
- ~~Should there be a progress indicator showing current scene?~~ **Yes**
- ~~Do we need a "Skip to end" option for returning visitors?~~ **No**
- ~~Should scenes be preloaded for smoother transitions?~~ **Yes**

### 🚀 Definition of Done

- [ ] Code merged & all tests green
- [ ] All linting issues resolved (`pnpm lint` passes)
- [ ] Manual testing completed with real user scenarios
- [ ] Navigation flows verified with browser developer tools
- [ ] Docs / changelog updated
- [ ] Feature flagged & rollout plan approved
- [ ] Success metrics instrumented
- [ ] No console errors or warnings in development mode
- [ ] All 7 scenes implemented with proper transitions
- [ ] Mobile responsive design verified
- [ ] Image placeholder documentation created
- [ ] Accessibility audit passed

### ⚠️ Common Pitfalls to Avoid

- [ ] Not testing with actual user credentials before implementing
- [ ] Assuming middleware names match file names (e.g., 'auth' vs 'auth.global.ts')
- [ ] Using client-side navigation functions incorrectly (navigateTo vs window.location)
- [ ] Not checking for port conflicts when running dev server
- [ ] Forgetting to verify icon availability in the UI library
- [ ] Not considering the order of operations in async authentication flows
- [ ] Creating overly complex animations that hurt performance
- [ ] Not providing fallbacks for users with reduced motion preferences
- [ ] Forgetting to test browser back button behavior
- [ ] Not optimizing asset sizes for web delivery