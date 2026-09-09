import type { FilterConfig } from '../types'

/**
 * High-performance Canvas-based image filter engine
 * Processes RGB pixels to extract contours, sobel edges, or sketch lines with alpha transparency.
 */
export async function processImageWithFilters(
  imgSrc: string,
  config: FilterConfig,
  maxWidth = 1200,
  maxHeight = 1200
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        // Calculate scaled dimensions for optimal 60fps performance
        let width = img.naturalWidth || img.width
        let height = img.naturalHeight || img.height

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d', { willReadFrequently: true })

        if (!ctx) {
          resolve(imgSrc)
          return
        }

        // Draw source image
        ctx.drawImage(img, 0, 0, width, height)

        if (config.mode === 'original' && !config.removeWhiteBg && config.contrast === 100 && config.brightness === 100) {
          resolve(canvas.toDataURL('image/png'))
          return
        }

        const imageData = ctx.getImageData(0, 0, width, height)
        const data = imageData.data
        const outputData = ctx.createImageData(width, height)
        const out = outputData.data

        // Precompute grayscale values for fast convolution
        const gray = new Float32Array(width * height)
        const contrastFactor = (259 * (config.contrast + 255)) / (255 * (259 - config.contrast))
        const brightnessOffset = config.brightness - 100

        for (let i = 0, p = 0; i < data.length; i += 4, p++) {
          let r = data[i]
          let g = data[i + 1]
          let b = data[i + 2]

          // Apply contrast & brightness
          r = Math.min(255, Math.max(0, contrastFactor * (r - 128) + 128 + brightnessOffset))
          g = Math.min(255, Math.max(0, contrastFactor * (g - 128) + 128 + brightnessOffset))
          b = Math.min(255, Math.max(0, contrastFactor * (b - 128) + 128 + brightnessOffset))

          // Luminance weights (ITU-R BT.601)
          gray[p] = 0.299 * r + 0.587 * g + 0.114 * b
        }

        if (config.mode === 'edge' || config.mode === 'sketch') {
          // Sobel convolution kernels
          // Threshold is inversely proportional to edgeSensitivity
          const threshold = Math.max(8, 120 - config.edgeSensitivity)

          for (let y = 1; y < height - 1; y++) {
            const yOffset = y * width
            for (let x = 1; x < width - 1; x++) {
              const idx = (yOffset + x) * 4
              const pIdx = yOffset + x

              // Sample 3x3 surrounding grayscale pixels
              const p00 = gray[pIdx - width - 1]
              const p01 = gray[pIdx - width]
              const p02 = gray[pIdx - width + 1]
              const p10 = gray[pIdx - 1]
              const p12 = gray[pIdx + 1]
              const p20 = gray[pIdx + width - 1]
              const p21 = gray[pIdx + width]
              const p22 = gray[pIdx + width + 1]

              // Horizontal and Vertical Gradients
              const gx = -p00 + p02 - 2 * p10 + 2 * p12 - p20 + p22
              const gy = -p00 - 2 * p01 - p02 + p20 + 2 * p21 + p22

              const magnitude = Math.sqrt(gx * gx + gy * gy)

              if (config.mode === 'edge') {
                if (magnitude > threshold) {
                  // Line detected!
                  const edgeIntensity = Math.min(255, Math.round((magnitude / 255) * 350))
                  if (config.invertColors) {
                    // White glowing edge on transparent
                    out[idx] = 255
                    out[idx + 1] = 255
                    out[idx + 2] = 255
                    out[idx + 3] = edgeIntensity
                  } else {
                    // Black sharp pencil line on transparent
                    out[idx] = 15
                    out[idx + 1] = 23
                    out[idx + 2] = 42
                    out[idx + 3] = edgeIntensity
                  }
                } else {
                  // Non-edge is 100% transparent so user sees their physical paper!
                  out[idx + 3] = 0
                }
              } else {
                // Sketch mode: smooth shading lines
                if (magnitude > threshold * 0.7) {
                  const lineShade = Math.max(0, 255 - Math.round(magnitude * 1.5))
                  out[idx] = lineShade
                  out[idx + 1] = lineShade
                  out[idx + 2] = lineShade
                  out[idx + 3] = Math.min(255, Math.round(magnitude * 1.8))
                } else {
                  out[idx + 3] = 0
                }
              }
            }
          }

          ctx.putImageData(outputData, 0, 0)
        } else {
          // Standard / High-Contrast mode with optional white background removal
          for (let i = 0, p = 0; i < data.length; i += 4, p++) {
            const gVal = gray[p]
            const alpha = data[i + 3]

            if (alpha < 10) {
              out[i + 3] = 0
              continue
            }

            if (config.removeWhiteBg && gVal > 225) {
              // Eliminate bright white background pixels so paper shows through
              out[i + 3] = 0
            } else {
              if (config.invertColors) {
                out[i] = 255 - gVal
                out[i + 1] = 255 - gVal
                out[i + 2] = 255 - gVal
              } else {
                out[i] = gVal
                out[i + 1] = gVal
                out[i + 2] = gVal
              }
              out[i + 3] = alpha
            }
          }

          ctx.putImageData(outputData, 0, 0)
        }

        resolve(canvas.toDataURL('image/png'))
      } catch (err) {
        reject(err)
      }
    }

    img.onerror = (e) => reject(e)
    img.src = imgSrc
  })
}
