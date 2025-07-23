<script setup lang="ts">
import { siteConfig } from '~~/config/siteConfig'

interface FooterLink {
  badge?: string
  label: string
  to: string
}

const quickLinks: Array<FooterLink> = [
  {
    label: 'Help Center',
    to: '/help',
  },
  {
    label: 'Playbook',
    to: '/playbook',
  },
]

const companyLinks: Array<FooterLink> = [
  {
    label: 'About us',
    to: '/about',
  },
  {
    label: 'Careers',
    to: '/careers',
  },
  {
    label: 'Terms of service',
    to: '/terms',
  },
  {
    label: 'Privacy policy',
    to: '/privacy',
  },
  {
    label: 'Manage Cookies',
    to: '/cookies',
  },
  {
    label: 'Media inquiries',
    to: '/media',
  },
  {
    label: 'Contact us',
    to: '/contact',
  },
]

function scrollToTop () {
  if (typeof window !== 'undefined') {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }
}

const socialLinks = [
  {
    icon: 'i-simple-icons-discord',
    label: 'Discord',
    to: siteConfig.socialMedia.discord?.url || '#',
  },
  {
    icon: 'i-simple-icons-x',
    label: 'X (Twitter)',
    to: siteConfig.socialMedia.x.url,
  },
  {
    icon: 'i-lucide-link',
    label: 'Website',
    to: siteConfig.url,
  },
]
</script>

<template>
  <footer class="bg-zinc-900 border-t border-zinc-800 mt-20">
    <UContainer>
      <div class="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Section - Logo and Social -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <Logo class="h-8" />
          </div>
          <p class="text-gray-400 text-sm max-w-xs">
            {{ siteConfig.description }}
          </p>
          <div class="flex gap-3 pt-2">
            <UButton
              v-for="social in socialLinks"
              :key="social.label"
              :icon="social.icon"
              :to="social.to"
              :aria-label="social.label"
              target="_blank"
              color="neutral"
              variant="ghost"
              size="sm"
            />
          </div>
        </div>

        <!-- Middle Section - Resources -->
        <div>
          <h3 class="font-semibold text-white mb-4">
            Resources
          </h3>
          <ul class="space-y-3">
            <li
              v-for="link in quickLinks"
              :key="link.label"
            >
              <ULink
                :to="link.to"
                class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                {{ link.label }}
                <span
                  v-if="link.badge === 'New'"
                  class="badge-new"
                >
                  New
                </span>
              </ULink>
            </li>
          </ul>
        </div>

        <!-- Right Section - Company -->
        <div>
          <h3 class="font-semibold text-white mb-4">
            Company
          </h3>
          <ul class="space-y-3">
            <li
              v-for="link in companyLinks"
              :key="link.label"
            >
              <ULink
                :to="link.to"
                class="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                {{ link.label }}
                <span
                  v-if="link.badge === 'Hiring'"
                  class="badge-hiring"
                >
                  Hiring
                </span>
              </ULink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="py-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-400">
          {{ $t('general.footer.copyright', { year: new Date().getFullYear() }) }}
        </p>
        <div class="flex items-center gap-4">
          <UColorModeButton size="sm" />
          <UButton
            icon="i-lucide-arrow-up"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="Back to top"
            @click="scrollToTop"
          />
        </div>
      </div>
    </UContainer>
  </footer>
</template>
