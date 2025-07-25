<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { useAppToast } from '~~/layers/core/composables/useAppToast'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
})
type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
})

const { showErrorToast, showSuccessToast } = useAppToast()
const logger = useLogger()
const { t } = useI18n()

const title = computed(() => t('pages.forgotPassword.title'))
const description = computed(() => t('pages.forgotPassword.description'))

const isLoading = ref(false)

async function onSubmit (event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    await $fetch('/api/auth/reset-password', {
      body: event.data,
      method: 'POST',
    })

    showSuccessToast({
      description: t('pages.forgotPassword.toast.success.description'),
      title: t('pages.forgotPassword.toast.success.title'),
    })
  }
  catch (error: any) {
    logger.error('Password reset failed', error)
    showErrorToast(t('pages.forgotPassword.toast.error.title'), error)
  }
  finally {
    isLoading.value = false
  }
}

useSeoMeta({
  description,
  title,
})

defineOgImageComponent('OgImageTemplate')
</script>

<template>
  <div class="flex justify-center">
    <UPageCard
      :title="title"
      :description="description"
      class="w-full max-w-md md:mt-12"
    >
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 max-w-sm"
        @submit="onSubmit"
      >
        <UFormField
          :label="t('pages.forgotPassword.form.email.label')"
          name="email"
          size="lg"
          required
        >
          <UInput
            v-model="state.email"
            class="w-full"
          />
        </UFormField>
        <UButton
          :loading="isLoading"
          color="neutral"
          type="submit"
          :disabled="isLoading"
          size="lg"
          block
        >
          {{ $t('pages.forgotPassword.form.submitButton') }}
        </UButton>
      </UForm>
    </UPageCard>
  </div>
</template>
