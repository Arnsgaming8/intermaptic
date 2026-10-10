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
        'Washington sits where the Potomac River leaves the hills. It meets the flat land near the coast. That means the city has two different kinds of ground. Two rivers run through it, the Potomac and the Anacostia. The first city plan was a square ten miles on each side. In 1846 the part south of the river went back to Virginia. Summers here are hot and sticky. Winters are mild, but big storms do hit.',
      culture:
        'The federal government is the main business. So much of the city is about museums and monuments. The Smithsonian museums are free to enter. So is the National Gallery, and the Kennedy Center puts on shows. Neighbourhoods like U Street and Shaw hold deep Black American history. U Street was a centre for jazz and for Black-owned shops. That was when the city was segregated. Many people here stay only a few years. They come as diplomats, staff, contractors or military families. That makes the city feel formal and international for its size.',
      government:
        'Washington is not a state. Congress has the final say over its laws and its money. People here elect a mayor and a council with thirteen members. Congress can cancel what that council passes. Residents pay federal taxes. But they get only one delegate in the House, and that delegate cannot vote. They have no senators at all. That is why local car plates say "taxation without representation". The Capitol, the Supreme Court and the main government offices all sit close together.',
      economy:
        'The federal government is the biggest employer. Around it sit law firms, lobbying groups and companies that work for the military. A technology corridor runs west along the Dulles toll road. Northern Virginia holds more computer data centres than anywhere else in the world. Families here earn more than in most of the country. Steady federal spending keeps the area stable when other places struggle.',
    },
    comparison: [
      'Washington was built on empty land starting in 1790. It was planned as a capital from the start. Ottawa was picked in 1857 as a deal between Montreal and Toronto. It grew out of a logging town. That town was already there on the Ottawa River.',
      'Congress can overrule laws passed in Washington. It also controls the city budget. Ottawa is a normal city inside Ontario. No federal body can make laws for it.',
      'People in Washington pay federal taxes. They do not get a voting seat in Congress. People in Ottawa vote for Parliament just like other Canadians do.',
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
        'New York has one of the best natural harbours on the Atlantic coast. The Hudson River cuts a gap through the mountains here. That gap is why the city grew into a port. It did not stay a small river town. Five boroughs spread over three islands and a piece of the mainland. The shoreline runs for hundreds of kilometres, so water is never far away. Manhattan sits on hard rock. That rock let builders put up very tall buildings. That is why the skyline rose where it did.',
      culture:
        'Millions of immigrants arrived through Castle Garden and Ellis Island. Today about one in three residents was born in another country. The city gave the world Broadway shows, big museums and hip hop. Hip hop started in the Bronx in the 1970s. Publishers and news companies have been based here for two hundred years. Each neighbourhood keeps its own feel. Chinatown, Harlem, Jackson Heights and Little Italy are all different. The subway helps keep them that way. It makes each one an easy daily trip.',
      government:
        'A mayor runs the city together with a City Council of fifty-one members. The city charter gives the mayor a lot of power. The United Nations also has its headquarters here. That adds duties no other American city has. The city is split into five boroughs. Each borough has its own president and its own top lawyer. One city government runs the hospitals, the public university system and the public housing.',
      economy:
        'Wall Street and the New York Stock Exchange sit at the centre of the economy. Insurance, property and company head offices support them. The port of New York and New Jersey is the busiest on the East Coast. The city also leads in media, advertising and fashion. Science and software jobs are growing. More people here work in services than in the country as a whole. That is why the city lost jobs fast in 2020. It got them back quickly.',
    },
    comparison: [
      'About eight times more people live in New York than in Toronto. Both cities hold their country\u2019s main stock exchange. Both also lead the news and media business at home.',
      'Both downtowns are famous for money and banking. The New York Stock Exchange is the biggest market in the world. The Toronto Stock Exchange is medium-sized compared with it.',
      'Both are the top place where people new to the country first arrive. Toronto takes in a bigger share of Canada\u2019s newcomers than New York does of America\u2019s.',
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
        'The Bay Area wraps around San Francisco Bay. The bay is really a river valley that the ocean flooded long ago. Two big rivers, the Sacramento and the San Joaquin, empty into it. The Pacific Ocean lies on one side and hills rise on the other. Two big cracks in the Earth run through the region. They are the San Andreas and Hayward faults. In 1906 an earthquake and the fires after it destroyed most of the city. Cold water rises from deep in the ocean nearby. That keeps summers cool and foggy. Fog rolls through the Golden Gate most afternoons.',
      culture:
        'Writers called the Beats gathered in North Beach in the 1950s. In the 1960s the Haight district held the Summer of Love. Later the technology industry became the biggest force of all. Berkeley and Stanford bring in research and new graduates. Many people here moved from Asia. The area\u2019s style has spread around the world. Free software, company mission statements and protest politics all grew here. The city is now one of the most expensive in the country.',
      government:
        'San Francisco is both a city and a county, and it runs as one. Voters elect a mayor and a Board of Supervisors with eleven members. Voters here can also pass laws themselves by answering questions on the ballot. The wider region has no single government. Nine counties and many bus and train agencies share the work. That makes it slow to agree on housing and transit. Silicon Valley is really many small cities, each with its own council.',
      economy:
        'The Bay Area leads the world in software and in money for new companies. Big technology firms and thousands of small startups fill the corridor. That corridor runs between San Francisco and San Jose. Biotech and computer chip design are strong too. The Port of Oakland is one of the busiest in the country. Each worker here produces more than almost anywhere else in the world. But homes cost so much that many workers live far from their jobs.',
    },
    comparison: [
      'Both are port cities on the Pacific. Both have mild, rainy winters and big Asian communities. Oakland ships the Bay Area\u2019s goods. Vancouver is Canada\u2019s busiest port.',
      'The Bay Area is much bigger than Vancouver. It runs on software and money from investors. Vancouver has real tech jobs too, but far fewer. Many of them are branch offices of US companies.',
      'Homes cost too much in both places. Both are among the priciest markets in North America. Both also draw more skilled newcomers than their country as a whole does.',
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
        'Chicago sits at the south end of Lake Michigan. It lies on low ground between two huge water systems. They are the Great Lakes and the Mississippi River. The land is so low that a short canal could join two oceans. It links the Atlantic Ocean to the Gulf of Mexico. Long before the city existed, Native nations carried their canoes across this spot. In 1900 engineers made the Chicago River run backwards. That kept waste out of the lake. The land is almost perfectly flat. The lake keeps winters warmer and summers cooler than the plains further west.',
      culture:
        'Chicago helped create the modern city block and the skyscraper. After a huge fire in 1871, the city rebuilt on a grid. Builders used steel frames and elevators. Their ideas changed buildings all over the world. The city is the home of the blues and of gospel music. It also gave American comedy the Second City stage. Chicago is known for its public art and its buildings. Its neighbourhoods are still very separate from one another, and often divided by race. That came from housing rules made in the 1900s. The city is still dealing with them.',
      government:
        'A mayor and a City Council of fifty members run Chicago. The mayor has more power than most big-city mayors. The mayor controls the schools, the transit system and the budget. Cook County and the state of Illinois also make rules for the city. The state has often overruled Chicago on police and money matters. The city\u2019s suburbs stretch into two other states. So big regional choices get made by loose groups rather than by one government.',
      economy:
        'Chicago is the freight and train crossing of the continent. It has the busiest rail hub in North America. It also has the largest market in the world for futures. There, people buy and sell goods for delivery later. Shipping, banking, factories, food processing and office work all matter here. O\u2019Hare is one of the busiest airports on Earth. The city sits in the middle of the country. Many companies keep warehouses within a day\u2019s drive of it.',
    },
    comparison: [
      'Chicago is the train and shipping hub of the continent. Calgary is the oil and gas capital. Both sit far from the coast. Both get their power from moving goods or pulling resources out of the ground.',
      'Chicago makes many different things, so hard times in one industry do not sink it. Calgary makes far less overall. Its good years and bad years follow the price of oil and gas.',
      'Both are newer cities on flat plains. Both built busy downtowns in the 1900s. Both matter more in their country than their size would suggest. Each one has a single big industry.',
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
        'Los Angeles sits on flat ground and low hills. Mountains rise on one side, and the ocean is on the other. The area is dry. It needs water brought in from far away to support so many people. Earthquakes and wildfires are a normal part of life here. So are the hot, dry Santa Ana winds. In 1913 the city built a long channel to carry water from the Owens Valley. Mountains and ocean ring the city, so it spread outward instead of building upward. That made it one of the most car-dependent cities in the world.',
      culture:
        'Film companies moved here in the 1910s. They came to escape lawsuits and to find steady sunshine. The industry they built still shapes how the world sees the city. Long before that, this land belonged to Mexico and before that to Spain. The city started as a Spanish settlement and kept its Spanish name. Most people here today are Latino. The city also has the largest Korean, Armenian and Iranian communities in the country. That mix makes it far more varied than its film image.',
      government:
        'A mayor and a City Council of fifteen members run the city. The county government matters just as much. It runs public health, the jails and the sheriff. The region holds dozens of separate cities and hundreds of special districts. No single government plans for all of them. Power is split this way. So it takes a long time to agree on housing and transit.',
      economy:
        'Movies and TV are the city\u2019s trademark. The ports of Los Angeles and Long Beach are nearby. Together they bring in about a third of all containers entering the United States. Shipping, aircraft building and world trade employ far more people than film does. Those two ports sit side by side in San Pedro Bay. They link the city to Asia. Los Angeles has also grown into a big technology market. It will host the Summer Olympics in 2028.',
    },
    comparison: [
      'Los Angeles leads North America in movies, TV and streaming shows. Montreal leads French-language film, music and design. Montreal\u2019s audience is much smaller.',
      'Many people speak two languages in both cities. Los Angeles sits in an English-speaking country. Montreal is mostly French-speaking, but French is a minority language across the whole continent.',
      'Los Angeles is flat and spread out across a huge valley. Most people there drive. Montreal is packed more tightly together. It sits on an island and it has a train system people actually use.',
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
        'The Grand Canyon is a deep gorge in northern Arizona. The Colorado River cut it out. It runs about 446 kilometres long. At its deepest point it drops close to 1.8 kilometres. Some parts are almost 29 kilometres wide. The rock walls show almost two billion years of Earth history. Dark rock sits at the bottom and pale limestone sits at the top. The river is far below the rim. It can be twenty degrees warmer down there on the same day.',
      culture:
        'These lands are the ancestral home of eleven Native nations. They include the Havasupai, Hualapai, Navajo and Hopi. Some of them still live in or beside the canyon. It became a national park in 1919. A railway arrived about twenty years earlier and brought the first big crowds. The South Rim now draws several million visitors a year. Hiking down into the canyon is still a serious trip that needs planning.',
      government:
        'Almost all of the canyon is federal land. The National Park Service takes care of it. Native reservations border it, and those nations govern themselves. The Hualapai run the Skywalk on the west rim as their own business. To see different parts of the gorge, visitors pass through both federal and tribal land. The river water below is shared out by an agreement. Several states and the federal government take part, not Arizona alone.',
      economy:
        'Tourism drives the local economy. The towns of Tusayan, Williams and Flagstaff depend on it. Mining, ranching and federal land work give fewer jobs. Dams up and down the river make electricity for the wider region. About half the park\u2019s visitors come from outside the United States. That makes it one of the best-known landscapes in the country.',
    },
    comparison: [
      'The Grand Canyon is a dry gorge cut by a river. The federal government runs it. Banff is icy mountain country. It was Canada\u2019s first national park, set aside in 1885.',
      'Native nations with their own governments border the Grand Canyon. Banff is federal land inside Alberta. It is also a real town, with a mayor and a council that people elect.',
      'Both are advertised around the world as wild land where nobody lives. But tens of thousands of people live and work in Banff all year. Only a few people live all year on the canyon floor.',
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
        'New Orleans sits near the mouth of the Mississippi River. It lies between the river and Lake Pontchartrain. Much of the city is at or below sea level. The ground there is slowly sinking. The city was built on a raised bank at a bend in the river. That bend gave the city its nickname, the Crescent City. Walls called levees now hold the river back. Those walls also stop the river from dropping mud. That mud would rebuild the nearby marsh. Hurricanes shape life here. The flood of 2005 changed the city more than any other event.',
      culture:
        'France founded the city in 1718. Spain took it over in 1762. France briefly held it again. It became American only after the 1803 Louisiana Purchase. Those layers created a Creole culture found nowhere else in the country. Jazz grew out of brass bands, blues and African and Caribbean rhythms. That mix came together in the early 1900s. It is still the city\u2019s best-known gift to the world. Mardi Gras parades and Catholic parish life keep the French and Spanish roots alive. Foods like gumbo and po\u2019boys keep the African roots alive.',
      government:
        'A mayor and a City Council of seven members run the city. The city limits line up almost exactly with Orleans Parish. The city cannot decide flood protection on its own. A state flood authority and the Army Corps of Engineers control the levees. That puts some of the biggest land decisions outside city hall. Recovery boards also have real power over the city\u2019s budget. So does the Louisiana legislature.',
      economy:
        'The port of South Louisiana sits upriver from the city. It handles more tons of cargo than any other port in the Americas. The region is a centre for oil and gas. It also supplies the boats and gear that offshore rigs need. Tourism and hospitality employ a large share of workers. Music, food and the French Quarter bring people in. The economy depends on energy prices and on the weather. That is truer here than in almost any other big American city.',
    },
    comparison: [
      'Both began as French towns. Both still show that French past more than any other city in their country. New Orleans lost most of its French speakers in the 1900s. Quebec City stayed French-speaking.',
      'New Orleans is a port on the Mississippi River. It is built on soft ground that keeps sinking. Quebec City sits high on a rock above the river. Walls around it still stand.',
      'New Orleans is American and English-speaking, with strong Caribbean and African roots. Quebec City is Canadian and French-speaking. The Catholic Church shaped it, and its people work to keep French alive.',
    ],
  },
]
