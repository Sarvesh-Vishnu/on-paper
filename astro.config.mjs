// @ts-check
import { defineConfig } from 'astro/config';

// Project page on GitHub Pages: https://sarvesh-vishnu.github.io/on-paper/
// If you move to a user page (repo named sarvesh-vishnu.github.io) or a custom
// domain, set `base` back to '/' and update `site` accordingly.
export default defineConfig({
  site: 'https://sarvesh-vishnu.github.io',
  base: '/on-paper/',
  trailingSlash: 'ignore',
  build: {
    // Keep the hashed-asset dir name predictable; `.nojekyll` (in public/)
    // stops GitHub Pages/Jekyll from stripping folders that start with "_".
    assets: '_astro',
  },
});
