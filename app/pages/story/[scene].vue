<script setup lang="ts">
definePageMeta({
  layout: 'story',
})

const route = useRoute()
const { getScene } = useStoryScenes()

// Get current scene
const sceneId = computed(() => {
  const params = route.params as { scene?: string }
  const param = params.scene || '1'
  const id = Number.parseInt(param)
  return Number.isNaN(id) || id < 1 || id > 7 ? 1 : id
})

const scene = computed(() => getScene(sceneId.value))

// Transition name based on scene animation type
const transitionName = computed(() => scene.value.animation?.type || 'fade')

// Transition hooks
function onBeforeEnter (el: Element) {
  const element = el as HTMLElement
  element.style.opacity = '0'

  if (transitionName.value === 'slide') {
    element.style.transform = 'translateX(50px)'
  }
  else if (transitionName.value === 'scale') {
    element.style.transform = 'scale(0.9)'
  }
}

function onEnter (el: Element, done: () => void) {
  const element = el as HTMLElement

  requestAnimationFrame(() => {
    element.style.transition = 'all 0.5s ease-out'
    element.style.opacity = '1'
    element.style.transform = 'translateX(0) scale(1)'

    setTimeout(done, 500)
  })
}

function onLeave (el: Element, done: () => void) {
  const element = el as HTMLElement
  element.style.transition = 'all 0.3s ease-in'
  element.style.opacity = '0'

  if (transitionName.value === 'slide') {
    element.style.transform = 'translateX(-50px)'
  }
  else if (transitionName.value === 'scale') {
    element.style.transform = 'scale(0.9)'
  }

  setTimeout(done, 300)
}

// Set page title
useHead({
  title: computed(() => `${scene.value.title} - TimeZyme Story`),
})

// Handle video error by falling back to image
function handleVideoError (_event: Event) {
  // Video element will naturally fall back to poster image
}
</script>

<template>
  <div class="story-scene min-h-screen flex items-center justify-center p-4">
    <Transition
      :name="transitionName"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <div
        :key="scene?.id || 1"
        class="scene-content max-w-6xl mx-auto w-full"
      >
        <!-- Scene Container -->
        <div class="scene-container relative bg-gray-900/50 backdrop-blur-sm rounded-lg md:rounded-2xl border border-gray-800 p-4 sm:p-6 md:p-8 lg:p-12">
          <!-- Background Effects -->
          <div
            v-if="scene?.id === 1"
            class="chaos-background absolute inset-0 overflow-hidden rounded-2xl"
          >
            <div
              v-for="i in 8"
              :key="i"
              class="floating-doc absolute opacity-10"
              :style="{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }"
            >
              <UIcon
                name="i-lucide-file-text"
                class="w-12 h-12 text-gray-400"
              />
            </div>
          </div>

          <div
            v-if="scene?.id === 6"
            class="graph-background absolute inset-0 overflow-hidden rounded-2xl"
          >
            <svg class="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern
                  id="graph-pattern"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="1"
                    fill="currentColor"
                    class="text-cyan-400"
                  />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#graph-pattern)"
              />
            </svg>
          </div>

          <!-- Content -->
          <div class="relative z-10">
            <!-- Scene Header -->
            <div class="text-center mb-6 md:mb-8">
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 md:mb-4">
                {{ scene?.title || '' }}
              </h1>
              <p
                v-if="scene?.subtitle"
                class="text-base sm:text-lg md:text-xl text-gray-400 px-4 sm:px-0"
              >
                {{ scene?.subtitle }}
              </p>
            </div>

            <!-- Scene Content -->
            <div class="scene-body max-w-4xl mx-auto">
              <!-- Main Heading -->
              <h2
                v-if="scene?.content?.heading"
                class="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-4 md:mb-6 text-center"
              >
                {{ scene?.content?.heading }}
              </h2>

              <!-- Main Text -->
              <p
                v-if="scene?.content?.text"
                class="text-base sm:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed text-center px-2 sm:px-0"
              >
                {{ scene?.content?.text }}
              </p>

              <!-- Bullet Points -->
              <ul
                v-if="scene?.content?.bulletPoints"
                class="space-y-4 mb-8 max-w-2xl mx-auto"
              >
                <li
                  v-for="(point, index) in scene?.content?.bulletPoints || []"
                  :key="index"
                  class="flex items-start gap-3 text-gray-300"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  <UIcon
                    name="i-lucide-check-circle"
                    class="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0"
                  />
                  <span>{{ point }}</span>
                </li>
              </ul>

              <!-- Scene Media -->
              <div
                v-if="scene?.content?.animatedVideoSrc || scene?.content?.imageSrc"
                class="scene-media mt-8"
              >
                <!-- Video if available -->
                <video
                  v-if="scene?.content?.animatedVideoSrc"
                  :src="scene.content.animatedVideoSrc"
                  :poster="scene?.content?.imageSrc"
                  class="w-full h-auto rounded-lg shadow-2xl"
                  autoplay
                  loop
                  muted
                  playsinline
                  @error="handleVideoError"
                >
                  <!-- Fallback to image if video fails -->
                  <img
                    v-if="scene?.content?.imageSrc"
                    :src="scene.content.imageSrc"
                    :alt="scene?.title"
                    class="w-full h-auto rounded-lg shadow-2xl"
                  >
                </video>

                <!-- Image only (no video) -->
                <img
                  v-else-if="scene?.content?.imageSrc"
                  :src="scene.content.imageSrc"
                  :alt="scene?.title"
                  class="w-full h-auto rounded-lg shadow-2xl"
                >
              </div>

              <!-- Call to Action for final scene -->
              <div
                v-if="scene?.id === 7"
                class="mt-12 text-center"
              >
                <div class="inline-flex flex-col sm:flex-row gap-4">
                  <UButton
                    size="lg"
                    color="primary"
                    to="/waitlist"
                    class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    Join the Waitlist
                  </UButton>
                  <UButton
                    size="lg"
                    variant="outline"
                    to="/about"
                  >
                    Learn More
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.gradient-text {
  background: var(--timezyme-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.floating-doc {
  animation: float 10s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(20px, -30px) rotate(5deg);
  }
  50% {
    transform: translate(-20px, 20px) rotate(-5deg);
  }
  75% {
    transform: translate(30px, 10px) rotate(3deg);
  }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .floating-doc {
    animation: none;
  }

  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

/* Scene-specific styles */
.scene-container {
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scene media styles */
.scene-media {
  max-width: 100%;
  margin: 2rem auto;
}

.scene-media video,
.scene-media img {
  object-fit: cover;
  max-height: 600px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .scene-container {
    min-height: 500px;
  }

  .scene-media video,
  .scene-media img {
    max-height: 400px;
  }
}
</style>
