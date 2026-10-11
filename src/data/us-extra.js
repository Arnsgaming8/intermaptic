/**
 * Additional United States stops for the Intermaptic atlas.
 * Schema is documented in src/data/shared.js; pair ids are owned by src/data/locations.js.
 * Every sentence here is written for a 6th grade reader: short, plain words, no
 * semicolons and no em dashes.
 *
 * Each stop carries a `sources` list as well: the bodies its figures come from. These
 * readings were refreshed against 2025 and 2026 figures, so several of them now mention
 * happenings of those years.
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
      { label: 'Visitors', value: 'About 2 million a year' },
      { label: 'Country turns 250', value: 'Fireworks on 3 July 2026' },
    ],
    sections: {
      geography:
        'Mount Rushmore sits in the Black Hills of South Dakota. The faces are carved into hard granite over a billion years old. The Black Hills rise above the flat plains that surround them. Ponderosa pine trees cover the slopes around the mountain. The site stands higher than the plains that stretch to the east. Summers here are warm and dry, and winters bring snow. Wind and rain wear at the granite, so the faces need care. Rapid City is the nearest large town to the memorial.',
      culture:
        'The Black Hills are sacred to the Lakota people. An 1868 treaty was broken, and the faces were carved from 1927 to 1941. The sculptor Gutzon Borglum chose the four presidents himself. The four are Washington, Jefferson, Roosevelt and Lincoln. Each face stands about eighteen metres tall. Workers used dynamite and jackhammers to cut the rock. Lakota people still ask for the return of the Black Hills. In 2026 the country turned 250, and fireworks returned to the memorial.',
      government:
        'The memorial is run by the National Park Service. The land belongs to the federal government, not to South Dakota. The park service protects the carving and the forest around it. Congress pays for the upkeep of the memorial. Walking in is free, and drivers pay a fee to park. For the 2026 fireworks, a lottery chose who could attend. A 1980 court ruling said the land was taken unfairly. The Lakota refused the money that came with it.',
      economy:
        'Tourism is the main business in the Black Hills. About two million people visit the memorial each year. Hotels, motels and restaurants in nearby towns depend on them. Rapid City serves as the base for most visitors. South Dakota paid for the 2026 fireworks and the lottery. Nearby ranches raise cattle on the surrounding grassland. Badlands National Park is close enough for a day trip. Gold mining once drove the economy of these hills.',
    },
    comparison: [
      'Mount Rushmore is famous for what people carved into it. Gros Morne is famous for billion-year-old rock the Earth pushed up.',
      'The faces at Mount Rushmore were carved on purpose. The Tablelands at Gros Morne are pieces of ocean floor pushed up onto land.',
      'Mount Rushmore sits in the middle of the country, far from any coast. Gros Morne sits on the Atlantic coast of Newfoundland.',
    ],
    sources: ['National Park Service, 2026', 'South Dakota Department of Tourism, 2026'],
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
      { label: 'Artemis II', value: 'Flew around the Moon, April 2026' },
      { label: 'Apollo 11', value: 'Launched here, 1969' },
      { label: 'Visitors', value: 'About 1.5 million a year' },
    ],
    sections: {
      geography:
        'The space center sits on Merritt Island on the Florida coast. Rockets launch east over the Atlantic Ocean, away from towns. The site shares its land with a national wildlife refuge. Salt marshes, dunes and flat sandy ground cover the island. Summers are hot and wet, and hurricanes can reach the coast. Cape Canaveral sits next to the island, on a narrow strip of land. The Banana River and the Indian River surround much of the site. Few tall buildings stand here, because rockets need open sky.',
      culture:
        'Apollo 11 left for the Moon from here in 1969. Museums on the site display a Saturn V rocket and a space shuttle. In April 2026, Artemis II carried four people around the Moon. That was the first crewed flight to the Moon since 1972. Crowds gather on nearby beaches to watch each launch. Launch tickets from the visitor complex sold out for Artemis II. School groups come here to learn about rockets and space travel. The name honours President John F. Kennedy.',
      government:
        'The center belongs to NASA, which is a federal agency. Congress decides how much money NASA gets each year. NASA runs the launches, but private companies own many of the rockets. The Space Force runs the launch ranges next door at Cape Canaveral. Parts of the next Moon rocket arrived at the center in April 2026. The federal government set the site aside in the 1960s. A wildlife refuge on the same land is protected by law. Taxes paid to the federal government pay for most of the work.',
      economy:
        'Space launches bring jobs and tourists to the Florida coast. Private companies such as SpaceX now launch from the same site. Thousands of engineers and technicians work on the Space Coast. Hotels and restaurants near the coast rely on launch crowds. The 2026 Moon flight brought a rush of visitors to the coast. Cargo launches carry satellites and supplies for paying customers. The space industry supports many small businesses in the area. Tourism and space work together on this stretch of coast.',
    },
    comparison: [
      'Both are small places that study very big things. Kennedy flew four people around the Moon in 2026.',
      'Kennedy is on a warm coast in Florida. Churchill sits on cold Hudson Bay in the far north.',
      'The space center draws about a million and a half visitors a year. Churchill draws far fewer, but people travel there to see polar bears.',
    ],
    sources: ['NASA, 2026', 'Kennedy Space Center Visitor Complex, 2026'],
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
      { label: 'Federal name', value: 'Mount McKinley, changed back in 2025' },
      { label: 'Local name', value: 'Denali, used in Alaska' },
    ],
    sections: {
      geography:
        'Denali is the highest mountain in North America, at about 6,190 metres. Winter temperatures near the summit can drop to minus sixty degrees Celsius. The mountain rises out of a broad valley of rivers and gravel bars. Snow and ice cover much of the peak all year round. Only one road enters the park, and it stops far from the summit. Earthquakes shake this region, because two plates meet in Alaska. Long summer days here bring hours of light after midnight. The park covers millions of acres of wild land.',
      culture:
        'Native Athabaskan people have lived here for thousands of years. They call the mountain Denali, which means the high one. The mountain was called Mount McKinley for many years. In 2015 the official name changed to Denali. In January 2025 the federal government changed it back to Mount McKinley. Alaska and many climbers still call it Denali. Climbers from many countries come each summer to reach the top. Local Athabaskan groups keep their language and traditions alive.',
      government:
        'The park was created in 1917 and the federal government runs it. Under a 1971 law, Native corporations also own large areas here. The National Park Service sets the rules for visiting the park. The park keeps the name Denali, even though the peak was renamed. Alaska lawmakers have asked for the old name to be restored. Only a few buses are allowed on the park road each day. The state of Alaska manages fish and game across the region. Federal and state agencies share the job of keeping people safe.',
      economy:
        'Almost all the money in the area comes from visitors. Buses carry tourists into the park on one road. Guides lead climbing trips, and shops rent cold-weather gear. Hotels and lodges in nearby towns open for the short summer. Many workers leave when the season ends in September. Fishing and hunting also bring money to small communities. Roadhouses along the highway serve travellers and truck drivers. The summer season lasts only a few months each year.',
    },
    comparison: [
      'Denali is a mountain with no towns and no road to the top. Iqaluit is a small Arctic capital where people live all year.',
      'Climbers go to Denali for a few weeks in summer. People in Iqaluit stay through dark winters that last for months.',
      'Denali is land the federal government set aside as a park. Iqaluit is the capital of Nunavut, run mostly by Inuit people.',
    ],
    sources: ['U.S. Department of the Interior, 2025', 'National Park Service, 2026'],
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
      { label: 'Lake Mead', value: 'Lowest level on record, August 2026' },
    ],
    sections: {
      geography:
        'Hoover Dam stands in Black Canyon, between Nevada and Arizona. It holds back the Colorado River to form Lake Mead, the largest US reservoir. The river cuts through a dry desert where rain is rare. The dam is a curved wall of concrete, thickest at the bottom. Summers here are very hot, and the canyon holds the heat. In August 2026 the lake fell to its lowest level on record. Lake Mead is now less than a third full. The Colorado River begins in the Rocky Mountains and flows south.',
      culture:
        'Thousands of workers built the dam during the Great Depression. It was finished in 1936 and named after President Herbert Hoover. Workers lived in a town called Boulder City while they built it. The dam was the largest concrete structure in the world at the time. Tours today take visitors down inside the dam walls. The building shows art deco designs on its towers and walls. Boulder City keeps the story of the workers in its museum. The dam is a landmark that people travel far to see.',
      government:
        'The dam belongs to the federal government, and the Bureau of Reclamation runs it. A 1922 agreement sets out how seven states share the river water. Federal law sets out how much water each state may take. In late 2026 Nevada began taking 17% less water for two years. The states, tribes and Mexico all have claims on the river. The dam also controls floods along the lower Colorado River. A federal study warns the dam could lose most of its power. That happens if the lake keeps falling as it did in 2026.',
      economy:
        'The dam makes about 2,000 megawatts of electricity with seventeen turbines. That power and water serve farms and cities in three states. The electricity is sold to towns and companies across the Southwest. Farms in California and Arizona grow crops with this water. Tourists pay to walk through the dam and see the exhibits. Low water has already cut the power the dam can make. Boating and fishing on Lake Mead bring in more visitors. Millions of people in the desert cities depend on this water.',
    },
    comparison: [
      'Hoover Dam holds a river back with a wall made by people. The Bay of Fundy has the biggest tides on Earth, and nobody built those.',
      'People manage the Colorado River to decide who gets water. Nobody can manage the Bay of Fundy tide, which rises twice a day.',
      'Lake Mead behind the dam fell to its lowest level on record in 2026. The Bay of Fundy is a natural bay between New Brunswick and Nova Scotia.',
    ],
    sources: ['U.S. Bureau of Reclamation, 2026', 'National Park Service, 2026'],
  },
]
