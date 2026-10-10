import { useMemo } from 'react'
import * as THREE from 'three'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Bay of Fundy, New Brunswick - landscape feature.
 *
 * The highest tides in the world, which is hard to show in a still model, so the
 * water is drawn TWICE: the low tide sheet lying on the mudflat, and a ghosted
 * high-water layer floating well above it. Between the two stand the flowerpot sea
 * stacks of Hopewell Rocks, topped out just below the high-water line, so the scale
 * of the tide reads in a single glance.
 *
 * Deterministic (no Math.random). Authored height ~0.52, footprint within +/-0.7.
 */

const MUD = '#7d5138'
const MUD_GLOW = '#a36a44'
const SANDSTONE = '#b5674a'
const SANDSTONE_SHADE = '#8f4f38'
const WATER = '#16465c'
const WATER_GLOW = '#3f9fd8'
const FOAM = '#e8fbff'
const FOAM_GLOW = '#bff2ff'

/** Low water sheet, and the ghosted high water much further up the beach. */
const LOW_WATER_Y = 0.03
const HIGH_WATER_Y = 0.30
const STACK_BASE = 0.02
const CAP_HEIGHT = 0.035

/** Flowerpot sea stacks: a narrow stalk under a wide flat cap. */
const SEA_STACKS = [
  { key: 's0', x: -0.34, z: -0.06, stalk: 0.26, rTop: 0.017, rBottom: 0.024, cap: 0.056 },
  { key: 's1', x: -0.14, z: 0.05, stalk: 0.2, rTop: 0.016, rBottom: 0.022, cap: 0.048 },
  { key: 's2', x: 0.06, z: -0.1, stalk: 0.28, rTop: 0.019, rBottom: 0.026, cap: 0.058 },
  { key: 's3', x: 0.22, z: 0.03, stalk: 0.17, rTop: 0.015, rBottom: 0.02, cap: 0.044 },
  { key: 's4', x: 0.39, z: -0.05, stalk: 0.23, rTop: 0.017, rBottom: 0.023, cap: 0.05 },
]

/** Thin foam lines left behind on the mudflat as the tide drains away. */
const FOAM_LINES = [
  { x: -0.3, z: 0.2, w: 0.22, d: 0.008 },
  { x: 0.08, z: 0.24, w: 0.3, d: 0.007 },
  { x: 0.34, z: 0.17, w: 0.18, d: 0.009 },
  { x: -0.05, z: 0.1, w: 0.36, d: 0.006 },
]

/** The four edges of the high-water sheet, drawn as glowing lines. */
const HIGH_WATER_RIM = [
  { key: 'front', position: [0, HIGH_WATER_Y, 0.3], args: [0.9, 0.008, 0.012] },
  { key: 'back', position: [0, HIGH_WATER_Y, -0.3], args: [0.9, 0.008, 0.012] },
  { key: 'left', position: [-0.45, HIGH_WATER_Y, 0], args: [0.012, 0.008, 0.6] },
  { key: 'right', position: [0.45, HIGH_WATER_Y, 0], args: [0.012, 0.008, 0.6] },
]

const glow = (hovered) =>
  hovered ? MATERIAL.emissiveIntensity + MATERIAL.hoverEmissiveBoost : MATERIAL.emissiveIntensity

export default function BayOfFundy({ tint = '#ff4d5e', hovered = false }) {
  const intensity = glow(hovered)

  /**
   * The sea stacks need one geometry each (they taper differently), so build the
   * whole set once and reuse it.
   */
  const stacks = useMemo(
    () =>
      SEA_STACKS.map((stack) => ({
        ...stack,
        stalkTop: STACK_BASE + stack.stalk,
        capCentre: STACK_BASE + stack.stalk + CAP_HEIGHT / 2,
      })),
    [],
  )

  return (
    <group>
      {/* ── Red mudflat left bare by the low tide ─────────────────────────── */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.9, 0.02, 0.6]} />
        <meshStandardMaterial
          color={MUD}
          emissive={MUD_GLOW}
          emissiveIntensity={intensity * 0.22}
          roughness={0.95}
          metalness={0.04}
          flatShading
        />
      </mesh>

      {/* ── Low water: a shallow sheet held at the low tide line ──────────── */}
      <mesh position={[0, LOW_WATER_Y, 0.15]}>
        <boxGeometry args={[0.9, 0.02, 0.34]} />
        <meshStandardMaterial
          color={WATER}
          emissive={WATER_GLOW}
          emissiveIntensity={intensity * 0.4}
          roughness={0.25}
          metalness={0.5}
        />
      </mesh>

      {/* Foam lines the draining tide left behind */}
      {FOAM_LINES.map((line) => (
        <mesh key={`foam-${line.x}-${line.z}`} position={[line.x, LOW_WATER_Y + 0.012, line.z]}>
          <boxGeometry args={[line.w, 0.004, line.d]} />
          <meshStandardMaterial
            color={FOAM}
            emissive={FOAM_GLOW}
            emissiveIntensity={hovered ? 1.6 : 1.0}
            roughness={0.4}
            metalness={0}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* ── High water, ghosted in above the beach ────────────────────────── */}
      <mesh position={[0, HIGH_WATER_Y, 0]}>
        <boxGeometry args={[0.9, 0.03, 0.6]} />
        <meshStandardMaterial
          color={WATER_GLOW}
          emissive={WATER_GLOW}
          emissiveIntensity={hovered ? 1.0 : 0.6}
          transparent
          opacity={0.28}
          depthWrite={false}
          roughness={0.2}
          metalness={0.4}
          toneMapped={false}
        />
      </mesh>
      {HIGH_WATER_RIM.map((edge) => (
        <mesh key={edge.key} position={edge.position}>
          <boxGeometry args={edge.args} />
          <meshStandardMaterial
            color={FOAM}
            emissive={FOAM_GLOW}
            emissiveIntensity={hovered ? 1.6 : 1.1}
            transparent
            opacity={0.75}
            depthWrite={false}
            roughness={0.4}
            metalness={0}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* ── Hopewell Rocks: flowerpot sea stacks on the mudflat ───────────── */}
      {stacks.map((stack) => (
        <group key={stack.key} position={[stack.x, 0, stack.z]}>
          <mesh position={[0, (STACK_BASE + stack.stalkTop) / 2, 0]}>
            <cylinderGeometry args={[stack.rTop, stack.rBottom, stack.stalk, 12]} />
            <meshStandardMaterial
              color={SANDSTONE_SHADE}
              emissive={SANDSTONE}
              emissiveIntensity={intensity * 0.35}
              roughness={0.9}
              metalness={0.05}
            />
          </mesh>
          <mesh position={[0, stack.capCentre, 0]}>
            <cylinderGeometry args={[stack.cap, stack.cap * 0.96, CAP_HEIGHT, 14]} />
            <meshStandardMaterial
              color={SANDSTONE}
              emissive={SANDSTONE}
              emissiveIntensity={intensity * 0.5}
              roughness={0.85}
              metalness={0.06}
              flatShading
            />
          </mesh>
        </group>
      ))}

      {/* ── Red cliff wall behind the stacks ──────────────────────────────── */}
      <mesh position={[0, 0.2, -0.34]}>
        <boxGeometry args={[1.15, 0.4, 0.16]} />
        <meshStandardMaterial
          color={SANDSTONE}
          emissive={SANDSTONE_SHADE}
          emissiveIntensity={intensity * 0.3}
          roughness={0.92}
          metalness={0.05}
          flatShading
        />
      </mesh>
      {/* Uneven headland on top, so the skyline is not a flat slab */}
      <mesh position={[-0.18, 0.46, -0.34]}>
        <boxGeometry args={[0.72, 0.12, 0.13]} />
        <meshStandardMaterial
          color={SANDSTONE}
          emissive={SANDSTONE_SHADE}
          emissiveIntensity={intensity * 0.3}
          roughness={0.92}
          metalness={0.05}
          flatShading
        />
      </mesh>
      <mesh position={[0.38, 0.45, -0.34]}>
        <boxGeometry args={[0.3, 0.1, 0.12]} />
        <meshStandardMaterial
          color={SANDSTONE_SHADE}
          emissive={SANDSTONE}
          emissiveIntensity={intensity * 0.3}
          roughness={0.92}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/*
        ── Tidal power marker ────────────────────────────────────────────────
        People have been trying to make electricity from this tide for a century.
        A low barrage across the inlet with a glowing line along its crest.
      */}
      <group position={[-0.28, 0, 0.29]}>
        <mesh position={[0, 0.055, 0]}>
          <boxGeometry args={[0.28, 0.05, 0.09]} />
          <meshStandardMaterial
            color="#3d4550"
            emissive="#1d2530"
            emissiveIntensity={intensity * 0.4}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.084, 0]}>
          <boxGeometry args={[0.28, 0.008, 0.1]} />
          <meshStandardMaterial
            color={tint}
            emissive={tint}
            emissiveIntensity={hovered ? 2.4 : 1.8}
            roughness={0.4}
            metalness={0}
            toneMapped={false}
          />
        </mesh>
        {[-0.08, 0.08].map((x) => (
          <mesh key={`turbine-${x}`} position={[x, 0.105, 0]}>
            <cylinderGeometry args={[0.018, 0.022, 0.05, 10]} />
            <meshStandardMaterial
              color="#4a5560"
              emissive={tint}
              emissiveIntensity={hovered ? 1.5 : 1.0}
              roughness={0.5}
              metalness={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
