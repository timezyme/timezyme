<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
</script>

<template>
  <div class="min-h-screen">
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-6">
          <UIcon
            name="i-lucide-briefcase"
            class="w-16 h-16 text-cyan-400 mx-auto"
          />
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Careers at TimeZyme
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            We're preparing exciting opportunities for talented individuals to join our mission of revolutionizing how the world consumes information.
          </p>
          <div class="pt-8 pb-4">
            <div class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 rounded-full border border-cyan-500/30">
              <UIcon
                name="i-lucide-clock"
                class="w-5 h-5 text-cyan-400"
              />
              <span class="text-2xl font-semibold text-cyan-400">Coming Soon</span>
            </div>
          </div>
          <p class="text-gray-400 text-lg pt-4">
            Check back soon or follow us for updates on new positions.
          </p>
          <div class="pt-8">
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
      </div>
    </UContainer>
  </div>
</template>
