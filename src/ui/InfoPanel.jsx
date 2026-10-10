import { useAtlas } from '../state/AtlasContext.jsx'
import { KINDS, NATION } from '../lib/theme.js'
import { codeOf } from '../data/locations.js'

/**
 * The four subjects a stop is written about, in reading order, with the glyph that
 * stands for each. They are read as one paragraph, so the panel reads as prose about
 * the place instead of four separate notes.
 */
const TOPICS = [
  { key: 'geography', glyph: '▲' },
  { key: 'culture', glyph: '✦' },
  { key: 'government', glyph: '★' },
  { key: 'economy', glyph: '◆' },
]

/**
 * The reading panel for one stop: a single paragraph covering geography, culture,
 * government and economy, plus the head-to-head comparison notes that explain how it
 * differs from its counterpart across the border.
 */
export default function InfoPanel() {
  const { selectedStop, selectedPair, counterpart, select, clear } = useAtlas()

  if (!selectedStop) return null

  const nation = NATION[selectedStop.country]
  const kind = KINDS[selectedStop.kind] || KINDS.geography

  return (
    <section
      className={`side-panel panel panel--${selectedStop.country}`}
      aria-label={`${selectedStop.name} reading`}
    >
      <div className="stop-head">
        <div className="stop-head__meta">
          <span className="chip">{codeOf(selectedStop)}</span>
          <span className={`chip chip--${selectedStop.country}`}>{nation.short}</span>
          <span className="chip">
            {kind.icon} {kind.label}
          </span>
          <button type="button" className="btn btn--icon side-panel__close" onClick={clear} aria-label="Close reading">
            ✕
          </button>
        </div>
        <h2 className="stop-head__name">{selectedStop.name}</h2>
        <p className="stop-head__tagline">{selectedStop.tagline}</p>
      </div>

      <div className="fact-grid">
        {selectedStop.facts.map((fact) => (
          <div className="fact" key={fact.label}>
            <span className="fact__value">{fact.value}</span>
            <span className="fact__label">{fact.label}</span>
          </div>
        ))}
      </div>

      <div className="panel__body side-panel__body">
        <article className="section-block">
          <div className="section-block__head">
            <span className="section-block__index">01</span>
            <span className="section-block__glyphs" style={{ color: kind.tint }} aria-hidden="true">
              {TOPICS.map((topic) => topic.glyph).join('')}
            </span>
            <h3 className="section-block__title">Reading</h3>
          </div>
          <p className="section-block__text">
            {TOPICS.map((topic) => selectedStop.sections?.[topic.key])
              .filter(Boolean)
              .join(' ')}
          </p>
        </article>

        <section className="compare-block">
          <div className="compare-block__head">
            <span className="compare-block__versus">Comparison</span>
            {selectedPair ? <span className="cite">{selectedPair.subject}</span> : null}
          </div>

          {counterpart ? (
            <>
              <p className="compare-block__name">
                ⇄ versus {counterpart.name}
                <span className="cite" style={{ marginLeft: 8 }}>
                  {NATION[counterpart.country].short}
                </span>
              </p>

              {selectedPair?.note ? <p className="pair-note">{selectedPair.note}</p> : null}

              <ul className="compare-list">
                {selectedStop.comparison.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>

              <button
                type="button"
                className="btn"
                onClick={() => select(counterpart.id)}
              >
                Open {counterpart.name} →
              </button>
            </>
          ) : (
            <p className="pair-note">
              This beacon marks a feature the two countries share rather than a place in one of them.
            </p>
          )}
        </section>
      </div>
    </section>
  )
}
