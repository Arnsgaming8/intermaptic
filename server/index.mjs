/**
 * Entry point for `npm start` - the Node web service on Render.
 *
 * Render sets PORT, so it is read from the environment. Locally the same command
 * serves the API on http://localhost:3000, which is also what the frontend uses
 * during development:
 *
 *   npm start
 *   VITE_API_BASE=http://localhost:3000 npm run dev
 */
import { createAppServer, ROUTES } from './app.mjs'

const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || '0.0.0.0'

// A health check is issued as soon as the instance is live, so report anything
// fatal rather than letting Render time out with no explanation.
process.on('unhandledRejection', (error) => {
  console.error('[intermaptic-api] unhandled rejection:', error)
})

const server = createAppServer()

server.listen(PORT, HOST, () => {
  console.log(`[intermaptic-api] listening on http://${HOST}:${PORT}`)
  ROUTES.forEach((route) => console.log(`  ${route.path}`))
})

/** Render sends SIGTERM on deploy and scale-down; close cleanly. */
process.on('SIGTERM', () => {
  console.log('[intermaptic-api] SIGTERM, closing')
  server.close(() => process.exit(0))
})
