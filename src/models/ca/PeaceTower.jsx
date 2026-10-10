/**
 * Peace Tower + Centre Block — Parliament Hill, Ottawa, Canada.
 * Authored to the MODEL AUTHORING CONTRACT in src/models/index.js:
 * base at local y = 0, ~1.0 unit tall, footprint inside x/z +/-0.5.
 */
import * as THREE from 'three'
import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

const STONE = '#cdc6b6'
const STONE_EM = '#7d9dc8'
const COPPER = '#4f8f7a'
const COPPER_EM = '#7fe0c0'
const GLASS = '#101a2c'
const GLASS_EM = '#3d74ad'
const CLOCK = '#ffe8b0'
const WHITE = '#eef3f8'

/** Cone/pyramid whose base sits at local y = 0, so it can be positioned by its base. */
function roofGeometry(radius, height, segments = 4) {
  const g = new THREE.ConeGeometry(radius, height, segments)
  if (segments === 4) g.rotateY(Math.PI / 4)
  g.translate(0, height / 2, 0)
  return g
}

export default function PeaceTower({ tint = '#ff4d5e', hovered = false }) {
  const boost = hovered ? MATERIAL.hoverEmissiveBoost : 0
  const mat = { roughness: MATERIAL.roughness, metalness: MATERIAL.metalness }

  // ── reusable geometry ────────────────────────────────────────────────────
  const longRoof = useMemo(() => roofGeometry(0.165, 0.12), [])
  const pavilionRoof = useMemo(() => roofGeometry(0.108, 0.115), [])
  const spire = useMemo(() => roofGeometry(0.085, 0.3), [])
  const pinnacle = useMemo(() => roofGeometry(0.021, 0.075), [])
  const discZ = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.045, 0.045, 0.007, 20)
    g.rotateX(Math.PI / 2)
    return g
  }, [])
  const discX = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.045, 0.045, 0.007, 20)
    g.rotateZ(Math.PI / 2)
    return g
  }, [])
  const clockRing = useMemo(() => new THREE.TorusGeometry(0.047, 0.008, 8, 22), [])

  // Seated 0.005 proud of the tower face (half-width 0.0675) so the disc never
  // lands coplanar with the stonework and z-fights.
  const clocks = [
    { key: 'front', geo: discZ, pos: [0, 0.37, 0.073], rot: [0, 0, 0] },
    { key: 'back', geo: discZ, pos: [0, 0.37, -0.073], rot: [0, 0, 0] },
    { key: 'right', geo: discX, pos: [0.073, 0.37, 0], rot: [0, Math.PI / 2, 0] },
    { key: 'left', geo: discX, pos: [-0.073, 0.37, 0], rot: [0, Math.PI / 2, 0] },
  ]

  const silver = (
    <meshStandardMaterial
      color={STONE}
      emissive={STONE_EM}
      emissiveIntensity={0.4 + boost}
      roughness={mat.roughness}
      metalness={mat.metalness}
    />
  )

  const copper = (
    <meshStandardMaterial
      color={COPPER}
      emissive={COPPER_EM}
      emissiveIntensity={MATERIAL.emissiveIntensity + boost}
      roughness={0.42}
      metalness={0.35}
      flatShading
    />
  )

  const darkGlass = (
    <meshStandardMaterial
      color={GLASS}
      emissive={GLASS_EM}
      emissiveIntensity={0.5 + boost}
      roughness={0.2}
      metalness={0.5}
    />
  )

  return (
    <group>
      {/* ── base terrace ─────────────────────────────────────────────────── */}
      <mesh position={[0, 0.012, 0]}>
        <boxGeometry args={[0.72, 0.024, 0.36]} />
        <meshStandardMaterial
          color="#9d9788"
          emissive={STONE_EM}
          emissiveIntensity={0.2 + boost}
          roughness={0.8}
          metalness={0.12}
        />
      </mesh>

      {/* ── Centre Block ─────────────────────────────────────────────────── */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[0.46, 0.2, 0.26]} />
        {silver}
      </mesh>

      {/* long copper roof ridge over the block */}
      <mesh geometry={longRoof} position={[0, 0.21, 0]} scale={[1.5, 1, 0.86]}>
        {copper}
      </mesh>

      {/* rows of gothic windows along both faces */}
      {[-0.17, -0.11, -0.05, 0.05, 0.11, 0.17].map((x) => (
        <group key={`win-f-${x}`}>
          <mesh position={[x, 0.115, 0.131]}>
            <boxGeometry args={[0.03, 0.075, 0.012]} />
            {darkGlass}
          </mesh>
          <mesh position={[x, 0.115, -0.131]}>
            <boxGeometry args={[0.03, 0.075, 0.012]} />
            {darkGlass}
          </mesh>
        </group>
      ))}

      {/* ── end pavilions ────────────────────────────────────────────────── */}
      {[-0.27, 0.27].map((x) => (
        <group key={`pav-${x}`}>
          <mesh position={[x, 0.095, 0]}>
            <boxGeometry args={[0.115, 0.17, 0.19]} />
            {silver}
          </mesh>
          <mesh geometry={pavilionRoof} position={[x, 0.18, 0]} scale={[1, 1, 1.1]}>
            {copper}
          </mesh>
          <mesh position={[x, 0.115, 0.101]}>
            <boxGeometry args={[0.028, 0.07, 0.012]} />
            {darkGlass}
          </mesh>
        </group>
      ))}

      {/* ── the Peace Tower ──────────────────────────────────────────────── */}
      <group position={[0, 0.1, 0.03]}>
        {/* main shaft */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.135, 0.44, 0.135]} />
          {silver}
        </mesh>

        {/* vertical gothic ribs on the four corners */}
        {[
          [-0.0725, 0.0725],
          [0.0725, 0.0725],
          [-0.0725, -0.0725],
          [0.0725, -0.0725],
        ].map(([x, z]) => (
          <mesh key={`rib-${x}-${z}`} position={[x, 0.22, z]}>
            <boxGeometry args={[0.02, 0.44, 0.02]} />
            {silver}
          </mesh>
        ))}

        {/* tall narrow window slot on the front face */}
        <mesh position={[0, 0.2, 0.0685]}>
          <boxGeometry args={[0.032, 0.2, 0.012]} />
          {darkGlass}
        </mesh>

        {/* four illuminated clock faces */}
        {clocks.map((clock) => (
          <group key={clock.key}>
            <mesh geometry={clock.geo} position={clock.pos}>
              <meshStandardMaterial
                color={CLOCK}
                emissive={CLOCK}
                emissiveIntensity={1.2 + boost}
                roughness={0.25}
                metalness={0.2}
              />
            </mesh>
            <mesh
              geometry={clockRing}
              position={clock.pos}
              rotation={clock.rot}
              scale={[1, 1, 0.9]}
            >
              <meshStandardMaterial
                color="#2c2718"
                emissive="#8a7020"
                emissiveIntensity={0.3 + boost}
                roughness={0.5}
                metalness={0.6}
              />
            </mesh>
          </group>
        ))}

        {/* belfry stage */}
        <mesh position={[0, 0.485, 0]}>
          <boxGeometry args={[0.118, 0.09, 0.118]} />
          {silver}
        </mesh>
        <mesh position={[0, 0.485, 0.0605]}>
          <boxGeometry args={[0.06, 0.07, 0.01]} />
          {darkGlass}
        </mesh>

        {/* corner pinnacles */}
        {[
          [-0.055, 0.055],
          [0.055, 0.055],
          [-0.055, -0.055],
          [0.055, -0.055],
        ].map(([x, z]) => (
          <mesh key={`pin-${x}-${z}`} geometry={pinnacle} position={[x, 0.53, z]}>
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={MATERIAL.emissiveIntensity + boost}
              roughness={0.4}
              metalness={0.4}
            />
          </mesh>
        ))}

        {/* steep pyramidal spire */}
        <mesh geometry={spire} position={[0, 0.51, 0]}>
          {copper}
        </mesh>

        {/* flagpole + Canadian flag */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.08, 8]} />
          <meshStandardMaterial
            color={WHITE}
            emissive="#cfe4ff"
            emissiveIntensity={0.6 + boost}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {[
          { x: 0.011, color: tint },
          { x: 0.03, color: WHITE },
          { x: 0.049, color: tint },
        ].map((band) => (
          <mesh key={`flag-${band.x}`} position={[band.x, 0.857, 0]}>
            <boxGeometry args={[0.018, 0.036, 0.004]} />
            <meshStandardMaterial
              color={band.color}
              emissive={band.color}
              emissiveIntensity={0.9 + boost}
              roughness={0.5}
              metalness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* ── library wing on the rear-left, for the wider hill silhouette ─── */}
      <mesh position={[-0.24, 0.075, -0.2]}>
        <boxGeometry args={[0.16, 0.13, 0.13]} />
        {silver}
      </mesh>
      <mesh geometry={pavilionRoof} position={[-0.24, 0.14, -0.2]} scale={[0.85, 0.8, 0.75]}>
        {copper}
      </mesh>
    </group>
  )
}
