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
      'Washington, D.C. was made into its own district, separate from every state. Ottawa stayed inside Ontario and simply uses some of its land. So the capital area spreads across two provinces instead of being its own.',
      'Both cities are government towns. Washington also has the Smithsonian museums, the World Bank and the federal courts. Ottawa has a smaller role. It has fewer private companies, most of them in technology.',
      'Washington is run by an elected president. That one person is both the head of state and the head of the government. Ottawa answers to a prime minister who leads Parliament. A Governor General stands in for the king.',
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
      'New York City is a money centre for the whole world. Wall Street there sets prices in the money most countries use. Toronto is the money centre for Canada. Its market is much smaller. A few big banks run most of it.',
      'Both are the biggest cities in their countries and the main place where immigrants arrive. New York runs five boroughs with a powerful mayor that voters elect. Toronto sits under a province. That province can change its city council and its powers. It has done so.',
      'New York is the centre of an area with about twenty million people. Its films and TV shows go out all over the world. Toronto is the centre of an area with about six and a half million. It mostly sells its culture to one nearby country.',
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
      'The Bay Area became rich from Stanford University, money from investors and software. Vancouver became rich from its port, its natural resources and film making. Very few of the world’s biggest technology companies have their main office in Vancouver.',
      'Both are costly cities on the Pacific coast with many people from Asia. San Francisco is in a state with its own strong law-making body. It also has a powerful mayor. Vancouver answers to a province. That province decides on buses and trains. It also decides on housing rules and on money from resources.',
      'The Bay Area has a housing problem spread across dozens of separate cities. Vancouver has one crowded city. It is squeezed between water, mountains and land kept for farming.',
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
      'Chicago is an inland city that grew on trains, water and the trading of goods. Calgary is an inland city. It grew on one resource, oil and gas. It also grew on the company offices that run it.',
      'Both cities matter far more in business than their size suggests. Chicago sits in the middle of a busy factory region. The land around Calgary is empty prairie and oil fields.',
      'Chicago’s troubles are closing factories and money problems. Calgary’s troubles come from its ups and downs. Jobs appear and vanish when oil prices change. The province that controls its oil money sits in another city.',
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
      'Both cities have many immigrants. Both have a big second language. Los Angeles has Spanish, and Montreal has French. Montreal goes further. Its language rules are part of provincial law. They cover store signs, schools and public services. No American city has rules like that.',
      'Los Angeles is a huge group of dozens of cities. It has no one clear centre. Montreal is a crowded island run by one city hall and nineteen borough councils.',
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
      'The Grand Canyon was cut by one river running through a dry, flat plateau. The Rockies were shaped mostly by ice. Slow sheets of ice carved wide valleys. They left the bright blue-green lakes Banff is famous for.',
      'The Grand Canyon is run by the National Park Service. The federal government owns the land. No towns sit inside the park. Banff has a real town with its own mayor and council. The federal government still controls how the land is used.',
      'Both are about a five-hour drive from big cities. Both draw millions of visitors a year. The Grand Canyon sits in a hot desert about two thousand metres up. Banff sits in a cold mountain valley. It is covered in snow for half the year.',
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
      'New Orleans began as a French town. Today it mixes French, Caribbean and African cultures. French survives mostly in names and street signs. Quebec City is still French-speaking. French is its only official language, and the government works to protect it.',
      'Both cities draw crowds to an old quarter beside the water. Old Quebec still has its stone walls and an upper town on a cliff. The French Quarter in New Orleans is a flat grid. Its low buildings sit around Jackson Square.',
      'New Orleans is a city inside a state. It has little control over its own rules. The state government in Baton Rouge often overrules it. Quebec City is a capital itself. It holds provincial power that New Orleans can only ask for.',
    ],
  },
]
