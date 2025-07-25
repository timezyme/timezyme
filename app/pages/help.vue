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

        <!-- Coming Soon Notice -->
        <UAlert
          class="mb-8"
          color="primary"
          variant="soft"
          icon="i-lucide-clock"
          title="Coming Soon"
          description="The features below are currently in development. Stay tuned for exciting updates!"
        />

        <!-- Help Cards Grid -->
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Getting Started Card -->
          <UCard class="opacity-75">
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
              <div class="flex items-center gap-2 text-gray-500 text-sm">
                <span>Interactive demo</span>
                <UBadge
                  color="neutral"
                  variant="subtle"
                  size="xs"
                >
                  Coming Soon
                </UBadge>
              </div>
            </div>
          </UCard>

          <!-- Research Academy Card -->
          <UCard class="opacity-75">
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
              <div class="flex items-center gap-2 text-gray-500 text-sm">
                <span>Educational resources</span>
                <UBadge
                  color="neutral"
                  variant="subtle"
                  size="xs"
                >
                  Coming Soon
                </UBadge>
              </div>
            </div>
          </UCard>

          <!-- Features Roadmap Card -->
          <UCard class="opacity-75">
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
              <div class="flex items-center gap-2 text-gray-500 text-sm">
                <span>Interactive timeline</span>
                <UBadge
                  color="neutral"
                  variant="subtle"
                  size="xs"
                >
                  Coming Soon
                </UBadge>
              </div>
            </div>
          </UCard>

          <!-- Connect & Community Card -->
          <UCard class="opacity-75">
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
              <div class="flex items-center gap-2 text-gray-500 text-sm">
                <span>Get involved</span>
                <UBadge
                  color="neutral"
                  variant="subtle"
                  size="xs"
                >
                  Coming Soon
                </UBadge>
              </div>
            </div>
          </UCard>
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
