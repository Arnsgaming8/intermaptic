import { useMemo, useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { GLOBE_TUNING, PALETTE } from '../lib/theme.js'

const ASSET_BASE = import.meta.env.BASE_URL || '/'

/**
 * Holographic star-chart earth.
 *
 * A real land mask drives everything: a Sobel-style gradient on the mask paints the
 * glowing coastlines, the mask itself fills the continents, and a procedural
 * graticule overlays the latitude/longitude grid. The globe is deliberately kept
 * dark and desaturated so the bright landmark models standing on it dominate.
 */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform sampler2D uMask;
  uniform float uTime;
  uniform vec3 uOcean;
  uniform vec3 uLand;
  uniform vec3 uLine;
  uniform vec3 uGrid;
  uniform float uMaskInvert;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  float landMask(vec2 uv) {
    float v = texture2D(uMask, uv).r;
    return mix(v, 1.0 - v, uMaskInvert);
  }

  // Derivative-free grid line: distance in uv units to the nearest multiple of period.
  float gridMask(float coord, float period, float width) {
    float f = fract(coord / period);
    float d = min(f, 1.0 - f) * period;
    return 1.0 - smoothstep(0.0, width, d);
  }

  void main() {
    vec2 texel = vec2(1.0 / 2048.0, 1.0 / 1024.0);

    float centre = landMask(vUv);
    float left = landMask(vUv - vec2(texel.x, 0.0));
    float right = landMask(vUv + vec2(texel.x, 0.0));
    float down = landMask(vUv - vec2(0.0, texel.y));
    float up = landMask(vUv + vec2(0.0, texel.y));
    float gx = right - left;
    float gy = up - down;
    float edge = clamp(length(vec2(gx, gy)) * 26.0, 0.0, 1.0);

    float land = smoothstep(0.08, 0.34, centre);

    // Kept deliberately dark and desaturated: the landmark models standing on the
    // globe are supposed to be the brightest thing in frame, not the map.
    vec3 colour = mix(uOcean, uLand, land * 0.62);

    // A touch of the base texture so the terrain is not perfectly flat.
    vec3 base = texture2D(uMap, vUv).rgb;
    colour += base * 0.055 * land;

    // Glowing coastlines - the signature of the star-chart look.
    colour += uLine * edge * 0.42;

    // Graticule: 15 degrees of longitude, 15 degrees of latitude.
    float grat = gridMask(vUv.x, 0.0416667, 0.0016) * 0.30
               + gridMask(vUv.y, 0.0833333, 0.0022) * 0.22;
    colour += uGrid * grat;

    // Equator and prime meridian read slightly brighter than the rest of the grid.
    float equator = 1.0 - smoothstep(0.0, 0.0035, abs(vUv.y - 0.5));
    float meridian = 1.0 - smoothstep(0.0, 0.0025, abs(vUv.x - 0.5));
    colour += uGrid * (equator + meridian) * 0.5;

    // A slow scan sweep travelling up the globe.
    float sweepPos = fract(uTime * 0.045);
    float sweep = 1.0 - smoothstep(0.0, 0.02, abs(vUv.y - sweepPos));
    colour += uLine * sweep * 0.07;

    // Holographic rim.
    float fresnel = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), 3.0);
    colour += uLine * fresnel * 0.38;

    gl_FragColor = vec4(colour, 1.0);
  }
`

const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float rim = pow(1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0), 2.4);
    gl_FragColor = vec4(uColor, rim * uIntensity);
  }
`

export default function Earth({ onGlobeClick, segments = GLOBE_TUNING.segments }) {
  const materialRef = useRef()
  const radius = GLOBE_TUNING.radius

  const [mapTexture, maskTexture] = useLoader(THREE.TextureLoader, [
    `${ASSET_BASE}textures/earth-dark.jpg`,
    `${ASSET_BASE}textures/earth-topology.png`,
  ])

  const uniforms = useMemo(
    () => ({
      uMap: { value: null },
      uMask: { value: null },
      uTime: { value: 0 },
      uOcean: { value: new THREE.Color('#030c18') },
      uLand: { value: new THREE.Color('#071e30') },
      uLine: { value: new THREE.Color(PALETTE.line) },
      uGrid: { value: new THREE.Color('#14536b') },
      uMaskInvert: { value: 0 },
    }),
    [],
  )

  useMemo(() => {
    if (mapTexture) {
      mapTexture.wrapS = THREE.RepeatWrapping
      mapTexture.anisotropy = 4
      uniforms.uMap.value = mapTexture
    }
    if (maskTexture) {
      maskTexture.wrapS = THREE.RepeatWrapping
      maskTexture.anisotropy = 4
      uniforms.uMask.value = maskTexture
    }
  }, [mapTexture, maskTexture, uniforms])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <group>
      {/* Dark base sphere so nothing sees through the shader sphere from behind. */}
      <mesh>
        <sphereGeometry args={[radius * 0.995, 48, 32]} />
        <meshBasicMaterial color="#020a15" />
      </mesh>

      <mesh onClick={onGlobeClick}>
        <sphereGeometry args={[radius, segments, Math.round(segments / 2)]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      {/* Inner atmosphere shell, rendered on the back faces for a soft rim. */}
      <mesh scale={1.035}>
        <sphereGeometry args={[radius, 64, 48]} />
        <shaderMaterial
          uniforms={{
            uColor: { value: new THREE.Color(PALETTE.line) },
            uIntensity: { value: 0.20 },
          }}
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer halo. */}
      <mesh scale={1.16}>
        <sphereGeometry args={[radius, 48, 32]} />
        <shaderMaterial
          uniforms={{
            uColor: { value: new THREE.Color('#2aa7d8') },
            uIntensity: { value: 0.09 },
          }}
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Instrument rings - the bridge-console frame around the planet. */}
      <OrbitRing radius={radius * 1.28} tilt={0.42} colour="#1b6c88" opacity={0.32} />
      <OrbitRing radius={radius * 1.42} tilt={-0.28} colour="#174f66" opacity={0.2} dash />
    </group>
  )
}

function OrbitRing({ radius, tilt, colour, opacity, dash = false }) {
  const geometry = useMemo(() => {
    const points = []
    const segments = dash ? 180 : 256
    for (let i = 0; i <= segments; i += 1) {
      if (dash && i % 2 === 1) continue
      const a = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [radius, dash])

  return (
    <line geometry={geometry} rotation={[0, 0, tilt]}>
      <lineBasicMaterial color={colour} transparent opacity={opacity} />
    </line>
  )
}
