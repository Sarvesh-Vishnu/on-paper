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
| `/` | **The hub** — masthead, current-essay spotlight, Volume I index, colophon. Rebuilt natively in Astro from the design handoff. | ✅ Native |
| `/water-on-paper.html` | *Water on Paper* — the one live essay. | ⚠️ Prototype, served as-is |
| `/source-to-tap.html` | *Source to Tap* — the interactive companion tool. | ⚠️ Prototype, served as-is |

> The **series playbook** (the internal "bible" — five-gate topic filter,
> roadmap, unreleased Volume II candidates) is intentionally **not published**.
> It's a private strategy document; keep it out of `public/` unless you decide
> otherwise.

### Native vs. prototype

The **hub** is production code: an Astro page built pixel-faithfully from the
design tokens, with Volume I modelled as data ([`src/data/volume.ts`](src/data/volume.ts)).

The **essay and tool** are the original design-handoff prototypes
(`.dc.html` files that render client-side via a bundled `support.js` runtime).
They're served verbatim out of [`public/`](public/) so the hub's links work and
the live essay is actually readable **today**. They are *not* yet ported to
native Astro — that's the recommended next step (see below). Per the handoff, the
`.dc.html` runtime (`support.js`, `doc-page.js`) is **not** ported into the app;
it's shipped only to render those prototype pages.

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

### Design tokens

Colour is authored in `oklch()`. Warm paper background, ink text, a water-blue
primary accent and a clay secondary accent. Type: Instrument Serif (display),
Spline Sans (body), Spline Sans Mono (labels). Full token table is in the design
handoff and encoded in `src/styles/global.css`.

## Deploy

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds with `withastro/action` and publishes to GitHub Pages.

Because it's a **project page**, `astro.config.mjs` sets `base: '/on-paper/'`.
If you move to a custom domain or a user page (`sarvesh-vishnu.github.io`), set
`base: '/'` and update `site`. A `public/.nojekyll` file keeps GitHub Pages from
stripping Astro's `_astro/` asset directory.

## Next steps

1. **Port the Water essay and Source to Tap** to native Astro routes
   (`/water`, `/tools/source-to-tap`) so they drop the client-side prototype
   runtime, gain real `<head>`/SEO, and share the tokens.
2. Add per-page OG images and a `sitemap` + `robots.txt`.
3. Model essays as an Astro **content collection** as the series grows.
