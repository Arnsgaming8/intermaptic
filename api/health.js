import { route, sendJson } from './_lib/http.js'
import { ATLAS_VERSION, countByNation, measureReadingLevel, STOPS } from './_lib/atlas.js'
import { validateAtlas } from '../src/data/locations.js'

/**
 * GET /api/health
 *
 * Reports whether the atlas the API is serving is internally valid, so a broken
 * deploy is obvious from a single request.
 */
export default route(async (req, res) => {
  const problems = validateAtlas()
  const readingLevel = measureReadingLevel()

  sendJson(res, problems.length ? 503 : 200, {
    status: problems.length ? 'degraded' : 'ok',
    version: ATLAS_VERSION,
    checkedAt: new Date().toISOString(),
    stops: {
      total: STOPS.length,
      byNation: countByNation(),
    },
    readingLevel,
    schemaProblems: problems,
  })
})
