/**
 * Intermaptic data spine.
 *
 * Aggregates the US stops, the Canadian stops and the shared-border stops into one
 * ordered atlas, then pairs each American stop with its Canadian counterpart so the
 * comparison panel always has two sides to read from.
 */
import { US_STOPS } from './us.js'
import { US_EXTRA_STOPS } from './us-extra.js'
import { CA_STOPS } from './ca.js'
import { CA_EXTRA_STOPS } from './ca-extra.js'
import { SHARED_STOPS } from './shared.js'

/** Every stop, ordered: US first, then Canada, then the shared border feature. */
export const STOPS = [
  ...US_STOPS,
  ...US_EXTRA_STOPS,
  ...CA_STOPS,
  ...CA_EXTRA_STOPS,
  ...SHARED_STOPS,
]

export const STOP_BY_ID = STOPS.reduce((acc, stop) => {
  acc[stop.id] = stop
  return acc
}, {})

export const getStop = (id) => STOP_BY_ID[id] || null

export const stopsForNation = (nationId) =>
  nationId === 'all' ? STOPS : STOPS.filter((stop) => stop.country === nationId)

/**
 * Short HUD designators: US-01..US-07, CA-01..CA-07, INT-01.
 * Derived rather than stored so the country stops never need to carry a counter.
 */
export const STOP_CODES = (() => {
  const counters = { us: 0, ca: 0, shared: 0 }
  const prefixes = { us: 'US', ca: 'CA', shared: 'INT' }
  const codes = {}
  STOPS.forEach((stop) => {
    counters[stop.country] += 1
    codes[stop.id] = `${prefixes[stop.country]}-${String(counters[stop.country]).padStart(2, '0')}`
  })
  return codes
})()

export const codeOf = (stop) => STOP_CODES[stop?.id] || '---'

/**
 * Thematic match-ups. Each pair puts one American stop against one Canadian stop
 * on the same subject so the two can be read side by side.
 */
export const PAIRS = [
  {
    id: 'capitals',
    label: 'Capitals & Federal Power',
    subject: 'Government',
    us: 'washington-dc',
    ca: 'ottawa',
    note: 'Both capitals were built on purpose to keep government away from business.',
  },
  {
    id: 'finance',
    label: 'Finance Megacities',
    subject: 'Economy',
    us: 'new-york-city',
    ca: 'toronto',
    note: 'Both are the banking centre of their country and a home for new immigrants.',
  },
  {
    id: 'pacific-tech',
    label: 'Pacific Tech Corridors',
    subject: 'Economy',
    us: 'san-francisco',
    ca: 'vancouver',
    note: 'Two technology centres on the Pacific coast, both grown from ports and universities.',
  },
  {
    id: 'interior-economy',
    label: 'Interior Economic Engines',
    subject: 'Economy',
    us: 'chicago',
    ca: 'calgary',
    note: 'Two inland cities moving goods: one runs on trains, the other on energy.',
  },
  {
    id: 'culture',
    label: 'Cultural Hubs',
    subject: 'Culture',
    us: 'los-angeles',
    ca: 'montreal',
    note: 'Both sell their culture worldwide, one in French and one in English and Spanish.',
  },
  {
    id: 'natural-wonders',
    label: 'Natural Wonders',
    subject: 'Geography',
    us: 'grand-canyon',
    ca: 'banff',
    note: 'The most famous landform in each country: a river canyon and icy peaks.',
  },
  {
    id: 'heritage',
    label: 'Heritage & Old Quarters',
    subject: 'Culture',
    us: 'new-orleans',
    ca: 'quebec-city',
    note: 'Two of the oldest quarters in North America, both with French roots.',
  },
  {
    id: 'border-link',
    label: 'The Shared Border',
    subject: 'Geography',
    us: 'niagara-falls',
    ca: 'niagara-falls',
    note: 'The longest border in the world, with one waterfall both countries claim.',
  },
  {
    id: 'carved-rock',
    label: 'Rocks From Deep Time',
    subject: 'Geography',
    us: 'mount-rushmore',
    ca: 'gros-morne',
    note: 'Two rock faces from deep time, one carved and one pushed up.',
  },
  {
    id: 'looking-up',
    label: 'Rockets & the Northern Sky',
    subject: 'Science',
    us: 'kennedy-space-center',
    ca: 'churchill',
    note: 'Both are small places that look at big things: rockets and the northern sky.',
  },
  {
    id: 'northern-edge',
    label: 'Life at the Top',
    subject: 'Geography',
    us: 'denali',
    ca: 'iqaluit',
    note: 'Both sit far north where few people live: a mountain and a small town.',
  },
  {
    id: 'rivers-and-tides',
    label: 'Managed Water, Wild Water',
    subject: 'Geography',
    us: 'hoover-dam',
    ca: 'bay-of-fundy',
    note: 'One holds a river back, the other has the highest tides on Earth.',
  },
]

export const PAIR_BY_ID = PAIRS.reduce((acc, pair) => {
  acc[pair.id] = pair
  return acc
}, {})

export const getPair = (id) => PAIR_BY_ID[id] || null

/** The counterpart stop for a given stop, in the other country. */
export function getCounterpart(stopId) {
  const stop = getStop(stopId)
  if (!stop) return null
  const pair = getPair(stop.pair)
  if (!pair) return null
  const other = pair.us === stopId ? pair.ca : pair.us
  return other === stopId ? null : getStop(other)
}

/** All pairs that are fully populated, used by the comparison panel. */
export const ACTIVE_PAIRS = PAIRS.filter(
  (pair) => getStop(pair.us) && getStop(pair.ca),
)

/**
 * Country-level head-to-head figures.
 * Sourced from the International Monetary Fund, Statistics Canada and the U.S. Census
 * Bureau, 2026 estimates.
 */
export const NATIONAL_COMPARISON = {
  us: {
    nation: 'us',
    name: 'United States of America',
    rows: [
      { label: 'Capital', value: 'Washington, D.C.' },
      { label: 'Population', value: '~343 million' },
      { label: 'Land area', value: '9.15 million km²' },
      { label: 'GDP (nominal)', value: '~$32.4 trillion' },
      { label: 'GDP per capita', value: '~$94,000' },
      { label: 'Government', value: 'A federal republic where voters elect a president.' },
      { label: 'Head of state', value: 'A president the people elect' },
      { label: 'Legislature', value: 'Congress, with 100 senators and 435 representatives.' },
      { label: 'Official languages', value: 'No official language, though most people use English.' },
      { label: 'Currency', value: 'The US dollar (USD)' },
      { label: 'Highest point', value: 'Denali, also called Mount McKinley, at 6,190 m.' },
      {
        label: 'Time zones',
        value: 'Four in the main states, and 9 including Alaska, Hawaii and territories.',
      },
      {
        label: 'Health system',
        value: 'Most people get insurance from a job or buy it themselves.',
      },
    ],
  },
  ca: {
    nation: 'ca',
    name: 'Canada',
    rows: [
      { label: 'Capital', value: 'Ottawa, Ontario' },
      { label: 'Population', value: '~41.8 million' },
      { label: 'Land area', value: '9.09 million km²' },
      { label: 'GDP (nominal)', value: '~$2.5 trillion' },
      { label: 'GDP per capita', value: '~$60,300' },
      {
        label: 'Government',
        value: 'A parliamentary system led by Prime Minister Mark Carney, in office since 2025.',
      },
      {
        label: 'Head of state',
        value: 'King Charles III, represented in Canada by a Governor General.',
      },
      {
        label: 'Legislature',
        value: 'Parliament, with an elected House of Commons and a Senate chosen by government.',
      },
      { label: 'Official languages', value: 'English and French are both official.' },
      { label: 'Currency', value: 'The Canadian dollar (CAD)' },
      { label: 'Highest point', value: 'Mount Logan in Yukon, at 5,959 m.' },
      { label: 'Time zones', value: '6' },
      {
        label: 'Health system',
        value: 'Health care is paid for by taxes and open to everyone.',
      },
    ],
  },
  /** Shared facts rendered between the two columns. */
  shared: [
    {
      label: 'Border length',
      value: 'At 8,891 km, the longest border between two countries anywhere.',
    },
    {
      label: 'Border since',
      value: 'Set by the Treaty of Paris in 1783 and the Oregon Treaty in 1846.',
    },
    {
      label: 'Trade',
      value: 'More than $2 billion of goods and services cross the border every day. Tariffs now apply to some of that trade.',
    },
    {
      label: 'Agreements',
      value: 'USMCA, signed in 2020, faces a joint review in 2026. NORAD dates from 1958, and the two share a water quality deal.',
    },
    {
      label: 'Largest shared water body',
      value: 'The Great Lakes hold about 21% of the fresh surface water on Earth.',
    },
  ],
}

/** Development guard: fail loudly if a stop drifts from the schema. */
const REQUIRED_SECTION_KEYS = ['geography', 'culture', 'government', 'economy']

export function validateAtlas() {
  const problems = []
  const seen = new Set()

  STOPS.forEach((stop) => {
    if (!stop.id) problems.push('stop missing id')
    if (seen.has(stop.id)) problems.push(`duplicate stop id: ${stop.id}`)
    seen.add(stop.id)

    if (!['us', 'ca', 'shared'].includes(stop.country)) {
      problems.push(`${stop.id}: bad country "${stop.country}"`)
    }
    if (!Number.isFinite(stop.lat) || stop.lat < -90 || stop.lat > 90) {
      problems.push(`${stop.id}: bad lat ${stop.lat}`)
    }
    if (!Number.isFinite(stop.lng) || stop.lng < -180 || stop.lng > 180) {
      problems.push(`${stop.id}: bad lng ${stop.lng}`)
    }
    if (!stop.model) problems.push(`${stop.id}: missing model id`)
    if (!stop.pair) problems.push(`${stop.id}: missing pair id`)
    if (!Array.isArray(stop.facts) || stop.facts.length !== 3) {
      problems.push(`${stop.id}: expected exactly 3 facts`)
    }
    // Every figure in a reading names its source, so the panel is never unsourced.
    if (!Array.isArray(stop.sources) || stop.sources.length < 2 || stop.sources.length > 3) {
      problems.push(`${stop.id}: expected 2 or 3 sources`)
    } else if (stop.sources.some((source) => typeof source !== 'string' || !source.trim())) {
      problems.push(`${stop.id}: empty source entry`)
    }
    if (!Array.isArray(stop.comparison) || stop.comparison.length < 2) {
      problems.push(`${stop.id}: expected at least 2 comparison bullets`)
    }
    REQUIRED_SECTION_KEYS.forEach((key) => {
      const text = stop.sections?.[key]
      if (typeof text !== 'string' || text.trim().length < 40) {
        problems.push(`${stop.id}: section "${key}" missing or too short`)
      }
    })
  })

  PAIRS.forEach((pair) => {
    if (!getStop(pair.us)) problems.push(`pair ${pair.id}: missing us stop ${pair.us}`)
    if (!getStop(pair.ca)) problems.push(`pair ${pair.id}: missing ca stop ${pair.ca}`)
  })

  return problems
}
