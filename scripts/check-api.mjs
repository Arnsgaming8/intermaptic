/**
 * API check.
 *
 * Calls every Vercel serverless handler directly with mock request and response
 * objects, so the API logic is verified without needing a Vercel runtime.
 *
 * Run with:  node scripts/check-api.mjs
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const url = (relative) => pathToFileURL(resolve(ROOT, relative)).href

const routes = {
  atlas: (await import(url('api/atlas.js'))).default,
  stops: (await import(url('api/stops/index.js'))).default,
  stop: (await import(url('api/stops/[id].js'))).default,
  search: (await import(url('api/search.js'))).default,
  health: (await import(url('api/health.js'))).default,
}

function createResponse() {
  const res = {
    statusCode: null,
    headers: {},
    body: null,
    ended: false,
    setHeader(key, value) {
      res.headers[key.toLowerCase()] = value
    },
    status(code) {
      res.statusCode = code
      return res
    },
    send(body) {
      res.body = body
      return res
    },
    end() {
      res.ended = true
      return res
    },
    json() {
      return res.body ? JSON.parse(res.body) : null
    },
  }
  return res
}

async function call(handler, { url: reqUrl = '/', method = 'GET', origin } = {}) {
  const req = { method, url: reqUrl, headers: origin ? { origin } : {}, query: {} }
  const res = createResponse()
  await handler(req, res)
  return res
}

let passed = 0
const failures = []

function check(label, condition, detail = '') {
  if (condition) {
    passed += 1
    console.log(`  ok   ${label}`)
  } else {
    failures.push(`${label}${detail ? ` - ${detail}` : ''}`)
    console.log(`  FAIL ${label}${detail ? ` - ${detail}` : ''}`)
  }
}

console.log('Intermaptic API check')
console.log('═════════════════════')

// ── GET /api/atlas ────────────────────────────────────────────────────────────
console.log('\nGET /api/atlas')
{
  const res = await call(routes.atlas, { url: '/api/atlas' })
  const body = res.json()
  check('responds 200', res.statusCode === 200, `got ${res.statusCode}`)
  check('sets a JSON content type', String(res.headers['content-type']).includes('application/json'))
  check('allows cross-origin reads', res.headers['access-control-allow-origin'] === '*')
  check('ships 23 stops', body.stops.length === 23, `got ${body.stops.length}`)
  check('ships 12 pairs', body.pairs.length === 12, `got ${body.pairs.length}`)
  check('reports counts by nation', body.counts.byNation.us === 11 && body.counts.byNation.ca === 11)
  check('every stop carries 4 sections', body.stops.every((s) => Object.keys(s.sections).length === 4))
  check('every stop carries 3 facts', body.stops.every((s) => s.facts.length === 3))
  check('every stop carries 3 comparison notes', body.stops.every((s) => s.comparison.length === 3))
  check('every stop resolves a counterpart or is the shared border feature',
    body.stops.every((s) => s.counterpart !== null || s.country === 'shared'))
  check('reports the reading level', body.readingLevel && body.readingLevel.withinTarget === true,
    JSON.stringify(body.readingLevel))
  check('reading level is at or under 15 words per sentence',
    body.readingLevel.longestSentence <= 15, `longest ${body.readingLevel.longestSentence}`)
  check('includes the national readout', Boolean(body.nationalComparison?.us?.rows?.length))
  check('includes the border data', body.border.facts.length > 0 && body.border.segments.length > 0)
}

// ── GET /api/stops ────────────────────────────────────────────────────────────
console.log('\nGET /api/stops (filters)')
{
  const all = (await call(routes.stops, { url: '/api/stops' })).json()
  check('lists every stop', all.count === 23, `got ${all.count}`)

  const ca = (await call(routes.stops, { url: '/api/stops?country=ca' })).json()
  check('filters by country', ca.count === 11, `got ${ca.count}`)

  const geography = (await call(routes.stops, { url: '/api/stops?kind=geography' })).json()
  check('filters by kind', geography.count > 0 && geography.stops.every((s) => s.kind === 'geography'))

  const both = (await call(routes.stops, { url: '/api/stops?country=us&kind=capital' })).json()
  check('combines filters', both.count === 1, `got ${both.count}`)

  const summary = (await call(routes.stops, { url: '/api/stops?depth=summary' })).json()
  check('supports a summary depth', summary.stops.every((s) => s.sections === undefined))

  const bad = await call(routes.stops, { url: '/api/stops?country=zz' })
  check('rejects an unknown country with 400', bad.statusCode === 400, `got ${bad.statusCode}`)
}

// ── GET /api/stops/:id ────────────────────────────────────────────────────────
console.log('\nGET /api/stops/:id')
{
  const found = await call(routes.stop, { url: '/api/stops/ottawa' })
  const body = found.json()
  check('returns a known stop', found.statusCode === 200, `got ${found.statusCode}`)
  check('returns the right stop', body.stop.id === 'ottawa')
  check('includes the counterpart', body.counterpart?.stop?.id === 'washington-dc',
    `got ${body.counterpart?.stop?.id}`)
  check('includes the pair detail', body.pair?.id === 'capitals')
  check('includes that country national readout', body.nationalComparison?.nation === 'ca')

  const shared = (await call(routes.stop, { url: '/api/stops/niagara-falls' })).json()
  check('handles the shared-border stop', shared.stop.country === 'shared')

  const missing = await call(routes.stop, { url: '/api/stops/atlantis' })
  check('returns 404 for an unknown stop', missing.statusCode === 404, `got ${missing.statusCode}`)
}

// ── GET /api/search ───────────────────────────────────────────────────────────
console.log('\nGET /api/search')
{
  const water = (await call(routes.search, { url: '/api/search?q=water' })).json()
  check('finds stops matching a term', water.count > 0, `got ${water.count}`)
  check('ranks results by score', water.results.every((r, i, a) => i === 0 || a[i - 1].score >= r.score))
  check('reports which fields matched', water.results[0].matchedIn.length > 0)

  const named = (await call(routes.search, { url: '/api/search?q=toronto' })).json()
  check('a stop name match ranks first', named.results[0]?.id === 'toronto', `got ${named.results[0]?.id}`)

  const pairMatch = (await call(routes.search, { url: '/api/search?q=rock' })).json()
  check('returns matched pairs', Array.isArray(pairMatch.matchedPairs))

  const short = await call(routes.search, { url: '/api/search?q=a' })
  check('rejects a query under 2 characters', short.statusCode === 400, `got ${short.statusCode}`)
}

// ── GET /api/health ───────────────────────────────────────────────────────────
console.log('\nGET /api/health')
{
  const res = await call(routes.health, { url: '/api/health' })
  const body = res.json()
  check('reports ok', res.statusCode === 200 && body.status === 'ok', JSON.stringify(body.status))
  check('reports zero schema problems', Array.isArray(body.schemaProblems) && body.schemaProblems.length === 0,
    JSON.stringify(body.schemaProblems))
  check('reports 23 stops', body.stops.total === 23, `got ${body.stops.total}`)
}

// ── Method handling and CORS preflight ────────────────────────────────────────
console.log('\nMethod handling')
{
  const posted = await call(routes.atlas, { url: '/api/atlas', method: 'POST' })
  check('rejects POST with 405', posted.statusCode === 405, `got ${posted.statusCode}`)

  const preflight = await call(routes.atlas, { url: '/api/atlas', method: 'OPTIONS' })
  check('answers preflight with 204', preflight.statusCode === 204, `got ${preflight.statusCode}`)
  check('advertises GET and OPTIONS', preflight.headers['access-control-allow-methods'] === 'GET, OPTIONS')
}

// ── Origin allow-list ─────────────────────────────────────────────────────────
console.log('\nOrigin allow-list')
{
  process.env.ALLOWED_ORIGINS = 'https://example.github.io'
  const allowed = await call(routes.atlas, { url: '/api/atlas', origin: 'https://example.github.io' })
  check('echoes an allowed origin', allowed.headers['access-control-allow-origin'] === 'https://example.github.io',
    String(allowed.headers['access-control-allow-origin']))

  const blocked = await call(routes.atlas, { url: '/api/atlas', origin: 'https://evil.example' })
  check('does not grant a disallowed origin', blocked.headers['access-control-allow-origin'] === undefined,
    String(blocked.headers['access-control-allow-origin']))
  delete process.env.ALLOWED_ORIGINS
}

console.log(`\n${passed} passed, ${failures.length} failed`)
if (failures.length) {
  console.error('\nFailures:')
  failures.forEach((f) => console.error(`  ✗ ${f}`))
  process.exit(1)
}
console.log('✓ every API route behaves correctly')
