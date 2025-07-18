<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const cookiePreferences = ref({
  analytics: false,
  marketing: false,
  necessary: true,
})

function savePreferences () {
  // Placeholder for saving preferences
  // TODO: Implement cookie preference saving
}
</script>

<template>
  <div class="min-h-screen">
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-4 mb-12">
          <div class="flex justify-center mb-4">
            <div class="p-3 bg-cyan-500/10 rounded-full">
              <UIcon
                name="i-lucide-cookie"
                class="text-4xl text-cyan-400"
              />
            </div>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Manage Cookie Preferences
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Control how TimeZyme uses cookies to enhance your experience
          </p>
        </div>

        <div class="space-y-6">
          <div class="bg-gray-800/30 rounded-lg p-6 border border-gray-800">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-bold mb-2">
                  Necessary Cookies
                </h3>
                <p class="text-gray-400">
                  Essential for the website to function properly. These cookies ensure basic functionalities and security features.
                </p>
              </div>
              <UToggle
                v-model="cookiePreferences.necessary"
                disabled
                color="primary"
              />
            </div>
            <p class="text-sm text-gray-500">
              Always enabled
            </p>
          </div>

          <div class="bg-gray-800/30 rounded-lg p-6 border border-gray-800">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-xl font-bold mb-2">
                  Analytics Cookies
                </h3>
                <p class="text-gray-400">
                  Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
              </div>
              <UToggle
                v-model="cookiePreferences.analytics"
                color="primary"
              />
            </div>
          </div>

          <div class="bg-gray-800/30 rounded-lg p-6 border border-gray-800">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-xl font-bold mb-2">
                  Marketing Cookies
                </h3>
                <p class="text-gray-400">
                  Used to track visitors across websites to display ads that are relevant and engaging for individual users.
                </p>
              </div>
              <UToggle
                v-model="cookiePreferences.marketing"
                color="primary"
              />
            </div>
          </div>
        </div>

        <div class="mt-8 p-6 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
          <h3 class="text-lg font-semibold mb-2">
            What are cookies?
          </h3>
          <p class="text-gray-300">
            Cookies are small text files that are placed on your device when you visit a website. They help the website remember information about your visit, which can make your next visit easier and the site more useful to you.
          </p>
        </div>

        <div class="flex gap-4 justify-center mt-8">
          <UButton
            color="primary"
            size="lg"
            @click="savePreferences"
          >
            Save Preferences
          </UButton>
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
