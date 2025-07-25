<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { siteConfig } from '~~/config/siteConfig'

const navigation = inject<Ref<Array<ContentNavigationItem>>>('navigationDocs', ref([]))

const { t } = useI18n()
const { loggedIn } = useUserSession()
const route = useRoute()
const { isEnabled: isAuthEnabled } = useAuthFeature()

const isDashboardRoute = computed(() => route.path.startsWith('/dashboard'))

const links = computed(() => {
  const baseLinks = [
    {
      icon: 'i-lucide-info',
      label: t('general.links.about') || 'About',
      to: '/about',
    },
    {
      icon: 'i-lucide-sparkles',
      label: 'Product Story',
      to: '/story',
    },
    {
      icon: 'i-lucide-book',
      label: t('general.links.docs'),
      to: '/docs',
    },
    {
      icon: 'i-lucide-shield-question',
      label: t('general.links.faq'),
      to: '/faq',
    },
  ]

  if (isAuthEnabled.value) {
    baseLinks.push({
      icon: 'i-lucide-credit-card',
      label: t('general.links.pricing'),
      to: '/pricing',
    })
  }

  baseLinks.push({
    icon: 'i-lucide-mail',
    label: t('general.links.contact'),
    to: '/contact',
  })

  return baseLinks
})
const items = computed(() => links.value.map(({ icon, ...link }) => link))
</script>

<template>
  <UHeader :title="siteConfig.name">
    <template #title>
      <!-- If you use an svg as Logo, you can remove the ClientOnly wrapper -->
      <ClientOnly>
        <AppLogo :show-app-name="false" />
        <template #fallback>
          <span>{{ $t('general.name') }}</span>
        </template>
      </ClientOnly>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UTooltip
        text="Search"
        :kbds="['meta', 'K']"
      >
        <UContentSearchButton />
      </UTooltip>

      <AuthState v-if="isAuthEnabled">
        <UButton
          v-if="loggedIn && !isDashboardRoute"
          to="/dashboard"
          class="hidden lg:flex"
        >
          {{ t('general.dashboard') }}
        </UButton>
        <template v-if="!loggedIn">
          <UButton
            to="/auth/login"
            color="neutral"
            variant="ghost"
            class="hidden lg:flex"
          >
            {{ $t('general.login') }}
          </UButton>
          <UButton
            to="/auth/register"
            color="primary"
            variant="solid"
            class="hidden lg:flex"
          >
            {{ $t('general.register') }}
          </UButton>
        </template>
      </AuthState>
    </template>

    <template #body>
      <UNavigationMenu
        orientation="vertical"
        :items="links"
        class="-mx-2.5"
      />
      <USeparator
        type="dashed"
        class="mt-4 mb-6"
      />
      <div class="flex flex-col space-y-4">
        <AuthState v-if="isAuthEnabled">
          <UButton
            v-if="loggedIn && !isDashboardRoute"
            to="/dashboard"
          >
            {{ t('general.dashboard') }}
          </UButton>
          <template v-if="!loggedIn">
            <UButton
              to="/auth/login"
              color="neutral"
              variant="ghost"
            >
              {{ $t('general.login') }}
            </UButton>
            <UButton
              to="/auth/register"
              color="primary"
              variant="solid"
            >
              {{ $t('general.register') }}
            </UButton>
          </template>
        </AuthState>
      </div>
      <UContentNavigation
        highlight
        :navigation="navigation"
        class="mt-4"
      />
    </template>
  </UHeader>
</template>
