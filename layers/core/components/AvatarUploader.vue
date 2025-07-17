<script lang="ts" setup>
import type { BlobObject } from '@nuxthub/core'

interface Props {
  accept?: string
  apiUrl: string
  imagePathName?: string
}
const props = withDefaults(defineProps<Props>(), {
  accept: 'image/*',
})

const emit = defineEmits<Emits>()
interface Emits {
  upload: [BlobObject]
}

const isUploading = ref(false)
const uploadedImagePathName = ref<null | string>(null)

const upload = useUpload(props.apiUrl, { method: 'PUT' })
const logger = useLogger()
const { t } = useI18n()
const { showErrorToast } = useAppToast()

const imageSrc = computed(() => {
  if (uploadedImagePathName.value && uploadedImagePathName.value.startsWith('http')) {
    return uploadedImagePathName.value
  }

  return uploadedImagePathName.value ? `/images/${uploadedImagePathName.value}` : ''
})

const { files, onChange, open: openFileDialog } = useFileDialog({
  accept: props.accept,
  multiple: false,
})
onChange(() => {
  if (files.value && files.value[0]) {
    uploadImage(files.value[0])
  }
})

async function uploadImage (file: File) {
  isUploading.value = true

  try {
    const uploadedFile = await upload(file)
    uploadedImagePathName.value = uploadedFile.pathname
    emit('upload', uploadedFile)
  }
  catch (error: any) {
    logger.error('Failed to upload image', error)
    showErrorToast(t('components.avatarUpload.toast.error.title'), error)
  }
  finally {
    isUploading.value = false
  }
}

watch(() => props.imagePathName, (newImagePathName) => {
  if (newImagePathName) {
    uploadedImagePathName.value = newImagePathName
  }
}, { immediate: true })
</script>

<template>
  <div class="flex items-center gap-4">
    <UIcon
      v-if="isUploading"
      name="i-lucide-loader"
      class="size-8 animate-spin"
    />
    <nuxt-img
      v-else-if="imageSrc.startsWith('http')"
      :src="imageSrc"
      class="rounded-full w-16 h-16"
      referrerpolicy="no-referrer"
      provider="customCloudflare"
    />
    <UAvatar
      v-else
      :src="imageSrc"
      size="xl"
      provider="customCloudflare"
    />
    <UButton
      :label="t('general.change')"
      :loading="isUploading"
      variant="soft"
      color="neutral"
      @click="() => openFileDialog()"
    />
  </div>
</template>
