<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import type { Testimonial } from '~~/layers/testimonials/server/utils/testimonial.types'

const UUser = resolveComponent('UUser')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const expanded = ref({})
const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isLoadingModalData = ref(false)
const isDeleting = ref(false)
const testimonialToEdit = ref<null | Testimonial>(null)

const { showErrorToast, showSuccessToast } = useAppToast()
const logger = useLogger()
const { openDeleteConfirmationModal } = useConfirmationModal()
const { t } = useI18n()

const { data: testimonials, pending, refresh } = useFetch<Array<Testimonial>>('/api/testimonials')

async function onDelete (testimonial: Testimonial) {
  const confirmed = await openDeleteConfirmationModal({ description: t('pages.admin.testimonials.confirmDelete.description'), title: t('pages.admin.testimonials.confirmDelete.title') })

  if (!confirmed) {
    return
  }

  const updatedTestimonials = testimonials.value?.filter(t => t.id !== testimonial.id) ?? []

  isDeleting.value = true
  try {
    await $fetch('/api/admin/testimonials', {
      body: {
        testimonials: updatedTestimonials,
      },
      method: 'PATCH',
    })
    await refresh()
    showSuccessToast({ title: t('pages.admin.testimonials.toast.deletedSuccess') })
  }
  catch (error: any) {
    logger.error('Failed to delete testimonial', error)
    showErrorToast(t('pages.admin.testimonials.toast.deletedError'), error)
  }
  finally {
    isDeleting.value = false
  }
}

function getActionItems (row: Row<Testimonial>) {
  return [
    {
      icon: 'i-lucide-pen',
      label: t('general.edit'),
      onSelect: () => {
        testimonialToEdit.value = row.original
        isEditModalOpen.value = true
      },
    },
    {
      icon: 'i-lucide-trash',
      label: t('general.delete'),
      onSelect: () => onDelete(row.original),
    },
  ]
}

const columns: Array<TableColumn<Testimonial>> = [
  {
    cell: ({ row }) =>
      h(UButton, {
        color: 'neutral',
        icon: 'i-lucide-chevron-down',
        onClick: () => row.toggleExpanded(),
        square: true,
        ui: {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : '',
          ],
        },
        variant: 'ghost',
      }),
    id: 'expand',
  },
  {
    accessorKey: 'author.avatar.src',
    cell: ({ row }) => {
      return h(UUser, {
        avatar: {
          alt: row.original.author.name,
          size: 'sm',
          src: row.original.author.avatar?.src ? `/images/${row.original.author.avatar.src}` : undefined,
        },
        description: row.original.author.description,
        name: row.original.author.name,
      })
    },
    header: t('pages.admin.testimonials.tableHeaders.author'),
  },
  {
    accessorKey: 'title',
    header: t('pages.admin.testimonials.tableHeaders.title'),
  },
  {
    accessorKey: 'source',
    cell: ({ row }) => {
      return h('div', row.original.source?.name,
      )
    },
    header: t('pages.admin.testimonials.tableHeaders.source'),
  },
  {
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getActionItems(row),
          },
          () =>
            h(UButton, {
              class: 'ml-auto',
              color: 'neutral',
              icon: 'i-lucide-ellipsis-vertical',
              variant: 'ghost',
            }),
        ),
      )
    },
    id: 'actions',
  },
]

async function onAddTestimonial (testimonial: Testimonial) {
  const updatedTestimonials = testimonials.value?.concat(testimonial) ?? [testimonial]

  isLoadingModalData.value = true

  try {
    await $fetch('/api/admin/testimonials', {
      body: {
        testimonials: updatedTestimonials,
      },
      method: 'PATCH',
    })
    await refresh()
    showSuccessToast({ title: t('pages.admin.testimonials.toast.updatedSuccess') })
  }
  catch (error: any) {
    logger.error('Failed to update testimonial', error)
    showErrorToast(t('pages.admin.testimonials.toast.updatedError'), error)
  }
  finally {
    isLoadingModalData.value = false
    isAddModalOpen.value = false
  }
}

async function onEditTestimonial (testimonial: Testimonial) {
  const updatedTestimonials = testimonials.value?.map(t => t.id === testimonial.id ? testimonial : t) ?? []

  isLoadingModalData.value = true

  try {
    await $fetch('/api/admin/testimonials', {
      body: {
        testimonials: updatedTestimonials,
      },
      method: 'PATCH',
    })
    await refresh()
    showSuccessToast({ title: t('pages.admin.testimonials.toast.updatedSuccess') })
  }
  catch (error: any) {
    logger.error('Failed to edit testimonial', error)
    showErrorToast(t('pages.admin.testimonials.toast.updatedError'), error)
  }
  finally {
    isLoadingModalData.value = false
    isEditModalOpen.value = false
  }
}

watch(isEditModalOpen, (newIsEditModalOpen) => {
  if (!newIsEditModalOpen) {
    testimonialToEdit.value = null
  }
})
</script>

<template>
  <div class="flex flex-col space-y-5">
    <div class="flex justify-end">
      <UButton
        color="neutral"
        icon="i-lucide-plus"
        @click="isAddModalOpen = true"
      >
        {{ $t('pages.admin.testimonials.addButton') }}
      </UButton>
    </div>
    <AdminTestimonialsModal
      v-model:open="isAddModalOpen"
      :is-loading="isLoadingModalData"
      mode="add"
      @add="onAddTestimonial"
    />
    <AdminTestimonialsModal
      v-model:open="isEditModalOpen"
      :is-loading="isLoadingModalData"
      :testimonial="testimonialToEdit"
      mode="edit"
      @edit="onEditTestimonial"
    />
    <UTable
      v-model:expanded="expanded"
      :data="testimonials ?? []"
      :columns="columns"
      :loading="pending"
      :ui="{ tr: 'data-[expanded=true]:bg-[var(--ui-bg-elevated)]/50' }"
      class="flex-1"
    >
      <template #expanded="{ row }">
        <p class="text-wrap">
          {{ row.original.quote }}
        </p>
      </template>
    </UTable>
  </div>
</template>
