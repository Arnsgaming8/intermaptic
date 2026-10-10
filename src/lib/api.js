/**
 * Client for the Intermaptic API (hosted on Vercel).
 *
 * The frontend on GitHub Pages calls this API for its content, so the atlas can be
 * updated on the backend without redeploying the frontend. If the API is unset,
 * slow or down, every call resolves to `null` and the app falls back to the copy of
 * the data that is bundled into this build - the site must never blank out because
 * a network request failed.
 */

const RAW_BASE = (import.meta.env.VITE_API_BASE || '').trim()
/** `same-origin` means "call /api on whichever host is serving this page". */
const SAME_ORIGIN = RAW_BASE === 'same-origin'
export const API_BASE = (SAME_ORIGIN ? '' : RAW_BASE).replace(/\/+$/, '')
export const API_ENABLED = SAME_ORIGIN || API_BASE.length > 0

/** Fields a remote stop must carry before we trust it over the bundled copy. */
const REQUIRED_STOP_FIELDS = ['id', 'name', 'country', 'kind', 'lat', 'lng', 'model', 'tagline']

function isValidStop(stop) {
  if (!stop || typeof stop !== 'object') return false
  if (!REQUIRED_STOP_FIELDS.every((field) => stop[field] !== undefined && stop[field] !== null)) return false
  if (!Number.isFinite(stop.lat) || !Number.isFinite(stop.lng)) return false
  if (!stop.sections || typeof stop.sections !== 'object') return false
  if (!Array.isArray(stop.comparison) || !Array.isArray(stop.facts)) return false
  return true
}

/**
 * A remote payload is only accepted if it parses, carries stops, and every stop is
 * well formed. Anything else is treated as a failure so the bundled data is used.
 */
function validateAtlas(payload) {
  if (!payload || typeof payload !== 'object') return null
  if (!Array.isArray(payload.stops) || payload.stops.length === 0) return null
  if (!payload.stops.every(isValidStop)) return null
  if (!Array.isArray(payload.pairs)) return null
  return payload
}

async function getJson(path, { timeoutMs = 4500 } = {}) {
  if (!API_ENABLED) return null

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

/** Fetch the whole atlas. Resolves to `null` on any failure. */
export async function fetchAtlas(options) {
  return validateAtlas(await getJson('/api/atlas', options))
}

/** Search the backend. Resolves to `null` on any failure. */
export async function searchAtlas(query, options) {
  if (!query || query.trim().length < 2) return null
  const payload = await getJson(`/api/search?q=${encodeURIComponent(query.trim())}`, options)
  return payload && Array.isArray(payload.results) ? payload : null
}
