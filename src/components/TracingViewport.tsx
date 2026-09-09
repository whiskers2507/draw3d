import { useState, useEffect } from 'react'
import type React from 'react'
import {
  RotateCcw,
  AlertTriangle,
  HelpCircle,
  ChevronLeft,
} from 'lucide-react'
import type { Template, FilterConfig } from '../types'
import { useCamera } from '../hooks/useCamera'
import { useGestures } from '../hooks/useGestures'
import { ControlDock } from './ControlDock'
import { FilterModal } from './FilterModal'
import { processImageWithFilters } from '../utils/imageFilters'

interface TracingViewportProps {
  template: Template
  onBack: () => void
  onOpenGuide: () => void
}

export const TracingViewport: React.FC<TracingViewportProps> = ({
  template,
  onBack,
  onOpenGuide,
}) => {
  const [isLocked, setIsLocked] = useState(false)
  const [opacity, setOpacity] = useState(65)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // Filter configuration
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    mode: 'edge',
    opacity: 65,
    contrast: 130,
    brightness: 100,
    edgeSensitivity: 60,
    invertColors: false,
    removeWhiteBg: true,
  })

  const [activeImageSrc, setActiveImageSrc] = useState<string>(template.fullImage)

  // Camera hook
  const {
    videoRef,
    stream,
    error: cameraError,
    torchSupported,
    isTorchOn,
    frozenFrame,
    startCamera,
    stopCamera,
    toggleTorch,
    captureFrozenFrame,
    clearFrozenFrame,
  } = useCamera()

  // Touch gesture engine
  const {
    transform,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetTransform,
    toggleFlipH,
  } = useGestures(isLocked)

  // Start camera on mount
  useEffect(() => {
    startCamera('environment')
    return () => {
      stopCamera()
    }
  }, [])

  // Bind media stream to video element
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play().catch((err) => console.warn('Video play interrupted:', err))
    }
  }, [stream])

  // Initial filter conversion on template load (sobel outline)
  useEffect(() => {
    let isMounted = true
    async function initFilter() {
      try {
        const processed = await processImageWithFilters(template.fullImage, filterConfig, 1200, 1200)
        if (isMounted) {
          setActiveImageSrc(processed)
        }
      } catch (err) {
        console.warn('Initial filter processing failed, using raw:', err)
      }
    }
    initFilter()
    return () => {
      isMounted = false
    }
  }, [template.fullImage])

  const handleApplyNewFilter = (newConfig: FilterConfig, newImageSrc: string) => {
    setFilterConfig(newConfig)
    setActiveImageSrc(newImageSrc)
  }

  const transformStyle: React.CSSProperties = {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${transform.scale}) rotate(${transform.rotation}deg) scaleX(${transform.flipH ? -1 : 1}) scaleY(${transform.flipV ? -1 : 1})`,
    opacity: opacity / 100,
    transition: isLocked ? 'none' : 'transform 0.05s linear',
    willChange: 'transform, opacity',
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-black overflow-hidden select-none touch-none flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Camera Feed Layer */}
      <div className="absolute inset-0 z-0 bg-[#07090e] flex items-center justify-center">
        {cameraError ? (
          <div className="p-6 text-center max-w-sm glass-card border border-red-500/30 rounded-3xl m-4">
            <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h4 className="font-heading font-bold text-base text-white">Kamera Belum Aktif</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cameraError}</p>
            <button
              onClick={() => startCamera('environment')}
              className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
            >
              Coba Nyalakan Lagi
            </button>
          </div>
        ) : frozenFrame ? (
          /* Frozen Snapshot Layer for Checking Drawing Progress */
          <div className="relative w-full h-full">
            <img src={frozenFrame} alt="Frozen frame" className="w-full h-full object-cover" />
            <div className="absolute top-16 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold backdrop-blur-md">
              Mode Cek Progres (Kamera Dijeda)
            </div>
          </div>
        ) : (
          /* Live Rear Camera Video */
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* 2. AR Viewfinder Guide Reticles (Minimal corners for alignment) */}
      {!isLocked && (
        <div className="absolute inset-4 pointer-events-none z-10 opacity-30">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />
        </div>
      )}

      {/* 3. Translucent Tracing Reference Layer */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          style={transformStyle}
          className="relative max-w-[85vw] max-h-[70vh] flex items-center justify-center"
        >
          <img
            src={activeImageSrc}
            alt="Reference Overlay"
            className="max-w-full max-h-full object-contain pointer-events-none select-none filter contrast-125"
            draggable={false}
          />
        </div>
      </div>

      {/* 4. Minimalist Top Header */}
      <header
        className="relative z-30 w-full px-4 py-3 pt-safe flex items-center justify-between pointer-events-auto"
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-2xl glass-card flex items-center justify-center text-white active:scale-95 transition-all"
            title="Keluar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="px-3 py-1 rounded-xl glass-card flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-white truncate max-w-[140px]">
              {template.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetTransform}
            className="w-9 h-9 rounded-2xl glass-card flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"
            title="Reset Posisi & Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenGuide}
            className="w-9 h-9 rounded-2xl glass-card flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"
            title="Panduan Menjiplak"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </header>

      {/* 5. Ergonomic Bottom Control Dock */}
      <ControlDock
        opacity={opacity}
        onOpacityChange={setOpacity}
        isLocked={isLocked}
        onToggleLock={() => setIsLocked(!isLocked)}
        isTorchOn={isTorchOn}
        torchSupported={torchSupported}
        onToggleTorch={toggleTorch}
        isFrozen={Boolean(frozenFrame)}
        onToggleFreeze={() => {
          if (frozenFrame) {
            clearFrozenFrame()
          } else {
            captureFrozenFrame()
          }
        }}
        onToggleFlipH={toggleFlipH}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
        onBack={onBack}
      />

      {/* 6. Filter Configuration Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        imageSrc={template.fullImage}
        config={filterConfig}
        onSaveConfig={handleApplyNewFilter}
      />
    </div>
  )
}
