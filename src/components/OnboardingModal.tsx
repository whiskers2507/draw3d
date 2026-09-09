import React from 'react'
import { X, Smartphone, Layers, Lock, Sun, CheckCircle2 } from 'lucide-react'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const steps = [
    {
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      title: '1. Posisikan Smartphone',
      desc: 'Letakkan smartphone di atas cangkir tinggi, botol, atau stand holder dengan kamera belakang mengarah ke bawah ke atas meja.',
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      title: '2. Taruh Kertas & Pensil',
      desc: 'Letakkan kertas gambar tepat di bawah area kamera HP. Anda akan melihat kertas Anda melalui layar ponsel dengan gambar referensi di atasnya.',
    },
    {
      icon: <Lock className="w-5 h-5 text-amber-400" />,
      title: '3. Kunci Layar (Screen Lock)',
      desc: 'Sesuaikan ukuran dan posisi gambar dengan mencubit layar. Tekan tombol Gembok (Lock) agar gambar tidak bergeser saat menggambar.',
    },
    {
      icon: <Sun className="w-5 h-5 text-rose-400" />,
      title: '4. Nyalakan Lampu Senter',
      desc: 'Jika permukaan kertas terhalang bayangan HP, tekan tombol Torch untuk menerangi kertas secara optimal.',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-dock border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">Panduan AR Tracing</h3>
              <p className="text-xs text-slate-400">Cara mudah menjiplak dengan kamera HP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-slate-400 hover:text-white active:scale-95 transition-all"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Steps List */}
        <div className="py-4 space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-white/10 flex items-center justify-center shrink-0">
                {step.icon}
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm text-slate-200">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-heading font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-slate-950" />
          <span>Saya Mengerti, Mulai Menggambar</span>
        </button>
      </div>
    </div>
  )
}
