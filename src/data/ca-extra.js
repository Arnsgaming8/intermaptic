/**
 * Additional Canadian stops for the Intermaptic atlas.
 * Same schema as src/data/ca.js - see the schema comment in src/data/shared.js.
 *
 * These four stops are the Canadian half of the four newer comparison pairs:
 *   rivers-and-tides  Bay of Fundy  <-> Hoover Dam
 *   northern-edge     Iqaluit       <-> Denali
 *   carved-rock       Gros Morne    <-> Mount Rushmore
 *   looking-up        Churchill     <-> Kennedy Space Center
 *
 * All prose is written at a 6th grade reading level: short sentences, everyday
 * words, no semicolons and no em dashes.
 */
export const CA_EXTRA_STOPS = [
  {
    id: 'bay-of-fundy',
    name: 'Bay of Fundy',
    country: 'ca',
    kind: 'geography',
    lat: 45.5,
    lng: -64.6,
    model: 'bay-of-fundy',
    tagline: 'The highest tides in the world',
    pair: 'rivers-and-tides',
    facts: [
      { label: 'Tide range', value: 'Up to about 16 metres' },
      { label: 'Water moved', value: '~160 billion tonnes, twice a day' },
      { label: 'Region', value: 'Between New Brunswick and Nova Scotia' },
    ],
    sections: {
      geography:
        'The Bay of Fundy is a long inlet between New Brunswick and Nova Scotia. It has the highest tides in the world, which rise about 16 metres.',
      culture:
        'People walk on the ocean floor when the tide is out. At Hopewell Rocks kayakers ride the tidal bore between tall stone pillars.',
      government:
        'Two provinces, New Brunswick and Nova Scotia, make rules for the shoreline. The federal government in Ottawa looks after fisheries, and countries agree on catches.',
      economy:
        'Fishing is the main work here, with boats catching lobster, scallops and herring. A small tidal power station ran for years at Annapolis Royal.',
    },
    comparison: [
      'The Hoover Dam holds a river back with a wall that people built. The Bay of Fundy has no wall. The Moon pulls its ocean in and out.',
      'Both places are about water and power. The dam makes electricity, but almost none of the bay water powers anything yet.',
      'The dam sits in a hot desert where rain is rare. The bay sits on a cool coast, and its tides never stop.',
    ],
  },
  {
    id: 'iqaluit',
    name: 'Iqaluit',
    country: 'ca',
    kind: 'capital',
    lat: 63.7467,
    lng: -68.517,
    model: 'iqaluit',
    tagline: 'Capital of Nunavut, Canada’s newest territory',
    pair: 'northern-edge',
    facts: [
      { label: 'Capital since', value: '1999, when Nunavut was created' },
      { label: 'Population', value: '~7,400 people' },
      { label: 'Location', value: 'Baffin Island, beside Frobisher Bay' },
    ],
    sections: {
      geography:
        'Iqaluit sits on Baffin Island, beside an inlet called Frobisher Bay. The land is bare rock, winters are long, and heavy goods arrive by ship.',
      culture:
        'Most people here are Inuit, and Inuktitut and English are both spoken. Families keep old skills like carving and sewing sealskin, and many still hunt.',
      government:
        'Iqaluit is the capital of Nunavut, a territory created in 1999. Its elected Legislative Assembly makes laws, and Inuit groups help manage the land.',
      economy:
        'Government jobs are the biggest employer, and food and fuel cost a lot. Almost everything is flown or shipped in, and mining brings money.',
    },
    comparison: [
      'Both places sit far north with few people. Denali is one tall mountain, while Iqaluit is a town that runs its own government.',
      'Denali is protected as a national park in the United States. Iqaluit is a working capital city with schools, shops and a legislature.',
      'Both have long dark winters. Denali draws climbers, and Iqaluit draws people who want to see Inuit culture.',
    ],
  },
  {
    id: 'gros-morne',
    name: 'Gros Morne',
    country: 'ca',
    kind: 'geography',
    lat: 49.6,
    lng: -57.75,
    model: 'gros-morne',
    tagline: 'Where the ocean floor sits on dry land',
    pair: 'carved-rock',
    facts: [
      { label: 'Park created', value: '1973, on the west coast of Newfoundland' },
      { label: 'World Heritage', value: 'Listed by UNESCO in 1987' },
      { label: 'The Tablelands', value: 'Rock from deep inside the Earth' },
    ],
    sections: {
      geography:
        'Gros Morne became a national park in 1973 on the west coast of Newfoundland. The Tablelands are orange-brown rock pushed up from deep inside the Earth.',
      culture:
        'Fishing villages sit near the park, settled by families from England, Ireland and France. The park became a UNESCO World Heritage Site in 1987.',
      government:
        'Parks Canada runs the park, and the federal government owns the land. The province looks after roads, schools and health care.',
      economy:
        'Fishing used to support almost everyone, but the cod fishery closed in the 1990s. Tourism is now the main work, with hotels, boat tours and hiking guides.',
    },
    comparison: [
      'Both places show very old rock in the open. Mount Rushmore is granite people carved, and Gros Morne is rock the Earth pushed up.',
      'Mount Rushmore is a small memorial in South Dakota. Gros Morne is a large island park, and the national government protects both.',
      'Mount Rushmore draws visitors who stay for an hour. Gros Morne draws hikers, and its rare rock is usually buried under the sea.',
    ],
  },
  {
    id: 'churchill',
    name: 'Churchill',
    country: 'ca',
    kind: 'culture',
    lat: 58.7684,
    lng: -94.165,
    model: 'churchill',
    tagline: 'The polar bear capital of the world',
    pair: 'looking-up',
    facts: [
      { label: 'Population', value: '~900 people' },
      { label: 'Polar bears', value: 'About 1,000 pass through each autumn' },
      { label: 'Location', value: 'Hudson Bay, northern Manitoba' },
    ],
    sections: {
      geography:
        'Churchill sits on the shore of Hudson Bay in northern Manitoba. There is no road south, so people and supplies arrive by train or plane.',
      culture:
        'Churchill is the polar bear capital, where about a thousand bears gather each autumn. Inuit, Cree and Métis families have long ties here, and whales visit in summer.',
      government:
        'Churchill is a town in Manitoba with an elected mayor and council. The province makes laws about hunting and land, and runs a bear patrol.',
      economy:
        'Churchill is a grain port where wheat from the prairies is loaded onto ships. A rocket range ran from the 1950s to the 1980s, and tourism is growing.',
    },
    comparison: [
      'Both are small places that study big things. Kennedy sends rockets up, and Churchill studies bears and sea ice.',
      'Kennedy Space Center sits in warm Florida and draws millions of visitors. Churchill sits on a cold bay, far from any big city.',
      'Churchill had its own rocket range from the 1950s to the 1980s. Kennedy still launches much bigger rockets today.',
    ],
  },
]
