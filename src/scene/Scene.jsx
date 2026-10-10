import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Earth from './Earth.jsx'
import Starfield from './Starfield.jsx'
import BorderRibbon from './BorderRibbon.jsx'
import CompareLink from './CompareLink.jsx'
import Landmarks from './Landmarks.jsx'
import Markers from './Markers.jsx'
import CameraRig from './CameraRig.jsx'
import { latLngToVector3 } from '../lib/geo.js'
import { TIER, useDeviceTier } from '../lib/device.js'
import { useAtlas } from '../state/AtlasContext.jsx'

/** Open on North America so both countries are framed from the first frame. */
const INITIAL_CAMERA = latLngToVector3(37, -97, 7.6).toArray()

export default function Scene() {
  const { clear } = useAtlas()
  // iPads and phones render this scene at a lighter quality tier: the globe gets
  // fewer segments and the render resolution is capped, which is invisible on a
  // small screen and the difference between smooth and stuttering on a tablet.
  const tier = useDeviceTier()
  const config = TIER[tier]

  return (
    <Canvas
      flat
      dpr={[1, config.maxDpr]}
      camera={{ position: INITIAL_CAMERA, fov: 42, near: 0.1, far: 400 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onPointerMissed={() => clear()}
    >
      <Suspense fallback={null}>
        <Starfield tier={tier} />

        {/*
          The globe is unlit (a raw shader), so all lighting here exists purely to
          shape the landmark models standing on it.
        */}
        <ambientLight intensity={1.15} />
        <directionalLight position={[9, 6, 7]} intensity={1.6} />
        <directionalLight position={[-8, -2, -6]} intensity={0.65} color="#4a90ff" />
        <directionalLight position={[2, 10, -9]} intensity={0.5} color="#ff8a5c" />

        <Earth onGlobeClick={clear} segments={config.globeSegments} />
        <BorderRibbon />
        <CompareLink />
        <Landmarks />
        <Markers />
      </Suspense>

      <CameraRig />
    </Canvas>
  )
}
