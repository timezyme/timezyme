<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const isLoading = ref(false)

const { showErrorToast, showSuccessToast } = useAppToast()
const logger = useLogger()
const { t } = useI18n()

const schema = z.object({
  password: z.string().min(8, t('pages.dashboard.settings.updatePassword.form.newPassword.validationMessage')),
})
type Schema = z.output<typeof schema>

const state = ref({
  password: '',
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  try {
    isLoading.value = true
    await $fetch('/api/auth/user', {
      body: event.data,
      method: 'PATCH',
    })
    showSuccessToast({
      description: t('pages.dashboard.settings.updatePassword.toast.successDescription'),
      title: t('pages.dashboard.settings.updatePassword.toast.successTitle'),
    })
  }
  catch (error: any) {
    logger.error('Failed to update password', error)
    showErrorToast(t('pages.dashboard.settings.updatePassword.toast.errorTitle'), error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    @submit="onSubmit"
  >
    <UPageCard
      :title="t('pages.dashboard.settings.updatePassword.title')"
      :description="t('pages.dashboard.settings.updatePassword.description') "
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        :label="t('pages.dashboard.settings.updatePassword.form.submitButton')"
        :loading="isLoading"
        :disabled="isLoading"
        color="neutral"
        type="submit"
        class="w-fit ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        :label="t('pages.dashboard.settings.updatePassword.form.newPassword.label')"
        size="lg"
        name="password"
      >
        <UInput
          v-model="state.password"
          type="password"
          :placeholder="t('pages.dashboard.settings.updatePassword.form.newPassword.placeholder')"
        />
      </UFormField>
    </UPageCard>
  </UForm>
</template>
