import { MATERIAL } from '../../lib/theme.js'

/**
 * Mount Rushmore National Memorial, South Dakota.
 *
 * A granite cliff with four presidential heads carved into its face, a rubble slope
 * at the base and ponderosa pines around it. The heads sit in the real order -
 * Washington, Jefferson, Theodore Roosevelt, Lincoln - with Washington and Lincoln
 * highest and Roosevelt lowest, and each one is sunk about a third of the way into
 * the rock so it reads as carved INTO the cliff rather than stuck onto it.
 *
 * Authored base-at-y=0, total height ~0.62, footprint within +/-0.5.
 */

const glow = (hovered, factor = 1) =>
  (MATERIAL.emissiveIntensity + (hovered ? MATERIAL.hoverEmissiveBoost : 0)) * factor

const GRANITE = '#8d8b86'
const GRANITE_DARK = '#78766f'
const RUBBLE = '#5f5d59'
const PINE = '#2f6b4a'
const TRUNK = '#4a3a2c'

/**
 * The cliff mass, built from stacked blocks. Each block is rotated a little so the
 * face is never a flat slab - cheap way to read as natural rock while keeping the
 * front elevation flat enough to carve heads into.
 */
const CLIFF = [
  { y: 0.08, w: 0.56, h: 0.16, d: 0.3, rot: [0, 0.03, 0.015], tone: GRANITE_DARK },
  { y: 0.22, w: 0.53, h: 0.14, d: 0.285, rot: [0, -0.04, -0.012], tone: GRANITE },
  { y: 0.34, w: 0.49, h: 0.13, d: 0.27, rot: [0, 0.05, 0.02], tone: GRANITE_DARK },
  { y: 0.45, w: 0.44, h: 0.11, d: 0.25, rot: [0, -0.03, -0.008], tone: GRANITE },
  { y: 0.535, w: 0.35, h: 0.075, d: 0.22, rot: [0, 0.07, -0.02], tone: GRANITE },
]

/** Summit ridge behind the carved faces. Tops the model out at 0.62. */
const CREST = { y: 0.595, w: 0.24, h: 0.05, d: 0.15, rot: [0, -0.09, 0.03] }

/**
 * The four carved heads. `z` is deliberately inside the front face of the cliff
 * blocks (which sits near z = 0.14) so roughly a third of each head is buried.
 */
const HEADS = [
  { id: 'washington', x: -0.16, y: 0.425, z: 0.126, scale: 1.0 },
  { id: 'jefferson', x: -0.055, y: 0.405, z: 0.13, scale: 0.95 },
  { id: 'roosevelt', x: 0.05, y: 0.378, z: 0.132, scale: 0.92 },
  { id: 'lincoln', x: 0.158, y: 0.418, z: 0.124, scale: 0.97 },
]

/** Pines dotted around the base, kept outside the cliff footprint. */
const PINES = [
  { id: 'p0', x: -0.3, z: 0.16, h: 0.22 },
  { id: 'p1', x: -0.34, z: -0.03, h: 0.19 },
  { id: 'p2', x: 0.31, z: 0.14, h: 0.2 },
  { id: 'p3', x: 0.35, z: -0.05, h: 0.23 },
  { id: 'p4', x: -0.2, z: -0.2, h: 0.18 },
  { id: 'p5', x: 0.22, z: -0.21, h: 0.21 },
]

/** One carved face: skull, nose, brow ridge and jaw. */
function CarvedHead({ head, hovered }) {
  const stone = {
    color: GRANITE,
    emissive: '#8fa8c4',
    emissiveIntensity: glow(hovered, 0.4),
    roughness: MATERIAL.roughness,
    metalness: MATERIAL.metalness,
    flatShading: true,
  }

  return (
    <group position={[head.x, head.y, head.z]} scale={head.scale}>
      {/* skull, a touch taller than wide like the real carvings */}
      <mesh scale={[0.95, 1.15, 0.9]}>
        <sphereGeometry args={[0.042, 16, 12]} />
        <meshStandardMaterial {...stone} />
      </mesh>

      {/* nose, apex pointing outward along +Z */}
      <mesh position={[0, -0.004, 0.032]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.012, 0.034, 8]} />
        <meshStandardMaterial {...stone} emissiveIntensity={glow(hovered, 0.45)} />
      </mesh>

      {/* brow ridge */}
      <mesh position={[0, 0.017, 0.028]}>
        <boxGeometry args={[0.06, 0.013, 0.02]} />
        <meshStandardMaterial {...stone} />
      </mesh>

      {/* jaw */}
      <mesh position={[0, -0.03, 0.018]}>
        <boxGeometry args={[0.046, 0.019, 0.03]} />
        <meshStandardMaterial {...stone} />
      </mesh>
    </group>
  )
}

/** A ponderosa pine: trunk plus two stacked cones. */
function Pine({ pine, hovered }) {
  const { x, z, h } = pine
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, h * 0.18, 0]}>
        <cylinderGeometry args={[0.006, 0.009, h * 0.36, 6]} />
        <meshStandardMaterial
          color={TRUNK}
          emissive="#3a2a1c"
          emissiveIntensity={glow(hovered, 0.3)}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, h * 0.52, 0]}>
        <coneGeometry args={[h * 0.29, h * 0.42, 7]} />
        <meshStandardMaterial
          color={PINE}
          emissive="#2a8a5c"
          emissiveIntensity={glow(hovered, 0.45)}
          roughness={0.8}
          metalness={0.05}
          flatShading
        />
      </mesh>
      <mesh position={[0, h * 0.76, 0]}>
        <coneGeometry args={[h * 0.2, h * 0.36, 7]} />
        <meshStandardMaterial
          color={PINE}
          emissive="#2a8a5c"
          emissiveIntensity={glow(hovered, 0.45)}
          roughness={0.8}
          metalness={0.05}
          flatShading
        />
      </mesh>
    </group>
  )
}

export default function MountRushmore({ tint = '#3f8bff', hovered = false }) {
  return (
    <group>
      {/* rubble slope (talus) spilling from the base of the cliff */}
      <mesh position={[0, 0.045, 0.02]}>
        <cylinderGeometry args={[0.15, 0.32, 0.09, 9]} />
        <meshStandardMaterial
          color={RUBBLE}
          emissive="#55606e"
          emissiveIntensity={glow(hovered, 0.2)}
          roughness={0.95}
          metalness={0.04}
          flatShading
        />
      </mesh>

      {/* the granite cliff */}
      {CLIFF.map((block) => (
        <mesh key={block.y} position={[0, block.y, 0]} rotation={block.rot}>
          <boxGeometry args={[block.w, block.h, block.d]} />
          <meshStandardMaterial
            color={block.tone}
            emissive="#7f97b0"
            emissiveIntensity={glow(hovered, 0.25)}
            roughness={0.92}
            metalness={0.05}
            flatShading
          />
        </mesh>
      ))}

      {/* summit ridge behind the faces */}
      <mesh position={[0, CREST.y, -0.02]} rotation={CREST.rot}>
        <boxGeometry args={[CREST.w, CREST.h, CREST.d]} />
        <meshStandardMaterial
          color={GRANITE_DARK}
          emissive="#7f97b0"
          emissiveIntensity={glow(hovered, 0.22)}
          roughness={0.92}
          metalness={0.05}
          flatShading
        />
      </mesh>

      {/* the four carved faces */}
      {HEADS.map((head) => (
        <CarvedHead key={head.id} head={head} hovered={hovered} />
      ))}

      {/* pines around the base */}
      {PINES.map((pine) => (
        <Pine key={pine.id} pine={pine} hovered={hovered} />
      ))}

      {/* visitor terrace and flag - the nation-tinted accent */}
      <mesh position={[0, 0.012, 0.3]}>
        <boxGeometry args={[0.17, 0.024, 0.06]} />
        <meshStandardMaterial
          color="#d9d5cc"
          emissive="#8fa8c4"
          emissiveIntensity={glow(hovered, 0.3)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0.17, 0.07, 0.28]}>
        <cylinderGeometry args={[0.004, 0.005, 0.14, 6]} />
        <meshStandardMaterial
          color="#c8ccd2"
          emissive="#9fb4cc"
          emissiveIntensity={glow(hovered, 0.5)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0.192, 0.126, 0.28]}>
        <boxGeometry args={[0.044, 0.028, 0.004]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={glow(hovered, 1.7)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
