<script setup lang="ts">
import { useRouter } from 'vue-router'
import { z } from 'zod'

const { fetch: refreshSession } = useUserSession()
const { t } = useI18n()
const { showErrorToast, showSuccessToast } = useAppToast()
const logger = useLogger()
const route = useRouter().currentRoute.value
const { email, type } = route.query

const title = computed(() => t('pages.otpVerify.title'))
const description = computed(() => t('pages.otpVerify.description'))

const OTP_EXPIRES_IN_SECONDS = 60

const isVerifying = ref(false)
const isResendingOtp = ref(false)
const isOtpDisabled = ref(false)
const resendNewCodeInSeconds = ref(OTP_EXPIRES_IN_SECONDS)

const { counter, pause, reset, resume } = useInterval(1000, { controls: true })
pause()

const schema = z.object({
  otp: z.string().array().length(6),
})
type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  otp: [],
})

async function onSubmit () {
  isVerifying.value = true

  try {
    if (state.otp.length !== 6) {
      return
    }

    await $fetch('/api/auth/otp/verify', {
      body: { code: state.otp.join(''), email, type },
      method: 'POST',
    })

    showSuccessToast({ title: t('pages.otpVerify.toast.successVerify.title') })
    await refreshSession()
    await navigateTo('/dashboard')
  }
  catch (error: any) {
    showErrorToast(t('pages.otpVerify.toast.errorVerify.title'), error)
  }
  finally {
    isVerifying.value = false
  }
}

async function resendOtp () {
  isResendingOtp.value = true

  try {
    await $fetch('/api/auth/otp/resend', {
      body: { email, type },
      method: 'POST',
    })
    showSuccessToast({ title: t('pages.otpVerify.toast.successResend.title') })
    startTimer()
  }
  catch (error: any) {
    logger.error('Failed to resend OTP', error)
    showErrorToast(t('pages.otpVerify.toast.errorResend.title'), error)
  }
  finally {
    isResendingOtp.value = false
  }
}

function startTimer () {
  isOtpDisabled.value = true
  reset()
  resume()
}

watch(counter, (value) => {
  resendNewCodeInSeconds.value = OTP_EXPIRES_IN_SECONDS - value

  if (resendNewCodeInSeconds.value === 0) {
    isOtpDisabled.value = false
    reset()
  }
})

definePageMeta({
  middleware: 'otp',
})

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
      class="mt-4 max-w-md"
      icon="i-lucide-mail"
    >
      <UForm
        :state="state"
        :schema="schema"
        class="flex flex-col space-y-4 mx-auto max-w-max mt-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="t('pages.otpVerify.form.otp.label')"
          name="otp"
          size="lg"
        >
          <UPinInput
            v-model="state.otp"
            otp
            :length="6"
            placeholder="○"
            size="lg"
            class="flex gap-2 mx-auto"
            @complete="onSubmit"
          />
        </UFormField>
        <UButton
          size="lg"
          color="neutral"
          :label="t('pages.otpVerify.form.submitButton')"
          block
          :loading="isVerifying"
          :disabled="isVerifying"
          @click="onSubmit"
        />
      </UForm>
      <div class="flex flex-col space-x-4 mt-4">
        <p class="flex items-center mx-auto gap-1 text-xs text-gray-500">
          {{ $t('pages.otpVerify.resendCodeText') }}
          <UButton
            :disabled="isOtpDisabled || isResendingOtp"
            :loading="isResendingOtp"
            variant="ghost"
            color="neutral"
            size="xs"
            @click="resendOtp"
          >
            {{ $t('pages.otpVerify.resendCodeButton') }}
          </UButton>
        </p>
        <div
          v-if="isOtpDisabled"
          class="flex justify-center mt-4"
        >
          <UAlert
            title=""
            class="max-w-sm"
            variant="soft"
            color="neutral"
            icon="i-lucide-clock"
          >
            <template #description>
              {{ $t('pages.otpVerify.codeExpiresIn', { seconds: resendNewCodeInSeconds }) }}
            </template>
          </UAlert>
        </div>
      </div>
      <UButton
        to="/auth/login"
        class="mt-8"
        label="Back to login"
        icon="i-lucide-arrow-left"
        variant="link"
        color="neutral"
      />
    </UPageCard>
  </div>
</template>
