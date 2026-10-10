import { useAtlas } from '../state/AtlasContext.jsx'
import { KINDS, NATION } from '../lib/theme.js'
import { codeOf } from '../data/locations.js'
import { BORDER_SEGMENTS } from '../data/border.js'

const GROUPS = [
  { id: 'us', title: 'United States of America' },
  { id: 'ca', title: 'Canada' },
  { id: 'shared', title: 'Shared Border' },
]

/** Full directory of the atlas: every beacon, plus the segments of the boundary. */
export default function AtlasPanel() {
  const { overlay, closeOverlay, stops, selectedId, select, pairs, focusPair } = useAtlas()

  if (overlay !== 'atlas') return null

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Stop directory">
      <div className="overlay__panel panel">
        <div className="panel__header">
          <h2 className="panel__title">Atlas Directory</h2>
          <span className="panel__subtitle">
            {stops.length} beacons · {pairs.length} comparison pairs
          </span>
          <button
            type="button"
            className="btn btn--icon side-panel__close"
            onClick={closeOverlay}
            aria-label="Close directory"
          >
            ✕
          </button>
        </div>

        <div className="overlay__body">
          <div className="atlas-grid">
            {GROUPS.map((group) => {
              const groupStops = stops.filter((stop) => stop.country === group.id)
              if (!groupStops.length) return null
              return (
                <section className={`atlas-group atlas-group--${group.id}`} key={group.id}>
                  <h3 className="atlas-group__title">{group.title}</h3>
                  {groupStops.map((stop) => {
                    const kind = KINDS[stop.kind] || KINDS.geography
                    return (
                      <button
                        type="button"
                        className={`atlas-item ${selectedId === stop.id ? 'is-selected' : ''}`}
                        key={stop.id}
                        onClick={() => {
                          select(stop.id)
                          closeOverlay()
                        }}
                      >
                        <span className="atlas-item__code">{codeOf(stop)}</span>
                        <span className="atlas-item__name">
                          {kind.icon} {stop.name}
                        </span>
                        <span className="atlas-item__kind">{kind.label}</span>
                      </button>
                    )
                  })}
                </section>
              )
            })}

            <section className="atlas-group">
              <h3 className="atlas-group__title">Comparison Pairs</h3>
              {pairs.map((pair) => (
                <button
                  type="button"
                  className="atlas-item"
                  key={pair.id}
                  onClick={() => {
                    focusPair(pair.id)
                    closeOverlay()
                  }}
                >
                  <span className="atlas-item__code">{pair.subject}</span>
                  <span className="atlas-item__name">{pair.label}</span>
                  <span className="atlas-item__kind">⇄</span>
                </button>
              ))}
            </section>

            <section className="atlas-group">
              <h3 className="atlas-group__title">Boundary Segments</h3>
              {BORDER_SEGMENTS.map((segment) => (
                <div className="atlas-item" key={segment.id} style={{ cursor: 'default' }}>
                  <span className="atlas-item__code">{NATION.shared.code}</span>
                  <span className="atlas-item__name">
                    {segment.label}
                    <span className="pair-item__note">{segment.note}</span>
                  </span>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
