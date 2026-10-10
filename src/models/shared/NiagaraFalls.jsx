import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Niagara Falls - the shared US/Canada border feature (landscape, animated).
 *
 * A rock escarpment with the curving Horseshoe Falls and the smaller American
 * Falls, rushing streak geometry falling down the face, drifting mist, and two
 * boundary pylons marking the international line: blue for the US, red for Canada.
 *
 * Authoring notes:
 *  - The curtains are partial cylinders whose arc is centred on +Z
 *    (thetaStart = -thetaLength / 2), so the sheet of water faces downstream where
 *    the plunge pool sits and is fully visible from the front.
 *  - The rivers are deliberately narrow (0.80 wide) so the falls, not the water
 *    slabs, dominate the silhouette at globe scale.
 *  - Base at y = 0, crest at y = 0.42, pylon tips at ~y = 0.53.
 *  - Footprint within x/z +/-0.45.
 */
const CREST_Y = 0.42
const POOL_Y = 0.03
const FALL_H = CREST_Y - POOL_Y // 0.39
const FALL_MID = (CREST_Y + POOL_Y) / 2 // 0.225

// Horseshoe Falls: a wide arc wrapped towards +Z.
const HS_RADIUS = 0.23
const HS_LEN = Math.PI * 1.15
const HS_START = -HS_LEN / 2
const HS_Z = 0.04

// American Falls: a smaller, clearly separate curtain further along the crest.
const AF_RADIUS = 0.12
const AF_LEN = Math.PI * 0.55
const AF_START = -AF_LEN / 2
const AF_X = 0.33
const AF_Z = 0.05

/** Streaks hover this far in front of their curtain face. */
const STREAK_OFFSET = 0.026

const WATER = '#12305c'
const WATER_GLOW = '#2f7fc4'
const FOAM = '#e8fbff'
const FOAM_GLOW = '#bff2ff'
const ROCK = '#3a3f47'
const US_BLUE = '#3f8bff'
const CA_RED = '#ff4d5e'

/**
 * Streaks of falling water riding one curtain face.
 * Each streak sits on the same arc as its curtain, nudged forward in z so it reads
 * as water in front of the sheet rather than z-fighting with it.
 */
function FallsStreaks({ radius, thetaStart, thetaLength, z, count, phase = 0, glow }) {
  const refs = useRef([])

  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const theta = thetaStart + (thetaLength * (i + 0.5)) / count
        return {
          key: i,
          x: radius * Math.sin(theta),
          z: z + radius * Math.cos(theta) + STREAK_OFFSET,
          speed: 0.3 + (i % 4) * 0.045,
          start: FALL_H / 2 - (((i * 0.037 + phase) % 1) * FALL_H),
        }
      }),
    [radius, thetaStart, thetaLength, z, count, phase],
  )

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05)
    for (let i = 0; i < items.length; i += 1) {
      const mesh = refs.current[i]
      if (!mesh) continue
      mesh.position.y -= items[i].speed * step
      // Wrap at the pool surface so no streak is drawn below the plunge pool.
      if (mesh.position.y < -FALL_H / 2) mesh.position.y = FALL_H / 2
    }
  })

  return (
    <group>
      {items.map((item, i) => (
        <mesh
          key={item.key}
          ref={(el) => {
            refs.current[i] = el
          }}
          position={[item.x, item.start, item.z]}
        >
          <boxGeometry args={[0.009, 0.17, 0.009]} />
          <meshStandardMaterial
            color={FOAM}
            emissive={FOAM_GLOW}
            emissiveIntensity={1.1 * glow}
            transparent
            opacity={0.85}
            roughness={0.45}
            metalness={0}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Mist plume drifting up out of the plunge pool. */
function Mist({ glow }) {
  const refs = useRef([])

  const puffs = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        key: i,
        x: -0.16 + i * 0.064,
        z: (i % 3) * 0.045,
        radius: 0.025 + (i % 3) * 0.015,
        speed: 0.05 + (i % 4) * 0.012,
        offset: i / 6,
      })),
    [],
  )

  useFrame(({ clock }) => {
    for (let i = 0; i < puffs.length; i += 1) {
      const mesh = refs.current[i]
      if (!mesh) continue
      const puff = puffs[i]
      const t = (clock.elapsedTime * puff.speed + puff.offset) % 1
      mesh.position.y = t * 0.16
      if (mesh.material) mesh.material.opacity = 0.3 * (1 - t) * glow
    }
  })

  return (
    <group position={[0, POOL_Y + 0.02, 0.24]}>
      {puffs.map((puff, i) => (
        <mesh
          key={puff.key}
          ref={(el) => {
            refs.current[i] = el
          }}
          position={[puff.x, 0, puff.z]}
        >
          <sphereGeometry args={[puff.radius, 12, 12]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.9}
            transparent
            opacity={0.22}
            depthWrite={false}
            roughness={0.5}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function NiagaraFalls({ tint = '#ffb545', hovered = false }) {
  const glow = hovered
    ? MATERIAL.emissiveIntensity + MATERIAL.hoverEmissiveBoost
    : MATERIAL.emissiveIntensity

  const stone = { roughness: 0.75, metalness: 0.12 }

  const horseshoe = useMemo(
    () => new THREE.CylinderGeometry(HS_RADIUS, HS_RADIUS, FALL_H, 48, 1, true, HS_START, HS_LEN),
    [],
  )
  const horseshoeInner = useMemo(
    () =>
      new THREE.CylinderGeometry(
        HS_RADIUS * 0.82,
        HS_RADIUS * 0.82,
        FALL_H,
        48,
        1,
        true,
        HS_START,
        HS_LEN,
      ),
    [],
  )
  const american = useMemo(
    () => new THREE.CylinderGeometry(AF_RADIUS, AF_RADIUS, FALL_H, 32, 1, true, AF_START, AF_LEN),
    [],
  )

  return (
    <group>
      {/* upper river, held at the crest */}
      <mesh position={[0, CREST_Y - 0.025, -0.26]}>
        <boxGeometry args={[0.8, 0.05, 0.34]} />
        <meshStandardMaterial
          color={WATER}
          emissive={WATER_GLOW}
          emissiveIntensity={glow * 0.4}
          {...stone}
        />
      </mesh>

      {/* rock escarpment: a main cliff face plus a thinner upper ledge */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.86, 0.34, 0.2]} />
        <meshStandardMaterial
          color={ROCK}
          emissive="#1d2530"
          emissiveIntensity={glow * 0.4}
          {...stone}
        />
      </mesh>
      <mesh position={[0, 0.36, -0.08]}>
        <boxGeometry args={[0.86, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#454b55"
          emissive="#1d2530"
          emissiveIntensity={glow * 0.35}
          {...stone}
        />
      </mesh>

      {/* lower river and plunge pool */}
      <mesh position={[0, POOL_Y - 0.0175, 0.28]}>
        <boxGeometry args={[0.8, 0.035, 0.36]} />
        <meshStandardMaterial
          color={WATER}
          emissive={WATER_GLOW}
          emissiveIntensity={glow * 0.4}
          {...stone}
        />
      </mesh>

      {/* Horseshoe Falls - arc centred on +Z so the water face looks downstream */}
      <group position={[0, FALL_MID, HS_Z]}>
        <mesh geometry={horseshoe}>
          <meshStandardMaterial
            color={FOAM}
            emissive={FOAM_GLOW}
            emissiveIntensity={0.75 * glow}
            side={THREE.DoubleSide}
            roughness={0.35}
            metalness={0}
            transparent
            opacity={0.92}
            toneMapped={false}
          />
        </mesh>
        <mesh geometry={horseshoeInner}>
          <meshStandardMaterial
            color={FOAM}
            emissive={FOAM_GLOW}
            emissiveIntensity={0.5 * glow}
            side={THREE.DoubleSide}
            roughness={0.4}
            metalness={0}
            transparent
            opacity={0.45}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <FallsStreaks
          radius={HS_RADIUS}
          thetaStart={HS_START}
          thetaLength={HS_LEN}
          z={0}
          count={16}
          glow={glow}
        />
      </group>

      {/* American Falls - separate curtain further along the crest */}
      <group position={[AF_X, FALL_MID, AF_Z]}>
        <mesh geometry={american}>
          <meshStandardMaterial
            color={FOAM}
            emissive={FOAM_GLOW}
            emissiveIntensity={0.68 * glow}
            side={THREE.DoubleSide}
            roughness={0.35}
            metalness={0}
            transparent
            opacity={0.9}
            toneMapped={false}
          />
        </mesh>
        <FallsStreaks
          radius={AF_RADIUS}
          thetaStart={AF_START}
          thetaLength={AF_LEN}
          z={0}
          count={7}
          phase={0.4}
          glow={glow}
        />
      </group>

      <Mist glow={glow} />

      {/* international boundary: pylons on each bank, joined by the accent line */}
      {[
        { x: -0.4, color: US_BLUE, key: 'us' },
        { x: 0.4, color: CA_RED, key: 'ca' },
      ].map((pylon) => (
        <group key={pylon.key} position={[pylon.x, CREST_Y, -0.26]}>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.012, 0.016, 0.08, 12]} />
            <meshStandardMaterial
              color="#1b2534"
              emissive={pylon.color}
              emissiveIntensity={glow * 0.6}
              {...stone}
            />
          </mesh>
          <mesh position={[0, 0.097, 0]}>
            <coneGeometry args={[0.019, 0.034, 12]} />
            <meshStandardMaterial
              color={pylon.color}
              emissive={pylon.color}
              emissiveIntensity={2.2}
              roughness={0.4}
              metalness={0}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
      <mesh position={[0, CREST_Y + 0.1, -0.26]}>
        <boxGeometry args={[0.8, 0.006, 0.006]} />
        <meshStandardMaterial
          color={tint}
          emissive={tint}
          emissiveIntensity={2}
          roughness={0.4}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
