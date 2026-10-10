/**
 * United States stops for the Intermaptic atlas.
 * Schema is documented in src/data/shared.js; pair ids are owned by src/data/locations.js.
 * All prose is written for a 6th grade reading level (see README, "Reading level").
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
      { label: 'Population', value: '~690,000 in the city, ~6.3 million around it' },
      { label: 'Planned by', value: "Pierre L'Enfant, 1791" },
    ],
    sections: {
      geography:
        'Washington sits where the Potomac River meets flat coastal land. A square ten miles wide was planned, and part went to Virginia in 1846.',
      culture:
        'The federal government is the main business, so museums and monuments fill the city. The Smithsonian museums are free, and U Street holds deep Black American history.',
      government:
        'Washington is not a state, so Congress has the final say over its laws. Residents elect a mayor and a council of thirteen, but no voting seat in Congress.',
      economy:
        'The federal government is the biggest employer, with law firms and lobbying groups around it. A technology corridor runs west, and Northern Virginia holds more data centres than anywhere else.',
    },
    comparison: [
      'Washington was built on empty land, starting in 1790. Ottawa was picked in 1857 as a deal between Montreal and Toronto.',
      'Congress can overrule laws passed in Washington and controls its budget. Ottawa is a normal city inside Ontario, with no federal body above it.',
      'People in Washington pay federal taxes but have no voting seat in Congress. People in Ottawa vote for Parliament like other Canadians.',
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
      { label: 'Population', value: '~8.3 million in the city, ~19.5 million around it' },
      { label: 'Statue of Liberty', value: 'Gift from France, opened 1886' },
    ],
    sections: {
      geography:
        'The Hudson River cuts a gap through the mountains, which made the city a port. Manhattan sits on hard rock, which is why very tall buildings rose there.',
      culture:
        'Millions of immigrants arrived through Castle Garden and Ellis Island. Today one in three residents was born abroad, and each neighbourhood keeps its own feel.',
      government:
        'A mayor runs the city with a City Council of fifty-one members. The United Nations has its headquarters here, and each borough has its own president.',
      economy:
        'Wall Street and the New York Stock Exchange sit at the centre of the economy. The port of New York and New Jersey is the busiest on the East Coast.',
    },
    comparison: [
      'About eight times more people live in New York than in Toronto. Both hold their country\u2019s main stock exchange and lead the news business.',
      'The New York Stock Exchange is the biggest market in the world. The Toronto Stock Exchange is medium-sized compared with it.',
      'Both are the top place where people new to the country first arrive. Toronto takes in a bigger share of Canada\u2019s newcomers than New York does.',
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
      { label: 'Population', value: '~810,000 in the city, ~7.8 million around it' },
      { label: 'Main industries', value: 'Software, chips, biotech and investor money' },
    ],
    sections: {
      geography:
        'The Bay Area wraps around a bay that the ocean flooded long ago. The San Andreas and Hayward faults cross the region, and fog rolls in most afternoons.',
      culture:
        'Writers called the Beats gathered in North Beach in the 1950s. Later the technology industry became the biggest force, and Berkeley and Stanford bring in researchers.',
      government:
        'San Francisco is both a city and a county, and it runs as one. Voters elect a mayor and an eleven-member Board of Supervisors.',
      economy:
        'The Bay Area leads the world in software and in money for new companies. The Port of Oakland is one of the busiest in the country.',
    },
    comparison: [
      'Both are port cities on the Pacific with big Asian communities. Oakland ships the Bay Area\u2019s goods, and Vancouver is Canada\u2019s busiest port.',
      'The Bay Area is much bigger than Vancouver and runs on software. Vancouver has real tech jobs too, but many are branch offices.',
      'Homes cost too much in both places, among the priciest in North America. Both also draw more skilled newcomers than their country as a whole.',
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
      { label: 'Willis Tower', value: 'Completed 1973' },
    ],
    sections: {
      geography:
        'Chicago sits at the south end of Lake Michigan, on almost perfectly flat land. A short canal here links the Atlantic Ocean to the Gulf of Mexico.',
      culture:
        'After an 1871 fire, the city rebuilt with steel frames and invented the skyscraper. It is the home of the blues and gospel music.',
      government:
        'A mayor and a City Council of fifty members run Chicago. The mayor controls the schools and transit, and the state can overrule the city.',
      economy:
        'Chicago is the freight and train crossing of the continent. It has the biggest futures market on Earth, and one of the busiest airports.',
    },
    comparison: [
      'Chicago is the train and shipping hub of the continent. Calgary is the oil and gas capital, and both sit far from the coast.',
      'Chicago makes many different things, so hard times in one industry do not sink it. Calgary\u2019s good years and bad years follow the price of oil and gas.',
      'Both are newer cities on flat plains that built busy downtowns in the 1900s. Each one matters more in its country than its size would suggest.',
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
      { label: 'Population', value: '~3.8 million in the city, ~12.8 million in the county' },
      { label: 'Big event', value: 'Hosts the Summer Olympics in 2028' },
    ],
    sections: {
      geography:
        'Los Angeles sits on flat ground and low hills, between mountains and the ocean. It is dry, so water comes from far away, and earthquakes are common.',
      culture:
        'Film companies moved here in the 1910s for steady sunshine. The city began as a Spanish settlement, and most people here today are Latino.',
      government:
        'A mayor and a City Council of fifteen members run the city. The county runs health and jails, and the region has dozens of separate cities.',
      economy:
        'Movies and TV are the city\u2019s trademark. Nearby ports bring in about a third of all containers entering the country.',
    },
    comparison: [
      'Los Angeles leads North America in movies, TV and streaming shows. Montreal leads French-language film, music and design, but for a smaller audience.',
      'Many people speak two languages in both cities. Montreal is mostly French-speaking, but French is a minority language.',
      'Los Angeles is flat and spread out, so most people there drive. Montreal is packed more tightly on an island, with a train system people use.',
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
      { label: 'National park', value: 'Established 1919' },
    ],
    sections: {
      geography:
        'The Grand Canyon is a deep gorge in northern Arizona, cut by the Colorado River. It runs about 446 kilometres and drops close to 1.8 kilometres.',
      culture:
        'These lands are the ancestral home of eleven Native nations. It became a national park in 1919 and draws millions of visitors a year.',
      government:
        'Almost all of the canyon is federal land, run by the National Park Service. Native reservations border it, and those nations govern themselves.',
      economy:
        'Tourism drives the local economy, and towns like Flagstaff depend on it. Dams along the river make electricity, and about half the visitors come from other countries.',
    },
    comparison: [
      'The Grand Canyon is a dry gorge cut by a river, run by the government. Banff is icy mountain country, Canada\u2019s first national park, set aside in 1885.',
      'Native nations with their own governments border the Grand Canyon. Banff is federal land inside Alberta, and also a real town with an elected mayor.',
      'Both are advertised as wild land where nobody lives. Tens of thousands live in Banff all year. Only a few live on the canyon floor.',
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
      { label: 'Population', value: '~380,000 in the city, ~1.3 million around it' },
      { label: 'Bought by the US', value: '1803 Louisiana Purchase' },
    ],
    sections: {
      geography:
        'New Orleans sits near the mouth of the Mississippi, between the river and Lake Pontchartrain. Much of it sits below sea level, and the 2005 flood changed the city most.',
      culture:
        'France founded the city in 1718, and Spain took it over in 1762. It became American with the 1803 Louisiana Purchase, and jazz was born here.',
      government:
        'A mayor and a City Council of seven members run the city. Flood protection is controlled by a state authority and the Army Corps of Engineers.',
      economy:
        'The port of South Louisiana handles more cargo than any other port in the Americas. Oil and gas are big here, and tourism employs many people.',
    },
    comparison: [
      'Both began as French towns and kept that past more than any other city. New Orleans lost most French speakers in the 1900s, but Quebec City stayed French-speaking.',
      'New Orleans is a port on soft ground beside the Mississippi River. Quebec City sits high on a rock above the river, behind standing walls.',
      'New Orleans is English-speaking with strong Caribbean and African roots. Quebec City is French-speaking and shaped by the Catholic Church.',
    ],
  },
]
