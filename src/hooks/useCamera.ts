import { useState, useEffect, useRef, useCallback } from 'react'

export interface CameraState {
  stream: MediaStream | null
  error: string | null
  isStreaming: boolean
  torchSupported: boolean
  isTorchOn: boolean
  facingMode: 'environment' | 'user'
  frozenFrame: string | null
}

export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [torchSupported, setTorchSupported] = useState(false)
  const [isTorchOn, setIsTorchOn] = useState(false)
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment')
  const [frozenFrame, setFrozenFrame] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const startCamera = useCallback(async (desiredFacing: 'environment' | 'user' = 'environment') => {
    setError(null)
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }

      const constraints: MediaStreamConstraints = {
        audio: false,
        video: {
          facingMode: { ideal: desiredFacing },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(mediaStream)
      setFacingMode(desiredFacing)
      setIsStreaming(true)

      const track = mediaStream.getVideoTracks()[0]
      if (track) {
        // Inspect hardware capabilities
        const capabilities = track.getCapabilities ? (track.getCapabilities() as { torch?: boolean }) : {}
        setTorchSupported(Boolean(capabilities.torch))
      }
    } catch (err: unknown) {
      console.error('Camera initialization error:', err)
      const errorObj = err as Error
      if (errorObj.name === 'NotAllowedError') {
        setError('Izin kamera ditolak. Berikan izin kamera di pengaturan browser agar AR Tracing dapat berfungsi.')
      } else if (errorObj.name === 'NotFoundError') {
        setError('Kamera belakang tidak ditemukan pada perangkat Anda.')
      } else {
        setError(errorObj.message || 'Gagal menyalakan kamera.')
      }
      setIsStreaming(false)
    }
  }, [stream])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setIsStreaming(false)
      setIsTorchOn(false)
    }
  }, [stream])

  const toggleTorch = useCallback(async () => {
    if (!stream || !torchSupported) return
    const track = stream.getVideoTracks()[0]
    if (!track) return

    try {
      const nextState = !isTorchOn
      // Use standard MediaStreamTrack torch constraint
      await (track as any).applyConstraints({
        advanced: [{ torch: nextState }],
      })
      setIsTorchOn(nextState)
    } catch (err) {
      console.warn('Torch toggle failed:', err)
    }
  }, [stream, torchSupported, isTorchOn])

  const toggleFacingMode = useCallback(() => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment'
    startCamera(nextMode)
  }, [facingMode, startCamera])

  const captureFrozenFrame = useCallback(() => {
    if (!videoRef.current || !isStreaming) return
    const video = videoRef.current
    if (video.videoWidth === 0 || video.videoHeight === 0) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      setFrozenFrame(canvas.toDataURL('image/jpeg', 0.9))
    }
  }, [isStreaming])

  const clearFrozenFrame = useCallback(() => {
    setFrozenFrame(null)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  return {
    videoRef,
    stream,
    error,
    isStreaming,
    torchSupported,
    isTorchOn,
    facingMode,
    frozenFrame,
    startCamera,
    stopCamera,
    toggleTorch,
    toggleFacingMode,
    captureFrozenFrame,
    clearFrozenFrame,
  }
}
