/**
 * Landmark model registry.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * MODEL AUTHORING CONTRACT  (every file in ./us, ./ca and ./shared obeys this)
 * ────────────────────────────────────────────────────────────────────────────
 *  1. `export default function ModelName({ tint, hovered = false })`
 *  2. Return ONE root `<group>` (no lights, no cameras, no external assets).
 *  3. The model is authored standing up: base at local y = 0, local +Y is "up".
 *     The scene rotates +Y onto the globe surface normal, so +Y points at the sky.
 *  4. Total height ~= 1.0 unit. Horizontal footprint within x/z +/-0.5
 *     (landscape features may use +/-0.8 in x/z and up to 1.0 in height).
 *  5. Materials come from three.js primitives only:
 *       <meshStandardMaterial
 *         color={...} emissive={...}
 *         emissiveIntensity={hovered ? MATERIAL.emissiveIntensity + MATERIAL.hoverEmissiveBoost : MATERIAL.emissiveIntensity}
 *         roughness={MATERIAL.roughness} metalness={MATERIAL.metalness} />
 *     Bright emissive tones are required so landmarks out-glow the dark globe.
 *  6. Geometry must be procedural three.js primitives / BufferGeometry only.
 *     No .glb/.obj/.gltf, no useLoader, no fonts, no textures.
 *  7. Always accept `tint` and use it for the accent material so the marker colour
 *     of the owning nation is reflected in the model.
 */
import CapitolDome from './us/CapitolDome.jsx'
import StatueOfLiberty from './us/StatueOfLiberty.jsx'
import GoldenGateBridge from './us/GoldenGateBridge.jsx'
import WillisTower from './us/WillisTower.jsx'
import CapitolRecords from './us/CapitolRecords.jsx'
import GrandCanyon from './us/GrandCanyon.jsx'
import StLouisCathedral from './us/StLouisCathedral.jsx'

import PeaceTower from './ca/PeaceTower.jsx'
import CnTower from './ca/CnTower.jsx'
import CanadaPlace from './ca/CanadaPlace.jsx'
import CalgaryTower from './ca/CalgaryTower.jsx'
import NotreDameBasilica from './ca/NotreDameBasilica.jsx'
import ChateauFrontenac from './ca/ChateauFrontenac.jsx'
import BanffPeaks from './ca/BanffPeaks.jsx'

import MountRushmore from './us/MountRushmore.jsx'
import KennedySpaceCenter from './us/KennedySpaceCenter.jsx'
import Denali from './us/Denali.jsx'
import HooverDam from './us/HooverDam.jsx'

import BayOfFundy from './ca/BayOfFundy.jsx'
import Iqaluit from './ca/Iqaluit.jsx'
import GrosMorne from './ca/GrosMorne.jsx'
import Churchill from './ca/Churchill.jsx'

import NiagaraFalls from './shared/NiagaraFalls.jsx'

import { MODEL_TUNING } from '../lib/theme.js'

/**
 * How tall each model actually is in its own unit space. Most stand 1.0 tall; the
 * wide, low features (bridges, waterfalls, canyons) are shorter and need a larger
 * scale so they still read at globe scale.
 */
export const MODEL_AUTHORED_HEIGHT = {
  'golden-gate': 0.45,
  'grand-canyon': 0.45,
  'niagara-falls': 0.55,
  'canada-place': 0.62,
  'banff-peaks': 1.02,
  denali: 0.92,
  'mount-rushmore': 0.62,
  'kennedy-space-center': 0.88,
  'hoover-dam': 0.55,
  'bay-of-fundy': 0.52,
  'gros-morne': 0.95,
  iqaluit: 0.62,
  churchill: 0.5,
}

/** Per-model scale corrections so every landmark reads at a similar weight. */
export const MODEL_SCALE_OVERRIDES = {
  'golden-gate': 1.45,
  'grand-canyon': 1.15,
  'niagara-falls': 1.10,
  'canada-place': 1.05,
  // Short or wide models that would otherwise disappear at globe scale.
  'bay-of-fundy': 1.35,
  'hoover-dam': 1.20,
  churchill: 1.20,
  'mount-rushmore': 1.15,
  iqaluit: 1.10,
}

/** World-space scale factor applied to a model's local unit space. */
export function modelScaleFor(modelId) {
  const base = LANDSCAPE_MODELS.has(modelId)
    ? MODEL_TUNING.landscapeScale
    : MODEL_TUNING.scale
  return base * (MODEL_SCALE_OVERRIDES[modelId] ?? 1)
}

/** World-space height of a placed model, used to park the HUD label above it. */
export function modelHeightFor(modelId) {
  return modelScaleFor(modelId) * (MODEL_AUTHORED_HEIGHT[modelId] ?? 1)
}

/** Model id (as referenced by a stop's `model` field) -> React component. */
export const MODELS = {
  'us-capitol': CapitolDome,
  'statue-of-liberty': StatueOfLiberty,
  'golden-gate': GoldenGateBridge,
  'willis-tower': WillisTower,
  'capitol-records': CapitolRecords,
  'grand-canyon': GrandCanyon,
  'st-louis-cathedral': StLouisCathedral,

  'peace-tower': PeaceTower,
  'cn-tower': CnTower,
  'canada-place': CanadaPlace,
  'calgary-tower': CalgaryTower,
  'notre-dame-basilica': NotreDameBasilica,
  'chateau-frontenac': ChateauFrontenac,
  'banff-peaks': BanffPeaks,

  'mount-rushmore': MountRushmore,
  'kennedy-space-center': KennedySpaceCenter,
  'denali': Denali,
  'hoover-dam': HooverDam,

  'bay-of-fundy': BayOfFundy,
  'iqaluit': Iqaluit,
  'gros-morne': GrosMorne,
  'churchill': Churchill,

  'niagara-falls': NiagaraFalls,
}

/** Landscape-scale features get a smaller footprint multiplier on the globe. */
export const LANDSCAPE_MODELS = new Set([
  'grand-canyon',
  'banff-peaks',
  'niagara-falls',
  'hoover-dam',
  'bay-of-fundy',
  'gros-morne',
])

export const getModel = (id) => MODELS[id] || null
