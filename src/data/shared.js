/**
 * STOPS SCHEMA (every file in src/data follows this shape exactly)
 *
 * {
 *   id:          kebab-case unique key
 *   name:        display name
 *   country:     'us' | 'ca' | 'shared'
 *   kind:        'capital' | 'culture' | 'economy' | 'geography' | 'border'
 *   lat, lng:    decimal degrees (negative = south / west)
 *   model:       id from src/models/index.js
 *   tagline:     one short line for the HUD ticker
 *   pair:        comparison-pair id (see PAIRS in locations.js)
 *   facts:       [{ label, value }] - exactly 3 short quick-facts
 *   sections:    { geography, culture, government, economy }
 *                - each exactly two sentences of plain prose (the reading-level check enforces this)
 *   comparison:  ['bullet', 'bullet'] - 2-3 bullets contrasting this stop with
 *                its paired stop in the other country. Name the other city
 *                explicitly. No markdown, no headings inside the strings.
 * }
 */

/** Features and stops that belong to both countries at once. */
export const SHARED_STOPS = [
  {
    id: 'niagara-falls',
    name: 'Niagara Falls',
    country: 'shared',
    kind: 'border',
    lat: 43.0799,
    lng: -79.0747,
    model: 'niagara-falls',
    tagline: 'A waterfall two countries share',
    pair: 'border-link',
    facts: [
      { label: 'How far it falls', value: '51–57 m' },
      { label: 'Water flow', value: '~2,800 m³ a second' },
      { label: 'Age', value: '~12,000 years' },
    ],
    sections: {
      geography:
        'Niagara Falls is on the Niagara River, between Ontario and New York State. Nine parts in ten of the river go over Horseshoe Falls on the Canadian side.',
      culture:
        'The falls are the oldest tourist site in North America. About twelve million people visit each year, and both towns grew up around the crowds.',
      government:
        'No single government owns the falls. In 1950 the two countries signed the Niagara Diversion Treaty to share the water.',
      economy:
        'The Sir Adam Beck and Robert Moses plants make more than four gigawatts together. Tourists bring in several billion dollars a year to the towns on both sides.',
    },
    comparison: [
      'The Grand Canyon sits inside just one country. One park service runs it. Niagara Falls belongs to both countries. They run it together under a deal they signed.',
      'Only about a quarter of Niagara’s water can be taken to make electricity. The two countries do not compete for it. Their power systems share it instead.',
      'Niagara makes about four gigawatts of water power. That is enough electricity for millions of homes. The Grand Canyon makes almost no power of its own. The Glen Canyon and Hoover dams sit far downstream.',
    ],
  },
]
