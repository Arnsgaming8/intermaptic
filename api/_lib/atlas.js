/**
 * Server-side view of the atlas.
 *
 * The API and the frontend read the SAME data modules in `src/data`, so the backend
 * can never drift out of step with the bundled fallback copy on GitHub Pages.
 */
import {
  ACTIVE_PAIRS,
  NATIONAL_COMPARISON,
  PAIRS,
  STOP_CODES,
  STOPS,
  getCounterpart,
  getPair,
  getStop,
} from '../../src/data/locations.js'
import { BORDER_FACTS, BORDER_SEGMENTS } from '../../src/data/border.js'

export const ATLAS_VERSION = '1.0.0'

const MAX_WORDS_PER_SENTENCE = 15

/** Measure the reading level of everything a reader sees about the two countries. */
export function measureReadingLevel() {
  const strings = []
  const push = (text) => {
    if (typeof text === 'string' && text.trim()) strings.push(text)
  }

  STOPS.forEach((stop) => {
    push(stop.tagline)
    stop.facts.forEach((fact) => {
      push(fact.label)
      push(fact.value)
    })
    Object.values(stop.sections).forEach(push)
    stop.comparison.forEach(push)
  })
  PAIRS.forEach((pair) => {
    push(pair.label)
    push(pair.note)
  })
  Object.values(NATIONAL_COMPARISON)
    .filter((side) => Array.isArray(side.rows))
    .forEach((side) => side.rows.forEach((row) => push(row.value)))
  NATIONAL_COMPARISON.shared.forEach((row) => push(row.value))
  BORDER_FACTS.forEach((fact) => push(fact.value))

  let sentences = 0
  let words = 0
  let longest = 0

  strings.forEach((text) => {
    text
      .split(/(?<=[.?!])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean)
      .forEach((sentence) => {
        const count = sentence.split(/\s+/).length
        sentences += 1
        words += count
        if (count > longest) longest = count
      })
  })

  return {
    target: '6th grade',
    strings: strings.length,
    sentences,
    averageWordsPerSentence: Number((words / Math.max(sentences, 1)).toFixed(1)),
    longestSentence: longest,
    maxWordsPerSentence: MAX_WORDS_PER_SENTENCE,
    withinTarget: longest <= MAX_WORDS_PER_SENTENCE,
  }
}

/** The public shape of a stop: the data plus its derived code and its counterpart. */
export function shapeStop(stop, { depth = 'full' } = {}) {
  const counterpart = getCounterpart(stop.id)
  const base = {
    id: stop.id,
    code: STOP_CODES[stop.id] || null,
    name: stop.name,
    country: stop.country,
    kind: stop.kind,
    pair: stop.pair,
    lat: stop.lat,
    lng: stop.lng,
    model: stop.model,
    tagline: stop.tagline,
    counterpart: counterpart
      ? { id: counterpart.id, name: counterpart.name, country: counterpart.country }
      : null,
  }

  if (depth === 'summary') return base

  return {
    ...base,
    facts: stop.facts,
    sections: stop.sections,
    comparison: stop.comparison,
    pairDetail: getPair(stop.pair)
      ? {
          id: stop.pair,
          label: getPair(stop.pair).label,
          subject: getPair(stop.pair).subject,
          note: getPair(stop.pair).note,
        }
      : null,
  }
}

export function countByNation() {
  return STOPS.reduce((acc, stop) => {
    acc[stop.country] = (acc[stop.country] || 0) + 1
    return acc
  }, {})
}

/** The whole atlas in one response. */
export function buildAtlas() {
  return {
    version: ATLAS_VERSION,
    generatedAt: new Date().toISOString(),
    counts: {
      stops: STOPS.length,
      pairs: PAIRS.length,
      activePairs: ACTIVE_PAIRS.length,
      byNation: countByNation(),
    },
    readingLevel: measureReadingLevel(),
    stops: STOPS.map((stop) => shapeStop(stop)),
    // Pairs keep the SAME shape as the bundled copy (`us` and `ca` are stop ids) so
    // the frontend can swap between live and bundled data without special cases.
    pairs: PAIRS.map((pair) => ({ ...pair })),
    nationalComparison: NATIONAL_COMPARISON,
    border: { facts: BORDER_FACTS, segments: BORDER_SEGMENTS },
  }
}

/** Filter the stop list. */
export function listStops({ country, kind, model, q, depth } = {}) {
  const needle = (q || '').trim().toLowerCase()
  return STOPS.filter((stop) => {
    if (country && stop.country !== country) return false
    if (kind && stop.kind !== kind) return false
    if (model && stop.model !== model) return false
    if (needle) {
      const haystack = [
        stop.name,
        stop.tagline,
        ...Object.values(stop.sections),
        ...stop.comparison,
        ...stop.facts.map((f) => `${f.label} ${f.value}`),
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(needle)) return false
    }
    return true
  }).map((stop) => shapeStop(stop, { depth: depth === 'summary' ? 'summary' : 'full' }))
}

/**
 * Search every reader-facing string with a small relevance score, so the most
 * obvious match (the stop whose name matches) sorts first.
 */
export function searchAtlas(rawQuery, { limit = 20 } = {}) {
  const query = (rawQuery || '').trim().toLowerCase()
  if (query.length < 2) return []

  const terms = query.split(/\s+/).filter(Boolean)
  const results = []

  STOPS.forEach((stop) => {
    const fields = [
      { key: 'name', weight: 12, text: stop.name },
      { key: 'tagline', weight: 6, text: stop.tagline },
      { key: 'facts', weight: 3, text: stop.facts.map((f) => `${f.label}: ${f.value}`).join(' ') },
      { key: 'comparison', weight: 2, text: stop.comparison.join(' ') },
      ...Object.entries(stop.sections).map(([key, text]) => ({ key, weight: 1, text })),
    ]

    let score = 0
    const matchedIn = []

    terms.forEach((term) => {
      fields.forEach((field) => {
        const text = field.text.toLowerCase()
        if (!text.includes(term)) return
        const exactWord = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text)
        score += field.weight * (exactWord ? 2 : 1)
        if (!matchedIn.includes(field.key)) matchedIn.push(field.key)
      })
    })

    if (score > 0) {
      results.push({
        id: stop.id,
        code: STOP_CODES[stop.id] || null,
        name: stop.name,
        country: stop.country,
        kind: stop.kind,
        lat: stop.lat,
        lng: stop.lng,
        tagline: stop.tagline,
        score,
        matchedIn,
      })
    }
  })

  return results.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, limit)
}

export {
  STOPS,
  PAIRS,
  NATIONAL_COMPARISON,
  BORDER_FACTS,
  BORDER_SEGMENTS,
  getStop,
  getPair,
  getCounterpart,
}
