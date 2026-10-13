import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useAtlas } from '../state/AtlasContext.jsx'
import { GLOBE_TUNING, KINDS, MODEL_TUNING, NATION, PALETTE } from '../lib/theme.js'
import { latLngToNormal, latLngToVector3, surfaceQuaternion } from '../lib/geo.js'
import { modelHeightFor } from '../models/index.js'
import { codeOf } from '../data/locations.js'

/** Fallback label box, used only if a label has no layout box to measure yet. */
const LABEL_HEIGHT = 26
/**
 * Breathing room between two name plates, in screen pixels. Four covers the few
 * pixels of vertical offset the label's own CSS adds; the extra margin absorbs the
 * small frame-to-frame wobble while the camera is still settling after load.
 */
const LABEL_PAD = 8


/**
 * Holographic beacon layer.
 *
 * All twenty-three beacons sit inside one continent, so drawn naively their name plates
 * pile on top of each other. A single frame-loop pass here projects every beacon to
 * screen space and greedily claims space for the ones that matter - the focused or
 * hovered beacon always wins, then whichever beacons are nearest the camera - and
 * drops the rest, so the names never overlap.
 *
 * The pass measures each label's box rather than estimating it: guessing the width from
 * the character count ran about 20px narrow and let two labels overlap, which put a
 * name plate on top of a neighbour and made the wrong beacon the one you could tap.
 * It also projects where the LABEL sits, not where the landmark stands - the name plate
 * floats above the model by that stop's own height, so anchor-based boxes were wrong by
 * tens of pixels.
 *
 * The readout chrome above the canvas does not swallow taps (see global.css), so a
 * label tucked behind the top strip stays tappable at its own centre.
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

      // Project where the LABEL is, not where the landmark stands: the name plate
      // floats above the model by each stop's own height, and comparing boxes at
      // the anchor let labels overlap by tens of pixels.
      projected.copy(entry.label || entry.anchor).project(camera)
      const projectedX = (projected.x * 0.5 + 0.5) * size.width
      const projectedY = (-projected.y * 0.5 + 0.5) * size.height

      // The label is centred on the projected point by drei and nudged up a few
      // pixels by its own CSS, which LABEL_PAD already covers. So the box is that
      // point plus the label's measured size - not an estimate from the character
      // count, which ran about 20px narrow and is exactly how two labels that the
      // pass believed were clear ended up on top of each other.
      //
      // The size is read every frame rather than cached. offsetWidth is a layout
      // metric and nothing in the frame loop dirties layout (drei writes transforms,
      // which are compositor-only), so the read is cheap - and reading it live means
      // the boxes are correct even while the webfonts are still swapping in and
      // every label's width is changing under us.
      const width = element.offsetWidth || entry.estWidth
      const height = element.offsetHeight || LABEL_HEIGHT

      candidates.push({
        element,
        x: projectedX,
        y: projectedY,
        distance,
        width,
        height,
        // Focused beacons outrank everything, then whichever is nearest the lens.
        rank: entry.active ? 2 : 1,
      })
    }

    candidates.sort((a, b) => b.rank - a.rank || a.distance - b.distance)

    for (const candidate of candidates) {
      const { x, y, width, height } = candidate
      const left = x - width / 2
      const right = x + width / 2
      const top = y - height / 2
      const bottom = y + height / 2

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
        claims.current.push({ left, right, top, bottom })
      }
      setVisible(candidate.element, shows)
    }
  })

  return null
}

/*
 * Show or hide one name plate.
 *
 * Opacity and pointer-events are written independently on purpose. A plate the
 * declutter pass drops on the very first frame is already `opacity: 0` from its own
 * style prop, so a guard that treats pointer-events as a rider of the opacity write
 * skipped it: the plate stayed `pointer-events: auto` from CSS while invisible, still
 * on top of a neighbour and taking its click. Measured: a hidden Niagara Falls plate
 * covered the Toronto plate's own centre, and a click aimed at the plate reading
 * Chicago entered Niagara Falls. An invisible plate must eat neither clicks nor hover.
 */
function setVisible(element, visible) {
  const opacity = visible ? '1' : '0'
  const pointerEvents = visible ? 'auto' : 'none'
  if (element.style.opacity !== opacity) element.style.opacity = opacity
  if (element.style.pointerEvents !== pointerEvents) element.style.pointerEvents = pointerEvents
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

  /*
   * Held down, so a plate answers a finger the way it answers a cursor with a hover.
   * It is React state rather than a CSS `:active` rule on purpose: a plate is a div
   * whose click React handles by delegation, and WebKit only paints `:active` for
   * elements it judges clickable, which is exactly the judgement that differs between
   * desktop and iPad.
   */
  const [pressed, setPressed] = useState(false)

  /*
   * The release is caught on the window, not only on the plate. A plate can be hidden
   * by the declutter pass mid-press - which sets it `pointer-events: none`, so the
   * pointerup never reaches it - and the plate would then hold its pressed look until
   * it happened to come back into view and be touched again.
   */
  useEffect(() => {
    if (!pressed) return undefined
    const release = () => setPressed(false)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    return () => {
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }
  }, [pressed])

  const height = modelHeightFor(stop.model)
  const surface = useMemo(
    () => latLngToVector3(stop.lat, stop.lng, GLOBE_TUNING.radius + MODEL_TUNING.lift),
    [stop.lat, stop.lng],
  )
  const quaternion = useMemo(() => surfaceQuaternion(stop.lat, stop.lng), [stop.lat, stop.lng])
  const normal = useMemo(() => latLngToNormal(stop.lat, stop.lng), [stop.lat, stop.lng])

  // How far above the surface this stop's name plate floats, in model units.
  const labelLift = height + 0.26

  // Stable entry the declutter pass reads every frame.
  const entry = useMemo(
    () => ({
      element: null,
      anchor: surface,
      // Where the name plate actually floats, used for the on-screen collision box.
      label: surface.clone().addScaledVector(normal, labelLift),
      normal,
      active: false,
      estWidth: 96,
    }),
    [surface, normal, labelLift],
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
  // The focused stop takes the palette's green: amber is the shared-border tint here,
  // so a beacon lit amber read as one more border pip rather than as the chosen one.
  const ringColour = isSelected ? PALETTE.green : nation.base

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
              pressed ? 'is-pressed' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              '--marker-tint': nation.base,
              '--marker-glow': nation.glow,
              opacity: 0,
              transition: 'opacity 140ms linear',
            }}
            /*
             * Only a pointer that can hover may light a plate up. A touch tap fires
             * an emulated hover on WebKit and there is no matching "out" when the
             * finger lifts, so the touched plate would stay lit - and its landmark
             * stay grown - until something else was tapped. On a tablet the press
             * below is the feedback instead.
             */
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') setHoveredId(stop.id)
            }}
            onPointerLeave={(event) => {
              setPressed(false)
              if (event.pointerType !== 'mouse') return
              setHoveredId((current) => (current === stop.id ? null : current))
            }}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
            onPointerCancel={() => setPressed(false)}
            /*
             * A name plate is DOM living inside the canvas' own subtree, so the
             * canvas' click handler sees this click too. It finds no 3D object under
             * the cursor and reports a miss, which closes the stop the label just
             * opened - measured: the reading panel appeared and was gone 2ms later.
             * Stopping the click here keeps it the label's own; the model's own
             * click needs no such guard because the ray does hit it.
             */
            onClick={(event) => {
              event.stopPropagation()
              select(stop.id)
            }}
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
