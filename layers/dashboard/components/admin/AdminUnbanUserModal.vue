<script setup lang="ts">
import { useAppToast } from '~~/layers/core/composables/useAppToast'

interface Props {
  user: SelectUser
}
const props = defineProps<Props>()

const open = defineModel({ default: false, type: Boolean })

const isLoading = ref(false)

const { t } = useI18n()
const { showErrorToast, showSuccessToast } = useAppToast()

async function unbanUser () {
  isLoading.value = true

  try {
    await $fetch(`/api/admin/users/${props.user.id}/ban`, {
      body: {
        status: false,
        userId: props.user.id,
      },
      method: 'POST',
    })
    showSuccessToast({ title: t('pages.admin.users.unbanUserModal.toast.success') })
    open.value = false
  }
  catch (error: any) {
    showErrorToast(t('pages.admin.users.unbanUserModal.toast.error'), error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="t('pages.admin.users.unbanUserModal.title')"
    :description="t('pages.admin.users.unbanUserModal.description')"
  >
    <template #body>
      <div class="space-y-4">
        <UFormField
          :label="t('pages.admin.users.unbanUserModal.reasonLabel')"
          name="bannedReason"
          size="lg"
        >
          <UTextarea
            :model-value="user.bannedReason"
            :rows="4"
            class="w-full"
            disabled
          />
        </UFormField>
        <div class="!mt-6 flex justify-end space-x-2">
          <UButton
            variant="soft"
            color="neutral"
            @click="open = false"
          >
            {{ t('pages.admin.users.unbanUserModal.cancelButton') }}
          </UButton>
          <UButton
            variant="soft"
            color="success"
            :loading="isLoading"
            :disabled="isLoading"
            @click="unbanUser"
          >
            {{ t('pages.admin.users.unbanUserModal.confirmButton') }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
