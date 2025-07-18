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
          <div class="flex justify-center mb-4">
            <div class="p-3 bg-cyan-500/10 rounded-full">
              <UIcon
                name="i-lucide-book"
                class="text-4xl text-cyan-400"
              />
            </div>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            The TimeZyme Playbook
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Master the art of transforming documents into engaging visual experiences
          </p>
        </div>

        <div class="space-y-8">
          <div class="bg-gray-800/30 rounded-lg p-8 border border-gray-800">
            <h2 class="text-2xl font-bold mb-4 text-cyan-400">
              Chapter 1: Getting Started
            </h2>
            <p class="text-gray-300 mb-4">
              Learn the fundamentals of TimeZyme and how to create your first visual story.
            </p>
            <UButton
              variant="ghost"
              color="primary"
              icon="i-lucide-arrow-right"
              trailing
            >
              Read More
            </UButton>
          </div>

          <div class="bg-gray-800/30 rounded-lg p-8 border border-gray-800">
            <h2 class="text-2xl font-bold mb-4 text-cyan-400">
              Chapter 2: Advanced Techniques
            </h2>
            <p class="text-gray-300 mb-4">
              Discover advanced features and techniques to create more engaging content.
            </p>
            <UButton
              variant="ghost"
              color="primary"
              icon="i-lucide-arrow-right"
              trailing
            >
              Read More
            </UButton>
          </div>

          <div class="bg-gray-800/30 rounded-lg p-8 border border-gray-800">
            <h2 class="text-2xl font-bold mb-4 text-cyan-400">
              Chapter 3: Best Practices
            </h2>
            <p class="text-gray-300 mb-4">
              Learn from the experts and follow industry best practices for visual storytelling.
            </p>
            <UButton
              variant="ghost"
              color="primary"
              icon="i-lucide-arrow-right"
              trailing
            >
              Read More
            </UButton>
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
