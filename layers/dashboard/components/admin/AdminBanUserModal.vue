<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'

interface Props {
  user: SelectUser
}
const props = defineProps<Props>()

const open = defineModel({ default: false, type: Boolean })

const isLoading = ref(false)
const { showErrorToast, showSuccessToast } = useAppToast()
const { t } = useI18n()

const schema = z.object({
  bannedReason: z.string().min(10, t('pages.admin.users.banUserModal.validationMessage.bannedReason')),
})
type Schema = z.output<typeof schema>

const state = reactive({
  bannedReason: '',
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    await $fetch(`/api/admin/users/${props.user.id}/ban`, {
      body: {
        bannedReason: event.data.bannedReason,
        status: true,
      },
      method: 'POST',
    })
    showSuccessToast({ title: t('pages.admin.users.banUserModal.toast.banSuccess') })
    open.value = false
  }
  catch (error: any) {
    showErrorToast(t('pages.admin.users.banUserModal.toast.banError'), error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="t('pages.admin.users.banUserModal.title')"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="t('pages.admin.users.banUserModal.form.bannedReason.label')"
          name="bannedReason"
          size="lg"
          required
        >
          <UTextarea
            v-model="state.bannedReason"
            :rows="4"
            class="w-full"
          />
        </UFormField>
        <UButton
          block
          variant="soft"
          icon="i-lucide-ban"
          color="error"
          type="submit"
          size="lg"
          :loading="isLoading"
          :disabled="isLoading"
        >
          {{ t('pages.admin.users.banUserModal.form.submitButton') }}
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
