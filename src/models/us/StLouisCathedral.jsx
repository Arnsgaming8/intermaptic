import { MATERIAL } from '../../lib/theme.js'

/**
 * St. Louis Cathedral, New Orleans (Jackson Square).
 * White stucco church with a wide gabled nave, a rose window, three arched
 * doorways and the three steeples famous from every Jackson Square photograph.
 * Height ~0.96 unit, base at y = 0, footprint inside +/-0.5.
 */
const WALL = '#f0efe6'
const WALL_GLOW = '#ffe9c2'
const ROOF = '#4a5a72'
const DOOR = '#4a3b30'

/**
 * A triangular prism gable. Rotating a 3-segment cylinder by -90deg about X turns
 * its +Z vertex into +Y, giving a peak-up roof with a flat underside.
 */
const GABLE_R = 0.13
const GABLE_BOTTOM = 0.26 // sits on the body
const GABLE_Y = GABLE_BOTTOM + GABLE_R * 0.5 // peak lands at 0.455

export default function StLouisCathedral({ tint = '#3f8bff', hovered = false }) {
  const glow = hovered
    ? MATERIAL.emissiveIntensity + MATERIAL.hoverEmissiveBoost
    : MATERIAL.emissiveIntensity

  const stone = { roughness: MATERIAL.roughness, metalness: MATERIAL.metalness }

  return (
    <group>
      {/* plinth */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.4, 0.04, 0.3]} />
        <meshStandardMaterial color="#d9d5c6" emissive={WALL_GLOW} emissiveIntensity={glow * 0.4} {...stone} />
      </mesh>

      {/* nave body */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.34, 0.26, 0.24]} />
        <meshStandardMaterial color={WALL} emissive={WALL_GLOW} emissiveIntensity={glow} {...stone} />
      </mesh>

      {/* gabled roof, widened to the full facade */}
      <mesh position={[0, GABLE_Y, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.5, 1, 1]}>
        <cylinderGeometry args={[GABLE_R, GABLE_R, 0.24, 3]} />
        <meshStandardMaterial color={ROOF} emissive="#7f9ac2" emissiveIntensity={glow * 0.5} {...stone} />
      </mesh>

      {/* rose window */}
      <mesh position={[0, 0.19, 0.125]}>
        <circleGeometry args={[0.042, 24]} />
        <meshStandardMaterial
          color="#ffd68a"
          emissive="#ffd68a"
          emissiveIntensity={1.4}
          roughness={0.5}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.19, 0.128]}>
        <torusGeometry args={[0.045, 0.008, 8, 28]} />
        <meshStandardMaterial color={WALL} emissive={WALL_GLOW} emissiveIntensity={glow * 0.7} {...stone} />
      </mesh>

      {/* three arched doorways */}
      {[-0.1, 0, 0.1].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 0.055, 0.126]}>
            <boxGeometry args={[0.07, 0.09, 0.012]} />
            <meshStandardMaterial color={DOOR} emissive={tint} emissiveIntensity={glow * 0.5} {...stone} />
          </mesh>
          <mesh position={[0, 0.1, 0.126]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.012, 14, 1, false, -Math.PI / 2, Math.PI]} />
            <meshStandardMaterial color={DOOR} emissive={tint} emissiveIntensity={glow * 0.5} {...stone} />
          </mesh>
        </group>
      ))}

      {/* central steeple - the tallest of the three */}
      <mesh position={[0, 0.56, 0.05]}>
        <cylinderGeometry args={[0.034, 0.038, 0.32, 16]} />
        <meshStandardMaterial color={WALL} emissive={WALL_GLOW} emissiveIntensity={glow} {...stone} />
      </mesh>
      <mesh position={[0, 0.805, 0.05]}>
        <coneGeometry args={[0.05, 0.17, 16]} />
        <meshStandardMaterial color={ROOF} emissive="#8fb0d8" emissiveIntensity={glow * 0.6} {...stone} />
      </mesh>
      {/* finial + cross, carrying the accent colour */}
      <mesh position={[0, 0.925, 0.05]}>
        <cylinderGeometry args={[0.006, 0.006, 0.08, 8]} />
        <meshStandardMaterial color={tint} emissive={tint} emissiveIntensity={glow * 1.6} {...stone} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.955, 0.05]}>
        <boxGeometry args={[0.045, 0.008, 0.008]} />
        <meshStandardMaterial color={tint} emissive={tint} emissiveIntensity={glow * 1.6} {...stone} toneMapped={false} />
      </mesh>

      {/* two flanking steeples */}
      {[-0.1, 0.1].map((x) => (
        <group key={`spire-${x}`} position={[x, 0, 0.05]}>
          <mesh position={[0, 0.47, 0]}>
            <cylinderGeometry args={[0.026, 0.03, 0.22, 14]} />
            <meshStandardMaterial color={WALL} emissive={WALL_GLOW} emissiveIntensity={glow} {...stone} />
          </mesh>
          <mesh position={[0, 0.645, 0]}>
            <coneGeometry args={[0.038, 0.13, 14]} />
            <meshStandardMaterial color={ROOF} emissive="#8fb0d8" emissiveIntensity={glow * 0.6} {...stone} />
          </mesh>
          <mesh position={[0, 0.718, 0]}>
            <sphereGeometry args={[0.009, 10, 10]} />
            <meshStandardMaterial color={tint} emissive={tint} emissiveIntensity={glow * 1.4} {...stone} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
