// Volume I as data — the essay index and its status live here, not in markup,
// so adding an essay or flipping a status is a one-line change.
//
// Status → affordance mapping (rendered in index.astro):
//   live         → the whole row is a link, with a "Read →" affordance
//   in-progress  → clay "In progress" pill (not a link)
//   coming       → outline "Coming" pill (not a link)
// Only `live` rows link out.

export type Status = 'live' | 'in-progress' | 'coming';
export type Accent = 'water' | 'clay' | 'ink';

interface EssayBase {
  /** Two-digit index, e.g. "01". */
  n: string;
  /** Resource name; the title renders as `{name} on Paper`. */
  name: string;
  /** One-line dek shown under the title. */
  dek: string;
  /** Drives the index-number colour and the italic " on " separator colour. */
  accent: Accent;
}

/**
 * Discriminated on `status`: a `live` essay links out and therefore MUST carry
 * an `href`; a `coming` / `in-progress` essay must NOT. The compiler enforces
 * this, so the render guard can narrow on `status` alone.
 */
export type Essay =
  | (EssayBase & { status: 'live'; href: string })
  | (EssayBase & { status: 'in-progress' | 'coming'; href?: never });

/** Per-accent colours for the index number and the " on " separator. */
export const accentColors: Record<Accent, { index: string; sep: string }> = {
  water: { index: 'var(--water-deep)', sep: 'var(--water-deep)' },
  clay: { index: 'var(--clay-deep)', sep: 'var(--clay)' },
  ink: { index: 'var(--ink-faint)', sep: 'var(--ink-faint)' },
};

export const volumeOne: Essay[] = [
  {
    n: '01',
    name: 'Water',
    status: 'live',
    accent: 'water',
    href: 'water-on-paper.html',
    dek: 'On paper, a human right. In reality: a queue, a tanker, a boil-water notice.',
  },
  {
    n: '02',
    name: 'Air',
    status: 'coming',
    accent: 'ink',
    dek: 'On paper, clean air is a national mission. In reality, a season when the sky turns to smoke.',
  },
  {
    n: '03',
    name: 'Oil',
    status: 'in-progress',
    accent: 'clay',
    dek: 'On paper, a price at the pump. In reality, a dependency priced into everything you eat and buy.',
  },
  {
    n: '04',
    name: 'Grain',
    status: 'coming',
    accent: 'ink',
    dek: 'On paper, the right to food. In reality, the ration that does — or doesn’t — arrive.',
  },
  {
    n: '05',
    name: 'Blood',
    status: 'coming',
    accent: 'ink',
    dek: 'On paper, the right to health. In reality, the distance to the nearest working hospital.',
  },
  {
    n: '06',
    name: 'Ink',
    status: 'coming',
    accent: 'ink',
    dek: 'On paper, education is a fundamental right. In reality, what a child can actually read.',
  },
];
