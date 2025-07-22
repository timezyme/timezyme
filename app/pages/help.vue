<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
</script>

<template>
  <div class="min-h-screen">
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center space-y-4 mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Help Center
          </h1>
          <p class="text-xl text-gray-400">
            Find answers to your questions about TimeZyme
          </p>
        </div>

        <!-- Help Cards Grid -->
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Getting Started Card -->
          <UCard class="hover:bg-gray-800/50 transition-all hover:scale-[1.02]">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-cyan-500/10 rounded-lg">
                  <UIcon
                    name="i-lucide-rocket"
                    class="text-2xl text-cyan-400"
                  />
                </div>
                <h3 class="text-lg font-semibold">
                  Product Tour
                </h3>
              </div>
              <p class="text-gray-400">
                Experience the magic of TimeZyme - see how we transform complex documents into interactive visual stories
              </p>
              <div class="flex items-center gap-2 text-cyan-400 text-sm">
                <span>Interactive demo</span>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="text-xs"
                />
              </div>
            </div>
          </UCard>

          <!-- Research Academy Card -->
          <UCard class="hover:bg-gray-800/50 transition-all hover:scale-[1.02]">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-cyan-500/10 rounded-lg">
                  <UIcon
                    name="i-lucide-graduation-cap"
                    class="text-2xl text-cyan-400"
                  />
                </div>
                <h3 class="text-lg font-semibold">
                  Research Academy
                </h3>
              </div>
              <p class="text-gray-400">
                Master effective research methods and learn why TimeZyme is your ultimate research companion
              </p>
              <div class="flex items-center gap-2 text-cyan-400 text-sm">
                <span>Educational resources</span>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="text-xs"
                />
              </div>
            </div>
          </UCard>

          <!-- Features Roadmap Card -->
          <UCard class="hover:bg-gray-800/50 transition-all hover:scale-[1.02]">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-cyan-500/10 rounded-lg">
                  <UIcon
                    name="i-lucide-map"
                    class="text-2xl text-cyan-400"
                  />
                </div>
                <h3 class="text-lg font-semibold">
                  Product Roadmap
                </h3>
              </div>
              <p class="text-gray-400">
                Explore our vision for the future - 100+ document types, AI-powered insights, and seamless integrations
              </p>
              <div class="flex items-center gap-2 text-cyan-400 text-sm">
                <span>Interactive timeline</span>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="text-xs"
                />
              </div>
            </div>
          </UCard>

          <!-- Connect & Community Card -->
          <UCard class="hover:bg-gray-800/50 transition-all hover:scale-[1.02]">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-cyan-500/10 rounded-lg">
                  <UIcon
                    name="i-lucide-users"
                    class="text-2xl text-cyan-400"
                  />
                </div>
                <h3 class="text-lg font-semibold">
                  Connect & Community
                </h3>
              </div>
              <p class="text-gray-400">
                Join our pilot program, explore partnerships, or get in touch with our team of experts
              </p>
              <div class="flex items-center gap-2 text-cyan-400 text-sm">
                <span>Get involved</span>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="text-xs"
                />
              </div>
            </div>
          </UCard>
        </div>

        <!-- Coming Soon Note -->
        <div class="mt-12 p-6 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
          <div class="flex items-center justify-center gap-3">
            <UIcon
              name="i-lucide-info"
              class="text-cyan-400 text-xl"
            />
            <p class="text-center text-gray-300">
              More detailed guides and resources coming soon! We're building comprehensive documentation to help you make the most of TimeZyme.
            </p>
          </div>
        </div>

        <!-- Back to Home -->
        <div class="text-center mt-12">
          <UButton
            to="/"
            variant="soft"
            color="primary"
            size="lg"
            icon="i-lucide-arrow-left"
          >
            Back to Home
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
