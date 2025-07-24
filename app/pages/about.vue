<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
</script>

<template>
  <div class="min-h-screen">
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-4 mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            About TimeZyme
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Illuminating Knowledge, Connecting Insights
          </p>
        </div>

        <div class="space-y-12">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/10 rounded-full mb-6">
              <UIcon
                name="i-lucide-sparkles"
                class="text-4xl text-cyan-400"
              />
            </div>
            <h2 class="text-3xl font-bold mb-4 gradient-text">
              Our Vision
            </h2>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
              We're transforming how professionals interact with knowledge. TimeZyme converts static documents into <span class="text-cyan-400 font-semibold">Zymes</span>—interactive, layered knowledge maps that let you understand faster, explore flexibly, and connect insights instantly across an ever-expanding intelligent knowledge graph.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 mt-16">
            <div class="text-center">
              <div class="text-4xl font-bold text-cyan-400 mb-2">
                75%
              </div>
              <div class="text-gray-400">
                Time Savings
              </div>
              <p class="text-sm text-gray-500 mt-2">
                47-min legal opinion → 12-min Zyme
              </p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-cyan-400 mb-2">
                85%
              </div>
              <div class="text-gray-400">
                Better Retention
              </div>
              <p class="text-sm text-gray-500 mt-2">
                Through visual learning
              </p>
            </div>
            <div class="text-center">
              <div class="text-4xl font-bold text-cyan-400 mb-2">
                100+
              </div>
              <div class="text-gray-400">
                Document Types
              </div>
              <p class="text-sm text-gray-500 mt-2">
                Legal, scientific, business & more
              </p>
            </div>
          </div>

          <div class="bg-gray-800/30 rounded-lg p-8 mt-12">
            <h3 class="text-2xl font-bold mb-4">
              The Problem We Solve
            </h3>
            <p class="text-gray-300 mb-4">
              Professionals are drowning in dense documents—legal opinions, research papers, financial reports. Traditional reading is slow, linear, and disconnected. Critical insights are missed, and countless hours are lost to inefficient knowledge work.
            </p>
            <p class="text-gray-300">
              TimeZyme transforms this experience entirely. We're not just another summarization tool—we're building a <span class="text-cyan-400 font-semibold">graph-native knowledge platform</span> where every document becomes a node in an interconnected web of insights.
            </p>
          </div>

          <div class="mt-16">
            <h3 class="text-2xl font-bold mb-8 text-center">
              Core Technology Pillars
            </h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-gray-800/20 rounded-lg p-6">
                <div class="flex items-center mb-3">
                  <UIcon
                    name="i-lucide-brain"
                    class="text-2xl text-cyan-400 mr-3"
                  />
                  <h4 class="text-lg font-semibold">
                    AI-Powered Transformation
                  </h4>
                </div>
                <p class="text-gray-400 text-sm">
                  Sophisticated AI pipelines distill complex material into clear, structured Zymes with continuous improvement via Reinforcement Learning from Human Feedback (RLHF).
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-6">
                <div class="flex items-center mb-3">
                  <UIcon
                    name="i-lucide-layers"
                    class="text-2xl text-cyan-400 mr-3"
                  />
                  <h4 class="text-lg font-semibold">
                    Progressive Disclosure
                  </h4>
                </div>
                <p class="text-gray-400 text-sm">
                  Navigate through layers (L0-L3) from high-level highlights to detailed summaries to source material, getting exactly the depth you need.
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-6">
                <div class="flex items-center mb-3">
                  <UIcon
                    name="i-lucide-network"
                    class="text-2xl text-cyan-400 mr-3"
                  />
                  <h4 class="text-lg font-semibold">
                    Intelligent Knowledge Graph
                  </h4>
                </div>
                <p class="text-gray-400 text-sm">
                  Each Zyme connects to others through typed relationships, enabling multi-hop queries and pathfinding across your entire knowledge base.
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-6">
                <div class="flex items-center mb-3">
                  <UIcon
                    name="i-lucide-user-check"
                    class="text-2xl text-cyan-400 mr-3"
                  />
                  <h4 class="text-lg font-semibold">
                    Personalized Insights
                  </h4>
                </div>
                <p class="text-gray-400 text-sm">
                  Our Knowledge Concierge proactively suggests relevant Zymes based on your activity, while My Zyme Map visualizes your learning journey.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-16">
            <h3 class="text-2xl font-bold mb-8 text-center">
              What We Transform
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div class="bg-gray-800/20 rounded-lg p-4">
                <p class="text-gray-300 text-sm">
                  Legal Briefs & Cases
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-4">
                <p class="text-gray-300 text-sm">
                  Scientific Papers
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-4">
                <p class="text-gray-300 text-sm">
                  Financial Reports
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-4">
                <p class="text-gray-300 text-sm">
                  Clinical Studies
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-4">
                <p class="text-gray-300 text-sm">
                  Technical Specs
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-4">
                <p class="text-gray-300 text-sm">
                  Policy Papers
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-4">
                <p class="text-gray-300 text-sm">
                  Patent Applications
                </p>
              </div>
              <div class="bg-gray-800/20 rounded-lg p-4">
                <p class="text-gray-300 text-sm">
                  And 90+ more...
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-8 mt-12">
            <h3 class="text-2xl font-bold mb-4">
              Our Strategic Impact
            </h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-start">
                <UIcon
                  name="i-lucide-check-circle"
                  class="text-cyan-400 mr-3 mt-0.5 flex-shrink-0"
                />
                <span><strong>Revolutionize Professional Productivity:</strong> Drastically reduce time spent on information processing</span>
              </li>
              <li class="flex items-start">
                <UIcon
                  name="i-lucide-check-circle"
                  class="text-cyan-400 mr-3 mt-0.5 flex-shrink-0"
                />
                <span><strong>Democratize Expertise:</strong> Make complex knowledge accessible to broader audiences</span>
              </li>
              <li class="flex items-start">
                <UIcon
                  name="i-lucide-check-circle"
                  class="text-cyan-400 mr-3 mt-0.5 flex-shrink-0"
                />
                <span><strong>Unlock Collective Intelligence:</strong> Build, navigate, and leverage shared knowledge assets</span>
              </li>
              <li class="flex items-start">
                <UIcon
                  name="i-lucide-check-circle"
                  class="text-cyan-400 mr-3 mt-0.5 flex-shrink-0"
                />
                <span><strong>Create a New Knowledge Economy:</strong> Position TimeZyme as the essential platform for interactive knowledge discovery</span>
              </li>
            </ul>
          </div>

          <div class="text-center mt-16">
            <h3 class="text-2xl font-bold mb-4">
              The Future with TimeZyme
            </h3>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
              Imagine a world where understanding any complex topic is no longer a battle against dense text, but an intuitive exploration through an interconnected web of insights. Where discovery is accelerated, connections are illuminated, and knowledge truly empowers.
            </p>
            <p class="text-xl font-semibold text-cyan-400 mt-6">
              TimeZyme is building that future, one Zyme at a time.
            </p>
          </div>

          <!-- Founder Section -->
          <div class="mt-20 border-t border-gray-800 pt-20">
            <h2 class="text-3xl font-bold text-center mb-12 gradient-text">
              Meet the Founder
            </h2>

            <div class="bg-gray-800/30 rounded-lg p-8 max-w-4xl mx-auto">
              <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                <!-- Photo -->
                <div class="flex-shrink-0">
                  <img
                    src="/images/team/stephen-pasco.png"
                    alt="Stephen Pasco - Founder & CEO of TimeZyme"
                    class="w-48 h-48 rounded-full object-cover border-4 border-cyan-500/20"
                  >
                </div>

                <!-- Bio Content -->
                <div class="flex-1 text-center md:text-left">
                  <h3 class="text-2xl font-bold text-white mb-2">
                    Stephen Pasco
                  </h3>
                  <p class="text-cyan-400 font-semibold mb-4">
                    Founder & CEO
                  </p>

                  <!-- LinkedIn Button -->
                  <a
                    href="https://www.linkedin.com/in/stephenpasco/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors mb-6"
                  >
                    <UIcon
                      name="i-mdi-linkedin"
                      class="text-xl"
                    />
                    <span>Connect on LinkedIn</span>
                  </a>

                  <p class="text-gray-300 mb-4">
                    Stephen is a seasoned software engineer with 21 years of experience across entertainment, engineering, and finance sectors. His extensive background in building secure, high-performance, and scalable applications led to the creation of TimeZyme, incubated at the Harvard Innovation Labs.
                  </p>

                  <p class="text-gray-300 mb-4">
                    Stephen brings deep expertise from his tenure at industry leaders including Goldman Sachs (Senior Vice President), The Walt Disney Company (Senior Software Engineer), and Qualcomm Institute. He specializes in enterprise software development, security engineering, and architecting cloud-based solutions. His experience spans full-stack development, compliance frameworks, and building mission-critical applications for global organizations.
                  </p>

                  <p class="text-gray-300">
                    Currently pursuing his Bachelor of Liberal Arts in Computer Science at Harvard University (expected graduation: Fall 2025), Stephen combines academic rigor with decades of practical experience. He's driven by the vision of leveraging AI to transform how professionals interact with complex documents and information.
                  </p>

                  <div class="mt-6 pt-6 border-t border-gray-700">
                    <p class="text-sm text-gray-400 italic">
                      "Every professional deserves tools that respect their intelligence while amplifying their capabilities. TimeZyme isn't just about reading faster—it's about understanding deeper and connecting insights that were previously invisible."
                    </p>
                    <p class="text-sm text-gray-500 mt-2">
                      — Stephen Pasco, Founder & CEO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center items-center gap-4 mt-12">
          <UButton
            to="/"
            variant="soft"
            color="primary"
            size="lg"
            icon="i-lucide-arrow-left"
          >
            Back to Home
          </UButton>
          <UButton
            to="/playbook"
            variant="outline"
            color="primary"
            size="lg"
            icon="i-lucide-book-open"
            trailing
          >
            Learn How It Works
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
