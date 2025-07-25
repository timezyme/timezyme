<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { nextTick } from 'vue'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
  name: z.string().min(3),
})
type Schema = z.output<typeof schema>

const { showErrorToast, showSuccessToast } = useAppToast()
const { t } = useI18n()
const logger = useLogger()

// Turnstile
const turnstileToken = ref<string>('')
const turnstileRef = ref()

const state = reactive({
  email: '',
  message: '',
  name: '',
})

const isSending = ref(false)
const isFormValid = ref(false)
const formRef = ref<HTMLFormElement>()
const nameInputRef = ref<HTMLInputElement>()

// Enable form submission only when Turnstile token is available
watch(turnstileToken, (token) => {
  isFormValid.value = !!token
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  if (!turnstileToken.value) {
    showErrorToast(t('pages.contact.toast.error.turnstile'), { description: 'Please complete the security check' })
    return
  }

  isSending.value = true

  try {
    await $fetch('/api/contact', {
      body: {
        ...event.data,
        turnstileToken: turnstileToken.value,
      },
      method: 'POST',
    })
    showSuccessToast({ description: t('pages.contact.toast.success.description'), title: t('pages.contact.toast.success.title') })

    // Reset form and focus on name field for next submission
    state.name = ''
    state.email = ''
    state.message = ''

    // Reset Turnstile for next submission
    turnstileRef.value?.reset()

    // Focus management after successful submission
    nextTick(() => {
      nameInputRef.value?.focus()
    })
  }
  catch (error: any) {
    logger.error('Failed to send contact mail', error)
    showErrorToast(t('pages.contact.toast.error.title'), error)
  }
  finally {
    isSending.value = false
  }
}
</script>

<template>
  <UForm
    ref="formRef"
    :state="state"
    :schema="schema"
    :disabled="isSending"
    class="space-y-6 w-full"
    role="form"
    :aria-label="t('pages.contact.form.ariaLabels.formTitle')"
    @submit="onSubmit"
  >
    <UFormField
      :label="t('pages.contact.form.nameField.label')"
      name="name"
      size="lg"
      required
      class="w-full"
    >
      <UInput
        ref="nameInputRef"
        v-model="state.name"
        icon="i-lucide-user"
        :placeholder="t('pages.contact.form.nameField.placeholder')"
        :aria-label="t('pages.contact.form.nameField.ariaLabel')"
        :aria-required="true"
        :aria-invalid="false"
        autocomplete="name"
        size="lg"
        class="w-full"
      />
    </UFormField>
    <UFormField
      :label="t('pages.contact.form.emailField.label')"
      name="email"
      size="lg"
      required
      class="w-full"
    >
      <UInput
        v-model="state.email"
        icon="i-lucide-mail"
        :placeholder="t('pages.contact.form.emailField.placeholder')"
        :aria-label="t('pages.contact.form.emailField.ariaLabel')"
        :aria-required="true"
        :aria-invalid="false"
        autocomplete="email"
        size="lg"
        type="email"
        class="w-full"
      />
    </UFormField>
    <UFormField
      :label="t('pages.contact.form.messageField.label')"
      name="message"
      size="lg"
      required
      class="w-full"
    >
      <UTextarea
        v-model="state.message"
        :placeholder="t('pages.contact.form.messageField.placeholder')"
        :aria-label="t('pages.contact.form.messageField.ariaLabel')"
        :aria-required="true"
        :aria-invalid="false"
        size="lg"
        :rows="8"
        class="w-full"
      />
    </UFormField>

    <!-- Turnstile Widget -->
    <div class="flex justify-center">
      <NuxtTurnstile
        ref="turnstileRef"
        v-model="turnstileToken"
        :options="{
          theme: 'light',
          size: 'normal',
        }"
      />
    </div>

    <div class="pt-2">
      <UButton
        size="xl"
        type="submit"
        :loading="isSending"
        :disabled="!isFormValid || isSending"
        :aria-label="t('pages.contact.form.ariaLabels.submitButton')"
        :aria-busy="isSending"
        block
        class="group w-full"
      >
        <template #leading>
          <UIcon
            name="i-lucide-send"
            class="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </template>
        {{ isSending ? t('pages.contact.form.submitButtonSending') : t('pages.contact.form.submitButton') }}
      </UButton>
    </div>
  </UForm>
</template>
