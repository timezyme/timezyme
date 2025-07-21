export interface Scene {
  animation?: {
    duration?: number
    type: 'chaos-to-order' | 'fade' | 'scale' | 'slide'
  }
  content: {
    animatedVideoSrc?: string
    bulletPoints?: Array<string>
    heading?: string
    imagePrompt?: string
    imageSrc?: string
    text?: string
    videoSrc?: string
  }
  id: number
  subtitle?: string
  title: string
}

export function useStoryScenes () {
  const scenes: Array<Scene> = [
    {
      animation: {
        type: 'chaos-to-order',
      },
      content: {
        animatedVideoSrc: '/images/story/1/story1-animated-1.mp4',
        heading: 'The Research Overwhelm',
        imageSrc: '/images/story/1/story1.jpeg',
        text: 'In today\'s world, researchers and analysts spend countless hours sifting through dense PDFs, academic papers, and technical documents. The information exists, but extracting insights is a manual, linear, and frustrating process.',
      },
      id: 1,
      subtitle: 'Knowledge is trapped in dense documents',
      title: 'The Problem',
    },
    {
      animation: {
        type: 'scale',
      },
      content: {
        bulletPoints: [
          'Upload any PDF or document',
          'AI extracts and structures key information',
          'Creates interactive, multi-layered summaries',
          'Links concepts across your knowledge base',
        ],
        heading: 'Transform Documents into Interactive Knowledge',
        text: 'TimeZyme uses advanced AI to instantly transform any document into a structured, interactive knowledge object called a Zyme. No more endless scrolling or manual note-taking.',
      },
      id: 2,
      subtitle: 'TimeZyme sets knowledge free',
      title: 'The Solution',
    },
    {
      animation: {
        type: 'fade',
      },
      content: {
        animatedVideoSrc: '/images/story/3/story3-animated-1.mp4',
        heading: 'Grasp Core Insights in Seconds',
        imageSrc: '/images/story/3/story3.jpeg',
        text: 'The Level 0 (L0) Zyme is your document\'s intelligent dashboard. See authors, key findings, methodology, and metrics at a glance. No more hunting through pages for that one crucial statistic.',
      },
      id: 3,
      subtitle: 'The L0 Zyme - Your document dashboard',
      title: 'Instant Clarity',
    },
    {
      animation: {
        type: 'slide',
      },
      content: {
        animatedVideoSrc: '/images/story/4/story4-animated-1.mp4',
        bulletPoints: [
          'L0: High-level summary and key metrics',
          'L1: Detailed findings and methodology',
          'L2: Full context and source material',
          'L3: Original document with AI annotations',
        ],
        heading: 'From Summary to Source',
        imageSrc: '/images/story/4/story4.jpeg',
        text: 'Click any section to dive deeper. L1 reveals detailed findings, L2 shows full context. You control the depth, exploring only what matters to your research.',
      },
      id: 4,
      subtitle: 'Dive as deep as you need',
      title: 'Progressive Disclosure',
    },
    {
      animation: {
        type: 'slide',
      },
      content: {
        animatedVideoSrc: '/images/story/5/story5-animated-1.mp4',
        heading: 'Discover Hidden Connections',
        imageSrc: '/images/story/5/story5.jpeg',
        text: 'This is where TimeZyme truly shines. Click on any keyword, author, or concept to instantly jump to related Zymes. Build your web of knowledge naturally as you explore.',
      },
      id: 5,
      subtitle: 'Connect everything',
      title: 'The Knowledge Hop',
    },
    {
      animation: {
        type: 'scale',
      },
      content: {
        animatedVideoSrc: '/images/story/6/story6-animated-1.mp4',
        heading: 'See the Bigger Picture',
        imageSrc: '/images/story/6/story6.jpeg',
        text: 'As you explore, TimeZyme builds a visual map of your research. See how papers connect, track citation networks, and discover unexpected relationships between concepts.',
      },
      id: 6,
      subtitle: 'Your research ecosystem',
      title: 'The Knowledge Graph',
    },
    {
      animation: {
        type: 'fade',
      },
      content: {
        bulletPoints: [
          'Save hours on literature reviews',
          'Never miss important connections',
          'Build lasting knowledge networks',
          'Collaborate with AI-enhanced understanding',
        ],
        heading: 'TimeZyme',
        imageSrc: '/images/story/7/story7.jpeg',
        text: 'Stop drowning in documents. Start discovering insights.',
      },
      id: 7,
      subtitle: 'Research, reimagined',
      title: 'Join the Future',
    },
  ]

  const getScene = (id: number): Scene => {
    const found = scenes.find(scene => scene.id === id)
    return found || scenes[0]!
  }

  const getTotalScenes = () => scenes.length

  return {
    getScene,
    getTotalScenes,
    scenes,
  }
}
