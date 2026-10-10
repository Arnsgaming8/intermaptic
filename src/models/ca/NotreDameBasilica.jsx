import * as THREE from 'three'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Notre-Dame Basilica, Old Montreal.
 * Twin-tower Gothic Revival facade with a deep blue lit interior.
 * Authored to the contract in src/models/index.js: base at y = 0, height ~1.0,
 * footprint inside x/z +/-0.5.
 */

const glow = (hovered) =>
  hovered ? MATERIAL.emissiveIntensity + MATERIAL.hoverEmissiveBoost : MATERIAL.emissiveIntensity

const STONE = '#b9b4a8'
const STONE_EMISSIVE = '#4a566b'
const ROOF = '#55606e'
const ROOF_EMISSIVE = '#33465e'
const GLASS_BLUE = '#3f6bff'

const stoneMat = (intensity) => ({
  color: STONE,
  emissive: STONE_EMISSIVE,
  emissiveIntensity: intensity * 0.4,
  roughness: MATERIAL.roughness,
  metalness: MATERIAL.metalness,
})

/** Narrow gothic window: rectangular slot capped by a semicircular arch. */
function ArchWindow({
  width = 0.024,
  height = 0.055,
  depth = 0.012,
  color = '#141c28',
  emissive = '#ffd68a',
  intensity = 1.2,
}) {
  return (
    <group>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, height, 0]}>
        <circleGeometry args={[width / 2, 12, 0, Math.PI]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={intensity}
          side={THREE.DoubleSide}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
    </group>
  )
}

const TOWER_X = 0.125
const TOWER_Z = 0.13
const PINNACLE_OFFSET = 0.038
const NAVE_WINDOW_Z = [-0.13, -0.03, 0.07]

export default function NotreDameBasilica({ tint = '#ff4d5e', hovered = false }) {
  const intensity = glow(hovered)
  const windowIntensity = 1.2 + (hovered ? 0.7 : 0)

  return (
    <group>
      {/* ── Apse: half-cylinder + half-dome, closed off the back of the nave ── */}
      <mesh position={[0, 0.1, -0.2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16, 1, true, Math.PI / 2, Math.PI]} />
        <meshStandardMaterial
          {...stoneMat(intensity)}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.2, -0.2]}>
        <sphereGeometry args={[0.15, 16, 8, Math.PI, Math.PI, 0, Math.PI / 2]} />
        <meshStandardMaterial {...stoneMat(intensity)} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Nave ── */}
      <mesh position={[0, 0.1, -0.03]}>
        <boxGeometry args={[0.3, 0.2, 0.34]} />
        <meshStandardMaterial {...stoneMat(intensity)} />
      </mesh>

      {/* ── Nave gable roof: a 3-sided cylinder reads as a clean triangular prism ── */}
      <mesh position={[0, 0.285, -0.03]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.34, 3]} />
        <meshStandardMaterial
          color={ROOF}
          emissive={ROOF_EMISSIVE}
          emissiveIntensity={intensity * 0.5}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* ── Nave side windows ── */}
      {[1, -1].flatMap((side) =>
        NAVE_WINDOW_Z.map((z) => (
          <group
            key={`nave-${side}-${z}`}
            position={[side * 0.151, 0.12, z]}
            rotation={[0, (side * Math.PI) / 2, 0]}
          >
            <ArchWindow
              width={0.026}
              height={0.06}
              intensity={windowIntensity}
              emissive={hovered ? tint : '#ffd68a'}
            />
          </group>
        )),
      )}

      {/* ── Facade block ── */}
      <mesh position={[0, 0.14, 0.145]}>
        <boxGeometry args={[0.34, 0.28, 0.05]} />
        <meshStandardMaterial {...stoneMat(intensity)} />
      </mesh>

      {/* ── Arched main entrance ── */}
      <group position={[0, 0, 0.173]}>
        <ArchWindow
          width={0.075}
          height={0.09}
          depth={0.014}
          color="#0d1420"
          emissive="#ffcf7a"
          intensity={windowIntensity}
        />
      </group>

      {/* ── Facade flank windows ── */}
      {[1, -1].map((side) => (
        <group key={`flank-${side}`} position={[side * 0.055, 0.155, 0.173]}>
          <ArchWindow width={0.026} height={0.05} intensity={windowIntensity} />
        </group>
      ))}

      {/* ── Rose window: tinted frame around deep blue glass ── */}
      <mesh position={[0, 0.218, 0.172]}>
        <circleGeometry args={[0.04, 32]} />
        <meshStandardMaterial
          color="#101a33"
          emissive={GLASS_BLUE}
          emissiveIntensity={hovered ? 2.0 : 1.3}
          side={THREE.DoubleSide}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, 0.218, 0.177]}>
        <torusGeometry args={[0.041, 0.008, 8, 28]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={hovered ? 1.6 : 1.0}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* ── Twin towers ── */}
      {[1, -1].map((side) => (
        <group key={`tower-${side}`}>
          <mesh position={[side * TOWER_X, 0.4, TOWER_Z]}>
            <boxGeometry args={[0.095, 0.52, 0.095]} />
            <meshStandardMaterial {...stoneMat(intensity)} />
          </mesh>

          {/* recessed gothic window slots on the front face */}
          {[0.28, 0.42].map((y) => (
            <group key={`tw-${side}-${y}`} position={[side * TOWER_X, y, TOWER_Z + 0.049]}>
              <ArchWindow width={0.026} height={0.055} intensity={windowIntensity} />
            </group>
          ))}

          {/* battlement cap */}
          <mesh position={[side * TOWER_X, 0.671, TOWER_Z]}>
            <boxGeometry args={[0.107, 0.022, 0.107]} />
            <meshStandardMaterial {...stoneMat(intensity)} />
          </mesh>

          {/* four corner pinnacles */}
          {[1, -1].flatMap((sx) =>
            [1, -1].map((sz) => (
              <mesh
                key={`pin-${side}-${sx}-${sz}`}
                position={[
                  side * TOWER_X + sx * PINNACLE_OFFSET,
                  0.722,
                  TOWER_Z + sz * PINNACLE_OFFSET,
                ]}
              >
                <coneGeometry args={[0.013, 0.08, 5]} />
                <meshStandardMaterial
                  color={tint}
                  emissive={tint}
                  emissiveIntensity={hovered ? 1.4 : 0.9}
                  roughness={MATERIAL.roughness}
                  metalness={MATERIAL.metalness}
                />
              </mesh>
            )),
          )}

          {/* inner octagonal turret + spire */}
          <mesh position={[side * (TOWER_X - PINNACLE_OFFSET), 0.72, TOWER_Z]}>
            <cylinderGeometry args={[0.026, 0.026, 0.12, 8]} />
            <meshStandardMaterial {...stoneMat(intensity)} />
          </mesh>
          <mesh position={[side * (TOWER_X - PINNACLE_OFFSET), 0.88, TOWER_Z]}>
            <coneGeometry args={[0.034, 0.2, 8]} />
            <meshStandardMaterial
              color="#6d7a70"
              emissive="#3d5a52"
              emissiveIntensity={intensity * 0.6}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
          <mesh position={[side * (TOWER_X - PINNACLE_OFFSET), 0.985, TOWER_Z]}>
            <sphereGeometry args={[0.009, 8, 8]} />
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={hovered ? 2.0 : 1.2}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
