import { HelpCircle, Download, WifiOff } from 'lucide-react'
import type React from 'react'

interface NavbarProps {
  onOpenGuide: () => void
  installPromptEvent: any
  onInstallPwa: () => void
  isOffline: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGuide,
  installPromptEvent,
  onInstallPwa,
  isOffline,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/[0.08] px-4 py-3 pt-safe">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center overflow-hidden">
              <img src="/logo.svg" alt="Lumina AR Logo" className="w-6 h-6 object-contain" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg tracking-tight text-white">
                Lumina<span className="text-cyan-400">AR</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md">
                Studio
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-0.5">
              Precision Camera Tracing
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {isOffline && (
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-xs" title="Mode Offline Aktif">
              <WifiOff className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-medium">Offline</span>
            </div>
          )}

          {installPromptEvent && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>Install</span>
            </button>
          )}

          <button
            onClick={onOpenGuide}
            className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Panduan Menjiplak AR"
            title="Cara Menggunakan AR Tracing"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </header>
  )
}
