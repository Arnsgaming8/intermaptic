/**
 * Calgary Tower — Calgary, Canada.
 * The flared observation deck on its tapered shaft, flanked by the two oil
 * pumpjacks that stand for Alberta's energy economy, on the prairie with the
 * Rocky Mountain ridge behind. Authored to the MODEL AUTHORING CONTRACT in
 * src/models/index.js: base at local y = 0, ~1.0 unit tall, footprint +/-0.5.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

const CONCRETE = '#c8ccd2'
const CONCRETE_EM = '#6f8fb5'
const PRAIRIE = '#1e3327'
const RUST = '#d98a3c'
const RUST_EM = '#ffb463'
const ROCK = '#55606e'
const SNOW = '#f2fbff'
const GLASS_DARK = '#1b2536'

const RIDGE = [
  { key: 'r0', x: -0.29, z: -0.26, radius: 0.19, height: 0.24 },
  { key: 'r1', x: -0.07, z: -0.32, radius: 0.19, height: 0.34 },
  { key: 'r2', x: 0.15, z: -0.28, radius: 0.17, height: 0.27 },
  { key: 'r3', x: 0.34, z: -0.24, radius: 0.15, height: 0.2 },
]

/** A single walking-beam oil pumpjack — Alberta's most recognisable machine. */
function Pumpjack({ tint, boost }) {
  const rust = (
    <meshStandardMaterial
      color={RUST}
      emissive={RUST_EM}
      emissiveIntensity={0.7 + boost}
      roughness={0.55}
      metalness={0.45}
    />
  )

  return (
    <group>
      {/* concrete pad */}
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.15, 0.03, 0.1]} />
        <meshStandardMaterial
          color="#8f949b"
          emissive={CONCRETE_EM}
          emissiveIntensity={0.2 + boost}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* A-frame legs */}
      <mesh position={[-0.042, 0.105, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.018, 0.17, 0.018]} />
        {rust}
      </mesh>
      <mesh position={[0.042, 0.105, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.018, 0.17, 0.018]} />
        {rust}
      </mesh>

      {/* walking beam */}
      <mesh position={[0.012, 0.2, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.24, 0.022, 0.03]} />
        {rust}
      </mesh>

      {/* horsehead at the working end */}
      <mesh position={[0.118, 0.216, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.028, 0.028, 0.034, 12]} />
        {rust}
      </mesh>

      {/* counterweight at the back end */}
      <mesh position={[-0.09, 0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.026, 12]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={0.55 + boost}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </group>
  )
}

export default function CalgaryTower({ tint = '#ff4d5e', hovered = false }) {
  const boost = hovered ? MATERIAL.hoverEmissiveBoost : 0

  const bandGeo = useMemo(
    () => ({
      deck: new THREE.TorusGeometry(0.093, 0.006, 8, 40),
      collar: new THREE.TorusGeometry(0.062, 0.005, 8, 30),
    }),
    [],
  )

  const concrete = (
    <meshStandardMaterial
      color={CONCRETE}
      emissive={CONCRETE_EM}
      emissiveIntensity={0.42 + boost}
      roughness={0.62}
      metalness={0.22}
    />
  )

  return (
    <group>
      {/* ── prairie ground ───────────────────────────────────────────────── */}
      <mesh position={[0, 0.007, 0]}>
        <boxGeometry args={[1.0, 0.015, 1.0]} />
        <meshStandardMaterial
          color={PRAIRIE}
          emissive="#2f6b45"
          emissiveIntensity={0.28 + boost}
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* ── tower ────────────────────────────────────────────────────────── */}
      <mesh position={[0, 0.016, 0]}>
        <cylinderGeometry args={[0.1, 0.115, 0.032, 26]} />
        <meshStandardMaterial
          color="#8f98a3"
          emissive={CONCRETE_EM}
          emissiveIntensity={0.25 + boost}
          roughness={0.75}
          metalness={0.18}
        />
      </mesh>

      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.026, 0.042, 0.72, 24]} />
        {concrete}
      </mesh>

      {/* nation-coloured collar near the shaft base */}
      <mesh geometry={bandGeo.collar} position={[0, 0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={0.85 + boost}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* ── the signature flared observation deck ────────────────────────── */}
      <mesh position={[0, 0.6875, 0]}>
        <cylinderGeometry args={[0.075, 0.105, 0.055, 34]} />
        {concrete}
      </mesh>
      <mesh position={[0, 0.735, 0]}>
        <cylinderGeometry args={[0.092, 0.072, 0.05, 34]} />
        <meshStandardMaterial
          color={GLASS_DARK}
          emissive="#14375e"
          emissiveIntensity={0.6 + boost}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0, 0.775, 0]}>
        <cylinderGeometry args={[0.07, 0.092, 0.03, 34]} />
        {concrete}
      </mesh>

      {/* glowing window band around the deck */}
      <mesh geometry={bandGeo.deck} position={[0, 0.735, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={1.5 + boost}
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>

      {/* ── spire ────────────────────────────────────────────────────────── */}
      <mesh position={[0, 0.895, 0]}>
        <cylinderGeometry args={[0.0035, 0.0055, 0.21, 12]} />
        <meshStandardMaterial
          color="#e8eef5"
          emissive="#a9c8e8"
          emissiveIntensity={0.7 + boost}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.012, 14, 12]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={1.9 + boost}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>

      {/* ── energy-industry signal ───────────────────────────────────────── */}
      <group position={[-0.35, 0.015, 0.1]} rotation={[0, 0.35, 0]}>
        <Pumpjack tint={tint} boost={boost} />
      </group>
      <group position={[0.34, 0.015, 0.16]} rotation={[0, -0.55, 0]}>
        <Pumpjack tint={tint} boost={boost} />
      </group>

      {/* ── distant Rocky Mountain ridge ─────────────────────────────────── */}
      {RIDGE.map((peak) => (
        <group key={peak.key} position={[peak.x, 0, peak.z]}>
          <mesh position={[0, peak.height / 2, 0]}>
            <coneGeometry args={[peak.radius, peak.height, 6]} />
            <meshStandardMaterial
              color={ROCK}
              emissive="#2f3d4d"
              emissiveIntensity={0.28 + boost}
              roughness={0.9}
              metalness={0.08}
              flatShading
            />
          </mesh>
          <mesh position={[0, peak.height * 0.72, 0]}>
            <coneGeometry args={[peak.radius * 0.42, peak.height * 0.4, 6]} />
            <meshStandardMaterial
              color={SNOW}
              emissive="#bfe6ff"
              emissiveIntensity={0.7 + boost}
              roughness={0.6}
              metalness={0.1}
              flatShading
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
