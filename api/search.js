import { query, route, sendError, sendJson } from './_lib/http.js'
import { PAIRS, searchAtlas } from './_lib/atlas.js'

/**
 * GET /api/search?q=water
 *
 * Searches every reader-facing string and returns the matching stops ranked by how
 * strongly they match. Matching comparison pairs are returned alongside.
 */
export default route(async (req, res) => {
  const params = query(req)
  const q = params.q || ''
  const limit = Math.min(Number(params.limit) || 20, 50)

  if (q.trim().length < 2) {
    sendError(res, 400, 'Provide ?q= with at least 2 characters.', { example: '/api/search?q=water' })
    return
  }

  const results = searchAtlas(q, { limit })
  const ids = new Set(results.map((r) => r.id))
  const matchedPairs = PAIRS.filter((pair) => ids.has(pair.us) || ids.has(pair.ca)).map((pair) => ({
    id: pair.id,
    label: pair.label,
    subject: pair.subject,
  }))

  sendJson(res, 200, { query: q, count: results.length, results, matchedPairs })
})
