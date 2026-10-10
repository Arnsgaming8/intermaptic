import { useAtlas } from '../state/AtlasContext.jsx'
import { KINDS, NATION } from '../lib/theme.js'

const NATION_FILTERS = [
  { id: 'all', label: 'All Stops', accent: '#25d8ff', matches: () => true },
  { id: 'us', label: 'United States', accent: '#3f8bff', matches: (s) => s.country === 'us' },
  { id: 'ca', label: 'Canada', accent: '#ff4d5e', matches: (s) => s.country === 'ca' },
]

const KIND_FILTERS = [
  { id: 'all', label: 'All classes', icon: '◇', tint: '#25d8ff', matches: () => true },
  ...Object.values(KINDS).map((kind) => ({
    id: kind.id,
    label: kind.label,
    icon: kind.icon,
    tint: kind.tint,
    matches: (stop) => stop.kind === kind.id,
  })),
]

const LAYERS = [
  { key: 'showLabels', label: 'Beacon labels' },
  { key: 'showBorder', label: 'Border ribbon' },
  { key: 'showLink', label: 'Comparison link' },
  { key: 'autoRotate', label: 'Orbital rotation' },
]

export default function Hud() {
  const {
    nationFilter,
    selectNation,
    kindFilter,
    selectKind,
    countFor,
    stops,
    visibleStops,
    selectedStop,
    showLabels,
    setShowLabels,
    showBorder,
    setShowBorder,
    showLink,
    setShowLink,
    autoRotate,
    setAutoRotate,
    openCompare,
    openAtlas,
    overlay,
    source,
  } = useAtlas()

  const layerState = { showLabels, showBorder, showLink, autoRotate }
  const layerSetters = {
    showLabels: () => setShowLabels((v) => !v),
    showBorder: () => setShowBorder((v) => !v),
    showLink: () => setShowLink((v) => !v),
    autoRotate: () => setAutoRotate((v) => !v),
  }

  const focused = selectedStop
  const lat = focused ? focused.lat.toFixed(2) : '--.--'
  const lng = focused ? focused.lng.toFixed(2) : '--.--'

  const SOURCE_LABELS = {
    live: 'LIVE API',
    connecting: 'SYNCING',
    waking: 'WAKING',
    bundled: 'LOCAL',
  }
  const sourceLabel = SOURCE_LABELS[source] || 'LOCAL'

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="brand__mark">
            <div className="brand__orbit" />
          </div>
          <div>
            <h1 className="brand__name">INTERMAPTIC</h1>
            <div className="brand__tagline">US // Canada comparative atlas</div>
          </div>
        </div>

        <div className="status-strip panel">
          <div className="status-item">
            <span className="label">Mode</span>
            <span className="status-item__value">{focused ? 'LOCKED' : 'ORBITAL'}</span>
          </div>
          <div className="status-item">
            <span className="label">Latitude</span>
            <span className="status-item__value">{lat}</span>
          </div>
          <div className="status-item">
            <span className="label">Longitude</span>
            <span className="status-item__value">{lng}</span>
          </div>
          <div className="status-item">
            <span className="label">Beacons</span>
            <span className="status-item__value">
              {String(visibleStops.length).padStart(2, '0')}/{String(stops.length).padStart(2, '0')}
            </span>
          </div>
          <div className="status-item">
            <span className="label">Data</span>
            <span className={`status-item__value status-source status-source--${source}`}>{sourceLabel}</span>
          </div>
          <span className={`status-dot ${source === 'live' ? 'is-live' : ''}`} aria-hidden="true" />
        </div>

        <div className="topbar__actions">
          <button
            type="button"
            className={`btn ${overlay === 'atlas' ? 'is-active' : ''}`}
            onClick={openAtlas}
            aria-label="Open the stop directory"
          >
            Directory
          </button>
          <button
            type="button"
            className={`btn ${overlay === 'compare' ? 'is-active' : ''}`}
            onClick={openCompare}
            aria-label="Open the national comparison"
          >
            Compare
          </button>
        </div>
      </header>

      <aside className="left-rail">
        <div className="rail-block panel">
          <h2 className="rail-block__title">Country</h2>
          <div className="filter-stack">
            {NATION_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={[
                  'filter-btn',
                  filter.id !== 'all' ? `filter-btn--${filter.id}` : '',
                  nationFilter === filter.id ? 'is-active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ color: nationFilter === filter.id ? filter.accent : undefined }}
                onClick={() => selectNation(filter.id)}
                aria-pressed={nationFilter === filter.id}
              >
                <span
                  className="filter-btn__swatch"
                  style={{ background: filter.accent, boxShadow: `0 0 10px ${filter.accent}` }}
                  aria-hidden="true"
                />
                {filter.label}
                <span className="filter-btn__count">
                  {String(countFor(filter.matches)).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/*
          Stop classes double as the declutter control. With twenty-three landmarks
          in one continent, narrowing to a single class is how a viewer clears the
          globe without hunting for the filter.
        */}
        <div className="rail-block panel">
          <h2 className="rail-block__title">Stop class</h2>
          <div className="filter-stack">
            {KIND_FILTERS.map((filter) => {
              const active = kindFilter === filter.id
              return (
                <button
                  key={filter.id}
                  type="button"
                  className={`filter-btn filter-btn--kind ${active ? 'is-active' : ''}`}
                  style={{ color: active ? filter.tint : undefined }}
                  onClick={() => selectKind(filter.id)}
                  aria-pressed={active}
                >
                  <span className="filter-btn__icon" style={{ color: filter.tint }} aria-hidden="true">
                    {filter.icon}
                  </span>
                  {filter.label}
                  <span className="filter-btn__count">
                    {String(countFor(filter.matches)).padStart(2, '0')}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rail-block panel">
          <h2 className="rail-block__title">Instrument layers</h2>
          {LAYERS.map((layer) => (
            <button
              key={layer.key}
              type="button"
              className={`toggle-row ${layerState[layer.key] ? 'is-on' : ''}`}
              onClick={layerSetters[layer.key]}
              aria-pressed={layerState[layer.key]}
            >
              {layer.label}
              <span className="toggle-switch" aria-hidden="true">
                <span className="toggle-switch__knob" />
              </span>
            </button>
          ))}
        </div>
      </aside>

      <footer className="ticker panel">
        <span className="ticker__label">
          {focused ? `${NATION[focused.country].code} // ${focused.name}` : 'Standing by'}
        </span>
        <span className="ticker__text">
          {focused
            ? focused.tagline
            : 'Tap any beacon on the globe to open its reading. Drag to orbit, pinch to zoom.'}
        </span>
        <span className="ticker__hint label">{visibleStops.length} beacons in view</span>
      </footer>
    </>
  )
}
