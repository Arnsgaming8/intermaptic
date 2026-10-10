import { query, route, sendError, sendJson } from '../_lib/http.js'
import { listStops } from '../_lib/atlas.js'

const COUNTRIES = ['us', 'ca', 'shared']
const KINDS = ['capital', 'culture', 'economy', 'geography', 'border']

/**
 * GET /api/stops
 *
 * Query: ?country=us|ca|shared  ?kind=capital|culture|economy|geography|border
 *        ?model=cn-tower  ?q=text  ?depth=full|summary
 */
export default route(async (req, res) => {
  const params = query(req)

  if (params.country && !COUNTRIES.includes(params.country)) {
    sendError(res, 400, `Unknown country "${params.country}".`, { allowed: COUNTRIES })
    return
  }
  if (params.kind && !KINDS.includes(params.kind)) {
    sendError(res, 400, `Unknown kind "${params.kind}".`, { allowed: KINDS })
    return
  }

  const stops = listStops({
    country: params.country,
    kind: params.kind,
    model: params.model,
    q: params.q,
    depth: params.depth,
  })

  sendJson(res, 200, { count: stops.length, stops })
})
