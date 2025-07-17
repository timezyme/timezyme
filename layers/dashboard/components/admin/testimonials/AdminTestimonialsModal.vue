<script lang="ts" setup>
import type { BlobObject } from '@nuxthub/core'
import type { FormSubmitEvent } from '#ui/types'
import type { Testimonial } from '~~/layers/testimonials/server/utils/testimonial.types'
import { nanoid } from 'nanoid'
import { z } from 'zod'

interface Props {
  isLoading?: boolean
  mode: 'add' | 'edit'
  testimonial?: null | Testimonial
}
const props = defineProps<Props>()

const emit = defineEmits<Emits>()
interface Emits {
  add: [Testimonial]
  close: []
  edit: [Testimonial]
}

const open = defineModel('open', { required: true, type: Boolean })

const { t } = useI18n()

const form = useTemplateRef('form')

const title = computed(() => {
  if (props.mode === 'add') {
    return t('pages.admin.testimonials.modal.titleAdd')
  }
  return t('pages.admin.testimonials.modal.titleEdit')
})

const submitButtonText = computed(() => {
  if (props.mode === 'add') {
    return t('pages.admin.testimonials.modal.form.submitButtonAdd')
  }
  return t('pages.admin.testimonials.modal.form.submitButtonEdit')
})

const schema = z.object({
  authorAvatarPath: z.string().optional(),
  authorDescription: z.string().min(3),
  authorName: z.string().min(3),
  quote: z.string().min(3),
  sourceName: z.string().min(1),
  sourceUrl: z.string().url().optional(),
})
type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  authorDescription: '',
  authorName: '',
  quote: '',
  sourceName: '',
})

async function onUploadImage (blob: BlobObject) {
  state.authorAvatarPath = blob.pathname
}

async function onSubmit (event: FormSubmitEvent<Schema>) {
  const newTestimonial: Testimonial = {
    author: {
      avatar: {
        loading: 'lazy',
        src: event.data.authorAvatarPath!,
      },
      description: event.data.authorDescription,
      name: event.data.authorName,
    },
    id: props.testimonial ? props.testimonial.id : nanoid(),
    quote: event.data.quote,
    source: {
      name: event.data.sourceName,
      url: event.data.sourceUrl,
    },
  }

  if (props.mode === 'add') {
    emit('add', newTestimonial)
  }
  else {
    emit('edit', newTestimonial)
  }
}

watch(open, (newOpenModal) => {
  if (!newOpenModal) {
    emit('close')
  }
})

watch(() => props.testimonial, (newTestimonial) => {
  if (newTestimonial) {
    state.authorDescription = newTestimonial.author.description
    state.authorName = newTestimonial.author.name
    state.authorAvatarPath = newTestimonial.author.avatar.src
    state.quote = newTestimonial.quote
    state.sourceName = newTestimonial.source.name
    state.sourceUrl = newTestimonial.source.url
  }
}, { immediate: true })
</script>

<template>
  <UModal
    v-model:open="open"
    :title="title"
  >
    <template #body>
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          :label="t('pages.admin.testimonials.modal.form.quote.label')"
          name="quote"
          size="lg"
          required
        >
          <UTextarea
            v-model="state.quote"
            class="w-full"
            :rows="10"
          />
        </UFormField>

        <UFormField
          :label="t('pages.admin.testimonials.modal.form.authorName.label')"
          name="authorName"
          size="lg"
          required
        >
          <UInput
            v-model="state.authorName"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="t('pages.admin.testimonials.modal.form.authorDescription.label')"
          name="authorDescription"
          size="lg"
          required
        >
          <UTextarea
            v-model="state.authorDescription"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="t('pages.admin.testimonials.modal.form.authorAvatarUrl.label')"
          name="authorAvatarPath"
          size="lg"
        >
          <AvatarUploader
            api-url="/api/admin/testimonials/author-avatar"
            :image-path-name="state.authorAvatarPath"
            @upload="onUploadImage"
          />
        </UFormField>

        <UFormField
          :label="t('pages.admin.testimonials.modal.form.sourceName.label')"
          name="sourceName"
          size="lg"
          required
        >
          <UInput
            v-model="state.sourceName"
            class="w-full"
          />
        </UFormField>

        <UFormField
          :label="t('pages.admin.testimonials.modal.form.sourceUrl.label')"
          name="sourceUrl"
          size="lg"
        >
          <UInput
            v-model="state.sourceUrl"
            class="w-full"
          />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton
        variant="soft"
        size="lg"
        icon="i-lucide-plus"
        :loading="isLoading"
        @click="form?.submit"
      >
        {{ submitButtonText }}
      </UButton>
    </template>
  </UModal>
</template>
