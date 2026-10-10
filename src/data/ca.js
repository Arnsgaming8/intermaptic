/** Canadian stops for the Intermaptic atlas. See the schema in src/data/shared.js. */
export const CA_STOPS = [
  {
    id: 'ottawa',
    name: 'Ottawa',
    country: 'ca',
    kind: 'capital',
    lat: 45.4215,
    lng: -75.6972,
    model: 'peace-tower',
    tagline: 'Picked as a deal between two rival cities',
    pair: 'capitals',
    facts: [
      { label: 'Capital since', value: '1857, picked by Queen Victoria' },
      { label: 'Population', value: '~1 million in the capital area' },
      { label: 'Landmark', value: 'Peace Tower, finished in 1927' },
    ],
    sections: {
      geography:
        'Ottawa sits on the south bank of the Ottawa River. The Rideau Canal freezes each winter and becomes the biggest skating rink.',
      culture:
        'Ottawa is a two-language city, English and French. The Netherlands gave the city tulips to thank Canada for wartime help.',
      government:
        'Parliament Hill is in Ottawa, where Canada’s Parliament meets. The House of Commons is elected, but the Senate is appointed.',
      economy:
        'The federal government is by far Ottawa’s biggest employer. Technology companies grew up around it, working on software and security.',
    },
    comparison: [
      'Washington, D.C. became its own district, separate from every state. Ottawa stayed inside Ontario, so its capital area spreads over two provinces.',
      'Both are government towns, but Washington has the Smithsonian museums and the World Bank. Ottawa has fewer private companies, mostly in technology.',
      'An elected president runs Washington and leads both the state and the government. Ottawa answers to a prime minister, with a Governor General standing in for the king.',
    ],
  },
  {
    id: 'toronto',
    name: 'Toronto',
    country: 'ca',
    kind: 'economy',
    lat: 43.6532,
    lng: -79.3832,
    model: 'cn-tower',
    tagline: 'Bay Street money and the CN Tower',
    pair: 'finance',
    facts: [
      { label: 'Population', value: '~3 million in the city, ~6.5 million around it' },
      { label: 'Landmark', value: 'CN Tower, finished in 1976' },
      { label: 'Role', value: 'Canada’s money centre and capital of Ontario' },
    ],
    sections: {
      geography:
        'Toronto sits on the north-west shore of Lake Ontario. The lake keeps winters mild, but it also brings heavy snow.',
      culture:
        'Toronto is one of the most mixed cities in the world. About half the people living there were born outside Canada.',
      government:
        'Toronto is both Canada’s biggest city and the capital of Ontario. The province can change the city’s council and its powers.',
      economy:
        'Bay Street is where Canada’s money business is centred. The city makes about one fifth of everything Canada produces.',
    },
    comparison: [
      'New York City is a world money centre, where Wall Street sets prices. Toronto is far smaller, and a few big banks run most of it.',
      'Both are the biggest cities in their countries and the main place immigrants arrive. New York has a powerful elected mayor, but a province can change Toronto’s council.',
      'New York is the centre of an area with about twenty million people. Toronto has about six and a half million, and mostly sells its culture nearby.',
    ],
  },
  {
    id: 'vancouver',
    name: 'Vancouver',
    country: 'ca',
    kind: 'economy',
    lat: 49.2827,
    lng: -123.1207,
    model: 'canada-place',
    tagline: 'A port city squeezed between mountains and sea',
    pair: 'pacific-tech',
    facts: [
      { label: 'Population', value: '~700,000 in the city, ~2.6 million around it' },
      { label: 'Landmark', value: 'Canada Place, built for Expo 86' },
      { label: 'Role', value: 'Largest port on Canada’s west coast' },
    ],
    sections: {
      geography:
        'Vancouver sits on a peninsula in the Salish Sea. The Coast Mountains rise almost straight up out of the water.',
      culture:
        'Vancouver is known for the outdoors and for Stanley Park. Canada Place, with its white sails, was built for Expo 86.',
      government:
        'Vancouver is not the capital of British Columbia. Victoria, on Vancouver Island, holds the capital and the province’s power.',
      economy:
        'The Port of Vancouver is the biggest port in Canada. Grain, coal and wood from the Prairies leave the country through it.',
    },
    comparison: [
      'The Bay Area became rich from Stanford University, investors and software. Vancouver became rich from its port and film making, with few big technology offices.',
      'Both are costly Pacific coast cities with many people from Asia. San Francisco has a strong state, but a province decides Vancouver’s buses and housing rules.',
      'The Bay Area’s housing problem spreads across dozens of cities. Vancouver is one crowded city, squeezed between water, mountains and farmland.',
    ],
  },
  {
    id: 'calgary',
    name: 'Calgary',
    country: 'ca',
    kind: 'economy',
    lat: 51.0447,
    lng: -114.0719,
    model: 'calgary-tower',
    tagline: 'Home base for Canada’s oil and gas companies',
    pair: 'interior-economy',
    facts: [
      { label: 'Population', value: '~1.4 million in the area' },
      { label: 'Landmark', value: 'Calgary Tower, finished in 1968' },
      { label: 'Role', value: 'Where Canada’s oil and gas companies are based' },
    ],
    sections: {
      geography:
        'Calgary sits where the Bow and Elbow rivers meet. It stands about an hour’s drive from the Rocky Mountains.',
      culture:
        'Calgary is young and growing fast. Every July the city holds the Calgary Stampede, a rodeo that started in 1912.',
      government:
        'A mayor and a council elected by neighbourhood run Calgary. The province’s law-making body sits in Edmonton, not here.',
      economy:
        'Calgary is where Canada’s energy companies have their main offices. Oil prices make the city’s economy jump up and down.',
    },
    comparison: [
      'Chicago is an inland city that grew on trains and trade. Calgary grew on oil and gas, and on the company offices that run it.',
      'Both cities matter more in business than their size suggests. Chicago sits among busy factories, while Calgary sits on empty prairie.',
      'Chicago’s troubles are closing factories and money problems. Calgary’s jobs appear and vanish with oil prices, and its oil money is controlled elsewhere.',
    ],
  },
  {
    id: 'montreal',
    name: 'Montreal',
    country: 'ca',
    kind: 'culture',
    lat: 45.5019,
    lng: -73.5674,
    model: 'notre-dame-basilica',
    tagline: 'The biggest French-speaking city in North America',
    pair: 'culture',
    facts: [
      { label: 'Population', value: '~1.8 million in the city, ~4.3 million around it' },
      { label: 'Landmark', value: 'Notre-Dame Basilica, Old Montreal' },
      { label: 'Role', value: 'Quebec’s culture centre and a place that builds planes' },
    ],
    sections: {
      geography:
        'Montreal sits on an island in the St. Lawrence River. Ships travel up the river from the Atlantic to the Great Lakes.',
      culture:
        'Montreal is the centre of French-language culture in North America. It hosts a big jazz festival and a comedy festival.',
      government:
        'Montreal is the biggest city in Quebec, but it is not the capital. Nineteen borough councils run local services, which is unusual in Canada.',
      economy:
        'Montreal’s main work is building planes, video games and medicine. Research labs at McGill and the Université de Montréal lead in machine learning.',
    },
    comparison: [
      'Los Angeles sells more films and TV shows around the world than anywhere else. Montreal makes films and video games too, but mostly for people who speak French.',
      'Both cities have many immigrants and a big second language. Montreal’s language rules are provincial law, covering store signs, schools and public services.',
      'Los Angeles is dozens of cities with no one centre. Montreal is a crowded island run by one city hall and nineteen borough councils.',
    ],
  },
  {
    id: 'banff',
    name: 'Banff & the Canadian Rockies',
    country: 'ca',
    kind: 'geography',
    lat: 51.1784,
    lng: -115.5708,
    model: 'banff-peaks',
    tagline: 'Canada’s first national park, cut by ancient ice',
    pair: 'natural-wonders',
    facts: [
      { label: 'Established', value: '1885, Canada’s first national park' },
      { label: 'Setting', value: 'Banff and Lake Louise, Alberta Rockies' },
      { label: 'Status', value: 'A place the world agrees is worth protecting' },
    ],
    sections: {
      geography:
        'Banff sits in the Bow River valley, high in the Rocky Mountains. Long ago, slow sheets of ice carved out the valleys and lakes.',
      culture:
        'The town exists almost completely for visitors. About four million people come through the park each year.',
      government:
        'Banff runs its own town government with a mayor and a council. Parks Canada owns the land and decides how it may be used.',
      economy:
        'Almost all the work in Banff comes from tourists. Most jobs are seasonal, and homes are hard to find.',
    },
    comparison: [
      'The Grand Canyon was cut by one river through a dry plateau. The Rockies were shaped by ice, which left the blue-green lakes Banff is famous for.',
      'The Grand Canyon is run by the National Park Service and has no towns. Banff has its own town and mayor, but the federal government controls the land.',
      'Both are about a five-hour drive from big cities and draw millions of visitors. The Grand Canyon is hot desert, while Banff is snow-covered half the year.',
    ],
  },
  {
    id: 'quebec-city',
    name: 'Quebec City',
    country: 'ca',
    kind: 'culture',
    lat: 46.8139,
    lng: -71.208,
    model: 'chateau-frontenac',
    tagline: 'The walled capital city of French North America',
    pair: 'heritage',
    facts: [
      { label: 'Founded', value: '1608, by Samuel de Champlain' },
      { label: 'Landmark', value: 'Château Frontenac, overlooking the river' },
      { label: 'Status', value: 'Old Quebec is a place the world agrees is worth protecting' },
    ],
    sections: {
      geography:
        'Quebec City sits where the St. Lawrence River narrows to about a kilometre. It is the oldest walled city north of Mexico.',
      culture:
        'Quebec City is the heart of French culture in North America. Old Quebec has the Château Frontenac and cobbled streets.',
      government:
        'Quebec City is the capital of Quebec. The National Assembly meets here with 125 elected members.',
      economy:
        'Quebec City depends on government work, tourism, insurance and technology. Old Quebec brings in millions of visitors each year.',
    },
    comparison: [
      'New Orleans began as a French town and still mixes Caribbean and African cultures. Quebec City is still French-speaking, with French as its only official language.',
      'Both draw crowds to an old quarter beside the water. Old Quebec has stone walls, while the French Quarter is a flat grid.',
      'New Orleans is a city inside a state, and Baton Rouge often overrules it. Quebec City is a capital itself, holding provincial power.',
    ],
  },
]
