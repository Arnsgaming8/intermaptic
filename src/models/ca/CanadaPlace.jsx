/**
 * Canada Place — Vancouver, Canada.
 * Five curved white sail roofs on a pier, with the North Shore mountains behind and
 * Burrard Inlet in front.
 *
 * The sails are spaced 0.20 apart while no sail is wider than ~0.16, so they never
 * touch and read as five separate tensioned fabric panels. Authored to the MODEL
 * AUTHORING CONTRACT in src/models/index.js: base at local y = 0, total height 0.62,
 * footprint inside x/z +/-0.5.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

const SAIL = '#f2f6fa'
const SAIL_EM = '#cfe9ff'
const DECK = '#b9c2cc'
const PIER = '#6c7681'
const ROCK = '#5d7285'
const SNOW = '#f2fbff'
const WATER = '#12405c'

/** Deck top: the pier spans y 0 -> 0.03, the deck 0.02 -> 0.06. */
const DECK_TOP = 0.06
const SAIL_Z = -0.04

/**
 * Sail layout: tallest in the middle, falling away to both ends.
 * x spacing is 0.20 and the widest sail spans ~0.16, so every sail is separated
 * from its neighbour by a visible gap of sky.
 */
const SAILS = [
  { key: 's0', x: -0.4, radius: 0.115, height: 0.32, tinted: false },
  { key: 's1', x: -0.2, radius: 0.135, height: 0.46, tinted: false },
  { key: 's2', x: 0, radius: 0.155, height: 0.56, tinted: true },
  { key: 's3', x: 0.2, radius: 0.135, height: 0.46, tinted: false },
  { key: 's4', x: 0.4, radius: 0.115, height: 0.32, tinted: false },
]

/** North Shore mountains, kept low and pushed back so they stay a backdrop. */
const MOUNTAINS = [
  { key: 'm0', x: -0.3, z: -0.34, radius: 0.115, height: 0.26 },
  { key: 'm1', x: -0.1, z: -0.36, radius: 0.13, height: 0.34 },
  { key: 'm2', x: 0.12, z: -0.33, radius: 0.12, height: 0.3 },
  { key: 'm3', x: 0.3, z: -0.3, radius: 0.11, height: 0.22 },
]

/** Sail arc half-width in radians. The fabric spans +/-ARC_HALF around +Z. */
const ARC_HALF = Math.PI * 0.17
/** Where each arc edge lands in x/z, so the masts sit on the fabric's own edges. */
const EDGE_X = Math.sin(ARC_HALF)
const EDGE_Z = Math.cos(ARC_HALF)

/**
 * One curved fabric sail: an open-ended partial cylinder centred on +Z, so the curve
 * bulges toward the viewer exactly like the real tensioned sail roofs. Needs no
 * external geometry. Two thin masts run along its arc edges and help it read as a
 * single separate object.
 */
function Sail({ radius, height, tint, tinted, boost }) {
  const panel = useMemo(
    () =>
      new THREE.CylinderGeometry(
        radius,
        radius,
        height,
        24,
        1,
        true,
        -ARC_HALF,
        ARC_HALF * 2,
      ),
    [radius, height],
  )

  const fabric = tinted ? (
    <meshStandardMaterial
      color={SAIL}
      emissive={tint}
      emissiveIntensity={MATERIAL.emissiveIntensity + boost}
      roughness={0.5}
      metalness={0.12}
      side={THREE.DoubleSide}
    />
  ) : (
    <meshStandardMaterial
      color={SAIL}
      emissive={SAIL_EM}
      emissiveIntensity={0.55 + boost}
      roughness={0.5}
      metalness={0.12}
      side={THREE.DoubleSide}
    />
  )

  const mastColor = tinted ? tint : '#8c98a6'

  return (
    <group rotation={[-0.25, 0, 0]}>
      <mesh geometry={panel} position={[0, height / 2, 0]}>
        {fabric}
      </mesh>

      {[-1, 1].map((side) => (
        <mesh
          key={`mast-${side}`}
          position={[side * EDGE_X * radius, height / 2, EDGE_Z * radius]}
        >
          <cylinderGeometry args={[0.007, 0.009, height, 10]} />
          <meshStandardMaterial
            color={mastColor}
            emissive={tinted ? tint : '#9fc4e2'}
            emissiveIntensity={tinted ? 1.1 + boost : 0.5 + boost}
            roughness={0.45}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function CanadaPlace({ tint = '#ff4d5e', hovered = false }) {
  const boost = hovered ? MATERIAL.hoverEmissiveBoost : 0

  return (
    <group>
      {/* ── Burrard Inlet in front of the pier ───────────────────────────── */}
      <mesh position={[0, 0.008, 0.3]}>
        <boxGeometry args={[0.8, 0.012, 0.28]} />
        <meshStandardMaterial
          color={WATER}
          emissive="#2b7fa8"
          emissiveIntensity={0.45 + boost}
          roughness={0.25}
          metalness={0.55}
        />
      </mesh>

      {/* ── the pier and its deck ────────────────────────────────────────── */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.92, 0.03, 0.26]} />
        <meshStandardMaterial
          color={PIER}
          emissive="#4a6a86"
          emissiveIntensity={0.3 + boost}
          roughness={0.8}
          metalness={0.15}
        />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.86, 0.04, 0.24]} />
        <meshStandardMaterial
          color={DECK}
          emissive="#8fb6d4"
          emissiveIntensity={0.4 + boost}
          roughness={0.55}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* ── the five sails ───────────────────────────────────────────────── */}
      {SAILS.map((sail) => (
        <group key={sail.key} position={[sail.x, DECK_TOP, SAIL_Z]}>
          <Sail
            radius={sail.radius}
            height={sail.height}
            tint={tint}
            tinted={sail.tinted}
            boost={boost}
          />
        </group>
      ))}

      {/* ── North Shore mountains behind ─────────────────────────────────── */}
      {MOUNTAINS.map((peak) => (
        <group key={peak.key} position={[peak.x, 0, peak.z]}>
          <mesh position={[0, peak.height / 2, 0]}>
            <coneGeometry args={[peak.radius, peak.height, 7]} />
            <meshStandardMaterial
              color={ROCK}
              emissive="#2f4a63"
              emissiveIntensity={0.3 + boost}
              roughness={0.9}
              metalness={0.08}
              flatShading
            />
          </mesh>
          <mesh position={[0, peak.height * 0.68, 0]}>
            <coneGeometry args={[peak.radius * 0.44, peak.height * 0.36, 7]} />
            <meshStandardMaterial
              color={SNOW}
              emissive="#bfe6ff"
              emissiveIntensity={0.75 + boost}
              roughness={0.6}
              metalness={0.1}
              flatShading
            />
          </mesh>
        </group>
      ))}

      {/* ── a tiny cruise ship alongside, so the pier has a purpose ──────── */}
      <group position={[0.02, 0.016, 0.3]}>
        <mesh>
          <boxGeometry args={[0.26, 0.03, 0.07]} />
          <meshStandardMaterial
            color="#e6ecf2"
            emissive="#a8cbe8"
            emissiveIntensity={0.5 + boost}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
        <mesh position={[-0.13, 0.02, 0]}>
          <boxGeometry args={[0.04, 0.03, 0.055]} />
          <meshStandardMaterial
            color="#c9d4de"
            emissive="#9fc4e2"
            emissiveIntensity={0.4 + boost}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      </group>
    </group>
  )
}
