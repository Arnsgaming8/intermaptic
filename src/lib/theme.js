/**
 * Intermaptic design tokens.
 * The whole app reads colour from here so the 3D scene and the 2D HUD stay in sync.
 */

/** Core hull + HUD colours (Star Wars / Star Trek bridge palette). */
export const PALETTE = {
  void: '#02060f',
  deep: '#040b18',
  hull: '#071426',
  panel: 'rgba(6, 18, 34, 0.82)',
  panelSolid: '#061222',
  line: '#25d8ff',
  lineSoft: 'rgba(37, 216, 255, 0.32)',
  text: '#d8f4ff',
  textDim: '#7fa8c4',
  amber: '#ffb545',
  danger: '#ff5a6e',
  green: '#4dffb8',
}

/**
 * Nation identity. Every stop, marker, beam, label and panel is tinted from here.
 * `base` is the material colour, `glow` the emissive colour, `dim` the shadow tone.
 */
export const NATION = {
  us: {
    id: 'us',
    label: 'United States of America',
    short: 'USA',
    code: 'US',
    base: '#3f8bff',
    glow: '#b6d6ff',
    dim: '#16305e',
  },
  ca: {
    id: 'ca',
    label: 'Canada',
    short: 'CAN',
    code: 'CA',
    base: '#ff4d5e',
    glow: '#ffc0c7',
    dim: '#5c1a24',
  },
  shared: {
    id: 'shared',
    label: 'US–Canada Border',
    short: 'BORDER',
    code: 'INT',
    base: '#ffb545',
    glow: '#ffe3b0',
    dim: '#5e4315',
  },
}

/** Ordered list used by legends and filters. */
export const NATION_ORDER = ['us', 'ca', 'shared']

export const nationOf = (id) => NATION[id] || NATION.us

/** Category metadata for the 15 stops. */
export const KINDS = {
  capital: { id: 'capital', label: 'Capital City', icon: '★', tint: '#ffe9a8' },
  culture: { id: 'culture', label: 'Cultural Hub', icon: '✦', tint: '#e0b8ff' },
  economy: { id: 'economy', label: 'Economic Center', icon: '◆', tint: '#8ff5c8' },
  geography: { id: 'geography', label: 'Geographic Feature', icon: '▲', tint: '#ffc59a' },
  border: { id: 'border', label: 'Border Feature', icon: '⇄', tint: '#ffb545' },
}

/**
 * Scene geometry tuning.
 * `scale` converts a model's internal unit-height into world units.
 * All landmark models are authored so their base sits at local y = 0 and their
 * total height is ~1.0 unit, so they can simply be scaled + oriented onto the globe.
 */
export const MODEL_TUNING = {
  // The atlas now carries twenty-three landmarks inside one continent, so each one is
  // authored smaller than it used to be. A crowded globe reads as noise; smaller
  // models plus the stop-class filter keep any one landmark legible.
  scale: 0.33,
  landscapeScale: 0.24,
  /** Scale multiplier applied to the un-focused landmarks while one is selected. */
  dimmedScale: 0.7,
  lift: 0.012,
  /**
   * Distance reveal, the main defence against a cluttered globe.
   *
   * Twenty-three landmarks all sit inside one continent, and cities on the eastern
   * seaboard are only a few hundred miles apart - on a globe of this radius
   * that is a fraction of a model's own width, so drawn at full size the wide view
   * collapses into one pile. Instead the field is drawn small at full-globe range
   * (`farScale`) and eased up to full size as the camera comes in, reaching 1.0 at
   * `closeDistance`, which is where the camera parks when a stop is focused. The
   * wide view stays readable and the close view keeps every detail.
   */
  farScale: 0.45,
  globeDistance: 8.0,
  closeDistance: 4.6,
  /** How far above the surface the label/beacon ring floats. */
  beaconLift: 0.05,
}

/** Globe geometry. */
export const GLOBE_TUNING = {
  radius: 2.4,
  segments: 128,
  /**
   * Zoom range: from the surface of the globe out to the whole planet in frame.
   *
   * `minZoomDistance` is how close the eye may come to the planet: the globe's own
   * `radius` plus the camera's near plane (0.1, set in Scene.jsx), which is as close
   * as the camera can sit while the shell underfoot still renders. Going right down
   * to bare `radius` would put the near plane through the shell and leave a hole in
   * the foreground.
   *
   * It is measured from the globe's CENTRE, not from the camera's look-at target.
   * OrbitControls would measure it from the target, and the target stands on the
   * surface whenever a stop is focused - which dead-ended the zoom the moment a
   * reading was open, because the camera already parked at that limit. CameraRig
   * holds the camera to this altitude instead, so the zoom runs down to the ground
   * in both states.
   */
  minZoomDistance: 2.5,
  maxZoomDistance: 12,
  /** Distance the camera parks at when a stop is focused. */
  focusDistance: 4.35,
}

/** Shared emissive recipe so every landmark pops against the dark globe. */
export const MATERIAL = {
  roughness: 0.32,
  metalness: 0.28,
  emissiveIntensity: 0.95,
  hoverEmissiveBoost: 0.6,
}
