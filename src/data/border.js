/**
 * The US–Canada boundary, as an ordered list of waypoints.
 *
 * It is drawn as a glowing dashed ribbon across the globe: the 49th parallel from
 * the Pacific to Lake of the Woods, then the water boundary through the Great Lakes
 * and the St. Lawrence, the 45th-parallel stretch, and finally the Alaska–Yukon
 * segment up the 141st meridian.
 *
 * Coordinates are approximate representations of the real boundary, chosen so the
 * shape reads correctly at globe scale.
 */
export const BORDER_SEGMENTS = [
  {
    id: 'west-49th',
    label: '49th parallel',
    note: 'A straight line from the Pacific Ocean to Lake of the Woods. The two countries agreed on it in the Oregon Treaty of 1846.',
    points: [
      { lat: 48.99, lng: -123.02 },
      { lat: 49.0, lng: -120.0 },
      { lat: 49.0, lng: -116.0 },
      { lat: 49.0, lng: -112.0 },
      { lat: 49.0, lng: -108.0 },
      { lat: 49.0, lng: -104.0 },
      { lat: 49.0, lng: -100.0 },
      { lat: 49.0, lng: -96.5 },
      { lat: 49.38, lng: -95.15 },
    ],
  },
  {
    id: 'great-lakes',
    label: 'Great Lakes corridor',
    note: 'The line runs through the middle of 4 of the 5 Great Lakes.',
    points: [
      { lat: 49.38, lng: -95.15 },
      { lat: 48.05, lng: -90.0 },
      { lat: 47.6, lng: -88.4 },
      { lat: 46.55, lng: -84.35 },
      { lat: 45.4, lng: -83.0 },
      { lat: 43.9, lng: -82.5 },
      { lat: 42.62, lng: -82.4 },
      { lat: 42.3, lng: -80.5 },
      { lat: 42.9, lng: -78.9 },
      { lat: 43.08, lng: -79.05 },
      { lat: 43.6, lng: -78.7 },
      { lat: 44.1, lng: -76.45 },
      { lat: 45.0, lng: -74.75 },
    ],
  },
  {
    id: 'east-45th',
    label: 'Eastern highlands',
    note: 'After the St. Lawrence River, the line follows the 45th parallel. Then it follows rivers through northern New England.',
    points: [
      { lat: 45.0, lng: -74.75 },
      { lat: 45.0, lng: -71.5 },
      { lat: 45.3, lng: -70.9 },
      { lat: 46.1, lng: -69.9 },
      { lat: 47.0, lng: -68.0 },
      { lat: 45.9, lng: -67.4 },
      { lat: 44.8, lng: -66.95 },
    ],
  },
  {
    id: 'alaska-yukon',
    label: 'Alaska–Yukon',
    note: 'This part runs along the 141st meridian. The United States bought Alaska in 1867. That created a second border far to the north.',
    points: [
      { lat: 60.3, lng: -141.0 },
      { lat: 64.0, lng: -141.0 },
      { lat: 69.6, lng: -141.0 },
    ],
  },
]

/** Flattened waypoints, handy for the overview ticker. */
export const BORDER_WAYPOINTS = BORDER_SEGMENTS.flatMap((segment) => segment.points)

/** Headline facts about the boundary itself, shown in the border panel. */
export const BORDER_FACTS = [
  { label: 'Total length', value: '8,891 km long, counting Alaska' },
  { label: 'Rank', value: 'The longest border in the world between two countries' },
  { label: 'Guarded by armies', value: 'No soldiers or walls on either side since 1872' },
  {
    label: 'Water crossings',
    value: 'It crosses 4 of the 5 Great Lakes. It also crosses the St. Lawrence, Niagara and St. Clair rivers.',
  },
  {
    label: 'Commission',
    value: 'A joint group called the International Boundary Commission has measured the line since 1925.',
  },
]
