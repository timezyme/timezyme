// @ts-check
import antfu from '@antfu/eslint-config'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu(
    {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: false,
      },
    },
    {
      ignores: ['.github/*'],
    },
    {
      name: 'base-rules',
      files: ['**/*'],
      rules: {
        'style/quotes': ['error', 'single', { avoidEscape: true }],
        'style/space-before-function-paren': ['error', 'always'],
        'ts/array-type': ['error', { default: 'generic' }],
        'no-console': ['error', { allow: [''] }],
        'vue/max-attributes-per-line': [
          'error',
          {
            multiline: {
              max: 1,
            },
            singleline: {
              max: 1,
            },
          },
        ],
      },
    },
    {
      name: 'sorting',
      files: ['**/*.{ts,js,vue}'],
      rules: {
        'import/order': 'off', // disable import/order because perfectionist/sort-imports is used
        'perfectionist/sort-array-includes': 'error',
        'perfectionist/sort-exports': 'error',
        'perfectionist/sort-imports': ['error', {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          newlinesBetween: 'always',
        }],
        'perfectionist/sort-interfaces': 'error',
        'perfectionist/sort-named-exports': 'error',
        'perfectionist/sort-named-imports': 'error',
        'perfectionist/sort-object-types': 'error',
        'perfectionist/sort-objects': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-union-types': 'error',
        'sort-imports': 'off',
      },
    },
    {
      name: 'scripts-rules',
      files: ['scripts/**/*.{js,mjs,ts}'],
      rules: {
        'node/prefer-global/process': 'off',
        'no-console': 'off', // Allow console in scripts
      },
    },
    {
      name: 'server-rules',
      files: ['**/server/**/*.{js,ts}'],
      rules: {
        'node/prefer-global/process': 'off', // Allow process in server files
      },
    },
    {
      name: 'test-rules',
      files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}', '**/e2e/**/*.{js,ts}', '**/tests/**/*.{js,ts}', '**/test-helpers.{js,ts}'],
      rules: {
        'no-console': 'off', // Allow console in test files
        'no-unused-vars': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
  ),
  // ...your other rules
)
