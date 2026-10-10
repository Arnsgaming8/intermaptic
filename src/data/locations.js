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
    note: 'Both capitals were built on purpose. Each one sits away from the biggest city so government and business would stay apart.',
  },
  {
    id: 'finance',
    label: 'Finance Megacities',
    subject: 'Economy',
    us: 'new-york-city',
    ca: 'toronto',
    note: 'Both are the banking centres of their country. Both are also the first stop for many new immigrants.',
  },
  {
    id: 'pacific-tech',
    label: 'Pacific Tech Corridors',
    subject: 'Economy',
    us: 'san-francisco',
    ca: 'vancouver',
    note: 'Two technology centres on the Pacific coast. Both grew from deep-water ports, big universities and immigrants from Asia.',
  },
  {
    id: 'interior-economy',
    label: 'Interior Economic Engines',
    subject: 'Economy',
    us: 'chicago',
    ca: 'calgary',
    note: 'Two inland cities that move goods and resources. One runs on trains and shipping. The other runs on energy.',
  },
  {
    id: 'culture',
    label: 'Cultural Hubs',
    subject: 'Culture',
    us: 'los-angeles',
    ca: 'montreal',
    note: 'Two places that sell their culture to the world. One speaks English and Spanish. The other speaks French.',
  },
  {
    id: 'natural-wonders',
    label: 'Natural Wonders',
    subject: 'Geography',
    us: 'grand-canyon',
    ca: 'banff',
    note: 'The most famous landform in each country. One is a desert canyon cut by a river. The other is icy mountains in the Rockies.',
  },
  {
    id: 'heritage',
    label: 'Heritage & Old Quarters',
    subject: 'Culture',
    us: 'new-orleans',
    ca: 'quebec-city',
    note: 'The best-kept old European quarters in North America. One is French and Caribbean. The other is French and Catholic.',
  },
  {
    id: 'border-link',
    label: 'The Shared Border',
    subject: 'Geography',
    us: 'niagara-falls',
    ca: 'niagara-falls',
    note: 'The longest border in the world with no soldiers on it. Both countries advertise this one waterfall as their own.',
  },
  {
    id: 'carved-rock',
    label: 'Rocks From Deep Time',
    subject: 'Geography',
    us: 'mount-rushmore',
    ca: 'gros-morne',
    note: 'Two places where very old rock sits out in the open. One was carved by people. The other was pushed up by the Earth itself.',
  },
  {
    id: 'looking-up',
    label: 'Rockets & the Northern Sky',
    subject: 'Science',
    us: 'kennedy-space-center',
    ca: 'churchill',
    note: 'Both are small places that look at big things. One sends rockets into space. The other studies bears and the northern lights.',
  },
  {
    id: 'northern-edge',
    label: 'Life at the Top',
    subject: 'Geography',
    us: 'denali',
    ca: 'iqaluit',
    note: 'Both sit far north where few people live. One is a huge mountain. The other is a town that runs its own territory.',
  },
  {
    id: 'rivers-and-tides',
    label: 'Managed Water, Wild Water',
    subject: 'Geography',
    us: 'hoover-dam',
    ca: 'bay-of-fundy',
    note: 'One place holds a river back with a giant wall. The other lets the ocean rise and fall higher than anywhere else on Earth.',
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
 * Sourced from IMF / World Bank / national statistics offices, 2024 estimates.
 */
export const NATIONAL_COMPARISON = {
  us: {
    nation: 'us',
    name: 'United States of America',
    rows: [
      { label: 'Capital', value: 'Washington, D.C.' },
      { label: 'Population', value: '~340 million' },
      { label: 'Land area', value: '9.15 million km²' },
      { label: 'GDP (nominal)', value: '~$29.2 trillion' },
      { label: 'GDP per capita', value: '~$86,600' },
      { label: 'Government', value: 'A federal republic. Voters elect a president to lead the country.' },
      { label: 'Head of state', value: 'A president the people elect' },
      { label: 'Legislature', value: 'Congress. It has 100 senators and 435 representatives.' },
      { label: 'Official languages', value: 'There is no official language. English is the one most people use.' },
      { label: 'Currency', value: 'The US dollar (USD)' },
      { label: 'Highest point', value: 'Denali in Alaska. It is 6,190 m tall.' },
      {
        label: 'Time zones',
        value: 'The 48 states in the main part of the country have 4. Alaska adds a 5th and Hawaii a 6th. With territories there are 9.',
      },
      {
        label: 'Health system',
        value: 'Most people get insurance through a job or buy it themselves. Some get help from government programmes.',
      },
    ],
  },
  ca: {
    nation: 'ca',
    name: 'Canada',
    rows: [
      { label: 'Capital', value: 'Ottawa, Ontario' },
      { label: 'Population', value: '~41 million' },
      { label: 'Land area', value: '9.09 million km²' },
      { label: 'GDP (nominal)', value: '~$2.24 trillion' },
      { label: 'GDP per capita', value: '~$53,400' },
      {
        label: 'Government',
        value: 'A parliamentary system. A king or queen is the head of state. An elected leader runs the government.',
      },
      {
        label: 'Head of state',
        value: 'King Charles III. A Governor General speaks for the king in Canada.',
      },
      {
        label: 'Legislature',
        value: 'Parliament. It has an elected House of Commons. Its Senate is chosen by the government rather than elected.',
      },
      { label: 'Official languages', value: 'English and French are both official.' },
      { label: 'Currency', value: 'The Canadian dollar (CAD)' },
      { label: 'Highest point', value: 'Mount Logan in Yukon. It is 5,959 m tall.' },
      { label: 'Time zones', value: '6' },
      {
        label: 'Health system',
        value: 'Health care is paid for by taxes. Everyone in Canada can use it.',
      },
    ],
  },
  /** Shared facts rendered between the two columns. */
  shared: [
    {
      label: 'Border length',
      value: 'The line is 8,891 km long. That is the longest border between two countries anywhere.',
    },
    {
      label: 'Border since',
      value: 'The line goes back to the Treaty of Paris in 1783. The 49th parallel was set by the Oregon Treaty in 1846.',
    },
    {
      label: 'Trade',
      value: 'The two countries buy and sell more than $2.5 billion of goods and services. They do this every day.',
    },
    {
      label: 'Agreements',
      value: 'They signed USMCA in 2020 and NORAD in 1958. They also share the Great Lakes Water Quality Agreement.',
    },
    {
      label: 'Largest shared water body',
      value: 'The fresh water on the surface of the Earth includes the Great Lakes. They hold about 21% of it.',
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
