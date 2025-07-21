<script setup lang="ts">
const showSecondZyme = ref(false)
const showConnection = ref(false)
const showTooltip = ref(false)

function triggerHop () {
  showTooltip.value = false
  setTimeout(() => {
    showSecondZyme.value = true
    setTimeout(() => {
      showConnection.value = true
    }, 300)
  }, 300)
}

function resetDemo () {
  showConnection.value = false
  showSecondZyme.value = false
}
</script>

<template>
  <div class="knowledge-hop-demo">
    <div class="demo-container">
      <!-- Current Zyme -->
      <Transition name="slide-out">
        <div
          v-if="!showSecondZyme"
          class="zyme-mini-card"
        >
          <div class="card-content bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <h4 class="font-semibold text-white mb-2">
              Current: LLM Survey
            </h4>
            <p class="text-sm text-gray-300 mb-3">
              Exploring transformer architectures and their impact on
              <span
                class="keyword"
                @click="triggerHop"
                @mouseenter="showTooltip = true"
                @mouseleave="showTooltip = false"
              >
                NP-Completeness
                <Transition name="fade">
                  <span
                    v-if="showTooltip"
                    class="tooltip"
                  >
                    Click to explore this concept
                  </span>
                </Transition>
              </span>
              in optimization problems...
            </p>
          </div>
        </div>
      </Transition>

      <!-- New Zyme -->
      <Transition name="slide-in">
        <div
          v-if="showSecondZyme"
          class="zyme-mini-card"
        >
          <div class="card-content bg-gray-800/30 border border-gray-700 rounded-lg p-4">
            <h4 class="font-semibold text-white mb-2">
              NP-Completeness Explained
            </h4>
            <p class="text-sm text-gray-300 mb-3">
              A foundational concept in computational complexity theory, describing problems
              for which solutions can be verified quickly but may be hard to find...
            </p>
            <div class="flex gap-2 mt-3">
              <span class="related-tag">Complexity Theory</span>
              <span class="related-tag">P vs NP</span>
              <span class="related-tag">Algorithms</span>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Connection Line -->
      <Transition name="draw-line">
        <svg
          v-if="showConnection"
          class="connection-svg"
          viewBox="0 0 400 100"
        >
          <path
            d="M 50 50 Q 200 20 350 50"
            stroke="url(#gradient)"
            stroke-width="2"
            fill="none"
            stroke-dasharray="300"
            stroke-dashoffset="300"
            class="connection-path"
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stop-color="#06b6d4"
              />
              <stop
                offset="100%"
                stop-color="#3b82f6"
              />
            </linearGradient>
          </defs>
        </svg>
      </Transition>

      <!-- Reset Button -->
      <div class="text-center mt-8">
        <button
          v-if="showSecondZyme"
          class="text-sm text-gray-400 hover:text-white transition-colors"
          @click="resetDemo"
        >
          <UIcon
            name="i-lucide-refresh-cw"
            class="w-4 h-4 inline mr-1"
          />
          Reset Demo
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zyme-mini-card {
  width: 100%;
  max-width: 400px;
}

.keyword {
  color: #06b6d4;
  text-decoration: underline;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

.keyword:hover {
  color: #0891b2;
  text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  margin-bottom: 4px;
  pointer-events: none;
}

.related-tag {
  display: inline-block;
  padding: 2px 8px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: rgb(59, 130, 246);
}

.connection-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 100px;
  pointer-events: none;
}

.connection-path {
  animation: drawPath 1s ease-out forwards;
}

@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

/* Transitions */
.slide-out-leave-active {
  transition: all 0.5s ease-out;
}

.slide-out-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

.slide-in-enter-active {
  transition: all 0.5s ease-out;
}

.slide-in-enter-from {
  transform: translateX(50px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.draw-line-enter-active {
  transition: opacity 0.3s;
}

.draw-line-enter-from {
  opacity: 0;
}
</style>
