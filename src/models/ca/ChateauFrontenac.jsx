import { MATERIAL } from '../../lib/theme.js'

/**
 * Chateau Frontenac, Quebec City.
 * The castle on the cliff: a heavy central tower with a very steep oxidised-copper
 * roof, long dormered wings, corner turrets and a stone terrace rampart.
 * Authored to the contract in src/models/index.js: base at y = 0, height ~0.95,
 * footprint inside x/z +/-0.5.
 */

const glow = (hovered) =>
  hovered ? MATERIAL.emissiveIntensity + MATERIAL.hoverEmissiveBoost : MATERIAL.emissiveIntensity

const STONE = '#cbbfa8'
const STONE_EMISSIVE = '#5a5647'
const COPPER = '#4f8f7a'
const COPPER_EMISSIVE = '#7fe0c0'
const WINDOW_GLASS = '#1a1d26'

const stoneProps = (intensity) => ({
  color: STONE,
  emissive: STONE_EMISSIVE,
  emissiveIntensity: intensity * 0.4,
  roughness: MATERIAL.roughness,
  metalness: MATERIAL.metalness,
})

const copperProps = (intensity, extra = 0) => ({
  color: COPPER,
  emissive: COPPER_EMISSIVE,
  emissiveIntensity: intensity * 0.9 + extra,
  roughness: MATERIAL.roughness,
  metalness: 0.45,
})

const TERRACE_TOP = 0.1
const WING_X = 0.24
const WING_Z = -0.02
const WING_HALF_DEPTH = 0.085
const WING_ROOF_PEAK = 0.42
const WING_ROOF_EAVE = 0.24

/** One dormer poking out of a wing roof slope. */
function Dormer({ position, tint, intensity }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.035, 0.05, 0.032]} />
        <meshStandardMaterial {...stoneProps(intensity)} />
      </mesh>
      <mesh position={[0, 0.038, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.031, 0.032, 4]} />
        <meshStandardMaterial {...copperProps(intensity)} />
      </mesh>
      <mesh position={[0, -0.002, 0.017]}>
        <boxGeometry args={[0.018, 0.024, 0.006]} />
        <meshStandardMaterial
          color={WINDOW_GLASS}
          emissive={tint}
          emissiveIntensity={intensity * 1.3}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
    </group>
  )
}

export default function ChateauFrontenac({ tint = '#ff4d5e', hovered = false }) {
  const intensity = glow(hovered)
  const copperBoost = hovered ? 0.35 : 0

  const dormerRows = [1, -1]

  return (
    <group>
      {/* ── Stone terrace the castle stands on ── */}
      <mesh position={[0, TERRACE_TOP / 2, WING_Z]}>
        <boxGeometry args={[0.9, TERRACE_TOP, 0.62]} />
        <meshStandardMaterial {...stoneProps(intensity)} />
      </mesh>

      {/* front rampart wall + crenellations */}
      <mesh position={[0, 0.135, 0.29]}>
        <boxGeometry args={[0.9, 0.07, 0.05]} />
        <meshStandardMaterial {...stoneProps(intensity)} />
      </mesh>
      {Array.from({ length: 10 }, (_, i) => -0.405 + (i * 0.81) / 9).map((x) => (
        <mesh key={`crenel-${x.toFixed(3)}`} position={[x, 0.19, 0.29]}>
          <boxGeometry args={[0.038, 0.046, 0.056]} />
          <meshStandardMaterial {...stoneProps(intensity)} />
        </mesh>
      ))}

      {/* ── Everything above the terrace ── */}
      <group position={[0, TERRACE_TOP, 0]}>
        {/* centre tower */}
        <mesh position={[0, 0.18, WING_Z]}>
          <boxGeometry args={[0.2, 0.36, 0.2]} />
          <meshStandardMaterial {...stoneProps(intensity)} />
        </mesh>

        {/* tower windows */}
        {[0.14, 0.26].flatMap((y) =>
          [-0.05, 0, 0.05].map((x) => (
            <mesh key={`tw-${y}-${x}`} position={[x, y, WING_Z + 0.101]}>
              <boxGeometry args={[0.03, 0.06, 0.006]} />
              <meshStandardMaterial
                color={WINDOW_GLASS}
                emissive={tint}
                emissiveIntensity={intensity * 1.3}
                roughness={MATERIAL.roughness}
                metalness={MATERIAL.metalness}
              />
            </mesh>
          )),
        )}

        {/* steep copper pyramid roof on the tower */}
        <mesh position={[0, 0.54, WING_Z]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.15, 0.36, 4]} />
          <meshStandardMaterial {...copperProps(intensity, copperBoost)} />
        </mesh>

        {/* finial, sphere and flag */}
        <mesh position={[0, 0.755, WING_Z]}>
          <cylinderGeometry args={[0.006, 0.006, 0.07, 6]} />
          <meshStandardMaterial
            color="#e8dcc0"
            emissive="#8a7f63"
            emissiveIntensity={intensity * 0.6}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
        <mesh position={[0, 0.795, WING_Z]}>
          <sphereGeometry args={[0.011, 10, 10]} />
          <meshStandardMaterial
            color={tint}
            emissive={tint}
            emissiveIntensity={hovered ? 2.0 : 1.2}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
        <mesh position={[0.03, 0.818, WING_Z]}>
          <boxGeometry args={[0.055, 0.034, 0.004]} />
          <meshStandardMaterial
            color={tint}
            emissive={tint}
            emissiveIntensity={hovered ? 1.6 : 1.0}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>

        {/* ── Wings ── */}
        {[1, -1].map((side) => (
          <group key={`wing-${side}`}>
            <mesh position={[side * WING_X, 0.12, WING_Z]}>
              <boxGeometry args={[0.28, 0.24, 0.17]} />
              <meshStandardMaterial {...stoneProps(intensity)} />
            </mesh>

            {/* winged windows along the front wall */}
            {[-0.09, -0.03, 0.03, 0.09].map((offset) => (
              <mesh
                key={`ww-${side}-${offset}`}
                position={[side * WING_X + offset, 0.15, WING_Z + WING_HALF_DEPTH + 0.003]}
              >
                <boxGeometry args={[0.03, 0.065, 0.006]} />
                <meshStandardMaterial
                  color={WINDOW_GLASS}
                  emissive={tint}
                  emissiveIntensity={intensity * 1.3}
                  roughness={MATERIAL.roughness}
                  metalness={MATERIAL.metalness}
                />
              </mesh>
            ))}

            {/*
              Steep hipped roof. The outer group squashes world Z and the inner mesh
              spins the 4-sided cone onto the axes, so the pyramid footprint follows
              the rectangular wing (0.283 x 0.175) instead of a diamond.
            */}
            <group position={[side * WING_X, (WING_ROOF_PEAK + WING_ROOF_EAVE) / 2, WING_Z]} scale={[1, 1, 0.62]}>
              <mesh rotation={[0, Math.PI / 4, 0]}>
                <coneGeometry args={[0.2, WING_ROOF_PEAK - WING_ROOF_EAVE, 4]} />
                <meshStandardMaterial {...copperProps(intensity, copperBoost)} />
              </mesh>
            </group>

            {/* dormers on both slopes */}
            {dormerRows.flatMap((row) =>
              [-0.09, -0.03, 0.03, 0.09].map((offset) => (
                <Dormer
                  key={`dormer-${side}-${row}-${offset}`}
                  position={[
                    side * WING_X + offset,
                    0.3,
                    WING_Z + row * WING_HALF_DEPTH * 0.64,
                  ]}
                  tint={tint}
                  intensity={intensity}
                />
              )),
            )}
          </group>
        ))}

        {/* ── Corner turrets: cylinder + tall conical copper roof ── */}
        {[1, -1].flatMap((sx) =>
          [1, -1].map((sz) => (
            <group key={`turret-${sx}-${sz}`} position={[sx * 0.355, 0, WING_Z + sz * 0.075]}>
              <mesh position={[0, 0.16, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.28, 12]} />
                <meshStandardMaterial {...stoneProps(intensity)} />
              </mesh>
              <mesh position={[0, 0.4, 0]}>
                <coneGeometry args={[0.062, 0.2, 12]} />
                <meshStandardMaterial {...copperProps(intensity, copperBoost)} />
              </mesh>
              <mesh position={[0, 0.505, 0]}>
                <sphereGeometry args={[0.01, 8, 8]} />
                <meshStandardMaterial
                  color={tint}
                  emissive={tint}
                  emissiveIntensity={hovered ? 2.0 : 1.2}
                  roughness={MATERIAL.roughness}
                  metalness={MATERIAL.metalness}
                />
              </mesh>
            </group>
          )),
        )}
      </group>
    </group>
  )
}
