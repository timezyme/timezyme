<script setup lang="ts">
import { siteConfig } from '~~/config/siteConfig'

const colorMode = useColorMode()
const logoSrc = computed(() => {
  return colorMode.preference === 'dark' ? '/images/logo/logo-dark.png' : '/images/logo/logo-light.png'
})
</script>

<template>
  <nuxt-img
    :src="logoSrc"
    preload
    :alt="`${siteConfig.name} Logo`"
    class="h-12 w-auto"
  />
</template>
