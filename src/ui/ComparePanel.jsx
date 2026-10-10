import { useAtlas } from '../state/AtlasContext.jsx'
import { NATIONAL_COMPARISON, getStop } from '../data/locations.js'
import { BORDER_FACTS } from '../data/border.js'

const HIGHLIGHT = new Set([
  'Population',
  'Government',
  'Head of state',
  'Legislature',
  'Official languages',
  'Health system',
])

/**
 * Country-level head-to-head: the same metrics read down the middle, the United
 * States on the left and Canada on the right, plus the facts the two countries share.
 */
export default function ComparePanel() {
  const { overlay, closeOverlay, pairs, focusPair } = useAtlas()

  if (overlay !== 'compare') return null

  const us = NATIONAL_COMPARISON.us
  const ca = NATIONAL_COMPARISON.ca

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="National comparison">
      <div className="overlay__panel panel">
        <div className="panel__header">
          <h2 className="panel__title">National Readout</h2>
          <span className="panel__subtitle">United States vs Canada</span>
          <button
            type="button"
            className="btn btn--icon side-panel__close"
            onClick={closeOverlay}
            aria-label="Close comparison"
          >
            ✕
          </button>
        </div>

        <div className="overlay__body">
          <div className="nation-grid">
            <div className="nation-col__head nation-col--us">
              <h3 className="nation-col__name">UNITED STATES</h3>
            </div>
            <div className="nation-col__head">
              <span className="label">Metric</span>
            </div>
            <div className="nation-col__head nation-col--ca">
              <h3 className="nation-col__name">CANADA</h3>
            </div>

            {us.rows.map((row, index) => {
              const other = ca.rows[index]
              return (
                <div
                  className={`compare-row ${HIGHLIGHT.has(row.label) ? 'compare-row--highlight' : ''}`}
                  key={row.label}
                >
                  <div className="compare-row__us">{row.value}</div>
                  <div className="compare-row__label">{row.label}</div>
                  <div className="compare-row__ca">{other ? other.value : '—'}</div>
                </div>
              )
            })}
          </div>

          <section className="shared-strip">
            <h3 className="shared-strip__title">Shared Measurements</h3>
            <ul>
              {BORDER_FACTS.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.label}</strong>
                  {fact.value}
                </li>
              ))}
              {NATIONAL_COMPARISON.shared.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.label}</strong>
                  {fact.value}
                </li>
              ))}
            </ul>
          </section>

          <div className="pair-list">
            <h3 className="shared-strip__title" style={{ marginBottom: 0 }}>
              Comparison Pairs
            </h3>
            {pairs.map((pair) => (
              <button type="button" className="pair-item" key={pair.id} onClick={() => focusPair(pair.id)}>
                <span className="pair-item__subject">{pair.subject}</span>
                <span className="pair-item__match">
                  {pair.us === pair.ca
                    ? `${nameOf(pair.us)} — both sides of the border`
                    : `${nameOf(pair.us)} ⇄ ${nameOf(pair.ca)}`}
                  <span className="pair-item__note">{pair.note}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Stop names come from the atlas itself, never from a second copy of the data. */
function nameOf(stopId) {
  return getStop(stopId)?.name || stopId
}
