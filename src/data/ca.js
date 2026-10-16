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
      { label: 'Population', value: 'About 1.5 million in the wider region' },
      { label: 'Landmark', value: 'Peace Tower, finished in 1927' },
    ],
    sections: {
      geography:
        'Ottawa sits on the south bank of the Ottawa River. The Rideau Canal freezes each winter. It turns into a long skating rink. The city stands in a wide valley made of farmland and low hills. The Gatineau Hills rise across the river in Quebec. Winters run long and very cold, often below minus twenty. Summers stay short and hot, with afternoon thunderstorms. Downtown sits on the Ontario side. Gatineau is across the water. Ottawa keeps growing as more and more people move to the capital.',
      culture:
        'Ottawa runs on two languages, English and French. The Netherlands sent the city tulips to thank Canada for its wartime help. Every spring a tulip festival fills the parks with flowers. Winterlude brings ice sculptures and skating to the canal each February. The National Gallery and the history museum both sit near the river. Several universities draw students from across the country. Ice hockey is the sport people follow most closely. ByWard Market is the old market. Food and music fill it.',
      government:
        'Parliament Hill is in Ottawa, and Parliament meets there. The House of Commons is elected, while the Senate is appointed. The prime minister works from an office beside Parliament Hill. Ottawa is a city inside Ontario. It has its own mayor. It has a council too. The council has twenty-four members, one from each ward. Ottawans vote for a mayor and councillors in October 2026. The federal government owns much of the land across the capital area. Voters here elect members to the city and to the province too.',
      economy:
        'The federal government is the biggest employer by far. Tech firms grew up around it. Software and security work fills a technology park in Kanata. Hospitals, universities and research labs employ thousands. Tourists come for Parliament. They also come for the canal and the museums. Public servants make up a large share of the people who work here. The city spends large sums each year on roads, transit and water. Homes cost less here than in Toronto or Vancouver.',
    },
    comparison: [
      'Washington became its own district, separate from every state. Ottawa stayed inside Ontario, so its capital region spreads over two provinces.',
      'Both are government towns. Washington has the Smithsonian museums and the World Bank, while Ottawa leans on technology firms.',
      'An elected president runs Washington and leads the government. Ottawa answers to a prime minister, with a Governor General standing in for the king.',
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
      { label: 'Population', value: '~3.3 million in the city, ~6.2 million across the metro area' },
      { label: 'Landmark', value: 'CN Tower, finished in 1976' },
      { label: 'Role', value: 'Canada’s money centre and capital of Ontario' },
    ],
    sections: {
      geography:
        'Toronto sits on the north-west shore of Lake Ontario. The lake keeps the winters mild, but it also brings heavy snow. The city spreads over a flat plain above the water. Ravines cut through it. Many are kept as parkland. Low hills and farmland lie just north of the city. The wider region holds about six million people. Summers come warm and humid, and thunderstorms are common. Three rivers run through the city, and all of them are small.',
      culture:
        'Toronto is one of the most mixed cities in the world. Roughly half the people who live here were born abroad. More than one hundred languages are spoken in the city. Chinatown, Little Italy and Little Jamaica are well-known districts. The Royal Ontario Museum is one of the big museums. The Toronto International Film Festival runs every September. Hockey has a professional team here, and so do baseball and basketball. Caribbean Carnival fills the streets. The parade draws a huge crowd.',
      government:
        'Toronto is both the biggest city in Canada and the capital of Ontario. The province can change how the city council works and what it can do. Voters across Toronto elect the mayor. They also choose councillors. Toronto has twenty-five wards. Each ward elects one councillor. The city runs transit, police, water and garbage collection. Ontario’s parliament sits in Toronto at Queen’s Park. The next city election comes in October 2026. Provincial police and the courts also serve the city.',
      economy:
        'Bay Street holds Canada’s money business. Most of the biggest banks in Canada keep their head offices here. The Toronto Stock Exchange is the main market in the country. Film and television production is a large industry in the city. Technology, insurance and health research employ many people too. The wider Toronto region produces a large share of the country’s output. Housing costs worry a lot of families. Pearson Airport is the busiest airport in Canada.',
    },
    comparison: [
      'New York is a world money centre, where Wall Street sets prices. Toronto is far smaller, and a few big banks run the show.',
      'Both are the biggest cities in their countries and the main place newcomers land. New York elects a powerful mayor, but a province can reshape Toronto’s council.',
      'New York anchors an area of about twenty million people. Toronto has about six million, and mostly sells its culture next door.',
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
      { label: 'Population', value: '~700,000 in the city, ~2.6 million across the metro area' },
      { label: 'Landmark', value: 'Canada Place, built for Expo 86' },
      { label: 'Role', value: 'Largest port on Canada’s west coast' },
    ],
    sections: {
      geography:
        'Vancouver sits on a peninsula in the Salish Sea. The Coast Mountains rise almost straight up out of the water there. The city is on the mainland. False Creek cuts into it. The Fraser River carries fresh water into the sea south of the city. Douglas firs and cedars grow thickly on the nearby slopes. The border with the United States lies close by. Winters stay mild, so snow is rare near the water. Winter rain is common, and the city often looks grey.',
      culture:
        'Vancouver is known for the outdoors and for Stanley Park. Canada Place, with its white sails, was built for Expo 86. About half of the people living here were born outside the country. The Chinese and South Asian communities are large. Granville Island holds a public market and small theatres. The city is a centre for film and television production in Canada. Hockey draws big crowds here. So does soccer. People hike, ski and sail within an hour of downtown.',
      government:
        'Vancouver is not the capital of British Columbia. Victoria holds that job. Victoria sits on Vancouver Island. A mayor runs the city. Ten councillors work with the mayor. The city also elects park and school board members. The province decides most of the rules about housing and about transit. Metro Vancouver handles the water, the sewers and the regional parks. More than twenty separate cities make up the region. Vancouver picks its mayor and council in October 2026.',
      economy:
        'The Port of Vancouver is the biggest port in the whole country. Grain, coal and wood from the Prairies leave the country through it. Film making, software and tourism all have a home here. Cruise ships to Alaska start and end their trips here. Fishing and forestry have long been part of the local work. Homes here are among the most expensive in North America. Many people commute long distances to jobs downtown. The city taxes empty homes. Investors own many of them.',
    },
    comparison: [
      'The Bay Area got rich from Stanford University, investors and software. Vancouver got rich from its port and its film business, with few big tech offices.',
      'Both are costly Pacific coast cities with large Asian communities. San Francisco answers to a strong state. A province decides Vancouver’s transit and housing rules.',
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
      { label: 'Population', value: '~1.6 million in the city, about 1.7 million across the metro area' },
      { label: 'Landmark', value: 'Calgary Tower, finished in 1968' },
      { label: 'Role', value: 'Where Canada’s oil and gas companies are based' },
    ],
    sections: {
      geography:
        'Calgary sits where the Bow and the Elbow rivers come together. The Rocky Mountains sit about an hour’s drive from town. The land around the city is open grassland. People call it prairie. The mountains lie west, close enough to see. Winters bring cold snaps. Then a warm wind called a chinook can push the temperature up in minutes. The city sits more than a thousand metres above the level of the sea. Hailstorms and floods have hit the city in summer.',
      culture:
        'Calgary is a young city, and people keep moving here. Every July the city holds the Calgary Stampede, a rodeo that started in 1912. The Stampede runs for ten days and draws more than a million visitors. White cowboy hats show up all over downtown in July. The city has a large arena. Hockey has a strong following here. Several universities and colleges sit near the river. Newcomers arrive from other provinces and from other countries. Music and food festivals run through the summer.',
      government:
        'Calgary is run by a mayor plus a council elected by neighbourhood. The province’s law-making body sits in Edmonton, not here. Calgary has fourteen wards, and each one of them chooses a councillor. The city runs transit, water and emergency services. The province sets the rules for oil, gas and pipelines. Alberta has no provincial sales tax. So the city leans on property tax. City elections come every four years. Jeromy Farkas was elected as mayor of Calgary in October 2025.',
      economy:
        'Calgary is where Canada’s big energy companies keep their main offices. Hundreds of engineering and drilling firms work here. Banking serves the energy business. So does insurance. Trucking and rail links carry equipment out to the oilfields. Ranching and farming are common on the land all around the city. Oil prices make the economy jump up and down. Incomes run high here. Jobs can vanish when oil prices fall. Downtown has plenty of offices and very few homes.',
    },
    comparison: [
      'Chicago is an inland city that grew on trains and trade. Calgary grew on oil and gas, and on the company offices that run it.',
      'Both cities matter more in business than their size suggests. Chicago sits among busy factories, while Calgary sits alone on the prairie.',
      'Chicago’s troubles are closing factories and money problems. Calgary’s jobs come and go with oil prices, and the money is controlled elsewhere.',
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
      { label: 'Population', value: 'About 1.8 million in the city, about 4.3 million around it' },
      { label: 'Landmark', value: 'Notre-Dame Basilica, Old Montreal' },
      { label: 'Mayor', value: 'Soraya Martinez Ferrada, elected in 2025' },
    ],
    sections: {
      geography:
        'Montreal sits on an island in the St. Lawrence River. Ships travel up the river from the Atlantic to the Great Lakes. The hill in the middle of the city goes by the name Mount Royal. The river narrows and speeds up beside the island. Winters are cold here. Snow sticks around for months. Summers come warm and humid, and sometimes very hot. Tunnels under the city link buildings in winter. The island runs about fifty kilometres long. Most of the city’s residents live on it.',
      culture:
        'Montreal is the centre of French-language culture in all of North America. The city hosts a big jazz festival and a comedy festival. French is the everyday language for many residents. Several universities teach in both French and English. Old Montreal is full of stone buildings from the French and British periods. The city is famous for bagels, smoked meat and sugar pies. Hockey is followed closely here. The Canadiens are the local team. Street art and small music venues fill the Plateau.',
      government:
        'Montreal is the biggest city in Quebec, but it is not the capital. Soraya Martinez Ferrada became mayor in November 2025. Nineteen borough councils run local services. That setup is unusual in Canada. The mayor is elected by the whole city. Quebec’s law-making body sits in Quebec City. The province of Quebec sets the rules about language, schools and health care. Boroughs decide local matters such as parking and parks. City elections happen every four years.',
      economy:
        'Montreal’s main line of work is building planes, video games and medicine. Research labs at McGill and the Université de Montréal lead in machine learning. Film, animation and circus arts all thrive here. The port handles grain and containers. Oil moves through it too. Aerospace firms build aircraft parts and flight simulators. Software and artificial intelligence companies have grown fast here. Rents are lower than in Toronto or Vancouver. Shelters work hard to house people through the cold winters.',
    },
    comparison: [
      'Los Angeles sells more film and television around the world than anywhere else. Montreal makes films and video games too, mostly for people who speak French.',
      'Both cities have many immigrants and a big second language. Montreal’s language rules are provincial law, and they cover signs, schools and public services.',
      'Los Angeles is dozens of cities with no single centre. Montreal is a crowded island run by one city hall and nineteen borough councils.',
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
      { label: 'Visits', value: 'About 4 million a year' },
    ],
    sections: {
      geography:
        'Banff sits in the Bow River valley, high up in the Rocky Mountains. Long ago, slow sheets of ice carved out the valleys and the lakes. The park covers more than six thousand square kilometres. Lake Louise is fed by meltwater from the glacier above it. Rock flour in the water makes the lakes look blue-green. Winter lasts from November into April up in the high country. Elk, bears and bighorn sheep live in the park. Wolves live here too. Forest fires shape this mountain landscape. They are a natural part of it.',
      culture:
        'The town lives off visitors. Millions of people visit the park each year. Around eight thousand people live in the town all year. Park rules limit how many people are allowed to live in the town. Hiking, skiing and canoeing are the main activities. Grand old railway hotels stand in the town and beside Lake Louise. Visitors come from around the world to hike the trails. Rail tourists arrived in the 1880s. Hotels were built for them.',
      government:
        'Banff runs its own town government, with an elected mayor at the top. Parks Canada owns the land and decides how it may be used. The park is federal land, so national rules apply. The town must follow a plan that limits growth. Parks Canada uses shuttles and bookings to manage crowds at Lake Louise. Alberta’s provincial laws still cover schools and health. Voters elect the mayor and council every four years. Overnight visitors pay a park fee. The government collects it.',
      economy:
        'Almost all the work in Banff comes from tourists. Most jobs are seasonal. Homes here are hard to find. Hotels, restaurants and ski hills are the biggest employers. Workers often live in shared housing outside the town. Skiing in the winter and hiking in summer fill the whole calendar. The park is one of the most visited places in the whole country. Transport, guiding and outdoor shops add more jobs. Wages can be modest for seasonal work.',
    },
    comparison: [
      'The Grand Canyon was cut by one river through a dry plateau. Ice shaped the Rockies, and it left the blue-green lakes Banff is famous for.',
      'The National Park Service runs the Grand Canyon, which holds only small villages. Banff has its own town and mayor, but the federal government controls the land.',
      'Banff is about an hour and a half from Calgary. The Grand Canyon is a long drive from Phoenix or Las Vegas. Both draw millions of visitors. The Grand Canyon is hot desert, while Banff is snow-covered for half the year.',
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
        'Quebec City sits where the St. Lawrence River narrows to about a kilometre. It is the oldest walled city north of Mexico. The city stands on a high rock that rises above the river. The upper town sits on the cliff. The lower town sits by the water. Winters run long and cold. Snow piles up. The river freezes in places, and ice blocks the current. More than half a million people live in the city today. The old walls still stand around the historic part.',
      culture:
        'Quebec City is the heart of French culture in all of North America. Old Quebec has the Château Frontenac and cobbled streets. Most people speak French here. Many speak little English. The winter carnival brings ice palaces and a canoe race. A huge ice hotel is built just outside the city each winter. The city has a university founded in 1663. Restaurants here are known for maple, cheese and fresh bread. Music and theatre fill the summer evenings.',
      government:
        'Quebec City is the capital of Quebec. The National Assembly meets here, with 125 elected members. Quebec votes for its National Assembly in October 2026. Bruno Marchand was re-elected mayor in November 2025. The province runs the schools, the hospitals and most of the roads. Voters here elect both their city councillors and their provincial members. The city handles water, parks and garbage. Taxes come from property. More money comes from the province. The federal government adds its share.',
      economy:
        'Quebec City depends on government work, tourism, insurance and technology. Old Quebec brings in millions of visitors each year. Government offices are among the biggest employers. Insurance and financial companies keep large offices here. The port handles grain and wood. General cargo moves through it too. Software and health research have both grown over the last twenty years. The cost of living here is lower than in Montreal. Winter tourism brings visitors in for the ice hotel and the carnival.',
    },
    comparison: [
      'New Orleans began as a French town and still mixes Caribbean and African cultures. Quebec City remains French-speaking, with French as its only official language.',
      'Both draw crowds to an old quarter beside the water. Old Quebec has stone walls, while the French Quarter is a flat grid of streets.',
      'New Orleans is a city inside Louisiana, which keeps its capital in Baton Rouge. Quebec City is a capital itself, and it holds provincial power.',
    ],
    sources: [
      'Élections Québec, 2025',
      'Statistics Canada, 2026',
    ],
  },
]
