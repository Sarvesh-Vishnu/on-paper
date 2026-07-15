// Source to Tap — every data table from the prototype's logic class, verbatim.
//
// Extracted from `Source to Tap.dc.html` (class Component extends DCLogic,
// lines 256–623). Table names mirror the prototype's, lowercased:
//   STATIONS → stations, STRESS → stress, FEATURED → featured,
//   STATES → states, JOURNEYS → journeys.
// The only transform applied is the repo standard: the prototype's JS
// escape sequences (backslash-u2019 etc.) are decoded to the literal
// characters ’ “ ” … ≈ –. No straight apostrophes existed in the prose;
// numbers, URLs and proper names are untouched.
//
// ROUTE vs SNAPSHOT (the prototype's `hasRoute()` gate):
//   Exactly the 8 `featured` states — TN, RJ, DL, KL, MH, PB, GJ, WB — have a
//   key in `journeys` and therefore a full six-stage source-to-tap route (plus
//   a seventh "Where it leaks" loss step). The other 17 `states` rows are
//   SNAPSHOT-ONLY: the cartogram renders them dimmed (opacity .34), the pick
//   panel shows region/source/contaminants/stress, and the journey section
//   falls back to `copy.snapshotTagline` + the featured-list chips instead of
//   the scroll route. Render code must gate on `hasRoute(ab)` exactly as the
//   prototype does (`!!JOURNEYS[selected]`).

/** The six fixed stations of every route (prototype STATIONS, lines 257–264).
 *  `label` is the spine/step kicker; index order is the stage order. */
export interface Station {
  k: 'source' | 'store' | 'treat' | 'distribute' | 'local' | 'tap';
  label: string;
}

export const stations: Station[] = [
  { k: 'source', label: 'Source' },
  { k: 'store', label: 'Storage' },
  { k: 'treat', label: 'Treatment' },
  { k: 'distribute', label: 'Distribution' },
  { k: 'local', label: 'Local tank' },
  { k: 'tap', label: 'Your tap' },
];

/** Index into `stress` — also the design-token suffix: stress 3 → var(--s3). */
export type StressIndex = 0 | 1 | 2 | 3 | 4;

/** Water-security stress labels, indexed by `StateRow.stress`
 *  (prototype STRESS, line 265; prototype `stressLabel(k)` = `stress[k]`). */
export const stress = [
  'Safe / surplus',
  'Semi-critical',
  'Critical',
  'Over-exploited',
  'Severe stress',
] as const;

/** The 8 states with a full charted route (prototype FEATURED, line 266). */
export type FeaturedAb = 'TN' | 'RJ' | 'DL' | 'KL' | 'MH' | 'PB' | 'GJ' | 'WB';

/** Order matters: it is the cartogram lit-tile set, the featured-chip list,
 *  the <select> option order, and the tie-break order of the compare chart. */
export const featured: FeaturedAb[] = ['TN', 'RJ', 'DL', 'KL', 'MH', 'PB', 'GJ', 'WB'];

/** Default selection (prototype data-props `defaultState` default, line 255;
 *  the state initialiser also falls back to 'TN' on any invalid prop). */
export const defaultState: FeaturedAb = 'TN';

/** One cartogram tile / snapshot panel (prototype STATES rows). */
export interface StateRow {
  /** Two-letter tile symbol; key into `journeys` for the 8 featured states. */
  ab: string;
  name: string;
  /** Cartogram grid column, 1-based on a 9-column grid. */
  c: number;
  /** Cartogram grid row, 1-based. */
  r: number;
  region: string;
  /** Water-security stress: index into `stress`, colour token var(--s{n}). */
  stress: StressIndex;
  /** "Main source" line of the snapshot panel. */
  source: string;
  /** "Known contaminants" — joined with ', ' in the panel; the tile renders
   *  min(4, cont.length) dots. */
  cont: string[];
}

/** All 25 charted states/UTs (prototype STATES, lines 268–294). */
export const states: StateRow[] = [
  { ab: 'LA', name: 'Ladakh',           c: 5, r: 1, region: 'Trans-Himalaya',       stress: 1, source: 'Glacial melt & springs',            cont: ['Sediment', 'Seasonal scarcity'] },
  { ab: 'JK', name: 'Jammu & Kashmir',  c: 4, r: 1, region: 'North',                stress: 1, source: 'Rivers & springs',                  cont: ['Turbidity', 'Bacterial'] },
  { ab: 'HP', name: 'Himachal Pradesh', c: 4, r: 2, region: 'Hills',                stress: 0, source: 'Himalayan rivers & springs',        cont: ['Turbidity'] },
  { ab: 'PB', name: 'Punjab',           c: 3, r: 2, region: 'North-west',           stress: 4, source: 'Groundwater (tubewells)',           cont: ['Uranium', 'Nitrate', 'Pesticides'] },
  { ab: 'UK', name: 'Uttarakhand',      c: 5, r: 2, region: 'Hills',                stress: 1, source: 'Himalayan rivers & springs',        cont: ['Turbidity', 'Drying springs'] },
  { ab: 'HR', name: 'Haryana',          c: 3, r: 3, region: 'North-west',           stress: 4, source: 'Groundwater & canals',             cont: ['Nitrate', 'Salinity', 'Fluoride'] },
  { ab: 'DL', name: 'Delhi',            c: 4, r: 3, region: 'Capital',              stress: 4, source: 'Yamuna, Ganga canal, groundwater',  cont: ['Ammonia', 'Sewage', 'Nitrate'] },
  { ab: 'RJ', name: 'Rajasthan',        c: 3, r: 4, region: 'West (arid)',          stress: 4, source: 'Groundwater & tankers',            cont: ['Fluoride', 'Salinity', 'Nitrate'] },
  { ab: 'UP', name: 'Uttar Pradesh',    c: 5, r: 3, region: 'Gangetic plain',       stress: 3, source: 'Ganga basin & groundwater',        cont: ['Arsenic', 'Fluoride', 'Nitrate'] },
  { ab: 'BR', name: 'Bihar',            c: 6, r: 3, region: 'Gangetic plain',       stress: 3, source: 'Groundwater & rivers',             cont: ['Arsenic', 'Iron', 'Fluoride'] },
  { ab: 'AR', name: 'Arunachal',        c: 9, r: 2, region: 'North-east',           stress: 0, source: 'Rain-fed rivers & springs',        cont: ['Turbidity'] },
  { ab: 'GJ', name: 'Gujarat',          c: 2, r: 5, region: 'West',                 stress: 3, source: 'Narmada canal & groundwater',      cont: ['Salinity', 'Fluoride', 'Nitrate'] },
  { ab: 'MP', name: 'Madhya Pradesh',   c: 4, r: 4, region: 'Central',              stress: 2, source: 'Rivers, reservoirs & groundwater', cont: ['Fluoride', 'Nitrate', 'Sewage (urban)'] },
  { ab: 'JH', name: 'Jharkhand',        c: 6, r: 4, region: 'East',                 stress: 1, source: 'Rivers & groundwater',             cont: ['Iron', 'Fluoride'] },
  { ab: 'WB', name: 'West Bengal',      c: 7, r: 4, region: 'East',                 stress: 3, source: 'Groundwater & rivers',             cont: ['Arsenic', 'Iron', 'Salinity'] },
  { ab: 'AS', name: 'Assam',            c: 8, r: 3, region: 'North-east',           stress: 1, source: 'Brahmaputra basin & groundwater',  cont: ['Arsenic', 'Iron', 'Fluoride'] },
  { ab: 'MH', name: 'Maharashtra',      c: 3, r: 5, region: 'West',                 stress: 3, source: 'Dams & reservoirs',                cont: ['Nitrate', 'Fluoride', 'Turbidity'] },
  { ab: 'CG', name: 'Chhattisgarh',     c: 5, r: 4, region: 'Central',              stress: 1, source: 'Rivers & groundwater',             cont: ['Iron', 'Fluoride'] },
  { ab: 'OD', name: 'Odisha',           c: 5, r: 5, region: 'East coast',           stress: 1, source: 'Rivers & groundwater',             cont: ['Iron', 'Salinity', 'Fluoride'] },
  { ab: 'TG', name: 'Telangana',        c: 4, r: 5, region: 'South (Deccan)',       stress: 3, source: 'Reservoirs & groundwater',         cont: ['Fluoride', 'Nitrate'] },
  { ab: 'GA', name: 'Goa',              c: 3, r: 6, region: 'West coast',           stress: 1, source: 'Rivers & reservoirs',              cont: ['Salinity', 'Bacterial'] },
  { ab: 'KA', name: 'Karnataka',        c: 4, r: 6, region: 'South',                stress: 3, source: 'Reservoirs & groundwater',         cont: ['Nitrate', 'Fluoride', 'Hardness'] },
  { ab: 'AP', name: 'Andhra Pradesh',   c: 5, r: 6, region: 'South-east coast',     stress: 2, source: 'Rivers & groundwater',             cont: ['Fluoride', 'Salinity', 'Nitrate'] },
  { ab: 'KL', name: 'Kerala',           c: 3, r: 7, region: 'South-west coast',     stress: 1, source: 'Rivers & high rainfall',          cont: ['Bacterial', 'Iron', 'Salinity'] },
  { ab: 'TN', name: 'Tamil Nadu',       c: 4, r: 7, region: 'South',                stress: 3, source: 'Reservoirs & groundwater',         cont: ['Salinity', 'Fluoride', 'Nitrate'] },
];

/** One of the six route stages; `stages[i]` pairs with `stations[i]`. */
export interface JourneyStage {
  /** The stage headline (serif h3 in the step; spine label when active). */
  facility: string;
  /** The stage body paragraph. */
  detail: string;
}

/** The seventh, clay-coloured "Where it leaks" step. */
export interface JourneyLoss {
  title: string;
  points: string[];
}

export interface Journey {
  /** "Following the route" line, e.g. 'Chennai · Tamil Nadu'. */
  context: string;
  /** Italic serif dek under "How the water reaches you in {state}." */
  tagline: string;
  /** "The farthest a drop travels" for this route, in km — an APPROXIMATE
   *  longest-leg distance, deliberately NOT a uniform metric. The footer
   *  disclosure states it plainly: distances "mix bulk-transfer, canal and
   *  network lengths". Per each `kmNote`: RJ 640 = Indira Gandhi Canal from
   *  Harike; GJ 458 = Narmada Main Canal; TN 250 = Krishna water down the
   *  Telugu Ganga canal; DL 200 = Upper Ganga Canal from Haridwar; PB 200 =
   *  ~150–250 km from the Bhakra dams; MH 100 = seven Western Ghats lakes to
   *  Mumbai; KL 45 and WB 40 = short river-to-intake hops where distance is
   *  explicitly NOT the story (hence their * in the compare chart). */
  km: number;
  /** Mono caption under the big km figure — the per-state disclosure of what
   *  `km` actually measures. */
  kmNote: string;
  /** The quoted serif line closing the dark "Distance" section. */
  signature: string;
  /** Exactly 6, in `stations` order. */
  stages: JourneyStage[];
  loss: JourneyLoss;
}

/** Full routes for the 8 featured states (prototype JOURNEYS, lines 296–409). */
export const journeys: Record<FeaturedAb, Journey> = {
  TN: {
    context: 'Chennai · Tamil Nadu',
    tagline: 'The city that learned to drink the sea.',
    km: 250,
    kmNote: 'Krishna water travels about 250 km down the Telugu Ganga canal from Andhra Pradesh; when it and the monsoon fail, the sea itself becomes the backup source.',
    signature: 'Rain, reservoir, river and the sea — four sources for one tap.',
    stages: [
      { facility: 'Rain, reservoir, river — and the sea', detail: 'Chennai leans on the north-east monsoon, four city reservoirs, Krishna water piped ~250 km from Andhra, and — when those fail — two seawater desalination plants on the coast.' },
      { facility: 'Poondi · Red Hills · Cholavaram · Chembarambakkam', detail: 'The four reservoirs hold the year’s supply. In June 2019 they fell to almost nothing and Chennai publicly counted down to “Day Zero.”' },
      { facility: 'Conventional plants + reverse osmosis', detail: 'Reservoir water is filtered and chlorinated the usual way; seawater is forced through RO membranes at high pressure to strip out the salt.' },
      { facility: 'Metrowater mains — and a fleet of lorries', detail: 'CMWSSB pipes reach much of the city; where they don’t, or run dry, thousands of water tankers finish the last mile every single day.' },
      { facility: 'Rooftop harvest + a household sump', detail: 'Rainwater harvesting has been mandatory on every building since 2003; homes store what they get in sumps and rooftop tanks, and book tankers to top up.' },
      { facility: 'Supply on alternate days', detail: 'Most neighbourhoods receive piped water intermittently; the poorest still buy it by the pot when the tanker arrives.' },
    ],
    loss: {
      title: 'One monsoon, and a coast for backup',
      points: [
        'A single failed monsoon can empty all four reservoirs at once.',
        'Desalination is energy-hungry and returns hot brine to the sea.',
        'The 2019 “Day Zero” showed just how thin the margin really is.',
      ],
    },
  },
  RJ: {
    context: 'Jaipur & the Thar · Rajasthan',
    tagline: 'Where water walks miles to reach you.',
    km: 640,
    kmNote: 'The Indira Gandhi Canal carries Sutlej–Beas water roughly 640 km from Harike in Punjab into the desert — one of the longest such lifelines on Earth.',
    signature: 'A 640-km canal, and a woman’s two pots — the same last mile.',
    stages: [
      { facility: 'Deep borewells, a desert canal, and the rain', detail: 'Villages tap ancient, often fluoride-rich aquifers; the Indira Gandhi Canal drags Himalayan river water 640 km into the Thar; and every roof tries to catch the monsoon.' },
      { facility: 'Household tankas & canal reservoirs', detail: 'Underground rain cisterns (tankas) and old stepwells store what little falls; the Bisalpur reservoir supplies Jaipur from afar.' },
      { facility: 'Defluoridation & RO — where it exists', detail: 'Community RO and defluoridation units treat the worst water; many hamlets still drink untreated borewell water straight from the ground.' },
      { facility: 'Long pipelines and tanker fleets', detail: 'Rural pipelines stretch for miles; in the driest blocks, water arrives by tanker — or on the heads of women and girls who walk for it.' },
      { facility: 'The household tanka & matka', detail: 'A home’s underground tanka and clay matka are the real reservoir; a village overhead tank if the pipe has finally reached.' },
      { facility: 'Intermittent, or none at all', detail: 'In the hardest blocks there is no tap at all — only a delivery schedule, a queue, and a long carry home.' },
    ],
    loss: {
      title: 'The longest carry in India',
      points: [
        'High fluoride causes crippling, irreversible skeletal fluorosis.',
        'Distances to a safe source are the greatest anywhere in the country.',
        'The whole system leans on one canal and one fickle monsoon.',
      ],
    },
  },
  DL: {
    context: 'Delhi · National Capital Territory',
    tagline: 'A capital that imports almost all its water.',
    km: 200,
    kmNote: 'The Upper Ganga Canal brings water ~200 km from Haridwar; between it, the Yamuna and Sutlej water via Haryana, Delhi imports roughly 90% of its supply.',
    signature: 'Two hundred kilometres of borrowed river, then a leaking grid.',
    stages: [
      { facility: '≈90% imported river water', detail: 'Delhi drinks the Yamuna, the Upper Ganga Canal from Haridwar, and Sutlej water via Haryana’s Munak canal — over a falling water table underneath.' },
      { facility: 'Wazirabad pond & feeder canals', detail: 'The Yamuna is held at the Wazirabad barrage; feeder canals carry upstream water down to the treatment plants.' },
      { facility: 'Nine plants — Wazirabad, Sonia Vihar, Bhagirathi…', detail: 'When ammonia from upstream pollution spikes, plants throttle back or shut, and taps run dry across whole districts.' },
      { facility: 'A vast, leaky grid + the tanker', detail: 'The Delhi Jal Board network loses more than 40% before it reaches a tap; unauthorised colonies wait on the water tanker.' },
      { facility: 'Sumps, rooftop tanks & booster pumps', detail: 'Almost every home pulls the intermittent supply into an underground sump and pushes it up to a rooftop tank.' },
      { facility: 'Hours a day — and deeply unequal', detail: 'A few zones get near-round-the-clock water; much of the city gets a couple of hours; the edges get a tanker.' },
    ],
    loss: {
      title: 'Borrowed water, leaking grid',
      points: [
        'More than 40% is “non-revenue water” — lost to leaks and theft.',
        'Ammonia spikes in the Yamuna shut treatment plants without warning.',
        'Supply is split unequally, colony by colony.',
      ],
    },
  },
  KL: {
    context: 'Kochi & the coast · Kerala',
    tagline: 'Drowning in rain, thirsty by March.',
    km: 45,
    kmNote: 'Distance isn’t the problem here — Kerala’s short, steep rivers reach the sea within ~48 hours. The challenge is holding on to the water long enough to use it.',
    signature: 'Three metres of rain a year, and a dry tap in summer.',
    stages: [
      { facility: '44 rivers, three metres of rain — and a well in the yard', detail: 'Kerala gets India’s heaviest rainfall, but its rivers are short and steep and reach the sea within a day or two; most homes still draw from an open dug well.' },
      { facility: 'Almost none — the rain runs to the sea', detail: 'City reservoirs aside, little is stored; the household well is the real reservoir, refilled each monsoon and drawn down by March.' },
      { facility: 'Kerala Water Authority plants', detail: 'The Aluva plant on the Periyar treats water for Kochi; the countless private wells are never treated at all.' },
      { facility: 'KWA pipes beside millions of private wells', detail: 'Piped supply serves the towns; elsewhere it’s a well per household, or a small gravity-fed local scheme.' },
      { facility: 'The yard well + a rooftop tank', detail: 'Homes lift from the well and store on the roof; rooftop rain is channelled back down to recharge the well (Mazhapolima).' },
      { facility: 'Piped in town, a bucket elsewhere — dry by March', detail: 'City taps run; village homes dip the well — and by the pre-monsoon summer, both can fall worryingly low.' },
    ],
    loss: {
      title: 'Drowning in rain, thirsty by March',
      points: [
        'The gap is storage and treatment, not rainfall.',
        'Open wells and the 2018 floods drive bacterial contamination.',
        'The coast fights salinity as wells turn brackish.',
      ],
    },
  },
  MH: {
    context: 'Mumbai · Maharashtra',
    tagline: 'Water that arrives by gravity, from 100 km away.',
    km: 100,
    kmNote: 'Mumbai’s water falls by gravity from seven lakes over 100 km away in the Western Ghats — then is pumped back up into the city’s towers.',
    signature: 'A hundred kilometres downhill, then up forty floors.',
    stages: [
      { facility: 'Seven lakes in the Western Ghats', detail: 'Mumbai’s water comes from seven reservoirs — Bhatsa, Upper & Middle Vaitarna, Modak Sagar, Tansa, Vihar and Tulsi — some more than 100 km from the city.' },
      { facility: 'A whole year’s supply in the hills', detail: 'Those seven lakes hold the entire annual supply; a weak monsoon over them means city-wide cuts the following summer.' },
      { facility: 'Bhandup — among Asia’s largest plants', detail: 'The Bhandup complex and Panjrapur treat the incoming water before it enters the city’s network.' },
      { facility: 'Gravity tunnels into the island city', detail: 'Vast tunnels and trunk mains carry the water downhill into Mumbai with almost no pumping at all.' },
      { facility: 'Society sumps, then up forty floors', detail: 'Building sumps and pumps lift the water into overhead tanks at the top of the high-rises.' },
      { facility: 'Good in the core — priced by geography', detail: 'The island city has one of India’s better supplies; a slum household often pays far more per litre than the tower beside it.' },
    ],
    loss: {
      title: 'A hundred kilometres, then a slum tap',
      points: [
        'Roughly a quarter to a third leaks from the mains.',
        'Contamination creeps in where pipes run through slums.',
        'Rural Marathwada — the same state — survives on drought tankers.',
      ],
    },
  },
  PB: {
    context: 'Punjab',
    tagline: 'The breadbasket is drinking its own future.',
    km: 200,
    kmNote: 'Canal water travels ~150–250 km from the Bhakra dams; but the deeper story here is depth — the drinking-water table falls about a metre every year.',
    signature: 'Free power, a falling table — and a switch back to the canal.',
    stages: [
      { facility: 'Canals for the fields, deep tubewells for the glass', detail: 'Bhakra-system canals irrigate Punjab’s farms; for drinking, most homes pump deep groundwater — and the table drops about a metre a year.' },
      { facility: 'Bhakra & Pong reservoirs', detail: 'Built to irrigate, the great dams store river water; the drinking aquifer is “stored” underground, and steadily shrinking.' },
      { facility: 'A shift to canal water & RO', detail: 'New surface-water plants and community RO units aim to escape uranium- and nitrate-laden groundwater.' },
      { facility: 'Rural piped schemes to village tanks', detail: 'Jal Jeevan pipelines feed village overhead tanks right across the state.' },
      { facility: 'The village overhead tank', detail: 'An OHSR (overhead service reservoir) and household storage hold each village’s daily share.' },
      { facility: 'Access rising — quality the fight now', detail: 'Piped coverage is climbing fast; the battle has shifted from getting water to making it safe to drink.' },
    ],
    loss: {
      title: 'Drinking its own future',
      points: [
        'Uranium, nitrate and pesticides taint the groundwater.',
        'The water table is in free-fall under paddy farming.',
        'Free power keeps the pumps — and the decline — running.',
      ],
    },
  },
  GJ: {
    context: 'Gujarat',
    tagline: 'One dam, one canal, a whole state’s tap.',
    km: 458,
    kmNote: 'The Narmada Main Canal runs about 458 km; its branches carry water more than 700 km into arid Kutch and Saurashtra — one of the largest canal networks on Earth.',
    signature: '458 kilometres of concrete canal, from one dam to your kitchen.',
    stages: [
      { facility: 'One river, one dam', detail: 'The Narmada, dammed at Sardar Sarovar, feeds one of the world’s largest canal networks; local groundwater is often saline.' },
      { facility: 'Sardar Sarovar + a branching grid', detail: 'The reservoir and a spreading grid of canals and balancing tanks store and move the water across the whole state.' },
      { facility: 'Plants along the canal grid', detail: 'Treatment plants sit along the canal before the water enters the statewide bulk pipelines.' },
      { facility: 'A statewide bulk-pipeline grid', detail: 'WASMO’s pipeline grid carries Narmada water to some three-quarters of Gujarat — deep into arid Kutch and Saurashtra.' },
      { facility: 'Village sumps & overhead tanks', detail: 'Villages draw their share off the grid into local sumps and overhead tanks.' },
      { facility: 'One of India’s strongest piped stories', detail: 'Where the grid reaches, the tap runs — a rare tale of near-universal piped coverage.' },
    ],
    loss: {
      title: 'A whole state on one river',
      points: [
        'Coastal aquifers turn saline as the sea intrudes.',
        'Fluoride pockets persist stubbornly inland.',
        'Leaning a whole state on a single dam is its own kind of risk.',
      ],
    },
  },
  WB: {
    context: 'Kolkata & the delta · West Bengal',
    tagline: 'Clear water that can carry a slow poison.',
    km: 40,
    kmNote: 'Kolkata’s river source is close (~40 km to Palta). The distance that matters here runs downward — into arsenic-laden shallow aquifers directly beneath people’s homes.',
    signature: 'The poison is invisible, odourless, and decades old.',
    stages: [
      { facility: 'A great river up top, poison underneath', detail: 'Kolkata drinks the Ganga (Hooghly), drawn at Palta; across the delta, millions pump shallow groundwater — the water that carries arsenic.' },
      { facility: 'Palta intake & delta ponds', detail: 'River water is settled at the Palta works; villages rely on ponds and tanks between the tubewells.' },
      { facility: 'Palta & Garden Reach + arsenic units', detail: 'The city plants treat river water; district arsenic-removal units try to keep pace out in the villages.' },
      { facility: 'City network + a shift off tubewells', detail: 'Kolkata’s KMC grid runs on treated river water; rural schemes move households off arsenic-tainted tubewells onto piped surface water.' },
      { facility: 'Overhead tanks — and the hand-pump', detail: 'Cities store in overhead tanks; in the delta the hand-pump is both the source and the risk.' },
      { facility: 'Treated river in the city, a slow fix in the delta', detail: 'Kolkata gets clean piped water; the countryside is slowly migrating away from the poisoned shallow well.' },
    ],
    loss: {
      title: 'An invisible, decades-old poison',
      points: [
        'The world’s most-studied arsenic crisis is still not solved.',
        'Iron makes water unpalatable long before it is unsafe.',
        'Sundarbans wells turn salty with every storm surge.',
      ],
    },
  },
};

/** The prototype's `hasRoute()`: true iff `ab` has a full charted journey.
 *  Everything else in `states` is snapshot-only. */
export function hasRoute(ab: string): ab is FeaturedAb {
  return Object.prototype.hasOwnProperty.call(journeys, ab);
}

// ---------------------------------------------------------------------------
// Compare chart (prototype compareEl(), lines 557–574).
// The chart has NO table of its own — each row is derived per featured state:
//   label  = states[ab].name            (serif, left column)
//   bar    = width % = max(3, km/compareMax*100), water/water-deep fill
//   value  = `${journeys[ab].km} km` + compareStarSuffix for starred states
//   row    = a <button> that selects that state's route
// What the number measures: "The farthest a drop travels, by state" — but per
// the section dek ("Distance is only one way a journey gets hard") and the
// footnote, the km values are approximate longest-leg distances mixing canal
// lengths (RJ, GJ, TN, DL, PB) with source-to-city hops (MH, WB, KL); the
// footer adds "distances are approximate and mix bulk-transfer, canal and
// network lengths. Verify before citing."
// ---------------------------------------------------------------------------

/** Bar-scale denominator: the longest route (RJ, 640 km). */
export const compareMax = 640;

/** Rows whose km value gets the ' *' footnote marker — KL (the fight is
 *  storage, not distance) and WB (the danger is arsenic underfoot). */
export const compareStarred: FeaturedAb[] = ['KL', 'WB'];

/** Suffix appended to the km label of starred rows (note the leading space). */
export const compareStarSuffix = ' *';

/** Row order: `featured` sorted by km descending (stable sort, so DL keeps
 *  its place before PB at the 200 km tie — matches the prototype exactly). */
export const compareOrder: FeaturedAb[] = ['RJ', 'GJ', 'TN', 'DL', 'PB', 'MH', 'KL', 'WB'];

// ---------------------------------------------------------------------------
// Copy strings buried in the logic class (renderVals(), lines 576–622) that
// the render code needs verbatim.
// ---------------------------------------------------------------------------
export const copy = {
  /** Journey-section tagline fallback for snapshot-only states (line 607). */
  snapshotTagline: 'A snapshot — pick a lit state for the full route.',
  /** Seventh step's number glyph and kicker (line 591). */
  lossNum: '!',
  lossKicker: 'Where it leaks',
  /** Stage counter once the loss step is active (line 596). While on stages
   *  0–5 the counter is `Stage ${n + 1} of 6 · ${stations[n].label}`. */
  stageCounterEnd: 'The route — and where it leaks',
} as const;
