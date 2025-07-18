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
            Privacy Policy
          </h1>
          <p class="text-gray-400">
            Last updated: January 18, 2025
          </p>
        </div>

        <div class="prose prose-invert max-w-none">
          <div class="bg-gray-800/30 rounded-lg p-8 space-y-6">
            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                Your Privacy Matters
              </h2>
              <p class="text-gray-300">
                At TimeZyme, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                Information We Collect
              </h2>
              <div class="space-y-4">
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-cyan-300">
                    Personal Information
                  </h3>
                  <p class="text-gray-300">
                    We may collect personal information that you voluntarily provide to us when you register on the platform, including:
                  </p>
                  <ul class="list-disc list-inside text-gray-300 space-y-1 ml-4 mt-2">
                    <li>Name and email address</li>
                    <li>Account credentials</li>
                    <li>Payment information</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-2 text-cyan-300">
                    Usage Data
                  </h3>
                  <p class="text-gray-300">
                    We automatically collect certain information when you visit, use, or navigate our platform:
                  </p>
                  <ul class="list-disc list-inside text-gray-300 space-y-1 ml-4 mt-2">
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                    <li>Pages visited and features used</li>
                    <li>Time spent on the platform</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                How We Use Your Information
              </h2>
              <p class="text-gray-300 mb-3">
                We use the information we collect to:
              </p>
              <ul class="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Provide and maintain our service</li>
                <li>Process your transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent security incidents</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                Data Security
              </h2>
              <p class="text-gray-300">
                We implement appropriate technical and organizational security measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                Your Rights
              </h2>
              <p class="text-gray-300 mb-3">
                You have the right to:
              </p>
              <ul class="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-bold mb-4 text-cyan-400">
                Contact Us
              </h2>
              <p class="text-gray-300">
                If you have questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@timezyme.com.
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
