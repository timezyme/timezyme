<script lang="ts" setup>
import { render } from '@vue-email/render'
import ContactTemplate from '~~/layers/email/components/email/template/Contact.vue'
import LoginTemplate from '~~/layers/email/components/email/template/Login.vue'
import ResetPassword from '~~/layers/email/components/email/template/ResetPassword.vue'
import type { Component } from 'vue'

const { showErrorToast } = useAppToast()
const logger = useLogger()
const { t } = useI18n()

const isRenderingEmail = ref(false)
const selectedTemplateFilename = ref<string>('')
const renderedTemplate = ref<{ html: string, plainText: string } | null>(null)
const renderedTemplateHtml = computed(() => renderedTemplate.value?.html ?? '')
const emailTemplateFilenames = ['Login', 'Reset password', 'Contact']

const showSendEmailModal = ref(false)

const templates: Record<string, Component> = {
  'Contact': ContactTemplate,
  'Login': LoginTemplate,
  'Reset password': ResetPassword,
}

async function getRenderedEmail () {
  isRenderingEmail.value = true

  try {
    const component = templates[selectedTemplateFilename.value]

    const emailHtml = await render(component!, {}, { pretty: true })
    const emailPlainText = await render(component!, {}, { plainText: true })
    return { html: emailHtml, plainText: emailPlainText }
  }
  catch (error: any) {
    logger.error('Failed to render email', error)
    showErrorToast(t('pages.admin.emailTemplates.toast.renderError'), error)
    return null
  }
  finally {
    isRenderingEmail.value = false
  }
}

async function renderEmailHtml () {
  renderedTemplate.value = await getRenderedEmail()
}

watch(selectedTemplateFilename, async () => {
  await renderEmailHtml()
})
</script>

<template>
  <UPageCard
    :title="t('pages.admin.emailTemplates.title')"
    :description="t('pages.admin.emailTemplates.description')"
  >
    <div class="flex flex-col gap-8">
      <USelect
        v-model="selectedTemplateFilename"
        :items="emailTemplateFilenames"
        :placeholder="t('pages.admin.emailTemplates.selectPlaceholder')"
        class="max-w-md"
      />
      <div
        v-if="renderedTemplateHtml"
        class="flex items-center gap-4"
      >
        <UButton
          :loading="isRenderingEmail"
          size="lg"
          icon="i-lucide-refresh-cw"
          variant="outline"
          color="neutral"
          @click="renderEmailHtml"
        >
          {{ t('pages.admin.emailTemplates.reRenderButton') }}
        </UButton>
        <UButton
          size="lg"
          icon="i-lucide-mail"
          variant="soft"
          color="neutral"
          @click="showSendEmailModal = true"
        >
          {{ t('pages.admin.emailTemplates.sendButton') }}
        </UButton>
      </div>

      <iframe
        v-if="renderedTemplateHtml"
        :srcdoc="renderedTemplateHtml"
        class="h-dvh rounded-md"
      />
      <AdminEmailTestSendModal
        v-model="showSendEmailModal"
        :html="renderedTemplateHtml"
      />
    </div>
  </UPageCard>
</template>
