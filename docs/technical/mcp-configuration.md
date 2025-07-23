# MCP (Model Context Protocol) Configuration

This document explains how to configure MCP servers for the TimeZyme project.

## Overview

MCP servers enhance Claude Code's capabilities by providing access to external services and tools. The configuration is stored in `.mcp.json` at the project root.

## Environment Setup

### Prerequisites

1. **uvx** (for Serena server):
   ```bash
   brew install uv
   ```

2. **Supabase Access Token**:
   Add to your shell profile (~/.zshrc or ~/.bash_profile):
   ```bash
   export SUPABASE_ACCESS_TOKEN="your_supabase_token_here"
   ```
   Then reload: `source ~/.zshrc`

## Configured Servers

### 1. Supabase
- **Purpose**: Database management and queries
- **Status**: Read-only access to TimeZyme project
- **Required**: SUPABASE_ACCESS_TOKEN environment variable

### 2. Polar
- **Purpose**: Payment and subscription management
- **Status**: Configured with sandbox credentials
- **Note**: Uses sandbox environment for local development

### 3. Resend
- **Purpose**: Email sending capabilities
- **Status**: Configured with API key
- **Package**: Uses `resend-mcp` npm package

### 4. Serena
- **Purpose**: IDE assistant for code navigation and editing
- **Status**: Configured for TimeZyme project
- **Required**: uvx installed via Homebrew

### 5. Other Servers
- **Sequential Thinking**: Complex problem-solving
- **Playwright**: Browser automation
- **Cloudflare**: Edge computing documentation
- **Snap-Happy**: Screenshot management
- **Mastra**: AI framework documentation
- **Context7**: Library documentation

## Security Best Practices

1. **Never commit tokens** directly in `.mcp.json`
2. **Use environment variables** for all sensitive credentials
3. **Keep `.mcp.json` in gitignore** if it contains any sensitive data
4. **Rotate tokens regularly** and use separate tokens for development/production

## Troubleshooting

### Server fails to start
1. Check if required tools are installed (e.g., `uvx`, `docker`)
2. Verify environment variables are set
3. Run Claude Code with verbose logging: `claude --verbose`

### Permission errors
1. Ensure tokens have correct permissions
2. For Supabase, verify project access rights
3. Check API rate limits

### To verify all servers are working:
```
/mcp
```

All servers should show "running" status.

## Adding New MCP Servers

To add a new MCP server:

1. Find the server package or repository
2. Add configuration to `.mcp.json`:
   ```json
   "server-name": {
     "command": "npx",
     "args": ["-y", "package-name"],
     "env": {
       "API_KEY": "use-env-var-not-hardcoded"
     }
   }
   ```
3. Set required environment variables
4. Restart Claude Code

## References

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Claude Code MCP Guide](https://docs.anthropic.com/en/docs/claude-code/mcp)