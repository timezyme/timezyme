# Cloudflare Turnstile Setup Guide

This document explains how Cloudflare Turnstile is integrated into the application for form security.

## Overview

Cloudflare Turnstile is a privacy-focused CAPTCHA alternative that provides bot protection without the annoying puzzles. It's fully compatible with Cloudflare Workers deployment.

## Configuration

### Environment Variables

The following environment variables are used for Turnstile:

```bash
# For local development (use test keys)
NUXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
NUXT_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# For production (use real keys from Cloudflare dashboard)
NUXT_PUBLIC_TURNSTILE_SITE_KEY=your-production-site-key
NUXT_TURNSTILE_SECRET_KEY=your-production-secret-key
```

### Getting Production Keys

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/)
2. Navigate to Turnstile section
3. Create a new widget
4. Configure allowed domains (add your production domain)
5. Copy the Site Key and Secret Key

## Implementation Details

### Module Configuration

The `@nuxtjs/turnstile` module is configured in `nuxt.config.ts`:

```typescript
modules: [
  // ... other modules
  '@nuxtjs/turnstile',
],

turnstile: {
  siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
},

runtimeConfig: {
  turnstile: {
    secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA',
  },
},
```

### CSP Headers

Content Security Policy headers are configured to allow Turnstile scripts and frames:

```typescript
security: {
  headers: {
    contentSecurityPolicy: {
      'frame-src': [
        "'self'",
        'https://challenges.cloudflare.com', // For Turnstile iframe
      ],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://challenges.cloudflare.com', // For Turnstile scripts
      ],
    },
  },
},
```

### Form Implementation

Forms use the `<NuxtTurnstile>` component:

```vue
<template>
  <UForm @submit="onSubmit">
    <!-- Form fields -->
    
    <!-- Turnstile Widget -->
    <div class="flex justify-center">
      <NuxtTurnstile
        ref="turnstileRef"
        v-model="turnstileToken"
        :options="{
          theme: 'light',
          size: 'normal',
        }"
      />
    </div>
    
    <UButton
      type="submit"
      :disabled="!isFormValid || isLoading"
    >
      Submit
    </UButton>
  </UForm>
</template>

<script setup>
const turnstileToken = ref('')
const turnstileRef = ref()
const isFormValid = ref(false)

// Enable form submission only when Turnstile token is available
watch(turnstileToken, (token) => {
  isFormValid.value = !!token
})

async function onSubmit(event) {
  if (!turnstileToken.value) {
    showErrorToast('Please complete the security check')
    return
  }

  // Include token in request
  await $fetch('/api/endpoint', {
    body: {
      ...event.data,
      turnstileToken: turnstileToken.value,
    },
    method: 'POST',
  })

  // Reset Turnstile for next submission
  turnstileRef.value?.reset()
}
</script>
```

### Server-Side Verification

API endpoints verify the Turnstile token using the auto-imported `verifyTurnstileToken` utility:

```typescript
export default defineEventHandler(async (event) => {
  const { turnstileToken, ...data } = await readValidatedBody(event, schema.parse)

  // Verify Turnstile token
  const isValid = await verifyTurnstileToken(turnstileToken)
  if (!isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid security verification. Please try again.',
    })
  }

  // Process the form data
  // ...
})
```

## Testing

### Local Development

The test keys will always pass validation in development:
- Site Key: `1x00000000000000000000AA`
- Secret Key: `1x0000000000000000000000000000000AA`

These keys produce a dummy token that is accepted by the dummy secret key.

### Production Testing

1. Set production keys in environment variables
2. Add your domain to the Turnstile widget's allowed domains
3. Test form submissions to ensure tokens are properly validated

## Security Benefits

1. **Bot Protection**: Prevents automated form submissions
2. **Privacy-Focused**: No user tracking or profiling
3. **Better UX**: No annoying puzzles to solve
4. **Cloudflare Integration**: Works seamlessly with Cloudflare Workers

## Troubleshooting

### Common Issues

1. **"Invalid security verification" error**
   - Check that environment variables are set correctly
   - Verify domain is allowed in Turnstile settings
   - Ensure CSP headers allow Cloudflare domains

2. **Widget not appearing**
   - Check browser console for errors
   - Verify script is loading from challenges.cloudflare.com
   - Check CSP headers configuration

3. **Token validation failing in production**
   - Ensure using production keys (not test keys)
   - Verify secret key matches the site key
   - Check server logs for detailed error messages

## Additional Security Layers

Forms also implement additional security measures:
- **Rate Limiting**: Via nuxt-security middleware
- **Honeypot Fields**: Hidden fields to catch bots (waitlist form)
- **Input Validation**: Server-side validation with Zod
- **Email Validation**: Checks for disposable email domains (waitlist form)