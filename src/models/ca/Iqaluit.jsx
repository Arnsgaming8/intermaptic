/**
 * Iqaluit, Nunavut — the Arctic capital, on Baffin Island.
 *
 * Authored to the MODEL AUTHORING CONTRACT in src/models/index.js:
 * base at local y = 0, local +Y up, ~0.6 unit tall, footprint inside x/z +/-0.5.
 *
 * The town is deliberately scattered rather than gridded, because Arctic
 * settlements are. What says "far north" more than any building is the pair of
 * aurora ribbons arcing over the roofs, so those carry the model's height.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

const ROCK = '#6e7075'
const ROCK_DARK = '#565962'
const SNOW = '#f2fbff'
const GLASS = '#0d1728'
const GLASS_EM = '#4d9fd6'
const LEGIS = '#c8d2dc'
const AURORA_GREEN = '#4dffb8'
const AURORA_VIOLET = '#a97dff'

/** Top of the rocky pad everything stands on. */
const GROUND = 0.04

/** Square-based pyramidal roof whose base sits at local y = 0. */
function roofGeometry(width, height) {
  const g = new THREE.ConeGeometry(width * 0.72, height, 4)
  g.rotateY(Math.PI / 4)
  g.translate(0, height / 2, 0)
  return g
}

/**
 * Arctic towns are painted in bright colours on purpose — so they can be found in
 * a blizzard. These are scattered unevenly, not laid out on a grid.
 */
const HOUSES = [
  { key: 'h1', x: -0.33, z: 0.15, w: 0.075, h: 0.058, d: 0.066, color: '#eef3f8' },
  { key: 'h2', x: -0.21, z: 0.25, w: 0.058, h: 0.046, d: 0.052, color: '#3f8bff' },
  { key: 'h3', x: 0.3, z: 0.17, w: 0.08, h: 0.064, d: 0.07, color: '#ffb545' },
  { key: 'h4', x: 0.35, z: -0.05, w: 0.064, h: 0.05, d: 0.058, color: '#e0575f' },
  { key: 'h5', x: -0.31, z: -0.17, w: 0.07, h: 0.054, d: 0.062, color: '#eef3f8' },
  { key: 'h6', x: 0.19, z: 0.28, w: 0.06, h: 0.048, d: 0.054, color: '#8fb6f0' },
]

const BOULDERS = [
  { key: 'b1', x: -0.14, z: -0.25, r: 0.05 },
  { key: 'b2', x: 0.06, z: 0.3, r: 0.038 },
  { key: 'b3', x: 0.4, z: 0.29, r: 0.033 },
  { key: 'b4', x: -0.4, z: 0.02, r: 0.044 },
]

const SNOW_PATCHES = [
  { key: 's1', x: 0.1, z: -0.27, w: 0.16, d: 0.1, rot: 0.4 },
  { key: 's2', x: -0.26, z: 0.05, w: 0.12, d: 0.09, rot: -0.7 },
  { key: 's3', x: 0.28, z: 0.02, w: 0.1, d: 0.12, rot: 0.9 },
]

/** The inuksuk: the stone figure that marks the way across the tundra. */
const INUKSUK = [
  { key: 'leg-a', w: 0.024, h: 0.03, d: 0.05, y: 0.015, x: -0.016 },
  { key: 'leg-b', w: 0.024, h: 0.03, d: 0.05, y: 0.015, x: 0.016 },
  { key: 'body', w: 0.052, h: 0.046, d: 0.032, y: 0.053, x: 0 },
  { key: 'arms', w: 0.1, h: 0.016, d: 0.03, y: 0.082, x: 0 },
  { key: 'head', w: 0.034, h: 0.028, d: 0.026, y: 0.106, x: 0 },
]

export default function Iqaluit({ tint = '#ff4d5e', hovered = false }) {
  const boost = hovered ? MATERIAL.hoverEmissiveBoost : 0
  const mat = { roughness: MATERIAL.roughness, metalness: MATERIAL.metalness }

  /**
   * The legislative building's swooping roof, as a shallow arch.
   * A partial cylinder rotated so its axis runs along z gives an arch in the x/y
   * plane. With thetaStart 0.65pi and a 0.7pi span, the arc lands at
   * x = +/-0.891r and rises from y = 0.454r up to y = r, which is the shallow
   * profile the real building is known for.
   */
  const archRoof = useMemo(() => {
    const g = new THREE.CylinderGeometry(
      0.165,
      0.165,
      0.185,
      26,
      1,
      true,
      Math.PI * 0.65,
      Math.PI * 0.7,
    )
    g.rotateX(Math.PI / 2)
    return g
  }, [])

  const houseRoofs = useMemo(
    () => HOUSES.map((house) => roofGeometry(house.w, Math.max(house.w * 0.6, 0.03))),
    [],
  )

  const boulderGeo = useMemo(() => new THREE.DodecahedronGeometry(1, 0), [])

  // Aurora ribbons: torus arcs, rotated so each arc is centred on the top.
  const auroraGreen = useMemo(
    () => new THREE.TorusGeometry(0.3, 0.0065, 8, 64, Math.PI * 0.9),
    [],
  )
  const auroraViolet = useMemo(
    () => new THREE.TorusGeometry(0.255, 0.0055, 8, 64, Math.PI * 0.7),
    [],
  )

  return (
    <group>
      {/* ── the rocky pad the town is built on ──────────────────────────── */}
      <mesh position={[0, GROUND / 2, 0]}>
        <boxGeometry args={[0.9, GROUND, 0.7]} />
        <meshStandardMaterial
          color={ROCK}
          emissive="#2b3d4e"
          emissiveIntensity={0.35 + boost}
          roughness={0.95}
          metalness={0.06}
          flatShading
        />
      </mesh>

      {/* boulders and patches of old snow */}
      {BOULDERS.map((boulder) => (
        <mesh
          key={boulder.key}
          geometry={boulderGeo}
          position={[boulder.x, GROUND + boulder.r * 0.35, boulder.z]}
          scale={[boulder.r, boulder.r * 0.55, boulder.r * 0.85]}
        >
          <meshStandardMaterial
            color={ROCK_DARK}
            emissive="#233240"
            emissiveIntensity={0.25 + boost}
            roughness={0.98}
            metalness={0.04}
            flatShading
          />
        </mesh>
      ))}
      {SNOW_PATCHES.map((patch) => (
        <mesh
          key={patch.key}
          position={[patch.x, GROUND + 0.004, patch.z]}
          rotation={[0, patch.rot, 0]}
        >
          <boxGeometry args={[patch.w, 0.006, patch.d]} />
          <meshStandardMaterial
            color={SNOW}
            emissive="#bfe6ff"
            emissiveIntensity={0.5 + boost}
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* ── the Legislative Building of Nunavut ────────────────────────── */}
      <group position={[-0.02, 0, -0.02]}>
        <mesh position={[0, GROUND + 0.05, 0]}>
          <boxGeometry args={[0.3, 0.1, 0.18]} />
          <meshStandardMaterial
            color={LEGIS}
            emissive="#5f8fc4"
            emissiveIntensity={0.4 + boost}
            roughness={mat.roughness}
            metalness={mat.metalness}
          />
        </mesh>

        {/* the great arched roof — position chosen so the arch springs exactly
            from the top of the wall (0.14) up to an apex at 0.23 */}
        <mesh geometry={archRoof} position={[0, 0.065, 0]}>
          <meshStandardMaterial
            color={LEGIS}
            emissive="#7fb4e0"
            emissiveIntensity={0.5 + boost}
            roughness={0.45}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* a bright band of windows along the front */}
        <mesh position={[0, GROUND + 0.062, 0.092]}>
          <boxGeometry args={[0.24, 0.04, 0.008]} />
          <meshStandardMaterial
            color={GLASS}
            emissive={GLASS_EM}
            emissiveIntensity={1.5 + boost}
            roughness={0.2}
            metalness={0.45}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ── the houses, in their bright Arctic paint ────────────────────── */}
      {HOUSES.map((house, index) => (
        <group key={house.key}>
          <mesh position={[house.x, GROUND + house.h / 2, house.z]}>
            <boxGeometry args={[house.w, house.h, house.d]} />
            <meshStandardMaterial
              color={house.color}
              emissive={house.color}
              emissiveIntensity={0.45 + boost}
              roughness={mat.roughness}
              metalness={mat.metalness}
            />
          </mesh>
          <mesh
            geometry={houseRoofs[index]}
            position={[house.x, GROUND + house.h, house.z]}
            scale={[1, 1, house.d / house.w]}
          >
            <meshStandardMaterial
              color="#4a5568"
              emissive="#2f4a68"
              emissiveIntensity={0.4 + boost}
              roughness={0.6}
              metalness={0.3}
              flatShading
            />
          </mesh>
        </group>
      ))}

      {/* ── the inuksuk, in the marker colour ───────────────────────────── */}
      <group position={[0.16, GROUND, -0.24]} scale={[1, 1.05, 1]}>
        {INUKSUK.map((stone) => (
          <mesh key={stone.key} position={[stone.x, stone.y, 0]}>
            <boxGeometry args={[stone.w, stone.h, stone.d]} />
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={MATERIAL.emissiveIntensity + boost}
              roughness={0.7}
              metalness={0.15}
              flatShading
            />
          </mesh>
        ))}
      </group>

      {/* ── aurora arcing over the roofs ────────────────────────────────── */}
      <group position={[0, 0.3, -0.04]} rotation={[-0.34, 0.18, 0]}>
        <mesh geometry={auroraGreen} rotation={[0, 0, Math.PI / 2 - Math.PI * 0.45]}>
          <meshBasicMaterial
            color={AURORA_GREEN}
            transparent
            opacity={0.5 + boost * 0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
      <group position={[0.04, 0.29, 0.06]} rotation={[-0.2, -0.3, 0]}>
        <mesh geometry={auroraViolet} rotation={[0, 0, Math.PI / 2 - Math.PI * 0.35]}>
          <meshBasicMaterial
            color={AURORA_VIOLET}
            transparent
            opacity={0.4 + boost * 0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  )
}
