import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import { GLOBE_TUNING, NATION, PALETTE } from '../lib/theme.js'
import { greatCirclePoints } from '../lib/geo.js'
import { useAtlas } from '../state/AtlasContext.jsx'

/**
 * When a stop is selected, arc it to the city it is being compared against.
 * The pair is the whole point of Intermaptic, so the link is drawn even though the
 * two stops are usually a thousand miles apart.
 */
export default function CompareLink() {
  const { selectedStop, counterpart, showLink } = useAtlas()

  const points = useMemo(() => {
    if (!selectedStop || !counterpart || selectedStop.id === counterpart.id) return null
    return greatCirclePoints(selectedStop, counterpart, 72, GLOBE_TUNING.radius + 0.02)
  }, [selectedStop, counterpart])

  if (!showLink || !points) return null

  return (
    <group>
      <Line
        points={points}
        color={PALETTE.line}
        lineWidth={2.1}
        dashed
        dashSize={0.07}
        gapSize={0.05}
        transparent
        opacity={0.85}
        depthWrite={false}
      />
      {/* A dimmer solid core so the link stays visible when the dashes are thin. */}
      <Line
        points={points}
        color={NATION[selectedStop.country].glow}
        lineWidth={0.9}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </group>
  )
}
