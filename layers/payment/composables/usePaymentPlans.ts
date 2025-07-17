import type { ButtonProps } from '@nuxt/ui'
import type { PricingPlanProps } from '@nuxt/ui-pro'

type PlanUiConfigFn = (price: number, featureCount: number, buttonProps?: ButtonProps, highlight?: boolean) => PricingPlanProps

export function usePaymentPlans () {
  const { t } = useI18n()

  const getPlanUiConfig = (key: 'free' | 'proMonthly' | 'proYearly', price: number, featureCount: number, buttonProps?: ButtonProps, highlight?: boolean): PricingPlanProps => {
    return {
      badge: highlight ? t('pages.pricing.mostPopular') : '',
      billingCycle: ['proMonthly', 'proYearly'].includes(key) ? t(`pages.pricing.plans.${key}.billingCycle`) : '',
      billingPeriod: ['proMonthly', 'proYearly'].includes(key) ? t(`pages.pricing.plans.${key}.billingPeriod`) : '',
      button: {
        label: t(`pages.pricing.plans.${key}.buttonText`),
        ...(buttonProps || {}),
      },
      description: t(`pages.pricing.plans.${key}.description`),
      features: Array.from({ length: featureCount }, (_, i) => t(`pages.pricing.plans.${key}.features.feature${i + 1}`)),
      highlight,
      price: t(`pages.pricing.plans.${key}.price`, { price }),
      scale: highlight,
      tagline: '',
      title: t(`pages.pricing.plans.${key}.name`),
    }
  }

  const getFreePlanUiConfig: PlanUiConfigFn = (price, featureCount, buttonProps, highlight) => {
    return getPlanUiConfig('free', price, featureCount, buttonProps, highlight)
  }

  const getMonthlyPlanUiConfig: PlanUiConfigFn = (price, featureCount, buttonProps, highlight) => {
    return getPlanUiConfig('proMonthly', price, featureCount, buttonProps, highlight)
  }

  const getYearlyPlanUiConfig: PlanUiConfigFn = (price, featureCount, buttonProps, highlight) => {
    return getPlanUiConfig('proYearly', price, featureCount, buttonProps, highlight)
  }

  return {
    getFreePlanUiConfig,
    getMonthlyPlanUiConfig,
    getYearlyPlanUiConfig,
  }
}
