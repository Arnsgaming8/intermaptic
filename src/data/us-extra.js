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
        'Mount Rushmore sits in the Black Hills of South Dakota. This small mountain range rises out of the flat plains around it. The faces are carved into hard granite over a billion years old. The hills are cooler and wetter than the land nearby. Pine forests grow on the slopes. Wind and rain slowly wear the stone down. Park crews check the faces for cracks.',
      culture:
        'The Black Hills are sacred to the Lakota people and other Native nations. A treaty in 1868 promised them the land. The United States took it after gold was found. The sculptor Gutzon Borglum began the work in 1927. He wanted to bring visitors to South Dakota. His son finished the carving in 1941. Today the memorial is also a place of argument. People disagree about who should decide what happens to the mountain.',
      government:
        'The memorial is run by the National Park Service. The land belongs to the federal government, not to South Dakota. The land around it has a tangled history. Courts have ruled that the 1868 treaty was broken. Some Lakota leaders have refused payment for the land for that reason.',
      economy:
        'Tourism is the main business in the Black Hills. About two million people visit the memorial each year. Hotels, campgrounds and shops in nearby towns depend on them. Mining and ranching still matter in the wider region. They employ far fewer people than visitors do.',
    },
    comparison: [
      'Mount Rushmore is famous for what people carved into it. Gros Morne is famous for rock the Earth pushed up. Both show off stone that is over a billion years old.',
      'The faces at Mount Rushmore were carved on purpose. The Tablelands at Gros Morne were not touched by people. They are pieces of ocean floor pushed up onto land.',
      'Mount Rushmore sits in the middle of the country, far from any coast. Gros Morne sits on the Atlantic coast of Newfoundland. One draws visitors by road, the other by boat and trail.',
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
        'The space center sits on Merritt Island on the Florida coast. It faces the Atlantic Ocean. Rockets launch east over the ocean. That way, falling pieces land in the sea and not on towns. The site is surrounded by a national wildlife refuge with mangroves and lagoons. Being near the equator also helps. The Earth spins faster here, so rockets get a boost.',
      culture:
        'The space center is the place Americans picture when they think about spaceflight. Apollo 11 left for the Moon from here in 1969. Crowds watched from the beaches. Museums on the site display a Saturn V rocket and a space shuttle. Many workers there are engineers and scientists. The area around it has grown into a technology region.',
      government:
        'The center belongs to NASA, which is a federal agency. Congress decides how much money NASA gets each year. That budget rises and falls with politics. Programs can be started and then cancelled. The site also works with private companies. Some of them now launch from the same pads.',
      economy:
        'Space launches bring jobs and tourists to the Florida coast. The Vehicle Assembly Building is one of the biggest buildings in the world. Private companies such as SpaceX now launch from the same site. Space is not the only business here. The region also runs on tourism and farming.',
    },
    comparison: [
      'Kennedy Space Center launches rockets into space. Churchill, Manitoba once had a rocket range of its own. Both are small places that study very big things.',
      'Kennedy is on a warm coast in Florida. Churchill sits on cold Hudson Bay in the far north. The two have almost opposite weather all year.',
      'The space center draws about a million and a half visitors a year. Churchill draws far fewer, but people travel there to see polar bears. Both depend on visitors who come for science.',
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
        'Denali is the highest mountain in North America, at about 6,190 metres. It rises out of low hills. It is one of the biggest climbs on land from base to top. The park around it is bigger than some countries. It holds glaciers, rivers and open treeless ground. Winter temperatures near the summit can drop to minus sixty degrees Celsius.',
      culture:
        'Native Athabaskan people have lived here for thousands of years. They call the mountain Denali, and the name means the high one. Climbers came much later. The first team reached the top in 1913. The mountain was officially named Mount McKinley for most of the last century. In 2015 the federal government changed the name back to Denali.',
      government:
        'Denali sits inside a national park that the federal government owns and runs. The park was created in 1917. Alaska is a state. Most of the land around the mountain is federal, not state land. Native corporations also own and manage large areas under a 1971 settlement law.',
      economy:
        'Almost all the money in the area comes from visitors. Buses carry tourists into the park on one road. Most visitors never leave it. Flightseeing planes fly climbers onto the glaciers. There is little farming or industry this far north. The towns near the park live on the summer season.',
    },
    comparison: [
      'Denali is a mountain with no towns and no road to the top. Iqaluit is a small Arctic capital where people live all year. Both sit far north, where very few people live.',
      'Climbers go to Denali for a few weeks in summer. People in Iqaluit stay through dark winters that last for months. One is a place to visit, the other a place to live.',
      'Denali is land that the federal government set aside as a park. Iqaluit is the capital of Nunavut, a territory run mostly by Inuit people. Both are far from the big cities of their countries.',
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
        'Hoover Dam stands in Black Canyon on the Colorado River, between Nevada and Arizona. It holds back the river to form Lake Mead. That is the largest reservoir in the United States. The land around it is a dry desert. It gets very little rain. The dam also controls floods, which used to sweep through the canyon every spring.',
      culture:
        'Thousands of workers built the dam during the Great Depression. Jobs were hard to find then. Many of them lived in a temporary town called Boulder City. The dam was finished ahead of schedule in 1936. It is named after President Herbert Hoover. He was in office when the project was planned.',
      government:
        'The dam belongs to the federal government. The Bureau of Reclamation runs it. Seven states share the water of the Colorado River. A 1922 agreement called the Colorado River Compact sets out the rules. The federal government also divides the electricity among Nevada, Arizona and California. The river is shared. No single state can decide how much water it gets.',
      economy:
        'The dam makes about 2,000 megawatts of electricity with seventeen turbines. That power goes to homes and businesses in three states. Lake Mead supplies water to farms and cities, including Las Vegas and Los Angeles. The dam is also a big tourist stop. It is lit up at night.',
    },
    comparison: [
      'Hoover Dam holds a river back with a wall made by people. The Bay of Fundy has the biggest tides in the world. Nobody built that one. The Moon did.',
      'People manage the Colorado River to decide who gets water. Nobody can manage the tide in the Bay of Fundy. It rises and falls about twice a day.',
      'Lake Mead behind the dam is one of the largest reservoirs in the United States. The Bay of Fundy is a natural bay between New Brunswick and Nova Scotia. One was made in the 1930s, the other has been there for ages.',
    ],
  },
]
