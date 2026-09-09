import { useState, useEffect } from 'react'
import type React from 'react'
import { Download, X, Share } from 'lucide-react'

interface PWAInstallPromptProps {
  installPromptEvent: any
  onInstall: () => void
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  installPromptEvent,
  onInstall,
}) => {
  const [isDismissed, setIsDismissed] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running inside installed standalone PWA
    const standaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true

    setIsStandalone(standaloneMode)

    // Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIos(isIosDevice)
  }, [])

  if (isStandalone || isDismissed) return null
  if (!installPromptEvent && !isIos) return null

  return (
    <div className="fixed bottom-4 inset-x-4 z-40 max-w-md mx-auto animate-in slide-in-from-bottom duration-300">
      <div className="p-4 rounded-3xl glass-dock border border-cyan-500/30 shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shrink-0">
            <div className="w-full h-full bg-[#090d16] rounded-[15px] flex items-center justify-center">
              <img src="/logo.svg" alt="Lumina Logo" className="w-7 h-7" />
            </div>
          </div>
          <div>
            <h4 className="font-heading font-bold text-xs text-white">
              Pasang Lumina AR Studio
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isIos
                ? 'Ketuk tombol Bagikan (Share) lalu pilih "Tambah ke Layar Utama"'
                : 'Akses instan offline & mode layar penuh tanpa browser'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {installPromptEvent && (
            <button
              onClick={onInstall}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Pasang</span>
            </button>
          )}

          {isIos && !installPromptEvent && (
            <div className="px-2.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-semibold flex items-center gap-1">
              <Share className="w-3 h-3" />
              <span>Share</span>
            </div>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-white flex items-center justify-center active:scale-95 transition-all"
            aria-label="Tutup Banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
