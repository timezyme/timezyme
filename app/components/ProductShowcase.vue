<script setup lang="ts">
interface Screenshot {
  category: string
  description: string
  id: string
  image: string
  title: string
}

const screenshots: Array<Screenshot> = [
  {
    category: 'Overview',
    description: 'Your command center for document transformation and knowledge discovery',
    id: 'dashboard',
    image: '/images/tz-in-action/intelligent-dashboard.jpeg',
    title: 'Intelligent Dashboard',
  },
  {
    category: 'Getting Started',
    description: 'Drag and drop any document - PDFs, Word docs, presentations, and more',
    id: 'upload',
    image: '/images/tz-in-action/simple-doc-upload.jpeg',
    title: 'Simple Document Upload',
  },
  {
    category: 'Core Features',
    description: 'Dive from high-level summaries to detailed analysis with L0-L3 layers',
    id: 'layers',
    image: '/images/tz-in-action/progressive-layers.jpeg',
    title: 'Progressive Layers',
  },
  {
    category: 'Timeline Analysis',
    description: 'See chronological events and key dates extracted from your documents',
    id: 'timeline',
    image: '/images/tz-in-action/timeline-view.jpeg',
    title: 'Timeline View',
  },
  {
    category: 'Concept Mapping',
    description: 'Explore concepts and relationships in an interactive knowledge map',
    id: 'mindmap',
    image: '/images/tz-in-action/mind-map-viz.jpeg',
    title: 'Mind Map Visualization',
  },
  {
    category: 'Advanced Features',
    description: 'Discover connections across your entire document library',
    id: 'graph',
    image: '/images/tz-in-action/knowledge-graph.jpeg',
    title: 'Knowledge Graph',
  },
]

const selectedCategory = ref('All')
const categories = computed(() => {
  const cats = ['All', ...new Set(screenshots.map(s => s.category))]
  return cats
})

const filteredScreenshots = computed(() => {
  if (selectedCategory.value === 'All')
    return screenshots
  return screenshots.filter(s => s.category === selectedCategory.value)
})
</script>

<template>
  <section class="py-20 px-4 bg-gray-900/50">
    <UContainer class="max-w-6xl">
      <div class="text-center space-y-4 mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-white">
          Explore TimeZyme's Capabilities
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          Transform complex documents into interactive visual experiences that accelerate understanding and unlock insights.
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-2 mb-12">
        <UButton
          v-for="category in categories"
          :key="category"
          :variant="selectedCategory === category ? 'solid' : 'ghost'"
          color="primary"
          size="sm"
          @click="selectedCategory = category"
        >
          {{ category }}
        </UButton>
      </div>

      <!-- Screenshots Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="screenshot in filteredScreenshots"
          :key="screenshot.id"
          class="group relative overflow-hidden rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
        >
          <!-- Screenshot Image -->
          <div class="aspect-video relative overflow-hidden">
            <img
              :src="screenshot.image"
              :alt="screenshot.title"
              class="w-full h-full object-cover"
              loading="lazy"
            >

            <!-- Category Badge with backdrop -->
            <div class="absolute top-4 left-4">
              <div class="backdrop-blur-md bg-gray-900/80 rounded-lg p-1">
                <UBadge
                  color="primary"
                  variant="solid"
                  class="font-medium"
                >
                  {{ screenshot.category }}
                </UBadge>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-white mb-2">
              {{ screenshot.title }}
            </h3>
            <p class="text-sm text-gray-400">
              {{ screenshot.description }}
            </p>
          </div>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      <!-- Demo CTA -->
      <div class="text-center mt-16">
        <div class="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg">
          <UIcon
            name="i-lucide-play-circle"
            class="text-4xl text-cyan-400"
          />
          <div class="text-left">
            <h3 class="text-lg font-semibold text-white">
              Ready to see TimeZyme in action?
            </h3>
            <p class="text-sm text-gray-400">
              Live demo walkthrough of these features coming soon
            </p>
          </div>
          <UButton
            variant="solid"
            color="primary"
            size="lg"
            icon="i-lucide-external-link"
            disabled
          >
            Coming Soon
          </UButton>
        </div>
      </div>
    </UContainer>
  </section>
</template>
