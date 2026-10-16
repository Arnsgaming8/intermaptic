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
 *                - each eight to ten sentences of plain prose (the reading-level check enforces this)
 *   comparison:  ['bullet', 'bullet'] - 2-3 bullets contrasting this stop with
 *                its paired stop in the other country. Name the other city
 *                explicitly. No markdown, no headings inside the strings.
 *   sources:     ['Body, year'] - 2-3 short citations for the figures above, printed
 *                under the reading. Plain text, no URLs.
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
      { label: 'Water flow', value: 'About 2,400 m³ a second on average' },
      { label: 'Age', value: '~12,000 years' },
    ],
    sections: {
      geography:
        'Niagara Falls sits on the Niagara River, between Ontario and New York State. Nine parts in ten of the water goes over Horseshoe Falls, on the Canadian side. The river runs about fifty-eight kilometres north, from Lake Erie to Lake Ontario. Horseshoe Falls is the widest of the three. The other two, American Falls and Bridal Veil Falls, stand on the American side. The falls mark the start of a gorge about eleven kilometres long. Hard rock sits on top of a softer layer of shale. Water wears away that soft layer, so the falls slowly creep upstream.',
      culture:
        'The falls are one of the oldest tourist sites in North America. About twelve million people visit each year, and both towns grew up around the crowds. The New York state park draws about nine and a half million visitors a year. Visitors come to the falls in every season. Long before the towns, Haudenosaunee people lived along the river. They carried canoes overland around the falls, because boats could not pass them. Both sides have a town called Niagara Falls, and the Canadian one is larger. After dark, the falls are lit with coloured lights, and fireworks follow in summer.',
      government:
        'No single government owns the falls. In 1950 the two countries signed the Niagara Diversion Treaty to share the water. Each side has its own parks body that looks after its land. New York State made the land around the falls its first state park in 1885. Ontario set up the Niagara Parks Commission in 1887. A treaty from 1909 created the International Joint Commission to settle water disputes. The 1950 treaty also sets a minimum flow that must go over the falls. At night and in winter, more water is allowed to go to the power plants.',
      economy:
        'The Sir Adam Beck and Robert Moses plants make more than four gigawatts together. Tourists bring several billion dollars a year to the towns on both sides. Both plants are publicly owned, one by Ontario and one by New York State. Water reaches them through long tunnels, so it never goes over the falls. A big tunnel finished in 2013 carries extra water to the Canadian plant. The power goes to homes, businesses and factories in both countries. Hotels, restaurants and two casinos employ many people on both sides. Both towns hope to draw more visitors in the years ahead. I used the newest figures I could verify.',
    },
    comparison: [
      'The Grand Canyon sits inside just one country. Niagara Falls belongs to both countries, and they run it under a signed deal.',
      'Treaty rules limit how much of Niagara’s water can be taken to make electricity. The two countries do not compete for it, and their power systems share it.',
      'Niagara makes about four gigawatts of water power. The Grand Canyon makes almost none. Glen Canyon and Hoover dams sit upstream on the Colorado River.',
    ],
    sources: ['Niagara Falls Tourism, 2026', 'New York State Parks, 2026'],
  },
]
