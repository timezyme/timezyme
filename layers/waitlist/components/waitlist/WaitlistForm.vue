<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  website: z.string().optional(), // Honeypot field
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
  website: '', // Honeypot field
})

const isLoading = ref(false)
const isFormValid = ref(false)

// Enable form submission only when Turnstile token is available
watch(turnstileToken, (token) => {
  isFormValid.value = !!token
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  if (!turnstileToken.value) {
    showErrorToast(t('components.waitlistForm.toast.error.turnstile'), { description: 'Please complete the security check' })
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch('/api/waitlist/subscribe', {
      body: {
        email: event.data.email,
        turnstileToken: turnstileToken.value,
        website: event.data.website, // Include honeypot
      },
      method: 'POST',
    })

    logger.info('Waitlist subscription successful', response)

    showSuccessToast({
      description: t('components.waitlistForm.toast.subscribe.success.description'),
      title: t('components.waitlistForm.toast.subscribe.success.title'),
    })
    // Clear the form on success
    state.email = ''
    state.website = ''

    // Reset Turnstile for next submission
    turnstileRef.value?.reset()
  }
  catch (error: any) {
    logger.error('Failed to subscribe', error)

    // Handle specific error cases
    if (error.statusCode === 429) {
      showErrorToast(
        t('components.waitlistForm.toast.rateLimit.title'),
        { description: t('components.waitlistForm.toast.rateLimit.description') },
      )
    }
    else if (error.statusCode === 400 && error.data?.statusMessage?.includes('Disposable')) {
      showErrorToast(
        t('components.waitlistForm.toast.disposableEmail.title'),
        { description: t('components.waitlistForm.toast.disposableEmail.description') },
      )
    }
    else {
      showErrorToast(t('components.waitlistForm.toast.subscribe.error.title'), error)
    }
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UForm
    :state="state"
    :schema="schema"
    :disabled="isLoading"
    @submit="onSubmit"
  >
    <UFormField
      :help="t('components.waitlistForm.help')"
      name="email"
      size="lg"
      class="min-w-sm px-2 md:min-w-md"
    >
      <UInput
        v-model="state.email"
        type="email"
        placeholder="you@mail.com"
        :ui="{ trailing: 'pe-1' }"
        class="w-full"
        autocomplete="email"
      >
        <template #trailing>
          <UButton
            size="sm"
            type="submit"
            :loading="isLoading"
            :disabled="!isFormValid || isLoading"
            variant="soft"
            color="primary"
          >
            {{ t('components.waitlistForm.subscribeButton') }}
          </UButton>
        </template>
      </UInput>
    </UFormField>

    <!-- Turnstile Widget -->
    <div class="flex justify-center mt-4">
      <NuxtTurnstile
        ref="turnstileRef"
        v-model="turnstileToken"
        :options="{
          theme: 'dark',
          size: 'normal',
        }"
      />
    </div>

    <!-- Honeypot field - hidden from users but visible to bots -->
    <input
      v-model="state.website"
      type="text"
      name="website"
      tabindex="-1"
      autocomplete="off"
      class="waitlist-honeypot"
      aria-hidden="true"
    >
  </UForm>
</template>

<style scoped>
/* Hide the honeypot field from users but keep it accessible to bots */
.waitlist-honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
