/**
 * Churchill, Manitoba — the polar bear capital of the world, on Hudson Bay.
 *
 * Authored to the MODEL AUTHORING CONTRACT in src/models/index.js:
 * base at local y = 0, local +Y up, ~0.5 unit tall, footprint inside x/z +/-0.5.
 *
 * Four things make Churchill itself, so all four are present and kept visually
 * distinct: the bear, the grain silos it ships through, the train that is the only
 * way in by land, and the rocket range mast on the tundra.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

const SHORE = '#6b6255'
const SHORE_DARK = '#514a40'
const WATER = '#16384f'
const FOAM = '#eaf7ff'
const FUR = '#f2f6fa'
const FUR_EM = '#cfe4ff'
const SILO = '#d7dee6'
const SILO_EM = '#8fb6f0'

/** Land at the back, water at the front, the way the bay actually lies. */
const LAND_TOP = 0.05
const WATER_TOP = 0.03
const SHORE_Z = -0.15
const WATER_Z = 0.19

/** Rocket range mast — the tallest thing in the model, so it sets the height. */
const MAST_BASE = LAND_TOP
const MAST_HEIGHT = 0.44

const SILOS = [
  { key: 'g1', x: -0.062, z: -0.062, r: 0.026, h: 0.2 },
  { key: 'g2', x: -0.008, z: -0.058, r: 0.026, h: 0.17 },
  { key: 'g3', x: 0.046, z: -0.06, r: 0.025, h: 0.185 },
  { key: 'g4', x: -0.058, z: 0.004, r: 0.025, h: 0.15 },
]

const SLEEPERS = Array.from({ length: 7 }, (_, i) => ({ key: `t${i}`, x: -0.02 + i * 0.083 }))

/** 3 stacked stones, the way an inuksuk is built. */
const INUKSUK = [
  { key: 'base', w: 0.05, h: 0.03, d: 0.034, y: 0.015 },
  { key: 'body', w: 0.038, h: 0.04, d: 0.028, y: 0.05 },
  { key: 'arms', w: 0.082, h: 0.014, d: 0.026, y: 0.077 },
  { key: 'head', w: 0.028, h: 0.024, d: 0.024, y: 0.096 },
]

/**
 * The polar bear, built in its own local frame: nose toward +X, feet on y = 0.
 * The parent group rotates and lifts it onto the rock.
 */
function PolarBear({ boost }) {
  const fur = (
    <meshStandardMaterial
      color={FUR}
      emissive={FUR_EM}
      emissiveIntensity={0.85 + boost}
      roughness={0.72}
      metalness={0.05}
    />
  )

  const legs = [
    [0.052, 0.033],
    [0.052, -0.033],
    [-0.052, 0.033],
    [-0.052, -0.033],
  ]

  return (
    <group>
      {/* legs and paws */}
      {legs.map(([x, z]) => (
        <group key={`leg-${x}-${z}`}>
          <mesh position={[x, 0.026, z]}>
            <cylinderGeometry args={[0.013, 0.015, 0.052, 10]} />
            {fur}
          </mesh>
          <mesh position={[x, 0.006, z]}>
            <cylinderGeometry args={[0.017, 0.017, 0.012, 12]} />
            {fur}
          </mesh>
        </group>
      ))}

      {/* body — long and low, the way a bear looks when it walks */}
      <mesh position={[0, 0.1, 0]} scale={[1.9, 1, 1.06]}>
        <sphereGeometry args={[0.052, 18, 14]} />
        {fur}
      </mesh>

      {/* shoulder hump, then the neck out to the head */}
      <mesh position={[0.042, 0.133, 0]}>
        <sphereGeometry args={[0.03, 14, 12]} />
        {fur}
      </mesh>
      <mesh position={[0.085, 0.118, 0]}>
        <sphereGeometry args={[0.03, 14, 12]} />
        {fur}
      </mesh>
      <mesh position={[0.124, 0.114, 0]}>
        <sphereGeometry args={[0.034, 16, 14]} />
        {fur}
      </mesh>

      {/* the long snout that tells a polar bear from any other bear */}
      <mesh position={[0.155, 0.107, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.019, 0.05, 12]} />
        {fur}
      </mesh>
      <mesh position={[0.178, 0.108, 0]}>
        <sphereGeometry args={[0.008, 10, 8]} />
        <meshStandardMaterial color="#2b3138" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* ears and tail */}
      {[0.022, -0.022].map((z) => (
        <mesh key={`ear-${z}`} position={[0.11, 0.141, z]}>
          <sphereGeometry args={[0.011, 10, 8]} />
          <meshStandardMaterial
            color="#dbe7f2"
            emissive={FUR_EM}
            emissiveIntensity={0.5 + boost}
            roughness={0.8}
            metalness={0.04}
          />
        </mesh>
      ))}
      <mesh position={[-0.098, 0.104, 0]} scale={[1.4, 1, 1]}>
        <sphereGeometry args={[0.012, 10, 8]} />
        {fur}
      </mesh>
    </group>
  )
}

export default function Churchill({ tint = '#ff4d5e', hovered = false }) {
  const boost = hovered ? MATERIAL.hoverEmissiveBoost : 0
  const mat = { roughness: MATERIAL.roughness, metalness: MATERIAL.metalness }

  const rockGeo = useMemo(() => new THREE.DodecahedronGeometry(1, 0), [])
  const wheelGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.009, 0.009, 0.007, 10)
    g.rotateX(Math.PI / 2)
    return g
  }, [])
  const capGeo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.025, 0.025, 0.05, 14)
    g.rotateX(Math.PI / 2)
    return g
  }, [])

  return (
    <group>
      {/* ── Hudson Bay shore and the water in front of it ────────────────── */}
      <mesh position={[0, LAND_TOP / 2, SHORE_Z]}>
        <boxGeometry args={[0.9, LAND_TOP, 0.36]} />
        <meshStandardMaterial
          color={SHORE}
          emissive="#2f3a42"
          emissiveIntensity={0.32 + boost}
          roughness={0.97}
          metalness={0.05}
          flatShading
        />
      </mesh>
      <mesh position={[0, WATER_TOP / 2, WATER_Z]}>
        <boxGeometry args={[0.9, WATER_TOP, 0.34]} />
        <meshStandardMaterial
          color={WATER}
          emissive="#2b7fa8"
          emissiveIntensity={0.45 + boost}
          roughness={0.22}
          metalness={0.55}
        />
      </mesh>
      {/* the line of foam where the bay meets the gravel */}
      <mesh position={[0, WATER_TOP + 0.006, 0.035]}>
        <boxGeometry args={[0.9, 0.012, 0.022]} />
        <meshStandardMaterial
          color={FOAM}
          emissive={FOAM}
          emissiveIntensity={1.1 + boost}
          roughness={0.4}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      {/* ── the bear, on its rock, three-quarter profile, head to the water ─ */}
      <mesh
        geometry={rockGeo}
        position={[0, 0.052, 0.02]}
        scale={[0.105, 0.048, 0.092]}
      >
        <meshStandardMaterial
          color={SHORE_DARK}
          emissive="#26313a"
          emissiveIntensity={0.3 + boost}
          roughness={0.96}
          metalness={0.06}
          flatShading
        />
      </mesh>
      <group position={[0, 0.088, 0.02]} rotation={[0, -Math.PI * 0.8, 0]}>
        <PolarBear boost={boost} />
      </group>

      {/* ── the grain terminal: Churchill is a prairie port ──────────────── */}
      <group position={[-0.34, 0, -0.24]}>
        {SILOS.map((silo) => (
          <mesh key={silo.key} position={[silo.x, LAND_TOP + silo.h / 2, silo.z]}>
            <cylinderGeometry args={[silo.r, silo.r, silo.h, 14]} />
            <meshStandardMaterial
              color={SILO}
              emissive={SILO_EM}
              emissiveIntensity={0.4 + boost}
              roughness={0.55}
              metalness={0.35}
            />
          </mesh>
        ))}
        <mesh position={[0.11, LAND_TOP + 0.03, 0.01]}>
          <boxGeometry args={[0.11, 0.06, 0.09]} />
          <meshStandardMaterial
            color="#aab4bd"
            emissive="#5f8fc4"
            emissiveIntensity={0.35 + boost}
            roughness={mat.roughness}
            metalness={mat.metalness}
          />
        </mesh>
      </group>

      {/* ── the train line from Winnipeg, in the marker colour ───────────── */}
      <group position={[0, 0, -0.3]}>
        {SLEEPERS.map((sleeper) => (
          <mesh key={sleeper.key} position={[sleeper.x, 0.052, 0]}>
            <boxGeometry args={[0.03, 0.007, 0.062]} />
            <meshStandardMaterial
              color="#41392f"
              emissive="#2a2a2a"
              emissiveIntensity={0.2 + boost}
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>
        ))}
        {[0.019, -0.019].map((z) => (
          <mesh key={`rail-${z}`} position={[0.23, 0.056, z]}>
            <boxGeometry args={[0.5, 0.005, 0.007]} />
            <meshStandardMaterial
              color="#9fb0c0"
              emissive="#6f8fb5"
              emissiveIntensity={0.5 + boost}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
        ))}

        {/* one boxcar, in `tint` */}
        <mesh position={[0.3, 0.095, 0]}>
          <boxGeometry args={[0.14, 0.05, 0.05]} />
          <meshStandardMaterial
            color={tint}
            emissive={tint}
            emissiveIntensity={0.7 + boost}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
        {[0.07, -0.07].map((dx) => (
          <mesh key={`cap-${dx}`} geometry={capGeo} position={[0.3 + dx, 0.095, 0]}>
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={0.7 + boost}
              roughness={0.5}
              metalness={0.3}
            />
          </mesh>
        ))}
        {[-0.045, -0.015, 0.015, 0.045].map((dx) => (
          <mesh key={`win-${dx}`} position={[0.3 + dx, 0.1, 0.026]}>
            <boxGeometry args={[0.018, 0.016, 0.005]} />
            <meshStandardMaterial
              color="#fff0c8"
              emissive="#ffd9a0"
              emissiveIntensity={1.3 + boost}
              roughness={0.3}
              metalness={0.2}
              toneMapped={false}
            />
          </mesh>
        ))}
        {[0.255, 0.345].map((x) =>
          [0.021, -0.021].map((z) => (
            <mesh key={`wheel-${x}-${z}`} geometry={wheelGeo} position={[x, 0.063, z]}>
              <meshStandardMaterial color="#2a2f36" roughness={0.6} metalness={0.5} />
            </mesh>
          )),
        )}
      </group>

      {/* ── the rocket range mast, in its lattice ───────────────────────── */}
      <group position={[-0.42, 0, 0]}>
        {[
          [0.013, 0.013],
          [0.013, -0.013],
          [-0.013, 0.013],
          [-0.013, -0.013],
        ].map(([x, z]) => (
          <mesh key={`mast-leg-${x}-${z}`} position={[x, MAST_BASE + MAST_HEIGHT / 2, z]}>
            <boxGeometry args={[0.006, MAST_HEIGHT, 0.006]} />
            <meshStandardMaterial
              color="#b9c2cc"
              emissive="#6f8fb5"
              emissiveIntensity={0.4 + boost}
              roughness={0.45}
              metalness={0.7}
            />
          </mesh>
        ))}
        {[0.1, 0.16, 0.22, 0.28, 0.34, 0.4, 0.46].map((y) => (
          <mesh key={`rung-${y}`} position={[0, MAST_BASE + y, 0]}>
            <boxGeometry args={[0.03, 0.004, 0.004]} />
            <meshStandardMaterial
              color="#9fb0c0"
              emissive="#5f8fc4"
              emissiveIntensity={0.35 + boost}
              roughness={0.5}
              metalness={0.6}
            />
          </mesh>
        ))}
        <mesh position={[0, MAST_BASE + MAST_HEIGHT + 0.01, 0]}>
          <sphereGeometry args={[0.01, 10, 8]} />
          <meshStandardMaterial
            color="#ff4d4d"
            emissive="#ff2f2f"
            emissiveIntensity={2.2 + boost}
            roughness={0.4}
            metalness={0.2}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ── a small inuksuk on the gravel ───────────────────────────────── */}
      <group position={[0.3, LAND_TOP, -0.12]} scale={[1, 1.1, 1]}>
        {INUKSUK.map((stone) => (
          <mesh key={stone.key} position={[0, stone.y, 0]}>
            <boxGeometry args={[stone.w, stone.h, stone.d]} />
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={MATERIAL.emissiveIntensity + boost}
              roughness={0.72}
              metalness={0.14}
              flatShading
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
