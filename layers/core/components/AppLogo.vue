<script setup lang="ts">
interface Props {
  linkTextClass?: string
  showAppName?: boolean
}

withDefaults(defineProps<Props>(), {
  linkTextClass: 'text-lg',
  showAppName: true,
})
</script>

<template>
  <ULink
    to="/"
    class="flex items-center gap-2 font-bold text-(--ui-text-highlighted)"
    :class="[linkTextClass]"
  >
    <Logo class="w-auto h-6 shrink-0" /> <span v-if="showAppName">{{ $t('general.name') }}</span>
  </ULink>
</template>
