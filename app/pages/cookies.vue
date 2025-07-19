<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const lastUpdated = new Date('2024-01-15').toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const cookiePreferences = ref({
  analytics: false,
  functional: false,
  marketing: false,
  necessary: true,
})

function savePreferences () {
  // TODO: Implement cookie preference saving
  // Saving preferences: cookiePreferences.value
}
</script>

<template>
  <div class="min-h-screen">
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-4 mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Manage Cookie Preferences
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Control how TimeZyme uses cookies to enhance your experience
          </p>
          <p class="text-sm text-gray-500">
            Last updated: {{ lastUpdated }}
          </p>
        </div>

        <div class="space-y-12">
          <!-- Introduction -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <UIcon
                name="i-lucide-cookie"
                class="text-4xl text-primary"
              />
            </div>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
              At TimeZyme, we use cookies and similar technologies to deliver, protect, and improve our Services.
              This page gives you control over your preferences and provides detailed information about how we use these technologies.
            </p>
            <p class="text-gray-300 mt-4">
              Your choices will be saved and applied to this browser and device. For more detailed information on our data practices,
              please see our <NuxtLink
                to="/privacy"
                class="text-primary hover:underline"
              >
                Privacy Policy
              </NuxtLink>.
            </p>
          </div>

          <!-- Cookie Preferences Section -->
          <div>
            <h2 class="text-2xl font-bold mb-6 gradient-text text-center">
              Your Cookie Preferences
            </h2>
            <p class="text-gray-400 text-center mb-8">
              Control how TimeZyme uses cookies to enhance your experience.
            </p>

            <div class="space-y-6">
              <!-- Necessary Cookies -->
              <div class="bg-gray-800/30 rounded-lg p-8">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2 text-primary">
                      Necessary Cookies
                    </h3>
                    <p class="text-gray-300">
                      These cookies are essential for the website to function properly and cannot be switched off in our systems.
                      They are usually only set in response to actions made by you which amount to a request for services,
                      such as setting your privacy preferences, logging in, or filling in forms. They also help with security
                      and basic site functionality.
                    </p>
                  </div>
                  <UToggle
                    v-model="cookiePreferences.necessary"
                    disabled
                    color="primary"
                    class="ml-4"
                  />
                </div>
                <p class="text-sm text-gray-500">
                  Status: Always enabled
                </p>
              </div>

              <!-- Analytics Cookies -->
              <div class="bg-gray-800/30 rounded-lg p-8">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2 text-primary">
                      Analytics Cookies
                    </h3>
                    <p class="text-gray-300">
                      These cookies allow us to count visits and traffic sources so we can measure and improve the performance
                      of our site. They help us understand which pages are the most and least popular, see how visitors move
                      around the site, and identify performance issues. All information these cookies collect is aggregated
                      and therefore anonymous. If you do not allow these cookies, we will not know when you have visited
                      our site and will not be able to monitor its performance.
                    </p>
                  </div>
                  <UToggle
                    v-model="cookiePreferences.analytics"
                    color="primary"
                    class="ml-4"
                  />
                </div>
              </div>

              <!-- Functional Cookies -->
              <div class="bg-gray-800/30 rounded-lg p-8">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2 text-primary">
                      Functional Cookies
                    </h3>
                    <p class="text-gray-300">
                      These cookies enable the website to provide enhanced functionality and personalization. They may be
                      set by us or by third-party providers whose services we have added to our pages (e.g., a customer
                      support chat widget). If you do not allow these cookies, then some or all of these services may
                      not function properly.
                    </p>
                  </div>
                  <UToggle
                    v-model="cookiePreferences.functional"
                    color="primary"
                    class="ml-4"
                  />
                </div>
              </div>

              <!-- Marketing Cookies -->
              <div class="bg-gray-800/30 rounded-lg p-8">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h3 class="text-xl font-bold mb-2 text-primary">
                      Marketing Cookies
                    </h3>
                    <p class="text-gray-300">
                      These cookies may be set through our site by our advertising partners. They may be used by those
                      companies to build a profile of your interests and show you relevant advertisements on other sites.
                      They do not store directly personal information but are based on uniquely identifying your browser
                      and internet device. If you do not allow these cookies, you will experience less targeted advertising
                      related to TimeZyme's services.
                    </p>
                  </div>
                  <UToggle
                    v-model="cookiePreferences.marketing"
                    color="primary"
                    class="ml-4"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- What Are Cookies Section -->
          <div class="bg-gray-800/30 rounded-lg p-8">
            <h2 class="text-2xl font-bold mb-4 gradient-text">
              What Are Cookies?
            </h2>
            <p class="text-gray-300 mb-4">
              Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you
              visit a website. They are widely used to make websites work, or work more efficiently, as well as to
              provide information to the owners of the site.
            </p>
            <p class="text-gray-300 mb-6">
              Cookies help us remember information about your visit, which can make your next visit easier and the
              site more useful to you. Here are the main types of cookies we use:
            </p>
            <div class="space-y-4 ml-4">
              <div>
                <h3 class="text-lg font-semibold text-primary mb-2">
                  First-party vs. Third-party Cookies
                </h3>
                <p class="text-gray-300">
                  First-party cookies are set by TimeZyme directly. Third-party cookies are set by our partners
                  and service providers, such as analytics or advertising networks.
                </p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-primary mb-2">
                  Session vs. Persistent Cookies
                </h3>
                <p class="text-gray-300">
                  Session cookies are temporary and expire once you close your browser. Persistent cookies remain
                  on your device for a set period or until you delete them. They are used to remember your
                  preferences for subsequent visits.
                </p>
              </div>
            </div>
          </div>

          <!-- Browser Cookie Management -->
          <div class="bg-gray-800/30 rounded-lg p-8">
            <h2 class="text-2xl font-bold mb-4 gradient-text">
              How to Manage Cookies in Your Browser
            </h2>
            <p class="text-gray-300 mb-6">
              In addition to the controls on this page, you can manage cookies through your web browser's settings.
              You can set your browser to block or alert you about these cookies, but please be aware that some
              parts of the site will not work if you do.
            </p>
            <p class="text-gray-300 mb-4">
              Find out how to manage cookies on popular browsers:
            </p>
            <ul class="space-y-3 ml-4">
              <li class="flex items-center">
                <UIcon
                  name="i-lucide-external-link"
                  class="text-primary mr-3"
                />
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li class="flex items-center">
                <UIcon
                  name="i-lucide-external-link"
                  class="text-primary mr-3"
                />
                <a
                  href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li class="flex items-center">
                <UIcon
                  name="i-lucide-external-link"
                  class="text-primary mr-3"
                />
                <a
                  href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
              <li class="flex items-center">
                <UIcon
                  name="i-lucide-external-link"
                  class="text-primary mr-3"
                />
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:underline"
                >
                  Apple Safari
                </a>
              </li>
            </ul>
          </div>

          <!-- Changes Section -->
          <div class="bg-gray-800/30 rounded-lg p-8">
            <h2 class="text-2xl font-bold mb-4 gradient-text">
              Changes to Our Use of Cookies
            </h2>
            <p class="text-gray-300">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation,
              or our data practices. Any changes will be posted on this page, so we encourage you to review it
              periodically.
            </p>
          </div>

          <!-- Contact Section -->
          <div class="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-8">
            <h2 class="text-2xl font-bold mb-4">
              Contact Us
            </h2>
            <p class="text-gray-300 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div class="space-y-3 text-gray-300">
              <div class="flex items-center">
                <UIcon
                  name="i-lucide-mail"
                  class="text-primary mr-3"
                />
                <span>Email: <a
                  href="mailto:privacy@timezyme.com"
                  class="text-primary hover:underline"
                >privacy@timezyme.com</a></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 justify-center mt-12">
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
          <UButton
            to="/privacy"
            variant="outline"
            color="primary"
            size="lg"
            icon="i-lucide-shield"
            trailing
          >
            Privacy Policy
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
