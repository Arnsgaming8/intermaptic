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
        'Washington sits where the Potomac River meets flat land near the coast. The city was planned as a square ten miles wide. Part of that land went back to Virginia in 1846. The city sits on the fall line, where the hills meet the flat coastal plain. The Anacostia River joins the Potomac inside the city. Summers are hot and wet, and winters bring some snow. The land is low, so the Potomac can flood after heavy rain. About 6.5 million people live in the suburbs in Maryland and Virginia. The figures are the newest I could find, listed in the sources.',
      culture:
        'The federal government is the main business, so museums and monuments fill the city. The Smithsonian museums are free. U Street holds a deep history of Black American culture. People come from every state and from many other countries. The National Mall holds the monuments, and it is open to everyone. About four in ten residents are Black. Go-go music began here, and jazz clubs once lined the streets. The city has its own baseball team and a big basketball following.',
      government:
        'Washington is not a state, so Congress has the final say over its laws. Residents elect a mayor and a council of thirteen. Still, the city has no voting seat in Congress. The mayor runs the city day to day, and the council passes local laws. Congress can block any local law and sets the city budget. Residents pay federal taxes like everyone else, yet they have no vote in Congress. The city elects a delegate who can speak in the House but cannot vote. National Guard troops have been stationed here since August 2025. Residents keep arguing for statehood.',
      economy:
        'The federal government is the biggest employer, and it has been shrinking. Federal job cuts since 2025 have hit the region hard. A technology corridor runs west, and Northern Virginia holds many data centers. Tourism brings millions of visitors who spend money on hotels and food. Dulles and Reagan airports link the city to the world. Hospitals, universities and research labs also employ many people. Many people in the region work for contractors that serve federal agencies. Nonprofit groups and law firms also have their headquarters in the city.',
    },
    comparison: [
      'Washington was built on empty land, starting in 1790. Queen Victoria picked Ottawa as the capital in 1857.',
      'Congress can overrule laws passed in Washington and controls its budget. Ottawa is a normal city inside Ontario, with no federal body above it.',
      'People in Washington pay federal taxes but have no voting seat in Congress. People in Ottawa vote for Parliament like other Canadians.',
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
    tagline: 'Money centre and the country\u2019s largest city',
    pair: 'finance',
    facts: [
      { label: 'Settled', value: '1624, as New Amsterdam' },
      { label: 'Population', value: 'About 8.6 million in the city' },
      { label: 'Mayor', value: 'Zohran Mamdani, since January 2026' },
    ],
    sections: {
      geography:
        'The Hudson River cuts a gap through the mountains, which made the city a port. Manhattan sits on hard rock. That rock is part of why very tall buildings rose there. The city spreads over five boroughs and several islands. The East River is a strait, not a true river. The Atlantic Ocean and Long Island Sound border the city. Winters are cold with snow, and summers are hot and humid. Storms and rising water threaten the low streets near the coast. The figures are the newest I could find, listed in the sources.',
      culture:
        'Millions of immigrants arrived through Castle Garden and Ellis Island. Today, one in three residents was born abroad. More than two hundred languages are spoken in the city schools. Chinatown, Little Italy and Harlem each grew from a different wave of newcomers. Broadway theatres, museums and music halls draw crowds all year. Pizza, bagels and street food are part of daily life. Times Square draws visitors, and the New Year ball drop is famous. The Yankees and the Knicks are the home teams.',
      government:
        'A mayor runs the city with a City Council of fifty-one members. Zohran Mamdani became mayor in January 2026. He is the first Muslim and the first South Asian mayor. The United Nations has its headquarters here. Each borough has its own president. The council writes local laws and must approve the city budget. The city also elects a public advocate and a comptroller. Taxes are paid to the city, the state and the country. New York State can pass laws that the city must follow.',
      economy:
        'Wall Street and the New York Stock Exchange sit at the center of the economy. The port of New York and New Jersey is the busiest on the East Coast. The city budget is now more than one hundred billion dollars. Banks, insurers and law firms fill the downtown towers. Fashion, publishing, advertising and television are big employers. Many of these jobs likely pay well. Tourism brings tens of millions of visitors every year. Rents and home prices are among the highest in the country.',
    },
    comparison: [
      'New York has about two and a half times Toronto\u2019s people. Both hold their country\u2019s main stock exchange.',
      'The New York Stock Exchange is the biggest market in the world. The Toronto Stock Exchange is medium-sized compared with it.',
      'Both are the top place where people new to the country first arrive. Both cities draw large shares of their country\u2019s newcomers.',
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
    tagline: 'Technology centre on the Pacific coast',
    pair: 'pacific-tech',
    facts: [
      { label: 'Golden Gate Bridge', value: 'Opened 1937' },
      { label: 'Population', value: '~826,000 in the city, ~7.7 million around it' },
      { label: 'Mayor', value: 'Daniel Lurie, since January 2025' },
    ],
    sections: {
      geography:
        'The Bay Area wraps around a bay that the ocean flooded long ago. The San Andreas and Hayward faults cross the region. Fog rolls in most afternoons. The Golden Gate is the strait that joins the bay to the ocean. Hills shape the city, so many streets climb steeply. The bay is shallow and muddy near the edges. Summers are cool and foggy, and rain falls mostly in winter. Cable cars still climb the hills in the city center. The wider region stretches from wine country to Silicon Valley. The figures are the newest I could find, listed in the sources.',
      culture:
        'Writers called the Beats gathered in North Beach in the 1950s. Later, the technology industry became the biggest force in the city. Berkeley and Stanford bring in many researchers. Software and artificial intelligence companies now drive the city again. The city keeps a large Chinatown, one of the oldest in North America. Mission murals and the 1967 Summer of Love both became famous here. The city is known for sourdough bread and seafood. The 49ers were founded here, and the Giants have played here since 1958.',
      government:
        'San Francisco is both a city and a county, and it runs as one. Voters elect a mayor and an eleven-member Board of Supervisors. The mayor runs the city and can veto laws from the board. The board meets in City Hall and passes local rules. Voters often decide big questions directly at the ballot box. Many small cities near the bay have their own councils. The state of California sets many of the rules they follow. Voters also elect a district attorney and a sheriff.',
      economy:
        'The Bay Area leads the world in software and in money for new companies. Artificial intelligence companies have grown quickly in the city. The Port of Oakland is one of the busiest in the country. Computer chip makers started in the valley south of the bay. Tourism brings visitors for the bridge, the bay and the food. Salaries appear to be high, and so are rents and house prices. Fishing boats still work out of the city wharves. Venture capital firms in the city fund many of these new companies.',
    },
    comparison: [
      'Both are port cities on the Pacific with big Asian communities. Oakland ships the Bay Area\u2019s goods, and Vancouver is Canada\u2019s busiest port.',
      'The Bay Area is much bigger than Vancouver and runs on software. Vancouver has real tech jobs too, though far fewer.',
      'Homes cost too much in both places, among the priciest in North America.',
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
        'Chicago sits at the south end of Lake Michigan, on almost perfectly flat land. A short canal here links the lake to the Mississippi River system. The lake keeps the city cooler in summer and warmer in winter. The Chicago River runs through the middle of downtown. Winters are long and cold, with strong wind off the lake. The city sits on the edge of the wide, flat prairie. Engineers reversed the river in 1900 to protect the lake. Thunderstorms and tornadoes reach the area in spring and summer. The figures are the newest I could find, listed in the sources.',
      culture:
        'After an 1871 fire, the city rebuilt with steel frames and helped invent the skyscraper. The city is a home of blues and gospel music. Polish, Irish, Italian and Mexican families shaped the neighborhoods. Deep-dish pizza and hot dogs are local favorites. The Art Institute and the Field Museum sit near the lake. The Bulls, the Bears and the Cubs all play here. Street festivals fill the summer, and the lakefront draws crowds. Theatre companies in the city stage new plays every year.',
      government:
        'A mayor and a City Council of fifty members run Chicago. Mayor Brandon Johnson has struggled to close large budget gaps. The city is divided into fifty wards, each with an alderman. Cook County runs courts, jails and public health. Illinois sets the rules for schools and for city taxes. The city collects property taxes to pay for services. Police, fire and trash collection are city departments. Voters elect the mayor every four years.',
      economy:
        'Chicago is a freight and train crossing for the whole country. It has one of the biggest futures markets in the world. It also has one of the busiest airports. Trains from the east and west meet at the city rail yards. The Board of Trade trades grain, meat and other goods. O\u2019Hare airport is a hub for flights around the world. Factories here build machinery, food, steel and farm equipment. Manufacturing has likely shrunk, so more people now work in offices.',
    },
    comparison: [
      'Chicago is the train and shipping hub of the continent. Calgary is Canada\u2019s energy capital, and both sit far from the coast.',
      'Chicago makes many different things, so hard times in one industry do not sink it. Calgary\u2019s good years and bad years follow the price of oil and gas.',
      'Both are newer cities on flat plains that built busy downtowns in the 1900s. Each one matters more in its country than its size would suggest.',
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
        'Los Angeles sits on flat ground and low hills, between mountains and the ocean. It is dry, so water comes from far away, and earthquakes are common. The city spreads across a wide basin ringed by mountains. The Los Angeles River is mostly concrete and carries little water. Summers are hot and dry, and winters are mild and wet. Wildfires break out in the hills when the wind blows hard. The Pacific coast runs along the west side of the city. Fog and smog both hang over the basin on quiet days. The figures are the newest I could find, listed in the sources.',
      culture:
        'Film companies moved here in the 1910s for steady sunshine. The city began as a Spanish settlement. About half of its people today are Latino. Spanish is spoken widely, and many signs are in two languages. Korean, Armenian, Chinese and Mexican neighborhoods each have their own streets. Hollywood draws actors, writers and film crews from everywhere. Tacos, burgers and street food are part of daily life. The Dodgers and the Lakers are the city\u2019s best known teams. Museums, concert halls and the beach fill weekends.',
      government:
        'A mayor and a City Council of fifteen members run the city. Karen Bass has been mayor since 2022. Voters elect the mayor for four years, with a limit of two terms. Each council member represents one district of the city. The county runs health and jails, and it has its own supervisors. About 72,000 people in the county have no home. The city pays for police, fire and trash collection. The state of California sets many rules for cities.',
      economy:
        'Movies and TV are the city\u2019s trademark. Nearby ports bring in about a third of all containers entering the country. Film, music and streaming shows employ many thousands of people. The ports of Los Angeles and Long Beach stand next to each other. The city is preparing for the 2028 Summer Olympics. It was also a host city for the 2026 World Cup. Housing costs have risen far faster than wages. Tourism and hotel work give many more people steady jobs.',
    },
    comparison: [
      'Los Angeles leads North America in movies, TV and streaming shows. Montreal leads French-language film, music and design, but for a smaller audience.',
      'Many people speak two languages in both cities. Montreal is French-speaking at its heart, unlike most of North America.',
      'Los Angeles is flat and spread out, so most people there drive. Montreal is packed more tightly on an island, with a train system people use.',
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
      { label: 'Length', value: '~446 km' },
      { label: 'Depth', value: 'up to ~1.8 km' },
      { label: 'Visits', value: 'Several million a year' },
    ],
    sections: {
      geography:
        'The Grand Canyon is a deep gorge in northern Arizona, cut by the Colorado River. It runs about 446 kilometers and drops close to 1.8 kilometers. Layered rock walls show almost two billion years of Earth history. The river at the bottom is fast and cold. The plateau around the gorge is high and dry, with pine and scrub. Winters bring snow on the rims, and summers are very hot. Side canyons cut into the walls, and springs feed small streams. The Colorado River keeps cutting deeper into the rock. The figures are the newest I could find, listed in the sources.',
      culture:
        'These lands are the ancestral home of eleven Native nations. The park became a national park in 1919 and draws millions of visitors a year. The Havasupai, Hopi and Navajo nations live near the canyon. Native people have lived in and around the gorge for thousands of years. Visitors come to hike, ride mules and look from the rim. A railway from Williams has carried tourists since 1901. Artists and writers likely helped make the canyon famous. Rangers give talks about the rocks, plants and animals.',
      government:
        'Almost all of the canyon is federal land, run by the National Park Service. Native reservations border it, and those nations govern themselves. The park sets rules for trails, camping and river trips. River trips need a permit from the park service. Native nations make their own laws on their own land. The park is paid for by taxes and by visitor fees. Congress made it a national park by law in 1919. Native nations and the park work together on cultural sites.',
      economy:
        'Tourism likely drives the local economy, and towns like Flagstaff depend on it. Hotels, cafés and shops along the rim employ local people. The Grand Canyon Railway brings visitors by train each day. Glen Canyon Dam sits upstream on the same river. Dams along the river make electricity for cities far away. Park fees pay for rangers, roads and repairs. Visitors from outside the United States pay an extra $100 per person since January 2026. Restaurants and gift shops sell local crafts to visitors.',
    },
    comparison: [
      'The Grand Canyon is a dry gorge cut by a river, run by the government. Banff is icy mountain country, Canada\u2019s first national park, set aside in 1885.',
      'Native nations with their own governments border the Grand Canyon. Banff is federal land inside Alberta, and also a real town with an elected mayor.',
      'Both are advertised as wild land where nobody lives. Thousands live in Banff all year. Only a few live on the canyon floor.',
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
        'New Orleans sits near the mouth of the Mississippi, between the river and Lake Pontchartrain. Much of it sits below sea level. Hurricane Katrina flooded much of the city in 2005. The river runs higher than the streets in many places. Levees and pumps keep water out of the city. Summers are hot, wet and long, with sudden heavy rain. Hurricanes form in the Gulf of Mexico and can strike the coast. Wetlands south of the city likely help slow storm surges. The figures are the newest I could find, listed in the sources.',
      culture:
        'France founded the city in 1718, and Spain received it in 1762. It became American with the 1803 Louisiana Purchase. Many people say jazz was born here. African, French, Spanish and Caribbean roots mixed into Creole culture. Brass bands still play in the streets and at funerals. Mardi Gras brings parades, costumes and crowds every year. Gumbo, jambalaya and beignets are local dishes. The city has strong Catholic traditions and old churches. Musicians, cooks and artists keep the culture alive.',
      government:
        'A mayor and a City Council of seven members run the city. Helena Moreno became mayor in January 2026. The city and Orleans Parish are run as one government. Louisiana is divided into parishes instead of counties. Flood protection is shared by a state authority and the Army Corps of Engineers. The Sewerage and Water Board handles drains and drinking water. Federal money helps pay for levees and pumps. The state of Louisiana sets many rules for cities and parishes.',
      economy:
        'The port of South Louisiana handles more cargo than any other port in the Americas. Oil and gas are big here, and tourism employs many people. Ships carry grain, oil, coffee and steel along the river. Chemicals and plastics are made in plants upriver. Visitors come for music, food and festivals. Hospitals and universities are among the biggest employers. Many workers likely lost jobs when the storm hit in 2005. The city also has a large shipping and logistics sector.',
    },
    comparison: [
      'Both began as French towns and kept that past more than any other city. Quebec City stayed mostly French-speaking, while New Orleans became English-speaking.',
      'New Orleans is a port on soft ground beside the Mississippi River. Quebec City sits high on a rock above the river, behind standing walls.',
      'New Orleans is English-speaking with strong Caribbean and African roots. Quebec City is French-speaking and shaped by the Catholic Church.',
    ],
    sources: [
      'U.S. Census Bureau, 2025',
      'City of New Orleans, 2026',
    ],
  },
]
