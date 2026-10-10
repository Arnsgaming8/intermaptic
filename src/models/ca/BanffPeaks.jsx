import { useMemo } from 'react'
import * as THREE from 'three'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Banff / Canadian Rockies.
 * A deterministic cluster of glaciated peaks with snow-capped vertex colours, a
 * turquoise glacier lake and the Banff Springs chateau at the shoreline.
 * Landscape feature: footprint up to +/-0.8 in x/z, height up to 1.0.
 * No Math.random anywhere - the silhouette must be identical on every load.
 */

const ROCK = new THREE.Color('#6b5f57')
const SNOW = new THREE.Color('#f2fbff')
const SNOW_EMISSIVE = '#bfe6ff'
const LAKE_COLOR = '#35c6c0'
const LAKE_EMISSIVE = '#7ff5ef'
const STONE = '#cbbfa8'

/** Deterministic peak layout: tallest near the centre-back. */
const PEAK_CONFIGS = [
  { x: -0.56, z: 0.04, h: 0.64, r: 0.2, seg: 6, seed: 0 },
  { x: -0.3, z: -0.22, h: 0.88, r: 0.27, seg: 7, seed: 1.3 },
  { x: 0.02, z: -0.3, h: 1.0, r: 0.33, seg: 6, seed: 2.6 },
  { x: 0.34, z: -0.14, h: 0.82, r: 0.26, seg: 7, seed: 3.9 },
  { x: 0.58, z: 0.06, h: 0.58, r: 0.18, seg: 5, seed: 5.2 },
  { x: -0.34, z: 0.02, h: 0.5, r: 0.17, seg: 5, seed: 6.5 },
]

/**
 * Build one craggy peak: a low-segment cone pushed around by a fixed sine field,
 * then coloured per-vertex so snow sits above ~72% of that peak's own height.
 */
function buildPeakGeometry({ h, r, seg, seed }) {
  const geometry = new THREE.ConeGeometry(r, h, seg, 3, false)
  geometry.translate(0, h / 2, 0)

  const position = geometry.attributes.position
  const colors = new Float32Array(position.count * 3)
  const vertex = new THREE.Vector3()
  const mixed = new THREE.Color()

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i)

    // Deterministic glacial jitter - no randomness.
    vertex.x *= 1 + 0.12 * Math.sin(vertex.y * 17 + seed)
    vertex.z *= 1 + 0.12 * Math.cos(vertex.y * 13 + seed * 1.7)
    vertex.y += 0.02 * Math.cos(vertex.x * 23 + vertex.z * 19 + seed)
    if (vertex.y < 0) vertex.y = 0

    position.setXYZ(i, vertex.x, vertex.y, vertex.z)

    const yNorm = THREE.MathUtils.clamp(vertex.y / h, 0, 1)
    const t = THREE.MathUtils.clamp((yNorm - 0.62) / 0.24, 0, 1)
    mixed.copy(ROCK).lerp(SNOW, t)

    colors[i * 3] = mixed.r
    colors[i * 3 + 1] = mixed.g
    colors[i * 3 + 2] = mixed.b
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.computeVertexNormals()
  return geometry
}

const glow = (hovered) =>
  hovered ? MATERIAL.emissiveIntensity + MATERIAL.hoverEmissiveBoost : MATERIAL.emissiveIntensity

export default function BanffPeaks({ tint = '#ff4d5e', hovered = false }) {
  const peaks = useMemo(
    () =>
      PEAK_CONFIGS.map((config, index) => ({
        key: `peak-${index}`,
        geometry: buildPeakGeometry(config),
        position: [config.x, 0, config.z],
      })),
    [],
  )

  const intensity = glow(hovered)
  const snowEmissive = hovered ? 0.5 : 0.2

  return (
    <group>
      {/* ── Peaks ── */}
      {peaks.map((peak) => (
        <mesh key={peak.key} geometry={peak.geometry} position={peak.position}>
          <meshStandardMaterial
            vertexColors
            flatShading
            color="#ffffff"
            emissive={SNOW_EMISSIVE}
            emissiveIntensity={snowEmissive}
            roughness={0.88}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* ── Turquoise glacier lake ── */}
      <mesh position={[0, 0.012, 0.48]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.26, 48]} />
        <meshStandardMaterial
          color={LAKE_COLOR}
          emissive={LAKE_EMISSIVE}
          emissiveIntensity={hovered ? 0.95 : 0.55}
          roughness={0.16}
          metalness={0.12}
        />
      </mesh>
      <mesh position={[0, 0.016, 0.48]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.005, 8, 48]} />
        <meshStandardMaterial
          color="#9fe8e0"
          emissive={LAKE_EMISSIVE}
          emissiveIntensity={hovered ? 1.0 : 0.6}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* ── Banff Springs chateau on the shoreline ── */}
      <group position={[0.46, 0, 0.34]}>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.16, 0.12, 0.12]} />
          <meshStandardMaterial
            color={STONE}
            emissive="#5a5647"
            emissiveIntensity={intensity * 0.4}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>

        {/* lit windows */}
        {[-0.05, 0, 0.05].map((x) => (
          <mesh key={`hotel-w-${x}`} position={[x, 0.06, 0.061]}>
            <boxGeometry args={[0.022, 0.03, 0.004]} />
            <meshStandardMaterial
              color="#1a1d26"
              emissive={tint}
              emissiveIntensity={hovered ? 2.0 : 1.3}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
        ))}

        {/* central turret + steep copper-green roof */}
        <mesh position={[0, 0.165, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.09, 10]} />
          <meshStandardMaterial
            color={STONE}
            emissive="#5a5647"
            emissiveIntensity={intensity * 0.4}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
        <mesh position={[0, 0.275, 0]}>
          <coneGeometry args={[0.042, 0.13, 10]} />
          <meshStandardMaterial
            color="#4f8f7a"
            emissive="#7fe0c0"
            emissiveIntensity={intensity * 0.9}
            roughness={MATERIAL.roughness}
            metalness={0.45}
          />
        </mesh>

        {/* twin wing roofs, tinted to the owning nation */}
        {[-0.055, 0.055].map((x) => (
          <mesh key={`hotel-roof-${x}`} position={[x, 0.17, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.062, 0.1, 4]} />
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={hovered ? 1.4 : 0.9}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
