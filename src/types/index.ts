export type TemplateCategory = 'all' | 'anime' | 'animals' | 'doodles' | 'nature' | 'cartoons' | 'custom'

export type FilterMode = 'original' | 'edge' | 'sketch' | 'high-contrast'

export interface FilterConfig {
  mode: FilterMode
  opacity: number       // 0 - 100
  contrast: number      // 50 - 200
  brightness: number    // 50 - 150
  edgeSensitivity: number // 10 - 100 (threshold)
  invertColors: boolean
  removeWhiteBg: boolean
}

export interface TransformState {
  x: number
  y: number
  scale: number
  rotation: number
  flipH: boolean
  flipV: boolean
}

export interface Template {
  id: string
  title: string
  category: TemplateCategory
  difficulty: 'Easy' | 'Medium' | 'Detailed'
  thumbnail: string // SVG data URI or image URL
  fullImage: string // High-res SVG data URI or image URL
  description?: string
  isUserUpload?: boolean
  createdAt?: number
}

export interface UserDrawing {
  id: string
  title: string
  dataUrl: string
  createdAt: number
  thumbnailUrl: string
}
