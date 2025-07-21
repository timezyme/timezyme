<template>
  <div class="zyme-card-demo">
    <div class="zyme-card bg-gray-800/30 border border-gray-700 rounded-lg md:rounded-xl p-4 md:p-6 shadow-2xl">
      <!-- Card Header -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4 md:mb-6">
        <div>
          <h3 class="text-lg md:text-xl font-semibold text-white mb-1">
            Large Language Models: A Comprehensive Survey
          </h3>
          <p class="text-xs md:text-sm text-gray-400">
            Level 0 Summary
          </p>
        </div>
        <UBadge
          color="primary"
          variant="soft"
          class="self-start"
        >
          Research Paper
        </UBadge>
      </div>

      <!-- Card Grid -->
      <div class="grid md:grid-cols-2 gap-4 md:gap-6">
        <!-- Left Column -->
        <div class="space-y-4">
          <!-- Authors -->
          <div class="info-block">
            <h4 class="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <UIcon
                name="i-lucide-users"
                class="w-4 h-4"
              />
              Authors
            </h4>
            <p class="text-white">
              Zhang, L., Chen, M., Smith, J.
            </p>
            <p class="text-sm text-gray-400">
              Stanford University, MIT
            </p>
          </div>

          <!-- Key Takeaway -->
          <div class="info-block">
            <h4 class="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <UIcon
                name="i-lucide-lightbulb"
                class="w-4 h-4"
              />
              Key Takeaway
            </h4>
            <p class="text-white">
              Transformer architectures have revolutionized NLP, enabling unprecedented performance across diverse tasks through self-attention mechanisms.
            </p>
          </div>

          <!-- Keywords -->
          <div class="info-block">
            <h4 class="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <UIcon
                name="i-lucide-tags"
                class="w-4 h-4"
              />
              Keywords
            </h4>
            <div class="flex flex-wrap gap-2">
              <span class="keyword-tag">Transformers</span>
              <span class="keyword-tag">NLP</span>
              <span class="keyword-tag">GPT</span>
              <span class="keyword-tag">BERT</span>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-4">
          <!-- Metrics -->
          <div class="info-block">
            <h4 class="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <UIcon
                name="i-lucide-chart-bar"
                class="w-4 h-4"
              />
              Scope & Metrics
            </h4>
            <div class="flex items-center gap-4">
              <!-- Progress Dial -->
              <div class="relative w-20 h-20">
                <svg class="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="currentColor"
                    stroke-width="8"
                    fill="none"
                    class="text-gray-700"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="currentColor"
                    stroke-width="8"
                    fill="none"
                    stroke-dasharray="188.5"
                    stroke-dashoffset="47.125"
                    class="text-cyan-400 transition-all duration-1000"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-xl font-bold text-white">75%</span>
                </div>
              </div>
              <div>
                <p class="text-sm text-gray-400">
                  Comprehensiveness
                </p>
                <p class="text-xs text-gray-500">
                  Based on 150+ papers analyzed
                </p>
              </div>
            </div>
          </div>

          <!-- Findings Preview -->
          <div class="info-block">
            <h4 class="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <UIcon
                name="i-lucide-file-search"
                class="w-4 h-4"
              />
              Key Findings
            </h4>
            <ul class="text-sm text-white space-y-1">
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 mt-1">•</span>
                <span>Model scaling follows predictable power laws</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 mt-1">•</span>
                <span>Emergent abilities appear at specific scale thresholds</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-cyan-400 mt-1">•</span>
                <span>Few-shot learning improves with model size</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Interactive Hint -->
      <div class="mt-6 pt-6 border-t border-gray-700">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-400 italic">
            Click any section to dive deeper into L1 details
          </p>
          <UIcon
            name="i-lucide-mouse-pointer-click"
            class="w-5 h-5 text-gray-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-block {
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: all 0.2s;
}

.info-block:hover {
  background: rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
  cursor: pointer;
}

.keyword-tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.3);
  border-radius: 9999px;
  font-size: 0.875rem;
  color: rgb(6, 182, 212);
  transition: all 0.2s;
}

.keyword-tag:hover {
  background: rgba(6, 182, 212, 0.2);
  border-color: rgba(6, 182, 212, 0.5);
  cursor: pointer;
}

/* Animation for metrics dial */
@keyframes fillDial {
  from {
    stroke-dashoffset: 188.5;
  }
  to {
    stroke-dashoffset: 47.125;
  }
}

.zyme-card-demo circle:last-child {
  animation: fillDial 1.5s ease-out forwards;
}
</style>
