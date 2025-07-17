<script setup lang="ts">
import type { SelectSubscription, SelectUserLifeTimeDeals } from '~~/layers/db/server/utils/schema'

const { data } = useFetch<{ activeSubscription: null | SelectSubscription, lifeTimeDeal: null | SelectUserLifeTimeDeals, products: Array<PaymentProduct> }>('/api/payment/status')

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
      :has-life-time-deal="data?.lifeTimeDeal !== null"
    />
    <BillingPlanSelector
      :products="data?.products ?? []"
      :active-subscription="data?.activeSubscription ?? null"
      :has-life-time-deal="data?.lifeTimeDeal !== null"
    />
  </div>
</template>
