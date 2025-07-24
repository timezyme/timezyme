<script setup lang="ts">
import { Img, Section } from '@vue-email/components'
import { siteConfig } from '~~/config/siteConfig'

interface Props {
  logoUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  logoUrl: siteConfig.logoWithTextUrl,
})
</script>

<template>
  <Section class="mt-4">
    <Img
      width="100"
      :src="props.logoUrl"
      class="my-0"
    />
  </Section>
</template>
