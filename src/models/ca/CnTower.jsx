/**
 * CN Tower — Toronto, Canada.
 * Authored to the MODEL AUTHORING CONTRACT in src/models/index.js:
 * base at local y = 0, ~1.0 unit tall, footprint inside x/z +/-0.5.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

const CONCRETE = '#cfd4da'
const CONCRETE_EM = '#6f8fb5'
const WINDOW_GLOW = '#dff4ff'
const GLASS_DARK = '#1b2536'

export default function CnTower({ tint = '#ff4d5e', hovered = false }) {
  const boost = hovered ? MATERIAL.hoverEmissiveBoost : 0

  const bandGeo = useMemo(
    () => ({
      podWindows: new THREE.TorusGeometry(0.114, 0.009, 10, 44),
      skyPod: new THREE.TorusGeometry(0.05, 0.006, 8, 28),
      accent: new THREE.TorusGeometry(0.121, 0.006, 8, 44),
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
      {/* ── plaza / base building ────────────────────────────────────────── */}
      <mesh position={[0, 0.016, 0]}>
        <cylinderGeometry args={[0.1, 0.115, 0.032, 24]} />
        <meshStandardMaterial
          color="#8f98a3"
          emissive={CONCRETE_EM}
          emissiveIntensity={0.25 + boost}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      <mesh position={[-0.13, 0.028, 0.04]}>
        <boxGeometry args={[0.12, 0.056, 0.1]} />
        <meshStandardMaterial
          color={GLASS_DARK}
          emissive={WINDOW_GLOW}
          emissiveIntensity={0.55 + boost}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* ── the tapered concrete shaft ───────────────────────────────────── */}
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.022, 0.055, 0.68, 26]} />
        {concrete}
      </mesh>

      {/* subtle illuminated shaft ribs so the tower reads at distance */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={`rib-${i}`}
          position={[
            Math.sin((i * Math.PI) / 2) * 0.041,
            0.34,
            Math.cos((i * Math.PI) / 2) * 0.041,
          ]}
          rotation={[0, (i * Math.PI) / 2, 0]}
        >
          <boxGeometry args={[0.004, 0.66, 0.004]} />
          <meshStandardMaterial
            color={tint}
            emissive={tint}
            emissiveIntensity={0.5 + boost}
            roughness={0.4}
            metalness={0.4}
          />
        </mesh>
      ))}

      {/* ── main pod: flared skirt, seven-storey ring, cap ───────────────── */}
      <mesh position={[0, 0.586, 0]}>
        <cylinderGeometry args={[0.082, 0.118, 0.032, 34]} />
        <meshStandardMaterial
          color={CONCRETE}
          emissive={CONCRETE_EM}
          emissiveIntensity={0.5 + boost}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      <mesh position={[0, 0.6425, 0]}>
        <cylinderGeometry args={[0.112, 0.112, 0.055, 34]} />
        <meshStandardMaterial
          color={GLASS_DARK}
          emissive="#14375e"
          emissiveIntensity={0.6 + boost}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      <mesh position={[0, 0.679, 0]}>
        <cylinderGeometry args={[0.095, 0.112, 0.018, 34]} />
        <meshStandardMaterial
          color={CONCRETE}
          emissive={CONCRETE_EM}
          emissiveIntensity={0.5 + boost}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* the famous ring of windows */}
      <mesh geometry={bandGeo.podWindows} position={[0, 0.6425, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={WINDOW_GLOW}
          emissive={WINDOW_GLOW}
          emissiveIntensity={1.5 + boost}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>

      {/* nation-coloured accent band under the pod */}
      <mesh geometry={bandGeo.accent} position={[0, 0.572, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={MATERIAL.emissiveIntensity + boost}
          roughness={0.35}
          metalness={0.35}
        />
      </mesh>

      {/* ── SkyPod ──────────────────────────────────────────────────────── */}
      <mesh position={[0, 0.79, 0]}>
        <cylinderGeometry args={[0.048, 0.04, 0.026, 24]} />
        <meshStandardMaterial
          color={GLASS_DARK}
          emissive="#1b4a7a"
          emissiveIntensity={0.7 + boost}
          roughness={0.2}
          metalness={0.65}
        />
      </mesh>
      <mesh geometry={bandGeo.skyPod} position={[0, 0.79, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={1.4 + boost}
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>

      {/* ── antenna mast ────────────────────────────────────────────────── */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.0035, 0.0055, 0.2, 12]} />
        <meshStandardMaterial
          color="#e8eef5"
          emissive="#a9c8e8"
          emissiveIntensity={0.7 + boost}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.013, 14, 12]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={1.9 + boost}
          roughness={0.2}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}
