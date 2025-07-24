<script setup lang="ts">
const isVisible = ref(true)

function dismiss () {
  isVisible.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-300 ease-in"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
    <div
      v-if="isVisible"
      class="relative overflow-hidden bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm"
    >
      <!-- Background animation -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
      </div>

      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <UIcon
            name="i-lucide-rocket"
            class="w-6 h-6 text-cyan-400"
          />
        </div>

        <div class="flex-1 space-y-1">
          <h3 class="text-sm font-semibold text-cyan-300 flex items-center gap-2">
            Preview Documentation
            <UBadge
              color="primary"
              variant="soft"
              size="xs"
              class="font-medium"
            >
              Coming Soon
            </UBadge>
          </h3>
          <p class="text-sm text-gray-300">
            You're viewing documentation for TimeZyme's upcoming features. The platform is currently in development.
            <NuxtLink
              to="/#waitlist"
              class="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            >
              Join our waitlist
            </NuxtLink>
            to be notified when we launch!
          </p>
        </div>

        <button
          type="button"
          class="flex-shrink-0 text-gray-400 hover:text-gray-300 transition-colors"
          @click="dismiss"
        >
          <UIcon
            name="i-lucide-x"
            class="w-5 h-5"
          />
        </button>
      </div>
    </div>
  </Transition>
</template>
