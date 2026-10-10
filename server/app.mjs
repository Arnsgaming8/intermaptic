/**
 * The Intermaptic API as a plain Node HTTP server.
 *
 * The same five handlers in `api/` are served two ways:
 *
 *   - on Vercel, where each file in `api/` is a serverless function, and
 *   - on Render (or any Node host), through this server, which is what
 *     `npm start` runs.
 *
 * There is one router and one set of handlers, so the two hosts cannot drift.
 * Nothing here imports from `node_modules`: the API is pure data plus Node
 * built-ins, so it starts instantly and has no dependency risk at runtime.
 */
import { createServer } from 'node:http'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { applyCors } from '../api/_lib/http.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')

const load = async (relative) => (await import(pathToFileURL(resolve(ROOT, relative)).href)).default

const handlers = {
  atlas: await load('api/atlas.js'),
  stops: await load('api/stops/index.js'),
  stop: await load('api/stops/[id].js'),
  search: await load('api/search.js'),
  health: await load('api/health.js'),
}

/** The public route list, also served at `/` so a bare visit explains itself. */
export const ROUTES = [
  { path: '/api/atlas', description: 'The whole atlas: every stop, every pair, the national readout and the border.' },
  { path: '/api/stops', description: 'The stop list. Filters: ?country=us|ca|shared ?kind= ?model= ?q= ?depth=summary' },
  { path: '/api/stops/:id', description: 'One stop, with its counterpart across the border.' },
  { path: '/api/search?q=', description: 'Ranked matches across every reader-facing string.' },
  { path: '/api/health', description: '200 when the data is valid, 503 when it is not.' },
]

const STOP_PATH = /^\/api\/stops\/([^/]+)\/?$/

/** A bare visit — `/`, `/api` or `/api/` — describes the API instead of guessing. */
const INDEX_PATH = /^\/(api\/?)?$/

/** Map a URL path to a handler, plus the path segment it needs. */
export function resolveRoute(pathname) {
  if (pathname === '/api/stops' || pathname === '/api/stops/') {
    return { handler: handlers.stops }
  }
  if (pathname === '/api/search') {
    return { handler: handlers.search }
  }
  if (pathname === '/api/health') {
    return { handler: handlers.health }
  }

  if (pathname === '/api/atlas') {
    return { handler: handlers.atlas }
  }

  const match = STOP_PATH.exec(pathname)
  if (match) return { handler: handlers.stop, id: decodeURIComponent(match[1]) }

  return null
}

/**
 * Adapt a Node response to the small surface the handlers use, so the exact same
 * `api/` code runs under Vercel and here without a compatibility layer.
 */
function adapt(res) {
  let statusCode = 200
  let headers = {}

  return {
    setHeader(key, value) {
      headers[key] = value
    },
    status(code) {
      statusCode = code
      return this
    },
    send(body) {
      res.writeHead(statusCode, headers)
      res.end(body)
      return this
    },
    end() {
      res.writeHead(statusCode, headers)
      res.end()
      return this
    },
    reset() {
      statusCode = 200
      headers = {}
    },
  }
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(payload, null, 2))
}

/** Build the server. Exported so a test or another host can mount it. */
export function createAppServer() {
  return createServer(async (req, res) => {
    let url
    try {
      url = new URL(req.url, 'http://localhost')
    } catch {
      sendJson(res, 400, { error: 'Malformed request URL.' })
      return
    }

    if (INDEX_PATH.test(url.pathname)) {
      applyCors(req, res)
      if (req.method !== 'GET') {
        sendJson(res, 405, { error: `Method ${req.method} is not allowed. This API is read-only.` })
        return
      }
      sendJson(res, 200, {
        name: 'Intermaptic API',
        description: 'A read-only atlas of the United States and Canada.',
        readingLevel: 'Everything about the two countries is written at a 6th grade level.',
        routes: ROUTES,
      })
      return
    }

    const route = resolveRoute(url.pathname)

    if (!route) {
      sendJson(res, 404, {
        error: `No route for ${url.pathname}.`,
        routes: ROUTES,
      })
      return
    }

    // The Vercel runtime parses the query string; here we do it ourselves.
    const queryObject = Object.fromEntries(url.searchParams.entries())
    if (route.id) queryObject.id = route.id

    try {
      await route.handler(
        { method: req.method, url: req.url, headers: req.headers, query: queryObject },
        adapt(res),
      )
    } catch (error) {
      // A handler that throws must not take the process down with it.
      if (!res.headersSent) {
        sendJson(res, 500, { error: 'The atlas could not be read.', detail: String(error?.message || error) })
      } else {
        res.end()
      }
    }
  })
}
