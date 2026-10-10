import { useMemo } from 'react'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Willis Tower (formerly Sears Tower), Chicago.
 *
 * The bundled-tube silhouette: nine square tubes on a 3x3 grid, stepped down in the
 * classic diagonal setback profile, capped by two broadcast masts.
 *
 * Two things make the silhouette read:
 *   - real gaps between the tubes (0.045 of daylight), so nine shafts are visible
 *     rather than one merged slab, and
 *   - a distinct roof cap on every tube, in a tone that gets lighter as the tube gets
 *     taller. The globe is usually viewed from directly overhead, and from overhead
 *     the stepped roof plan is the only thing you can see.
 *
 * Authored base-at-y=0, total height 1.0, footprint within +/-0.36.
 */

const glow = (hovered, factor = 1) =>
  (MATERIAL.emissiveIntensity + (hovered ? MATERIAL.hoverEmissiveBoost : 0)) * factor

/** Tube height grid indexed [i][j]: i is the x index, j the z index. Index 2 is the tall north-west corner. */
const HEIGHTS = [
  [0.58, 0.58, 0.58],
  [0.74, 0.74, 0.58],
  [0.90, 0.90, 0.74],
]

/** Roof-cap tone per tube height - the tallest tube gets the lightest roof. */
const CAP_TONE = {
  0.58: '#3a4a5e',
  0.74: '#46586e',
  0.90: '#55697f',
}

const TUBE = 0.19
const SPACING = 0.235
const PLINTH_TOP = 0.04
const PLINTH_SIZE = 0.72
const CAP_SIZE = 0.205
const CAP_HEIGHT = 0.013

/** Floors where a lit band wraps every tube (the window glow). */
const BAND_LEVELS = [0.26, 0.5, 0.72]
const BAND_FACTOR = 0.45

const MAST_TOP = 1.0

export default function WillisTower({ tint = '#3f8bff', hovered = false }) {
  const { tubes, bands, beacons, masts, mastBase } = useMemo(() => {
    // Index 0 sits at +x so the tallest tube (index 2) lands on the north-west corner.
    const axis = (i) => (1 - i) * SPACING

    const t = []
    const b = []
    const k = []
    const m = []
    let tallest = 0

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const x = axis(i)
        const z = axis(j)
        const h = HEIGHTS[i][j]
        const top = PLINTH_TOP + h
        t.push({ x, z, h, top, cap: CAP_TONE[h] || CAP_TONE[0.58] })

        BAND_LEVELS.forEach((y) => {
          if (y < top - 0.03) b.push({ x, z, y })
        })

        // Aircraft warning beacons on every setback roof above the mid-height.
        if (h >= 0.74) k.push({ x, y: top + CAP_HEIGHT + 0.009, z })

        // Twin broadcast masts rise off the two tallest tubes.
        if (h === HEIGHTS[2][0]) m.push({ x, z })

        if (h > tallest) tallest = h
      }
    }

    return { tubes: t, bands: b, beacons: k, masts: m, mastBase: PLINTH_TOP + tallest }
  }, [])

  return (
    <group>
      {/* Podium */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[PLINTH_SIZE, 0.04, PLINTH_SIZE]} />
        <meshStandardMaterial
          color="#2a3442"
          emissive="#8fb6f0"
          emissiveIntensity={glow(hovered, 0.25)}
          roughness={MATERIAL.roughness}
          metalness={MATERIAL.metalness}
        />
      </mesh>

      {/* The nine bundled tubes, standing clear of one another */}
      {tubes.map((tube, i) => (
        <mesh key={i} position={[tube.x, PLINTH_TOP + tube.h / 2, tube.z]}>
          <boxGeometry args={[TUBE, tube.h, TUBE]} />
          <meshStandardMaterial
            // Dark glass. The emissive must stay cool and very low: on a base this
            // dark a warm emissive dominates the linear-to-sRGB conversion and the
            // whole tower turns brown. The pop comes from the tinted floor bands.
            color="#0e1725"
            emissive="#5f8fc4"
            emissiveIntensity={glow(hovered, 0.1)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}

      {/* Rolled roof cap on every tube - this is what carries the stepped plan from above */}
      {tubes.map((tube, i) => (
        <mesh key={`cap-${i}`} position={[tube.x, tube.top + CAP_HEIGHT / 2, tube.z]}>
          <boxGeometry args={[CAP_SIZE, CAP_HEIGHT, CAP_SIZE]} />
          <meshStandardMaterial
            color={tube.cap}
            emissive="#9fc4e2"
            emissiveIntensity={glow(hovered, 0.3)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}

      {/* Lit floor bands - kept subtle so they do not slice the silhouette in half */}
      {bands.map((band, i) => (
        <mesh key={`band-${i}`} position={[band.x, band.y, band.z]}>
          <boxGeometry args={[TUBE + 0.006, 0.012, TUBE + 0.006]} />
          <meshStandardMaterial
            color="#101820"
            emissive={tint}
            emissiveIntensity={glow(hovered, BAND_FACTOR)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
          />
        </mesh>
      ))}

      {/* Roof-level warning beacons */}
      {beacons.map((p, i) => (
        <mesh key={`beacon-${i}`} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.008, 10, 8]} />
          <meshStandardMaterial
            color="#ff4d4d"
            emissive="#ff2f2f"
            emissiveIntensity={glow(hovered, 2.2)}
            roughness={MATERIAL.roughness}
            metalness={MATERIAL.metalness}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Twin masts */}
      {masts.map((p, i) => (
        <group key={`mast-${i}`} position={[p.x, 0, p.z]}>
          <mesh position={[0, (mastBase + MAST_TOP) / 2, 0]}>
            <cylinderGeometry args={[0.015, 0.019, MAST_TOP - mastBase, 12]} />
            <meshStandardMaterial
              color="#e8eef5"
              emissive="#cfe0ff"
              emissiveIntensity={glow(hovered, 0.9)}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
            />
          </mesh>
          <mesh position={[0, MAST_TOP, 0]}>
            <sphereGeometry args={[0.011, 10, 8]} />
            <meshStandardMaterial
              color="#ff4d4d"
              emissive="#ff2f2f"
              emissiveIntensity={glow(hovered, 2.4)}
              roughness={MATERIAL.roughness}
              metalness={MATERIAL.metalness}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
