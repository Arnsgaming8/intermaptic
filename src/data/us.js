/**
 * United States stops for the Intermaptic atlas.
 * Schema is documented in src/data/shared.js; pair ids are owned by src/data/locations.js.
 * All prose is written for a 6th grade reading level (see README, "Reading level").
 * Figures are the newest the atlas could verify as of October 2026; each stop lists
 * where they came from in its `sources` list.
 */
export const US_STOPS = [
  {
    id: 'washington-dc',
    name: 'Washington, D.C.',
    country: 'us',
    kind: 'capital',
    lat: 38.8899,
    lng: -77.0091,
    model: 'us-capitol',
    tagline: 'Capital city built on purpose on the Potomac',
    pair: 'capitals',
    facts: [
      { label: 'Founded', value: '1790' },
      { label: 'Population', value: '~693,000 in the city, ~6.5 million around it' },
      { label: 'Federal jobs lost', value: 'Federal job cuts since 2025' },
    ],
    sections: {
      geography:
        'Washington sits where the Potomac River meets flat ground near the coast. The city sits on the fall line. Hills lie to the west, and the flat coastal plain starts here. Planners laid the city out as a square ten miles wide. Part of that square went back to Virginia in 1846. The Anacostia River joins the Potomac inside the city limits. Summers come hot and wet. Winters bring a little snow. The land sits low, so heavy rain can push the Potomac over its banks. About 6.5 million people live in the Maryland and Virginia suburbs.',
      culture:
        'Museums and monuments fill the city, because the government is the main business here. The Smithsonian museums cost nothing to enter. U Street holds a deep history of Black American culture. Residents come from every state. Many were born in other countries. The National Mall holds the monuments, and anyone can walk it. About four in ten residents are Black. Go-go music started here. Jazz clubs once lined the streets, and they drew players from all over. The city has its own baseball team and a loud basketball crowd.',
      government:
        'Washington is not a state. That means Congress has the last word on its laws. Residents elect a mayor and a council of thirteen. They still have no voting seat in Congress. The mayor runs the city day to day, and the council passes local laws. Congress can block any of those laws, and it sets the city budget. People here pay federal taxes like everyone else. Their delegate can speak in the House but cannot vote. National Guard troops have stood in the city since August 2025. Residents keep arguing for statehood.',
      economy:
        'The federal government is the biggest employer here, and it has been shrinking. Cuts since 2025 have hit the region hard. Data centers fill Northern Virginia. Tourism brings in millions of visitors a year. They spend money on hotels and food. Dulles and Reagan, the two airports, link the city to the world. Hospitals and universities employ thousands of people. Research labs sit beside them. Many residents work for contractors that serve federal agencies. Nonprofits and law firms keep their headquarters downtown.',
    },
    comparison: [
      'Washington was built from scratch on empty land, starting in 1790. Queen Victoria picked Ottawa as a capital in 1857.',
      'Congress can overrule the laws Washington passes, and it controls the budget. Ottawa answers to no federal body above it.',
      'Washington residents pay federal taxes but cannot vote in Congress. Ottawa residents vote for Parliament like other Canadians.',
    ],
    sources: [
      'U.S. Census Bureau, 2025',
      'D.C. Office of Planning, 2026',
      'U.S. Bureau of Labor Statistics, 2026',
    ],
  },
  {
    id: 'new-york-city',
    name: 'New York City',
    country: 'us',
    kind: 'economy',
    lat: 40.7128,
    lng: -74.006,
    model: 'statue-of-liberty',
    tagline: 'Money center and the country\u2019s largest city',
    pair: 'finance',
    facts: [
      { label: 'Settled', value: '1624, as New Amsterdam' },
      { label: 'Population', value: 'About 8.6 million in the city' },
      { label: 'Mayor', value: 'Zohran Mamdani, since January 2026' },
    ],
    sections: {
      geography:
        'The Hudson River cuts a gap through the mountains. That gap made this a port. Manhattan stands on hard rock. Towers could rise on it because the rock holds the weight. The city spreads across five boroughs and several islands. The East River is a strait, and it is not a true river. The Atlantic Ocean and Long Island Sound border the city. Winters stay cold and snowy. Summers turn hot and humid. Storms and rising water threaten the low streets along the coast.',
      culture:
        'Immigrants poured in through Castle Garden and later through Ellis Island. Newcomers keep coming. One in three residents was born outside the country. The schools hear more than two hundred languages. Chinatown, Little Italy and Harlem each grew from a different wave of arrivals. Broadway theaters and museums draw crowds all year. So do the concert halls. Pizza, bagels and street food are daily fare. Times Square pulls in visitors, and the New Year ball drop is famous. The Yankees and the Knicks are the home teams.',
      government:
        'A mayor runs New York City with a City Council of fifty-one members. Zohran Mamdani took office in January 2026. He is the first Muslim mayor and the first South Asian one. The United Nations keeps its headquarters here. Each borough has its own president. The council writes local laws. It also has to approve the city budget. Voters elect a public advocate and a comptroller as well. Taxes go to the city, the state and the country. New York State can pass laws the city must follow.',
      economy:
        'Wall Street and the New York Stock Exchange sit at the center of it all. Banks, insurers and law firms fill the downtown towers. Fashion, publishing, advertising and television employ thousands more. The port of New York and New Jersey is the busiest on the East Coast. Tourists arrive by the tens of millions each year. They fill hotels and restaurants. The city budget has passed one hundred billion dollars. Rents and home prices run high. They rank among the highest in the country.',
    },
    comparison: [
      'New York is about two and a half times the size of Toronto. Each city holds its country\u2019s main stock exchange.',
      'The New York Stock Exchange is the biggest market in the world. Toronto\u2019s exchange is medium-sized beside it.',
      'Both cities are where most newcomers to the country land first. Both draw a large share of their country\u2019s immigrants.',
    ],
    sources: [
      'U.S. Census Bureau, 2025',
      'NYC Mayor\u2019s Office, 2026',
      'Citizens Budget Commission, 2026',
    ],
  },
  {
    id: 'san-francisco',
    name: 'San Francisco Bay Area',
    country: 'us',
    kind: 'economy',
    lat: 37.7749,
    lng: -122.4194,
    model: 'golden-gate',
    tagline: 'Technology center on the Pacific coast',
    pair: 'pacific-tech',
    facts: [
      { label: 'Golden Gate Bridge', value: 'Opened 1937' },
      { label: 'Population', value: '~826,000 in the city, ~7.7 million around it' },
      { label: 'Mayor', value: 'Daniel Lurie, since January 2025' },
    ],
    sections: {
      geography:
        'The Bay Area wraps around a bay that the ocean flooded long ago. Two faults cross the region, the San Andreas and the Hayward. Fog rolls in most afternoons. The Golden Gate is the strait that joins the bay to the ocean. Hills shape the city, so many streets climb steeply. Near the edges the bay turns shallow and muddy. Summers stay cool and gray. Most of the rain falls in winter. Cable cars still climb the hills downtown. The wider region stretches from wine country down to Silicon Valley.',
      culture:
        'Writers called the Beats gathered in North Beach back in the 1950s. Technology took over later, and it is the city\u2019s biggest force now. Berkeley and Stanford bring in researchers from everywhere. Software and artificial intelligence companies drive the city again. The Chinatown here is one of the oldest in North America. Mission murals became famous. So did the Summer of Love in 1967. Sourdough bread and seafood are local staples. The 49ers started here. The Giants have played here since 1958.',
      government:
        'San Francisco is both a city and a county, and it runs as one. Voters elect a mayor. The Board of Supervisors has eleven members. The mayor runs the city and can veto the board. The board meets in City Hall, and it passes the local rules. Big questions often go straight to the ballot. Voters decide them directly. Dozens of small cities around the bay have their own councils. California sets many of the rules they follow. Voters also choose a district attorney and a sheriff.',
      economy:
        'The Bay Area leads the world in software and in money for new firms. Artificial intelligence companies have grown fast. Chip makers started in the valley south of the bay. The Port of Oakland is one of the busiest in the country. Tourists come for the bridge, the bay and the food. Salaries run high. So do rents and house prices. Fishing boats still work out of the city wharves. Venture capital firms downtown fund many of the new companies.',
    },
    comparison: [
      'Both are Pacific port cities with large Asian communities. Oakland handles the Bay Area\u2019s cargo, and Vancouver is Canada\u2019s busiest port.',
      'The Bay Area is far bigger than Vancouver, and software drives it. Vancouver has real technology jobs too, just fewer of them.',
      'Homes cost too much in both places. Both rank among the priciest markets in North America.',
    ],
    sources: [
      'U.S. Census Bureau, 2025',
      'City of San Francisco, 2026',
    ],
  },
  {
    id: 'chicago',
    name: 'Chicago',
    country: 'us',
    kind: 'economy',
    lat: 41.8781,
    lng: -87.6298,
    model: 'willis-tower',
    tagline: 'Rail crossroads where the skyscraper was invented',
    pair: 'interior-economy',
    facts: [
      { label: 'Incorporated', value: '1837' },
      { label: 'Population', value: '~2.7 million in the city, ~9.3 million around it' },
      { label: 'Budget gaps', value: 'Hundreds of millions in recent years' },
    ],
    sections: {
      geography:
        'Chicago sits at the south end of Lake Michigan. The land around it is almost perfectly flat. Engineers reversed the Chicago River in 1900 to keep the lake clean. The river runs through the middle of downtown. A short canal here links the lake to the Mississippi River system. The lake cools it in summer. It warms the city in winter. Winters run long and cold, with wind off the water. Thunderstorms and tornadoes reach the area in spring and summer. The city sits on the edge of wide, flat prairie.',
      culture:
        'An 1871 fire burned the city, and crews rebuilt it from the ground up. They used steel frames, and the skyscraper was born here. Blues and gospel music grew up in these neighborhoods. Polish, Irish, Italian and Mexican families each shaped a district. Deep-dish pizza and hot dogs are local favorites. The Art Institute and the Field Museum both sit near the lake. The Bulls, the Bears and the Cubs all play here. Street festivals fill the summer. The lakefront draws crowds all year. Theater companies stage new plays every season.',
      government:
        'Chicago is run by a mayor who works with a fifty-member City Council. The city splits into fifty wards, and each one elects an alderman. Mayor Brandon Johnson has fought to close big budget gaps. Cook County runs the courts, the jails and public health. Illinois sets the rules for schools and for city taxes. Property taxes pay for much of what the city does. Police, fire and trash collection are city departments. Voters elect the mayor. The term runs four years.',
      economy:
        'Chicago is where the trains from the east and the west meet up. Freight crosses the whole country through this city. The Board of Trade trades grain, meat and a few other goods. It runs one of the biggest futures markets in the world. O\u2019Hare airport is a hub for flights around the world. Factories here build machinery, food, steel and farm equipment. Manufacturing has shrunk. More people work in offices now.',
    },
    comparison: [
      'Chicago moves freight for the whole continent. Calgary sits on Canada\u2019s oil and gas, and the two cities sit far inland.',
      'Chicago builds many different things, so one weak industry cannot sink it. Calgary rises and falls with the price of oil and gas.',
      'Both grew up fast on flat plains and built busy downtowns in the 1900s. Each one matters more in its country than its size suggests.',
    ],
    sources: [
      'U.S. Census Bureau, 2025',
      'City of Chicago, 2026',
    ],
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    country: 'us',
    kind: 'culture',
    lat: 34.0522,
    lng: -118.2437,
    model: 'capitol-records',
    tagline: 'Entertainment capital spread across a ring of valleys',
    pair: 'culture',
    facts: [
      { label: 'Founded', value: '1781, by Spanish settlers' },
      { label: 'Population', value: '~3.9 million in the city, ~9.7 million in the county' },
      { label: 'Big event', value: 'Hosts the Summer Olympics in 2028, its third time' },
    ],
    sections: {
      geography:
        'Los Angeles sits on flat ground and low hills, between mountains and sea. The place is dry, so most of its water comes from far away. Earthquakes shake the basin often. The Los Angeles River runs through it inside a concrete channel. Summers come hot and dry. Winters stay mild and wet. Hard winds off the desert can set the hills on fire. The Pacific coast lines the west side of the city. Fog and smog both hang over the basin on quiet days.',
      culture:
        'Film companies moved here in the 1910s, drawn by the steady sunshine. It began as a Spanish settlement. About half the people living in the city today are Latino. Spanish is spoken everywhere. Many signs are printed in two languages. Korean, Armenian, Chinese and Mexican neighborhoods each have their own streets. Hollywood pulls in actors, writers and film crews. Tacos, burgers and street food are part of daily life. The Dodgers and the Lakers are the best known teams in town. Museums, concert halls and the beach fill most weekends.',
      government:
        'A mayor and fifteen council members share the job of running the city. Karen Bass has been mayor since 2022. Voters give the mayor four years. A mayor may serve no more than two terms. Each council member represents one district. The county runs health care and the jails. The county has its own board of supervisors. About 72,000 people across the county have no home of their own. The city pays for its police, fire crews and trash pickup. California sets many of the rules cities follow.',
      economy:
        'Movies and television made this city famous. The ports next door bring in about a third of the country\u2019s shipping containers. Film, music and streaming shows employ thousands of people. The ports of Los Angeles and Long Beach sit right next to each other. The city is getting ready for the 2028 Summer Olympics. It was also a host city for the 2026 World Cup. Housing costs have climbed fast. Wages have not kept up. Tourism and hotel work keep many people employed.',
    },
    comparison: [
      'Los Angeles leads North America in movies, television and streaming. Montreal leads French-language film, music and design for a smaller audience.',
      'In both cities many people speak two languages. Montreal is French at its heart, unlike almost anywhere else on the continent.',
      'Los Angeles sprawls across a flat basin, so most people drive. Montreal packs onto an island, with a train system residents actually use.',
    ],
    sources: [
      'U.S. Census Bureau, 2025',
      'LA28, 2026',
      'Los Angeles Homeless Services Authority, 2026',
    ],
  },
  {
    id: 'grand-canyon',
    name: 'Grand Canyon',
    country: 'us',
    kind: 'geography',
    lat: 36.1069,
    lng: -112.1129,
    model: 'grand-canyon',
    tagline: 'Two billion years of rock in one gorge',
    pair: 'natural-wonders',
    facts: [
      { label: 'Length', value: '~277 miles' },
      { label: 'Depth', value: 'up to ~1.1 miles' },
      { label: 'Visits', value: 'Several million a year' },
    ],
    sections: {
      geography:
        'The Grand Canyon is a deep gorge in northern Arizona. The Colorado River carved it out. It runs about 277 miles from end to end. In places it drops close to 1.1 miles. The layered walls show almost two billion years of history. The river at the bottom runs fast and cold. The plateau above stays high and dry. Pines and scrub grow on it. Winters bring snow to the rims, and the summers get very hot. Side canyons cut into the walls, and springs feed small streams below.',
      culture:
        'Eleven Native nations call these lands their ancestral home. The park dates from 1919. Millions of people come every year. The Havasupai, Hopi and Navajo nations live nearby. Native people have lived in and around the gorge for thousands of years. Visitors come to hike, ride mules and look out from the rim. A railway from Williams has carried tourists since 1901. Painters and writers helped make the canyon famous. Rangers give talks about the rocks, the plants and the animals.',
      government:
        'Almost all of the canyon belongs to the federal government. The National Park Service runs it. Native reservations border the park. Those nations govern themselves. The park sets the rules for its trails, camping and river trips. River trips need a permit from the park. Taxes and visitor fees pay for the park. Congress made it a national park by law in 1919. Native nations make their own laws on their own land. The Native nations and the park service work together on cultural sites.',
      economy:
        'Tourism drives the local economy. Flagstaff and the other towns nearby all depend on it. Hotels, cafés and shops along the rim employ local people. The Grand Canyon Railway brings visitors in by train every single day. Glen Canyon Dam sits upstream on the very same river. Dams along the river send electricity to cities far from here. Park fees pay for rangers, roads and repairs. Visitors from outside the United States pay an extra $100 per person. That fee started in January 2026. Restaurants and gift shops sell local crafts.',
    },
    comparison: [
      'The canyon is a dry gorge carved by one river. Banff is icy mountain country, and Canada set it aside as a park in 1885.',
      'Native nations with their own governments border the canyon. Banff is federal land inside Alberta and also a real town with an elected mayor.',
      'Both get sold as wild land where nobody lives. Thousands live in Banff all year, and only a few live on the canyon floor.',
    ],
    sources: [
      'National Park Service, 2026',
      'Grand Canyon National Park, 2026',
    ],
  },
  {
    id: 'new-orleans',
    name: 'New Orleans',
    country: 'us',
    kind: 'culture',
    lat: 29.9511,
    lng: -90.0715,
    model: 'st-louis-cathedral',
    tagline: 'Creole river port where jazz began',
    pair: 'heritage',
    facts: [
      { label: 'Founded', value: '1718, by the French' },
      { label: 'Population', value: '~362,000 in the city, about 42% below its peak' },
      { label: 'Mayor', value: 'Helena Moreno, since January 2026' },
    ],
    sections: {
      geography:
        'New Orleans sits near the mouth of the Mississippi River. The river runs along one side of the city, the lake along the other. Much of the city sits low. Parts of it lie below sea level. Hurricane Katrina flooded much of the city back in 2005. In many places the river runs higher than the streets do. Levees hold the river back. Pumps push the water out again. Summers stay hot, wet and long, with sudden downpours of rain. Hurricanes form out in the Gulf of Mexico and sometimes swing this way.',
      culture:
        'France founded the city in 1718. Spain took it over in 1762. It became American with the Louisiana Purchase in 1803. Lots of people say jazz was born right here. African, French, Spanish and Caribbean roots all mixed into Creole culture. Brass bands still play in the streets and at funerals all over town. Mardi Gras brings parades, costumes and crowds every year. Gumbo, jambalaya and beignets are local dishes. Catholic traditions and old churches run deep. Musicians, cooks and artists keep the culture alive from year to year.',
      government:
        'A mayor and a City Council of seven members run the city. Helena Moreno took office in January 2026. The city and Orleans Parish share one government. Louisiana uses parishes instead of counties. A state authority and the Army Corps of Engineers share the flood work. The Sewerage and Water Board handles drains and drinking water. Federal money helps pay for levees and pumps. The state sets many rules for cities. State law covers both of them.',
      economy:
        'The port of South Louisiana handles more cargo than any other port in the Americas. Ships carry grain, oil, coffee and steel up and down the river. Oil and gas are big business here. Chemical and plastic plants sit upriver. Tourism employs many people. Visitors come here for the music, the food and the festivals. Hospitals and universities are among the biggest employers. The city also has a large shipping and logistics sector. The 2005 storm cost many workers their jobs.',
    },
    comparison: [
      'Both started out as French towns and hold on to that past. Quebec City stayed French-speaking, while New Orleans switched to English.',
      'New Orleans is a river port built on soft ground. Quebec City sits high on a rock above the river, behind walls that still stand.',
      'New Orleans speaks English and carries Caribbean and African roots. Quebec City speaks French and was shaped by the Catholic Church.',
    ],
    sources: [
      'U.S. Census Bureau, 2025',
      'City of New Orleans, 2026',
    ],
  },
]
