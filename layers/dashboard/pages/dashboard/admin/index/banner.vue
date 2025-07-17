<script setup lang="ts">
import type { BannerProps } from '@nuxt/ui-pro'

const { t } = useI18n()
const { openDeleteConfirmationModal } = useConfirmationModal()
const logger = useLogger()
const { showErrorToast } = useAppToast()

const { data: bannerData, refresh } = useFetch('/api/banner')

const showModal = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const isDeleting = ref(false)
const isUpdating = ref(false)

const buttonText = computed(() => bannerData.value ? t('pages.admin.banner.editButton') : t('pages.admin.banner.addButton'))

const buttonIcon = computed(() => bannerData.value ? 'i-lucide-pen' : 'i-lucide-plus')

function onClick () {
  showModal.value = true
  modalMode.value = bannerData.value ? 'edit' : 'add'
}

async function onDelete () {
  const confirmed = await openDeleteConfirmationModal({ description: t('pages.admin.banner.deleteConfirmationDescription'), title: t('pages.admin.banner.deleteConfirmationTitle') })

  if (!confirmed) {
    return
  }

  isDeleting.value = true

  try {
    await $fetch('/api/admin/banner', {
      method: 'DELETE',
    })
    await refresh()
  }
  catch (error: any) {
    logger.error('Failed to delete banner', error)
    showErrorToast(t('pages.admin.banner.deleteError'), error)
  }
  finally {
    isDeleting.value = false
  }
}

async function onUpdate (banner: Banner, ttl?: number) {
  showModal.value = false

  isUpdating.value = true

  try {
    await $fetch('/api/admin/banner', {
      body: {
        banner,
        ttl,
      },
      method: 'PUT',
    })
    await refresh()
  }
  catch (error: any) {
    logger.error('Failed to update banner', error)
    showErrorToast(t('pages.admin.banner.updateError'), error)
  }
  finally {
    isUpdating.value = false
  }
}

watch(bannerData, (newBannerData) => {
  modalMode.value = newBannerData ? 'edit' : 'add'
}, { immediate: true })
</script>

<template>
  <div class="flex flex-col space-y-5">
    <div class="flex space-x-4 justify-end">
      <UButton
        color="neutral"
        size="lg"
        :icon="buttonIcon"
        :loading="isUpdating"
        @click="onClick"
      >
        {{ buttonText }}
      </UButton>
      <UButton
        v-if="bannerData"
        color="error"
        variant="soft"
        size="lg"
        icon="i-lucide-trash"
        :loading="isDeleting"
        @click="onDelete"
      >
        {{ $t('pages.admin.banner.deleteButton') }}
      </UButton>
    </div>
    <UAlert
      v-if="!bannerData"
      :title="t('pages.admin.banner.noBanner')"
      color="neutral"
      variant="soft"
    />
    <UBanner
      v-else
      v-bind="bannerData.bannerProps as BannerProps"
    />
    <AdminBannerModal
      v-model="showModal"
      :mode="modalMode"
      :banner="bannerData?.banner ?? null"
      @update="onUpdate"
    />
  </div>
</template>
