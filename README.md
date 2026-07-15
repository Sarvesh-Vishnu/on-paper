# On Paper — series hub

> Every essential thing is promised on paper — as a right, a law, a mission, a
> master plan. *On Paper* is an essay series about the **distance** between what
> the paper says and what actually reaches a person. India is the centrepiece of
> every essay.

This repository is the **series hub** (the landing page) plus the current live
essay and its companion tool. Built with [Astro](https://astro.build), deployed
to GitHub Pages.

**Live:** https://sarvesh-vishnu.github.io/on-paper/

---

## What's here

| Route | What it is | Status |
|---|---|---|
| `/` | **The hub** — masthead, current-essay spotlight, Volume I index, colophon. | ✅ Native |
| `/water/` | *Water on Paper* — the live essay, 8 chapters. | ✅ Native |
| `/tools/source-to-tap/` | *Source to Tap* — the interactive companion tool. | ✅ Native |

The old `/water-on-paper.html` and `/source-to-tap.html` URLs are kept as
redirect stubs (canonical + OG preserved) so previously shared links still land.

> The **series playbook** (the internal "bible" — five-gate topic filter,
> roadmap, unreleased Volume II candidates) is intentionally **not published**.
> It's a private strategy document; keep it out of `public/` unless you decide
> otherwise.

### All native

Everything is production Astro now. The essay and tool were ported from the
design-handoff `.dc.html` prototypes: every data table is typed data
([`src/data/water.ts`](src/data/water.ts),
[`src/data/source-to-tap.ts`](src/data/source-to-tap.ts)), each essay chapter is
a component in [`src/components/water/`](src/components/water/), and the widgets
(earth grid, bar charts, country/cartogram/Neer selectors, the tool's journey
scroller + compare chart) render as **static SSR HTML** hydrated by small
vanilla-TS `<script>`s — so all the evidence and citations ship crawlable, no
client framework. Shared behavior (scroll reveals, count-ups, the accessible
citation popover, the dark-header swap) lives in
[`src/scripts/essay-engine.ts`](src/scripts/essay-engine.ts); the prototype
runtime is gone.

---

## Develop

```bash
npm install
npm run dev        # http://localhost:4321/on-paper/
npm run build      # → dist/
npm run preview    # serve the production build locally
npm run check      # astro type/diagnostics check
```

## Architecture

- **`src/pages/index.astro`** — the hub, four stacked sections. Layout/type
  styles stay inline on elements so the markup reads 1:1 against the handoff;
  `:hover` / `::selection` / keyframes / paper-grain live in the stylesheet.
- **`src/layouts/Base.astro`** — HTML shell: fonts, meta/OG tags, canonical.
- **`src/styles/global.css`** — design tokens (`oklch`), base styles, the
  `feTurbulence` paper-grain overlay, the `wopUp` entrance keyframes, the
  `prefers-reduced-motion` guard, and the ported hover states.
- **`src/data/volume.ts`** — Volume I as data. Add an essay or flip a status
  here; the index re-renders from it.
- **`src/pages/water.astro`** + **`src/components/water/`** — the essay: a page
  shell (chrome, chapters drawer, JSON-LD) plus one component per chapter.
- **`src/pages/tools/source-to-tap.astro`** — the companion tool.
- **`src/scripts/essay-engine.ts`** + **`src/styles/essay.css`** — shared
  scroll/reveal/count-up engine, accessible citation popover, and the
  essay/tool-only tokens (stress ramp, drawer, focus rings).
- **`src/data/water.ts`**, **`src/data/source-to-tap.ts`** — every figure,
  citation, and route as typed data.
- **`scripts/generate-og.mjs`** — `npm run og`, the share-card generator.
- **`src/styles/fonts.css`** + **`public/fonts/`** — self-hosted font faces.

### Design tokens

Colour is authored in `oklch()`. Warm paper background, ink text, a water-blue
primary accent and a clay secondary accent. Type: Instrument Serif (display),
Spline Sans (body), Spline Sans Mono (labels). Full token table is in the design
handoff and encoded in `src/styles/global.css`.

**Deliberate deviations from the handoff** (WCAG AA small-text contrast):
`--ink-faint` is `0.50` lightness (handoff: `0.56`; was 3.96:1 on `--paper-2`,
now 5.1:1); the "Live" pill background is `--water-deep` (handoff: `--water`;
4.36:1 → 9.9:1); the drop-caption numerals use the deep accents. Prose uses
typographic apostrophes (’) where the handoff export used straight (').

### Share cards / SEO

`npm run og` regenerates the 1200×630 Open Graph images in `public/og/` from
the design tokens ([scripts/generate-og.mjs](scripts/generate-og.mjs); uses the
`sharp` that ships with Astro, Georgia standing in for Instrument Serif). The
PNGs are committed, so CI never runs this. The hub carries JSON-LD
(`CreativeWorkSeries`, built from `src/data/volume.ts` — live essays join it
automatically), the essay carries `Article` and the tool `WebApplication`
JSON-LD, and `public/sitemap.xml` + `robots.txt` cover the three routes.

## Deploy

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds with `withastro/action` and publishes to GitHub Pages.

Because it's a **project page**, `astro.config.mjs` sets `base: '/on-paper/'`.
If you move to a custom domain or a user page (`sarvesh-vishnu.github.io`), set
`base: '/'` and update `site`. A `public/.nojekyll` file keeps GitHub Pages from
stripping Astro's `_astro/` asset directory.

## Next steps

1. Write essays 2–6 (Air is the recommended next build). Each is a new page
   under `src/pages/` + components + a `src/data/<resource>.ts`, reusing the
   shared engine; flip its `status` to `live` in `src/data/volume.ts`.
2. Model essays as an Astro **content collection** as the series grows; switch
   the hand-written sitemap to `@astrojs/sitemap` at the same time.
3. Resolve the tool naming (the essay's embedded widget is "Neer", the
   standalone companion is "Source to Tap") before the next essay ships its own
   tool, so the convention scales.
