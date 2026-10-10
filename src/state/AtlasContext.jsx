import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  ACTIVE_PAIRS,
  PAIRS,
  STOPS,
} from '../data/locations.js'
import { API_BASE, API_ENABLED, fetchAtlas } from '../lib/api.js'

const AtlasContext = createContext(null)

/**
 * How long to wait before re-asking an API that did not answer the first time, and
 * how long to give that second ask. Both are generous because the retry happens
 * out of sight: the bundled atlas is already on screen by then, so a slow answer
 * costs nothing but a quiet upgrade to live data.
 */
const RETRY_DELAY_MS = 25000
const RETRY_TIMEOUT_MS = 45000

/**
 * The atlas store.
 *
 * Content is loaded from the API on Vercel when `VITE_API_BASE` is configured, so
 * the atlas can be updated on the backend without redeploying the GitHub Pages
 * frontend. The copy bundled into this build is the fallback: if the API is absent,
 * slow, or malformed, the app runs entirely on the bundled data and says so.
 */
export function AtlasProvider({ children }) {
  const [remote, setRemote] = useState(null)
  const [source, setSource] = useState(API_ENABLED ? 'connecting' : 'bundled')

  const [nationFilter, setNationFilter] = useState('all')
  const [kindFilter, setKindFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [overlay, setOverlay] = useState('none')
  const [autoRotate, setAutoRotate] = useState(true)
  const [showLabels, setShowLabels] = useState(true)
  const [showBorder, setShowBorder] = useState(true)
  const [showLink, setShowLink] = useState(true)

  useEffect(() => {
    if (!API_ENABLED) return undefined
    let cancelled = false
    let retry = null

    const attempt = (isRetry) => {
      fetchAtlas(isRetry ? { timeoutMs: RETRY_TIMEOUT_MS } : undefined).then((payload) => {
        if (cancelled) return
        if (payload) {
          setRemote(payload)
          setSource('live')
          return
        }
        // The API did not answer with something usable - keep the bundled atlas.
        setSource('bundled')
        // Free hosting tiers put an idle instance to sleep, and the wake-up takes
        // far longer than a page load will wait. Asking once more in the
        // background means a cold backend still upgrades to the live atlas
        // without the reader reloading anything.
        if (!isRetry) {
          retry = setTimeout(() => attempt(true), RETRY_DELAY_MS)
        }
      })
    }

    attempt(false)

    return () => {
      cancelled = true
      if (retry) clearTimeout(retry)
    }
  }, [])

  const stops = remote?.stops?.length ? remote.stops : STOPS
  const pairs = remote?.pairs?.length ? remote.pairs : ACTIVE_PAIRS
  const allPairs = remote?.pairs?.length ? remote.pairs : PAIRS

  const stopById = useMemo(() => new Map(stops.map((stop) => [stop.id, stop])), [stops])
  const pairById = useMemo(() => new Map(allPairs.map((pair) => [pair.id, pair])), [allPairs])

  const visibleStops = useMemo(
    () =>
      stops.filter(
        (stop) =>
          (nationFilter === 'all' || stop.country === nationFilter) &&
          (kindFilter === 'all' || stop.kind === kindFilter),
      ),
    [stops, nationFilter, kindFilter],
  )

  const selectedStop = selectedId ? stopById.get(selectedId) || null : null

  const selectedPair = useMemo(() => {
    if (!selectedStop) return null
    return pairById.get(selectedStop.pair) || null
  }, [selectedStop, pairById])

  /**
   * The stop on the other side of the border. Resolved against whichever dataset is
   * active, so it works identically for live and bundled content.
   */
  const counterpart = useMemo(() => {
    if (!selectedStop || !selectedPair) return null
    const otherId = selectedPair.us === selectedStop.id ? selectedPair.ca : selectedPair.us
    if (!otherId || otherId === selectedStop.id) return null
    return stopById.get(otherId) || null
  }, [selectedStop, selectedPair, stopById])

  const hoveredStop = hoveredId ? stopById.get(hoveredId) || null : null

  const countFor = useCallback(
    (matcher) => stops.filter(matcher).length,
    [stops],
  )

  const select = useCallback((id) => {
    if (!id) {
      setSelectedId(null)
      return
    }
    setSelectedId(id)
    setAutoRotate(false)
  }, [])

  const toggle = useCallback((id) => {
    setSelectedId((prev) => (prev === id ? null : id))
    setAutoRotate(false)
  }, [])

  const clear = useCallback(() => setSelectedId(null), [])
  const openCompare = useCallback(() => {
    setOverlay('compare')
    setAutoRotate(false)
  }, [])
  const openAtlas = useCallback(() => {
    setOverlay('atlas')
    setAutoRotate(false)
  }, [])
  const closeOverlay = useCallback(() => setOverlay('none'), [])

  const focusPair = useCallback((pairId) => {
    const pair = pairById.get(pairId)
    if (!pair) return
    setSelectedId(pair.us)
    setOverlay('none')
    setAutoRotate(false)
  }, [pairById])

  const selectNation = useCallback((id) => {
    setNationFilter(id)
    setSelectedId(null)
    setAutoRotate(true)
  }, [])

  /** Clicking the active stop class again clears the filter. */
  const selectKind = useCallback((id) => {
    setKindFilter((current) => (current === id ? 'all' : id))
    setSelectedId(null)
  }, [])

  const value = useMemo(
    () => ({
      stops,
      allPairs,
      visibleStops,
      pairs,
      nationFilter,
      selectNation,
      kindFilter,
      selectKind,
      countFor,
      selectedId,
      selectedStop,
      selectedPair,
      counterpart,
      hoveredId,
      hoveredStop,
      setHoveredId,
      select,
      toggle,
      clear,
      overlay,
      openCompare,
      openAtlas,
      closeOverlay,
      focusPair,
      autoRotate,
      setAutoRotate,
      showLabels,
      setShowLabels,
      showBorder,
      setShowBorder,
      showLink,
      setShowLink,
      source,
      apiBase: API_BASE,
      apiEnabled: API_ENABLED,
    }),
    [
      stops,
      allPairs,
      visibleStops,
      pairs,
      nationFilter,
      selectNation,
      kindFilter,
      selectKind,
      countFor,
      selectedId,
      selectedStop,
      selectedPair,
      counterpart,
      hoveredId,
      hoveredStop,
      select,
      toggle,
      clear,
      overlay,
      openCompare,
      openAtlas,
      closeOverlay,
      focusPair,
      autoRotate,
      showLabels,
      showBorder,
      showLink,
      source,
    ],
  )

  return <AtlasContext.Provider value={value}>{children}</AtlasContext.Provider>
}

export function useAtlas() {
  const ctx = useContext(AtlasContext)
  if (!ctx) throw new Error('useAtlas must be used inside <AtlasProvider>')
  return ctx
}
