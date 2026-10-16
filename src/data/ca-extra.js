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
      { label: 'Water moved', value: 'Over 100 billion tonnes, twice a day' },
      { label: 'Tide cycle', value: 'About 12 hours and 25 minutes' },
    ],
    sections: {
      geography:
        'The Bay of Fundy is a long inlet between New Brunswick and Nova Scotia. It has the highest tides in the world. At its peak, the water can rise about 16 metres. The bay reaches about 250 kilometres inland from the Atlantic. Its shape narrows at the top, so the tide piles up. Over 100 billion tonnes of water move in and out twice a day. Red sandstone cliffs line the shore, and summers are cool and foggy. I used the newest figures I could find.',
      culture:
        'People can walk on the ocean floor when the tide goes out. At Hopewell Rocks, kayakers paddle the tidal bore between tall stone pillars. The Mi’kmaq and Maliseet peoples have lived around the bay for thousands of years. Fishing towns on both shores hold summer festivals. Many of them serve lobster suppers, with boiled lobster, melted butter and plenty of talk. Fundy National Park has trails, a campground and summer events. Artists often paint the red cliffs, and small galleries line the shore. Fishing families have worked these shores for generations.',
      government:
        'Two provinces, New Brunswick and Nova Scotia, make rules for the shoreline. Each province has its own legislature and premier. Tidal energy projects need permits from both the province and the federal government. The federal government in Ottawa looks after fisheries. Fishing rules set seasons, licences and the size of each catch. Canada and the United States share some fish stocks and set limits. Parks Canada runs Fundy National Park for the whole country. New Brunswick runs the Hopewell Rocks park and its walking trails.',
      economy:
        'Fishing is the main work here, and boats catch lobster, scallops and herring. The Annapolis Royal station has run since 1984. It was one of the first tidal plants in the world. Lobster is the most valuable catch, so it brings in the most money. Farming, forestry and tourism also give people work along the shore. The port of Saint John ships oil, paper and goods across the Atlantic. Tidal power is still a new idea here, and projects remain small. Tourists come for the tides, and they fill hotels in the short summer. Homes cost less here than in Toronto, and wages are often lower too.',
    },
    comparison: [
      'The Hoover Dam holds a river back with a wall that people built. The Bay of Fundy has no wall. The Moon pulls its ocean in and out.',
      'Both places are about water and power. Tidal machines now feed the grid, but the dam still makes far more.',
      'The dam sits in a hot desert where rain is rare. The bay sits on a cool coast, and its tides never stop.',
    ],
    sources: ['Natural Resources Canada, 2025', 'Province of Nova Scotia, 2026'],
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
      { label: 'Population', value: 'About 7,700 people at the 2021 census' },
      { label: 'Location', value: 'Baffin Island, beside Frobisher Bay' },
    ],
    sections: {
      geography:
        'Iqaluit sits on Baffin Island, beside an inlet called Frobisher Bay. The land is bare rock. Winters are long, and heavy goods usually arrive by ship. In winter the sun stays low, and some days have almost no light. In summer the sun stays up late, so the days are very long. Temperatures stay far below freezing for much of the year. There are no trees, only rock, moss and small shrubs. Ice covers the bay for months, so ships usually come only in summer. I used the newest figures I could find.',
      culture:
        'Most people here are Inuit, and both Inuktitut and English are spoken. Families keep old skills like carving and sewing sealskin. Many people still hunt, and country food like caribou, char and seal is shared. Carvers work with soapstone, and drum dancing is part of celebrations. Throat singing is a tradition where two women trade sounds. Hockey and ice fishing are popular ways to spend the winter. The museum shows Inuit art, tools and the history of the territory. Many young people speak Inuktitut at home and English at school.',
      government:
        'Iqaluit is the capital of Nunavut, a territory created in 1999. Its elected Legislative Assembly makes laws. Inuit groups help manage the land, and land claims give them a say. Nunavut sends one member of Parliament to Ottawa. The territory is huge, and building homes costs far more than in the south. The city also has a mayor and a council chosen by voters. Schools teach in Inuktitut in the early years, then in English. The hospital is small, so some patients likely fly south for care.',
      economy:
        'Government jobs are the biggest employer here. Food and fuel cost a lot, because almost everything is flown or shipped in. Mining brings some money to the region. A litre of milk can cost far more here than in the south. Housing is short, and many families live in crowded homes. Fishing for char and sealing still brings in some income. Tourists come to see the north and the northern lights. An iron mine on Baffin Island ships ore out by sea. Hunters and artisans sell carvings that buyers ship around the world.',
    },
    comparison: [
      'Both places sit far north with few people. Denali is one tall mountain, while Iqaluit is a town that runs its own government.',
      'Denali is protected as a national park in the United States. Iqaluit is a working capital city with schools, shops and a legislature.',
      'Both have long dark winters. Denali draws climbers, and Iqaluit draws people who want to see Inuit culture.',
    ],
    sources: ['Statistics Canada, 2026', 'Nunavut Housing Corporation, 2026'],
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
      { label: 'Visitors', value: 'About 250,000 a year' },
    ],
    sections: {
      geography:
        'Gros Morne became a national park in 1973 on the west coast of Newfoundland. The Tablelands are orange-brown rock pushed up from deep inside the Earth. The park covers about 1,800 square kilometres of coast, mountains and water. The Long Range Mountains run along the coast with steep slopes. Western Brook Pond is a deep lake set between tall rock walls. The Tablelands hold rock from the mantle, which is rare at the surface. Ice sheets once covered the island and carved the land. Fog, wind and rain are common, likely because the ocean is close. I used the newest figures I could find.',
      culture:
        'Fishing villages near the park were settled by families from England, Ireland and France. The park became a UNESCO World Heritage Site in 1987. People here speak English with a strong Newfoundland accent. Music and stories are shared at kitchen parties in the villages. Indigenous peoples have lived on this island for thousands of years. Hikers reach the Tablelands by trail from the park’s visitor centre. Cod fishing shaped the towns for hundreds of years before it closed. Artists and writers come to work in the quiet coastal villages.',
      government:
        'Parks Canada runs the park, and the federal government owns the land. The province looks after roads, schools and health care. Newfoundland and Labrador has its own legislature in St. John’s. The park has a management plan that local people help review. Small towns in the area elect their own councils and mayors. The federal government sets fishing rules for the whole coast. Mining and oil projects need permits from the province. Indigenous groups take part in talks about land and wildlife.',
      economy:
        'Fishing used to support almost everyone, but the cod fishery closed in the 1990s. Tourism is now the main work, with hotels, boat tours and hiking guides. About 250,000 visitors a year come, which is far fewer than Banff sees. Crab, shrimp and lobster boats have replaced much of the cod fleet. Oil drilling offshore from Newfoundland supports thousands of jobs. Paper mills once employed many people across the province. Some families fish in summer and guide tourists in autumn. Homes are cheap here, but steady work is hard to find.',
    },
    comparison: [
      'Both places show very old rock in the open. Mount Rushmore is granite people carved, and Gros Morne is rock the Earth pushed up.',
      'Mount Rushmore is a small memorial in South Dakota. Gros Morne is a large island park, and the national government protects both.',
      'Mount Rushmore draws crowds to one viewing area. Gros Morne draws hikers who walk trails through the Tablelands.',
    ],
    sources: ['Parks Canada, 2026', 'UNESCO, 2022'],
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
      { label: 'Population', value: 'About 800 people' },
      { label: 'Polar bears', value: 'Hundreds gather in autumn' },
      { label: 'Location', value: 'Hudson Bay, northern Manitoba' },
    ],
    sections: {
      geography:
        'Churchill sits on the shore of Hudson Bay in northern Manitoba. There is no road south, so people and supplies come by train or plane. Sea ice now melts earlier in spring, which changes when bears can hunt seals. Winters are long and dark, with temperatures far below freezing. In summer, whales gather near the river mouth to feed. The town stands near the Churchill River, which runs into the bay. Northern lights are often visible on clear nights. There are no trees, just rock and low plants along the coast. I used the newest figures I could find.',
      culture:
        'Churchill is known as the polar bear capital, where hundreds of bears gather in autumn. Inuit, Cree and Métis families have long ties here. Whales visit in summer, and beluga tours run on the river. Sled dogs and snowmobiles are both used for travel in winter. The town has a small museum of Inuit carvings. Bird watchers come in spring to see many kinds of birds. Residents learn to stay clear of bears and to keep food locked up. Winter brings dog sled races and snowmobile trips.',
      government:
        'Churchill is a town in Manitoba with an elected mayor and council. The province makes laws about hunting and land, and it runs a bear patrol. Manitoba has its own legislature in Winnipeg. The port is owned by a group that includes many First Nations. The town also gets help from the province for local services. Wildlife officers move bears away from the streets each autumn. Parks Canada looks after Wapusk National Park nearby. Community groups and Indigenous organisations join talks about wildlife.',
      economy:
        'Churchill is a grain port, where wheat from the prairies is loaded onto ships. A rocket range ran here from the 1950s to the 1980s. The port has closed and reopened in recent years. Trains from Winnipeg bring visitors and supplies to the town. Tourism brings work for guides, hotels and drivers. Fishing for char and hunting also support some families. Food and fuel cost more here than in southern cities. About 800 people live here, so jobs are often shared among families.',
    },
    comparison: [
      'Both are small places that study big things. Kennedy sends rockets up, and Churchill studies bears and sea ice.',
      'Kennedy Space Center sits in warm Florida and draws more than a million visitors. Churchill sits on a cold bay, far from any big city.',
      'Churchill had its own rocket range from the 1950s to the 1980s. Kennedy still launches much bigger rockets today.',
    ],
    sources: ['Parks Canada, 2026', 'Travel Manitoba, 2026'],
  },
]
