/**
 * Data integrity check for the Intermaptic atlas.
 *
 * Run with:  node scripts/check-atlas.mjs
 *
 * Validates every stop against the schema in src/data/shared.js and cross-checks
 * that the model ids referenced by the data all exist in src/models/index.js.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const { STOPS, PAIRS, ACTIVE_PAIRS, validateAtlas, STOP_CODES, getCounterpart } = await import(
  `file://${resolve(root, 'src/data/locations.js').replace(/\\/g, '/')}`
)

const problems = validateAtlas()

// ── Model registry cross-check ────────────────────────────────────────────────
const registrySource = readFileSync(resolve(root, 'src/models/index.js'), 'utf8')
const registryBlock = registrySource.match(/export const MODELS = \{([\s\S]*?)\n\}/)
const registeredIds = new Set(
  [...(registryBlock?.[1] || '').matchAll(/'([a-z0-9-]+)':/g)].map((match) => match[1]),
)

if (!registeredIds.size) problems.push('could not parse MODELS registry from src/models/index.js')

const missingFromRegistry = STOPS.map((stop) => stop.model).filter((id) => !registeredIds.has(id))
if (missingFromRegistry.length) {
  problems.push(`model ids referenced by data but missing from the registry: ${[...new Set(missingFromRegistry)].join(', ')}`)
}

const usedIds = new Set(STOPS.map((stop) => stop.model))
const unusedInRegistry = [...registeredIds].filter((id) => !usedIds.has(id))
if (unusedInRegistry.length) {
  problems.push(`registered models that no stop uses: ${unusedInRegistry.join(', ')}`)
}

// ── Every landmark model file must exist on disk ──────────────────────────────
const files = {
  'us-capitol': 'src/models/us/CapitolDome.jsx',
  'statue-of-liberty': 'src/models/us/StatueOfLiberty.jsx',
  'golden-gate': 'src/models/us/GoldenGateBridge.jsx',
  'willis-tower': 'src/models/us/WillisTower.jsx',
  'capitol-records': 'src/models/us/CapitolRecords.jsx',
  'grand-canyon': 'src/models/us/GrandCanyon.jsx',
  'st-louis-cathedral': 'src/models/us/StLouisCathedral.jsx',
  'peace-tower': 'src/models/ca/PeaceTower.jsx',
  'cn-tower': 'src/models/ca/CnTower.jsx',
  'canada-place': 'src/models/ca/CanadaPlace.jsx',
  'calgary-tower': 'src/models/ca/CalgaryTower.jsx',
  'notre-dame-basilica': 'src/models/ca/NotreDameBasilica.jsx',
  'chateau-frontenac': 'src/models/ca/ChateauFrontenac.jsx',
  'banff-peaks': 'src/models/ca/BanffPeaks.jsx',
  'mount-rushmore': 'src/models/us/MountRushmore.jsx',
  'kennedy-space-center': 'src/models/us/KennedySpaceCenter.jsx',
  'denali': 'src/models/us/Denali.jsx',
  'hoover-dam': 'src/models/us/HooverDam.jsx',
  'bay-of-fundy': 'src/models/ca/BayOfFundy.jsx',
  'iqaluit': 'src/models/ca/Iqaluit.jsx',
  'gros-morne': 'src/models/ca/GrosMorne.jsx',
  'churchill': 'src/models/ca/Churchill.jsx',
  'niagara-falls': 'src/models/shared/NiagaraFalls.jsx',
}

// The file map above is explicit on purpose, but it must stay complete: a new stop
// whose model file nobody added would otherwise pass this check unnoticed.
const mappedIds = new Set(Object.keys(files))
const unmapped = [...registeredIds].filter((id) => !mappedIds.has(id))
if (unmapped.length) {
  problems.push(`registered models with no file entry in this check: ${unmapped.join(', ')}`)
}

for (const [id, relative] of Object.entries(files)) {
  try {
    const source = readFileSync(resolve(root, relative), 'utf8')
    if (!/export default/.test(source)) problems.push(`${relative} has no default export`)
  } catch {
    problems.push(`missing model file for "${id}": ${relative}`)
  }
}

// ── Reporting ─────────────────────────────────────────────────────────────────
const byNation = STOPS.reduce((acc, stop) => {
  acc[stop.country] = (acc[stop.country] || 0) + 1
  return acc
}, {})

console.log('Intermaptic atlas check')
console.log('───────────────────────')
console.log(`stops:  ${STOPS.length}  (us ${byNation.us || 0}, ca ${byNation.ca || 0}, shared ${byNation.shared || 0})`)
console.log(`pairs:  ${PAIRS.length} defined, ${ACTIVE_PAIRS.length} fully populated`)
console.log(`models: ${registeredIds.size} registered`)
console.log('')
console.log('beacons:')
STOPS.forEach((stop) => {
  const counterpart = getCounterpart(stop.id)
  console.log(
    `  ${STOP_CODES[stop.id]}  ${stop.name.padEnd(28)} ${stop.country.padEnd(6)} ${String(stop.kind).padEnd(10)} ${stop.model.padEnd(20)} ⇄ ${counterpart ? counterpart.name : '—'}`,
  )
})
console.log('')

if (problems.length) {
  console.error(`FAILED with ${problems.length} problem(s):`)
  problems.forEach((problem) => console.error(`  ✗ ${problem}`))
  process.exit(1)
}

console.log('✓ all stop and model ids resolve, every section and comparison is populated')
