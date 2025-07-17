<script setup lang="ts">
import confetti from 'canvas-confetti'

const { t } = useI18n()

const title = computed(() => t('pages.dashboard.checkoutSuccess.title'))
const description = computed(() => t('pages.dashboard.checkoutSuccess.title'))

function randomInRange (min: number, max: number) {
  return Math.random() * (max - min) + min
}

function randomConfetti () {
  confetti({
    angle: randomInRange(55, 125),
    particleCount: randomInRange(50, 100),
    spread: randomInRange(50, 70),
  })
}

onMounted(() => {
  randomConfetti()
  randomConfetti()
  randomConfetti()
})

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({
  description,
  title,
})
</script>

<template>
  <UDashboardPanel
    id="checkout-success"
  >
    <template #header>
      <UDashboardNavbar
        :title="title"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageCTA
        class="rounded-none sm:rounded-[calc(var(--ui-radius)*3)]"
        :title="$t('pages.dashboard.checkoutSuccess.cta.title')"
        :description="$t('pages.dashboard.checkoutSuccess.cta.description')"
      >
        <template #links>
          <UButton @click="randomConfetti">
            {{ $t('pages.dashboard.checkoutSuccess.cta.buttonLabel') }}
          </UButton>
        </template>
      </UPageCTA>
    </template>
  </UDashboardPanel>
</template>
