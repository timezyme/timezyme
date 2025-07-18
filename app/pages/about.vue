<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
</script>

<template>
  <div class="min-h-screen">
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-4 mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            About TimeZyme
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Revolutionizing how people consume and understand information
          </p>
        </div>

        <div class="space-y-12">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/10 rounded-full mb-6">
              <UIcon
                name="i-lucide-sparkles"
                class="text-4xl text-cyan-400"
              />
            </div>
            <h2 class="text-3xl font-bold mb-4 gradient-text">
              Our Mission
            </h2>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
              At TimeZyme, we believe that every document tells a story. Our mission is to transform static content into dynamic, interactive visual experiences that enhance understanding and retention.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 mt-16">
            <div class="text-center">
              <div class="text-4xl font-bold text-cyan-400 mb-2">
                10x
              </div>
              <div class="text-gray-400">
                Faster Reading
              </div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-cyan-400 mb-2">
                85%
              </div>
              <div class="text-gray-400">
                Better Retention
              </div>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-cyan-400 mb-2">
                ∞
              </div>
              <div class="text-gray-400">
                Possibilities
              </div>
            </div>
          </div>

          <div class="bg-gray-800/30 rounded-lg p-8 mt-12">
            <h3 class="text-2xl font-bold mb-4">
              Our Story
            </h3>
            <p class="text-gray-300 mb-4">
              TimeZyme was born from a simple observation: in our fast-paced world, traditional reading methods can't keep up with the volume of information we need to process daily.
            </p>
            <p class="text-gray-300">
              We set out to create a solution that doesn't just make reading faster, but makes it more engaging, memorable, and enjoyable. By transforming documents into visual stories, we're helping people unlock knowledge at the speed of thought.
            </p>
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
