import { useState, useEffect, useCallback } from 'react'
import type { Template } from './types'
import { Navbar } from './components/Navbar'
import { TemplateGallery } from './components/TemplateGallery'
import { TracingViewport } from './components/TracingViewport'
import { OnboardingModal } from './components/OnboardingModal'
import { PWAInstallPrompt } from './components/PWAInstallPrompt'
import {
  saveCustomTemplate,
  getCustomTemplates,
  deleteCustomTemplate,
  toggleFavorite,
  getFavorites,
} from './services/db'

export function App() {
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null)
  const [customTemplates, setCustomTemplates] = useState<Template[]>([])
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  // Load IndexedDB data on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [customs, favs] = await Promise.all([getCustomTemplates(), getFavorites()])
        setCustomTemplates(customs)
        setFavoriteIds(favs)
      } catch (err) {
        console.error('Failed to load local templates:', err)
      }
    }
    loadData()
  }, [])

  // Listen for online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Catch PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPromptEvent(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallPwa = useCallback(async () => {
    if (!installPromptEvent) return
    installPromptEvent.prompt()
    const choiceResult = await installPromptEvent.userChoice
    if (choiceResult.outcome === 'accepted') {
      setInstallPromptEvent(null)
    }
  }, [installPromptEvent])

  const handleUploadCustom = useCallback(async (file: File) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const dataUrl = reader.result as string
      const newTemplate: Template = {
        id: `custom-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: 'custom',
        difficulty: 'Medium',
        thumbnail: dataUrl,
        fullImage: dataUrl,
        description: 'Foto unggahan pribadi',
        isUserUpload: true,
        createdAt: Date.now(),
      }

      await saveCustomTemplate(newTemplate)
      setCustomTemplates((prev) => [newTemplate, ...prev])
      // Launch tracing viewport directly for smooth UX
      setActiveTemplate(newTemplate)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDeleteCustom = useCallback(async (id: string) => {
    await deleteCustomTemplate(id)
    setCustomTemplates((prev) => prev.filter((t) => t.id !== id))
    if (activeTemplate?.id === id) {
      setActiveTemplate(null)
    }
  }, [activeTemplate])

  const handleToggleFavorite = useCallback(async (id: string) => {
    const isNowFav = await toggleFavorite(id)
    setFavoriteIds((prev) =>
      isNowFav ? [...prev, id] : prev.filter((favId) => favId !== id)
    )
  }, [])

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-body selection:bg-cyan-500 selection:text-slate-950">
      {activeTemplate ? (
        /* AR Tracing Viewport Screen */
        <TracingViewport
          template={activeTemplate}
          onBack={() => setActiveTemplate(null)}
          onOpenGuide={() => setIsGuideOpen(true)}
        />
      ) : (
        /* Home Screen with Gallery & Controls */
        <div className="flex-1 flex flex-col">
          <Navbar
            onOpenGuide={() => setIsGuideOpen(true)}
            installPromptEvent={installPromptEvent}
            onInstallPwa={handleInstallPwa}
            isOffline={isOffline}
          />

          <main className="flex-1">
            <TemplateGallery
              onSelectTemplate={setActiveTemplate}
              customTemplates={customTemplates}
              onUploadCustom={handleUploadCustom}
              onDeleteCustom={handleDeleteCustom}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
          </main>

          <PWAInstallPrompt
            installPromptEvent={installPromptEvent}
            onInstall={handleInstallPwa}
          />
        </div>
      )}

      {/* Illustrated Onboarding & Tracing Guide Modal */}
      <OnboardingModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  )
}

export default App
