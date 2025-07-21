<script setup lang="ts">
const route = useRoute()
const router = useRouter()

// Total number of scenes
const totalScenes = 7

// Get current scene from route
const currentScene = computed(() => {
  const params = route.params as { scene?: string }
  const sceneParam = params.scene || '1'
  const sceneNum = Number.parseInt(sceneParam)
  return Number.isNaN(sceneNum) ? 1 : Math.min(Math.max(1, sceneNum), totalScenes)
})

// Navigation functions
function navigateToPrevious () {
  if (currentScene.value > 1) {
    router.push(`/story/${currentScene.value - 1}`)
  }
}

function navigateToNext () {
  if (currentScene.value < totalScenes) {
    router.push(`/story/${currentScene.value + 1}`)
  }
}

function handleClose () {
  // Go back to previous page or home
  if (window.history.length > 1) {
    router.back()
  }
  else {
    router.push('/')
  }
}

// Keyboard navigation
onMounted(() => {
  function handleKeydown (e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowLeft':
        navigateToPrevious()
        break
      case 'ArrowRight':
        navigateToNext()
        break
      case 'Escape':
        handleClose()
        break
    }
  }

  window.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})

// Preloading handled by Nuxt's built-in prefetching
</script>

<template>
  <div class="story-layout min-h-screen bg-timezyme-bg-dark">
    <!-- Story Header -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <!-- Logo/Home Link -->
          <NuxtLink
            to="/"
            class="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="w-5 h-5"
            />
            <span class="font-semibold">TimeZyme</span>
          </NuxtLink>

          <!-- Progress Indicator -->
          <div class="flex items-center gap-2">
            <div
              v-for="i in totalScenes"
              :key="i"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="i === currentScene ? 'w-8 bg-cyan-400' : i < currentScene ? 'bg-cyan-600' : 'bg-gray-600'"
            />
          </div>

          <!-- Close Button -->
          <button
            class="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close story"
            @click="handleClose"
          >
            <UIcon
              name="i-lucide-x"
              class="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="pt-14 min-h-screen">
      <slot />
    </main>

    <!-- Navigation Controls -->
    <nav class="fixed bottom-0 left-0 right-0 z-40 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Previous Button -->
          <button
            :disabled="currentScene === 1"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all"
            :class="currentScene === 1
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:text-cyan-400'"
            @click="navigateToPrevious"
          >
            <UIcon
              name="i-lucide-chevron-left"
              class="w-4 h-4"
            />
            <span class="hidden sm:inline">Previous</span>
          </button>

          <!-- Scene Indicator -->
          <div class="text-center">
            <p class="text-sm text-gray-400">
              Scene <span class="text-white font-semibold">{{ currentScene }}</span> of {{ totalScenes }}
            </p>
          </div>

          <!-- Next Button -->
          <button
            :disabled="currentScene === totalScenes"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all"
            :class="currentScene === totalScenes
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-white hover:text-cyan-400'"
            @click="navigateToNext"
          >
            <span class="hidden sm:inline">Next</span>
            <UIcon
              name="i-lucide-chevron-right"
              class="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.story-layout {
  --timezyme-bg-dark: #0a0a0a;
}
</style>
