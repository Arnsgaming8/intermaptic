import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useAtlas } from '../state/AtlasContext.jsx'
import { GLOBE_TUNING, KINDS, MODEL_TUNING, NATION, PALETTE } from '../lib/theme.js'
import { latLngToNormal, latLngToVector3, surfaceQuaternion } from '../lib/geo.js'
import { modelHeightFor } from '../models/index.js'
import { codeOf } from '../data/locations.js'

/** Approximate on-screen label box, used by the declutter pass. */
const LABEL_HEIGHT = 26
const LABEL_PAD = 4

/**
 * Holographic beacon layer.
 *
 * All twenty-three beacons sit inside one continent, so drawn naively their name plates
 * pile on top of each other. A single frame-loop pass here projects every beacon to
 * screen space and greedily claims space for the ones that matter - the focused or
 * hovered beacon always wins, then whichever beacons are nearest the camera - and
 * drops the rest, so the names never overlap.
 *
 * NOTE ON <Html>: drei renders Html children into a separate React root, so R3F
 * hooks are NOT available inside them. The declutter loop therefore runs here, in the
 * Canvas tree, and reaches each DOM label through a ref held in the registry.
 */
export default function Markers() {
  const { visibleStops } = useAtlas()
  const registry = useRef(new Map())

  const register = useCallback((id, entry) => {
    if (entry) registry.current.set(id, entry)
    else registry.current.delete(id)
  }, [])

  return (
    <group>
      {visibleStops.map((stop) => (
        <Marker key={stop.id} stop={stop} register={register} />
      ))}
      <LabelDeclutter registry={registry} />
    </group>
  )
}

/** One pass per frame: project, prioritise, claim screen space, toggle labels. */
function LabelDeclutter({ registry }) {
  const { camera, size } = useThree()
  const projected = useMemo(() => new THREE.Vector3(), [])
  const toCamera = useMemo(() => new THREE.Vector3(), [])
  const claims = useRef([])

  useFrame(() => {
    const entries = [...registry.current.values()]
    const candidates = []
    claims.current.length = 0

    for (const entry of entries) {
      const element = entry.element
      if (!element) continue

      toCamera.copy(camera.position).sub(entry.anchor)
      const distance = toCamera.length()
      const facing = entry.normal.dot(toCamera.normalize())

      // Behind the horizon, or so far away the name would be meaningless.
      if (facing < 0.12 || distance > 7.2) {
        setVisible(element, false)
        continue
      }

      projected.copy(entry.anchor).project(camera)
      const x = (projected.x * 0.5 + 0.5) * size.width
      const y = (-projected.y * 0.5 + 0.5) * size.height

      candidates.push({
        element,
        x,
        y,
        distance,
        width: entry.estWidth,
        // Focused beacons outrank everything, then whichever is nearest the lens.
        rank: entry.active ? 2 : 1,
      })
    }

    candidates.sort((a, b) => b.rank - a.rank || a.distance - b.distance)

    for (const candidate of candidates) {
      const { x, y, width } = candidate
      const left = x - width / 2
      const right = x + width / 2
      const top = y - LABEL_HEIGHT / 2
      const bottom = y + LABEL_HEIGHT / 2

      const offscreen =
        x < -40 || x > size.width + 40 || y < -40 || y > size.height + 40

      const collides = claims.current.some(
        (claim) =>
          left < claim.right + LABEL_PAD &&
          right > claim.left - LABEL_PAD &&
          top < claim.bottom + LABEL_PAD &&
          bottom > claim.top - LABEL_PAD,
      )

      const shows = !offscreen && (candidate.rank === 2 || !collides)
      if (shows) {
        claims.current.push({ left: x - width / 2, right: x + width / 2, top: y - LABEL_HEIGHT / 2, bottom: y + LABEL_HEIGHT / 2 })
      }
      setVisible(candidate.element, shows)
    }
  })

  return null
}

function setVisible(element, visible) {
  const opacity = visible ? '1' : '0'
  if (element.style.opacity !== opacity) {
    element.style.opacity = opacity
    element.style.pointerEvents = visible ? 'auto' : 'none'
  }
}

function Marker({ stop, register }) {
  const { hoveredId, selectedId, setHoveredId, select, showLabels } = useAtlas()
  const nation = NATION[stop.country]
  const kind = KINDS[stop.kind] || KINDS.geography
  const code = codeOf(stop)
  const isHovered = hoveredId === stop.id
  const isSelected = selectedId === stop.id
  const highlighted = isHovered || isSelected

  const elementRef = useRef(null)

  const height = modelHeightFor(stop.model)
  const surface = useMemo(
    () => latLngToVector3(stop.lat, stop.lng, GLOBE_TUNING.radius + MODEL_TUNING.lift),
    [stop.lat, stop.lng],
  )
  const quaternion = useMemo(() => surfaceQuaternion(stop.lat, stop.lng), [stop.lat, stop.lng])
  const normal = useMemo(() => latLngToNormal(stop.lat, stop.lng), [stop.lat, stop.lng])

  // Stable entry the declutter pass reads every frame.
  const entry = useMemo(
    () => ({ element: null, anchor: surface, normal, active: false, estWidth: 96 }),
    [surface, normal],
  )

  useEffect(() => {
    if (!showLabels) {
      register(stop.id, null)
      return undefined
    }
    register(stop.id, entry)
    return () => register(stop.id, null)
  }, [register, stop.id, entry, showLabels])

  // Refresh the per-frame inputs without re-registering.
  entry.active = highlighted
  entry.estWidth = 74 + code.length * 7 + stop.name.length * 6.6

  const stemBase = height + 0.02
  const stemTop = height + 0.20
  const labelLift = height + 0.26
  const ringColour = isSelected ? PALETTE.amber : nation.base

  return (
    <group position={surface} quaternion={quaternion}>
      {/* Surface ring, sitting just proud of the globe so it never z-fights. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]}>
        <ringGeometry args={[0.052, 0.068, 40]} />
        <meshBasicMaterial
          color={ringColour}
          transparent
          opacity={highlighted ? 0.95 : 0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Slow outward pulse while the beacon is focused. */}
      <Halo active={highlighted} colour={ringColour} />

      {/* Pin stem, drawn above the landmark so it never cuts through the model. */}
      <mesh position={[0, (stemBase + stemTop) / 2, 0]}>
        <cylinderGeometry args={[0.0035, 0.0035, stemTop - stemBase, 6]} />
        <meshBasicMaterial
          color={nation.base}
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, stemTop, 0]}>
        <sphereGeometry args={[0.014, 12, 12]} />
        <meshBasicMaterial
          color={ringColour}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Generous invisible tap target - the ring itself is far too small on a phone. */}
      <mesh
        position={[0, height * 0.6, 0]}
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
        <cylinderGeometry args={[0.09, 0.09, Math.max(height, 0.34) * 1.2, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {showLabels ? (
        <Html
          position={[0, labelLift, 0]}
          center
          zIndexRange={[8, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            ref={(node) => {
              elementRef.current = node
              entry.element = node
            }}
            className={[
              'marker-label',
              `marker-label--${stop.country}`,
              isSelected ? 'is-selected' : '',
              isHovered ? 'is-hovered' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              '--marker-tint': nation.base,
              '--marker-glow': nation.glow,
              opacity: 0,
              transition: 'opacity 140ms linear',
            }}
            onPointerEnter={() => setHoveredId(stop.id)}
            onPointerLeave={() => setHoveredId((current) => (current === stop.id ? null : current))}
            onClick={() => select(stop.id)}
          >
            <span className="marker-label__kind" aria-hidden="true">
              {kind.icon}
            </span>
            <span className="marker-label__code">{code}</span>
            <span className="marker-label__name">{stop.name}</span>
          </div>
        </Html>
      ) : null}
    </group>
  )
}

/** Expanding holographic halo ring, re-triggered continuously while focused. */
function Halo({ active, colour }) {
  const meshRef = useRef(null)

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    if (!active) {
      mesh.visible = false
      return
    }
    mesh.visible = true
    const t = (state.clock.elapsedTime * 0.8) % 1
    const scale = 1 + t * 2.8
    mesh.scale.set(scale, scale, 1)
    if (mesh.material) mesh.material.opacity = 0.6 * (1 - t) * (1 - t)
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]} visible={false}>
      <ringGeometry args={[0.075, 0.09, 40]} />
      <meshBasicMaterial
        color={colour}
        transparent
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
