import { useState, useRef, useCallback } from 'react'
import type { TransformState } from '../types'

const DEFAULT_TRANSFORM: TransformState = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  flipH: false,
  flipV: false,
}

export function useGestures(isLocked: boolean) {
  const [transform, setTransform] = useState<TransformState>(DEFAULT_TRANSFORM)

  // Tracking touch state
  const lastTouchRef = useRef<{
    x: number
    y: number
    dist?: number
    angle?: number
  } | null>(null)

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isLocked) return

      if (e.touches.length === 1) {
        // Single finger pan start
        lastTouchRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        }
      } else if (e.touches.length === 2) {
        // Two finger pinch & rotate start
        const t1 = e.touches[0]
        const t2 = e.touches[1]
        const dx = t2.clientX - t1.clientX
        const dy = t2.clientY - t1.clientY
        const dist = Math.hypot(dx, dy)
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)

        lastTouchRef.current = {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2,
          dist,
          angle,
        }
      }
    },
    [isLocked]
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isLocked || !lastTouchRef.current) return

      if (e.touches.length === 1 && lastTouchRef.current.dist === undefined) {
        // 1-finger Pan
        const currentX = e.touches[0].clientX
        const currentY = e.touches[0].clientY
        const dx = currentX - lastTouchRef.current.x
        const dy = currentY - lastTouchRef.current.y

        setTransform((prev) => ({
          ...prev,
          x: prev.x + dx,
          y: prev.y + dy,
        }))

        lastTouchRef.current.x = currentX
        lastTouchRef.current.y = currentY
      } else if (e.touches.length === 2 && lastTouchRef.current.dist !== undefined) {
        // 2-finger Pinch & Rotate
        const t1 = e.touches[0]
        const t2 = e.touches[1]
        const dx = t2.clientX - t1.clientX
        const dy = t2.clientY - t1.clientY
        const currentDist = Math.hypot(dx, dy)
        const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI)

        const midX = (t1.clientX + t2.clientX) / 2
        const midY = (t1.clientY + t2.clientY) / 2
        const deltaPanX = midX - lastTouchRef.current.x
        const deltaPanY = midY - lastTouchRef.current.y

        const scaleMultiplier = currentDist / (lastTouchRef.current.dist || currentDist)
        const deltaAngle = currentAngle - (lastTouchRef.current.angle || currentAngle)

        setTransform((prev) => ({
          ...prev,
          x: prev.x + deltaPanX,
          y: prev.y + deltaPanY,
          scale: Math.min(6, Math.max(0.2, prev.scale * scaleMultiplier)),
          rotation: (prev.rotation + deltaAngle) % 360,
        }))

        lastTouchRef.current = {
          x: midX,
          y: midY,
          dist: currentDist,
          angle: currentAngle,
        }
      }
    },
    [isLocked]
  )

  const handleTouchEnd = useCallback(() => {
    lastTouchRef.current = null
  }, [])

  const resetTransform = useCallback(() => {
    setTransform(DEFAULT_TRANSFORM)
  }, [])

  const toggleFlipH = useCallback(() => {
    setTransform((prev) => ({ ...prev, flipH: !prev.flipH }))
  }, [])

  const toggleFlipV = useCallback(() => {
    setTransform((prev) => ({ ...prev, flipV: !prev.flipV }))
  }, [])

  const nudge = useCallback((axis: 'x' | 'y', amount: number) => {
    setTransform((prev) => ({
      ...prev,
      [axis]: prev[axis] + amount,
    }))
  }, [])

  return {
    transform,
    setTransform,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetTransform,
    toggleFlipH,
    toggleFlipV,
    nudge,
  }
}
