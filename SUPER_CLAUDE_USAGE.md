# Super Claude Usage Guide

This comprehensive guide consolidates all Super Claude commands, flags, personas, and MCP servers into one easy-to-reference document for efficient development workflows.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Commands Overview](#commands-overview)
3. [Flags Reference](#flags-reference)
4. [Personas Guide](#personas-guide)
5. [MCP Servers](#mcp-servers)
6. [TimeZyme Project Workflows](#timezyme-project-workflows)
7. [Quick Reference](#quick-reference)

---

## Quick Start

Super Claude uses a powerful command system with intelligent auto-activation. Here's how to get started:

### Basic Command Structure
```
/command [arguments] [--flags]
```

### Most Common Commands
- `/build` - Build features with framework detection
- `/implement` - Implement new functionality
- `/analyze` - Analyze code and architecture
- `/improve` - Enhance existing code
- `/test` - Run testing workflows

### Essential Flags
- `--think` - Enable deep analysis (4K tokens)
- `--plan` - Show execution plan before running
- `--uc` - Ultra-compressed output (30-50% token reduction)
- `--validate` - Pre-operation validation

---

## Commands Overview

### Development Commands

#### `/build [target] [flags]`
**Purpose**: Project builder with intelligent framework detection
- **Auto-activates**: Frontend/Backend/Architect personas
- **MCP Integration**: Magic (UI), Context7 (patterns), Sequential (logic)
- **Example**: `/build landing page --persona-frontend --magic`

#### `/implement [feature] [flags]`
**Purpose**: Feature implementation with smart persona activation
- **Options**: `--type component|api|service|feature`
- **Auto-activates**: Appropriate personas based on feature type
- **Example**: `/implement user authentication --type api --persona-backend`

#### `/design [domain] [flags]`
**Purpose**: Design system orchestration
- **Auto-activates**: Architect + Frontend personas
- **MCP Integration**: Magic, Sequential, Context7
- **Example**: `/design dashboard UI --magic --c7`

### Analysis Commands

#### `/analyze [target] [flags]`
**Purpose**: Multi-dimensional system analysis
- **Auto-activates**: Analyzer, Architect, Security personas
- **Wave-enabled**: For complex analysis (complexity ≥0.7)
- **Example**: `/analyze @app/layers/auth --think --focus security`

#### `/troubleshoot [symptoms] [flags]`
**Purpose**: Root cause investigation
- **Auto-activates**: Analyzer + QA personas
- **Example**: `/troubleshoot login fails intermittently --seq`

#### `/explain [topic] [flags]`
**Purpose**: Educational explanations
- **Auto-activates**: Mentor + Scribe personas
- **Example**: `/explain authentication flow --verbose`

### Quality Commands

#### `/improve [target] [flags]`
**Purpose**: Evidence-based code enhancement
- **Wave-enabled**: For comprehensive improvements
- **Options**: `--quality`, `--perf`, `--security`
- **Example**: `/improve @app/components --loop --iterations 3`

#### `/cleanup [target] [flags]`
**Purpose**: Technical debt reduction
- **Auto-activates**: Refactorer persona
- **Example**: `/cleanup unused dependencies --validate`

### Additional Commands

#### `/test [type] [flags]`
**Purpose**: Testing workflows
- **Types**: unit, integration, e2e, performance
- **Auto-activates**: QA persona, Playwright
- **Example**: `/test e2e authentication flow --play`

#### `/document [target] [flags]`
**Purpose**: Documentation generation
- **Auto-activates**: Scribe persona
- **Example**: `/document API endpoints --persona-scribe=en`

#### `/git [operation] [flags]`
**Purpose**: Version control workflows
- **Operations**: commit, pr, branch, merge
- **Example**: `/git commit --persona-scribe`

#### `/task [operation] [flags]`
**Purpose**: Long-term project management
- **Scope**: Multi-session features
- **Example**: `/task implement payment system`

---

## Flags Reference

### Planning & Analysis Flags

#### `--plan`
- Shows execution plan before operations
- Great for understanding what will happen

#### `--think` (4K tokens)
- Multi-file analysis with structured problem-solving
- Auto-enables Sequential MCP
- Use for: Module-level analysis

#### `--think-hard` (10K tokens)  
- Deep architectural analysis
- Auto-enables Sequential + Context7
- Use for: System-wide refactoring

#### `--ultrathink` (32K tokens)
- Maximum depth analysis
- Auto-enables all MCP servers
- Use for: Critical system redesign

### Efficiency Flags

#### `--uc` / `--ultracompressed`
- 30-50% token reduction
- Auto-activates when context >75%
- Maintains technical accuracy

#### `--answer-only`
- Direct response without automation
- No task creation

#### `--validate`
- Pre-operation risk assessment
- Auto-activates for risky operations

#### `--safe-mode`
- Maximum validation
- Conservative execution
- Auto-activates in production

### MCP Server Flags

#### `--c7` / `--context7`
- Library documentation lookup
- Auto-activates for external libraries

#### `--seq` / `--sequential`
- Complex multi-step analysis
- Auto-activates for debugging

#### `--magic`
- UI component generation
- Auto-activates for frontend work

#### `--play` / `--playwright`
- Browser automation & E2E testing
- Auto-activates for test workflows

#### `--all-mcp`
- Enable all servers
- Use for complex multi-domain tasks

### Advanced Orchestration Flags

#### `--delegate [files|folders|auto]`
- Enable parallel sub-agent processing
- Auto-activates for >7 directories or >50 files
- 40-70% time savings

#### `--wave-mode [auto|force|off]`
- Multi-stage execution with compound intelligence
- Auto-activates: complexity ≥0.7 + files >20 + operations >2
- 30-50% better results

#### `--loop`
- Iterative improvement mode
- Default: 3 iterations
- Use with: `/improve`, `/cleanup`

### Persona Flags

#### `--persona-[name]`
Available personas:
- `architect` - System design
- `frontend` - UI/UX specialist
- `backend` - API/reliability
- `analyzer` - Root cause analysis
- `security` - Threat modeling
- `mentor` - Teaching focus
- `refactorer` - Code quality
- `performance` - Optimization
- `qa` - Testing specialist
- `devops` - Infrastructure
- `scribe=lang` - Documentation

---

## Personas Guide

### Technical Specialists

#### Architect Persona
- **Focus**: Long-term design, scalability
- **Auto-triggers**: "architecture", "design", "scalability"
- **Best for**: System design, API architecture

#### Frontend Persona
- **Focus**: User experience, accessibility
- **Auto-triggers**: "component", "UI", "responsive"
- **Performance targets**: <3s load, WCAG AA

#### Backend Persona
- **Focus**: Reliability, data integrity
- **Auto-triggers**: "API", "database", "service"
- **Reliability target**: 99.9% uptime

### Quality Experts

#### Analyzer Persona
- **Focus**: Evidence-based investigation
- **Auto-triggers**: "analyze", "debug", "root cause"
- **Method**: Systematic hypothesis testing

#### QA Persona
- **Focus**: Comprehensive testing
- **Auto-triggers**: "test", "quality", "validation"
- **Coverage targets**: 80% unit, 70% integration

#### Refactorer Persona
- **Focus**: Code simplicity, maintainability
- **Auto-triggers**: "refactor", "cleanup", "debt"
- **Priority**: Simplicity > cleverness

### Specialized Roles

#### Security Persona
- **Focus**: Threat modeling, compliance
- **Auto-triggers**: "vulnerability", "auth", "security"
- **Approach**: Zero trust, defense in depth

#### Performance Persona
- **Focus**: Optimization, metrics
- **Auto-triggers**: "optimize", "performance", "speed"
- **Method**: Measure → Optimize → Validate

#### DevOps Persona
- **Focus**: Infrastructure automation
- **Auto-triggers**: "deploy", "CI/CD", "infrastructure"
- **Priority**: Automation > manual processes

---

## MCP Servers

### Context7 - Documentation & Patterns
- **Purpose**: Library docs, code examples
- **Auto-activates**: External imports detected
- **Commands**: `/build`, `/implement`, `/document`

### Sequential - Complex Analysis
- **Purpose**: Multi-step reasoning
- **Auto-activates**: `--think` flags, debugging
- **Commands**: `/analyze`, `/troubleshoot`

### Magic - UI Generation
- **Purpose**: Component creation
- **Auto-activates**: Frontend tasks
- **Commands**: `/build UI`, `/design`

### Playwright - Testing & Automation
- **Purpose**: E2E testing, performance
- **Auto-activates**: Test workflows
- **Commands**: `/test e2e`

### Polar - Payment Integration
- **Purpose**: Subscription management
- **Available in TimeZyme project
- **Commands**: Payment operations

---

## TimeZyme Project Workflows

### Workflow 1: Adding a New Feature to TimeZyme

**Phase 1: Analysis & Planning**
```bash
/analyze @app/layers --think --plan
/estimate new feature complexity --persona-architect
```

**Phase 2: Implementation**
```bash
/implement new zyme visualization --type component --persona-frontend --magic
/build API endpoint for zyme data --persona-backend --c7
```

**Phase 3: Testing & Validation**
```bash
/test e2e zyme feature --play
./scripts/post-task-verify.sh  # TimeZyme specific validation
```

**Phase 4: Documentation**
```bash
/document new zyme feature --persona-scribe
/git commit --persona-scribe
```

### Workflow 2: Fixing TimeZyme Authentication Issues

**Phase 1: Investigation**
```bash
/troubleshoot auth disabled but login required --think --seq
/analyze @app/layers/auth --focus security
```

**Phase 2: Implementation**
```bash
/improve auth middleware --validate --safe-mode
/test e2e authentication flow --play
```

### Workflow 3: Optimizing TimeZyme Performance

**Phase 1: Analysis**
```bash
/analyze app performance --think-hard --persona-performance
/troubleshoot slow zyme rendering --seq --play
```

**Phase 2: Optimization**
```bash
/improve @app/components/story --focus performance --loop
/test performance benchmarks --play
```

---

## Quick Reference

### Common Task → Command Mapping

| Task | Command | Recommended Flags |
|------|---------|------------------|
| Build UI component | `/build component-name` | `--persona-frontend --magic` |
| Create API endpoint | `/implement endpoint` | `--type api --persona-backend --c7` |
| Fix a bug | `/troubleshoot issue` | `--think --seq` |
| Optimize performance | `/improve target` | `--focus performance --loop` |
| Security audit | `/analyze @app` | `--focus security --validate` |
| Write tests | `/test e2e feature` | `--play --persona-qa` |
| Clean up code | `/cleanup target` | `--persona-refactorer` |
| Document code | `/document feature` | `--persona-scribe` |

### Flag Combinations for Scenarios

| Scenario | Flag Combination | Effect |
|----------|------------------|--------|
| Quick analysis | `--think --uc` | Fast, compressed analysis |
| Deep investigation | `--think-hard --seq --verbose` | Comprehensive analysis |
| Safe production changes | `--validate --safe-mode --plan` | Maximum safety |
| Large codebase work | `--delegate auto --wave-mode` | Parallel processing |
| UI development | `--persona-frontend --magic --c7` | Full frontend stack |
| API development | `--persona-backend --seq --validate` | Reliable backend |

### Auto-Activation Cheat Sheet

**Wave Mode Auto-Activates When:**
- Complexity ≥ 0.7
- Files > 20
- Operation types > 2

**Delegation Auto-Activates When:**
- Directories > 7
- Files > 50
- Complexity > 0.8

**Safety Features Auto-Activate When:**
- Risk score > 0.7
- Resource usage > 75%
- Production environment detected

### TimeZyme-Specific Commands

**Always run after changes:**
```bash
./scripts/post-task-verify.sh
```

**Quick checks:**
```bash
./scripts/quick-test.sh
pnpm typecheck
pnpm lint
```

**Test critical features:**
```bash
pnpm test:e2e  # Full test suite
```

### Performance Tips

1. **Use `--uc` for long operations** - Saves 30-50% tokens
2. **Enable `--delegate` for multi-file tasks** - 40-70% time savings
3. **Add `--plan` to understand before executing**
4. **Combine personas for cross-domain work**
5. **Use `--wave-mode` for complex improvements**

---

## Advanced Tips

### 1. Persona Combinations
Some tasks benefit from multiple personas:
- `--persona-architect --persona-performance` for scalable designs
- `--persona-frontend --persona-qa` for accessible UI
- `--persona-backend --persona-security` for secure APIs

### 2. Progressive Enhancement
Start simple and add complexity:
1. Begin with basic command
2. Add `--think` if needed
3. Enable specific MCP servers
4. Add personas for specialization
5. Use wave mode for complex tasks

### 3. Token Optimization
- Always use `--uc` for large operations
- Prefer `--delegate` over sequential processing
- Use `--answer-only` for simple queries
- Enable caching with repeated operations

### 4. Validation Strategy
- `--validate` for any production changes
- `--safe-mode` when working with critical systems
- `--plan` to preview before execution
- Always run TimeZyme test suite after changes

---

## Getting Help

- Use `/index [query]` to search commands
- Add `--explain` to any command for details
- Use `/explain [concept]` for tutorials
- Check auto-activation rules in flag descriptions

Remember: Super Claude's intelligence comes from combining the right commands, flags, and personas for your specific task. Start simple and let auto-activation help guide you to the optimal configuration.