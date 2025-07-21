<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const { showErrorToast, showSuccessToast } = useAppToast()
const { fetch: refreshSession } = useUserSession()
const { t } = useI18n()
const { csrf } = useCsrf()

const title = computed(() => t('pages.login.title'))
const description = computed(() => t('pages.login.description'))

const fields = [{
  label: t('pages.login.emailField.label'),
  name: 'email',
  placeholder: t('pages.login.emailField.placeholder'),
  required: true,
  type: 'text' as const,
}, {
  label: t('pages.login.passwordField.label'),
  name: 'password',
  placeholder: t('pages.login.passwordField.placeholder'),
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
  password: z.string().min(8),
})

type Schema = z.output<typeof schema>

const isLoading = ref(false)

async function loginWithPassword (email: string, password: string) {
  isLoading.value = true

  try {
    await $fetch('/api/auth/login-with-password', {
      body: {
        email,
        password,
      },
      headers: {
        'x-csrf-token': csrf,
      },
      method: 'POST',
    })
    await refreshSession()
    showSuccessToast({ title: t('components.auth.toast.loginSuccess.label') })
    await navigateTo('/dashboard')
  }
  catch (error: any) {
    showErrorToast(t('components.auth.toast.loginError.label'), error)
  }
  finally {
    isLoading.value = false
  }
}

async function onSubmit (payload: FormSubmitEvent<Schema>) {
  await loginWithPassword(payload.data.email, payload.data.password)
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
      <UAlert
        :title="t('pages.login.demoAdmin.title')"
        :description="t('pages.login.demoAdmin.description')"
        icon="i-lucide-user"
        color="warning"
        variant="soft"
        :actions="[
          {
            label: t('pages.login.demoAdmin.actionButtonLabel'),
            color: 'neutral',
            onClick: async () => {
              await loginWithPassword('demo-admin@nuxtstarterkit.com', 'demoAdminNuxtStarterKit0815#')
            },
          },
        ]"
      />
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :providers="providers"
        :title="$t('pages.login.title')"
        icon="i-lucide-lock"
        :submit="{
          label: $t('pages.login.loginButton'),
        }"
        @submit="onSubmit"
      >
        <template #description>
          Don't have an account? <ULink
            to="/auth/register"
            class="text-(--ui-primary) font-medium"
          >
            {{ $t('pages.login.signUp') }}
          </ULink>.
        </template>

        <template #password-hint>
          <NuxtLink
            to="/auth/forgot-password"
            class="text-(--ui-primary) font-medium"
          >
            {{ $t('pages.login.forgotPassword') }}
          </NuxtLink>
        </template>
        <template #footer>
          By signing in, you agree to our <ULink
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
