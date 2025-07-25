<script setup lang="ts">
import type { Period, Range, Stat } from '../../types/home.types'

const props = defineProps<{
  period: Period
  range: Range
}>()

function formatCurrency (value: number): string {
  return value.toLocaleString('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  })
}

const baseStats = [{
  icon: 'i-lucide-users',
  maxValue: 1000,
  maxVariation: 25,
  minValue: 400,
  minVariation: -15,
  title: 'Customers',
}, {
  icon: 'i-lucide-chart-pie',
  maxValue: 2000,
  maxVariation: 20,
  minValue: 1000,
  minVariation: -10,
  title: 'Conversions',
}, {
  formatter: formatCurrency,
  icon: 'i-lucide-circle-dollar-sign',
  maxValue: 500000,
  maxVariation: 30,
  minValue: 200000,
  minVariation: -20,
  title: 'Revenue',
}, {
  icon: 'i-lucide-shopping-cart',
  maxValue: 300,
  maxVariation: 15,
  minValue: 100,
  minVariation: -5,
  title: 'Orders',
}]

const { data: stats } = await useAsyncData<Array<Stat>>('stats', async () => {
  return baseStats.map((stat) => {
    const value = randomInt(stat.minValue, stat.maxValue)
    const variation = randomInt(stat.minVariation, stat.maxVariation)

    return {
      icon: stat.icon,
      title: stat.title,
      value: stat.formatter ? stat.formatter(value) : value,
      variation,
    }
  })
}, {
  default: () => [],
  watch: [() => props.period, () => props.range],
})
</script>

<template>
  <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in stats"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
      variant="subtle"
      :ui="{
        container: 'gap-y-1.5',
        leading: 'p-2.5 rounded-full bg-(--ui-primary)/10 ring ring-inset ring-(--ui-primary)/25',
        title: 'font-normal text-(--ui-text-muted) text-xs uppercase',
      }"
      class="lg:rounded-none first:rounded-l-[calc(var(--ui-radius)*2)] last:rounded-r-[calc(var(--ui-radius)*2)] hover:z-1"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold text-(--ui-text-highlighted)">
          {{ stat.value }}
        </span>

        <UBadge
          :color="stat.variation > 0 ? 'success' : 'error'"
          variant="subtle"
          class="text-xs"
        >
          {{ stat.variation > 0 ? '+' : '' }}{{ stat.variation }}%
        </UBadge>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
