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
            class="rounded-full font-semibold bg-gradient-to-r from-cyan-600 to-cyan-500"
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
            <div class="flex items-center justify-center gap-2 text-cyan-400">
              <i class="i-lucide-key text-2xl" />
              <h3 class="text-3xl font-bold text-white">
                {{ t('pages.home.waitlistSection.title') }}
              </h3>
            </div>
            <p class="text-gray-400">
              {{ t('pages.home.waitlistSection.description') }}
            </p>
          </div>
          <div class="flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>

    <!-- Business Description Section -->
    <section class="py-20 px-4 bg-gray-900/50">
      <UContainer class="max-w-5xl">
        <div class="text-center space-y-6">
          <h2 class="text-3xl md:text-4xl font-bold text-white">
            Transforming Document Intelligence
          </h2>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto">
            TimeZyme is an AI-powered document transformation platform that converts complex professional documents into interactive, visual knowledge maps. We're revolutionizing how legal, financial, healthcare, and research professionals interact with dense information.
          </p>
        </div>

        <!-- Industry Context -->
        <div class="grid md:grid-cols-3 gap-8 mt-16">
          <div class="text-center space-y-4">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-full">
              <UIcon
                name="i-lucide-clock"
                class="text-2xl text-cyan-400"
              />
            </div>
            <h3 class="text-xl font-semibold text-white">
              The Problem
            </h3>
            <p class="text-gray-400">
              Professionals waste 20% of their time searching through and reading dense documents, missing critical insights in walls of text.
            </p>
          </div>

          <div class="text-center space-y-4">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-full">
              <UIcon
                name="i-lucide-sparkles"
                class="text-2xl text-cyan-400"
              />
            </div>
            <h3 class="text-xl font-semibold text-white">
              Our Solution
            </h3>
            <p class="text-gray-400">
              AI-powered visual transformation that reduces reading time by 75% while improving comprehension through interactive knowledge graphs.
            </p>
          </div>

          <div class="text-center space-y-4">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/10 rounded-full">
              <UIcon
                name="i-lucide-building"
                class="text-2xl text-cyan-400"
              />
            </div>
            <h3 class="text-xl font-semibold text-white">
              Market Opportunity
            </h3>
            <p class="text-gray-400">
              The $50B+ enterprise document processing market is ripe for disruption with our graph-native knowledge platform.
            </p>
          </div>
        </div>

        <!-- Target Industries -->
        <div class="mt-20">
          <h3 class="text-2xl font-bold text-center text-white mb-8">
            Serving Knowledge-Intensive Industries
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-800/30 rounded-lg p-4 text-center">
              <UIcon
                name="i-lucide-scale"
                class="text-2xl text-cyan-400 mb-2"
              />
              <p class="text-sm text-gray-300">
                Legal & Compliance
              </p>
            </div>
            <div class="bg-gray-800/30 rounded-lg p-4 text-center">
              <UIcon
                name="i-lucide-trending-up"
                class="text-2xl text-cyan-400 mb-2"
              />
              <p class="text-sm text-gray-300">
                Financial Services
              </p>
            </div>
            <div class="bg-gray-800/30 rounded-lg p-4 text-center">
              <UIcon
                name="i-lucide-heart-pulse"
                class="text-2xl text-cyan-400 mb-2"
              />
              <p class="text-sm text-gray-300">
                Healthcare & Life Sciences
              </p>
            </div>
            <div class="bg-gray-800/30 rounded-lg p-4 text-center">
              <UIcon
                name="i-lucide-microscope"
                class="text-2xl text-cyan-400 mb-2"
              />
              <p class="text-sm text-gray-300">
                Research & Academia
              </p>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Product & Development Stage Section -->
    <section class="py-20 px-4">
      <UContainer class="max-w-5xl">
        <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 md:p-12">
          <div class="text-center space-y-6">
            <h2 class="text-3xl font-bold text-white">
              Product Overview
            </h2>
            <div class="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
              <UIcon
                name="i-lucide-rocket"
                class="text-lg"
              />
              <span class="font-semibold">Development Stage: MVP Complete, Beta Launch Q1 2026</span>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8 mt-10">
            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-white">
                What We Build
              </h3>
              <ul class="space-y-3 text-gray-300">
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-cyan-400 mt-0.5 flex-shrink-0"
                  />
                  <span><strong>Zymes:</strong> Interactive visual representations of documents with multiple view types (timeline, mind map, spatial)</span>
                </li>
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-cyan-400 mt-0.5 flex-shrink-0"
                  />
                  <span><strong>Knowledge Graph:</strong> Connected insights across your entire document library</span>
                </li>
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-cyan-400 mt-0.5 flex-shrink-0"
                  />
                  <span><strong>AI Concierge:</strong> Proactive recommendations based on your reading patterns</span>
                </li>
              </ul>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-white">
                Key Features
              </h3>
              <ul class="space-y-3 text-gray-300">
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-layers"
                    class="text-cyan-400 mt-0.5 flex-shrink-0"
                  />
                  <span>Progressive disclosure layers (L0-L3) for depth control</span>
                </li>
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-zap"
                    class="text-cyan-400 mt-0.5 flex-shrink-0"
                  />
                  <span>75% faster than traditional reading</span>
                </li>
                <li class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-shield"
                    class="text-cyan-400 mt-0.5 flex-shrink-0"
                  />
                  <span>Enterprise-grade security and compliance</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="text-center mt-10 space-x-4">
            <UButton
              to="/about"
              variant="outline"
              color="primary"
              size="lg"
            >
              Learn More About TimeZyme
            </UButton>
            <UButton
              to="/playbook"
              variant="solid"
              color="primary"
              size="lg"
            >
              See How It Works
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Product Showcase Section -->
    <ProductShowcase />
  </div>
</template>
