import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  ACTIVE_PAIRS,
  PAIRS,
  STOPS,
} from '../data/locations.js'
import { API_BASE, API_ENABLED, fetchAtlas, pingApi } from '../lib/api.js'

const AtlasContext = createContext(null)

/**
 * Boot timings.
 *
 * A warm instance answers the first ask in a fraction of a second, so the loading
 * screen never appears and nothing is pinged. A sleeping one answers nothing at all,
 * which is what the probe window detects; from then on the app pings until the
 * instance wakes or the budget runs out, and the bundled atlas takes over.
 */
const PROBE_TIMEOUT_MS = 5000
const WAKE_PING_INTERVAL_MS = 2500
const WAKE_PING_TIMEOUT_MS = 4000
const WAKE_BUDGET_MS = 95000
const WAKE_LOAD_TIMEOUT_MS = 25000

/**
 * How long to wait before quietly re-asking an API that never came back, and how
 * long to give that ask. It happens out of sight: the bundled atlas is already on
 * screen, so a slow answer costs nothing but a quiet upgrade to live data.
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
  const [wakePings, setWakePings] = useState(0)
  const stopBoot = useRef(null)

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
    const timers = new Set()

    const later = (fn, ms) => {
      const id = setTimeout(fn, ms)
      timers.add(id)
      return id
    }

    /** Let the reader leave the loading screen without waiting for the backend. */
    stopBoot.current = () => {
      cancelled = true
      timers.forEach(clearTimeout)
      timers.clear()
    }

    const settle = (payload) => {
      if (payload) {
        setRemote(payload)
        setSource('live')
      } else {
        setSource('bundled')
      }
    }

    /** One quiet re-ask, out of sight, after the app has already fallen back. */
    const quietRetry = () => later(() => {
      fetchAtlas({ timeoutMs: RETRY_TIMEOUT_MS }).then((payload) => {
        if (!cancelled) settle(payload)
      })
    }, RETRY_DELAY_MS)

    /** Ping a sleeping instance until it answers, then take the atlas from it. */
    const ping = (deadline) => {
      pingApi({ timeoutMs: WAKE_PING_TIMEOUT_MS }).then((awake) => {
        if (cancelled) return
        setWakePings((count) => count + 1)

        if (awake) {
          fetchAtlas({ timeoutMs: WAKE_LOAD_TIMEOUT_MS }).then((payload) => {
            if (cancelled) return
            settle(payload)
            // It answered but its atlas is unusable: that is a broken deploy, not a
            // sleeping instance, so stop pinging and let one quiet retry cover it.
            if (!payload) quietRetry()
          })
          return
        }

        if (Date.now() >= deadline) {
          setSource('bundled')
          quietRetry()
          return
        }
        later(() => ping(deadline), WAKE_PING_INTERVAL_MS)
      })
    }

    fetchAtlas({ timeoutMs: PROBE_TIMEOUT_MS }).then((payload) => {
      if (cancelled) return
      if (payload) {
        settle(payload)
        return
      }
      // Nothing came back inside the probe window. On a free host that means the
      // instance is asleep, so the reader gets a loading screen and pings start.
      setSource('waking')
      ping(Date.now() + WAKE_BUDGET_MS)
    })

    return () => stopBoot.current?.()
  }, [])

  /** The reader would rather read the bundled atlas than wait for a cold backend. */
  const skipWake = useCallback(() => {
    stopBoot.current?.()
    setSource('bundled')
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
      /** True while a sleeping backend is being woken, so the loading screen shows. */
      waking: source === 'waking',
      wakePings,
      skipWake,
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
      wakePings,
      skipWake,
    ],
  )

  return <AtlasContext.Provider value={value}>{children}</AtlasContext.Provider>
}

export function useAtlas() {
  const ctx = useContext(AtlasContext)
  if (!ctx) throw new Error('useAtlas must be used inside <AtlasProvider>')
  return ctx
}
