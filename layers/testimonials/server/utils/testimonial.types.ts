export interface Testimonial {
  author: {
    avatar?: {
      loading: 'lazy'
      src: string
    }
    description?: string
    name: string
  }
  id: string
  quote: string
  source?: {
    name: string
    url?: string
  }
}
