# Super Claude Daily Workflow Guide

A practical guide for using Super Claude effectively in your day-to-day development work.

## Quick Start: Your Daily Routine

### 🌅 Morning Start (Pick ONE based on your focus)

**Option 1: When you know what you're working on**
```bash
/analyze [specific-area] --think
# Example: /analyze authentication system --think
# Example: /analyze payment integration --think
```

**Option 2: When you need a general overview**
```bash
/load . --persona-analyzer
# This loads the project context without deep analysis
```

**Option 3: When continuing previous work**
```bash
# Provide context about what you were working on
/load . "[description of previous work]"

# Or reference specific files you were editing
/analyze [file-or-area] --think "[context about what you're continuing]"
```

## 🚀 Feature Development Workflow

### Phase 1: Quick Analysis (30 seconds)
```bash
/analyze [feature-area] --think --plan
# Only analyze the specific area you'll work on
```

### Phase 2: Implementation
```bash
# For UI components
/implement [feature-name] --type component --persona-frontend --magic

# For API endpoints
/implement [endpoint-name] --type api --persona-backend --c7

# For full-stack features
/implement [feature-description] --delegate auto
```

### Phase 3: Validation
```bash
# Always run after implementation
./scripts/post-task-verify.sh
```

### Phase 4: Commit
```bash
# Use your custom commit command
/commit
```

## 🐛 Bug Fixing Workflow

### Quick Bugs (< 5 minutes)
```bash
/troubleshoot [bug-description] --think --seq
/improve [file-path] --validate
./scripts/post-task-verify.sh
```

### Complex Bugs
```bash
# Step 1: Deep analysis
/analyze [problematic-area] --think-hard --persona-analyzer

# Step 2: Fix with validation
/improve [component-path] --validate --safe-mode

# Step 3: Test
/test e2e [affected-feature] --play
./scripts/post-task-verify.sh
```

## 💡 Pro Tips

### Use Auto-Activation
Don't memorize flags! Super Claude auto-activates based on keywords:
- Say "component" → Frontend persona + Magic
- Say "API" → Backend persona + Context7
- Say "performance" → Performance persona
- Say "debug" → Sequential thinking

### Start Simple, Add Complexity
```bash
# Start with base command
/implement [your-feature-description]

# Let Super Claude auto-activate what's needed
# Add flags only for specific behavior
```

### Token Optimization
```bash
# For long sessions
/implement [complex-feature] --uc --plan
# Saves 30-50% tokens
```

## 📋 Common Patterns

### New UI Component
```bash
/build [component-name] --persona-frontend --magic
./scripts/post-task-verify.sh
/commit
```

### New API Endpoint
```bash
/implement [endpoint-description] --type api --persona-backend --c7
/test api [endpoint-name]
./scripts/post-task-verify.sh
/commit
```

### Performance Optimization
```bash
/analyze [performance-issue] --think-hard --persona-performance
/improve [slow-component-path] --focus performance --loop
/test performance [benchmark-name] --play
```

### Security Audit
```bash
/analyze [area-to-audit] --focus security --validate
/improve [vulnerable-file-path] --persona-security --safe-mode
```

## ⚡ Quick Reference Commands

| What You're Doing | Command to Use |
|-------------------|----------------|
| Starting new feature | `/analyze [feature-area] --think` |
| Building UI | `/build [component-name] --magic` |
| Creating API | `/implement [endpoint] --type api` |
| Fixing bug | `/troubleshoot [issue-description] --seq` |
| Optimizing | `/improve [target-file] --focus performance` |
| Writing tests | `/test e2e [feature-name] --play` |
| Documenting | `/document [feature] --persona-scribe` |

## 🚫 What NOT to Do

### Don't analyze the entire app every morning
```bash
# ❌ Too broad and token-heavy
/analyze @app --ultrathink

# ✅ Be specific
/analyze [specific-layer-or-feature] --think
```

### Don't skip validation
```bash
# ❌ Making changes without testing
/implement [feature]

# ✅ Always validate
/implement [feature]
./scripts/post-task-verify.sh
```

### Don't use all flags at once
```bash
# ❌ Overkill
/analyze [feature] --ultrathink --all-mcp --wave-mode --verbose

# ✅ Let auto-activation help
/analyze [feature] --think
```

## 🎯 Decision Tree

```
What are you doing today?
├── New Feature
│   ├── UI Component → /build [component] --magic
│   ├── API Endpoint → /implement [api] --type api
│   └── Full Stack → /implement [feature] --delegate auto
├── Bug Fix
│   ├── Simple → /troubleshoot [issue] --seq
│   └── Complex → /analyze [area] --think-hard
├── Optimization
│   ├── Performance → /improve [target] --focus performance
│   └── Code Quality → /cleanup [target] --persona-refactorer
└── Documentation
    └── /document [feature] --persona-scribe
```

## 📝 Daily Checklist

- [ ] **Start**: `/load .` or `/analyze [specific-area]`
- [ ] **Before features**: `/estimate [feature-complexity]`
- [ ] **After changes**: `./scripts/post-task-verify.sh`
- [ ] **Before commit**: Review changes
- [ ] **End of day**: `/git commit --persona-scribe`

## 🔗 Combine with Custom Commands

Super Claude + Your Custom Commands = Perfect Workflow

```bash
# Use Super Claude for development
/implement [new-feature] --type component --magic

# Use custom commands for git
/commit  # Your project-specific commit with pre-checks
```

## 💭 Remember

- **Start simple** - Let auto-activation guide you
- **Be specific** - Target your analysis to what you're working on
- **Validate always** - Run tests after every change
- **Save tokens** - Use `--uc` for long sessions

The key is to use Super Claude's intelligence without overwhelming yourself with options. Start with the command, let it guide you!