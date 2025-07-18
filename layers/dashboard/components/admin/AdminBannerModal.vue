<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types'
import { differenceInSeconds } from 'date-fns'

import { bannerSchema } from '../../types/banner.types'
import type { BannerNestedSchema, BannerSchema } from '../../types/banner.types'

interface Props {
  banner: Banner | null
  mode: 'add' | 'edit'
}
const props = defineProps<Props>()

const emit = defineEmits<Emits>()
interface Emits {
  update: [Banner, number | undefined]
}

const open = defineModel({ default: false, type: Boolean })

const { t } = useI18n()

const form = useTemplateRef('form')

const colorItems = ref(['error', 'info', 'neutral', 'primary', 'secondary', 'success', 'warning'])

const modalTitle = computed(() => props.mode === 'add' ? t('pages.admin.banner.modal.titleAdd') : t('pages.admin.banner.modal.titleEdit'))

const submitButtonText = computed(() => props.mode === 'add' ? t('pages.admin.banner.modal.form.submitButtonAdd') : t('pages.admin.banner.modal.form.submitButtonEdit'))

const state = reactive<Partial<BannerSchema & BannerNestedSchema>>({
  color: 'info',
  icon: undefined,
  isClosable: false,
  showUntilDateTime: undefined,
  target: undefined,
  title: '',
  to: undefined,
})

async function onSubmit (event: FormSubmitEvent<BannerSchema>) {
  const showUntilDateTimeDate = state.showUntilDateTime ? new Date(state.showUntilDateTime) : undefined
  const ttl = showUntilDateTimeDate ? differenceInSeconds(showUntilDateTimeDate, new Date()) : undefined

  const banner: Banner = {
    color: event.data.color,
    icon: event.data.icon,
    isClosable: event.data.isClosable,
    showUntil: showUntilDateTimeDate?.toISOString(),
    target: event.data.target,
    title: event.data.title,
    to: event.data.to,
  }

  emit('update', banner, ttl)
}

function onTtlUpdate (dateTime: null | string) {
  state.showUntilDateTime = dateTime ?? undefined
}

watch(() => props.banner, (newBanner) => {
  if (newBanner) {
    state.color = newBanner.color as BannerSchema['color']
    state.icon = newBanner.icon
    state.isClosable = newBanner.isClosable ?? false
    state.showUntilDateTime = newBanner.showUntil
    state.target = newBanner.target as '_blank' | '_self' | undefined
    state.title = newBanner.title ?? ''
    state.to = newBanner.to as string | undefined
  }
}, { immediate: true })
</script>

<template>
  <UModal
    v-model:open="open"
    :title="modalTitle"
  >
    <template #body>
      <UForm
        ref="form"
        :schema="bannerSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="t('pages.admin.banner.modal.form.title.label')"
          name="title"
          size="lg"
          required
        >
          <UInput
            v-model="state.title"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="t('pages.admin.banner.modal.form.color.label')"
          name="color"
          size="lg"
          required
        >
          <USelect
            v-model="state.color"
            :items="colorItems"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="t('pages.admin.banner.modal.form.icon.label')"
          name="icon"
          size="lg"
        >
          <UInput
            v-model="state.icon"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="t('pages.admin.banner.modal.form.link.label')"
          name="to"
          size="lg"
        >
          <UInput
            v-model="state.to"
            class="w-full"
          />
        </UFormField>
        <UFormField
          :label="t('pages.admin.banner.modal.form.linkTarget.label')"
          name="target"
          size="lg"
        >
          <UInput
            v-model="state.target"
            class="w-full"
          />
        </UFormField>
        <UCheckbox
          v-model="state.isClosable"
          :label="t('pages.admin.banner.modal.form.closable.label')"
          size="lg"
        />
        <AdminBannerShowUntilForm
          :state="state"
          @update="onTtlUpdate"
        />
      </UForm>
    </template>
    <template #footer>
      <UButton
        variant="soft"
        color="neutral"
        size="lg"
        @click="form?.submit"
      >
        {{ submitButtonText }}
      </UButton>
    </template>
  </UModal>
</template>
