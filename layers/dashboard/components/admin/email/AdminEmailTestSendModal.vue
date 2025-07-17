<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { siteConfig } from '~~/config/siteConfig'
import { z } from 'zod'

interface Props {
  html: string
}
const props = defineProps<Props>()

const open = defineModel({ type: Boolean })

const schema = z.object({
  email: z.string().email(),
  subject: z.string().min(5),
})
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  subject: `[${siteConfig.name}] Template Test`,
})

const isSendingEmail = ref(false)
const isSendingEmailToWaitlist = ref(false)

const { showErrorToast, showSuccessToast } = useAppToast()
const logger = useLogger()
const { t } = useI18n()
const { openConfirmationModal } = useConfirmationModal()

const { data: waitlistData } = useFetch<Array<SelectWaitlist>>('/api/admin/waitlist')

async function onSubmit (event: FormSubmitEvent<Schema>) {
  isSendingEmail.value = true

  try {
    await $fetch('/api/email', {
      body: {
        html: props.html,
        subject: event.data.subject,
        to: event.data.email,
      },
      method: 'POST',
    })
    showSuccessToast({ title: t('pages.admin.emailTemplates.sendModal.toast.sendSuccess') })
  }
  catch (error: any) {
    logger.error('Failed to send email', error)
    showErrorToast(t('pages.admin.emailTemplates.sendModal.toast.sendError'), error)
  }
  finally {
    isSendingEmail.value = false
  }
}

async function sendToWaitlist () {
  const confirmed = await openConfirmationModal({
    description: t('pages.admin.emailTemplates.sendModal.confirmSendToWaitlist.description', { count: waitlistData.value?.length ?? 0 }),
    title: t('pages.admin.emailTemplates.sendModal.confirmSendToWaitlist.title'),
  })
  if (!confirmed) {
    return
  }

  isSendingEmailToWaitlist.value = true

  try {
    await $fetch('/api/admin/waitlist/email', {
      body: {
        html: props.html,
        subject: state.subject,
      },
      method: 'POST',
    })
    showSuccessToast({ title: t('pages.admin.emailTemplates.sendModal.toast.sendToWaitlistSuccess') })
  }
  catch (error: any) {
    logger.error('Failed to send emails to waitlist', error)
    showErrorToast(t('pages.admin.emailTemplates.sendModal.toast.sendToWaitlistError'), error)
  }
  finally {
    isSendingEmailToWaitlist.value = false
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="t('pages.admin.emailTemplates.sendModal.title')"
    :description="t('pages.admin.emailTemplates.sendModal.description')"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField
            :label="t('pages.admin.emailTemplates.sendModal.subjectField.label')"
            name="subject"
          >
            <UInput
              v-model="state.subject"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Email"
            name="email"
          >
            <UInput
              v-model="state.email"
              class="w-full"
            />
          </UFormField>

          <UButton
            type="submit"
            icon="i-lucide-mail"
            size="lg"
            :loading="isSendingEmail"
            color="neutral"
          >
            {{ t('pages.admin.emailTemplates.sendModal.sendButton') }}
          </UButton>
        </UForm>
        <USeparator label="OR" />
        <div class="flex flex-col gap-4">
          <UFormField
            :label="t('pages.admin.emailTemplates.sendModal.subjectField.label')"
            name="subject"
          >
            <UInput
              v-model="state.subject"
              class="w-full"
            />
          </UFormField>
          <UButton
            icon="i-lucide-mail"
            size="lg"
            :loading="isSendingEmailToWaitlist"
            color="neutral"
            @click="sendToWaitlist"
          >
            {{ t('pages.admin.emailTemplates.sendModal.sendToWaitlistButton') }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
