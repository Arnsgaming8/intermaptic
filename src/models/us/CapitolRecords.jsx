import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Capitol Records Building, Los Angeles.
 * The 13-storey round tower: a stack of stacked discs with sunshade lips,
 * a needle spire, and a blinking red beacon at the tip.
 * Height 1.0 unit, base at y = 0, footprint inside +/-0.5.
 */
const DISC_COUNT = 13
const DISC_HEIGHT = 0.042
const DISC_GAP = 0.013
const BASE_Y = 0.10
const STACK_TOP = BASE_Y + (DISC_COUNT - 1) * (DISC_HEIGHT + DISC_GAP) + DISC_HEIGHT // ~0.802

const CREAM = '#efe7d8'
const CREAM_GLOW = '#ffd9a0'
const SUNSHADE = '#b9ad99'
const PALM_LEAF = '#2f6b4a'

export default function CapitolRecords({ tint = '#3f8bff', hovered = false }) {
  const beacon = useRef()
  const glow = hovered
    ? MATERIAL.emissiveIntensity + MATERIAL.hoverEmissiveBoost
    : MATERIAL.emissiveIntensity

  const discs = useMemo(
    () =>
      Array.from({ length: DISC_COUNT }, (_, i) => ({
        key: i,
        y: BASE_Y + DISC_HEIGHT / 2 + i * (DISC_HEIGHT + DISC_GAP),
        r: 0.16 - (i / (DISC_COUNT - 1)) * 0.015,
      })),
    [],
  )

  const palms = useMemo(
    () => [
      { key: 'a', x: -0.34, z: 0.16, h: 0.32 },
      { key: 'b', x: -0.26, z: -0.18, h: 0.27 },
      { key: 'c', x: 0.33, z: 0.06, h: 0.29 },
    ],
    [],
  )

  const fronds = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        key: i,
        angle: (i / 7) * Math.PI * 2,
        droop: -0.42 - (i % 3) * 0.14,
      })),
    [],
  )

  // The red beacon on the spire blinks, just like the real broadcast tower.
  useFrame(({ clock }) => {
    const material = beacon.current?.material
    if (material) {
      material.emissiveIntensity = 1.2 + Math.sin(clock.elapsedTime * 2) * 1.1
    }
  })

  return (
    <group>
      {/* base podium */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.52, 0.1, 0.34]} />
        <meshStandardMaterial
          color="#2b3240"
          emissive={tint}
          emissiveIntensity={glow * 0.25}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, 0.108, 0.13]}>
        <boxGeometry args={[0.3, 0.02, 0.06]} />
        <meshStandardMaterial
          color={SUNSHADE}
          emissive={CREAM_GLOW}
          emissiveIntensity={glow * 0.4}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* the 13 stacked circular floors */}
      {discs.map((disc) => (
        <group key={disc.key} position={[0, disc.y, 0]}>
          <mesh>
            <cylinderGeometry args={[disc.r, disc.r, DISC_HEIGHT, 32]} />
            <meshStandardMaterial
              color={CREAM}
              emissive={CREAM_GLOW}
              emissiveIntensity={glow}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
          {/* sunshade lip that creates the famous horizontal banding */}
          <mesh position={[0, DISC_HEIGHT / 2 + 0.004, 0]}>
            <cylinderGeometry args={[disc.r + 0.012, disc.r + 0.012, 0.008, 32]} />
            <meshStandardMaterial
              color={SUNSHADE}
              emissive={CREAM_GLOW}
              emissiveIntensity={glow * 0.55}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
        </group>
      ))}

      {/* needle spire */}
      <mesh position={[0, (STACK_TOP + 1.0) / 2, 0]}>
        <cylinderGeometry args={[0.004, 0.009, 1.0 - STACK_TOP, 8]} />
        <meshStandardMaterial
          color="#d8dee6"
          emissive={CREAM_GLOW}
          emissiveIntensity={glow * 0.6}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* blinking beacon */}
      <mesh ref={beacon} position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.014, 12, 12]} />
        <meshStandardMaterial
          color="#ff4d4d"
          emissive="#ff4d4d"
          emissiveIntensity={2.2}
          roughness={0.4}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* palm trees around the base */}
      {palms.map((palm) => (
        <group key={palm.key} position={[palm.x, 0, palm.z]}>
          <mesh position={[0, palm.h / 2, 0]}>
            <cylinderGeometry args={[0.011, 0.02, palm.h, 8]} />
            <meshStandardMaterial
              color="#6b5540"
              emissive="#3a2b1c"
              emissiveIntensity={glow * 0.35}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
          <group position={[0, palm.h, 0]}>
            {fronds.map((frond) => (
              <group key={frond.key} rotation={[0, frond.angle, 0]}>
                <mesh position={[0.085, -0.02, 0]} rotation={[0, 0, frond.droop]} scale={[1, 1, 1]}>
                  <boxGeometry args={[0.17, 0.012, 0.038]} />
                  <meshStandardMaterial
                    color={PALM_LEAF}
                    emissive="#1d4a32"
                    emissiveIntensity={glow * 0.5}
                    roughness={0.8}
                    metalness={0.05}
                  />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      ))}
    </group>
  )
}
