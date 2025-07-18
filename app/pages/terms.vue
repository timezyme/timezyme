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
            Terms of Service
          </h1>
          <p class="text-gray-400">
            Last updated: January 18, 2025
          </p>
        </div>

        <div class="prose prose-invert max-w-none">
          <div class="bg-gray-800/30 rounded-lg p-8 space-y-6">
            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                1. Acceptance of Terms
              </h2>
              <p class="text-gray-300">
                By accessing and using TimeZyme, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                2. Use License
              </h2>
              <p class="text-gray-300 mb-3">
                Permission is granted to temporarily use TimeZyme for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul class="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on TimeZyme</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                3. Privacy Policy
              </h2>
              <p class="text-gray-300">
                Your use of TimeZyme is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the Site and informs users of our data collection practices.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                4. Disclaimer
              </h2>
              <p class="text-gray-300">
                The materials on TimeZyme are provided on an 'as is' basis. TimeZyme makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                5. Limitations
              </h2>
              <p class="text-gray-300">
                In no event shall TimeZyme or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use TimeZyme, even if TimeZyme or a TimeZyme authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                6. Contact Information
              </h2>
              <p class="text-gray-300">
                If you have any questions about these Terms of Service, please contact us at legal@timezyme.com.
              </p>
            </section>
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
