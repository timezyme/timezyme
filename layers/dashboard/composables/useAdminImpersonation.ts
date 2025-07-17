export function useAdminImpersonation () {
  const { showErrorToast } = useAppToast()
  const logger = useLogger()
  const { fetch: fetchUserSession, session } = useUserSession()
  const { t } = useI18n()

  const impersonateUser = async (userId: string) => {
    try {
      await $fetch(`/api/admin/users/${userId}/impersonate`, {
        body: { reset: false },
        method: 'POST',
      })
      await fetchUserSession()
    }
    catch (error) {
      logger.error(`Failed to impersonate user with ID ${userId}`, error)
      showErrorToast(t('pages.admin.users.toast.impersonateError'), error)
    }
  }

  const resetImpersonation = async () => {
    try {
      const userId = session.value?.impersonatedBy
      if (!userId) {
        throw new Error('No user is being impersonated')
      }

      await $fetch(`/api/admin/users/${userId}/impersonate`, {
        method: 'DELETE',
      })
      await fetchUserSession()
    }
    catch (error) {
      logger.error('Failed to reset user impersonation', error)
      showErrorToast(t('pages.admin.users.toast.impersonateResetError'), error)
    }
  }

  return {
    impersonateUser,
    isImpersonating: computed(() => !!session.value?.impersonatedBy),
    resetImpersonation,
  }
}
