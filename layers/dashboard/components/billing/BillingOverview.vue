<script setup lang="ts">
interface Props {
  subscription: SelectSubscription
}
const props = defineProps<Props>()

const formattedPrice = computed(() => {
  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
  })
  return formatter.format(props.subscription.amount / 100)
})
</script>

<template>
  <UPageCard
    icon="i-lucide-circle-user-round"
    variant="soft"
    :title="$t('pages.pricing.billingOverview.title')"
    :description="$t('pages.pricing.billingOverview.description')"
    to="/api/payment/customer-portal"
    target="_blank"
    external
  >
    <span class="font-bold">
      {{ subscription.name }} @ {{ formattedPrice }}/{{ subscription.recurringInterval }}
    </span>
  </UPageCard>
</template>
