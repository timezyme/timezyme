<script setup lang="ts">
const { t } = useI18n()

const title = computed(() => t('pages.contact.title'))
const description = computed(() => t('pages.contact.description'))

useSeoMeta({
  description,
  title,
})

defineOgImageComponent('OgImageTemplate')
</script>

<template>
  <UPage>
    <UPageBody>
      <div class="max-w-2xl mx-auto py-8 sm:py-12 lg:py-16">
        <div class="text-center mb-8 sm:mb-12">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {{ title }}
          </h1>
          <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            {{ description || 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.' }}
          </p>
        </div>

        <UCard class="backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
          <ContactForm />
        </UCard>

        <!-- Screen reader announcements -->
        <div
          aria-live="polite"
          aria-atomic="true"
          class="sr-only"
        >
          <!-- Toast notifications will be announced here -->
        </div>

        <div class="mt-12 text-center">
          <div class="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-clock"
                class="w-4 h-4"
              />
              <span>Usually responds within 24 hours</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-shield-check"
                class="w-4 h-4"
              />
              <span>Your data is secure</span>
            </div>
          </div>
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
