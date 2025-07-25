<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

defineProps<{
  collapsed?: boolean
}>()

const colorMode = useColorMode()
const { user: sessionUser } = useUserSession()
const { clear } = useUserSession()
const { locale, setLocale, t } = useI18n()

const user = computed(() => ({
  avatar: {
    alt: sessionUser.value?.name || '-',
    provider: 'customCloudflare',
    src: sessionUser.value?.avatarUrl || '-',
  },
  name: sessionUser.value?.name || '-',
}))

const items = computed<Array<Array<DropdownMenuItem>>>(() => ([[{
  avatar: user.value.avatar,
  label: user.value.name,
  type: 'label',
}], [{
  icon: 'i-lucide-user',
  label: t('pages.dashboard.userMenu.items.profile'),
  to: '/dashboard/settings',
}, {
  icon: 'i-lucide-credit-card',
  label: t('pages.dashboard.userMenu.items.billing'),
  to: '/dashboard/settings/billing',
}], [{
  children: [{
    checked: colorMode.value === 'light',
    color: colorMode.value === 'light' ? 'primary' : 'neutral',
    icon: 'i-lucide-sun',
    label: t('pages.dashboard.userMenu.items.light'),
    onSelect (e: Event) {
      e.preventDefault()

      colorMode.preference = 'light'
    },
    type: 'checkbox',
  }, {
    checked: colorMode.value === 'dark',
    color: colorMode.value === 'dark' ? 'primary' : 'neutral',
    icon: 'i-lucide-moon',
    label: t('pages.dashboard.userMenu.items.dark'),
    onSelect (e: Event) {
      e.preventDefault()
    },
    onUpdateChecked (checked: boolean) {
      if (checked) {
        colorMode.preference = 'dark'
      }
    },
    type: 'checkbox',
  }],
  icon: 'i-lucide-sun-moon',
  label: t('pages.dashboard.userMenu.items.appearance'),
}], [{
  children: [{
    checked: locale.value === 'de',
    color: locale.value === 'de' ? 'primary' : 'neutral',
    label: t('pages.dashboard.userMenu.items.german'),
    onSelect (e: Event) {
      e.preventDefault()

      setLocale('de')
    },
    type: 'checkbox',
  }, {
    checked: locale.value === 'en',
    color: locale.value === 'en' ? 'primary' : 'neutral',
    label: t('pages.dashboard.userMenu.items.english'),
    onSelect (e: Event) {
      e.preventDefault()

      setLocale('en')
    },
    type: 'checkbox',
  }],
  icon: 'i-lucide-languages',
  label: t('pages.dashboard.userMenu.items.language'),
}], [{
  icon: 'i-lucide-book-open',
  label: t('pages.dashboard.userMenu.items.documentation'),
  target: '_blank',
  to: 'https://ui3.nuxt.dev/getting-started/installation/pro/nuxt',
}, {
  icon: 'i-simple-icons-github',
  label: t('pages.dashboard.userMenu.items.github'),
  target: '_blank',
  to: 'https://github.com/nuxt-ui-pro/dashboard/tree/v3',
}, {
  icon: 'i-lucide-rocket',
  label: t('pages.dashboard.userMenu.items.upgradePro'),
  target: '_blank',
  to: 'https://ui.nuxt.com/pro/purchase',
}], [{
  icon: 'i-lucide-log-out',
  label: t('pages.dashboard.userMenu.items.logout'),
  onSelect: async () => {
    await clear()
    await navigateTo('/')
  },
}]]))
</script>

<template>
  <UDropdownMenu
    :items="items"
    :ui="{ content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? undefined : user?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-(--ui-bg-elevated)"
    />

    <template #chip-leading="{ item }">
      <span
        class="ms-0.5 size-2 rounded-full bg-(--chip)"
        :style="{ '--chip': `var(--color-${(item as any).label}-400)` }"
      />
    </template>
  </UDropdownMenu>
</template>
