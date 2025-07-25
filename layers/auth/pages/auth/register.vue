<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const { showErrorToast, showSuccessToast } = useAppToast()
const logger = useLogger()
const { t } = useI18n()

const title = computed(() => t('pages.register.title'))
const description = computed(() => t('pages.register.description'))

const fields = [{
  label: t('pages.register.nameField.label'),
  name: 'name',
  placeholder: t('pages.register.nameField.placeholder'),
  required: true,
  type: 'text' as const,
}, {
  label: t('pages.register.emailField.label'),
  name: 'email',
  placeholder: t('pages.register.emailField.placeholder'),
  required: true,
  type: 'text' as const,
}, {
  label: t('pages.register.passwordField.label'),
  name: 'password',
  placeholder: t('pages.register.passwordField.placeholder'),
  required: true,
  type: 'password' as const,
}]

const providers = [{
  icon: 'i-simple-icons-google',
  label: 'Google',
  onClick: async () => {
    await navigateTo('/api/auth/google', { external: true })
  },
}, {
  icon: 'i-simple-icons-github',
  label: 'GitHub',
  onClick: async () => {
    await navigateTo('/api/auth/github', { external: true })
  },
}]

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(255),
  password: z.string().min(8),
})

type Schema = z.output<typeof schema>

const isLoading = ref(false)

async function onSubmit (payload: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    await $fetch('/api/auth/register', {
      body: payload.data,
      method: 'POST',
    })

    showSuccessToast({ title: t('components.auth.toast.signupSuccess.label') })

    await navigateTo(`/auth/otp/verify?email=${encodeURIComponent(payload.data.email)}&type=SIGNUP`)
  }
  catch (error: any) {
    if (error.data && error.data.data && error.data.data.name === 'ZodError') {
      const issues = error.data.data.issues
        .map((issue: any) => {
          const path = issue.path.join('.')
          return `Invalid ${path}: ${issue.message}`
        })
        .join('\n')
      logger.error(issues)
    }
    showErrorToast(t('components.auth.toast.signupError.label'), error)
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
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md md:mt-12">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :providers="providers"
        :title="$t('pages.register.title')"
        icon="i-lucide-user"
        :submit="{
          label: $t('pages.register.createButton'),
        }"
        @submit="onSubmit"
      >
        <template #description>
          {{ $t('pages.register.alreadyAccount') }} <ULink
            to="/auth/login"
            class="text-(--ui-primary) font-medium"
          >
            {{ $t('pages.register.signIn') }}
          </ULink>.
        </template>

        <template #footer>
          By signing up, you agree to our <ULink
            to="/legal/terms"
            class="text-(--ui-primary) font-medium"
          >
            Terms of Service
          </ULink>.
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
