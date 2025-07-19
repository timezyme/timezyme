# Nuxt 4 Starter Kit

A modern SaaS starter kit built with Nuxt 4, featuring authentication, payments, and a modular layer architecture.

## 🚀 Built with Nuxt 4

This starter kit leverages the power of Nuxt 4, the latest version of the Vue.js framework, providing:
- Enhanced performance and developer experience
- Improved directory structure with compatibility mode
- Better TypeScript support
- Streamlined module system

Read the [documentation](https://nuxtstarterkit.com/docs) for more information.

## 🔧 Troubleshooting

### TypeScript Issues

#### "Property 'id' does not exist on type 'User'" with nuxt-auth-utils
If you encounter TypeScript errors related to the User interface from nuxt-auth-utils:

1. **Important**: The `auth.d.ts` file must be placed in the **project root directory**, not in `types/` or any subdirectory.
2. Create `/auth.d.ts` with your User interface augmentation:
   ```typescript
   declare module '#auth-utils' {
     interface User {
       id: string
       email: string
       name: string
       // ... other properties
     }
   }
   export {}
   ```
3. Run `pnpm nuxi prepare` to regenerate types

#### UI Component TypeScript Errors
- Nuxt UI components have strict type checking for props
- Valid color values: `"error"`, `"info"`, `"primary"`, `"secondary"`, `"success"`, `"warning"`, `"neutral"`
- Do not use custom color names like "cyan" or "blue"

### ESLint Configuration
This project uses the new flat config format (`eslint.config.mjs`):
- The `.eslintignore` file is deprecated
- To ignore files/directories, use the `ignores` property in the config
- Example:
  ```javascript
  {
    ignores: ['.github/*', 'planning/**/*'],
  }
  ```
