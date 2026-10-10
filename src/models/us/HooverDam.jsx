import { useMemo } from 'react'
import * as THREE from 'three'
import { MATERIAL } from '../../lib/theme.js'

/**
 * Hoover Dam, on the Colorado River between Nevada and Arizona.
 *
 * A landscape feature rather than a building, so it uses the wider landscape
 * footprint. The dam is a true arch: a partial cylinder leaning back with radius
 * 0.34 at the crest and 0.30 at the toe, so the water pressure reads as something the
 * curve is resisting. The arc is centred on +Z, which puts the reservoir and its four
 * intake towers behind the wall and the gorge and powerhouse in front of it.
 *
 * The dam is floodlit at night in reality, so warm vertical emissive strips run down
 * the downstream face - that is what stops a plain concrete wall from disappearing
 * against the dark globe.
 *
 * Authored height 0.54 (intake tower caps), footprint within x/z +/-0.64.
 */

const glow = (hovered, factor = 1) =>
  (MATERIAL.emissiveIntensity + (hovered ? MATERIAL.hoverEmissiveBoost : 0)) * factor

const CONCRETE = '#cfc6b8'
const CONCRETE_DARK = '#9c948a'
const ROCK = '#7a6a5c'
const ROCK_DARK = '#5b4e44'
const WATER = '#1d3f63'
const WATER_GLOW = '#2f6c9e'
const FLOODLIGHT = '#ffd9a0'

const DAM_ARC = Math.PI * 0.85
const DAM_TOP_R = 0.34
const DAM_BOTTOM_R = 0.3
const DAM_BOTTOM_Y = 0.04
const DAM_HEIGHT = 0.3
const DAM_TOP_Y = DAM_BOTTOM_Y + DAM_HEIGHT
const WATER_LEVEL = 0.33

/** Floodlit strips down the downstream face. */
const FLOODLIGHT_ANGLES = [-0.32, -0.11, 0.11, 0.32]
/** Crest lamp posts. */
const LAMP_ANGLES = [-0.3, -0.1, 0.1, 0.3]
/**
 * Intake towers, standing in the reservoir behind the crest.
 *
 * These are explicit x/z positions rather than angles on the dam arc: the dam wall
 * reaches z = 0.32 at x = 0 and falls away to z = 0.23 at x = +/-0.22, so anything at
 * z >= 0.35 is safely outside the arch and cannot poke through the concrete.
 */
const TOWERS = [
  { x: -0.15, z: 0.43 },
  { x: -0.05, z: 0.51 },
  { x: 0.05, z: 0.51 },
  { x: 0.15, z: 0.43 },
]

export default function HooverDam({ tint = '#3f8bff', hovered = false }) {
  const { floodlights, lamps, towers, powerhouse } = useMemo(() => {
    const lights = FLOODLIGHT_ANGLES.map((angle) => {
      const radius = 0.288
      return { angle, x: Math.sin(angle) * radius, z: Math.cos(angle) * radius }
    })

    const lampPosts = LAMP_ANGLES.map((angle) => {
      const radius = DAM_TOP_R + 0.004
      return { angle, x: Math.sin(angle) * radius, z: Math.cos(angle) * radius }
    })

    const intakeTowers = TOWERS.map((tower) => ({ ...tower }))

    // Generator hall along the downstream toe of the dam.
    const generators = [-0.15, -0.09, -0.03, 0.03, 0.09, 0.15].map((x) => ({ x }))

    return {
      floodlights: lights,
      lamps: lampPosts,
      towers: intakeTowers,
      powerhouse: generators,
    }
  }, [])

  return (
    <group>
      {/* Gorge floor and the river running away downstream */}
      <mesh position={[0, 0.01, -0.16]}>
        <boxGeometry args={[0.52, 0.02, 0.44]} />
        <meshStandardMaterial
          color={WATER}
          emissive={WATER_GLOW}
          emissiveIntensity={glow(hovered, 0.4)}
          roughness={0.28}
          metalness={0.5}
        />
      </mesh>

      {/* Rock walls framing the gorge; they meet the dam's spring points */}
      {[
        { x: -0.4, tilt: 0.1 },
        { x: 0.4, tilt: -0.1 },
      ].map((wall) => (
        <mesh key={wall.x} position={[wall.x, 0.21, -0.05]} rotation={[0, 0, wall.tilt]}>
          <boxGeometry args={[0.16, 0.42, 0.7]} />
          <meshStandardMaterial
            color={ROCK}
            emissive="#2f2620"
            emissiveIntensity={glow(hovered, 0.28)}
            roughness={0.95}
            metalness={0.04}
            flatShading
          />
        </mesh>
      ))}
      {[
        { x: -0.3, z: 0.12, s: 0.1 },
        { x: 0.31, z: -0.18, s: 0.12 },
      ].map((rock) => (
        <mesh key={`${rock.x}-${rock.z}`} position={[rock.x, rock.s / 2, rock.z]}>
          <dodecahedronGeometry args={[rock.s, 0]} />
          <meshStandardMaterial
            color={ROCK_DARK}
            emissive="#241d18"
            emissiveIntensity={glow(hovered, 0.25)}
            roughness={0.95}
            metalness={0.04}
            flatShading
          />
        </mesh>
      ))}

      {/* The dam wall: a partial cylinder, wider at the crest, leaning back */}
      <mesh position={[0, DAM_BOTTOM_Y + DAM_HEIGHT / 2, 0]}>
        <cylinderGeometry
          args={[DAM_TOP_R, DAM_BOTTOM_R, DAM_HEIGHT, 40, 1, true, -DAM_ARC / 2, DAM_ARC]}
        />
        <meshStandardMaterial
          color={CONCRETE}
          emissive="#6b6155"
          emissiveIntensity={glow(hovered, 0.35)}
          roughness={0.72}
          metalness={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Crest roadway */}
      <mesh position={[0, DAM_TOP_Y + 0.0075, 0]}>
        <cylinderGeometry
          args={[DAM_TOP_R + 0.004, DAM_TOP_R + 0.004, 0.015, 40, 1, true, -DAM_ARC / 2, DAM_ARC]}
        />
        <meshStandardMaterial
          color={CONCRETE_DARK}
          emissive="#4a4470"
          emissiveIntensity={glow(hovered, 0.3)}
          roughness={0.8}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floodlit strips on the downstream face */}
      {floodlights.map((light) => (
        <mesh
          key={light.angle}
          position={[light.x, 0.185, light.z]}
          rotation={[0, light.angle, 0]}
        >
          <boxGeometry args={[0.014, 0.23, 0.006]} />
          <meshStandardMaterial
            color="#3a3428"
            emissive={FLOODLIGHT}
            emissiveIntensity={glow(hovered, 1.2)}
            roughness={0.5}
            metalness={0}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Crest lamp posts, tinted to the marker colour */}
      {lamps.map((lamp) => (
        <group key={lamp.angle} position={[lamp.x, DAM_TOP_Y + 0.015, lamp.z]}>
          <mesh position={[0, 0.017, 0]}>
            <cylinderGeometry args={[0.003, 0.004, 0.034, 6]} />
            <meshStandardMaterial
              color="#8b8477"
              emissive="#3a342b"
              emissiveIntensity={glow(hovered, 0.3)}
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
          <mesh position={[0, 0.038, 0]}>
            <sphereGeometry args={[0.007, 8, 6]} />
            <meshStandardMaterial
              color={tint}
              emissive={tint}
              emissiveIntensity={glow(hovered, 2.2)}
              roughness={0.4}
              metalness={0}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      {/*
        Reservoir held at crest height behind the arch.
        A flat box rather than a disc: its leading edge at z = 0.35 clears the dam wall
        at every x, so no part of the water surface crosses the concrete.
      */}
      <mesh position={[0, WATER_LEVEL, 0.5]}>
        <boxGeometry args={[0.44, 0.012, 0.3]} />
        <meshStandardMaterial
          color={WATER}
          emissive={WATER_GLOW}
          emissiveIntensity={glow(hovered, 0.5)}
          roughness={0.22}
          metalness={0.55}
        />
      </mesh>

      {/* Four intake towers standing in the reservoir */}
      {towers.map((tower) => (
        <group key={`${tower.x}-${tower.z}`} position={[tower.x, 0, tower.z]}>
          <mesh position={[0, 0.42, 0]}>
            <cylinderGeometry args={[0.022, 0.024, 0.2, 14]} />
            <meshStandardMaterial
              color={CONCRETE}
              emissive="#6b6155"
              emissiveIntensity={glow(hovered, 0.35)}
              roughness={0.72}
              metalness={0.06}
            />
          </mesh>
          <mesh position={[0, 0.535, 0]}>
            <sphereGeometry args={[0.024, 12, 10]} />
            <meshStandardMaterial
              color={CONCRETE_DARK}
              emissive={tint}
              emissiveIntensity={glow(hovered, 0.7)}
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Generator hall along the downstream toe */}
      {powerhouse.map((unit) => (
        <mesh key={unit.x} position={[unit.x, 0.07, -0.3]}>
          <boxGeometry args={[0.05, 0.09, 0.07]} />
          <meshStandardMaterial
            color={CONCRETE_DARK}
            emissive="#3d3830"
            emissiveIntensity={glow(hovered, 0.3)}
            roughness={0.78}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* Spillway chutes carrying water away from the crest */}
      {[-0.13, 0.13].map((x) => (
        <mesh key={x} position={[x, 0.14, -0.2]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[0.05, 0.018, 0.26]} />
          <meshStandardMaterial
            color="#dff4ff"
            emissive="#a8e8ff"
            emissiveIntensity={glow(hovered, 0.9)}
            roughness={0.3}
            metalness={0.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}
