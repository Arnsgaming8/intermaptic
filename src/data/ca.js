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
      { label: 'Population', value: '~1.2 million in the capital area' },
      { label: 'Landmark', value: 'Peace Tower, finished in 1927' },
    ],
    sections: {
      geography:
        'Ottawa sits on the south bank of the Ottawa River. The Rideau Canal freezes each winter and becomes the biggest skating rink. The city stands in a wide valley of farmland and low hills. The Gatineau Hills rise across the river in Quebec. Winters are long and very cold, often below minus twenty. Summers are short, hot and humid, with afternoon thunderstorms. Downtown is on the Ontario side, and Gatineau is across the water. The city expects about 500,000 more people over the next 25 years.',
      culture:
        'Ottawa is a two-language city, English and French. The Netherlands gave the city tulips to thank Canada for wartime help. Every spring the tulip festival fills the parks with flowers. Winterlude brings ice sculptures and skating to the canal each February. The National Gallery and the history museum sit near the river. Three universities draw students from across the country and beyond. Ice hockey is the sport people follow most closely. ByWard Market is the old market district, full of food and music.',
      government:
        'Parliament Hill is in Ottawa, where Canada’s Parliament meets. The House of Commons is elected, but the Senate is appointed. The prime minister works from an office beside Parliament Hill. Ottawa is a city inside Ontario, with its own mayor and council. The council has twenty-four members, one from each ward. Mayor Mark Sutcliffe is seeking a second term in October 2026. The federal government owns much of the land in the capital area. Voters here elect members to both the city and the province.',
      economy:
        'The federal government is by far Ottawa’s biggest employer. Technology companies grew up around it, working on software and security. A technology park in Kanata holds hundreds of companies. Hospitals, universities and research labs employ thousands of people. Tourists come for Parliament, the canal and the museums. Public servants make up a large share of the workforce. The city has a ten-year plan to spend $10 billion on building. Homes cost less here than in Toronto or Vancouver.',
    },
    comparison: [
      'Washington, D.C. became its own district, separate from every state. Ottawa stayed inside Ontario, so its capital area spreads over two provinces.',
      'Both are government towns, but Washington has the Smithsonian museums and the World Bank. Ottawa has fewer private companies, mostly in technology.',
      'An elected president runs Washington and leads both the state and the government. Ottawa answers to a prime minister, with a Governor General standing in for the king.',
    ],
    sources: [
      'Statistics Canada, 2026',
      'City of Ottawa, 2026',
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
      { label: 'Population', value: '~3.3 million in the city, ~7 million around it' },
      { label: 'Landmark', value: 'CN Tower, finished in 1976' },
      { label: 'Role', value: 'Canada’s money centre and capital of Ontario' },
    ],
    sections: {
      geography:
        'Toronto sits on the north-west shore of Lake Ontario. The lake keeps winters mild, but it also brings heavy snow. The city spreads over a flat plain above the lake. Ravines cut through the city, and they are kept as parkland. Low hills and farmland lie just north of the city. The area around the city passed seven million people in 2024. Summers are warm and humid, and thunderstorms are common. Three rivers run through the city, all fairly small.',
      culture:
        'Toronto is one of the most mixed cities in the world. About half the people living there were born outside Canada. More than one hundred languages are spoken, though fewer newcomers arrived in 2026. Chinatown, Little Italy and Little Jamaica are well-known districts. The city has several big museums, including the Royal Ontario Museum. The Toronto International Film Festival runs every September. Hockey, baseball and basketball all have professional teams here. Caribbean Carnival brings a huge street parade each summer.',
      government:
        'Toronto is both Canada’s biggest city and the capital of Ontario. The province can change the city’s council and its powers. The mayor is elected by the whole city, and voters also choose councillors. Toronto has twenty-five wards, each electing one councillor. The city runs transit, police, water and garbage collection. The province’s parliament sits in Toronto at Queen’s Park. Mayor Olivia Chow is running for re-election in October 2026. Provincial police and the courts also serve the city.',
      economy:
        'Bay Street is where Canada’s money business is centred. The city makes about one fifth of everything Canada produces. Canada’s five biggest banks all have their head offices here. The Toronto Stock Exchange is the main market in the country. Film and television production is a large industry in the city. Technology, insurance and health research also employ many people. Housing costs are the issue voters name most often this year. Pearson Airport is the busiest airport in Canada.',
    },
    comparison: [
      'New York City is a world money centre, where Wall Street sets prices. Toronto is far smaller, and a few big banks run most of it.',
      'Both are the biggest cities in their countries and the main place immigrants arrive. New York has a powerful elected mayor, but a province can change Toronto’s council.',
      'New York is the centre of an area with about twenty million people. Toronto has about seven million, and mostly sells its culture nearby.',
    ],
    sources: [
      'Statistics Canada, 2026',
      'City of Toronto, 2026',
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
      { label: 'Population', value: '~700,000 in the city, ~3 million around it' },
      { label: 'Landmark', value: 'Canada Place, built for Expo 86' },
      { label: 'Role', value: 'Largest port on Canada’s west coast' },
    ],
    sections: {
      geography:
        'Vancouver sits on a peninsula in the Salish Sea. The Coast Mountains rise almost straight up out of the water. The city is on the mainland, with False Creek cutting into it. The Fraser River carries fresh water into the sea south of the city. Douglas firs and cedars grow thickly on the nearby slopes. The city lies close to the border with the United States. Mild winters mean snow is rare near the water. The city lost more than 8,000 people between 2024 and 2025.',
      culture:
        'Vancouver is known for the outdoors and for Stanley Park. Canada Place, with its white sails, was built for Expo 86. More than half the people living here were born outside Canada. Chinese and South Asian communities are large here. Granville Island holds a public market and small theatres. The city is a centre for film and television production. Hockey and soccer teams draw big crowds here. People hike, ski and sail within an hour of downtown.',
      government:
        'Vancouver is not the capital of British Columbia. Victoria, on Vancouver Island, holds the capital and the province’s power. A mayor and ten councillors run the city government. The city also elects park and school board members. The province decides most rules about housing and transit. Metro Vancouver handles water, sewers and regional parks. The region includes more than twenty separate cities. Mayor Ken Sim is running for re-election in October 2026.',
      economy:
        'The Port of Vancouver is the biggest port in Canada. Grain, coal and wood from the Prairies leave the country through it. The city is a centre for film making, software and tourism. Cruise ships to Alaska start and end their trips here. Fishing and forestry have long been part of the local work. Homes here are among the most expensive in North America. The region has lowered its growth forecast as fewer newcomers arrive. Empty homes owned by investors are taxed by the city.',
    },
    comparison: [
      'The Bay Area became rich from Stanford University, investors and software. Vancouver became rich from its port and film making, with few big technology offices.',
      'Both are costly Pacific coast cities with many people from Asia. San Francisco has a strong state, but a province decides Vancouver’s buses and housing rules.',
      'The Bay Area’s housing problem spreads across dozens of cities. Vancouver is one crowded city, squeezed between water, mountains and farmland.',
    ],
    sources: [
      'BC Stats, 2026',
      'Statistics Canada, 2025',
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
      { label: 'Population', value: '~1.4 million in the city, near 2 million around it' },
      { label: 'Landmark', value: 'Calgary Tower, finished in 1968' },
      { label: 'Role', value: 'Where Canada’s oil and gas companies are based' },
    ],
    sections: {
      geography:
        'Calgary sits where the Bow and Elbow rivers meet. It stands about an hour’s drive from the Rocky Mountains. The land around it is open grassland called prairie. The mountains lie to the west, close enough to see. Winters bring cold snaps and sudden warm winds. A warm wind called a chinook can raise the temperature quickly. The city is over a thousand metres above sea level. Hailstorms and floods have hit the city in summer.',
      culture:
        'Calgary is young, but growth slowed in 2026 as fewer people moved in. Every July the city holds the Calgary Stampede, a rodeo that started in 1912. The Stampede lasts ten days and draws over a million visitors. White cowboy hats are a common sight downtown in July. The city has a large arena and a strong hockey following. Several universities and colleges sit near the river. Newcomers come from other provinces and from many other countries. Music and food festivals run through the summer.',
      government:
        'A mayor and a council elected by neighbourhood run Calgary. The province’s law-making body sits in Edmonton, not here. Calgary has fourteen wards, each choosing one councillor. The city runs transit, water and emergency services. The province sets rules for oil, gas and pipelines. Alberta has no provincial sales tax, so the city leans on property tax. City elections are held every four years. Jeromy Farkas became mayor in October 2025 by a very narrow margin.',
      economy:
        'Calgary is where Canada’s energy companies have their main offices. Oil prices make the city’s economy jump up and down. Hundreds of engineering and drilling firms work here. The city is also a big centre for cattle ranching and farming. Banking and insurance serve the energy business. Trucking and rail links carry equipment to the oilfields. Incomes are high, but jobs vanish when oil prices fall. Downtown has many offices and few homes.',
    },
    comparison: [
      'Chicago is an inland city that grew on trains and trade. Calgary grew on oil and gas, and on the company offices that run it.',
      'Both cities matter more in business than their size suggests. Chicago sits among busy factories, while Calgary sits on empty prairie.',
      'Chicago’s troubles are closing factories and money problems. Calgary’s jobs appear and vanish with oil prices, and its oil money is controlled elsewhere.',
    ],
    sources: [
      'City of Calgary, 2026',
      'Statistics Canada, 2026',
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
      { label: 'Population', value: '~1.9 million in the city, ~4.5 million around it' },
      { label: 'Landmark', value: 'Notre-Dame Basilica, Old Montreal' },
      { label: 'Mayor', value: 'Soraya Martinez Ferrada, elected in 2025' },
    ],
    sections: {
      geography:
        'Montreal sits on an island in the St. Lawrence River. Ships travel up the river from the Atlantic to the Great Lakes. A hill in the middle of the city is called Mount Royal. The river narrows and speeds up beside the island. Winters are cold and snowy, with snow that stays for months. Summers are warm and humid, sometimes very hot. An underground network of tunnels links buildings in winter. The island is about fifty kilometres long and holds 1.9 million people.',
      culture:
        'Montreal is the centre of French-language culture in North America. It hosts a big jazz festival and a comedy festival. Most people here speak French at home and at work. The city has two main universities, one French and one English. Old Montreal has stone buildings from the French and British periods. The city is famous for bagels, smoked meat and sugar pies. Hockey is followed closely, and the Canadiens are the local team. Street art and small music venues are common in the Plateau.',
      government:
        'Montreal is the biggest city in Quebec, but it is not the capital. Soraya Martinez Ferrada became mayor in November 2025. Nineteen borough councils run local services, which is unusual in Canada. The mayor is elected by the whole city. Quebec’s law-making body sits in Quebec City. The province sets rules about language, schools and health. Boroughs decide some local matters, such as parking and parks. City elections happen every four years.',
      economy:
        'Montreal’s main work is building planes, video games and medicine. Research labs at McGill and the Université de Montréal lead in machine learning. The city is a centre for film, animation and circus arts. The port handles grain, containers and oil. Aerospace firms build aircraft parts and flight simulators. Software and artificial intelligence companies have grown quickly here. Rents are lower than in Toronto or Vancouver. The city planned about 3,000 shelter spaces for the coming winter.',
    },
    comparison: [
      'Los Angeles sells more films and TV shows around the world than anywhere else. Montreal makes films and video games too, but mostly for people who speak French.',
      'Both cities have many immigrants and a big second language. Montreal’s language rules are provincial law, covering store signs, schools and public services.',
      'Los Angeles is dozens of cities with no one centre. Montreal is a crowded island run by one city hall and nineteen borough councils.',
    ],
    sources: [
      'Statistics Canada, 2026',
      'City of Montreal, 2026',
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
      { label: 'Visits', value: '4.5 million in 2025-26, a record' },
    ],
    sections: {
      geography:
        'Banff sits in the Bow River valley, high in the Rocky Mountains. Long ago, slow sheets of ice carved out the valleys and lakes. The park covers more than six thousand square kilometres. Lake Louise is fed by meltwater from a glacier above it. Rock flour in the water makes the lakes look blue-green. Winter lasts from November into April in the high country. Elk, bears, wolves and bighorn sheep live in the park. Forest fires are a natural part of the mountain landscape.',
      culture:
        'The town exists almost completely for visitors. The park counted a record 4.5 million visits in 2025-26. The town has a permanent population of around eight thousand. Park rules limit how many people may live in the town. Hiking, skiing and canoeing are the main activities. Grand old railway hotels stand in the town and beside Lake Louise. National Geographic named Banff a best place to travel in 2026. Rail tourists arrived in the 1880s, and hotels were built for them.',
      government:
        'Banff runs its own town government with a mayor and a council. Parks Canada owns the land and decides how it may be used. The park is federal land, so national rules apply there. The town must follow a plan that limits growth. Parks Canada is adding measures to manage crowds at Lake Louise. Alberta’s provincial laws still cover schools and health. Town council has six members and a mayor. Overnight visitors pay a park fee collected by the government.',
      economy:
        'Almost all the work in Banff comes from tourists. Most jobs are seasonal, and homes are hard to find. Hotels, restaurants and ski hills are the biggest employers. Workers often live in shared housing outside the town. Skiing in winter and hiking in summer fill the calendar. The park is one of Canada’s most visited places. Transport, guiding and outdoor shops add more jobs. Wages are modest because so many people want to live here.',
    },
    comparison: [
      'The Grand Canyon was cut by one river through a dry plateau. The Rockies were shaped by ice, which left the blue-green lakes Banff is famous for.',
      'The Grand Canyon is run by the National Park Service and has no towns. Banff has its own town and mayor, but the federal government controls the land.',
      'Both are about a five-hour drive from big cities and draw millions of visitors. The Grand Canyon is hot desert, while Banff is snow-covered half the year.',
    ],
    sources: [
      'Parks Canada, 2026',
      'Town of Banff, 2026',
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
      { label: 'Mayor', value: 'Bruno Marchand, re-elected in 2025' },
    ],
    sections: {
      geography:
        'Quebec City sits where the St. Lawrence River narrows to about a kilometre. It is the oldest walled city north of Mexico. The city stands on a high rock above the river. The upper town sits on the cliff, and the lower town sits by the water. Winters here are long, cold and snowy. The river freezes in places, and ice blocks the current. About 560,000 people live in the city today. The old walls still stand around the historic part.',
      culture:
        'Quebec City is the heart of French culture in North America. Old Quebec has the Château Frontenac and cobbled streets. Most people speak French, and many speak little English. The winter carnival brings ice palaces and a canoe race. A huge ice hotel is built each winter outside the city. The city has a university founded in 1663. Restaurants here are known for maple, cheese and fresh bread. Music and theatre fill the summer evenings.',
      government:
        'Quebec City is the capital of Quebec. The National Assembly meets here with 125 elected members. In October 2026 the Parti Québécois won 59 of those seats. Bruno Marchand was re-elected mayor in November 2025. The province runs schools, hospitals and most roads. Voters here elect both city councillors and provincial members. The city also looks after water, parks and garbage. Taxes come from property, the province and the federal government.',
      economy:
        'Quebec City depends on government work, tourism, insurance and technology. Old Quebec brings in millions of visitors each year. Government offices are among the biggest employers. Insurance and financial companies have large offices here. The port handles grain, wood and general cargo. Software and health research have grown in the last twenty years. The city has a lower cost of living than Montreal. Winter tourism brings visitors for the ice hotel and the carnival.',
    },
    comparison: [
      'New Orleans began as a French town and still mixes Caribbean and African cultures. Quebec City is still French-speaking, with French as its only official language.',
      'Both draw crowds to an old quarter beside the water. Old Quebec has stone walls, while the French Quarter is a flat grid.',
      'New Orleans is a city inside a state, and Baton Rouge often overrules it. Quebec City is a capital itself, holding provincial power.',
    ],
    sources: [
      'Élections Québec, 2025',
      'Statistics Canada, 2026',
    ],
  },
]
