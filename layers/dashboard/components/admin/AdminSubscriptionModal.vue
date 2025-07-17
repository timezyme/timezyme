<script setup lang="ts">
import type { SelectSubscription } from '~~/layers/db/server/utils/schema'

interface Props {
  user: AdminSelectUser
}
const props = defineProps<Props>()

const open = defineModel({ default: false, type: Boolean })

const { t } = useI18n()

const { data } = useFetch<{ product: PaymentProduct, subscription: SelectSubscription }>(`/api/admin/users/${props.user.id}/subscription`)

const formattedCreatedAtDate = computed(() => data.value?.subscription.createdAt ? useDateFormat(new Date(data.value?.subscription.createdAt), 'YYYY-MM-DD HH:mm:ss').value : '')

const formattedEndsAtDate = computed(() => data.value?.subscription.endsAt ? useDateFormat(new Date(data.value?.subscription.endsAt), 'YYYY-MM-DD HH:mm:ss').value : '')
</script>

<template>
  <UModal
    v-model:open="open"
    :title="t('pages.admin.users.subscriptionModal.title')"
  >
    <template #body>
      <div class="flex flex-col space-y-4">
        <UFormField
          :label="t('pages.admin.users.subscriptionModal.form.name.label')"
          size="lg"
        >
          <UInput
            disabled
            :model-value="data?.product?.name"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="t('pages.admin.users.subscriptionModal.form.status.label')"
          size="lg"
        >
          <UInput
            disabled
            :model-value="data?.subscription?.status"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="t('pages.admin.users.subscriptionModal.form.createdAtDate.label')"
          size="lg"
        >
          <UInput
            disabled
            :model-value="formattedCreatedAtDate"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="t('pages.admin.users.subscriptionModal.form.endsAtDate.label')"
          size="lg"
        >
          <UInput
            disabled
            :model-value="formattedEndsAtDate"
            class="w-full"
          />
        </UFormField>
      </div>
    </template>
  </UModal>
</template>
