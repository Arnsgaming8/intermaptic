import { useAtlas } from '../state/AtlasContext.jsx'

/** Cold-open splash. Frames the brief, then hands the viewer the globe. */
export default function Intro({ open, onDismiss }) {
  const { openCompare, openAtlas, select } = useAtlas()

  if (!open) return null

  return (
    <div className="intro" role="dialog" aria-modal="true" aria-label="Intermaptic introduction">
      <div className="intro__inner">
        <p className="intro__kicker">Comparative atlas · North America</p>
        <h2 className="intro__title">INTERMAPTIC</h2>
        <p className="intro__subtitle">Designed By Arnav Jugessur</p>
        <p className="intro__license">CC BY-NC 4.0</p>
        <p className="intro__text">
          A holographic Earth that puts the United States and Canada side by side. Twenty-three
          landmarks are pinned to the globe. They include capitals, cultural hubs, business centres
          and natural features, plus the border itself. Each one has its geography, culture,
          government and economy written down.
        </p>

        <div className="intro__legend">
          <span className="intro__legend-item" style={{ color: '#3f8bff' }}>
            <span className="intro__legend-swatch" />
            United States
          </span>
          <span className="intro__legend-item" style={{ color: '#ff4d5e' }}>
            <span className="intro__legend-swatch" />
            Canada
          </span>
          <span className="intro__legend-item" style={{ color: '#ffb545' }}>
            <span className="intro__legend-swatch" />
            Shared border
          </span>
        </div>

        <div className="intro__actions">
          <button type="button" className="btn is-active" onClick={onDismiss}>
            Enter orbit
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              select('washington-dc')
              onDismiss()
            }}
          >
            Start at Washington
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              openCompare()
              onDismiss()
            }}
          >
            National readout
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              openAtlas()
              onDismiss()
            }}
          >
            Directory
          </button>
        </div>

        <div className="intro__progress" aria-hidden="true">
          <div className="intro__progress-bar" />
        </div>
      </div>
    </div>
  )
}
