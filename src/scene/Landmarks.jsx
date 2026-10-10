import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useAtlas } from '../state/AtlasContext.jsx'
import { GLOBE_TUNING, MODEL_TUNING, NATION } from '../lib/theme.js'
import { latLngToNormal, latLngToVector3, surfaceQuaternion } from '../lib/geo.js'
import { getModel, modelScaleFor } from '../models/index.js'

/**
 * Places every procedural landmark on the globe.
 *
 * Each model is authored standing on its own local y = 0 plane, so the only work
 * here is to stand the group on the surface normal and size it. Hovering and
 * selecting ease the model larger, which - together with the emissive materials -
 * is what makes the landmarks dominate the deliberately dark globe behind them.
 *
 * Two rules keep a field of twenty-three landmarks from reading as clutter, both
 * applied per frame in the group's own frame loop: models on the far side of the
 * globe are not drawn at all, and every model is eased between a small far scale
 * and its full near scale according to how close the camera is (MODEL_TUNING).
 */
export default function Landmarks() {
  const { visibleStops } = useAtlas()
  return (
    <group>
      {visibleStops.map((stop) => (
        <Landmark key={stop.id} stop={stop} />
      ))}
    </group>
  )
}

function Landmark({ stop }) {
  const { hoveredId, selectedId, setHoveredId, select } = useAtlas()
  const { camera } = useThree()
  const groupRef = useRef()
  const toCamera = useMemo(() => new THREE.Vector3(), [])
  const Model = getModel(stop.model)
  const nation = NATION[stop.country]

  const baseScale = modelScaleFor(stop.model)
  const isHovered = hoveredId === stop.id
  const isSelected = selectedId === stop.id

  // The North-American beacons sit closer together than their monuments are wide, so
  // selecting one drops the rest of the field back a step to clear the view.
  const targetScale = useMemo(() => {
    let scale = baseScale
    if (isHovered) scale *= 1.20
    if (isSelected) scale *= 1.12
    else if (selectedId) scale *= MODEL_TUNING.dimmedScale
    return scale
  }, [baseScale, isHovered, isSelected, selectedId])

  const position = useMemo(
    () => latLngToVector3(stop.lat, stop.lng, GLOBE_TUNING.radius + MODEL_TUNING.lift),
    [stop.lat, stop.lng],
  )
  const quaternion = useMemo(() => surfaceQuaternion(stop.lat, stop.lng), [stop.lat, stop.lng])
  const normal = useMemo(() => latLngToNormal(stop.lat, stop.lng), [stop.lat, stop.lng])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    // Far-side culling. Anything behind the horizon is masked by the globe itself,
    // so drawing it only costs a tablet frames; -0.02 rather than 0 means a model
    // is not dropped while it is still a sliver on the limb.
    toCamera.copy(camera.position).sub(position)
    const distance = toCamera.length()
    group.visible = normal.dot(toCamera.normalize()) > -0.02
    if (!group.visible) return

    // Ease between the small far scale and full size as the camera comes in.
    const reveal = THREE.MathUtils.clamp(
      (MODEL_TUNING.globeDistance - distance) /
        (MODEL_TUNING.globeDistance - MODEL_TUNING.closeDistance),
      0,
      1,
    )
    const target =
      targetScale * (MODEL_TUNING.farScale + (1 - MODEL_TUNING.farScale) * reveal)

    // Frame-rate independent easing toward the target scale.
    const k = 1 - Math.pow(0.0015, Math.min(delta, 0.1))
    const next = group.scale.x + (target - group.scale.x) * k
    group.scale.setScalar(next)
  })

  if (!Model) return null

  return (
    <group
      ref={groupRef}
      position={position}
      quaternion={quaternion}
      scale={baseScale}
      onPointerOver={(event) => {
        event.stopPropagation()
        setHoveredId(stop.id)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        setHoveredId((current) => (current === stop.id ? null : current))
      }}
      onClick={(event) => {
        event.stopPropagation()
        select(stop.id)
      }}
    >
      <Model tint={nation.base} hovered={isHovered || isSelected} />

      {/* Contact glow puddle, so each landmark reads as anchored to the surface. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <circleGeometry args={[0.34, 32]} />
        <meshBasicMaterial
          color={nation.base}
          transparent
          opacity={isHovered || isSelected ? 0.22 : 0.1}
          depthWrite={false}
          blending={2}
        />
      </mesh>
    </group>
  )
}
