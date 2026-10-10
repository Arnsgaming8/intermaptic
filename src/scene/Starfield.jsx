import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TIER } from '../lib/device.js'

/**
 * Deep-space backdrop: a gradient nebula shell, three layers of stars at different
 * depths, and a slow drift so the sky never feels static.
 * Star counts come from the shared device tier, so a tablet draws far fewer of them.
 */
export default function Starfield({ tier = 'high' }) {
  const groupRef = useRef()
  const [near, mid, far] = (TIER[tier] || TIER.high).stars

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.0055
      groupRef.current.rotation.x = Math.sin(performance.now() * 0.00004) * 0.06
    }
  })

  return (
    <group ref={groupRef}>
      <NebulaShell />
      <StarLayer count={near} radius={46} size={0.075} colour="#dff2ff" />
      <StarLayer count={mid} radius={70} size={0.11} colour="#a8cfff" />
      <StarLayer count={far} radius={92} size={0.16} colour="#ffd9b0" />
    </group>
  )
}

function StarLayer({ count, radius, size, colour }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scale = new Float32Array(count)
    for (let i = 0; i < count; i += 1) {
      // Deterministic spherical distribution so the sky is identical every reload.
      const u = pseudoRandom(i * 3 + 1) * 2 - 1
      const theta = pseudoRandom(i * 3 + 2) * Math.PI * 2
      const r = radius * (0.75 + pseudoRandom(i * 3 + 3) * 0.5)
      const s = Math.sqrt(1 - u * u)
      positions[i * 3] = Math.cos(theta) * s * r
      positions[i * 3 + 1] = u * r
      positions[i * 3 + 2] = Math.sin(theta) * s * r
      scale[i] = size * (0.35 + pseudoRandom(i * 7 + 5) * 1.5)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aScale', new THREE.BufferAttribute(scale, 1))
    return geo
  }, [count, radius, size])

  return (
    <points geometry={geometry}>
      <shaderMaterial
        uniforms={{
          uColour: { value: new THREE.Color(colour) },
          uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
        }}
        vertexShader={/* glsl */ `
          uniform float uPixelRatio;
          attribute float aScale;
          varying float vScale;
          void main() {
            vScale = aScale;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aScale * 90.0 * uPixelRatio / max(-mvPosition.z, 0.001);
            gl_PointSize = clamp(gl_PointSize, 0.6, 14.0);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColour;
          varying float vScale;
          void main() {
            vec2 d = gl_PointCoord - vec2(0.5);
            float dist = length(d);
            if (dist > 0.5) discard;
            float core = smoothstep(0.5, 0.0, dist);
            float glow = pow(core, 2.2);
            gl_FragColor = vec4(uColour, glow);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** A large inverted sphere with a vertical nebula gradient. */
function NebulaShell() {
  return (
    <mesh scale={-1} rotation={[0, 0, 0.35]}>
      <sphereGeometry args={[140, 32, 32]} />
      <shaderMaterial
        uniforms={{
          uTop: { value: new THREE.Color('#03060f') },
          uBottom: { value: new THREE.Color('#0a0618') },
          uGlow: { value: new THREE.Color('#12406b') },
        }}
        vertexShader={/* glsl */ `
          varying vec3 vPos;
          void main() {
            vPos = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uTop;
          uniform vec3 uBottom;
          uniform vec3 uGlow;
          varying vec3 vPos;

          float hash(vec3 p) {
            return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
          }

          float noise(vec3 p) {
            vec3 i = floor(p);
            vec3 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float n000 = hash(i);
            float n100 = hash(i + vec3(1.0, 0.0, 0.0));
            float n010 = hash(i + vec3(0.0, 1.0, 0.0));
            float n110 = hash(i + vec3(1.0, 1.0, 0.0));
            float n001 = hash(i + vec3(0.0, 0.0, 1.0));
            float n101 = hash(i + vec3(1.0, 0.0, 1.0));
            float n011 = hash(i + vec3(0.0, 1.0, 1.0));
            float n111 = hash(i + vec3(1.0, 1.0, 1.0));
            float nx00 = mix(n000, n100, f.x);
            float nx10 = mix(n010, n110, f.x);
            float nx01 = mix(n001, n101, f.x);
            float nx11 = mix(n011, n111, f.x);
            return mix(mix(nx00, nx10, f.y), mix(nx01, nx11, f.y), f.z);
          }

          void main() {
            float t = vPos.y * 0.5 + 0.5;
            vec3 colour = mix(uBottom, uTop, t);
            float clouds = noise(vPos * 3.2) * 0.55 + noise(vPos * 7.5) * 0.32;
            float band = smoothstep(0.42, 0.9, clouds) * (0.35 + 0.65 * (1.0 - abs(vPos.y)));
            colour += uGlow * band * 0.42;
            gl_FragColor = vec4(colour, 1.0);
          }
        `}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  )
}

/** Deterministic stand-in for Math.random so the sky is stable across reloads. */
function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}
