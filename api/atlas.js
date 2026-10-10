import { route, sendJson } from './_lib/http.js'
import { buildAtlas } from './_lib/atlas.js'

/**
 * GET /api/atlas
 *
 * The whole atlas in one response: every stop, both sides of every comparison pair,
 * the national readout, the border data, and the measured reading level.
 */
export default route(async (req, res) => {
  sendJson(res, 200, buildAtlas())
})
