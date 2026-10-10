import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import { BORDER_SEGMENTS } from '../data/border.js'
import { GLOBE_TUNING, PALETTE } from '../lib/theme.js'
import { greatCirclePoints } from '../lib/geo.js'
import { useAtlas } from '../state/AtlasContext.jsx'

/**
 * The 49th parallel, the Great Lakes corridor, the eastern highlands and the
 * Alaska-Yukon line, drawn as a dashed amber ribbon just above the globe surface.
 */
export default function BorderRibbon() {
  const { showBorder } = useAtlas()

  const segments = useMemo(
    () =>
      BORDER_SEGMENTS.map((segment) => {
        const points = []
        for (let i = 0; i < segment.points.length - 1; i += 1) {
          const steps = greatCirclePoints(
            segment.points[i],
            segment.points[i + 1],
            14,
            GLOBE_TUNING.radius + 0.008,
          )
          // Skip the duplicated joint between consecutive legs.
          points.push(...(i === 0 ? steps : steps.slice(1)))
        }
        return { id: segment.id, points }
      }),
    [],
  )

  if (!showBorder) return null

  return (
    <group>
      {segments.map((segment) => (
        <Line
          key={segment.id}
          points={segment.points}
          color={PALETTE.amber}
          lineWidth={1.7}
          dashed
          dashSize={0.055}
          gapSize={0.04}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      ))}
    </group>
  )
}
