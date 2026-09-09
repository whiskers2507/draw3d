import { useState, useRef } from 'react'
import type React from 'react'
import {
  Upload,
  Trash2,
  Bookmark,
  Search,
  PlusCircle,
  Image as ImageIcon,
} from 'lucide-react'
import type { Template, TemplateCategory } from '../types'
import { PRESET_TEMPLATES } from '../data/templates'

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void
  customTemplates: Template[]
  onUploadCustom: (file: File) => void
  onDeleteCustom: (id: string) => void
  favoriteIds: string[]
  onToggleFavorite: (id: string) => void
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onSelectTemplate,
  customTemplates,
  onUploadCustom,
  onDeleteCustom,
  favoriteIds,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const categories: { id: TemplateCategory; label: string }[] = [
    { id: 'all', label: 'Semua' },
    { id: 'custom', label: 'Upload Saya' },
    { id: 'anime', label: 'Anime' },
    { id: 'animals', label: 'Hewan' },
    { id: 'doodles', label: 'Doodles' },
    { id: 'nature', label: 'Alam' },
    { id: 'cartoons', label: 'Kartun' },
  ]

  // Combine presets and custom uploads
  const allTemplates = [...customTemplates, ...PRESET_TEMPLATES]

  const filteredTemplates = allTemplates.filter((t) => {
    const matchCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'custom'
        ? t.isUserUpload
        : t.category === selectedCategory

    const matchSearch =
      searchQuery.trim() === ''
        ? true
        : t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchCategory && matchSearch
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUploadCustom(file)
      // Switch category to custom so user sees their newly added image
      setSelectedCategory('custom')
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-4 space-y-4 pb-24">
      {/* Search & Upload Action Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari sketsa atau objek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2.5 rounded-2xl glass-card bg-slate-900/60 border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all shrink-0"
        >
          <Upload className="w-4 h-4 text-slate-950" />
          <span>Upload</span>
        </button>
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'glass-card text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Upload Custom Card Banner */}
      {selectedCategory === 'custom' && customTemplates.length === 0 && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-8 rounded-3xl border-2 border-dashed border-cyan-500/30 bg-cyan-500/[0.03] hover:bg-cyan-500/[0.06] flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
        >
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
            <PlusCircle className="w-7 h-7" />
          </div>
          <h4 className="font-heading font-bold text-sm text-white">Unggah Foto Pertama Anda</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Pilih foto dari galeri HP atau ambil foto baru dengan kamera. Filter kami akan mengubahnya menjadi sketsa transparan.
          </p>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {filteredTemplates.map((template) => {
          const isFav = favoriteIds.includes(template.id)

          return (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="group relative flex flex-col rounded-2xl glass-card overflow-hidden cursor-pointer hover:border-cyan-500/40"
            >
              {/* Image Preview Container */}
              <div className="relative w-full aspect-square bg-[#03060c] flex items-center justify-center overflow-hidden p-4">
                {/* Subtle Checkerboard for Transparency */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                    backgroundSize: '12px 12px',
                  }}
                />

                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-full object-contain filter invert contrast-125 group-hover:scale-105 transition-transform duration-300 z-10"
                />

                {/* Difficulty Chip */}
                <div className="absolute top-2 left-2 z-20">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                      template.difficulty === 'Easy'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : template.difficulty === 'Medium'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {template.difficulty}
                  </span>
                </div>

                {/* Favorite & Delete Buttons */}
                <div className="absolute top-2 right-2 z-20 flex gap-1">
                  {template.isUserUpload && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteCustom(template.id)
                      }}
                      className="w-6 h-6 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                      title="Hapus"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite(template.id)
                    }}
                    className={`w-6 h-6 rounded-full glass-panel flex items-center justify-center transition-all ${
                      isFav ? 'text-amber-400 fill-amber-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-3 h-3 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-2.5 flex flex-col justify-between flex-1 bg-slate-950/40">
                <div>
                  <h4 className="font-heading font-semibold text-xs text-white line-clamp-1 group-hover:text-cyan-400 transition-colors">
                    {template.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {template.description || 'Sketsa untuk tracing'}
                  </p>
                </div>

                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-slate-500 capitalize">
                    {template.category}
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-0.5">
                    Trace <span className="text-xs">&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="py-16 text-center text-slate-500">
          <ImageIcon className="w-10 h-10 mx-auto mb-2 text-slate-600" />
          <p className="text-sm font-medium">Tidak ada sketsa yang cocok</p>
          <p className="text-xs text-slate-600 mt-1">Coba kata kunci lain atau unggah foto Anda</p>
        </div>
      )}
    </div>
  )
}
