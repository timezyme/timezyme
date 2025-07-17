<script lang="ts" setup>
import type { DateValue } from '@internationalized/date'
import { CalendarDate, DateFormatter, getLocalTimeZone, today } from '@internationalized/date'

import type { BannerNestedSchema, BannerSchema } from '../../types/banner.types'
import { bannerNestedSchema } from '../../types/banner.types'

interface Props {
  state: Partial<BannerSchema & BannerNestedSchema>
}
const props = defineProps<Props>()

const emit = defineEmits<Emit>()
interface Emit {
  update: [null | string]
}

const { t } = useI18n()
const form = useTemplateRef('form')

const dateFormat = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const hasEndDate = ref(props.state.showUntilDateTime !== undefined)

const dateTimeDate = computed(() => props.state.showUntilDateTime ? new Date(props.state.showUntilDateTime) : null)

const hour = ref(dateTimeDate.value?.getHours().toString() ?? new Date().getHours().toString())
const minute = ref(dateTimeDate.value?.getHours().toString() ?? (new Date().getMinutes() + 1).toString())
const dateModelValue = shallowRef(new CalendarDate(dateTimeDate.value?.getFullYear() ?? today(getLocalTimeZone()).year, dateTimeDate.value?.getMonth() ?? today(getLocalTimeZone()).month, dateTimeDate.value?.getDate() ?? today(getLocalTimeZone()).day))

const hourItems = computed(() => Array.from({ length: 24 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: String(i),
})))
const minuteItems = computed(() => Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, '0'),
  value: String(i),
})))

function isDateUnavailable (date: DateValue) {
  return date.compare(today(getLocalTimeZone())) < 0
}

watch([dateModelValue, hour, minute, hasEndDate], ([newDate, newHour, newMinute, newHasEndDate]) => {
  if (!newHasEndDate) {
    emit('update', null)
    return
  }

  if (!newDate || !newHour || !newMinute) {
    return
  }

  const newDateObj = new Date(newDate.year, newDate.month - 1, newDate.day, Number(newHour), Number(newMinute))

  if (newDateObj.getTime() < Date.now()) {
    form.value?.setErrors([{ message: t('pages.admin.banner.form.showUntilDate.inFutureValidation'), name: 'showUntilDateTime' }])
    emit('update', null)
  }
  else {
    form.value?.setErrors([{ message: '', name: 'showUntilDateTime' }])
    emit('update', newDateObj.toISOString())
  }
}, { immediate: true })
</script>

<template>
  <div class="space-y-2">
    <UCheckbox
      v-model="hasEndDate"
      :label="t('pages.admin.banner.modal.form.hasUntilDate.label')"
    />

    <UForm
      v-if="hasEndDate"
      ref="form"
      :state="state"
      :schema="bannerNestedSchema"
    >
      <UFormField
        :description="t('pages.admin.banner.modal.form.showUntilDate.description')"
        name="showUntilDateTime"
        size="lg"
      >
        <div class="flex items-center gap-2">
          <UFormField help="Date">
            <UPopover>
              <UButton
                color="neutral"
                variant="subtle"
                icon="i-lucide-calendar"
                size="lg"
              >
                {{ dateFormat.format(dateModelValue.toDate(getLocalTimeZone())) }}
              </UButton>

              <template #content>
                <UCalendar
                  v-model="dateModelValue"
                  :is-date-unavailable="isDateUnavailable"
                  class="p-2"
                  size="lg"
                />
              </template>
            </UPopover>
          </UFormField>
          <UFormField
            help="Hour"
            size="lg"
          >
            <USelect
              v-model="hour"
              :items="hourItems"
              class="w-18"
            />
          </UFormField>
          <UFormField
            help="Minute"
            size="lg"
          >
            <USelect
              v-model="minute"
              :items="minuteItems"
              class="w-18"
            />
          </UFormField>
        </div>
      </UFormField>
    </UForm>
  </div>
</template>
