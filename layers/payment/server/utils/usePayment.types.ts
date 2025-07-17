type PaymentProductType = 'one-time' | 'recurring'
type PaymentProductRecurringInterval = 'month' | 'year'

export interface PaymentProduct {
  currency: string
  description: string
  id: string
  name: string
  price: number
  recurringInterval?: PaymentProductRecurringInterval
  type: PaymentProductType
}
