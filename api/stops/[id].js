import { route, sendError, sendJson } from '../_lib/http.js'
import { NATIONAL_COMPARISON, getCounterpart, getPair, getStop, shapeStop } from '../_lib/atlas.js'

/**
 * GET /api/stops/:id
 *
 * One stop with everything needed to render its reading: the four sections, the
 * quick facts, the comparison notes, and its counterpart across the border.
 */
export default route(async (req, res) => {
  const id = (req.query?.id || decodeURIComponent(req.url.split('?')[0].split('/').pop() || ''))
    .toString()
    .trim()

  const stop = getStop(id)
  if (!stop) {
    sendError(res, 404, `No stop with id "${id}".`, { hint: 'Try GET /api/stops for the full list.' })
    return
  }

  const counterpart = getCounterpart(id)
  const pair = getPair(stop.pair)
  const national = NATIONAL_COMPARISON[stop.country] || null

  sendJson(res, 200, {
    stop: shapeStop(stop),
    counterpart: counterpart
      ? { stop: shapeStop(counterpart), readingLevel: national ? undefined : undefined }
      : null,
    pair: pair || null,
    nationalComparison: national,
  })
})
