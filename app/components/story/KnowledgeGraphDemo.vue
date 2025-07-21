<script setup lang="ts">
import { onMounted } from 'vue'

interface Node {
  icon: string
  label: string
  main?: boolean
  x: number
  y: number
}

interface Connection {
  x1: number
  x2: number
  y1: number
  y2: number
}

const nodes = ref<Array<Node>>([
  { icon: '📄', label: 'LLM Survey', main: true, x: 400, y: 200 },
  { icon: '🔄', label: 'Transformers', x: 250, y: 150 },
  { icon: '🤖', label: 'GPT Models', x: 550, y: 150 },
  { icon: '👁️', label: 'Attention', x: 300, y: 280 },
  { icon: '📊', label: 'Scaling Laws', x: 500, y: 280 },
  { icon: '📑', label: 'BERT Paper', x: 150, y: 200 },
  { icon: '💡', label: 'Applications', x: 650, y: 200 },
  { icon: '🧠', label: 'Neural Nets', x: 400, y: 80 },
  { icon: '💬', label: 'NLP Tasks', x: 200, y: 320 },
  { icon: '🎯', label: 'Benchmarks', x: 600, y: 320 },
])

const connections = ref<Array<Connection>>([
  // From main node to immediate connections
  { x1: 400, x2: 250, y1: 200, y2: 150 },
  { x1: 400, x2: 550, y1: 200, y2: 150 },
  { x1: 400, x2: 300, y1: 200, y2: 280 },
  { x1: 400, x2: 500, y1: 200, y2: 280 },
  { x1: 400, x2: 400, y1: 200, y2: 80 },

  // Secondary connections
  { x1: 250, x2: 150, y1: 150, y2: 200 },
  { x1: 550, x2: 650, y1: 150, y2: 200 },
  { x1: 300, x2: 200, y1: 280, y2: 320 },
  { x1: 500, x2: 600, y1: 280, y2: 320 },

  // Cross connections
  { x1: 250, x2: 300, y1: 150, y2: 280 },
  { x1: 550, x2: 500, y1: 150, y2: 280 },
  { x1: 150, x2: 200, y1: 200, y2: 320 },
  { x1: 650, x2: 600, y1: 200, y2: 320 },
])

// Add floating animation to nodes
onMounted(() => {
  // Optional: Add subtle floating animation to nodes
  const nodeElements = document.querySelectorAll('.node-group')
  nodeElements.forEach((node, index) => {
    const delay = index * 0.3
    const duration = 3 + Math.random() * 2

    node.animate([
      { transform: 'translate(0, 0)' },
      { transform: 'translate(0, -5px)' },
      { transform: 'translate(0, 0)' },
    ], {
      delay: delay * 1000,
      duration: duration * 1000,
      easing: 'ease-in-out',
      iterations: Infinity,
    })
  })
})
</script>

<template>
  <div class="knowledge-graph-demo">
    <div class="graph-container">
      <svg
        class="graph-svg"
        viewBox="0 0 800 400"
      >
        <!-- Connections -->
        <g class="connections">
          <line
            v-for="(connection, index) in connections"
            :key="`conn-${index}`"
            :x1="connection.x1"
            :y1="connection.y1"
            :x2="connection.x2"
            :y2="connection.y2"
            stroke="url(#line-gradient)"
            stroke-width="1"
            opacity="0.3"
            class="connection-line"
            :style="{ animationDelay: `${index * 0.1}s` }"
          />
        </g>

        <!-- Nodes -->
        <g class="nodes">
          <g
            v-for="(node, index) in nodes"
            :key="`node-${index}`"
            :transform="`translate(${node.x}, ${node.y})`"
            class="node-group"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <!-- Node circle -->
            <circle
              :r="node.main ? 20 : 15"
              :fill="node.main ? 'url(#main-gradient)' : 'rgba(30, 41, 59, 0.8)'"
              stroke="currentColor"
              stroke-width="2"
              :class="node.main ? 'text-cyan-400' : 'text-gray-600'"
            />

            <!-- Node icon -->
            <text
              text-anchor="middle"
              dominant-baseline="middle"
              fill="white"
              :font-size="node.main ? 16 : 12"
            >
              {{ node.icon }}
            </text>

            <!-- Node label -->
            <text
              y="35"
              text-anchor="middle"
              fill="currentColor"
              font-size="10"
              class="text-gray-300"
            >
              {{ node.label }}
            </text>
          </g>
        </g>

        <!-- Gradients -->
        <defs>
          <linearGradient
            id="line-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              stop-color="#06b6d4"
              stop-opacity="0.2"
            />
            <stop
              offset="50%"
              stop-color="#3b82f6"
              stop-opacity="0.4"
            />
            <stop
              offset="100%"
              stop-color="#06b6d4"
              stop-opacity="0.2"
            />
          </linearGradient>

          <radialGradient id="main-gradient">
            <stop
              offset="0%"
              stop-color="#06b6d4"
            />
            <stop
              offset="100%"
              stop-color="#0891b2"
            />
          </radialGradient>
        </defs>
      </svg>

      <!-- Legend -->
      <div class="legend mt-6 flex items-center justify-center gap-8 text-sm">
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600" />
          <span class="text-gray-400">Current Zyme</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-gray-700 border border-gray-600" />
          <span class="text-gray-400">Related Zymes</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.graph-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.graph-svg {
  width: 100%;
  height: auto;
  max-height: 400px;
}

.connection-line {
  animation: drawConnection 1s ease-out forwards;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
}

@keyframes drawConnection {
  to {
    stroke-dashoffset: 0;
  }
}

.node-group {
  animation: popIn 0.5s ease-out forwards;
  opacity: 0;
  transform-origin: center;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.node-group:hover circle {
  filter: brightness(1.2);
  transform: scale(1.1);
  transition: all 0.2s;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .connection-line,
  .node-group {
    animation: none;
    opacity: 1;
  }
}
</style>
