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
 *                - each a single paragraph of 2-3 sentences of plain prose
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
        'Niagara Falls is on the Niagara River. It sits between Ontario and New York State. The river carries water from Lake Erie down to Lake Ontario. The upper Great Lakes drain through it to the Atlantic Ocean. About ninety out of every hundred parts of the river go over Horseshoe Falls. That is the Canadian side. The American and Bridal Veil Falls are on the United States side. The falls slowly move upstream. The hard rock on top stays put. The softer rock below wears away. That is why the crest sits eleven kilometres from where the falls first formed.',
      culture:
        'The falls are the oldest tourist site in North America. About twelve million people visit every year. They come to both sides. Each side has tall viewing towers. There are tunnels down near the water. Boats take people close to the falls. Two towns grew up around the crowds. They are Niagara Falls, Ontario and Niagara Falls, New York. Both towns were full of tourists long before either country had national parks.',
      government:
        'No single government owns the falls. In 1950 the two countries signed the Niagara Diversion Treaty. That is a deal about how much water each country may take. The deal limits how much water is taken to make power. A group from both countries must keep enough water flowing over the crest. That water has to flow by day during the tourist season. Every choice about taking water is made by both countries together.',
      economy:
        'The falls are one of the biggest water power sites in North America. The Sir Adam Beck complex in Ontario is on one side. The Robert Moses Niagara Power Plant in New York is on the other. Together they make more than four gigawatts. That power runs factories and homes in both provinces and states. Visitors bring in several billion dollars a year. Both cities sell the same waterfall to the same people.',
    },
    comparison: [
      'The Grand Canyon sits inside just one country. One park service runs it. Niagara Falls belongs to both countries. They run it together under a deal they signed.',
      'Only about a quarter of Niagara’s water can be taken to make electricity. The two countries do not compete for it. Their power systems share it instead.',
      'Niagara makes about four gigawatts of water power. That is enough electricity for millions of homes. The Grand Canyon makes almost no power of its own. The Glen Canyon and Hoover dams sit far downstream.',
    ],
  },
]
