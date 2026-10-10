import { useMemo } from 'react'
import * as THREE from 'three'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Gros Morne, Newfoundland - landscape feature.
 *
 * The Tablelands are rock from deep inside the Earth that a collision pushed up to
 * the surface, so the model keeps them bare and orange while the green hills behind
 * stay lush - that contrast is what makes Gros Morne look the way it does. Beside
 * them sits a deep fjord with two leaning rock walls and a waterfall.
 *
 * Deterministic (no Math.random). Authored height ~0.94, footprint within +/-0.7.
 */

const TABLELAND = '#c08a52'
const TABLELAND_DARK = '#9a6a3c'
const TABLELAND_GLOW = '#e0a868'
const FJORD_ROCK = '#3d4a48'
const FJORD_ROCK_GLOW = '#5f7a72'
const FJORD_WATER = '#123044'
const WATER_GLOW = '#2f7fa8'
const FALL = '#dff4ff'
const FALL_GLOW = '#a8e4ff'
const HILL = '#3f6b4a'
const HILL_GLOW = '#6fae7c'
const SHORE = '#cfd8d2'

/** The plateau on its wider, darker bench. */
const MESA_X = -0.2
const MESA_Z = 0.02
const MESA_TOP = 0.54
const BENCH_TOP = 0.16

/** Two rock walls that lean toward each other to make the fjord. */
const WALL_HEIGHT = 0.94
const WALL_LEAN = 0.14
const WALLS = [
  { key: 'west', x: 0.18, lean: WALL_LEAN },
  { key: 'east', x: 0.55, lean: -WALL_LEAN },
]

/** Waterline where each wall meets the fjord. */
const SHORELINES = [
  { key: 'west', x: 0.3 },
  { key: 'east', x: 0.43 },
]

const HILLS = [
  { key: 'h0', x: -0.46, z: -0.44, r: 0.2, h: 0.3, seed: 0.4 },
  { key: 'h1', x: -0.04, z: -0.42, r: 0.24, h: 0.36, seed: 2.2 },
  { key: 'h2', x: 0.4, z: -0.46, r: 0.18, h: 0.26, seed: 4.1 },
]

/**
 * A flat-topped mesa. Only x/z are wobbled, so the summit stays dead flat while the
 * rim goes ragged - which is exactly how the Tablelands sit on the skyline.
 */
function buildMesa(radiusTop, radiusBottom, height, segments) {
  const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, 3, false)
  geometry.translate(0, height / 2, 0)

  const position = geometry.attributes.position
  const vertex = new THREE.Vector3()

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i)
    const wobble =
      1 + 0.055 * Math.sin(vertex.y * 29 + vertex.x * 11) + 0.04 * Math.cos(vertex.z * 23)
    position.setXYZ(i, vertex.x * wobble, vertex.y, vertex.z * wobble)
  }

  geometry.computeVertexNormals()
  return geometry
}

/** A rounded green hill: a jagged cone with its tip pressed down. */
function buildHill(radius, height, seed) {
  const geometry = new THREE.ConeGeometry(radius, height, 9, 2, false)
  geometry.translate(0, height / 2, 0)

  const position = geometry.attributes.position
  const vertex = new THREE.Vector3()

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i)
    vertex.x *= 1 + 0.1 * Math.sin(vertex.y * 14 + seed)
    vertex.z *= 1 + 0.1 * Math.cos(vertex.y * 11 + seed * 1.6)
    const shoulder = height * 0.92
    if (vertex.y > shoulder) vertex.y = shoulder + (vertex.y - shoulder) * 0.3
    if (vertex.y < 0) vertex.y = 0
    position.setXYZ(i, vertex.x, vertex.y, vertex.z)
  }

  geometry.computeVertexNormals()
  return geometry
}

const glow = (hovered) =>
  hovered ? MATERIAL.emissiveIntensity + MATERIAL.hoverEmissiveBoost : MATERIAL.emissiveIntensity

export default function GrosMorne({ tint = '#ff4d5e', hovered = false }) {
  const intensity = glow(hovered)
  const mesas = useMemo(
    () => ({
      // Kept inside the +/-0.7 landscape footprint once the vertex wobble widens them.
      bench: buildMesa(0.38, 0.44, BENCH_TOP, 7),
      plateau: buildMesa(0.28, 0.36, MESA_TOP - 0.14, 7),
    }),
    [],
  )
  const hills = useMemo(
    () => HILLS.map((hill) => ({ ...hill, geometry: buildHill(hill.r, hill.h, hill.seed) })),
    [],
  )

  /** Waterfall dropping off the west wall into the fjord. */
  const waterfall = useMemo(() => {
    // Hangs just clear of the leaning west wall and lands in the channel at the bottom.
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.18, 0.9, 0.16),
      new THREE.Vector3(0.23, 0.62, 0.155),
      new THREE.Vector3(0.28, 0.32, 0.15),
      new THREE.Vector3(0.31, 0.04, 0.145),
    ])
    return new THREE.TubeGeometry(curve, 40, 0.009, 6, false)
  }, [])

  return (
    <group>
      {/* ── The Tablelands: a bare orange plateau on a darker bench ───────── */}
      <mesh geometry={mesas.bench} position={[MESA_X, 0, MESA_Z]}>
        <meshStandardMaterial
          color={TABLELAND_DARK}
          emissive={TABLELAND_GLOW}
          emissiveIntensity={intensity * 0.25}
          roughness={0.92}
          metalness={0.06}
          flatShading
        />
      </mesh>
      <mesh geometry={mesas.plateau} position={[MESA_X, 0.14, MESA_Z]}>
        <meshStandardMaterial
          color={TABLELAND}
          emissive={TABLELAND_GLOW}
          emissiveIntensity={intensity * 0.4}
          roughness={0.88}
          metalness={0.06}
          flatShading
        />
      </mesh>

      {/* ── The fjord: two walls leaning apart, dark water in the bottom ──── */}
      {WALLS.map((wall) => (
        <mesh
          key={wall.key}
          position={[wall.x, WALL_HEIGHT / 2, 0]}
          rotation={[0, 0, wall.lean]}
        >
          <boxGeometry args={[0.11, WALL_HEIGHT, 0.74]} />
          <meshStandardMaterial
            color={FJORD_ROCK}
            emissive={FJORD_ROCK_GLOW}
            emissiveIntensity={intensity * 0.28}
            roughness={0.9}
            metalness={0.08}
            flatShading
          />
        </mesh>
      ))}

      <mesh position={[0.365, 0.02, 0]}>
        <boxGeometry args={[0.24, 0.02, 0.72]} />
        <meshStandardMaterial
          color={FJORD_WATER}
          emissive={WATER_GLOW}
          emissiveIntensity={intensity * 0.45}
          roughness={0.22}
          metalness={0.55}
        />
      </mesh>

      {/* Pale line of rock at the waterline, so the fjord reads as wet */}
      {SHORELINES.map((line) => (
        <mesh key={line.key} position={[line.x, 0.035, 0]}>
          <boxGeometry args={[0.014, 0.01, 0.72]} />
          <meshStandardMaterial
            color={SHORE}
            emissive={SHORE}
            emissiveIntensity={hovered ? 1.1 : 0.6}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* ── Waterfall off the west wall ───────────────────────────────────── */}
      <mesh geometry={waterfall}>
        <meshStandardMaterial
          color={FALL}
          emissive={FALL_GLOW}
          emissiveIntensity={hovered ? 2.0 : 1.35}
          roughness={0.35}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* ── Green hills behind, to throw the bare plateau forward ─────────── */}
      {hills.map((hill) => (
        <mesh key={hill.key} geometry={hill.geometry} position={[hill.x, 0, hill.z]}>
          <meshStandardMaterial
            color={HILL}
            emissive={HILL_GLOW}
            emissiveIntensity={intensity * 0.3}
            roughness={0.9}
            metalness={0.05}
            flatShading
          />
        </mesh>
      ))}

      {/*
        ── Lookout on the plateau rim ────────────────────────────────────────
        Hikers walk the Tablelands, so a small platform with a tinted rail marks it.
      */}
      <group position={[-0.02, MESA_TOP, 0.16]}>
        <mesh position={[0, 0.006, 0]}>
          <boxGeometry args={[0.11, 0.012, 0.11]} />
          <meshStandardMaterial
            color="#6b6250"
            emissive="#2a2620"
            emissiveIntensity={intensity * 0.4}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        {[0.055, -0.055].map((z) => (
          <mesh key={`rail-${z}`} position={[0, 0.026, z]}>
            <boxGeometry args={[0.11, 0.006, 0.008]} />
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={hovered ? 2.4 : 1.8}
              roughness={0.4}
              metalness={0}
              toneMapped={false}
            />
          </mesh>
        ))}
        <mesh position={[-0.05, 0.038, 0.055]}>
          <boxGeometry args={[0.01, 0.06, 0.01]} />
          <meshStandardMaterial
            color="#8d8578"
            emissive={tint}
            emissiveIntensity={hovered ? 1.6 : 1.1}
            roughness={0.5}
            metalness={0.35}
          />
        </mesh>
      </group>
    </group>
  )
}
