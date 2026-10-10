import { useEffect, useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { GLOBE_TUNING } from '../lib/theme.js'
import { latLngToNormal } from '../lib/geo.js'
import { useAtlas } from '../state/AtlasContext.jsx'

const WORLD_UP = new THREE.Vector3(0, 1, 0)
const FLIGHT_SECONDS = 1.05

/**
 * Orbit controls plus a scripted fly-to.
 *
 * Selecting a stop eases the camera onto that stop's surface normal. The look-at
 * target is nudged sideways (wide screens) or downward (narrow screens) so the
 * focused landmark lands in the half of the viewport the HUD panels are not using.
 */
export default function CameraRig() {
  const { selectedStop, autoRotate } = useAtlas()
  const controlsRef = useRef()
  const [flying, setFlying] = useState(false)
  const flight = useRef(null)
  const { camera, size } = useThree()

  useEffect(() => {
    if (!selectedStop) {
      setFlying(false)
      return
    }

    const normal = latLngToNormal(selectedStop.lat, selectedStop.lng)
    const surface = normal.clone().multiplyScalar(GLOBE_TUNING.radius)

    // Screen-space right and north tangents at this point on the sphere.
    const right = new THREE.Vector3().crossVectors(normal, WORLD_UP)
    if (right.lengthSq() < 1e-6) right.set(1, 0, 0)
    right.normalize()
    const north = new THREE.Vector3().crossVectors(right, normal).normalize()

    const narrow = size.width < 900
    const targetPoint = surface.clone()
    if (narrow) {
      // Push the target south so the landmark rides high above the bottom sheet.
      targetPoint.addScaledVector(north, -0.62)
    } else {
      // Push the target east so the landmark sits clear of the right-hand panel.
      targetPoint.addScaledVector(right, 0.42)
    }

    // Approach along the normal, biased so the landmark is lit from the side.
    const approach = normal.clone().addScaledVector(north, 0.32).addScaledVector(right, -0.12)
    const cameraEnd = approach.normalize().multiplyScalar(GLOBE_TUNING.focusDistance)

    flight.current = {
      elapsed: 0,
      cameraFrom: camera.position.clone(),
      cameraTo: cameraEnd,
      targetFrom: (controlsRef.current?.target || new THREE.Vector3()).clone(),
      targetTo: targetPoint,
    }
    setFlying(true)
  }, [selectedStop, camera, size.width])

  useFrame((_, delta) => {
    const state = flight.current
    if (!state) return

    state.elapsed += delta
    const t = Math.min(state.elapsed / FLIGHT_SECONDS, 1)
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    camera.position.lerpVectors(state.cameraFrom, state.cameraTo, eased)
    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(state.targetFrom, state.targetTo, eased)
      controlsRef.current.update()
    }

    if (t >= 1) {
      flight.current = null
      setFlying(false)
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={!flying}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.55}
      zoomSpeed={0.8}
      minDistance={GLOBE_TUNING.minZoomDistance}
      maxDistance={GLOBE_TUNING.maxZoomDistance}
      autoRotate={autoRotate && !selectedStop}
      autoRotateSpeed={0.42}
    />
  )
}
