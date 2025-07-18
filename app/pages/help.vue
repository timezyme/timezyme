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
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Help Center
          </h1>
          <p class="text-xl text-gray-400">
            Find answers to your questions about TimeZyme
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <UCard class="hover:bg-gray-800/50 transition-colors">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-cyan-500/10 rounded-lg">
                  <UIcon
                    name="i-lucide-book-open"
                    class="text-2xl text-cyan-400"
                  />
                </div>
                <h3 class="text-lg font-semibold">
                  Getting Started
                </h3>
              </div>
              <p class="text-gray-400">
                Learn the basics of transforming your documents into visual stories
              </p>
            </div>
          </UCard>

          <UCard class="hover:bg-gray-800/50 transition-colors">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-cyan-500/10 rounded-lg">
                  <UIcon
                    name="i-lucide-settings"
                    class="text-2xl text-cyan-400"
                  />
                </div>
                <h3 class="text-lg font-semibold">
                  Account Settings
                </h3>
              </div>
              <p class="text-gray-400">
                Manage your profile, subscriptions, and preferences
              </p>
            </div>
          </UCard>

          <UCard class="hover:bg-gray-800/50 transition-colors">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-cyan-500/10 rounded-lg">
                  <UIcon
                    name="i-lucide-zap"
                    class="text-2xl text-cyan-400"
                  />
                </div>
                <h3 class="text-lg font-semibold">
                  Features
                </h3>
              </div>
              <p class="text-gray-400">
                Explore all the powerful features TimeZyme has to offer
              </p>
            </div>
          </UCard>

          <UCard class="hover:bg-gray-800/50 transition-colors">
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-cyan-500/10 rounded-lg">
                  <UIcon
                    name="i-lucide-message-circle"
                    class="text-2xl text-cyan-400"
                  />
                </div>
                <h3 class="text-lg font-semibold">
                  Contact Support
                </h3>
              </div>
              <p class="text-gray-400">
                Can't find what you're looking for? Reach out to our team
              </p>
            </div>
          </UCard>
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
