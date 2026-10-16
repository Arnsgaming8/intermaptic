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
      { label: 'Country turns 250', value: 'Nation\'s 250th birthday in 2026' },
    ],
    sections: {
      geography:
        'Mount Rushmore sits in the Black Hills of South Dakota. The faces are carved into granite that is more than a billion years old. The Black Hills rise straight up out of flat plains. Ponderosa pines cover the slopes. The memorial stands higher than the land to the east. Summers here run warm and dry. Winters bring snow. Wind and rain wear at the granite, so the faces need care. Rapid City is the nearest large town.',
      culture:
        'The Black Hills are sacred to the Lakota people. An 1868 treaty was broken. Work began in 1927. It finished in 1941. The sculptor Gutzon Borglum picked the four presidents himself. They are Washington, Jefferson, Roosevelt and Lincoln. Each face stands about eighteen meters tall. Workers used dynamite and jackhammers on the rock. Lakota people still ask for the Black Hills to be handed back. In 2026 the country turned 250, and the memorial drew extra attention.',
      government:
        'The memorial is run by the National Park Service. The land belongs to the federal government. South Dakota does not own it. The park service protects the carving and the forest around it. Congress pays for the upkeep. Walking in costs nothing. Drivers pay a fee to park. A court ruling in 1980 said the land had been taken unfairly. The Lakota turned down the money that came with that ruling. The park service sets the rules for big crowds on special days.',
      economy:
        'Tourism is the main business here. About two million people visit the memorial each year. Hotels, motels and restaurants in the nearby towns depend on all those visitors. Rapid City is the base for most of them. They spend on gas and food. Ranchers keep cattle on the grassland around the hills. Badlands National Park sits close enough for a day trip from here. Gold mining once drove the economy of these hills.',
    },
    comparison: [
      'Mount Rushmore is famous for what people carved. Gros Morne is famous for billion-year-old rock the Earth pushed up.',
      'The faces at Mount Rushmore were carved on purpose. The Tablelands at Gros Morne are rock pushed up from deep inside the Earth.',
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
      { label: 'Visitors', value: 'Well over a million a year' },
    ],
    sections: {
      geography:
        'The space center sits on Merritt Island, right on the Florida coast. Rockets launch east over the Atlantic, away from towns. The site shares its land with a national wildlife refuge. Salt marshes, dunes and flat sandy ground cover most of the island. Summers run hot and wet. Hurricanes can reach this coast. Cape Canaveral sits right next door. The Banana and Indian rivers wrap around much of the site. Few tall buildings stand here, because rockets need open sky.',
      culture:
        'Apollo 11 left for the Moon from here in 1969. Museums on the site display a Saturn V rocket and a space shuttle. In April 2026, Artemis II carried four people all the way around the Moon. That was the first crewed flight to the Moon since 1972. Crowds gather on the nearby beaches. They come out to watch each launch. School groups come here to learn about rockets. The name honors John F. Kennedy.',
      government:
        'The center belongs to NASA. NASA is a federal agency. Congress decides how much money NASA gets to spend each year. NASA runs the launches. Private companies own many of the rockets. The Space Force runs the launch ranges next door. Work on the next Moon rocket carries on at the same center. The federal government set this land aside way back in the 1960s. A wildlife refuge on the same land is protected by law. Federal taxes pay for most of the work.',
      economy:
        'Space launches bring jobs and tourists to the Florida coast. Private companies such as SpaceX now launch from this same stretch of coast. Thousands of engineers work here. So do technicians. Hotels and restaurants near the coast rely on launch crowds. The 2026 Moon flight drew attention to the coast. Cargo launches carry satellites and supplies for paying customers. The space industry supports many small businesses. Tourism and the space business work together on this stretch of coast.',
    },
    comparison: [
      'Both are small places that study very big things. Kennedy sent four people around the Moon in 2026.',
      'Kennedy sits on a warm coast in Florida. Churchill sits on cold Hudson Bay, far to the north.',
      'The space center draws well over a million visitors a year. Churchill draws far fewer, but people go there for the polar bears.',
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
        'Denali is the highest mountain in North America, at about 6,190 metres up. Winter temperatures near the top fall far below freezing. The peak rises out of a wide valley of rivers and gravel bars. Snow and ice cover much of the summit all year. One road runs into the park. It stops far from the top. Two plates meet beneath Alaska, so earthquakes shake the region. Summer days are so long that the sky stays light after midnight. The park covers millions of acres of wild land.',
      culture:
        'Athabaskan people have lived here for thousands of years. They call the mountain Denali, and the name means the high one. For years it was Mount McKinley. The official name changed to Denali in 2015. In January 2025 the federal government changed it back. Many Alaskans still say Denali. Climbers come from many countries every summer to try for the top. Local Athabaskan groups keep their language and traditions alive.',
      government:
        'The park was created back in 1917. The federal government runs it. A law passed in 1971 created Alaska Native corporations. The National Park Service sets the rules for visiting the park. The park keeps the name Denali, even though the peak was renamed. Alaska lawmakers have asked for the name Denali to be restored. Only a few buses are allowed on the single park road each day. The state of Alaska manages fish and game across the region. Federal and state agencies share the job of keeping people safe.',
      economy:
        'Visitors bring in much of the money here. Buses carry tourists along the single road that runs into the park. Guides lead climbing trips. Shops rent out cold-weather gear. Hotels and lodges open for the short summer. Many workers pack up and leave when the season ends in September. Fishing and hunting bring money to small communities. Roadhouses along the highway serve travellers and truck drivers. The summer season lasts only a few months.',
    },
    comparison: [
      'Denali is a mountain with no towns and no road to the top. Iqaluit is a small Arctic capital where families live all year.',
      'Climbers visit Denali for a few weeks in summer. People in Iqaluit stay through dark winters that last for months.',
      'Denali is federal land set aside as a park. Iqaluit is the capital of Nunavut, where most residents are Inuit.',
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
        'Hoover Dam stands in Black Canyon, between Nevada and Arizona. It holds the Colorado back. The river backs up into Lake Mead, the largest reservoir in the country. The river cuts through dry desert. Rain is rare here. The dam is a curved wall of concrete, thickest at the bottom. Summers get very hot, and the canyon traps the heat. In August 2026 the lake fell to its lowest level on record. Lake Mead is now less than a third full. The Colorado begins in the Rocky Mountains and flows south.',
      culture:
        'Thousands of workers built the dam during the Great Depression. It was finished in 1936. The dam is named after President Herbert Hoover. Many of those workers lived in a town called Boulder City. At the time it was the largest concrete structure in the world. Tours take visitors down inside the dam walls today. The towers show art deco designs. A museum in Boulder City keeps the story of those workers. People drive a long way out of the desert to see this landmark.',
      government:
        'The dam is federal property. The Bureau of Reclamation runs it. A 1922 agreement sets out how seven states share the river water. Federal law also says how much each state may take. About 40 million people depend on the river for water. States, tribes and Mexico all have claims on it. The dam also controls floods on the lower Colorado. Lower lake levels mean less water gets to run through the turbines. Power output drops when the lake falls.',
      economy:
        'The dam makes about 2,000 megawatts. Seventeen turbines do the work. That power and water serve farms and cities in three states. The electricity is sold to towns and companies across the Southwest. Farms in California and Arizona grow crops with this water. Tourists pay to walk through the dam and look at the exhibits. Low water has already cut the amount of power the dam can make. Boating and fishing on Lake Mead bring in more visitors. Millions of people in the desert cities depend on this water.',
    },
    comparison: [
      'Hoover Dam holds a river back with a wall people built. The Bay of Fundy has the biggest tides on Earth, and nobody built those.',
      'People manage the Colorado River, so they decide who gets water. Nobody manages the Fundy tide, which rises twice a day anyway.',
      'Lake Mead fell to its lowest level on record in 2026. The Bay of Fundy is a natural bay between New Brunswick and Nova Scotia.',
    ],
    sources: ['U.S. Bureau of Reclamation, 2026', 'National Park Service, 2026'],
  },
]
