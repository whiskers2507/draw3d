import React from 'react'
import {
  Lock,
  Unlock,
  Flashlight,
  Camera,
  FlipHorizontal,
  Wand2,
  ChevronLeft,
  Eye,
} from 'lucide-react'

interface ControlDockProps {
  opacity: number
  onOpacityChange: (val: number) => void
  isLocked: boolean
  onToggleLock: () => void
  isTorchOn: boolean
  torchSupported: boolean
  onToggleTorch: () => void
  isFrozen: boolean
  onToggleFreeze: () => void
  onToggleFlipH: () => void
  onOpenFilterModal: () => void
  onBack: () => void
}

export const ControlDock: React.FC<ControlDockProps> = ({
  opacity,
  onOpacityChange,
  isLocked,
  onToggleLock,
  isTorchOn,
  torchSupported,
  onToggleTorch,
  isFrozen,
  onToggleFreeze,
  onToggleFlipH,
  onOpenFilterModal,
  onBack,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 pb-safe pointer-events-none">
      <div
        className="max-w-md mx-auto pointer-events-auto flex flex-col gap-2.5"
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Floating Lock Pill Button (Positioned at center when locked, or in dock when unlocked) */}
        {isLocked ? (
          <div className="flex items-center justify-between px-4 py-3 rounded-2xl glass-dock border border-amber-500/40 shadow-xl shadow-amber-500/10 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Layar Terkunci</p>
                <p className="text-[10px] text-amber-300">Sentuhan tidak akan menggeser gambar</p>
              </div>
            </div>

            <button
              onClick={onToggleLock}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Buka Kunci</span>
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-3xl glass-dock border border-white/10 space-y-3 shadow-2xl">
            {/* Opacity Slider Control */}
            <div className="flex items-center gap-3 px-1">
              <div className="text-[11px] font-semibold text-slate-300 w-16 shrink-0 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Opacity</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={opacity}
                onChange={(e) => onOpacityChange(Number(e.target.value))}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                className="flex-1"
              />
              <span className="text-xs font-mono font-bold text-cyan-400 w-9 text-right shrink-0">
                {opacity}%
              </span>
            </div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-6 gap-1.5 pt-1">
              {/* Back Button */}
              <button
                onClick={onBack}
                className="h-11 rounded-2xl glass-card flex flex-col items-center justify-center text-slate-400 hover:text-white active:scale-95 transition-all"
                title="Kembali ke Galeri"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[9px] font-medium mt-0.5">Keluar</span>
              </button>

              {/* Lock Screen Toggle */}
              <button
                onClick={onToggleLock}
                className="h-11 rounded-2xl glass-card flex flex-col items-center justify-center text-slate-300 hover:text-amber-400 active:scale-95 transition-all"
                title="Kunci Posisi Layar"
              >
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="text-[9px] font-medium mt-0.5">Kunci</span>
              </button>

              {/* Torch / Flashlight Toggle */}
              <button
                onClick={onToggleTorch}
                disabled={!torchSupported}
                className={`h-11 rounded-2xl border flex flex-col items-center justify-center active:scale-95 transition-all ${
                  isTorchOn
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-500/30'
                    : torchSupported
                    ? 'glass-card text-slate-300 hover:text-white'
                    : 'glass-card text-slate-600 opacity-40 cursor-not-allowed'
                }`}
                title={torchSupported ? 'Nyalakan Senter Kamera' : 'Hardware Torch tidak didukung'}
              >
                <Flashlight className={`w-4 h-4 ${isTorchOn ? 'fill-amber-400' : ''}`} />
                <span className="text-[9px] font-medium mt-0.5">Senter</span>
              </button>

              {/* Freeze Frame (Check Progress) */}
              <button
                onClick={onToggleFreeze}
                className={`h-11 rounded-2xl border flex flex-col items-center justify-center active:scale-95 transition-all ${
                  isFrozen
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-sm shadow-cyan-500/30'
                    : 'glass-card text-slate-300 hover:text-white'
                }`}
                title="Freeze Frame untuk Cek Hasil Gambar"
              >
                <Camera className="w-4 h-4" />
                <span className="text-[9px] font-medium mt-0.5">{isFrozen ? 'Live' : 'Cek'}</span>
              </button>

              {/* Mirror / Flip Horizontal */}
              <button
                onClick={onToggleFlipH}
                className="h-11 rounded-2xl glass-card flex flex-col items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"
                title="Balik Horizontal (Mirror)"
              >
                <FlipHorizontal className="w-4 h-4" />
                <span className="text-[9px] font-medium mt-0.5">Mirror</span>
              </button>

              {/* Filter / Edge Settings */}
              <button
                onClick={onOpenFilterModal}
                className="h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center text-cyan-400 hover:bg-cyan-500/20 active:scale-95 transition-all"
                title="Pengaturan Filter Garis"
              >
                <Wand2 className="w-4 h-4" />
                <span className="text-[9px] font-semibold mt-0.5">Filter</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
