// Generate the Open Graph share images (1200x630 PNG) from the design tokens.
//
//   node scripts/generate-og.mjs
//
// Renders an SVG (drawn from the token palette: paper bg, ruled lines, the
// 100-drop signature, the italic-serif wordmark) at 2x and downsamples for
// crisp text. Georgia stands in for Instrument Serif — it is the design's own
// serif fallback — so generation needs no font download and stays offline.
// Uses the `sharp` that ships with Astro; the PNGs are committed to public/og/
// so the CI build never has to run this.

import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const C = {
  paper: '#f8f5ee',
  paperEdge: '#e1dccf',
  ink: '#23262c',
  inkSoft: '#545860',
  rule: 'rgba(35,38,44,0.14)',
  water: '#3f7ea6',
  waterDeep: '#2c5878',
  clay: '#bd7048',
};

const W = 1200;
const H = 630;
const SCALE = 2; // render 2x, downsample for anti-aliased text

/** The 100-drop signature: index 0 clay, 1-3 water, rest paper-edge. */
function dropGrid(x, y, cell, gap) {
  const dots = [];
  for (let i = 0; i < 100; i++) {
    const col = i % 10;
    const row = Math.floor(i / 10);
    const fill = i === 0 ? C.clay : i < 4 ? C.water : C.paperEdge;
    const cx = x + col * (cell + gap) + cell / 2;
    const cy = y + row * (cell + gap) + cell / 2;
    dots.push(`<circle cx="${cx}" cy="${cy}" r="${cell / 2}" fill="${fill}"/>`);
  }
  return dots.join('\n    ');
}

/** Five faint ruled lines, echoing the masthead. */
function ruledLines() {
  return [0.19, 0.37, 0.54, 0.71, 0.88]
    .map((f) => `<rect x="0" y="${Math.round(H * f)}" width="${W}" height="1" fill="${C.rule}"/>`)
    .join('\n    ');
}

/**
 * @param {object} v
 * @param {string} v.eyebrow  small-caps kicker line
 * @param {Array<{t: string, italic?: boolean, color?: string}>} v.title
 * @param {number} v.titleSize
 * @param {string[]} v.sub  one or two sub lines
 */
function svg(v) {
  const titleSpans = v.title
    .map(
      (p) =>
        `<tspan fill="${p.color ?? C.ink}"${p.italic ? ' font-style="italic"' : ''}>${p.t}</tspan>`,
    )
    .join('');
  const subLines = v.sub
    .map(
      (line, i) =>
        `<text x="72" y="${470 + i * 42}" font-family="Georgia" font-size="29" fill="${C.inkSoft}">${line}</text>`,
    )
    .join('\n    ');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${C.paper}"/>
    ${ruledLines()}
    <text x="72" y="200" font-family="Helvetica Neue, Helvetica, Arial" font-size="21" letter-spacing="5" fill="${C.waterDeep}">${v.eyebrow}</text>
    <text x="66" y="380" font-family="Georgia" font-size="${v.titleSize}" letter-spacing="-2" xml:space="preserve">${titleSpans}</text>
    ${subLines}
    ${dropGrid(800, 160, 26, 10)}
  </svg>`;
}

const VARIANTS = {
  'hub.png': {
    eyebrow: 'AN ESSAY SERIES · INDIA AS THE CENTREPIECE',
    title: [
      { t: 'On', italic: true, color: C.waterDeep },
      { t: ' Paper' },
    ],
    titleSize: 150,
    sub: ['The distance between what the paper says', 'and what actually reaches you.'],
  },
  'water.png': {
    eyebrow: 'ON PAPER · ESSAY ONE OF THE SERIES',
    title: [
      { t: 'Water' },
      { t: ' on ', italic: true, color: C.waterDeep },
      { t: 'Paper' },
    ],
    titleSize: 96,
    sub: ['On paper, a human right. In reality:', 'a queue, a tanker, a boil-water notice.'],
  },
  'source-to-tap.png': {
    eyebrow: 'COMPANION TOOL · WATER ON PAPER',
    title: [
      { t: 'Source' },
      { t: ' to ', italic: true, color: C.waterDeep },
      { t: 'Tap' },
    ],
    titleSize: 96,
    sub: ['The water in your glass didn’t come from nowhere.', 'Trace its route, state by state.'],
  },
};

await mkdir(new URL('../public/og/', import.meta.url), { recursive: true });
for (const [file, variant] of Object.entries(VARIANTS)) {
  const out = new URL(`../public/og/${file}`, import.meta.url).pathname;
  const png = await sharp(Buffer.from(svg(variant)), { density: 72 * SCALE })
    .resize(W, H)
    .png()
    .toBuffer();
  await writeFile(out, png);
  console.log(`wrote ${out} (${png.length} bytes)`);
}
