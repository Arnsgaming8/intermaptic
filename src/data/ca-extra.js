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
        'The Bay of Fundy is a long inlet between New Brunswick and Nova Scotia. It has the highest tides in the world, which rise about 16 metres. The bay reaches about 250 kilometres inland from the open Atlantic. Its shape narrows toward the top, which makes the tide pile up. About 160 billion tonnes of water move in and out twice a day. The tide can rise as fast as a person can walk. Red sandstone cliffs line the shore, worn into rounded shapes. Summers are cool and foggy, and winters bring snow and ice.',
      culture:
        'People walk on the ocean floor when the tide is out. At Hopewell Rocks kayakers ride the tidal bore between tall stone pillars. The Mi’kmaq and Maliseet peoples have lived around the bay for thousands of years. Fishing towns on both shores hold summer festivals and lobster suppers. A lobster supper means boiled lobster, melted butter and plenty of talk. Fundy National Park has trails, a campground and summer events. Artists paint the red cliffs, and small galleries line the shore. Many families have fished these waters for more than two hundred years.',
      government:
        'Two provinces, New Brunswick and Nova Scotia, make rules for the shoreline. Each province has its own legislature and its own premier. Cities and towns along the bay elect councils that handle local roads. The federal government in Ottawa looks after fisheries, and countries agree on catches. Fishing rules set seasons, licences and the size of each catch. Canada and the United States share some fish stocks and set limits. Fundy National Park is run by Parks Canada for the whole country. New Brunswick runs the Hopewell Rocks park and its walking trails.',
      economy:
        'Fishing is the main work here, with boats catching lobster, scallops and herring. A small tidal power station ran for years at Annapolis Royal. Lobster is the most valuable catch, and it brings in the most money. Farming, forestry and tourism also give people work along the shore. The port of Saint John ships oil, paper and goods across the Atlantic. Blueberry farms and maple sugar bring in money further inland. Tourists come for the tides and fill hotels in the short summer. Homes cost less here than in Toronto, and wages are lower too.',
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
        'Iqaluit sits on Baffin Island, beside an inlet called Frobisher Bay. The land is bare rock, winters are long, and heavy goods arrive by ship. In winter the sun stays low, and some days have almost no light. In summer the sun stays up late and the days are very long. Temperatures fall far below freezing for much of the year. There are no trees, only rock, moss and small shrubs. Ice covers the bay for months, and ships call only in summer. The town sits on a hill above the water, with a small airport.',
      culture:
        'Most people here are Inuit, and Inuktitut and English are both spoken. Families keep old skills like carving and sewing sealskin, and many still hunt. Carvers work with soapstone, and drum dancing is part of celebrations. Throat singing is a tradition where two women trade sounds. Hockey and ice fishing are popular ways to spend the winter. Country food like caribou, char and seal is shared among families. The museum shows Inuit art, tools and the history of the territory. Many young people speak Inuktitut at home and English at school.',
      government:
        'Iqaluit is the capital of Nunavut, a territory created in 1999. Its elected Legislative Assembly makes laws, and Inuit groups help manage the land. Nunavut sends one member of Parliament and one senator to Ottawa. The territory is huge, so its communities sit far apart. The city also has a mayor and a council chosen by voters. Land claims agreements give Inuit groups a say over land and wildlife. Schools teach in Inuktitut in the early years, then in English. The hospital is small, and some patients fly south for care.',
      economy:
        'Government jobs are the biggest employer, and food and fuel cost a lot. Almost everything is flown or shipped in, and mining brings money. A litre of milk can cost far more here than in the south. Building work stays busy because the town keeps growing. Fishing for char and sealing still bring in some income. Tourists come to see the north and the northern lights. An iron mine on Baffin Island ships ore out by sea. Hunters and artisans sell carvings that buyers ship around the world.',
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
        'Gros Morne became a national park in 1973 on the west coast of Newfoundland. The Tablelands are orange-brown rock pushed up from deep inside the Earth. The park covers about 1,800 square kilometres of coast, mountains and water. The Long Range Mountains run along the coast with steep slopes. Western Brook Pond is a deep lake set between tall rock walls. The Tablelands hold rock from the mantle, which is rare at the surface. Ice sheets once covered the island and carved the land into shape. Fog, wind and rain are common because the ocean is close.',
      culture:
        'Fishing villages sit near the park, settled by families from England, Ireland and France. The park became a UNESCO World Heritage Site in 1987. People here speak English with a strong Newfoundland accent of their own. Music and stories are shared at kitchen parties in the villages. Indigenous peoples have lived on this island for thousands of years. Fiddle and accordion music is still played at local dances. Cod fishing shaped the towns for hundreds of years before it closed. Artists and writers come to work in the quiet coastal villages.',
      government:
        'Parks Canada runs the park, and the federal government owns the land. The province looks after roads, schools and health care. Newfoundland and Labrador has its own legislature in St. John’s. The park has a management plan that local people help review. Small towns in the area elect their own councils and mayors. The federal government sets fishing rules for the whole coast. Mining and oil projects need permits from the province. Indigenous groups take part in talks about land and wildlife.',
      economy:
        'Fishing used to support almost everyone, but the cod fishery closed in the 1990s. Tourism is now the main work, with hotels, boat tours and hiking guides. The park brings visitors who spend money in nearby towns. Crab, shrimp and lobster boats have replaced much of the cod fleet. Oil drilling offshore from Newfoundland supports thousands of jobs. Paper mills once employed many people across the province. Some families work seasonally, fishing in summer and guiding in autumn. Homes are cheap here, but steady work is hard to find.',
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
        'Churchill sits on the shore of Hudson Bay in northern Manitoba. There is no road south, so people and supplies arrive by train or plane. The bay freezes each winter, and the ice breaks up in spring. Winters are long and dark, with temperatures far below freezing. In summer, whales gather near the river mouth to feed. The town stands near the Churchill River, which runs into the bay. Northern lights are often visible on clear nights. There are no trees, just rock and low plants along the coast.',
      culture:
        'Churchill is the polar bear capital, where about a thousand bears gather each autumn. Inuit, Cree and Métis families have long ties here, and whales visit in summer. Sled dogs and snowmobiles are both used for travel in winter. The town has a small museum of Inuit carvings. Bird watchers come in spring to see many kinds of birds. Beluga whale tours run in summer on the river. Residents learn to stay clear of bears and to keep food locked up. Winter brings dog sled races and snowmobile trips.',
      government:
        'Churchill is a town in Manitoba with an elected mayor and council. The province makes laws about hunting and land, and runs a bear patrol. Manitoba has its own legislature in Winnipeg. Hudson Bay belongs to Canada, and the federal government runs the port. The town also gets help from the province for local services. Wildlife officers move bears away from the streets each autumn. Parks Canada looks after Wapusk National Park nearby. Community groups and Indigenous organisations join talks about wildlife.',
      economy:
        'Churchill is a grain port where wheat from the prairies is loaded onto ships. A rocket range ran from the 1950s to the 1980s, and tourism is growing. The port closed for years before it started shipping grain again. Trains from Winnipeg bring visitors and supplies to the town. Tourism brings work for guides, hotels and drivers. Fishing for char and hunting also support some families. Food and fuel cost more here than in southern cities. About nine hundred people live here, so most jobs are shared.',
    },
    comparison: [
      'Both are small places that study big things. Kennedy sends rockets up, and Churchill studies bears and sea ice.',
      'Kennedy Space Center sits in warm Florida and draws millions of visitors. Churchill sits on a cold bay, far from any big city.',
      'Churchill had its own rocket range from the 1950s to the 1980s. Kennedy still launches much bigger rockets today.',
    ],
  },
]
