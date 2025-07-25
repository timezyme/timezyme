<script setup lang="ts">
const config = useRuntimeConfig()
// Check if we're in preview mode based on base URL or explicit flag
const isPreviewMode = config.public.previewMode || config.public.baseUrl?.includes('preview.timezyme.com') || false
const isAuthEnabled = config.public.authEnabled !== false
</script>

<template>
  <div
    v-if="isPreviewMode"
    class="fixed top-0 left-0 right-0 z-50 bg-yellow-500/90 text-black text-center py-2 text-sm font-medium shadow-lg"
  >
    <div class="flex items-center justify-center gap-2">
      <UIcon name="i-lucide-shield-alert" />
      <span>Preview Environment - Protected by Cloudflare Access</span>
      <span
        v-if="isAuthEnabled"
        class="ml-2 px-2 py-0.5 bg-black/20 rounded text-xs"
      >
        Auth Enabled
      </span>
    </div>
  </div>
</template>
