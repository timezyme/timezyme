<script setup lang="ts">
import { Img, Section } from '@vue-email/components'
import { siteConfig } from '~~/config/siteConfig'
</script>

<template>
  <Section class="mt-4">
    <Img
      width="100"
      :src="siteConfig.logoWithTextUrl"
      class="my-0"
    />
  </Section>
</template>
