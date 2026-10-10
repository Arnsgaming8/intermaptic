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
        'Mount Rushmore sits in the Black Hills of South Dakota. The faces are carved into hard granite over a billion years old.',
      culture:
        'The Black Hills are sacred to the Lakota people. A 1868 treaty was broken, and Borglum carved the faces from 1927 to 1941.',
      government:
        'The memorial is run by the National Park Service. The land belongs to the federal government, not to South Dakota.',
      economy:
        'Tourism is the main business in the Black Hills. About two million people visit the memorial each year.',
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
        'The space center sits on Merritt Island on the Florida coast. Rockets launch east over the Atlantic Ocean, away from towns.',
      culture:
        'Apollo 11 left for the Moon from here in 1969. Museums on the site display a Saturn V rocket and a space shuttle.',
      government:
        'The center belongs to NASA, which is a federal agency. Congress decides how much money NASA gets each year.',
      economy:
        'Space launches bring jobs and tourists to the Florida coast. Private companies such as SpaceX now launch from the same site.',
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
        'Denali is the highest mountain in North America, at about 6,190 metres. Winter temperatures near the summit can drop to minus sixty degrees Celsius.',
      culture:
        'Native Athabaskan people have lived here for thousands of years. They call the mountain Denali, which means the high one.',
      government:
        'The park was created in 1917 and the federal government runs it. Under a 1971 law, Native corporations also own large areas here.',
      economy:
        'Almost all the money in the area comes from visitors. Buses carry tourists into the park on one road.',
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
        'Hoover Dam stands in Black Canyon, between Nevada and Arizona. It holds back the Colorado River to form Lake Mead, the largest US reservoir.',
      culture:
        'Thousands of workers built the dam during the Great Depression. It was finished in 1936 and named after President Herbert Hoover.',
      government:
        'The dam belongs to the federal government, and the Bureau of Reclamation runs it. A 1922 agreement sets out how seven states share the river water.',
      economy:
        'The dam makes about 2,000 megawatts of electricity with seventeen turbines. That power and water serve farms and cities in three states.',
    },
    comparison: [
      'Hoover Dam holds a river back with a wall made by people. The Bay of Fundy has the biggest tides on Earth, and nobody built those.',
      'People manage the Colorado River to decide who gets water. Nobody can manage the Bay of Fundy tide, which rises twice a day.',
      'Lake Mead behind the dam is one of the largest US reservoirs. The Bay of Fundy is a natural bay between New Brunswick and Nova Scotia.',
    ],
  },
]
