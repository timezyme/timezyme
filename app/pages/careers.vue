<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
</script>

<template>
  <div class="min-h-screen">
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-4 mb-12">
          <UBadge
            color="primary"
            variant="soft"
            size="lg"
            class="rounded-full mb-4"
          >
            We're Hiring!
          </UBadge>
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Join the TimeZyme Team
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Help us revolutionize how the world consumes information
          </p>
        </div>

        <div class="space-y-6">
          <div class="bg-gray-800/30 rounded-lg p-6 border border-gray-800 hover:border-cyan-500/50 transition-colors">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-xl font-bold mb-2">
                  Senior Frontend Engineer
                </h3>
                <p class="text-gray-400 mb-3">
                  Build beautiful, performant interfaces that delight users
                </p>
                <div class="flex gap-2">
                  <UBadge
                    variant="subtle"
                    color="primary"
                  >
                    Remote
                  </UBadge>
                  <UBadge
                    variant="subtle"
                    color="primary"
                  >
                    Full-time
                  </UBadge>
                  <UBadge
                    variant="subtle"
                    color="primary"
                  >
                    Vue.js
                  </UBadge>
                </div>
              </div>
              <UButton
                variant="soft"
                color="primary"
                icon="i-lucide-arrow-right"
              >
                Apply
              </UButton>
            </div>
          </div>

          <div class="bg-gray-800/30 rounded-lg p-6 border border-gray-800 hover:border-cyan-500/50 transition-colors">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-xl font-bold mb-2">
                  ML Engineer
                </h3>
                <p class="text-gray-400 mb-3">
                  Develop AI models that transform documents into visual stories
                </p>
                <div class="flex gap-2">
                  <UBadge
                    variant="subtle"
                    color="primary"
                  >
                    Remote
                  </UBadge>
                  <UBadge
                    variant="subtle"
                    color="primary"
                  >
                    Full-time
                  </UBadge>
                  <UBadge
                    variant="subtle"
                    color="primary"
                  >
                    Python
                  </UBadge>
                </div>
              </div>
              <UButton
                variant="soft"
                color="primary"
                icon="i-lucide-arrow-right"
              >
                Apply
              </UButton>
            </div>
          </div>

          <div class="bg-gray-800/30 rounded-lg p-6 border border-gray-800 hover:border-cyan-500/50 transition-colors">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-xl font-bold mb-2">
                  Product Designer
                </h3>
                <p class="text-gray-400 mb-3">
                  Create intuitive experiences for visual learning
                </p>
                <div class="flex gap-2">
                  <UBadge
                    variant="subtle"
                    color="primary"
                  >
                    Hybrid
                  </UBadge>
                  <UBadge
                    variant="subtle"
                    color="primary"
                  >
                    Full-time
                  </UBadge>
                  <UBadge
                    variant="subtle"
                    color="primary"
                  >
                    Figma
                  </UBadge>
                </div>
              </div>
              <UButton
                variant="soft"
                color="primary"
                icon="i-lucide-arrow-right"
              >
                Apply
              </UButton>
            </div>
          </div>
        </div>

        <div class="mt-12 p-8 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-lg border border-cyan-500/20">
          <h3 class="text-2xl font-bold mb-4">
            Why TimeZyme?
          </h3>
          <div class="grid md:grid-cols-2 gap-4 text-gray-300">
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-check"
                class="text-cyan-400 mt-1"
              />
              <span>Competitive salary & equity</span>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-check"
                class="text-cyan-400 mt-1"
              />
              <span>Flexible work arrangements</span>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-check"
                class="text-cyan-400 mt-1"
              />
              <span>Health, dental & vision coverage</span>
            </div>
            <div class="flex items-start gap-3">
              <UIcon
                name="i-lucide-check"
                class="text-cyan-400 mt-1"
              />
              <span>Learning & development budget</span>
            </div>
          </div>
        </div>

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
