<script setup lang="ts">
const { t } = useI18n()

function scrollToWaitlist () {
  const waitlistSection = document.getElementById('waitlist')
  waitlistSection?.scrollIntoView({ behavior: 'smooth' })
}

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

        <!-- CTA Button -->
        <div class="pt-8">
          <button
            class="gradient-btn text-white font-semibold px-8 py-4 rounded-lg text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
            @click="scrollToWaitlist"
          >
            <i class="i-lucide-sparkles" />
            Join Waitlist
          </button>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <UPageSection
      :title="t('pages.home.pricingSection.title')"
      :description="t('pages.home.pricingSection.description')"
      icon="i-lucide-credit-card"
    >
      <ClientOnly>
        <PricingPlans />
        <template #fallback>
          <USkeleton class="h-[500px]" />
        </template>
      </ClientOnly>
    </UPageSection>

    <!-- FAQ Section -->
    <UPageSection
      :title="t('pages.home.faqSection.title')"
      :description="t('pages.home.faqSection.description')"
      icon="i-lucide-shield-question"
    >
      <FAQ />
    </UPageSection>

    <!-- Waitlist Section -->
    <UPageSection
      id="waitlist"
      :title="t('pages.home.waitlistSection.title')"
      :description="t('pages.home.waitlistSection.description')"
      icon="i-lucide-key"
    >
      <template #links>
        <WaitlistForm />
      </template>
    </UPageSection>
  </div>
</template>
