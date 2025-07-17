<script setup lang="ts">
import { siteConfig } from '~~/config/siteConfig'
</script>

<template>
  <nuxt-img
    src="/logo.png"
    preload
    :alt="`${siteConfig.name} Logo`"
  />
</template>
