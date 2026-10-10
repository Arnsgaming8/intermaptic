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
        'Ottawa sits on the south bank of the Ottawa River. Gatineau sits right across the water in Quebec. The capital area was planned to cover both provinces. The river marks the line between English-speaking Ontario and French-speaking Quebec. The city spreads over a low valley of limestone rock. The Rideau Canal runs through it. That canal is a place the world agrees is worth protecting. Winters here are long and very cold. Most years the canal freezes solid. Then it becomes the biggest skating rink in the world.',
      culture:
        'Ottawa speaks two languages, English and French. French is common on the east side, facing Quebec. It is also common in government offices. The city is known for national places, not for business. Parliament Hill holds the Peace Tower and the Centennial Flame. The National Gallery and the National Arts Centre are here too. So is the Canadian Museum of History, across the river. Every winter the city holds the Winterlude festival. Every spring tulips bloom. The Netherlands gave Canada those bulbs as a thank you. It was for help during a war.',
      government:
        'Parliament Hill is in Ottawa. That is where Canada’s Parliament meets. It has two parts. The House of Commons is elected by voters. The Senate is appointed. A Governor General stands in for the king. The city has its own mayor and city council. But the province of Ontario runs the big services. Health care, schools and highways are run from Queen’s Park in Toronto. The capital area crosses a provincial border. So a federal agency looks after much of the park land. That land lies on both sides of the river.',
      economy:
        'The federal government is by far the biggest employer. Over time technology companies grew up around it. They work on phones, software and computer security. The city’s economy stays fairly steady. Government jobs do not come and go the way other jobs do. Tourists and conferences bring in money too. So does the research park in nearby Kanata. Ottawa depends on money much less than Toronto does.',
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
        'Toronto sits on the north-west shore of Lake Ontario. The land there is flat. Rivers called the Don and the Humber cut deep valleys through it. A long sandy spit called the Toronto Islands reaches out into the lake. The lake keeps winters milder than Ottawa’s. But it also causes sudden heavy snow. Toronto is the biggest city in the Golden Horseshoe. That is a curved band of towns around the west end of the lake. It is the most crowded part of Canada. It runs toward Hamilton and Niagara.',
      culture:
        'Toronto is one of the most mixed cities in the world. About half the people who live there were born outside Canada. Different neighbourhoods grew from waves of newcomers. They came from Italy, Portugal, the Caribbean, China, South Asia and the Philippines. The CN Tower and the Royal Ontario Museum are famous city landmarks. So are the Art Gallery of Ontario and the Toronto International Film Festival. The city has pro teams in hockey, baseball, basketball and soccer. It is also the centre of English Canadian publishing, TV and music.',
      government:
        'Toronto is both Canada’s biggest city and the capital of Ontario. So it has two governments at once. One is a mayor and a city council at Toronto City Hall. The other is the provincial law-making body at Queen’s Park. It is led by a premier, who leads the province. A cabinet helps run it too. In Canada, cities do not have powers of their own that are protected. They exist because the province lets them. The province decides the rules for police, for buses and trains, and for building. Ontario has changed Toronto’s council more than once. It has stepped into city business too. The province’s Lieutenant-Governor, who stands in for the king, also sits here.',
      economy:
        'Bay Street is where Canada’s money business is centred. The Toronto Stock Exchange is there. So are the main offices of Canada’s biggest banks. Most insurance and pension companies are there too. The biggest kinds of work are money, technology, property, media and science. Toronto makes about one fifth of everything Canada produces. New immigrants matter a lot to the city. They fill jobs. They also need homes, which keeps building work going.',
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
        'Vancouver sits on a peninsula in the Salish Sea. The Coast Mountains rise almost straight up out of the water to the north. The Fraser River spreads into a delta to the south. The weather here is the mildest of any big Canadian city. Winters are wet. Summers are dry. Thick rainforest grows all around. It has huge red cedars and Douglas firs. The country’s trains from the east end here. This is also the Canadian port closest to Asia.',
      culture:
        'Vancouver is known for the outdoors. Stanley Park, the seawall and the North Shore mountains are minutes from downtown. The city is also shaped by people who came from Asia and the Pacific. Richmond and Surrey have large Chinese, South Asian and Filipino communities. Canada Place has white sails on its roof. It was built for Expo 86 as the Canada Pavilion. The 2010 Winter Olympics changed the waterfront and made the city better known. Many films and TV shows are made here. People call it Hollywood North. The First Nations who have always lived here are still important. They are central to how the city sees itself.',
      government:
        'Vancouver is not the capital of British Columbia. Victoria, on Vancouver Island, is. The city has a mayor and a council. Voters pick the whole council at once, not one member for each neighbourhood. A group called Metro Vancouver runs water, sewers and big parks for the whole area. The province makes the biggest decisions. Its law-making body sits in Victoria. It runs health care and schools. It sets a tax on pollution. It also decides which companies may cut trees or dig mines. Much of the city stands on land that was never handed over by treaty. The Musqueam, Squamish and Tsleil-Waututh First Nations have always lived here.',
      economy:
        'The Port of Vancouver is the biggest port in Canada. Most grain, coal, potash and wood from the Prairies leaves the country through it. It all heads to Asia. Technology, film, tourism and schools for foreign students have grown too. People from other countries also buy a lot of property here. That has pushed house prices to the highest in Canada. Moving goods is still the base of the area’s economy. That means the port, the rail yards and the airport.',
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
        'Calgary sits where the Bow and Elbow rivers meet. It stands on rolling foothills about an hour’s drive from the Rocky Mountains. The city is about a kilometre above sea level. No other prairie city has mountains that close behind it. A warm wind called a chinook can raise the temperature fast. It can jump twenty degrees in a few hours. Calgary is the biggest city between Toronto and Vancouver. It is the northern end of a busy strip of cities. That strip runs down to Edmonton.',
      culture:
        'Calgary is young and growing fast. Two things shape it. One is its ranching past. The other is money from oil. Every July the city holds the Calgary Stampede. It is a rodeo and a big fair that started in 1912. The Stampede grounds and the Saddledome sit right next to downtown. The 1988 Winter Olympics left ski hills, a speed skating oval and a bobsled track. Winter sports are still a big part of life here. The city also has the National Music Centre and a growing art scene. Oil money pays for much of it.',
      government:
        'A mayor and a council elected by neighbourhood run Calgary. But the province makes the big calls. Alberta’s law-making body and its premier sit in Edmonton, not Calgary. That leaves the money city and the government city pulling against each other. The province decides how much money it gets for oil and gas. It sets the rules for the environment and for electricity. One agency, the Alberta Energy Regulator, enforces them. A city’s luck can change because of choices made 300 kilometres north. Calgary sits on land covered by Treaty 7. The Blackfoot Confederacy, the Tsuut’ina and the Stoney Nakoda have always lived here.',
      economy:
        'Calgary is where Canada’s energy companies have their main offices. Oil and gas producers are here. So are pipeline companies, engineering firms, banks and law offices that serve them. Having so much in one industry makes the city’s economy jump up and down. It swings more than any other big city in Canada. It boomed during the oil sands years. Then tens of thousands of people lost jobs. Oil prices crashed in 2014 and 2020. Since then the city has tried to grow other kinds of work. It has added technology, clean energy, shipping and film. It is still the fastest-growing big city in Canada.',
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
        'Montreal sits on an island in the St. Lawrence River. The river splits and narrows around it. A small group of hills rises in the middle of the city. The tallest one is Mount Royal. Ships can travel up the St. Lawrence from the Atlantic. They can go all the way to the Great Lakes. That is the reason the city grew here. It is also where ocean ships meet trains and canals. Those routes head for Ontario and the American Midwest. The city has four clear seasons. Snow falls heavily. Summer is short but hot. In winter, much of city life moves indoors and underground.',
      culture:
        'Montreal is the centre of French-language culture in North America. People use both French and English in daily life. The city has a long history of theatre, jazz, circus acts, cartoons and small films. Old Montreal and Notre-Dame Basilica are the heart of it. So are the Plateau and Mile End neighbourhoods. The city holds a big jazz festival and a comedy festival called Just for Laughs. Expo 67 and the 1976 Olympics gave the city the Biosphere and the Olympic Stadium. They also left public spaces that still shape how it looks.',
      government:
        'Montreal is the biggest city in Quebec, but it is not the capital. The law-making body and the premier sit in Quebec City. Montreal has a mayor and a city council. It also has nineteen borough councils that run local services. That is unusual in Canada and gives each neighbourhood real power. Quebec is the only province where French is the single official language. A provincial law called the Charter of the French Language says so. Quebec is also the only province that uses written rules for private matters. Those rules are set down in books. Other provinces use rules built from past court decisions. This is a leftover from when France ruled here. Many people here still want Quebec to control more of its own affairs. A federal party called the Bloc Québécois pushes for that too.',
      economy:
        'Montreal’s main kinds of work are building planes, computer research, video games and medicine. It is also a centre for French-language media. A company called Bombardier helped make the area a centre for building planes. Research labs at McGill and the Université de Montréal are here. They made the city a world centre for machine learning. Big game companies have studios here that employ thousands of people. The city’s port and factories have shrunk compared with Toronto. That has been true for a long time. Most of the new growth now comes from technology and creative work, not heavy industry.',
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
        'Banff sits in the Bow River valley, high in the Rocky Mountains. Rock peaks of limestone and shale rise all around it. They stand more than three thousand metres above sea level. Long ago, slow sheets of ice carved out the valleys. They left behind Lake Louise and Moraine Lake, which are a bright blue-green. A line of icefields runs along the mountain tops. That line splits the continent’s water. Rain and snow on one side flow to the Pacific. On the other side they flow to the Atlantic. Banff is the only real town inside a Canadian national park. A government agency called Parks Canada manages the land. It decides how every piece there may be used.',
      culture:
        'The town exists almost completely for visitors. About four million people come through the park each year. They ski, hike, climb and take photos of the lakes. The Banff Springs Hotel opened in the 1880s. It was built by the national railway. Together with the Château Lake Louise, it started a long tradition of mountain resorts. Since the 1930s the Banff Centre has welcomed artists and musicians. It is a place where they go to work. First Nations people lived in the Rockies long before the park existed. The Stoney Nakoda, Blackfoot and Ktunaxa still have close ties to the Bow Valley.',
      government:
        'Banff runs its own town government with a mayor and a council. But the land under the town belongs to the federal government. Parks Canada manages it. Federal law fixes the town’s borders. Anyone who wants to build needs Parks Canada to agree. The town is also not allowed to grow past about eight thousand permanent residents. That rule keeps it from outgrowing the services it has. Alberta’s provincial rules still apply here. Schools and health care work the same way they do elsewhere in the province.',
      economy:
        'Almost all the work in Banff comes from tourists. People work in hotels, guiding, ski hills, restaurants and shops. Most of those jobs are seasonal. To live in the townsite, workers need a special permit. The park is a big part of Alberta’s visitor industry. It is also one of the best-known pictures of Canada around the world. The land belongs to the federal government. The town cannot grow, so there is very little space. Homes are hard to find. Many workers live in the nearby town of Canmore instead.',
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
        'Quebec City sits where the St. Lawrence River narrows to about a kilometre. Because the river is so narrow there, whoever held this spot controlled the whole route. The city’s name comes from an Algonquin word for that narrowing. The old town has two parts. The upper town sits on top of a cliff called Cap Diamant. Walls run around it. The lower town sits down at the water. Steep streets and a cable car called a funicular connect them. Quebec City is the oldest walled city north of Mexico. It has the only city walls left in Canada.',
      culture:
        'Quebec City is the heart of French culture in North America. People here have kept their language for two and a half centuries. That covers British and Canadian rule. Old Quebec has the Château Frontenac, the Petit-Champlain quarter and cobbled streets. It is the most complete old town of its kind on the continent. It still looks much the way it did before factories and cars. The winter carnival and the summer festival are the biggest events of the year. In 1759 the British beat the French on the Plains of Abraham, above the river. That land is a city park now. Many people see it as the starting point of Canadian history.',
      government:
        'Quebec City is the capital of Quebec. The National Assembly meets here. It is a single law-making body with 125 elected members. A premier and a cabinet lead it. A Lieutenant-Governor stands in for the king. The city has its own mayor and council. Provincial law protects the French language here. French is the only official language of Quebec. The Charter of the French Language sets rules for store signs, schools and public services. The National Assembly has often asked for Quebec to be recognised. It wants Quebec seen as its own distinct society. It has also asked for more power over immigration.',
      economy:
        'Quebec City depends on government work, tourism, insurance and a growing technology sector. The technology companies grew up around the provincial government. That government buys a lot of equipment and services. The local university helped too. Old Quebec brings in millions of visitors each year. It is the centre of the province’s tourism business. The port handles cruise ships and heavy cargo. The city is smaller and steadier than Montreal. Fewer people are out of work. More of its workers have government or service jobs.',
    },
    comparison: [
      'New Orleans began as a French town. Today it mixes French, Caribbean and African cultures. French survives mostly in names and street signs. Quebec City is still French-speaking. French is its only official language, and the government works to protect it.',
      'Both cities draw crowds to an old quarter beside the water. Old Quebec still has its stone walls and an upper town on a cliff. The French Quarter in New Orleans is a flat grid. Its low buildings sit around Jackson Square.',
      'New Orleans is a city inside a state. It has little control over its own rules. The state government in Baton Rouge often overrules it. Quebec City is a capital itself. It holds provincial power that New Orleans can only ask for.',
    ],
  },
]
