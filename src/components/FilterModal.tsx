import { useState, useEffect } from 'react'
import { X, Sliders, Wand2, RefreshCw, Check } from 'lucide-react'
import type { FilterConfig, FilterMode } from '../types'
import { processImageWithFilters } from '../utils/imageFilters'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  config: FilterConfig
  onSaveConfig: (newConfig: FilterConfig, processedUrl: string) => void
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  config,
  onSaveConfig,
}) => {
  const [localConfig, setLocalConfig] = useState<FilterConfig>(config)
  const [previewUrl, setPreviewUrl] = useState<string>(imageSrc)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  useEffect(() => {
    setLocalConfig(config)
  }, [config, isOpen])

  // Process preview whenever filter params change (debounced)
  useEffect(() => {
    if (!isOpen || !imageSrc) return

    let isMounted = true
    setIsProcessing(true)

    const timer = setTimeout(async () => {
      try {
        const result = await processImageWithFilters(imageSrc, localConfig, 600, 600)
        if (isMounted) {
          setPreviewUrl(result)
          setIsProcessing(false)
        }
      } catch (err) {
        console.error('Filter processing failed:', err)
        if (isMounted) setIsProcessing(false)
      }
    }, 120)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [localConfig, imageSrc, isOpen])

  if (!isOpen) return null

  const filterModes: { id: FilterMode; label: string; desc: string }[] = [
    { id: 'edge', label: 'Outline (Sobel)', desc: 'Ekstraksi garis kontur tajam & latar transparan' },
    { id: 'sketch', label: 'Pencil Sketch', desc: 'Goresan pensil dengan gradasi bayangan halus' },
    { id: 'high-contrast', label: 'Kontras Tinggi', desc: 'Pemisahan hitam-putih tegas' },
    { id: 'original', label: 'Asli', desc: 'Gambar original tanpa pemrosesan garis' },
  ]

  const handleApply = async () => {
    setIsProcessing(true)
    try {
      const fullResResult = await processImageWithFilters(imageSrc, localConfig, 1400, 1400)
      onSaveConfig(localConfig, fullResResult)
      onClose()
    } catch (err) {
      console.error('Full resolution filter apply failed:', err)
      onSaveConfig(localConfig, previewUrl)
      onClose()
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md max-h-[92vh] flex flex-col glass-dock border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">Filter Sketsa & Garis</h3>
              <p className="text-[11px] text-slate-400">Optimasi gambar untuk kemudahan menjiplak</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Live Filter Preview */}
          <div className="relative w-full h-44 rounded-2xl bg-[#03060c] border border-white/10 overflow-hidden flex items-center justify-center">
            {/* Checkerboard Pattern for Transparency Indicator */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview Filter"
                className="max-h-full max-w-full object-contain z-10"
              />
            ) : (
              <div className="text-xs text-slate-500">Memuat gambar...</div>
            )}

            {isProcessing && (
              <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[10px] text-cyan-300">
                <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
                <span>Memproses...</span>
              </div>
            )}

            <div className="absolute bottom-2 left-2 z-20 px-2 py-0.5 rounded-md bg-black/60 text-[10px] text-slate-300 backdrop-blur-sm">
              Pratinjau Hasil
            </div>
          </div>

          {/* Mode Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gaya Filter Sketsa</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {filterModes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setLocalConfig((p) => ({ ...p, mode: m.id }))}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    localConfig.mode === m.id
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-white shadow-sm shadow-cyan-500/10'
                      : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-semibold">{m.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Section */}
          <div className="space-y-3.5 pt-1">
            {/* Edge Sensitivity Slider (Only for edge & sketch) */}
            {(localConfig.mode === 'edge' || localConfig.mode === 'sketch') && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Sensitivitas Garis Tepi</span>
                  <span className="text-cyan-400 font-mono font-semibold">{localConfig.edgeSensitivity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={localConfig.edgeSensitivity}
                  onChange={(e) =>
                    setLocalConfig((p) => ({ ...p, edgeSensitivity: Number(e.target.value) }))
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Hanya Garis Utama</span>
                  <span>Detail Halus</span>
                </div>
              </div>
            )}

            {/* Contrast Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Kontras Garis</span>
                <span className="text-cyan-400 font-mono font-semibold">{localConfig.contrast}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="200"
                value={localConfig.contrast}
                onChange={(e) =>
                  setLocalConfig((p) => ({ ...p, contrast: Number(e.target.value) }))
                }
                className="w-full"
              />
            </div>

            {/* Toggles */}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setLocalConfig((p) => ({ ...p, invertColors: !p.invertColors }))
                }
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  localConfig.invertColors
                    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-200'
                    : 'bg-white/[0.03] border-white/[0.08] text-slate-400'
                }`}
              >
                <span>Warna Garis</span>
                <span className="font-semibold text-[11px] text-cyan-400">
                  {localConfig.invertColors ? 'Putih Neon' : 'Hitam'}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setLocalConfig((p) => ({ ...p, removeWhiteBg: !p.removeWhiteBg }))
                }
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  localConfig.removeWhiteBg
                    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-200'
                    : 'bg-white/[0.03] border-white/[0.08] text-slate-400'
                }`}
              >
                <span>Hapus Latar</span>
                <span className="font-semibold text-[11px] text-cyan-400">
                  {localConfig.removeWhiteBg ? 'Transparan' : 'Solid'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/[0.08] flex gap-2.5 bg-black/40">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl glass-card text-xs font-semibold text-slate-300 hover:text-white"
          >
            Batal
          </button>
          <button
            onClick={handleApply}
            disabled={isProcessing}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-heading font-bold text-xs tracking-wide shadow-md shadow-cyan-500/20 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4 text-slate-950" />
            <span>Terapkan Filter</span>
          </button>
        </div>
      </div>
    </div>
  )
}
