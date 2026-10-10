/**
 * Additional United States stops for the Intermaptic atlas.
 * Schema is documented in src/data/shared.js; pair ids are owned by src/data/locations.js.
 * Every sentence here is written for a 6th grade reader: short, plain words, no
 * semicolons and no em dashes.
 */
export const US_EXTRA_STOPS = [
  {
    id: 'mount-rushmore',
    name: 'Mount Rushmore',
    country: 'us',
    kind: 'culture',
    lat: 43.8791,
    lng: -103.4591,
    model: 'mount-rushmore',
    tagline: 'Four presidents carved into a sacred mountain',
    pair: 'carved-rock',
    facts: [
      { label: 'Carved', value: '1927 to 1941' },
      { label: 'Each face', value: 'About 18 m tall' },
      { label: 'Location', value: 'Black Hills, South Dakota' },
    ],
    sections: {
      geography:
        'Mount Rushmore sits in the Black Hills of South Dakota. The faces are carved into hard granite over a billion years old. The Black Hills rise above the flat plains that surround them. Ponderosa pine trees cover the slopes around the mountain. The site stands higher than the plains that stretch to the east. Summers here are warm and dry, and winters bring snow. Wind and rain wear at the granite, so the faces need care. Rapid City is the nearest large town to the memorial.',
      culture:
        'The Black Hills are sacred to the Lakota people. A 1868 treaty was broken, and Borglum carved the faces from 1927 to 1941. The sculptor Gutzon Borglum chose the four presidents himself. The four are Washington, Jefferson, Roosevelt and Lincoln. Each face stands about eighteen metres tall. Workers used dynamite and jackhammers to cut the rock. Lakota people still ask for the return of the Black Hills. The site draws visitors from all over the country.',
      government:
        'The memorial is run by the National Park Service. The land belongs to the federal government, not to South Dakota. The park service protects the carving and the forest around it. Congress pays for the upkeep of the memorial. Walking into the memorial is free, and drivers pay for parking. The site was first set aside as a park in 1925. A 1980 court ruling said the land was taken unfairly. The Lakota have refused the money that came with that ruling.',
      economy:
        'Tourism is the main business in the Black Hills. About two million people visit the memorial each year. Hotels, motels and restaurants in nearby towns depend on them. Rapid City serves as the base for most visitors. The carving has no entry fee, but parking brings in money. Nearby ranches raise cattle on the surrounding grassland. Badlands National Park is close enough for a day trip. Gold mining once drove the economy of these hills.',
    },
    comparison: [
      'Mount Rushmore is famous for what people carved into it. Gros Morne is famous for billion-year-old rock the Earth pushed up.',
      'The faces at Mount Rushmore were carved on purpose. The Tablelands at Gros Morne are pieces of ocean floor pushed up onto land.',
      'Mount Rushmore sits in the middle of the country, far from any coast. Gros Morne sits on the Atlantic coast of Newfoundland.',
    ],
  },
  {
    id: 'kennedy-space-center',
    name: 'Kennedy Space Center',
    country: 'us',
    kind: 'economy',
    lat: 28.5729,
    lng: -80.649,
    model: 'kennedy-space-center',
    tagline: 'Where American rockets leave for space',
    pair: 'looking-up',
    facts: [
      { label: 'Apollo 11', value: 'Launched here, 1969' },
      { label: 'Shuttle years', value: '1981 to 2011' },
      { label: 'Visitors', value: 'About 1.5 million a year' },
    ],
    sections: {
      geography:
        'The space center sits on Merritt Island on the Florida coast. Rockets launch east over the Atlantic Ocean, away from towns. The site shares its land with a national wildlife refuge. Salt marshes, dunes and flat sandy ground cover the island. Summers are hot and wet, and hurricanes can reach the coast. Cape Canaveral sits next to the island, on a narrow strip of land. The Banana River and the Indian River surround much of the site. Few tall buildings stand here, because rockets need open sky.',
      culture:
        'Apollo 11 left for the Moon from here in 1969. Museums on the site display a Saturn V rocket and a space shuttle. The visitor complex tells the story of the Moon landings. Crowds gather on nearby beaches to watch each launch. The Astronaut Hall of Fame honours people who flew in space. School groups come here to learn about rockets and space travel. The center keeps the memory of astronauts who died in accidents. The name honours President John F. Kennedy.',
      government:
        'The center belongs to NASA, which is a federal agency. Congress decides how much money NASA gets each year. NASA runs the launches, but private companies own many of the rockets. The Space Force runs the launch ranges next door at Cape Canaveral. Safety rules decide when a rocket may launch. The federal government set the site aside in the 1960s. A wildlife refuge on the same land is protected by law. Taxes paid to the federal government pay for most of the work.',
      economy:
        'Space launches bring jobs and tourists to the Florida coast. Private companies such as SpaceX now launch from the same site. Thousands of engineers and technicians work on the Space Coast. Hotels and restaurants near the coast rely on launch crowds. The visitor complex is a big draw for families on holiday. Cargo launches carry satellites and supplies for paying customers. The space industry supports many small businesses in the area. Tourism and space work together on this stretch of coast.',
    },
    comparison: [
      'Both are small places that study very big things. Kennedy launches rockets, and Churchill, Manitoba once had a rocket range.',
      'Kennedy is on a warm coast in Florida. Churchill sits on cold Hudson Bay in the far north.',
      'The space center draws about a million and a half visitors a year. Churchill draws far fewer, but people travel there to see polar bears.',
    ],
  },
  {
    id: 'denali',
    name: 'Denali',
    country: 'us',
    kind: 'geography',
    lat: 63.0692,
    lng: -151.007,
    model: 'denali',
    tagline: 'The tallest mountain in North America',
    pair: 'northern-edge',
    facts: [
      { label: 'Height', value: 'About 6,190 m' },
      { label: 'Renamed', value: '2015, from Mount McKinley' },
      { label: 'First climbed', value: '1913' },
    ],
    sections: {
      geography:
        'Denali is the highest mountain in North America, at about 6,190 metres. Winter temperatures near the summit can drop to minus sixty degrees Celsius. The mountain rises out of a broad valley of rivers and gravel bars. Snow and ice cover much of the peak all year round. Only one road enters the park, and it stops far from the summit. Earthquakes shake this region, because two plates meet in Alaska. Long summer days here bring hours of light after midnight. The park covers millions of acres of wild land.',
      culture:
        'Native Athabaskan people have lived here for thousands of years. They call the mountain Denali, which means the high one. Hunters and trappers travelled these valleys long before roads came. Climbers from many countries come each summer to reach the top. The first people to climb it reached the summit in 1913. The mountain was called Mount McKinley for many years. In 2015 the official name changed back to Denali. Local Athabaskan groups keep their language and traditions alive.',
      government:
        'The park was created in 1917 and the federal government runs it. Under a 1971 law, Native corporations also own large areas here. The National Park Service sets the rules for visiting the park. Only a few buses are allowed on the park road each day. Snowmobiles and aircraft are limited to protect the quiet. Hunters must follow state rules on land outside the park. The state of Alaska manages fish and game across the region. Federal and state agencies share the job of keeping people safe.',
      economy:
        'Almost all the money in the area comes from visitors. Buses carry tourists into the park on one road. Guides lead climbing trips, and shops rent cold-weather gear. Hotels and lodges in nearby towns open for the short summer. Many workers leave when the season ends in September. Fishing and hunting also bring money to small communities. Roadhouses along the highway serve travellers and truck drivers. The summer season lasts only a few months each year.',
    },
    comparison: [
      'Denali is a mountain with no towns and no road to the top. Iqaluit is a small Arctic capital where people live all year.',
      'Climbers go to Denali for a few weeks in summer. People in Iqaluit stay through dark winters that last for months.',
      'Denali is land the federal government set aside as a park. Iqaluit is the capital of Nunavut, run mostly by Inuit people.',
    ],
  },
  {
    id: 'hoover-dam',
    name: 'Hoover Dam',
    country: 'us',
    kind: 'economy',
    lat: 36.0161,
    lng: -114.7377,
    model: 'hoover-dam',
    tagline: 'A wall of concrete holding back the Colorado',
    pair: 'rivers-and-tides',
    facts: [
      { label: 'Built', value: '1931 to 1936' },
      { label: 'Height', value: 'About 221 m' },
      { label: 'Lake Mead', value: 'Largest reservoir in the US' },
    ],
    sections: {
      geography:
        'Hoover Dam stands in Black Canyon, between Nevada and Arizona. It holds back the Colorado River to form Lake Mead, the largest US reservoir. The river cuts through a dry desert where rain is rare. Bare rock walls rise on both sides of the canyon. The dam is a curved wall of concrete, thickest at the bottom. Lake Mead stores water for farms and cities far away. Summers here are very hot, and the canyon holds the heat. The Colorado River begins in the Rocky Mountains and flows south.',
      culture:
        'Thousands of workers built the dam during the Great Depression. It was finished in 1936 and named after President Herbert Hoover. Workers lived in a town called Boulder City while they built it. The dam was the largest concrete structure in the world at the time. Tours today take visitors down inside the dam walls. The building shows art deco designs on its towers and walls. Boulder City keeps the story of the workers in its museum. The dam is a landmark that people travel far to see.',
      government:
        'The dam belongs to the federal government, and the Bureau of Reclamation runs it. A 1922 agreement sets out how seven states share the river water. The states, tribes and Mexico all have claims on the river. Federal law sets out how much water each state may take. The dam also controls floods along the lower Colorado River. The site is a National Historic Landmark, protected by law. Two states share the canyon, and each has a border at the dam. Water levels in Lake Mead decide how much is released.',
      economy:
        'The dam makes about 2,000 megawatts of electricity with seventeen turbines. That power and water serve farms and cities in three states. The electricity is sold to towns and companies across the Southwest. Farms in California and Arizona grow crops with this water. Tourists pay to walk through the dam and see the exhibits. Boating and fishing on Lake Mead bring in more visitors. Low water levels in recent years have cut the power the dam makes. Millions of people in the desert cities depend on this water.',
    },
    comparison: [
      'Hoover Dam holds a river back with a wall made by people. The Bay of Fundy has the biggest tides on Earth, and nobody built those.',
      'People manage the Colorado River to decide who gets water. Nobody can manage the Bay of Fundy tide, which rises twice a day.',
      'Lake Mead behind the dam is one of the largest US reservoirs. The Bay of Fundy is a natural bay between New Brunswick and Nova Scotia.',
    ],
  },
]
