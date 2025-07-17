<script setup lang="ts">
import { Button, Row } from '@vue-email/components'

interface Props {
  href: string
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

const colors = {
  primary: '#FC8907',
  primaryForeground: 'black',
}
</script>

<template>
  <Row>
    <Button
      :href="props.href"
      :style="{
        backgroundColor: colors.primary,
        color: colors.primaryForeground,
        borderRadius: '10px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '8px',
        paddingBottom: '8px',
      }"
      v-bind="$attrs"
    >
      <slot />
    </Button>
  </Row>
</template>
