import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Kennedy Space Center, Florida.
 *
 * A launch pad with a rocket standing on it. The stack is the tall element, the
 * service tower sits beside it with an honest open lattice, and the Vehicle Assembly
 * Building is the striped slab behind. The exhaust plume under the rocket is the
 * brightest thing in the model - it is what makes this landmark read as a launch
 * rather than a static display.
 *
 * The rocket sits on its flame, not on the deck: the plume fills the gap between the
 * pad surface (y = 0.05) and the rocket base (y = 0.17), which keeps every part of the
 * model above the y = 0 ground plane as the contract requires.
 *
 * Authored height 0.88 (lightning mast tip), footprint within x/z +/-0.32.
 */

const glow = (hovered, factor = 1) =>
  (MATERIAL.emissiveIntensity + (hovered ? MATERIAL.hoverEmissiveBoost : 0)) * factor

const APRON = '#8e93a0'
const DECK = '#a8adb8'
const ROCKET_HULL = '#eef3f8'
const ROCKET_GLOW = '#cfe4ff'
const TOWER_GREY = '#9aa4b0'
const VAB_HULL = '#b3b8c2'
const VAB_STRIPE = '#868b95'
const MOUND = '#6f5f4b'
const FROND = '#2f6b4a'

const PAD_TOP = 0.05
const ROCKET_X = -0.05
const ROCKET_Z = 0.01
const ROCKET_BASE = 0.17
const BODY_HEIGHT = 0.55
const NOSE_HEIGHT = 0.1
const TOWER_X = 0.15
const TOWER_TOP = 0.56

export default function KennedySpaceCenter({ tint = '#3f8bff', hovered = false }) {
  const { tower, rungs, braces, fins, palms } = useMemo(() => {
    // Service tower: four legs, six rungs, three diagonal braces.
    const legOffsets = [-1, 1]
    const legs = []
    legOffsets.forEach((ix) => {
      legOffsets.forEach((iz) => {
        legs.push({ x: TOWER_X + ix * 0.05, z: iz * 0.05 })
      })
    })

    const rungLevels = [0.1, 0.18, 0.26, 0.34, 0.42, 0.5]
    const rungsGenerated = rungLevels.map((y) => ({ y }))

    const bracesGenerated = [0.14, 0.3, 0.46].map((y, i) => ({
      y,
      tilt: i % 2 === 0 ? 0.62 : -0.62,
    }))

    // Four fins around the rocket's base.
    const finsGenerated = [0, 1, 2, 3].map((i) => {
      const angle = (i / 4) * Math.PI * 2
      return {
        angle,
        x: ROCKET_X + Math.sin(angle) * 0.045,
        z: ROCKET_Z + Math.cos(angle) * 0.045,
      }
    })

    // Palms along the edge of the apron.
    const palmSpots = [
      { x: -0.24, z: 0.18 },
      { x: -0.22, z: -0.16 },
      { x: 0.23, z: 0.19 },
      { x: 0.25, z: -0.14 },
    ]
    const palmsGenerated = palmSpots.map((spot, i) => ({
      ...spot,
      height: 0.15 + (i % 3) * 0.02,
    }))

    return {
      tower: legs,
      rungs: rungsGenerated,
      braces: bracesGenerated,
      fins: finsGenerated,
      palms: palmsGenerated,
    }
  }, [])

  return (
    <group>
      {/* Ground mound the pad is built on */}
      <mesh position={[0, 0.006, 0]}>
        <cylinderGeometry args={[0.33, 0.36, 0.012, 24]} />
        <meshStandardMaterial
          color={MOUND}
          emissive="#2a2117"
          emissiveIntensity={glow(hovered, 0.2)}
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      {/* Concrete apron and the raised pad deck */}
      <mesh position={[0, 0.014, 0]}>
        <boxGeometry args={[0.54, 0.02, 0.42]} />
        <meshStandardMaterial
          color={APRON}
          emissive="#3c4453"
          emissiveIntensity={glow(hovered, 0.3)}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.44, 0.03, 0.34]} />
        <meshStandardMaterial
          color={DECK}
          emissive="#4a5262"
          emissiveIntensity={glow(hovered, 0.3)}
          roughness={0.8}
          metalness={0.06}
        />
      </mesh>

      {/* Lit walkway strips in the marker colour */}
      {[0.145, -0.145].map((z) => (
        <mesh key={z} position={[0, PAD_TOP + 0.003, z]}>
          <boxGeometry args={[0.4, 0.005, 0.014]} />
          <meshStandardMaterial
            color="#0d1622"
            emissive={tint}
            emissiveIntensity={glow(hovered, 1.2)}
            roughness={0.4}
            metalness={0.1}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Exhaust plume: a wide orange cone with a white-hot core, point down */}
      <mesh position={[ROCKET_X, 0.11, ROCKET_Z]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.058, 0.12, 16]} />
        <meshStandardMaterial
          color="#ffb463"
          emissive="#ffa23c"
          emissiveIntensity={glow(hovered, 2.5)}
          roughness={0.5}
          metalness={0}
          transparent
          opacity={0.92}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[ROCKET_X, 0.125, ROCKET_Z]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.03, 0.09, 12]} />
        <meshStandardMaterial
          color="#fff4d6"
          emissive="#ffffff"
          emissiveIntensity={glow(hovered, 3)}
          roughness={0.5}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Rocket: body, nose, boosters, fins */}
      <mesh position={[ROCKET_X, ROCKET_BASE + BODY_HEIGHT / 2, ROCKET_Z]}>
        <cylinderGeometry args={[0.036, 0.036, BODY_HEIGHT, 20]} />
        <meshStandardMaterial
          color={ROCKET_HULL}
          emissive={ROCKET_GLOW}
          emissiveIntensity={glow(hovered, 0.5)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[ROCKET_X, ROCKET_BASE + BODY_HEIGHT + NOSE_HEIGHT / 2, ROCKET_Z]}>
        <coneGeometry args={[0.036, NOSE_HEIGHT, 20]} />
        <meshStandardMaterial
          color="#dfe8f2"
          emissive={ROCKET_GLOW}
          emissiveIntensity={glow(hovered, 0.6)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {[0.055, -0.055].map((offset) => (
        <mesh key={offset} position={[ROCKET_X + offset, ROCKET_BASE + 0.14, ROCKET_Z]}>
          <cylinderGeometry args={[0.017, 0.017, 0.28, 14]} />
          <meshStandardMaterial
            color="#dbe4ee"
            emissive={ROCKET_GLOW}
            emissiveIntensity={glow(hovered, 0.42)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}

      {fins.map((fin, i) => (
        <mesh
          key={i}
          position={[fin.x, ROCKET_BASE + 0.08, fin.z]}
          rotation={[0, -fin.angle, 0]}
        >
          <boxGeometry args={[0.006, 0.09, 0.032]} />
          <meshStandardMaterial
            color="#c8d2de"
            emissive={ROCKET_GLOW}
            emissiveIntensity={glow(hovered, 0.35)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}

      {/* Service tower: legs, rungs, diagonal braces, crane arm */}
      {tower.map((leg, i) => (
        <mesh key={i} position={[leg.x, (PAD_TOP + TOWER_TOP) / 2, leg.z]}>
          <boxGeometry args={[0.012, TOWER_TOP - PAD_TOP, 0.012]} />
          <meshStandardMaterial
            color={TOWER_GREY}
            emissive="#4f5a68"
            emissiveIntensity={glow(hovered, 0.35)}
            roughness={MATERIAL.roughness}
            metalness={0.5}
          />
        </mesh>
      ))}
      {rungs.map((rung, i) => (
        <mesh key={i} position={[TOWER_X, rung.y, 0]}>
          <boxGeometry args={[0.112, 0.008, 0.01]} />
          <meshStandardMaterial
            color={TOWER_GREY}
            emissive="#4f5a68"
            emissiveIntensity={glow(hovered, 0.35)}
            roughness={MATERIAL.roughness}
            metalness={0.5}
          />
        </mesh>
      ))}
      {braces.map((brace, i) => (
        <mesh key={i} position={[TOWER_X, brace.y, 0]} rotation={[0, 0, brace.tilt]}>
          <boxGeometry args={[0.009, 0.15, 0.008]} />
          <meshStandardMaterial
            color={TOWER_GREY}
            emissive="#4f5a68"
            emissiveIntensity={glow(hovered, 0.35)}
            roughness={MATERIAL.roughness}
            metalness={0.5}
          />
        </mesh>
      ))}
      <mesh position={[TOWER_X - 0.07, 0.53, 0]}>
        <boxGeometry args={[0.15, 0.01, 0.012]} />
        <meshStandardMaterial
          color={TOWER_GREY}
          emissive="#4f5a68"
          emissiveIntensity={glow(hovered, 0.4)}
          roughness={MATERIAL.roughness}
          metalness={0.5}
        />
      </mesh>

      {/* Lightning mast - the tallest point of the model */}
      <mesh position={[0.2, (TOWER_TOP + 0.88) / 2, 0.05]}>
        <cylinderGeometry args={[0.005, 0.007, 0.88 - TOWER_TOP, 8]} />
        <meshStandardMaterial
          color="#c2cad6"
          emissive={ROCKET_GLOW}
          emissiveIntensity={glow(hovered, 0.5)}
          roughness={MATERIAL.roughness}
          metalness={0.55}
        />
      </mesh>
      <mesh position={[0.2, 0.885, 0.05]}>
        <sphereGeometry args={[0.009, 10, 8]} />
        <meshStandardMaterial
          color="#ff4d4d"
          emissive="#ff2f2f"
          emissiveIntensity={glow(hovered, 2.4)}
          roughness={0.4}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Vehicle Assembly Building: striped slab behind the pad */}
      <mesh position={[0, 0.15, -0.21]}>
        <boxGeometry args={[0.26, 0.3, 0.1]} />
        <meshStandardMaterial
          color={VAB_HULL}
          emissive="#4d5563"
          emissiveIntensity={glow(hovered, 0.3)}
          roughness={0.78}
          metalness={0.08}
        />
      </mesh>
      {[-0.1, -0.05, 0, 0.05, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.15, -0.157]}>
          <boxGeometry args={[0.008, 0.28, 0.004]} />
          <meshStandardMaterial
            color={VAB_STRIPE}
            emissive="#333a45"
            emissiveIntensity={glow(hovered, 0.25)}
            roughness={0.8}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* Palms */}
      {palms.map((palm, i) => (
        <Palm key={i} {...palm} hovered={hovered} />
      ))}
    </group>
  )
}

/** One sabal palm: a tapered trunk with drooping fronds. */
function Palm({ x, z, height, hovered }) {
  const fronds = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return {
          key: i,
          x: Math.sin(angle) * 0.028,
          z: Math.cos(angle) * 0.028,
          y: height - 0.008,
          tilt: 0.75,
        }
      }),
    [height],
  )

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.006, 0.011, height, 8]} />
        <meshStandardMaterial
          color="#6b5a44"
          emissive="#2e2519"
          emissiveIntensity={glow(hovered, 0.25)}
          roughness={0.9}
          metalness={0.03}
        />
      </mesh>
      {fronds.map((frond) => (
        <mesh
          key={frond.key}
          position={[frond.x, frond.y, frond.z]}
          rotation={[0, -Math.atan2(frond.x, frond.z), frond.tilt]}
        >
          <boxGeometry args={[0.016, 0.005, 0.07]} />
          <meshStandardMaterial
            color={FROND}
            emissive="#1a4a30"
            emissiveIntensity={glow(hovered, 0.3)}
            roughness={0.85}
            metalness={0.03}
          />
        </mesh>
      ))}
    </group>
  )
}
