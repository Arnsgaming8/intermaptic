import { useMemo } from 'react'
import * as THREE from 'three'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Denali, Alaska - the highest peak in North America.
 *
 * A glaciated rock massif with a wobbled snow line, a glacier running down the south
 * face and aurora ribbons across the sky above it, so the model reads as the far
 * north rather than as a generic cone.
 *
 * The central summit is authored at exactly 0.92, matching MODEL_AUTHORED_HEIGHT in
 * src/models/index.js (which is what the beacon label lift is measured against).
 * Authored base-at-y=0, footprint within +/-0.45.
 */

const glow = (hovered, factor = 1) =>
  (MATERIAL.emissiveIntensity + (hovered ? MATERIAL.hoverEmissiveBoost : 0)) * factor

const SUMMIT_H = 0.92
const SUMMIT_R = 0.26

const ROCK = '#6b6f78'
const ROCK_LIGHT = '#8b9099'
const SNOW = '#f4fbff'

const AURORA_GREEN = '#4dffb8'
const AURORA_VIOLET = '#a97dff'

const smoothstep = (edge0, edge1, x) => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0 || 1e-6), 0), 1)
  return t * t * (3 - 2 * t)
}

/**
 * Flanking summits that make the massif around the main peak.
 * Positions and radii are chosen so that even after the vertex jitter widens a cone
 * by up to 15%, the outermost vertex stays inside the +/-0.45 footprint.
 */
const FLANKS = [
  { id: 'north-west', x: -0.26, z: -0.1, radius: 0.16, height: 0.55, seed: 3.1, segments: 7 },
  { id: 'north-east', x: 0.25, z: -0.14, radius: 0.14, height: 0.44, seed: 7.4, segments: 6 },
]

/** Aurora arcs sweeping the sky above the summit. */
const AURORA = [
  { id: 'a0', radius: 0.36, tube: 0.011, arc: 2.1, tilt: 0.34, spin: 0.35, y: 0.74, opacity: 0.5, colour: AURORA_GREEN },
  { id: 'a1', radius: 0.3, tube: 0.009, arc: 1.7, tilt: 0.46, spin: -0.5, y: 0.8, opacity: 0.42, colour: AURORA_VIOLET },
  { id: 'a2', radius: 0.24, tube: 0.008, arc: 1.35, tilt: 0.28, spin: 1.1, y: 0.64, opacity: 0.38, colour: null },
]

/**
 * Deterministic craggy peak.
 *
 * The jitter is a pure function of vertex position (no Math.random anywhere) and is
 * weighted by t * (1 - t), so the base ring stays exactly on y = 0 and the apex stays
 * a single point - which is what keeps the authored height exact.
 */
function makePeak(radius, height, seed, segments) {
  const geo = new THREE.ConeGeometry(radius, height, segments, 6)
  geo.translate(0, height / 2, 0)

  const position = geo.attributes.position
  const colours = new Float32Array(position.count * 3)
  const rock = new THREE.Color(ROCK)
  const rockLight = new THREE.Color(ROCK_LIGHT)
  const snow = new THREE.Color(SNOW)
  const mixed = new THREE.Color()

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i)
    const y = position.getY(i)
    const z = position.getZ(i)
    const t = Math.min(Math.max(y / height, 0), 1)

    // Push the flanks in and out so the cone becomes a craggy face.
    const widen = 1 + 0.15 * Math.sin(y * 12 + seed) * Math.cos(x * 14 + z * 10 + seed)
    const nx = x * widen
    const nz = z * widen
    const ny = y + 0.028 * Math.sin(x * 22 + z * 18 + seed) * t * (1 - t) * 4

    position.setX(i, nx)
    position.setY(i, ny)
    position.setZ(i, nz)

    // Snow line, wobbled so it does not read as a painted-on band.
    const snowAmt = smoothstep(0.58, 0.7, t + 0.07 * Math.sin(nx * 17 + nz * 13 + seed))
    mixed.copy(rock).lerp(rockLight, 0.5 + 0.5 * Math.sin(ny * 9 + seed))
    mixed.lerp(snow, snowAmt)

    colours[i * 3] = mixed.r
    colours[i * 3 + 1] = mixed.g
    colours[i * 3 + 2] = mixed.b
  }

  geo.setAttribute('color', new THREE.BufferAttribute(colours, 3))
  geo.computeVertexNormals()
  return geo
}

/** Glacier tongue running down the south (+Z) face of the summit. */
function makeGlacier() {
  const points = [
    new THREE.Vector3(0, 0.78, 0.052),
    new THREE.Vector3(0.012, 0.6, 0.102),
    new THREE.Vector3(0.006, 0.4, 0.158),
    new THREE.Vector3(-0.012, 0.2, 0.214),
    new THREE.Vector3(-0.024, 0.05, 0.256),
  ]
  const curve = new THREE.CatmullRomCurve3(points)
  return new THREE.TubeGeometry(curve, 44, 0.019, 6, false)
}

export default function Denali({ tint = '#3f8bff', hovered = false }) {
  const summit = useMemo(() => makePeak(SUMMIT_R, SUMMIT_H, 1.7, 8), [])
  const flanks = useMemo(
    () => FLANKS.map((flank) => makePeak(flank.radius, flank.height, flank.seed, flank.segments)),
    [],
  )
  const glacier = useMemo(makeGlacier, [])

  const ice = {
    vertexColors: true,
    flatShading: true,
    roughness: 0.86,
    metalness: 0.06,
    emissive: '#bfe6ff',
    emissiveIntensity: glow(hovered, 0.3),
  }

  return (
    <group>
      {/* snowfield the massif stands on */}
      <mesh position={[0, 0.016, 0]}>
        <cylinderGeometry args={[0.38, 0.4, 0.032, 16]} />
        <meshStandardMaterial
          color="#dfeef8"
          emissive="#bfe6ff"
          emissiveIntensity={glow(hovered, 0.28)}
          roughness={0.8}
          metalness={0.06}
          flatShading
        />
      </mesh>

      {/* flanking summits, set back so the main peak dominates */}
      {FLANKS.map((flank, i) => (
        <mesh key={flank.id} geometry={flanks[i]} position={[flank.x, 0, flank.z]}>
          <meshStandardMaterial {...ice} />
        </mesh>
      ))}

      {/* the main summit */}
      <mesh geometry={summit}>
        <meshStandardMaterial {...ice} emissiveIntensity={glow(hovered, 0.34)} />
      </mesh>

      {/* glacier tongue */}
      <mesh geometry={glacier}>
        <meshStandardMaterial
          color="#cfefff"
          emissive="#cfefff"
          emissiveIntensity={glow(hovered, 1.5)}
          roughness={0.25}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* aurora ribbons. The last one carries the nation tint. */}
      {AURORA.map((band) => (
        <mesh
          key={band.id}
          position={[0, band.y, -0.02]}
          rotation={[Math.PI / 2 - band.tilt, 0, band.spin]}
        >
          <torusGeometry args={[band.radius, band.tube, 6, 40, band.arc]} />
          <meshStandardMaterial
            color={band.colour || tint}
            emissive={band.colour || tint}
            emissiveIntensity={glow(hovered, 1.8)}
            transparent
            opacity={band.opacity}
            depthWrite={false}
            roughness={0.4}
            metalness={0}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
