import { useMemo } from 'react'
import * as THREE from 'three'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Golden Gate Bridge, San Francisco Bay.
 * Two Art Deco towers, a two-cable suspension system with hangers and a stiffening
 * deck across a 1.0-unit span.
 *
 * NOTE ON PROPORTIONS: a suspension bridge is a wide, low silhouette, so this model
 * fills the full +/-0.5 footprint but only ~0.43 in height. Forcing the usual ~1.0
 * unit of height would have stretched the towers to three times the span and made the
 * bridge unrecognizable. Proportions here follow the real structure (746 ft towers on a
 * 4,200 ft main span, roughly scaled up 2.4x so the bridge still reads at globe scale).
 */

const glow = (hovered, factor = 1) =>
  (MATERIAL.emissiveIntensity + (hovered ? MATERIAL.hoverEmissiveBoost : 0)) * factor

const ORANGE = '#e04a26'
const ORANGE_GLOW = '#ff8a5c'

const DECK_TOP = 0.209
const TOWER_X = 0.3
const TOWER_TOP = 0.42
const CABLE_Z = 0.038

/** Cable height at a given x: parabolic between the towers, straight to the anchors. */
function cableY(x) {
  const ax = Math.abs(x)
  if (ax <= TOWER_X) return TOWER_TOP - 0.18 * (1 - (ax / TOWER_X) ** 2)
  return TOWER_TOP - (TOWER_TOP - 0.13) * ((ax - TOWER_X) / 0.2)
}

export default function GoldenGateBridge({ tint = '#3f8bff', hovered = false }) {
  const { cables, hangers, lamps } = useMemo(() => {
    // Two main cables, one per side of the roadway.
    const cableGeoms = [CABLE_Z, -CABLE_Z].map((z) => {
      const points = Array.from({ length: 49 }, (_, i) => {
        const x = -0.5 + i * (1 / 48)
        return new THREE.Vector3(x, cableY(x), z)
      })
      const curve = new THREE.CatmullRomCurve3(points)
      return new THREE.TubeGeometry(curve, 72, 0.008, 6, false)
    })

    // Vertical hangers dropping from each cable to the deck.
    const hang = []
    for (let i = -6; i <= 6; i += 1) {
      const x = i * 0.066
      const top = cableY(x)
      const height = top - DECK_TOP
      if (height <= 0.02) continue
      ;[CABLE_Z, -CABLE_Z].forEach((z) => {
        hang.push({ x, y: (top + DECK_TOP) / 2, z, height })
      })
    }

    // Deck-level navigation lamps along the centre line.
    const lampPositions = Array.from({ length: 13 }, (_, i) => -0.45 + i * 0.075)

    return { cables: cableGeoms, hangers: hang, lamps: lampPositions }
  }, [])

  return (
    <group>
      {/* Main cables */}
      {cables.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshStandardMaterial
            color="#ff7043"
            emissive={ORANGE_GLOW}
            emissiveIntensity={glow(hovered, 1.1)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}

      {/* Hangers */}
      {hangers.map((h, i) => (
        <mesh key={i} position={[h.x, h.y, h.z]} scale={[1, h.height, 1]}>
          <cylinderGeometry args={[0.0035, 0.0035, 1, 5]} />
          <meshStandardMaterial
            color={ORANGE}
            emissive={ORANGE_GLOW}
            emissiveIntensity={glow(hovered, 0.7)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}

      {/* Roadway deck + stiffening truss */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.96, 0.018, 0.11]} />
        <meshStandardMaterial
          color="#5a5f66"
          emissive="#8fa6bd"
          emissiveIntensity={glow(hovered, 0.3)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>
      <mesh position={[0, 0.185, 0]}>
        <boxGeometry args={[0.96, 0.014, 0.092]} />
        <meshStandardMaterial
          color="#464b52"
          emissive="#7d93a8"
          emissiveIntensity={glow(hovered, 0.25)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* Deck lamps - nation-tinted accent */}
      {lamps.map((x, i) => (
        <mesh key={i} position={[x, 0.214, 0]}>
          <sphereGeometry args={[0.006, 10, 8]} />
          <meshStandardMaterial
            color={tint}
            emissive={tint}
            emissiveIntensity={glow(hovered, 1.6)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}

      {/* Towers */}
      {[-TOWER_X, TOWER_X].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {/* Pier and stepped Art Deco base */}
          <mesh position={[0, 0.035, 0]}>
            <boxGeometry args={[0.1, 0.07, 0.15]} />
            <meshStandardMaterial
              color="#3a3f47"
              emissive="#5f7286"
              emissiveIntensity={glow(hovered, 0.25)}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
          <mesh position={[0, 0.085, 0]}>
            <boxGeometry args={[0.075, 0.04, 0.13]} />
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={glow(hovered, 0.9)}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>

          {/* Vertical legs */}
          {[CABLE_Z, -CABLE_Z].map((z) => (
            <mesh key={z} position={[0, 0.21, z]}>
              <boxGeometry args={[0.022, 0.42, 0.022]} />
              <meshStandardMaterial
                color={ORANGE}
                emissive={ORANGE_GLOW}
                emissiveIntensity={glow(hovered, 0.9)}
                roughness={MATERIAL.roughness}
                metalness={MATERIAL.metalness}
              />
            </mesh>
          ))}

          {/* Portal cross-braces */}
          {[0.1, 0.16, 0.28, 0.35, 0.41].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <boxGeometry args={[0.024, 0.013, 0.098]} />
              <meshStandardMaterial
                color="#ff7043"
                emissive={ORANGE_GLOW}
                emissiveIntensity={glow(hovered, 0.85)}
                roughness={MATERIAL.roughness}
                metalness={MATERIAL.metalness}
              />
            </mesh>
          ))}

          {/* Tower cap */}
          <mesh position={[0, 0.428, 0]}>
            <boxGeometry args={[0.04, 0.016, 0.11]} />
            <meshStandardMaterial
              color={ORANGE}
              emissive={ORANGE_GLOW}
              emissiveIntensity={glow(hovered, 1.2)}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
        </group>
      ))}

      {/* Cable anchorages */}
      {[-0.47, 0.47].map((x) => (
        <mesh key={x} position={[x, 0.05, 0]}>
          <boxGeometry args={[0.06, 0.1, 0.16]} />
          <meshStandardMaterial
            color={tint}
            emissive={tint}
            emissiveIntensity={glow(hovered, 0.8)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}
    </group>
  )
}
