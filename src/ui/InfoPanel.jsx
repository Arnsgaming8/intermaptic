import { useAtlas } from '../state/AtlasContext.jsx'
import { KINDS, NATION } from '../lib/theme.js'
import { codeOf } from '../data/locations.js'

/**
 * The four subjects a stop is written about, in reading order, with the glyph and the
 * heading that stand for each. Each one runs to eight to ten sentences, so a stop reads as a
 * full account of the place rather than a note.
 */
const SECTIONS = [
  { key: 'geography', title: 'Geography', icon: '▲' },
  { key: 'culture', title: 'Culture', icon: '✦' },
  { key: 'government', title: 'Government', icon: '★' },
  { key: 'economy', title: 'Economy', icon: '◆' },
]

/**
 * The reading panel for one stop: four subject sections plus the head-to-head
 * comparison notes that explain how it differs from its counterpart across the border.
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
        {SECTIONS.map((section, index) => (
          <article className="section-block" key={section.key}>
            <div className="section-block__head">
              <span className="section-block__index">{String(index + 1).padStart(2, '0')}</span>
              <span style={{ color: kind.tint }} aria-hidden="true">
                {section.icon}
              </span>
              <h3 className="section-block__title">{section.title}</h3>
            </div>
            <p className="section-block__text">{selectedStop.sections?.[section.key]}</p>
          </article>
        ))}

        {selectedStop.sources?.length ? (
          <section className="sources-block">
            <h3 className="sources-block__title">Sources</h3>
            <ul className="sources-list">
              {selectedStop.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </section>
        ) : null}

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
