<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => ([
  {
    content: t('components.faq.whatAreZymes.answer'),
    icon: 'i-lucide-sparkles',
    label: t('components.faq.whatAreZymes.question'),
  },
  {
    content: t('components.faq.howDoesItWork.answer'),
    icon: 'i-lucide-cpu',
    label: t('components.faq.howDoesItWork.question'),
  },
  {
    content: t('components.faq.supportedFormats.answer'),
    icon: 'i-lucide-file-text',
    label: t('components.faq.supportedFormats.question'),
  },
  {
    content: t('components.faq.processingTime.answer'),
    icon: 'i-lucide-clock',
    label: t('components.faq.processingTime.question'),
  },
  {
    content: t('components.faq.dataSecurity.answer'),
    icon: 'i-lucide-shield-check',
    label: t('components.faq.dataSecurity.question'),
  },
  {
    content: t('components.faq.pricing.answer'),
    icon: 'i-lucide-dollar-sign',
    label: t('components.faq.pricing.question'),
  },
  {
    content: t('components.faq.collaboration.answer'),
    icon: 'i-lucide-users',
    label: t('components.faq.collaboration.question'),
  },
  {
    content: t('components.faq.export.answer'),
    icon: 'i-lucide-download',
    label: t('components.faq.export.question'),
  },
  {
    content: t('components.faq.customization.answer'),
    icon: 'i-lucide-palette',
    label: t('components.faq.customization.question'),
  },
  {
    content: t('components.faq.support.answer'),
    icon: 'i-lucide-headphones',
    label: t('components.faq.support.question'),
  },
]))
</script>

<template>
  <UPageAccordion
    :items="items"
    type="multiple"
  />
</template>
