/**
 * Shared HTTP helpers for the Intermaptic API.
 *
 * The API is read-only public data, so the default policy is an open GET, but an
 * explicit allow-list can be set with ALLOWED_ORIGINS when the frontend is hosted
 * somewhere specific (for example the GitHub Pages origin).
 */

export function applyCors(req, res) {
  const configured = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)
  const origin = req.headers?.origin

  if (configured.length === 0) {
    // No allow-list configured: this is public read-only data, so allow any origin.
    res.setHeader('Access-Control-Allow-Origin', '*')
  } else if (origin && configured.some((allowed) => allowed === origin || allowed === '*')) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Max-Age', '86400')
}

export function sendJson(res, status, payload) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600')
  res.status(status).send(JSON.stringify(payload, null, 2))
}

export function sendError(res, status, message, extra = {}) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.status(status).send(JSON.stringify({ error: message, ...extra }, null, 2))
}

/**
 * Wrap a handler so every route gets CORS, a JSON response and a preflight answer,
 * and so an unexpected throw becomes a clean 500 instead of a stack trace.
 */
export function route(handler) {
  return async function wrapped(req, res) {
    applyCors(req, res)
    if (req.method === 'OPTIONS') {
      res.status(204).end()
      return
    }
    if (req.method !== 'GET') {
      sendError(res, 405, `Method ${req.method} is not allowed. This API is read-only.`, {
        allow: 'GET, OPTIONS',
      })
      return
    }
    try {
      await handler(req, res)
    } catch (error) {
      sendError(res, 500, 'The atlas could not be read.', { detail: String(error?.message || error) })
    }
  }
}

/** Parse `?a=1&b=2` without depending on the runtime's query parsing. */
export function query(req) {
  const raw = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?') + 1) : ''
  const params = new URLSearchParams(raw)
  const out = {}
  params.forEach((value, key) => {
    out[key] = value
  })
  return out
}
