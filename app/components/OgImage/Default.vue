<script setup lang="ts">
defineProps<{
  description?: string
  title?: string
}>()
</script>

<template>
  <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div class="flex h-full w-full flex-col items-center justify-center p-16">
      <!-- Logo -->
      <img
        src="/images/logo/just-logo.png"
        alt="TimeZyme"
        class="mb-8 h-32 w-32"
      >

      <!-- Title -->
      <h1 class="mb-4 text-center text-6xl font-bold text-white">
        {{ title || 'TimeZyme' }}
      </h1>

      <!-- Description -->
      <p class="max-w-3xl text-center text-2xl text-gray-300">
        {{ description || 'TimeZyme transforms any document into interactive visual stories.' }}
      </p>

      <!-- URL -->
      <p class="mt-8 text-xl text-gray-400">
        timezyme.com
      </p>
    </div>
  </div>
</template>
