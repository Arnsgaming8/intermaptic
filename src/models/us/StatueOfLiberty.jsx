import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Statue of Liberty, New York Harbor.
 * Eleven-pointed star-fort base, tapered pedestal, oxidised-copper figure with a
 * seven-ray crown, raised torch and the tablet of law.
 * Authored base-at-y=0, total height ~1.02, footprint within +/-0.25.
 */

const glow = (hovered, factor = 1) =>
  (MATERIAL.emissiveIntensity + (hovered ? MATERIAL.hoverEmissiveBoost : 0)) * factor

const COPPER = '#57a98f'
const COPPER_GLOW = '#9ff0d6'

export default function StatueOfLiberty({ tint = '#3f8bff', hovered = false }) {
  /** Seven radiate rays of the crown. */
  const rays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2
        return { a, x: Math.cos(a) * 0.032, z: Math.sin(a) * 0.032 }
      }),
    [],
  )

  return (
    <group>
      {/* Star-fort base (the eleven-pointed Fort Wood rampart) */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.1, 11]} />
        <meshStandardMaterial
          color="#6f7f6a"
          emissive="#2f4a3c"
          emissiveIntensity={glow(hovered, 0.35)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Pedestal */}
      <mesh position={[0, 0.21, 0]}>
        <boxGeometry args={[0.17, 0.22, 0.17]} />
        <meshStandardMaterial
          color="#b9b3a3"
          emissive="#6b6250"
          emissiveIntensity={glow(hovered, 0.4)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, 0.325, 0]}>
        <boxGeometry args={[0.2, 0.02, 0.2]} />
        <meshStandardMaterial
          color="#cdc7b7"
          emissive="#6b6250"
          emissiveIntensity={glow(hovered, 0.45)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Robed figure */}
      <mesh position={[0, 0.49, 0]}>
        <cylinderGeometry args={[0.05, 0.11, 0.34, 24]} />
        <meshStandardMaterial
          color={COPPER}
          emissive={COPPER_GLOW}
          emissiveIntensity={glow(hovered, 0.9)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.052, 0.058, 0.16, 20]} />
        <meshStandardMaterial
          color={COPPER}
          emissive={COPPER_GLOW}
          emissiveIntensity={glow(hovered, 0.9)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.034, 20, 14]} />
        <meshStandardMaterial
          color={COPPER}
          emissive={COPPER_GLOW}
          emissiveIntensity={glow(hovered, 1)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Crown rays - nation-tinted */}
      {rays.map(({ a, x, z }, i) => (
        <group key={i} position={[x, 0.848, z]} rotation={[0, -a, 0]}>
          <mesh position={[0.009, 0.014, 0]} rotation={[0, 0, -0.45]}>
            <coneGeometry args={[0.009, 0.04, 6]} />
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={glow(hovered, 1.5)}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
        </group>
      ))}

      {/* Right arm raised, holding the torch */}
      <mesh position={[-0.075, 0.84, 0]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.013, 0.016, 0.2, 12]} />
        <meshStandardMaterial
          color={COPPER}
          emissive={COPPER_GLOW}
          emissiveIntensity={glow(hovered, 0.9)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[-0.109, 0.955, 0]}>
        <cylinderGeometry args={[0.016, 0.012, 0.05, 12]} />
        <meshStandardMaterial
          color="#e8c98a"
          emissive="#ffd89a"
          emissiveIntensity={glow(hovered, 0.8)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      {/* Flame: the brightest element on the model */}
      <mesh position={[-0.109, 0.998, 0]}>
        <sphereGeometry args={[0.03, 20, 14]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={glow(hovered, 2.1)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[-0.109, 1.002, 0]}>
        <sphereGeometry args={[0.015, 14, 10]} />
        <meshStandardMaterial
          color="#ffe6b0"
          emissive="#ffd27a"
          emissiveIntensity={glow(hovered, 2.4)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Left arm and the tablet of law */}
      <mesh position={[0.075, 0.78, 0]} rotation={[0, 0, -0.9]}>
        <cylinderGeometry args={[0.012, 0.015, 0.2, 12]} />
        <meshStandardMaterial
          color={COPPER}
          emissive={COPPER_GLOW}
          emissiveIntensity={glow(hovered, 0.9)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0.14, 0.735, 0.03]} rotation={[0, -0.3, -0.25]}>
        <boxGeometry args={[0.09, 0.11, 0.015]} />
        <meshStandardMaterial
          color="#cfe8dd"
          emissive="#9ff0d6"
          emissiveIntensity={glow(hovered, 0.7)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
    </group>
  )
}
