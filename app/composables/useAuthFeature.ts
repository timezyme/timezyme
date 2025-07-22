export function useAuthFeature () {
  const config = useRuntimeConfig()

  return {
    isDisabled: computed(() => !config.public.authEnabled),
    isEnabled: computed(() => config.public.authEnabled),
  }
}
