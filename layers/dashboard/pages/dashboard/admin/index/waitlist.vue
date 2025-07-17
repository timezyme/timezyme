<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import type { SelectWaitlist } from '~~/layers/db/server/utils/schema'

const UButton = resolveComponent('UButton')
const UIcon = resolveComponent('UIcon')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const { t } = useI18n()
const logger = useLogger()
const { openDeleteConfirmationModal } = useConfirmationModal()
const { showErrorToast, showSuccessToast } = useAppToast()

const { data: waitlist, pending, refresh } = useFetch<Array<SelectWaitlist>>('/api/admin/waitlist')

const isDeleting = ref(false)

function formatDate (dateString: string) {
  return useDateFormat(new Date(dateString), 'DD MMM YY').value
}

async function onDeleteUser (id: string) {
  const confirmed = await openDeleteConfirmationModal({
    description: t('pages.admin.waitlist.confirmDelete.description'),
    title: t('pages.admin.waitlist.confirmDelete.title'),
  })

  if (!confirmed) {
    return
  }

  isDeleting.value = true
  try {
    await $fetch(`/api/admin/waitlist/${id}`, {
      method: 'DELETE',
    })
    await refresh()
    showSuccessToast({ title: t('pages.admin.waitlist.toast.deleteSuccess') })
  }
  catch (error: any) {
    logger.error('Failed to delete user', error)
    showErrorToast(t('pages.admin.waitlist.toast.deleteError'), error)
  }
  finally {
    isDeleting.value = false
  }
}

function getActionItems (row: Row<SelectWaitlist>) {
  return [
    [
      {
        icon: 'i-lucide-trash',
        label: t('general.delete'),
        onSelect: async () => {
          await onDeleteUser(row.original.id)
        },
      },
    ],
  ]
}

const columns: Array<TableColumn<SelectWaitlist>> = [
  {
    accessorKey: 'email',
    header: t('pages.admin.waitlist.tableHeaders.email'),
  },
  {
    accessorKey: 'emailVerified',
    cell: ({ row }) => {
      if (row.original.emailVerified) {
        return h(UIcon, { class: 'text-(--ui-success) text-2xl', name: 'i-lucide-circle-check' })
      }
      return h(UIcon, { class: 'text-2xl text-gray-300 dark:text-gray-600', name: 'i-lucide-circle' })
    },
    header: t('pages.admin.waitlist.tableHeaders.emailConfirmed'),
  },
  {
    accessorKey: 'referrer',
    cell: ({ row }) => row.original.referrer ?? '--',
    header: t('pages.admin.waitlist.tableHeaders.referrer'),
  },
  {
    accessorKey: 'createdAt',
    cell: ({ row }) => formatDate(row.original.createdAt as unknown as string),
    header: t('pages.admin.waitlist.tableHeaders.createdAt'),
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
</script>

<template>
  <UTable
    :data="waitlist ?? []"
    :columns="columns"
    :loading="pending"
  />
</template>
