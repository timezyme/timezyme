<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: 'landing',
})

defineOgImageComponent('OgImageTemplate')
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <section class="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-20">
      <!-- Background Effects -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] purple-glow opacity-50" />
        <LazyStarsBg />
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div class="flex justify-center">
          <UBadge
            color="primary"
            variant="solid"
            size="lg"
            class="rounded-full font-semibold bg-gradient-to-r from-purple-600 to-purple-500"
          >
            <template #leading>
              <span class="text-yellow-300">✨</span>
            </template>
            Transform Reading into Understanding
          </UBadge>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold text-white">
          TimeZyme:
        </h1>
        <h2 class="text-4xl md:text-6xl font-bold">
          <span class="text-white">Unlock knowledge at </span>
          <span class="gradient-text">LightSpeed</span>
        </h2>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
          TimeZyme transforms any document into interactive visual stories.
        </p>

        <!-- Get Early Access Section -->
        <div class="pt-12 space-y-6">
          <div class="space-y-2">
            <div class="flex items-center justify-center gap-2 text-purple-400">
              <i class="i-lucide-key text-2xl" />
              <h3 class="text-3xl font-bold text-white">{{ t('pages.home.waitlistSection.title') }}</h3>
            </div>
            <p class="text-gray-400">{{ t('pages.home.waitlistSection.description') }}</p>
          </div>
          <div class="flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
