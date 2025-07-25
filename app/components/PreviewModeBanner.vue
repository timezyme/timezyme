<script setup lang="ts">
const config = useRuntimeConfig()
const isPreviewMode = config.public.previewMode || false
</script>

<template>
  <div
    v-if="isPreviewMode"
    class="fixed top-0 left-0 right-0 z-50 bg-yellow-500/90 text-black text-center py-2 text-sm font-medium"
  >
    <div class="flex items-center justify-center gap-2">
      <UIcon name="i-lucide-eye" />
      <span>Preview Mode - Protected development environment</span>
    </div>
  </div>
</template>
