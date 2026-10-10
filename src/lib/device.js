import { useEffect, useState } from 'react'

/**
 * Coarse performance tier for the 3D scene.
 *
 * An iPad renders this scene at devicePixelRatio 2, which means four times the
 * pixels of a non-retina screen. Capping the render resolution and thinning the
 * starfield is the difference between a smooth orbit and a stuttering one, and it
 * is invisible on a screen that small.
 */
function detect() {
  if (typeof window === 'undefined') return 'high'

  const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false
  const narrow = window.innerWidth < 1100
  const cores = navigator.hardwareConcurrency || 4
  // iPadOS reports itself as a Macintosh, so detect it explicitly.
  const isIPad =
    /iPad/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  if (isIPad || coarsePointer || narrow || cores <= 4) return 'low'
  return 'high'
}

export function useDeviceTier() {
  const [tier, setTier] = useState(detect)

  useEffect(() => {
    const update = () => setTier(detect())
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return tier
}

export const TIER = {
  high: {
    maxDpr: 2,
    globeSegments: 128,
    stars: [2600, 1200, 600],
  },
  low: {
    maxDpr: 1.5,
    globeSegments: 72,
    stars: [900, 420, 200],
  },
}
