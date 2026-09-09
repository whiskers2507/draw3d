import type { Template } from '../types'

function svgToDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`
}

// 1. Anime: Expressive Manga Eye & Silhouette
const animeMangaEye = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
  <!-- Upper Eyelid Thick Curve -->
  <path d="M 80 190 Q 200 110 320 180" stroke-width="12" />
  <path d="M 120 170 Q 200 125 290 175" stroke-width="4" />
  <!-- Eyelashes -->
  <path d="M 290 165 Q 330 145 345 130" stroke-width="6" />
  <path d="M 270 145 Q 295 120 305 105" stroke-width="4" />
  <path d="M 110 185 Q 85 170 70 160" stroke-width="5" />
  <!-- Iris & Pupil -->
  <ellipse cx="205" cy="225" rx="60" ry="70" stroke-width="8" />
  <ellipse cx="205" cy="235" rx="30" ry="38" stroke-width="6" fill="#0f172a" />
  <!-- Highlights -->
  <circle cx="180" cy="195" r="18" fill="#ffffff" stroke="none" />
  <circle cx="235" cy="245" r="9" fill="#ffffff" stroke="none" />
  <!-- Lower Eyelid -->
  <path d="M 120 270 Q 195 305 270 275" stroke-width="6" />
  <!-- Eyebrow -->
  <path d="M 70 110 Q 180 60 310 90" stroke-width="9" />
  <path d="M 80 112 Q 180 75 290 98" stroke-width="4" />
  <!-- Crease -->
  <path d="M 130 145 Q 200 130 270 150" stroke-width="4" />
</svg>
`)

const animeGirlPortrait = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
  <!-- Face Jawline -->
  <path d="M 120 180 L 130 250 L 200 310 L 270 250 L 280 180" stroke-width="5" />
  <!-- Neck & Collar -->
  <path d="M 170 295 L 170 360 L 130 380" stroke-width="4" />
  <path d="M 230 295 L 230 360 L 270 380" stroke-width="4" />
  <!-- Mouth & Nose -->
  <path d="M 198 245 L 202 248" stroke-width="5" />
  <path d="M 185 275 Q 200 282 215 275" stroke-width="5" />
  <!-- Eyes -->
  <ellipse cx="160" cy="205" rx="20" ry="18" stroke-width="5" />
  <circle cx="160" cy="205" r="8" fill="#0f172a" />
  <ellipse cx="240" cy="205" rx="20" ry="18" stroke-width="5" />
  <circle cx="240" cy="205" r="8" fill="#0f172a" />
  <!-- Hair Bangs -->
  <path d="M 90 190 Q 80 90 200 80 Q 320 90 310 190" stroke-width="7" />
  <path d="M 100 130 Q 140 180 150 200 Q 160 150 190 130 Q 200 180 210 205 Q 240 160 300 140" stroke-width="5" />
  <!-- Side locks -->
  <path d="M 100 170 Q 90 260 120 310" stroke-width="5" />
  <path d="M 300 170 Q 310 260 280 310" stroke-width="5" />
</svg>
`)

// 2. Animals: Cat & Origami Fox
const animalCat = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Ears -->
  <path d="M 120 160 L 90 70 L 170 110" stroke-width="6" />
  <path d="M 105 130 L 105 85 L 150 115" stroke-width="3" />
  <path d="M 230 110 L 310 70 L 280 160" stroke-width="6" />
  <path d="M 250 115 L 295 85 L 295 130" stroke-width="3" />
  <!-- Head outline -->
  <path d="M 170 110 Q 200 100 230 110" stroke-width="6" />
  <path d="M 120 160 Q 80 220 110 270 Q 200 320 290 270 Q 320 220 280 160" stroke-width="6" />
  <!-- Eyes -->
  <ellipse cx="155" cy="195" rx="18" ry="14" stroke-width="5" />
  <ellipse cx="155" cy="195" rx="6" ry="14" fill="#0f172a" />
  <ellipse cx="245" cy="195" rx="18" ry="14" stroke-width="5" />
  <ellipse cx="245" cy="195" rx="6" ry="14" fill="#0f172a" />
  <!-- Nose & Mouth -->
  <polygon points="194,225 206,225 200,235" fill="#0f172a" />
  <path d="M 200 235 L 200 248 Q 185 258 175 250" stroke-width="4" />
  <path d="M 200 248 Q 215 258 225 250" stroke-width="4" />
  <!-- Whiskers -->
  <path d="M 140 230 L 60 215" stroke-width="3" />
  <path d="M 135 240 L 50 240" stroke-width="3" />
  <path d="M 140 250 L 65 265" stroke-width="3" />
  <path d="M 260 230 L 340 215" stroke-width="3" />
  <path d="M 265 240 L 350 240" stroke-width="3" />
  <path d="M 260 250 L 335 265" stroke-width="3" />
</svg>
`)

const animalFoxOrigami = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
  <!-- Geometric Origami Head Planes -->
  <polygon points="200,60 110,120 200,280 290,120" stroke-width="6" />
  <polygon points="110,120 70,80 120,60 110,120" stroke-width="5" />
  <polygon points="290,120 330,80 280,60 290,120" stroke-width="5" />
  <!-- Cheeks -->
  <polygon points="110,120 200,280 90,220" stroke-width="5" />
  <polygon points="290,120 200,280 310,220" stroke-width="5" />
  <!-- Nose & Snout -->
  <polygon points="200,280 180,240 220,240" stroke-width="4" />
  <polygon points="190,265 210,265 200,280" fill="#0f172a" />
  <!-- Eyes -->
  <polygon points="150,170 175,175 160,185" fill="#0f172a" />
  <polygon points="250,170 225,175 240,185" fill="#0f172a" />
</svg>
`)

// 3. Doodles: Coffee Cup & Paper Plane
const doodleCoffee = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Cup Rim -->
  <ellipse cx="190" cy="180" rx="90" ry="24" stroke-width="6" />
  <!-- Cup Body -->
  <path d="M 100 180 L 120 300 Q 190 325 260 300 L 280 180" stroke-width="6" />
  <!-- Handle -->
  <path d="M 270 200 Q 340 200 330 250 Q 320 290 250 285" stroke-width="6" />
  <!-- Saucer -->
  <ellipse cx="190" cy="315" rx="130" ry="20" stroke-width="6" />
  <!-- Latte Art Heart -->
  <path d="M 190 185 C 190 175 170 165 160 178 C 150 190 190 205 190 205 C 190 205 230 190 220 178 C 210 165 190 175 190 185 Z" stroke-width="4" fill="none" />
  <!-- Steam Curves -->
  <path d="M 160 135 Q 150 110 165 85 Q 180 60 170 45" stroke-width="4" stroke-dasharray="6 4" />
  <path d="M 195 130 Q 210 105 195 80 Q 180 55 195 40" stroke-width="4" stroke-dasharray="6 4" />
  <path d="M 230 135 Q 240 110 225 85 Q 210 60 220 45" stroke-width="4" stroke-dasharray="6 4" />
</svg>
`)

const doodlePaperPlane = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Main Plane Fold -->
  <polygon points="80,240 330,80 230,310 190,230" stroke-width="6" />
  <line x1="330" y1="80" x2="190" y2="230" stroke-width="6" />
  <!-- Keel Bottom fold -->
  <polygon points="190,230 215,280 230,310" stroke-width="5" />
  <!-- Flight Dotted Trail Loop -->
  <path d="M 70 255 Q 30 290 50 330 Q 80 370 120 340 Q 150 310 100 270 Q 60 235 90 220" stroke-width="4" stroke-dasharray="8 6" />
  <!-- Sparkles -->
  <path d="M 330 40 L 330 65 M 315 52 L 345 52" stroke-width="4" />
  <path d="M 270 40 L 270 55 M 262 47 L 278 47" stroke-width="3" />
</svg>
`)

// 4. Nature: Rose & Monstera Leaf
const natureRose = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Rose Blossom Swirl -->
  <circle cx="200" cy="150" r="20" stroke-width="5" />
  <path d="M 200 130 Q 225 130 230 150 Q 235 175 200 180 Q 165 175 170 145 Q 175 115 210 115" stroke-width="5" />
  <path d="M 210 115 Q 260 120 260 160 Q 255 205 195 210 Q 140 205 140 150 Q 145 95 215 95" stroke-width="6" />
  <path d="M 145 180 Q 115 230 190 250 Q 280 240 265 180" stroke-width="6" />
  <!-- Stem -->
  <path d="M 195 250 Q 190 310 205 370" stroke-width="7" />
  <!-- Thorns -->
  <path d="M 192 280 L 175 275 L 193 295" stroke-width="5" />
  <path d="M 200 325 L 218 320 L 202 340" stroke-width="5" />
  <!-- Leaves -->
  <path d="M 200 290 Q 260 270 280 300 Q 250 330 197 305" stroke-width="5" />
  <path d="M 194 320 Q 130 310 120 340 Q 160 360 201 335" stroke-width="5" />
</svg>
`)

const natureMonstera = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Main Stem Spine -->
  <path d="M 200 370 Q 200 220 200 60" stroke-width="7" />
  <!-- Left Leaf Perimeter with Cutouts -->
  <path d="M 200 60 Q 110 80 80 180 Q 70 260 200 340" stroke-width="6" />
  <!-- Right Leaf Perimeter with Cutouts -->
  <path d="M 200 60 Q 290 80 320 180 Q 330 260 200 340" stroke-width="6" />
  <!-- Characteristic Cutout Slots Left -->
  <path d="M 110 140 Q 160 160 195 170" stroke-width="5" />
  <path d="M 95 195 Q 150 210 195 220" stroke-width="5" />
  <path d="M 105 255 Q 160 260 195 270" stroke-width="5" />
  <!-- Characteristic Cutout Slots Right -->
  <path d="M 290 140 Q 240 160 205 170" stroke-width="5" />
  <path d="M 305 195 Q 250 210 205 220" stroke-width="5" />
  <path d="M 295 255 Q 240 260 205 270" stroke-width="5" />
  <!-- Leaf internal slits -->
  <ellipse cx="170" cy="130" rx="6" ry="16" transform="rotate(-30 170 130)" stroke-width="4" />
  <ellipse cx="230" cy="130" rx="6" ry="16" transform="rotate(30 230 130)" stroke-width="4" />
</svg>
`)

// 5. Cartoons: Astronaut & Cute Robot
const cartoonAstronaut = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Helmet -->
  <circle cx="200" cy="140" r="70" stroke-width="6" />
  <ellipse cx="200" cy="140" rx="48" ry="36" stroke-width="6" fill="#0f172a" />
  <ellipse cx="185" cy="130" rx="14" ry="8" fill="#ffffff" stroke="none" transform="rotate(-20 185 130)" />
  <!-- Oxygen backpack -->
  <rect x="110" y="195" width="180" height="120" rx="20" stroke-width="6" />
  <!-- Body Suit -->
  <path d="M 140 210 L 140 300 Q 200 320 260 300 L 260 210" stroke-width="6" />
  <!-- Arms Floating -->
  <path d="M 140 220 Q 90 230 80 270 Q 95 285 115 270" stroke-width="5" />
  <path d="M 260 220 Q 310 230 320 270 Q 305 285 285 270" stroke-width="5" />
  <!-- Legs -->
  <path d="M 155 305 L 145 365 L 180 365 L 180 310" stroke-width="6" />
  <path d="M 245 305 L 255 365 L 220 365 L 220 310" stroke-width="6" />
  <!-- Tether Tube -->
  <path d="M 110 230 Q 60 200 80 150 Q 100 110 50 80" stroke-width="4" stroke-dasharray="6 4" />
</svg>
`)

const cartoonCuteRobot = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#0f172a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
  <!-- Antenna -->
  <line x1="200" y1="110" x2="200" y2="70" stroke-width="5" />
  <circle cx="200" cy="60" r="12" stroke-width="5" fill="#0f172a" />
  <!-- Head -->
  <rect x="130" y="110" width="140" height="100" rx="24" stroke-width="6" />
  <!-- Eyes Screen -->
  <rect x="150" y="130" width="100" height="50" rx="14" stroke-width="4" />
  <circle cx="175" cy="155" r="10" fill="#0f172a" />
  <circle cx="225" cy="155" r="10" fill="#0f172a" />
  <!-- Body -->
  <rect x="140" y="230" width="120" height="110" rx="18" stroke-width="6" />
  <!-- Neck Connection -->
  <line x1="180" y1="210" x2="180" y2="230" stroke-width="5" />
  <line x1="220" y1="210" x2="220" y2="230" stroke-width="5" />
  <!-- Chest Meter & Dials -->
  <circle cx="180" cy="270" r="16" stroke-width="4" />
  <circle cx="220" cy="270" r="8" fill="#0f172a" />
  <line x1="160" y1="310" x2="240" y2="310" stroke-width="4" />
  <!-- Arms Clamp -->
  <path d="M 140 250 L 100 270 L 95 300 L 115 300" stroke-width="5" />
  <path d="M 260 250 L 300 270 L 305 300 L 285 300" stroke-width="5" />
  <!-- Treads / Wheel base -->
  <rect x="120" y="345" width="160" height="35" rx="12" stroke-width="5" />
  <circle cx="150" cy="362" r="8" stroke-width="4" />
  <circle cx="200" cy="362" r="8" stroke-width="4" />
  <circle cx="250" cy="362" r="8" stroke-width="4" />
</svg>
`)

export const PRESET_TEMPLATES: Template[] = [
  {
    id: 'anime-eye',
    title: 'Manga Expression Eye',
    category: 'anime',
    difficulty: 'Easy',
    thumbnail: animeMangaEye,
    fullImage: animeMangaEye,
    description: 'Classic expressive anime eye with highlights, lashes, and lid curves.'
  },
  {
    id: 'anime-portrait',
    title: 'Anime Heroine Silhouette',
    category: 'anime',
    difficulty: 'Medium',
    thumbnail: animeGirlPortrait,
    fullImage: animeGirlPortrait,
    description: 'Proportional face angle, layered bangs, and neck collar.'
  },
  {
    id: 'animal-cat',
    title: 'Curious Whisker Cat',
    category: 'animals',
    difficulty: 'Easy',
    thumbnail: animalCat,
    fullImage: animalCat,
    description: 'Adorable cat face with whiskers, pointed ears, and almond eyes.'
  },
  {
    id: 'animal-fox',
    title: 'Geometric Origami Fox',
    category: 'animals',
    difficulty: 'Detailed',
    thumbnail: animalFoxOrigami,
    fullImage: animalFoxOrigami,
    description: 'Poly-faceted geometric fox head for practicing straight line accuracy.'
  },
  {
    id: 'doodle-coffee',
    title: 'Café Latte Art Cup',
    category: 'doodles',
    difficulty: 'Easy',
    thumbnail: doodleCoffee,
    fullImage: doodleCoffee,
    description: 'Cozy ceramic coffee mug with saucer and steam swirls.'
  },
  {
    id: 'doodle-plane',
    title: 'Paper Plane Flight',
    category: 'doodles',
    difficulty: 'Easy',
    thumbnail: doodlePaperPlane,
    fullImage: doodlePaperPlane,
    description: 'Dynamic folded origami paper airplane with a looping trajectory.'
  },
  {
    id: 'nature-rose',
    title: 'Blooming Rose Blossom',
    category: 'nature',
    difficulty: 'Detailed',
    thumbnail: natureRose,
    fullImage: natureRose,
    description: 'Botanical rose with layered petals, thorny stem, and leaves.'
  },
  {
    id: 'nature-monstera',
    title: 'Tropical Monstera Leaf',
    category: 'nature',
    difficulty: 'Medium',
    thumbnail: natureMonstera,
    fullImage: natureMonstera,
    description: 'Iconic split-leaf philodendron with rhythmic organic curves.'
  },
  {
    id: 'cartoon-astronaut',
    title: 'Little Space Explorer',
    category: 'cartoons',
    difficulty: 'Medium',
    thumbnail: cartoonAstronaut,
    fullImage: cartoonAstronaut,
    description: 'Cute floating chibi astronaut in zero gravity with visor reflection.'
  },
  {
    id: 'cartoon-robot',
    title: 'Retro Friendly Bot',
    category: 'cartoons',
    difficulty: 'Easy',
    thumbnail: cartoonCuteRobot,
    fullImage: cartoonCuteRobot,
    description: 'Whimsical mechanical robot with antenna, gauge chest, and treads.'
  }
]
