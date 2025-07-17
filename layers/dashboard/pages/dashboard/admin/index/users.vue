<script lang="ts" setup>
import type { Row } from '@tanstack/vue-table'
import { useAppToast } from '~~/layers/core/composables/useAppToast'
import type { AdminSelectUser, AdminUsersTableFilter } from '~~/layers/db/server/utils/useAdminDb.types'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const hasMaskedEmails = ref(true)
const search = ref((route.query.search as string) || '')
const selectedFilter = ref<AdminUsersTableFilter>((route.query.filter as AdminUsersTableFilter) || 'all')
const page = ref(Number(route.query.page) || 1)
const pageSize = ref(Number(route.query.pageSize) || 10)
const deletingUserId = ref<null | string>(null)
const debouncedSearch = refDebounced(search, 350)
const totalUsers = ref(0)

const showAddUserModal = ref(false)
const showBanUserModal = ref(false)
const showUnbanUserModal = ref(false)
const showSubscriptionModal = ref(false)
const selectedUser = ref<AdminSelectUser | null>(null)

const filters: Array<{ label: string, value: AdminUsersTableFilter }> = [
  { label: t('pages.admin.users.filters.all'), value: 'all' },
  { label: t('pages.admin.users.filters.verified'), value: 'verified' },
  { label: t('pages.admin.users.filters.unverified'), value: 'unverified' },
  { label: t('pages.admin.users.filters.google'), value: 'google' },
  { label: t('pages.admin.users.filters.github'), value: 'github' },
  { label: t('pages.admin.users.filters.proPlan'), value: 'proPlan' },
]

const { showErrorToast, showSuccessToast } = useAppToast()
const logger = useLogger()
const { openDeleteConfirmationModal } = useConfirmationModal()
const { impersonateUser } = useAdminImpersonation()

const {
  data: usersData,
  pending,
  refresh,
} = useFetch('/api/admin/users', {
  query: {
    filter: selectedFilter,
    page,
    pageSize,
    search: debouncedSearch,
  },
})

const users = computed(() => usersData.value?.users || [])
watchEffect(() => {
  if (usersData.value) {
    totalUsers.value = usersData.value.totalCount
  }
})

// Sync query parameters with the browser URL
watch(
  [selectedFilter, page, pageSize, debouncedSearch],
  ([newFilter, newPage, newPageSize, newSearch]) => {
    const query = {
      filter: newFilter,
      page: newPage,
      pageSize: newPageSize,
      search: newSearch || undefined, // Remove empty search from URL
    }
    router.replace({ query })
  },
  { immediate: true },
)

async function deleteUser (userId: string) {
  const confirmed = await openDeleteConfirmationModal({
    description: t('pages.admin.users.confirmDelete.description'),
    title: t('pages.admin.users.confirmDelete.title'),
  })

  if (!confirmed) {
    return
  }

  try {
    deletingUserId.value = userId
    await $fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
    showSuccessToast({ title: t('pages.admin.users.toast.deleteSuccess') })
    refresh()
  }
  catch (error: any) {
    logger.error('Failed to delete user', error)
    showErrorToast(t('pages.admin.users.toast.deleteError'), error)
  }
  finally {
    deletingUserId.value = null
  }
}

async function sendLoginLink (userId: string) {
  try {
    await $fetch(`/api/admin/users/${userId}/send-login-link`, {
      method: 'POST',
    })
    showSuccessToast({ title: t('pages.admin.users.toast.sendLoginLinkSuccess') })
  }
  catch (error: any) {
    logger.error('Failed to send login link', error)
    showErrorToast(t('pages.admin.users.toast.sendLoginLinkError'), error)
  }
}

async function sendPasswordResetEmail (userId: string) {
  try {
    await $fetch(`/api/admin/users/${userId}/send-password-reset-email`, { method: 'POST' })
    showSuccessToast({ title: t('pages.admin.users.toast.passwordResetSuccess') })
  }
  catch (error: any) {
    logger.error('Failed to send password reset email', error)
    showErrorToast(t('pages.admin.users.toast.passwordResetError'), error)
  }
}

function openBanUnbanModal (user: AdminSelectUser) {
  selectedUser.value = user

  if (user.banned) {
    showUnbanUserModal.value = true
  }
  else {
    showBanUserModal.value = true
  }
}

watch([showBanUserModal, showUnbanUserModal], ([newShowBanModal, newShowUnbanModal]) => {
  if (!newShowBanModal && !newShowUnbanModal) {
    selectedUser.value = null
    refresh()
  }
})

function getActionItems (row: Row<AdminSelectUser>) {
  const actionItems = [
    {
      icon: 'i-lucide-lock-keyhole-open',
      label: t('pages.admin.users.tableActions.sendPasswordResetEmail'),
      onSelect: () => sendPasswordResetEmail(row.original.id),
    },
    {
      icon: 'i-lucide-mail',
      label: t('pages.admin.users.tableActions.sendLoginLink'),
      onSelect: () => sendLoginLink(row.original.id),
    },
    {
      type: 'separator',
    },
    {
      icon: row.original.banned ? 'i-lucide-user-round-check' : 'i-lucide-user-round-x',
      label: row.original.banned ? t('pages.admin.users.tableActions.unbanUser') : t('pages.admin.users.tableActions.banUser'),
      onSelect: () => openBanUnbanModal(row.original),
    },
    {
      icon: 'i-lucide-trash',
      label: t('pages.admin.users.tableActions.deleteUser'),
      loading: deletingUserId.value === row.id,
      onSelect: () => deleteUser(row.original.id),
    },
    {
      icon: 'i-lucide-fire-extinguisher',
      label: t('pages.admin.users.tableActions.impersonateUser'),
      onSelect: () => impersonateUser(row.original.id),
    },
  ]

  if (row.original.subscription?.id) {
    actionItems.push({
      type: 'separator',
    })
    actionItems.push({
      icon: 'i-lucide-credit-card',
      label: t('pages.admin.users.tableActions.viewSubscription'),
      onSelect: () => {
        selectedUser.value = row.original
        showSubscriptionModal.value = true
      },
    })
  }

  return actionItems
}

watch([showAddUserModal, showBanUserModal, showUnbanUserModal], (newShowAddUserModal, newShowBanUserModal, newShowUnbanUserModal) => {
  if (!newShowAddUserModal || !newShowBanUserModal || !newShowUnbanUserModal) {
    refresh()
  }
})
</script>

<template>
  <div class="flex flex-col flex-1 w-full">
    <div class="flex items-center justify-between mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
        <UInput
          v-model="search"
          icon="i-lucide-search"
          color="neutral"
          :trailing="false"
          :placeholder="t('pages.admin.users.search.placeholder')"
        />
        <USelect
          v-model="selectedFilter"
          :items="filters"
        />
        <USwitch
          v-model="hasMaskedEmails"
          color="neutral"
          :label="t('pages.admin.users.maskEmails')"
        />
      </div>
      <div class="flex items-center gap-2">
        <UButton
          :label="t('pages.admin.users.addUserButton')"
          variant="soft"
          color="neutral"
          icon="i-lucide-plus"
          @click="showAddUserModal = true"
        />
      </div>
    </div>
    <AdminUsersTable
      :data="users as Array<AdminSelectUser>"
      :is-loading="pending"
      :total-rows="totalUsers"
      :page="page"
      :page-size="pageSize"
      :has-masked-emails="hasMaskedEmails"
      :get-action-items="getActionItems"
    />
    <div class="mt-4 flex items-center justify-between">
      <USelect
        v-model="pageSize"
        :items="[10, 20, 50, 100]"
        label="Rows per page"
      />
      <UPagination
        :page="page"
        :total="totalUsers"
        :per-page="pageSize"
        @update:page="page = $event"
      />
    </div>

    <AdminAddUserModal
      v-model="showAddUserModal"
      @added="refresh"
    />
    <AdminBanUserModal
      v-if="selectedUser"
      v-model="showBanUserModal"
      :user="selectedUser"
    />
    <AdminUnbanUserModal
      v-if="selectedUser"
      v-model="showUnbanUserModal"
      :user="selectedUser"
    />
    <AdminSubscriptionModal
      v-if="selectedUser"
      v-model="showSubscriptionModal"
      :user="selectedUser"
    />
  </div>
</template>
