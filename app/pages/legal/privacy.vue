<script setup lang="ts">
const { t } = useI18n()

const title = computed(() => t('pages.legal.privacy.title'))
const description = computed(() => t('pages.legal.privacy.description'))

useSeoMeta({
  description,
  title,
})

defineOgImageComponent('OgImageTemplate')
</script>

<template>
  <AppPageContainer
    :title="title"
    :description="description"
  >
    This is a placeholder text for your privacy policy.
  </AppPageContainer>
</template>
