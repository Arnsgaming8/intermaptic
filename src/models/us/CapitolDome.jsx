import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

/**
 * United States Capitol, Washington D.C.
 * Neoclassical massing: a long central block flanked by two domed wings, crowned by
 * the cast-iron dome, lantern and the Statue of Freedom.
 * Authored base-at-y=0, total height ~0.97, footprint within +/-0.5.
 */

/** Root scale lifts the authored massing to ~1.0 unit of height. */
const S = 1.4

const glow = (hovered, factor = 1) =>
  (MATERIAL.emissiveIntensity + (hovered ? MATERIAL.hoverEmissiveBoost : 0)) * factor

export default function CapitolDome({ tint = '#3f8bff', hovered = false }) {
  /** Colonnade around the drum. */
  const columns = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return [Math.cos(a) * 0.187, 0.215, Math.sin(a) * 0.187]
      }),
    [],
  )

  /** Lit windows along the front of the central block. */
  const windows = useMemo(
    () => Array.from({ length: 11 }, (_, i) => -0.25 + i * 0.05),
    [],
  )

  return (
    <group scale={S}>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.7, 0.03, 0.3]} />
        <meshStandardMaterial
          color="#dde6f0"
          emissive="#9fc4ff"
          emissiveIntensity={glow(hovered, 0.45)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Access steps on the east front */}
      <mesh position={[0, 0.018, 0.172]}>
        <boxGeometry args={[0.36, 0.012, 0.05]} />
        <meshStandardMaterial
          color="#cfd9e6"
          emissive="#8fb6f0"
          emissiveIntensity={glow(hovered, 0.35)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, 0.006, 0.203]}>
        <boxGeometry args={[0.32, 0.012, 0.05]} />
        <meshStandardMaterial
          color="#c6d2e0"
          emissive="#8fb6f0"
          emissiveIntensity={glow(hovered, 0.3)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Central block */}
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[0.66, 0.12, 0.26]} />
        <meshStandardMaterial
          color="#eef3f8"
          emissive="#9fc4ff"
          emissiveIntensity={glow(hovered, 0.5)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Flat roof / drum plinth */}
      <mesh position={[0, 0.156, 0]}>
        <boxGeometry args={[0.66, 0.012, 0.26]} />
        <meshStandardMaterial
          color="#dbe4ef"
          emissive="#8fb6f0"
          emissiveIntensity={glow(hovered, 0.35)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Side wings */}
      {[-1, 1].map((dir) => (
        <group key={dir} position={[dir * 0.3, 0, 0]}>
          <mesh position={[0, 0.085, 0]}>
            <boxGeometry args={[0.16, 0.11, 0.22]} />
            <meshStandardMaterial
              color="#eef3f8"
              emissive="#9fc4ff"
              emissiveIntensity={glow(hovered, 0.5)}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <sphereGeometry args={[0.05, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial
              color="#f6f9fd"
              emissive="#bcd8ff"
              emissiveIntensity={glow(hovered, 0.7)}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
        </group>
      ))}

      {/* Drum */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.14, 32]} />
        <meshStandardMaterial
          color="#eef3f8"
          emissive="#9fc4ff"
          emissiveIntensity={glow(hovered, 0.5)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Colonnade */}
      {columns.map((p, i) => (
        <mesh key={i} position={p}>
          <cylinderGeometry args={[0.012, 0.012, 0.13, 10]} />
          <meshStandardMaterial
            color="#e3eaf2"
            emissive="#9fc4ff"
            emissiveIntensity={glow(hovered, 0.55)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}

      {/* Drum cornice */}
      <mesh position={[0, 0.29, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.163, 0.009, 8, 40]} />
        <meshStandardMaterial
          color="#cfdaea"
          emissive="#9fc4ff"
          emissiveIntensity={glow(hovered, 0.6)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Dome */}
      <mesh position={[0, 0.29, 0]}>
        <sphereGeometry args={[0.16, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#f6f9fd"
          emissive="#bcd8ff"
          emissiveIntensity={glow(hovered, 0.85)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Lantern */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.06, 20]} />
        <meshStandardMaterial
          color="#eef3f8"
          emissive="#cfe4ff"
          emissiveIntensity={glow(hovered, 0.9)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, 0.535, 0]}>
        <coneGeometry args={[0.052, 0.05, 12]} />
        <meshStandardMaterial
          color="#e6eef8"
          emissive="#cfe4ff"
          emissiveIntensity={glow(hovered, 0.9)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Statue of Freedom - the nation-tinted accent */}
      <mesh position={[0, 0.61, 0]}>
        <cylinderGeometry args={[0.008, 0.016, 0.1, 8]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={glow(hovered, 1.7)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, 0.672, 0]}>
        <sphereGeometry args={[0.018, 14, 10]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={glow(hovered, 1.7)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Lit windows across the front elevation */}
      {windows.map((x, i) => (
        <mesh key={i} position={[x, 0.09, 0.132]}>
          <boxGeometry args={[0.018, 0.032, 0.006]} />
          <meshStandardMaterial
            color="#0d1a2e"
            emissive={tint}
            emissiveIntensity={glow(hovered, 1.1)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}
    </group>
  )
}
