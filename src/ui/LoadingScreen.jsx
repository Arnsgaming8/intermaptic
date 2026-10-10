import { useAtlas } from '../state/AtlasContext.jsx'

/**
 * Cold-start screen.
 *
 * The live atlas is served from a free instance that sleeps when nobody is using it.
 * Waking it takes about half a minute, which is longer than a page load will wait.
 *
 * This screen shows only while that wake-up is actually happening. When the API
 * answers straight away it never appears, and no ping is sent. The reader is never
 * stuck here either: the bundled atlas is ready the whole time, so the button leaves
 * the wait and reads that instead.
 */
export default function LoadingScreen() {
  const { waking, wakePings, skipWake } = useAtlas()

  if (!waking) return null

  return (
    <div className="boot" role="alertdialog" aria-modal="true" aria-label="Waking the live atlas">
      <div className="boot__inner">
        <div className="boot__radar" aria-hidden="true">
          <span />
        </div>

        <p className="boot__kicker">Live atlas asleep</p>
        <h2 className="boot__title">Waking the server</h2>
        <p className="boot__text">
          The free server sleeps when nobody is using it. Waking it up takes about half a
          minute. You can wait here, or read the copy built into this page right now.
        </p>

        <div className="boot__meta">
          <span className="label">Ping {String(wakePings).padStart(2, '0')}</span>
          <span className="label">Built-in atlas ready</span>
        </div>

        <div className="boot__actions">
          <button type="button" className="btn" onClick={skipWake}>
            Use the built-in atlas
          </button>
        </div>
      </div>
    </div>
  )
}
