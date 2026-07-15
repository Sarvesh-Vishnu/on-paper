// Water on Paper — every data table from the prototype's logic class
// (`class Component extends DCLogic`, "Water on Paper.dc.html" lines 607–1053),
// ported verbatim. Export names mirror the prototype's `this.TABLE` names,
// lowercased: STRESS→stress, COUNTRIES→countries, STATES→states,
// FRESHWATER→freshwater, CONSTITUTION31→constitution31, ABSTAIN41→abstain41,
// REACH→reach, BOTTLED→bottled, POLLUTERS→polluters, HEADING→heading,
// FOOTPRINTS→footprints, SOLUTIONS→solutions, AWARE.learn/give→awareLearn/awareGive,
// SOURCES→sources; CONSTITUTION_NOTE→constitutionNote, ABSTAIN_NOTE→abstainNote.
//
// The ONLY textual change from the prototype: straight apostrophes in prose are
// converted to typographic ones (' → ’) per repo convention — including inside
// place names in prose ("Sana’a") and inside straight-quoted phrases
// ("'Earth’s First Soft Drink.'"). Straight single-QUOTE pairs ('premature',
// 'Day Zero', 'cleanest city', work titles) are kept straight — the convention
// converts apostrophes ONLY. No numbers, URLs, keys, or org names altered.
//
// Dependency-free. Helpers at the bottom reproduce exactly what the
// prototype's renderVals() derived for the templates (documented inline).

/* ---------------------------------------------------------------- stress -- */

/** Groundwater-stress scale; index k maps to colour token `var(--s{k})`. */
export type StressLevel = 0 | 1 | 2 | 3 | 4;

/** STRESS — labels for stress levels 0–4. */
export const stress: string[] = [
  "Safe / surplus",
  "Semi-critical",
  "Critical",
  "Over-exploited",
  "Severe stress",
];

/* ------------------------------------------------------------- countries -- */

export interface CountryOrg {
  name: string;
  what: string;
}

export interface Country {
  key: string;
  name: string;
  region: string;
  stress: StressLevel;
  /** Only India carries this — renders the " · deep dive ↓" suffix + link. */
  deepdive?: boolean;
  stat: string;
  statLbl: string;
  source: string;
  challenge: string;
  orgs: CountryOrg[];
}

/** COUNTRIES — the world panel's 10 water-stressed countries, in rank order. */
export const countries: Country[] = [
  { key: "YE", name: "Yemen", region: "Middle East", stress: 4, stat: "first", statLbl: "Sana’a is projected to be one of the first capital cities on Earth to run out of water.", source: "Fossil groundwater & trucked water", challenge: "Aquifers drained faster than they can ever refill — for farming and through years of conflict that shattered the supply network.", orgs: [{ name: "UNICEF Yemen — WASH", what: "emergency water & sanitation" }, { name: "Oxfam", what: "clean-water response" }] },
  { key: "IN", name: "India", region: "South Asia", stress: 4, deepdive: true, stat: "600M", statLbl: "people under high-to-extreme water stress — and the world’s largest user of groundwater.", source: "Groundwater, rivers & reservoirs", challenge: "18% of the world’s people living on 4% of its fresh water, spending the savings faster than the rain returns them.", orgs: [{ name: "WaterAid India", what: "safe water & hygiene, nationwide" }, { name: "Water.org", what: "water credit & access" }] },
  { key: "PK", name: "Pakistan", region: "South Asia", stress: 4, stat: "1 river", statLbl: "A booming population leans almost entirely on the Indus — and is sliding toward absolute scarcity.", source: "Indus basin & groundwater", challenge: "Silting reservoirs, leaky canals and little storage leave the country dangerously exposed to a single river system.", orgs: [{ name: "WaterAid Pakistan", what: "rural & urban water" }, { name: "Indus Earth Trust", what: "coastal water harvesting" }] },
  { key: "IR", name: "Iran", region: "Middle East", stress: 4, stat: "sinking", statLbl: "Plains across Iran are dropping as the aquifers beneath them are pumped dry.", source: "Dams & deep groundwater", challenge: "Decades of dam-building and over-extraction have drained reserves; land subsidence and dust storms now follow the falling water table.", orgs: [{ name: "Local WASH & NGO efforts", what: "community water programmes" }] },
  { key: "SA", name: "Saudi Arabia", region: "Gulf", stress: 4, stat: "~0", statLbl: "Almost no renewable fresh water — among the most water-scarce nations on the planet.", source: "Desalination & fossil aquifers", challenge: "Drinking the sea at enormous energy cost while ancient, non-renewable aquifers are spent on agriculture.", orgs: [{ name: "Regional water charities", what: "WASH across the Gulf & MENA" }] },
  { key: "CN", name: "China", region: "East Asia", stress: 3, stat: "north/south", statLbl: "Most people live in the south; much of the water sits in the north — so China pipes rivers across the country.", source: "Rivers, mega-transfers & groundwater", challenge: "The North China Plain aquifer is among the most depleted on Earth, propping up farms and megacities.", orgs: [{ name: "charity: water — partners", what: "rural water projects" }] },
  { key: "ZA", name: "South Africa", region: "Southern Africa", stress: 3, stat: "Day Zero", statLbl: "In 2018, Cape Town counted publicly toward the day its taps would be switched off.", source: "Reservoirs & rivers", challenge: "Drought plus rapid growth nearly emptied a major city’s dams — a dress rehearsal the whole world watched.", orgs: [{ name: "Gift of the Givers", what: "drought & water relief" }, { name: "WaterAid", what: "WASH, Southern Africa" }] },
  { key: "MX", name: "Mexico", region: "Latin America", stress: 3, stat: "50 cm/yr", statLbl: "Mexico City sinks up to half a metre a year as it pumps the aquifer beneath a drained lakebed.", source: "Aquifers & distant reservoirs", challenge: "A megacity loses roughly 40% of its water to leaks while drawing more than the ground can give.", orgs: [{ name: "Isla Urbana", what: "rainwater harvesting" }, { name: "Cántaro Azul", what: "rural safe water" }] },
  { key: "US", name: "United States", region: "North America", stress: 3, stat: "Colorado", statLbl: "The over-allocated Colorado River often no longer reaches the sea — and AI data centres are arriving in its driest basins.", source: "Rivers, reservoirs & groundwater", challenge: "Southwest mega-drought collides with booming, thirsty computing — wealth is no immunity from scarcity.", orgs: [{ name: "DigDeep", what: "water access in the US" }, { name: "Water.org", what: "global & US access" }] },
  { key: "ET", name: "Ethiopia", region: "East Africa", stress: 3, stat: "distance", statLbl: "For millions, the barrier isn’t scarcity but distance — hours walked for water that may not be safe.", source: "Rivers, springs & boreholes", challenge: "Real progress meets vast rural distances and swinging rains; the access frontier is the last mile.", orgs: [{ name: "charity: water", what: "wells & springs" }, { name: "WaterAid", what: "rural WASH" }] },
];

/* ---------------------------------------------------------------- states -- */

export interface StateRow {
  /** Tile abbreviation shown on the cartogram. */
  ab: string;
  name: string;
  /** Cartogram grid position: CSS grid column (1–9)… */
  c: number;
  /** …and grid row. */
  r: number;
  region: string;
  stress: StressLevel;
  source: string;
  /** Contaminant chips; the cartogram tile shows min(4, cont.length) dots. */
  cont: string[];
  note: string;
}

/** STATES — the 25 Indian states/UTs on the cartogram (grid-positioned). */
export const states: StateRow[] = [
  { ab: "LA", name: "Ladakh", c: 5, r: 1, region: "Trans-Himalaya", stress: 1, source: "Glacial melt & springs", cont: ["Sediment", "Seasonal scarcity"], note: "Springsheds and glacier melt feed most villages — recharge is climate-fragile." },
  { ab: "JK", name: "Jammu & Kashmir", c: 4, r: 1, region: "North", stress: 1, source: "Rivers & springs", cont: ["Turbidity", "Bacterial"], note: "Surface-water rich, but treatment gaps drive monsoon contamination spikes." },
  { ab: "HP", name: "Himachal Pradesh", c: 4, r: 2, region: "Hills", stress: 0, source: "Himalayan rivers & springs", cont: ["Turbidity"], note: "Among India’s most water-secure states; gravity schemes serve hill hamlets." },
  { ab: "PB", name: "Punjab", c: 3, r: 2, region: "North-west", stress: 4, source: "Groundwater (tubewells)", cont: ["Uranium", "Nitrate", "Pesticides"], note: "Paddy-wheat farming has crashed the water table; CGWB 2024 found ~62% of post-monsoon samples with dangerously high uranium — the worst in India — alongside nitrate." },
  { ab: "UK", name: "Uttarakhand", c: 5, r: 2, region: "Hills", stress: 1, source: "Himalayan rivers & springs", cont: ["Turbidity", "Drying springs"], note: "Thousands of springs are drying — the source for most mountain villages." },
  { ab: "HR", name: "Haryana", c: 3, r: 3, region: "North-west", stress: 4, source: "Groundwater & canals", cont: ["Uranium", "Nitrate", "Fluoride", "Salinity"], note: "Severely over-exploited blocks ring Delhi; CGWB 2024 flags 40–50% of samples with high uranium. Rainwater harvesting is mandated on paper, not enforced." },
  { ab: "DL", name: "Delhi", c: 4, r: 3, region: "Capital", stress: 4, source: "Yamuna, Ganga canal, groundwater", cont: ["Ammonia", "Sewage", "Uranium", "Lead"], note: "Demand far outruns the Yamuna’s safe yield; ammonia spikes shut treatment plants, and CGWB 2024 records Delhi’s highest lead levels and rising uranium." },
  { ab: "RJ", name: "Rajasthan", c: 3, r: 4, region: "West (arid)", stress: 4, source: "Groundwater & tankers", cont: ["Fluoride", "Uranium", "Salinity", "Nitrate"], note: "India’s driest large state; high fluoride causes skeletal fluorosis and CGWB 2024 ranks it India’s top uranium hotspot — test before drinking any new borewell." },
  { ab: "UP", name: "Uttar Pradesh", c: 5, r: 3, region: "Gangetic plain", stress: 3, source: "Ganga basin & groundwater", cont: ["Arsenic", "Fluoride", "Nitrate"], note: "Arsenic belts along the Ganga affect millions; demand piped surface water in mapped blocks." },
  { ab: "BR", name: "Bihar", c: 6, r: 3, region: "Gangetic plain", stress: 3, source: "Groundwater & rivers", cont: ["Arsenic", "Iron", "Fluoride"], note: "Among the worst arsenic exposure in India; shallow hand-pumps are the risk." },
  { ab: "AR", name: "Arunachal", c: 9, r: 2, region: "North-east", stress: 0, source: "Rain-fed rivers & springs", cont: ["Turbidity"], note: "Abundant rainfall; the challenge is reaching remote hamlets, not supply." },
  { ab: "GJ", name: "Gujarat", c: 2, r: 5, region: "West", stress: 3, source: "Narmada canal & groundwater", cont: ["Salinity", "Fluoride", "Nitrate"], note: "Coastal aquifers are turning saline as the sea intrudes over-pumped wells." },
  { ab: "MP", name: "Madhya Pradesh", c: 4, r: 4, region: "Central", stress: 2, source: "Rivers, reservoirs & groundwater", cont: ["Fluoride", "Nitrate", "Sewage (urban)"], note: "Indore — India’s 'cleanest city' — saw sewage seep into a drinking line in Dec 2025, killing at least 15. Clean ≠ safe water." },
  { ab: "JH", name: "Jharkhand", c: 6, r: 4, region: "East", stress: 1, source: "Rivers & groundwater", cont: ["Iron", "Fluoride"], note: "Water is available but iron and fluoride are common; source treatment is patchy." },
  { ab: "WB", name: "West Bengal", c: 7, r: 4, region: "East", stress: 3, source: "Groundwater & rivers", cont: ["Arsenic", "Iron", "Salinity"], note: "The world’s most-studied arsenic crisis sits here — mapped for decades, safe piped water still lags." },
  { ab: "AS", name: "Assam", c: 8, r: 3, region: "North-east", stress: 1, source: "Brahmaputra basin & groundwater", cont: ["Arsenic", "Iron", "Fluoride"], note: "Water-abundant yet chemically contaminated — arsenic and iron in shallow tubewells." },
  { ab: "MH", name: "Maharashtra", c: 3, r: 5, region: "West", stress: 3, source: "Dams & reservoirs", cont: ["Nitrate", "Fluoride", "Turbidity"], note: "Marathwada’s recurring drought drives tanker dependence while cane farming drinks the dams." },
  { ab: "CG", name: "Chhattisgarh", c: 5, r: 4, region: "Central", stress: 1, source: "Rivers & groundwater", cont: ["Iron", "Fluoride"], note: "Relatively water-secure; fluoride pockets need point-of-use removal." },
  { ab: "OD", name: "Odisha", c: 5, r: 5, region: "East coast", stress: 1, source: "Rivers & groundwater", cont: ["Iron", "Salinity (coastal)", "Fluoride"], note: "Cyclone surge salts coastal wells; iron is the everyday issue." },
  { ab: "TG", name: "Telangana", c: 4, r: 5, region: "South (Deccan)", stress: 3, source: "Reservoirs & groundwater", cont: ["Fluoride", "Nitrate"], note: "Hard Deccan rock means deep, fast-falling borewells and high fluoride." },
  { ab: "GA", name: "Goa", c: 3, r: 6, region: "West coast", stress: 1, source: "Rivers & reservoirs", cont: ["Salinity (coastal)", "Bacterial"], note: "Surface-water rich; tourism load and saline intrusion stress coastal supply in summer." },
  { ab: "KA", name: "Karnataka", c: 4, r: 6, region: "South", stress: 3, source: "Reservoirs & groundwater", cont: ["Nitrate", "Fluoride", "Hardness"], note: "Bengaluru’s borewells run deep and dry while it pumps Cauvery water uphill." },
  { ab: "AP", name: "Andhra Pradesh", c: 5, r: 6, region: "South-east coast", stress: 2, source: "Rivers & groundwater", cont: ["Fluoride", "Salinity", "Nitrate"], note: "Fluoride belts (the Nalgonda legacy) and coastal salinity; defluoridation at source is the promise." },
  { ab: "KL", name: "Kerala", c: 3, r: 7, region: "South-west coast", stress: 1, source: "Rivers & high rainfall", cont: ["Bacterial", "Iron", "Salinity (coastal)"], note: "India’s wettest state still faces summer scarcity and bacterial contamination — storage and treatment, not rainfall, are the gap." },
  { ab: "TN", name: "Tamil Nadu", c: 4, r: 7, region: "South", stress: 3, source: "Reservoirs & groundwater", cont: ["Salinity", "Fluoride", "Nitrate"], note: "Chennai hit 'Day Zero' in 2019 when its reservoirs ran dry; rainwater harvesting has been law here since 2003." },
];

/* ------------------------------------------------------------ freshwater -- */

export interface FreshwaterRow {
  name: string;
  /** Renewable freshwater, km³/yr. */
  v: number;
}

/**
 * FRESHWATER — renewable freshwater by country, km³/yr (top 10).
 * NOTE for the section porter (approved data-integrity fix): the caption's
 * citation badge must read
 *   data-src="FAO AQUASTAT — total renewable water resources by country (2020).
 *   (The World Bank's ER.H2O.INTR.K3 series covers internal renewable
 *   resources only — a smaller measure.)"
 *   data-url="https://data.apps.fao.org/aquastat/"
 * (the prototype credits World Bank ER.H2O.INTR.K3, but these values are
 * TOTAL renewable resources). Plotted values and visible caption unchanged.
 */
export const freshwater: FreshwaterRow[] = [
  { name: "Brazil", v: 8233 }, { name: "Russia", v: 4508 }, { name: "United States", v: 3069 },
  { name: "Canada", v: 2902 }, { name: "China", v: 2840 }, { name: "Colombia", v: 2132 },
  { name: "Indonesia", v: 2019 }, { name: "India", v: 1911 }, { name: "Peru", v: 1880 }, { name: "DR Congo", v: 1283 },
];

/* ---------------------------------------------------------- constitution -- */

/** [country name, year the right to water was first recognised]. */
export type ConstitutionEntry = [string, number];

export interface ConstitutionRegion {
  region: string;
  /** Count of countries in this region (matches list.length). */
  n: number;
  list: ConstitutionEntry[];
}

/**
 * CONSTITUTION31 — the 31 countries that EXPLICITLY name a right to water in
 * their constitution — Human Right 2 Water, 'Constitutional Review' policy
 * brief (16 Dec 2024), Table 1, with year first recognised.
 */
export const constitution31: ConstitutionRegion[] = [
  { region: "Africa", n: 15, list: [["Ethiopia", 1994], ["Uganda", 1995], ["Gambia", 1996], ["DR Congo", 2006], ["Kenya", 2010], ["Niger", 2010], ["Morocco", 2011], ["Somalia", 2012], ["Zimbabwe", 2013], ["Egypt", 2014], ["Burkina Faso", 2015], ["Libya", 2016], ["Algeria", 2020], ["Tunisia", 2022], ["Mali", 2023]] },
  { region: "The Americas", n: 11, list: [["Guatemala", 1985], ["Peru", 1993], ["Costa Rica", 1994], ["Venezuela", 1999], ["Uruguay", 2004], ["Ecuador", 2008], ["Bolivia", 2008], ["Dominican Republic", 2010], ["Mexico", 2012], ["Honduras", 2013], ["Cuba", 2019]] },
  { region: "Asia-Pacific", n: 4, list: [["Maldives", 2008], ["Fiji", 2013], ["Nepal", 2015], ["Thailand", 2017]] },
  { region: "Europe", n: 1, list: [["Slovenia", 2016]] },
];

/** CONSTITUTION_NOTE — the caption under the constitution-chips widget. */
export const constitutionNote =
  "Explicit constitutional recognition per Human Right 2 Water, 'Constitutional Review' (16 Dec 2024), which reviewed 198 states and counts 31 (15.65%), with the year each first recognised it. Methodologies differ: South Africa’s 1996 Constitution (s.27) is the landmark case most reviews cite first, and Amnesty International counts 50+ states that recognise the right implicitly or through their courts.";

/* --------------------------------------------------------------- abstain -- */

export interface AbstainGroup {
  group: string;
  list: string[];
}

/**
 * ABSTAIN41 — the 41 who abstained on UNGA Res 64/292 (28 July 2010) — none
 * voted against. UN recorded vote, press release GA/10967. Grouped for
 * readability. (Group header renders as `group + " · " + list.length`.)
 */
export const abstain41: AbstainGroup[] = [
  { group: "Wealthy democracies who called it 'premature'", list: ["United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Japan", "Israel", "South Korea", "Austria", "Netherlands", "Sweden", "Denmark", "Ireland", "Greece", "Iceland", "Luxembourg"] },
  { group: "Central & Eastern Europe · Eurasia", list: ["Poland", "Czech Republic", "Slovakia", "Bulgaria", "Romania", "Lithuania", "Latvia", "Estonia", "Cyprus", "Malta", "Croatia", "Bosnia & Herzegovina", "Ukraine", "Armenia", "Moldova", "Turkey", "Kazakhstan"] },
  { group: "Others", list: ["Botswana", "Lesotho", "Zambia", "Kenya", "Ethiopia", "Tanzania", "Trinidad & Tobago", "Guyana"] },
];

/** ABSTAIN_NOTE — the caption under the abstainers-chips widget. */
export const abstainNote =
  "Recorded vote on UN General Assembly Resolution 64/292, 28 July 2010: 122 in favour, 0 against, 41 abstentions (UN press release GA/10967). The abstainers were overwhelmingly high-income states arguing the right was legally 'premature' or undefined — the United States among them — and all later accepted it. A telling detail: Kenya and Ethiopia abstained here yet already named water in their own constitutions.";

/* ----------------------------------------------------------------- reach -- */

export interface ReachItem {
  place: string;
  what: string;
  /** Citation text for the `.cite` badge. */
  src: string;
}

/** REACH — real, named failures of 'the reach of it' — connect the numbers to people. */
export const reach: ReachItem[] = [
  { place: "Flint, Michigan · 2014", what: "a cost-cutting source switch let lead leach into the taps of ~100,000 residents — up to 9,000 of them children — while officials insisted it was safe.", src: "NRDC; U.S. EPA — Flint lead crisis (2014–)." },
  { place: "Jackson, Mississippi · 2022", what: "the main treatment plant failed and 150,000 people lost safe running water for weeks.", src: "Food & Water Watch; contemporaneous reporting, 2022." },
  { place: "Detroit · 2014", what: "mass shut-offs cut water to thousands who couldn’t pay; a UN Special Rapporteur called it a human-rights violation.", src: "UN OHCHR Special Rapporteur; NRDC, 2014." },
  { place: "Every day, everywhere", what: "women and girls spend a combined ~200 million hours walking to collect water — time subtracted from school, work and rest.", src: "UNICEF, 2016." },
];

/* --------------------------------------------------------------- bottled -- */

export interface BottledEra {
  yr: string;
  t: string;
  d: string;
}

/** BOTTLED — the bottled-water timeline. */
export const bottled: BottledEra[] = [
  { yr: "1789", t: "A nobleman’s cure", d: "A French marquis drinks from the Sainte-Catherine spring at Évian and finds it soothes his kidney stones. Water becomes a remedy for the rich." },
  { yr: "1826", t: "The first bottling", d: "Évian opens a bottling house; spring water is sold in earthenware jugs. Water quietly becomes a product." },
  { yr: "1863", t: "Perrier is born", d: "The Vergèze spring is commercialised; Dr Louis Perrier runs the spa there, and in 1903 the Englishman St-John Harmsworth buys it, gives it the doctor’s name, and designs the little green bottle that becomes an icon." },
  { yr: "1970s", t: "Water becomes a lifestyle", d: "Perrier’s US campaign sells water as status — 'Earth’s First Soft Drink.' A $500-million market for bottled water appears almost overnight." },
  { yr: "1992", t: "The giants move in", d: "Nestlé buys Perrier; Coca-Cola (Dasani) and Pepsi (Aquafina) soon bottle filtered tap water. A human right, resold." },
  { yr: "Today", t: "A $300-billion thirst", d: "Bottled water now outsells soda in the US and is a ~$300-billion global market — much of it drawn from springs and aquifers, some in water-stressed ground." },
];

/* ------------------------------------------------------------- polluters -- */

export interface Polluter {
  /** The big display figure (e.g. "#1", "metals", "80%+"). */
  big: string;
  /** CSS colour token for the big figure, e.g. "var(--s3)". */
  color: string;
  name: string;
  who: string;
  detail: string;
  /** Citation text for the `.cite` badge. */
  src: string;
}

/** POLLUTERS — the three big water polluters. */
export const polluters: Polluter[] = [
  { big: "#1", color: "var(--s3)", name: "Agriculture", who: "Fertiliser & manure runoff", detail: "The single largest source of water pollution worldwide. Nitrate and phosphorus wash off fields into rivers and groundwater, feeding algal blooms and dead zones that choke the oxygen out of the water.", src: "FAO / UNEP — agriculture is the leading source of water pollution globally; nutrient runoff is the primary driver of eutrophication and aquatic dead zones." },
  { big: "metals", color: "var(--s2)", name: "Industry", who: "Chemicals, dyes, mining", detail: "Tanneries, textiles, mining and manufacturing discharge heavy metals and chemicals — often untreated where enforcement is weak or absent.", src: "UN World Water Development Report; Central Pollution Control Board (India) — untreated industrial effluent as a major contamination pathway." },
  { big: "80%+", color: "var(--s4)", name: "Sewage", who: "Untreated human waste", detail: "Globally, more than 80% of all wastewater flows back into the environment untreated — the exact failure that killed people in Indore.", src: "UN World Water Development Report (UNESCO / UN-Water) — over 80% of the world’s wastewater is released without treatment." },
];

/* --------------------------------------------------------------- heading -- */

export interface HeadingItem {
  tag: string;
  place: string;
  detail: string;
  /** Citation text for the `.cite` badge. */
  src: string;
}

/** HEADING — "where this is heading" cards. */
export const heading: HeadingItem[] = [
  { tag: "2019 · India", place: "Chennai’s Day Zero", detail: "Four reservoirs ran dry; a megacity of millions queued behind water tankers.", src: "Contemporaneous reporting; Tamil Nadu Water Resources Dept — Chennai’s 2019 reservoir crisis." },
  { tag: "2018 · South Africa", place: "Cape Town’s countdown", detail: "A global city publicly counted down to the day the taps would be switched off.", src: "City of Cape Town — 2018 'Day Zero' drought response and public countdown." },
  { tag: "Now · sinking cities", place: "Jakarta · Mexico City · Tehran", detail: "Whole cities are sinking as the aquifers beneath them are pumped dry.", src: "Peer-reviewed subsidence studies and reporting on groundwater over-extraction (Jakarta, Mexico City, Tehran)." },
  { tag: "2030 · projection", place: "A 40% shortfall", detail: "Global water demand is projected to outstrip reliable supply by roughly 40%.", src: "2030 Water Resources Group / UN — global water demand projected ~40% above reliable supply by 2030." },
];

/* ------------------------------------------------------------ footprints -- */

export type FootprintTone = "deep" | "water" | "clay";

export interface Footprint {
  label: string;
  sub: string;
  /** Litres — drives the bar width against footprintScaleMax. */
  val: number;
  /** Display string shown at the bar's right edge. */
  disp: string;
  tone: FootprintTone;
}

/** FOOTPRINTS — the per-serving water-footprint bars (dark section). */
export const footprints: Footprint[] = [
  { label: "A year of daily AI prompts", sub: "~50 a day · Google’s 0.26 mL/prompt", val: 5, disp: "~5 L", tone: "deep" },
  { label: "A ten-minute shower", sub: "one shower", val: 100, disp: "100 L", tone: "deep" },
  { label: "A glass of beer", sub: "250 ml", val: 75, disp: "75 L", tone: "water" },
  { label: "A cup of coffee", sub: "one cup", val: 140, disp: "140 L", tone: "water" },
  { label: "A glass of wine", sub: "250 ml", val: 240, disp: "240 L", tone: "water" },
  { label: "One hamburger", sub: "150 g of beef", val: 2400, disp: "2,400 L", tone: "clay" },
  { label: "A cotton t-shirt", sub: "one garment", val: 2700, disp: "2,700 L", tone: "clay" },
];

/* ------------------------------------------------------------- solutions -- */

export interface Solution {
  /** Display index, "01"–"04". */
  n: string;
  title: string;
  body: string;
  /** Short proof line shown inline. */
  proofShort: string;
  /** Full proof text (citation popover). */
  proof: string;
  proofUrl: string;
  /** Organisation to act through. */
  org: string;
  orgUrl: string;
}

/** SOLUTIONS — the four "what actually works" cards. */
export const solutions: Solution[] = [
  { n: "01", title: "Treat the water at the source", body: "Dilute chlorine added where people collect water cuts child deaths by roughly a quarter to a third — and at about $27–66 per healthy year of life saved, it is one of the most cost-effective health interventions known.", proofShort: "Kremer, Luby et al. (2023) · 52-RCT meta-analysis", proof: "Kremer, Luby, Maertens, Tan & Więcek (2023), 'Water Treatment and Child Mortality: A Meta-analysis and Cost-effectiveness Analysis' (Univ. of Chicago / NBER w30835): chlorination reduces under-5 mortality ~25–30%; ~$27–66 per DALY averted.", proofUrl: "https://www.nber.org/papers/w30835", org: "Evidence Action — Dispensers for Safe Water", orgUrl: "https://www.evidenceaction.org/dispensers-for-safe-water/" },
  { n: "02", title: "Put back what we pump out", body: "Managed aquifer recharge and rainwater harvesting return water to over-drawn ground. In Rajasthan, reviving traditional johads brought dry wells — and whole rivers — back to life.", proofShort: "IWMI recharge reviews · Tarun Bharat Sangh", proof: "International Water Management Institute — managed aquifer recharge evidence; Central Ground Water Board (India). Tarun Bharat Sangh’s johad revival recharged aquifers across Alwar, Rajasthan, reviving seasonal rivers.", proofUrl: "https://www.iwmi.cgiar.org/", org: "Tarun Bharat Sangh — johad revival", orgUrl: "https://www.tarunbharatsangh.in/" },
  { n: "03", title: "Grow less thirsty", body: "Farming takes about 70% of the fresh water humans withdraw. Drip irrigation and shifting off water-hungry crops — paddy in Punjab, cane in Maharashtra — can cut farm water use by a third or more.", proofShort: "FAO / UN-Water · NITI Aayog", proof: "FAO AQUASTAT / UN-Water — agriculture is ~70% of global freshwater withdrawals; NITI Aayog and state studies on crop diversification and micro-irrigation.", proofUrl: "https://www.fao.org/aquastat/en/", org: "WOTR — watershed & drip programmes", orgUrl: "https://wotr.org/" },
  { n: "04", title: "Make the paper enforceable", body: "Rights work when they are written down and audited. South Africa’s courts enforce a daily minimum; the EU now makes large data centres report their water. Demand that bottlers and data centres disclose where — and what — they draw.", proofShort: "S. Africa Water Services Act · EU Dir. 2023/1791", proof: "South Africa Water Services Act (1997) & Constitution s.27; EU Energy Efficiency Directive 2023/1791 — mandatory water reporting for data centres from 500 kW.", proofUrl: "https://eur-lex.europa.eu/eli/dir/2023/1791/oj", org: "Sanitation and Water for All", orgUrl: "https://www.sanitationandwaterforall.org/" },
];

/* ----------------------------------------------------------------- aware -- */

export interface AwareLink {
  t: string;
  u: string;
}

/** AWARE.learn — "learn" links. */
export const awareLearn: AwareLink[] = [
  { t: "WHO / UNICEF JMP — the global scoreboard", u: "https://washdata.org" },
  { t: "WRI Aqueduct — water-risk atlas", u: "https://www.wri.org/aqueduct" },
  { t: "Water Footprint Network — your own litres", u: "https://www.waterfootprint.org" },
  { t: "CGWB — your block’s groundwater map", u: "https://cgwb.gov.in" },
];

/** AWARE.give — "give" links. */
export const awareGive: AwareLink[] = [
  { t: "Evidence Action — Dispensers for Safe Water (GiveWell top charity)", u: "https://www.evidenceaction.org/dispensers-for-safe-water/" },
  { t: "WaterAid India", u: "https://www.wateraidindia.in" },
  { t: "Water.org — WaterCredit", u: "https://water.org" },
];

/* --------------------------------------------------------------- sources -- */

/** SOURCES — the numbered end-of-essay source list (15 entries). */
export const sources: string[] = [
  "WHO / UNICEF Joint Monitoring Programme (JMP), Drinking Water 2023 — 2.2 billion lack safely managed drinking water.",
  "UN General Assembly Resolution 64/292 (28 July 2010) — human right to water and sanitation, adopted 122 in favour, 0 against, 41 abstentions (incl. the United States, United Kingdom, Canada, Australia, Japan); UN press release GA/10967.",
  "Human Right 2 Water, 'Constitutional Review of the Human Right to Water' (16 Dec 2024) — 31 countries (15.65% of 198 reviewed) explicitly name the right to water in their constitutions, listed with the year each first did so.",
  "World Resources Institute, Aqueduct Water Risk Atlas — country-level baseline water stress; ~half of humanity faces severe scarcity at least one month a year.",
  "NITI Aayog, Composite Water Management Index (2018) — 600 million Indians under high-to-extreme water stress.",
  "Central Ground Water Board (CGWB) — Dynamic Groundwater Resources of India, and Annual Groundwater Quality Report 2024 (15,259 samples, May 2023): nitrate above limit in ~20% of samples / 440 districts, fluoride 9.0%, arsenic 3.6% (Ganga–Brahmaputra plains), uranium 6.6% (Rajasthan, Punjab, Haryana, Delhi hotspots), iron 13.2%.",
  "NITI Aayog, Composite Water Management Index (2018) — ~200,000 deaths a year from inadequate access to safe water. Waterborne diseases affect tens of millions of Indians annually (MoHFW / NCDC-IDSP; WaterAid) — the 30M figure is an oft-cited estimate.",
  "2025 Indore drinking-water contamination — municipal sewage ingress, Bhagirathpura; ≥15 deaths, ~2,000 ill (district administration; reporting, Dec 2025–Jan 2026).",
  "Bottled-water history — Évian (bottling from 1826), Perrier (brand from 1863; sold by Dr Louis Perrier, 1894); Nestlé acquired Perrier 1992; global market ≈ US$300 bn (industry histories; BCC Research; Fast Company, 2023).",
  "Water pollution — agriculture is the leading source and uses ~70% of withdrawals (FAO/UN Water); >80% of the world’s wastewater returns untreated (UN WWDR).",
  "Per-serving water footprints — Water Footprint Network; Mekonnen & Hoekstra — beer ≈ 75 L/glass, coffee ≈ 140 L/cup, wine ≈ 240 L/glass, one hamburger ≈ 2,400 L (150 g beef), a cotton t-shirt ≈ 2,700 L. A year of daily AI prompts ≈ ~5 L (Google, 2025, 0.26 mL/prompt).",
  "Data-centre water — Brookings (2024): a typical data centre uses ~300,000 US gal/day (~1.1 million L), about 1,000 households; a large one up to ~5 million US gal/day (~19 million L), a town of up to 50,000. IEA, Energy & AI (2025): a 100-MW facility ~2 million L/day and more power than ~75,000 homes; global DC water ~560 bn L (2023) → ~1,200 bn L by 2030 (more than London drinks in a year).",
  "Li, Yang, Islam & Ren, 'Making AI Less Thirsty' (UC Riverside) — withdrawal vs consumption; one firm’s DCs withdrew 29 bn L, evaporated 23 bn L (≈80% potable) in 2023.",
  "Home reverse-osmosis systems discharge ~3–4 L to drain per 1 L purified (traditional units; 1:1–2:1 on newer models).",
  "Organisation links are starting points for your own research — please verify each before donating.",
];

/* ---------------------------------------------- defaults (prototype state) -- */
// Prototype: state = { selCountry:"IN", selState:"PB", selNeer:"MP", … }.
// (drawer / cite state is owned by the page shell + shared essay engine.)

/** Default country panel selection (renderVals → selC*). */
export const defaultCountry = "IN";
/** Default cartogram state selection (renderVals → selS*). */
export const defaultState = "PB";
/** Default neer-mini / state-dropdown selection (renderVals → selN*). */
export const defaultNeer = "MP";

/* --------------------------------------------- renderVals() derivations -- */
// Each helper below reproduces exactly what the prototype's renderVals() (or
// the …El() builders it calls) computed for the templates.

/** `stressLabel(k)` — label for a stress level; "" when out of range. */
export function stressLabel(k: number): string {
  return stress[k] ?? "";
}

/**
 * Stress colour token: the prototype builds "var(--s" + stress + ")" for the
 * country stat colour (selCStatColor), state dots (selSStressColor /
 * selNStressColor) and every cartogram tile background.
 */
export function stressColor(k: number): string {
  return `var(--s${k})`;
}

/** `ct(k)` — country by key, falling back to the first row (Yemen). */
export function countryByKey(key: string): Country {
  return countries.find((c) => c.key === key) ?? countries[0]!;
}

/** `st(ab)` — state by abbreviation, falling back to the first row (Ladakh). */
export function stateByAb(ab: string): StateRow {
  return states.find((s) => s.ab === ab) ?? states[0]!;
}

/**
 * Two-digit rank "01", "02", … — used for the country-list row numbers
 * (String(i+1).padStart(2,"0")) and the numbered sources list.
 */
export function rank(i: number): string {
  return String(i + 1).padStart(2, "0");
}

/**
 * renderVals().sources — SOURCES mapped to `{ n: "01"…"15", t }` rows for the
 * end-of-essay list.
 */
export const sourcesNumbered: { n: string; t: string }[] = sources.map(
  (t, i) => ({ n: rank(i), t }),
);

/**
 * renderVals().stateOptions — STATES sorted alphabetically by name (via
 * localeCompare) for the neer <select> dropdown, as `{ ab, name }`.
 */
export const stateOptions: { ab: string; name: string }[] = states
  .slice()
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((x) => ({ ab: x.ab, name: x.name }));

/**
 * renderVals().selSRegion / selNRegion — detail-panel region line:
 * `region + " · " + stressLabel(stress)` (e.g. "North-west · Over-exploited").
 */
export function regionStressLine(row: { region: string; stress: number }): string {
  return `${row.region} · ${stressLabel(row.stress)}`;
}

/**
 * renderVals().selSCont — the state panel's contaminants line:
 * `cont.join(", ")`. (The neer panel instead maps cont to chips:
 * selNContChips = cont.map(x => ({ label: x })).)
 */
export function contLine(row: { cont: string[] }): string {
  return row.cont.join(", ");
}

/**
 * freshwaterEl(): bar width % = Math.max(3, v / max * 100), where max is the
 * FIRST row's value (Brazil, 8233). First bar is var(--water-deep), the rest
 * var(--water). Value column renders `v.toLocaleString("en-US") + " km³"`.
 */
export const freshwaterMax: number = freshwater[0]!.v;
export function freshwaterPct(v: number): number {
  return Math.max(3, (v / freshwaterMax) * 100);
}
export function freshwaterDisp(v: number): string {
  return v.toLocaleString("en-US") + " km³";
}

/**
 * barsEl(FOOTPRINTS, 2700, …): bar width % = Math.max(1.5, val / 2700 * 100);
 * bars animate from width 0 to pct on reveal (transition:
 * "width 1.2s cubic-bezier(.2,.7,.2,1)"). Rendered on a DARK section
 * (dark=true): track oklch(1 0 0 /0.1), row rule oklch(1 0 0 /0.12), label
 * var(--paper), sub oklch(0.72 0.02 240), value var(--water-light).
 */
export const footprintScaleMax = 2700;
export function footprintPct(val: number): number {
  return Math.max(1.5, (val / footprintScaleMax) * 100);
}
/** barsEl tone → colour token: clay→--clay, deep→--water-deep, else --water. */
export function footprintTone(tone: FootprintTone): string {
  return tone === "clay" ? "var(--clay)" : tone === "deep" ? "var(--water-deep)" : "var(--water)";
}

/**
 * constitutionEl() chip year: typographic apostrophe + last two digits of the
 * year — e.g. 1994 → "’94" ("’" + String(year).slice(2)).
 */
export function constitutionYearShort(year: number): string {
  return "’" + String(year).slice(2);
}

/**
 * Country-list row title (countriesEl): name + (deepdive ? " · deep dive ↓" : "").
 * Deep-dive rows tint the name var(--water-light) instead of var(--paper).
 */
export function countryTitle(c: Country): string {
  return c.name + (c.deepdive ? " · deep dive ↓" : "");
}

/* ------------------------------------------------------------ earth grid -- */
// buildEarth()/fillEarth() constants, for whichever section owns #wop_earth:
// 1000 dots total; on reveal (after a 420 ms delay) the LAST 25 dots are
// painted from the end backwards — 1 clay (scale 1.35, accessible surface
// freshwater), then 7 --water (scale 1.08, fresh groundwater), then 17
// --water-light (locked in ice); the other ~975 stay var(--paper-edge)
// (saltwater). Dot transition delay is randomised 0–0.6 s.
export const earthGrid = {
  total: 1000,
  delayMs: 420,
  fills: [
    { count: 1, bg: "var(--clay)", scale: 1.35 },
    { count: 7, bg: "var(--water)", scale: 1.08 },
    { count: 17, bg: "var(--water-light)", scale: 1.0 },
  ],
} as const;
