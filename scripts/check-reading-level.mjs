/**
 * Reading-level check.
 *
 * Every word a reader sees about the United States and Canada must be readable by a
 * 6th grader: short sentences, everyday words, no semicolons, no em dashes. The panels
 * are also meant to stay short - a stop shows a brief reading, not an article - so the
 * four sections of a stop are held to two sentences each.
 *
 * Run with:  node scripts/check-reading-level.mjs
 *
 * Exits non-zero and prints every offending string, so the rule cannot quietly rot
 * as the atlas grows.
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(HERE, '..')
const url = (relative) => pathToFileURL(resolve(ROOT, relative)).href

const MAX_WORDS = 15

/** A stop's four sections are a glance, not an article. */
const MAX_SECTION_SENTENCES = 2

/** Words a 12-year-old would not meet in everyday reading. */
const HARD_WORDS = [
  'abundance', 'agglomeration', 'anglophone', 'annexed', 'aquifer', 'autonomy',
  'binational', 'biodiversity', 'caprock', 'confluence', 'constitutional monarchy',
  'contiguous', 'conurbation', 'diversified', 'endorheic', 'erosional', 'escarpment',
  'fiscal', 'francophone', 'geopolitical', 'glaciated', 'hegemony', 'hinterland',
  'hydroelectric', 'infrastructure', 'jurisdiction', 'legislate', 'megalopolis',
  'metropolitan', 'municipality', 'oligopoly', 'permafrost', 'perpetual', 'precipitation',
  'procurement', 'sedimentary', 'sovereignty', 'subarctic', 'temperate', 'topography',
  'tributary', 'tundra', 'unceded', 'upwelling', 'volatility',
]

const { STOPS, PAIRS, NATIONAL_COMPARISON, getStop } = await import(url('src/data/locations.js'))
const { BORDER_FACTS, BORDER_SEGMENTS } = await import(url('src/data/border.js'))

/** Collect every reader-facing string, labelled with where it came from. */
const strings = []
const push = (where, text) => {
  if (typeof text === 'string' && text.trim()) strings.push({ where, text })
}

STOPS.forEach((stop) => {
  const at = `${stop.id}`
  push(`${at}.tagline`, stop.tagline)
  stop.facts.forEach((fact, i) => {
    push(`${at}.facts[${i}].label`, fact.label)
    push(`${at}.facts[${i}].value`, fact.value)
  })
  Object.entries(stop.sections).forEach(([key, text]) => push(`${at}.sections.${key}`, text))
  stop.comparison.forEach((bullet, i) => push(`${at}.comparison[${i}]`, bullet))
})

PAIRS.forEach((pair) => {
  push(`pair ${pair.id}.label`, pair.label)
  push(`pair ${pair.id}.note`, pair.note)
})

Object.values(NATIONAL_COMPARISON)
  .filter((side) => Array.isArray(side.rows))
  .forEach((side) => {
    side.rows.forEach((row) => {
      push(`national.${side.nation}.${row.label}`, row.value)
    })
  })
NATIONAL_COMPARISON.shared.forEach((row) => push(`national.shared.${row.label}`, row.value))

BORDER_FACTS.forEach((fact) => push(`borderFact.${fact.label}`, fact.value))
BORDER_SEGMENTS.forEach((segment) => {
  push(`borderSegment.${segment.id}.note`, segment.note)
})

/** Check one string, returning a list of problems. */
function inspect({ where, text }) {
  const problems = []

  if (text.includes(';')) problems.push('contains a semicolon')
  if (text.includes('\u2014')) problems.push('contains an em dash')

  // Strip abbreviations that contain a period so they do not split a sentence.
  const cleaned = text.replace(/\b([A-Z]|St|Mt|Mr|Mrs|Dr|vs|No)\./g, '$1')
  const sentences = cleaned
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)

  sentences.forEach((sentence) => {
    const words = sentence.split(/\s+/).length
    if (words > MAX_WORDS) {
      problems.push(`${words}-word sentence: "${sentence}"`)
    }
  })

  // Only the four sections per stop carry this limit: facts are fragments, and a
  // comparison bullet is allowed to make more than one point.
  if (where.includes('.sections.') && sentences.length > MAX_SECTION_SENTENCES) {
    problems.push(`${sentences.length} sentences, but a section takes ${MAX_SECTION_SENTENCES}`)
  }

  const lower = text.toLowerCase()
  HARD_WORDS.forEach((word) => {
    if (new RegExp(`\\b${word}\\b`).test(lower)) problems.push(`hard word "${word}"`)
  })

  return problems
}

const failures = []
let longest = { words: 0, where: '' }
let sentenceCount = 0
let wordCount = 0

strings.forEach((entry) => {
  const problems = inspect(entry)
  if (problems.length) failures.push({ ...entry, problems })

  entry.text
    .replace(/\b([A-Z]|St|Mt|Mr|Mrs|Dr|vs|No)\./g, '$1')
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((sentence) => {
      const words = sentence.split(/\s+/).length
      sentenceCount += 1
      wordCount += words
      if (words > longest.words) longest = { words, where: entry.where }
    })
})

console.log('Intermaptic reading-level check (target: 6th grade)')
console.log('─────────────────────────────────────────────────')
console.log(`strings checked:      ${strings.length}`)
console.log(`sentences:            ${sentenceCount}`)
console.log(`average words/sent:   ${(wordCount / sentenceCount).toFixed(1)}`)
console.log(`longest sentence:     ${longest.words} words  (${longest.where})`)
console.log(`stops / pairs:        ${STOPS.length} / ${PAIRS.length}`)
console.log(`sections per stop:    ${MAX_SECTION_SENTENCES} sentences max`)
console.log('')

if (failures.length) {
  console.error(`${failures.length} string(s) above the reading level:\n`)
  failures.forEach((f) => {
    console.error(`  ✗ ${f.where}`)
    f.problems.forEach((p) => console.error(`      ${p}`))
  })
  process.exit(1)
}

console.log('✓ every reader-facing string is short, plain, and free of semicolons and em dashes')
