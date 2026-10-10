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
        'The Bay of Fundy is a long inlet between New Brunswick and Nova Scotia. It has the highest tides in the world. The water can rise and fall by about 16 metres. Twice a day, about 160 billion tonnes of water move in and out.',
      culture:
        'People come to walk on the ocean floor when the tide is out. At Hopewell Rocks they walk between tall stone pillars. The sea carved these pillars into shapes like mushrooms. When the tide comes in, a wave called a tidal bore runs up the rivers. Kayakers ride it.',
      government:
        'The bay touches two provinces, New Brunswick and Nova Scotia. Each province makes its own rules about the shoreline. The federal government in Ottawa looks after the fisheries and the open sea. Some fish travel far. Canada and other countries agree on how many may be caught.',
      economy:
        'Fishing has always been the main work here. Boats catch lobster, scallops and herring. People have also tried to make electricity from the tides. A small tidal power station ran for many years at Annapolis Royal. The changing tides make it hard to build, but the idea keeps coming back.',
    },
    comparison: [
      'The Hoover Dam holds a river back with a wall that people built. The Bay of Fundy has no wall. The Moon pulls the ocean in and out instead.',
      'Both places are about water and power. The dam makes electricity on purpose. The bay moves huge amounts of water. Almost none of it powers anything yet.',
      'The dam sits in a hot desert where rain is rare. The Bay of Fundy sits on a cool coast with rain all year. Its tides never stop, because the Moon and the Sun never stop.',
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
        'Iqaluit sits on Baffin Island in the far north of Canada. It is beside a long inlet called Frobisher Bay. The land is bare rock with very few trees. Winter lasts most of the year. For a few weeks the sun does not rise at all. Heavy goods arrive by ship in summer, because no road reaches the south.',
      culture:
        'Most people who live in Iqaluit are Inuit. Inuktitut and English are both spoken, and Inuktitut is written in its own alphabet. People keep old skills like carving, throat singing and sewing sealskin. Many families still hunt and fish. Life follows the sea ice, which comes and goes each year.',
      government:
        'Iqaluit is the capital of Nunavut, a territory created in 1999. Nunavut is the largest and northernmost territory in Canada. Its elected Legislative Assembly makes laws for the whole territory. Inuit organisations also help decide how the land and wildlife are used.',
      economy:
        'Government jobs are the biggest employer, because Iqaluit is the capital. Shops, hotels and building work support the town. Food and fuel cost a lot. Almost everything must be flown or shipped in. Mining in the territory brings money, and tourism is growing slowly.',
    },
    comparison: [
      'Both places are far north and very empty. Denali is one tall mountain with almost nobody living on it. Iqaluit is a town of a few thousand people who run their own government.',
      'Denali is protected as a national park in the United States. Iqaluit is a working capital city with schools, shops and a legislature.',
      'Both have long dark winters. Denali draws climbers from around the world. Iqaluit draws people who want to see Inuit culture and the northern lights.',
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
        'Gros Morne is a national park on the west coast of Newfoundland. It became a park in 1973. The Tablelands are the strangest part. Here rock from deep inside the Earth was pushed up to the surface. That rock is orange-brown and almost nothing grows on it. The park also has a fjord with very tall cliffs.',
      culture:
        'People have lived on this coast for a long time. Fishing villages sit near the park, and many families came from England, Ireland and France. The park was named a UNESCO World Heritage Site in 1987. Today visitors come to hike, boat and see the Tablelands. Artists and writers often stay in the small towns nearby.',
      government:
        'Parks Canada runs the park and makes the rules for it. The land is owned by the federal government. The towns around the park have their own councils. The province of Newfoundland and Labrador looks after roads, schools and health care. The park is a World Heritage Site. Canada must report to UNESCO on how well it protects it.',
      economy:
        'Fishing used to support almost everyone here. When the cod fishery closed in the 1990s, many people lost their jobs. Since then tourism has become the main source of work. Hotels, boat tours and hiking guides depend on the park. The park also brings money to nearby towns in summer.',
    },
    comparison: [
      'Both places show very old rock out in the open. Mount Rushmore is granite that people carved into faces. Gros Morne is rock the Earth pushed up by itself.',
      'Mount Rushmore is a small memorial in South Dakota. Gros Morne is a large national park on an island. Both are protected by the national government.',
      'Mount Rushmore draws visitors who come to look for an hour. Gros Morne draws visitors who come to hike for days. The rock in Gros Morne is a rare kind. It is usually buried deep under the sea.',
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
        'Churchill sits on the shore of Hudson Bay in northern Manitoba. The town is small and far from any other city. There is no road to the south. People and supplies arrive by train or by plane. Each autumn the sea ice forms on the bay. Churchill is under the path of the aurora, so the northern lights show often.',
      culture:
        'Churchill is called the polar bear capital of the world. Each autumn about a thousand polar bears gather near town. They wait for the sea ice so they can hunt seals. Beluga whales swim in the bay in summer, and people watch them from boats. The town began as a fur trading post. Inuit, Cree and Métis families have long ties here.',
      government:
        'Churchill is a town in Manitoba with an elected mayor and council. The province makes the laws about hunting, land and roads. The federal government looks after the port and the railways. Because polar bears walk through town, the town and the province share a bear patrol. That patrol keeps people safe.',
      economy:
        'Churchill is a grain port. Wheat from the prairies is loaded onto ships and sent across the Atlantic. The town also has a rocket range that operated from the 1950s to the 1980s. Today tourism is a big part of the economy. People come to see polar bears, beluga whales and the northern lights.',
    },
    comparison: [
      'Both are small places that study big things. Kennedy Space Center sends rockets into space. Churchill studies polar bears, sea ice and the northern sky.',
      'Kennedy Space Center sits in warm Florida and draws millions of visitors. Churchill sits on a cold bay and draws far fewer. Both are far from the big cities.',
      'Churchill had its own rocket range from the 1950s to the 1980s. It launched small rockets to study the upper air. Kennedy still launches much bigger rockets today.',
    ],
  },
]
