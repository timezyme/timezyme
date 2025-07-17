<script setup lang="ts">
const { t } = useI18n()

const title = computed(() => t('pages.legal.terms.title'))
const description = computed(() => t('pages.legal.terms.description'))

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
    Platzhalter für deine terms of service.
  </AppPageContainer>
</template>
