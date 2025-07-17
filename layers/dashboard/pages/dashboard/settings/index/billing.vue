<script setup lang="ts">
import type { SelectSubscription } from '~~/layers/db/server/utils/schema'

const { data } = useFetch<{ activeSubscription: null | SelectSubscription, products: Array<PaymentProduct> }>('/api/payment/status')

const { t } = useI18n()
const title = computed(() => t('pages.dashboard.settings.links.billing'))

useSeoMeta({
  title,
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <BillingOverview
      v-if="data?.activeSubscription"
      :subscription="data?.activeSubscription"
      :has-life-time-deal="false"
    />
    <BillingPlanSelector
      :products="data?.products ?? []"
      :active-subscription="data?.activeSubscription ?? null"
      :has-life-time-deal="false"
    />
  </div>
</template>
