import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { MODELS } from '../models/index.js'

/**
 * Developer tool: lays every procedural landmark out in a uniform grid, viewed
 * almost orthographically so all twenty-three can be judged at the same scale.
 *
 * Open with `npm run dev` and visit /gallery.html.
 */
const LABELS = {
  'us-capitol': 'Washington, D.C.',
  'statue-of-liberty': 'New York City',
  'golden-gate': 'San Francisco',
  'willis-tower': 'Chicago',
  'capitol-records': 'Los Angeles',
  'grand-canyon': 'Grand Canyon',
  'st-louis-cathedral': 'New Orleans',
  'peace-tower': 'Ottawa',
  'cn-tower': 'Toronto',
  'canada-place': 'Vancouver',
  'calgary-tower': 'Calgary',
  'notre-dame-basilica': 'Montreal',
  'chateau-frontenac': 'Quebec City',
  'banff-peaks': 'Banff',
  'mount-rushmore': 'Mount Rushmore',
  'kennedy-space-center': 'Kennedy Space Center',
  'denali': 'Denali',
  'hoover-dam': 'Hoover Dam',
  'bay-of-fundy': 'Bay of Fundy',
  'iqaluit': 'Iqaluit',
  'gros-morne': 'Gros Morne',
  'churchill': 'Churchill',
  'niagara-falls': 'Niagara Falls',
}

const TINTS = {
  'us-capitol': '#3f8bff',
  'statue-of-liberty': '#3f8bff',
  'golden-gate': '#3f8bff',
  'willis-tower': '#3f8bff',
  'capitol-records': '#3f8bff',
  'grand-canyon': '#3f8bff',
  'st-louis-cathedral': '#3f8bff',
  'peace-tower': '#ff4d5e',
  'cn-tower': '#ff4d5e',
  'canada-place': '#ff4d5e',
  'calgary-tower': '#ff4d5e',
  'notre-dame-basilica': '#ff4d5e',
  'chateau-frontenac': '#ff4d5e',
  'banff-peaks': '#ff4d5e',
  'mount-rushmore': '#3f8bff',
  'kennedy-space-center': '#3f8bff',
  'denali': '#3f8bff',
  'hoover-dam': '#3f8bff',
  'bay-of-fundy': '#ff4d5e',
  'iqaluit': '#ff4d5e',
  'gros-morne': '#ff4d5e',
  'churchill': '#ff4d5e',
  'niagara-falls': '#ffb545',
}

// Grid sized so all twenty-three models fit one frame at this camera distance.
const COLUMNS = 6
const SPACING = 1.6
const DISTANCE = 30

/**
 * `?elev=35` raises the camera so flat landscape features (canyon, falls, peaks)
 * can be judged for relief; the default straight-on view is best for buildings.
 */
function cameraPosition() {
  const elevation = Number(new URLSearchParams(window.location.search).get('elev') || 0)
  const radians = (elevation * Math.PI) / 180
  return [0, DISTANCE * Math.sin(radians) + 2.2, DISTANCE * Math.cos(radians)]
}

/** `?only=niagara-falls` renders one model large and centred, for close inspection. */
function readOnlyParam() {
  return new URLSearchParams(window.location.search).get('only')
}

export default function Gallery() {
  const only = useMemo(readOnlyParam, [])
  const entries = useMemo(
    () => Object.entries(MODELS).filter(([id]) => !only || id === only),
    [only],
  )
  const camera = useMemo(
    () => (only ? [0, 2.6, 5.7] : cameraPosition()),
    [only],
  )

  return (
    <Canvas
      flat
      dpr={[1, 2]}
      camera={{ position: camera, fov: 11, near: 0.1, far: 200 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#02060f']} />
      <ambientLight intensity={1.15} />
      <directionalLight position={[9, 6, 7]} intensity={1.6} />
      <directionalLight position={[-8, -2, -6]} intensity={0.65} color="#4a90ff" />
      <directionalLight position={[2, 10, -9]} intensity={0.5} color="#ff8a5c" />

      <Suspense fallback={null}>
        {entries.map(([id, Model], index) => {
          const column = index % COLUMNS
          const row = Math.floor(index / COLUMNS)
          const x = only ? 0 : (column - (COLUMNS - 1) / 2) * SPACING
          const y = only ? 0 : -row * SPACING + SPACING
          return (
            <group key={id} position={[x, y, 0]}>
              <Model tint={TINTS[id]} hovered={false} />
              <Html position={[0, -0.36, 0]} center style={{ pointerEvents: 'none' }}>
                <div className="gallery-label">
                  {LABELS[id]} <b>· {id}</b>
                </div>
              </Html>
            </group>
          )
        })}
      </Suspense>
    </Canvas>
  )
}
