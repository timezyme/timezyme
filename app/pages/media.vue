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
                name="i-lucide-newspaper"
                class="text-4xl text-cyan-400"
              />
            </div>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Media Inquiries
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Get in touch with our press team for media requests and partnerships
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div class="bg-gray-800/30 rounded-lg p-6 border border-gray-800">
            <UIcon
              name="i-lucide-mail"
              class="text-3xl text-cyan-400 mb-4"
            />
            <h3 class="text-xl font-bold mb-2">
              Press Contact
            </h3>
            <p class="text-gray-300 mb-2">
              For media inquiries and press releases:
            </p>
            <a
              href="mailto:press@timezyme.com"
              class="text-cyan-400 hover:text-cyan-300"
            >
              press@timezyme.com
            </a>
          </div>

          <div class="bg-gray-800/30 rounded-lg p-6 border border-gray-800">
            <UIcon
              name="i-lucide-users"
              class="text-3xl text-cyan-400 mb-4"
            />
            <h3 class="text-xl font-bold mb-2">
              Partnerships
            </h3>
            <p class="text-gray-300 mb-2">
              For partnership opportunities:
            </p>
            <a
              href="mailto:partnerships@timezyme.com"
              class="text-cyan-400 hover:text-cyan-300"
            >
              partnerships@timezyme.com
            </a>
          </div>
        </div>

        <div class="bg-gray-800/30 rounded-lg p-6">
          <h3 class="text-xl font-bold mb-4">
            Quick Facts
          </h3>
          <dl class="space-y-3">
            <div class="flex justify-between">
              <dt class="text-gray-400">
                Founded
              </dt>
              <dd class="text-white font-medium">
                2024
              </dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-400">
                Headquarters
              </dt>
              <dd class="text-white font-medium">
                Plano, TX
              </dd>
            </div>
          </dl>
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
