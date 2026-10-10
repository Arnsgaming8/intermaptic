import { useMemo } from 'react'
import * as THREE from 'three'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Grand Canyon, Arizona - a landscape feature.
 *
 * One displaced PlaneGeometry: a flat rim plateau, a deep and sharply-walled
 * winding gorge, three tributary canyons branching east off the main gorge, two
 * flat-topped mesas, and hard-banded strata colouring.
 *
 * On the globe this model is most often seen from DIRECTLY ABOVE, like a satellite
 * photograph, so the top-down pattern carries the recognition: a narrow dark ribbon
 * of gorge meandering across a flat pale rim, with tributaries joining it. The
 * vertical relief matters at the limb of the globe, where the walls are seen in
 * profile, which is why the drop is deep and the walls steep.
 *
 * Deterministic throughout - no Math.random - so the canyon is identical every load.
 * Authored base-at-y=0, footprint within +/-0.65 in x/z, height clamped to 0.45.
 */
const WIDTH = 1.25
const DEPTH = 0.95

const RIM = 0.36
const FLOOR = 0.05
const DROP = RIM - FLOOR // 0.31
const MAX_Y = 0.45

/** Half-width of the main gorge, and the fraction of that width the wall occupies. */
const GORGE_HALF = 0.2
const WALL_BAND = 0.32
/** Width of the skirt over which the plateau sinks into the globe at the plane border. */
const EDGE_FADE = 0.16

/** Seven hard strata bands, darkest at the gorge floor, palest on the rim. */
const STRATA = [
  '#3f2724',
  '#5c3329',
  '#7a4030',
  '#94553a',
  '#b06a42',
  '#c98253',
  '#dc9a68',
].map((hex) => new THREE.Color(hex))

/** Tributary canyons branching east (+x) off the main gorge. */
const TRIBUTARIES = [
  { z: -0.28, length: 0.44, width: 0.072, drift: 0.11, phase: 0.4 },
  { z: 0.05, length: 0.5, width: 0.078, drift: 0.09, phase: 2.1 },
  { z: 0.32, length: 0.4, width: 0.068, drift: 0.12, phase: 4.3 },
]

/** Flat-topped mesas, both deliberately placed clear of the gorge. */
const MESAS = [
  { x: -0.42, z: 0.18, rx: 0.16, rz: 0.13, lift: 0.07 },
  { x: 0.38, z: -0.2, rx: 0.13, rz: 0.11, lift: 0.06 },
]

const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value)

const smoothstep = (edge0, edge1, x) => {
  const t = clamp01((x - edge0) / (edge1 - edge0 || 1e-6))
  return t * t * (3 - 2 * t)
}

/** Meandering centreline of the main gorge, as a function of z. */
const gorgeX = (z) => 0.3 * Math.sin(z * 3.4) + 0.07 * Math.sin(z * 7.9 + 1.2)

/** One deterministic heightfield evaluation. */
function heightAt(x, z) {
  // A gently rolling rim, so the plateau is not a perfect plane.
  let height =
    RIM + 0.022 * Math.sin(x * 5.3) * Math.cos(z * 4.1) + 0.012 * Math.sin(x * 11.7 + z * 9.3)

  // Main gorge: flat floor, then a steep wall band out to the rim.
  const dx = Math.abs(x - gorgeX(z))
  const across = clamp01(1 - dx / GORGE_HALF)
  let carve = smoothstep(0, WALL_BAND, across)

  // Tributaries, each tapering to nothing at its far end.
  for (let i = 0; i < TRIBUTARIES.length; i += 1) {
    const tributary = TRIBUTARIES[i]
    const start = gorgeX(tributary.z)
    const along = x - start
    if (along <= 0 || along >= tributary.length) continue

    const centre = tributary.z + tributary.drift * Math.sin(along * 9 + tributary.phase)
    const dz = Math.abs(z - centre)
    if (dz >= tributary.width) continue

    const side = smoothstep(0, 0.4, 1 - dz / tributary.width)
    const fade = 1 - along / tributary.length
    carve = Math.max(carve, side * fade * 0.85)
  }

  height -= DROP * carve

  // Mesas rise above the rim with abrupt edges.
  for (let i = 0; i < MESAS.length; i += 1) {
    const mesa = MESAS[i]
    const d = Math.max(Math.abs((x - mesa.x) / mesa.rx), Math.abs((z - mesa.z) / mesa.rz))
    height += mesa.lift * (1 - smoothstep(0.72, 1.0, d))
  }

  // Sink the plateau back into the sphere at the plane's border. Without this the
  // feature reads as a flat rectangular tile floating above the globe; with it the
  // rim slopes down and the canyon blends into the surrounding landmass.
  const edge = Math.min(
    smoothstep(-WIDTH / 2, -WIDTH / 2 + EDGE_FADE, x),
    smoothstep(WIDTH / 2, WIDTH / 2 - EDGE_FADE, x),
    smoothstep(-DEPTH / 2, -DEPTH / 2 + EDGE_FADE, z),
    smoothstep(DEPTH / 2, DEPTH / 2 - EDGE_FADE, z),
  )
  height *= edge

  return THREE.MathUtils.clamp(height, 0, MAX_Y)
}

/** Quantise an elevation into the seven strata bands, softening only the seam. */
function strataColor(height, target) {
  const normalised = clamp01((height - FLOOR) / (MAX_Y - FLOOR))
  const raw = normalised * STRATA.length
  let index = Math.floor(raw)
  if (index >= STRATA.length) index = STRATA.length - 1
  const fraction = raw - index
  const next = STRATA[Math.min(index + 1, STRATA.length - 1)]

  // Only the last 12% of each band blends into the next, so the edges stay crisp.
  target.copy(STRATA[index]).lerp(next, clamp01((fraction - 0.88) / 0.12) * 0.9)

  // A faint layered shading on top of the bands.
  target.multiplyScalar(0.93 + 0.07 * Math.sin(height * 137))
  return target
}

export default function GrandCanyon({ tint = '#3f8bff', hovered = false }) {
  const boost = hovered ? MATERIAL.hoverEmissiveBoost : 0

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(WIDTH, DEPTH, 120, 90)
    // Lay the plane flat; afterwards geometry x is world x and geometry z is world z.
    geo.rotateX(-Math.PI / 2)

    const position = geo.attributes.position
    const colors = new Float32Array(position.count * 3)
    const color = new THREE.Color()

    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i)
      const z = position.getZ(i)
      const height = heightAt(x, z)
      position.setY(i, height)

      strataColor(height, color)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])

  /** Glowing river ribbon running along the gorge floor. */
  const riverGeometry = useMemo(() => {
    const points = []
    const segments = 40
    for (let i = 0; i <= segments; i += 1) {
      const z = -DEPTH / 2 + (DEPTH * i) / segments
      points.push(new THREE.Vector3(gorgeX(z), FLOOR + 0.014, z))
    }
    const curve = new THREE.CatmullRomCurve3(points)
    return new THREE.TubeGeometry(curve, 96, 0.019, 8, false)
  }, [])

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          vertexColors
          flatShading
          roughness={0.92}
          metalness={0.05}
          emissive="#ff7a3c"
          emissiveIntensity={hovered ? 0.5 : 0.28}
        />
      </mesh>

      <mesh geometry={riverGeometry}>
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={MATERIAL.emissiveIntensity * 1.4 + boost}
          roughness={0.2}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
