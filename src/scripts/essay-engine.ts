/* ------------------------------------------------------------------ *
 * Shared scroll/interaction engine for the essay + tool pages.
 * Replicates the .dc prototype's behavior contract:
 *   - [data-reveal] shows when its top passes 92% of the viewport;
 *     [data-count] children start counting on reveal (en-IN grouping,
 *     cubic ease-out, data-dur/-pre/-suf attributes).
 *   - [data-reveal-hook] dispatches a one-shot `essay:reveal` event
 *     (pages use it for the earth grid / footprint bars).
 *   - #wop_prog is a scroll progress bar; the fixed header swaps to
 *     light-on-dark while any [data-wopdark] section straddles y=60.
 *   - .cite buttons get a shared source popover — keyboard/touch
 *     accessible (click/Enter toggles, Escape closes), unlike the
 *     prototype's hover-only tooltip.
 * Reveals use IntersectionObserver instead of the prototype's per-tick
 * getBoundingClientRect sweep; under prefers-reduced-motion everything
 * shows immediately and counters jump straight to their final value.
 * ------------------------------------------------------------------ */

const reduceMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- count-up (prototype countUp(), plus reduced-motion jump) ---- */
function countUp(el: HTMLElement): void {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const to = parseFloat(el.dataset.count || '0');
  const dur = +(el.dataset.dur || 1400);
  const pre = el.dataset.pre || '';
  const suf = el.dataset.suf || '';
  const final = pre + to.toLocaleString('en-IN') + suf;
  if (reduceMotion()) {
    el.textContent = final;
    return;
  }
  const start = performance.now();
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const e = 1 - Math.pow(1 - t, 3);
    el.textContent = pre + Math.round(to * e).toLocaleString('en-IN') + suf;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = final;
  };
  requestAnimationFrame(frame);
}

function show(el: HTMLElement): void {
  if (el.dataset.shown) return;
  el.dataset.shown = '1';
  el.style.opacity = '1';
  el.style.transform = 'none';
  el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
  if (el.dataset.revealHook !== undefined) el.dispatchEvent(new CustomEvent('essay:reveal'));
}

function initReveals(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-hook]');
  if (reduceMotion()) {
    targets.forEach(show);
    return;
  }
  // top < 92% of viewport ≈ rootMargin bottom of -8%.
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '40px 0px -8% 0px', threshold: 0 },
  );
  targets.forEach((el) => io.observe(el));
  // Prototype's safety net: never leave content hidden.
  setTimeout(() => targets.forEach(show), 8000);
}

/* ---- progress bar + dark-section header swap (110ms tick) ---- */
function initChrome(): void {
  const prog = document.getElementById('wop_prog');
  const brand = document.getElementById('wop_brand');
  const menu = document.getElementById('wop_menu');
  const darkSections = Array.from(
    document.querySelectorAll<HTMLElement>('[data-wopdark], [data-stapdark]'),
  );
  let last = 0;
  const tick = () => {
    const doc = document.documentElement;
    const top = window.pageYOffset || doc.scrollTop || 0;
    const max = doc.scrollHeight - window.innerHeight;
    if (prog) prog.style.width = (Math.max(0, Math.min(1, max > 0 ? top / max : 0)) * 100).toFixed(2) + '%';
    let dark = false;
    for (const s of darkSections) {
      const r = s.getBoundingClientRect();
      if (r.top <= 60 && r.bottom >= 60) {
        dark = true;
        break;
      }
    }
    if (brand) brand.style.color = dark ? 'var(--paper)' : 'var(--ink)';
    if (menu) {
      menu.style.color = dark ? 'var(--paper)' : 'var(--ink)';
      menu.style.borderColor = dark ? 'oklch(1 0 0 / 0.3)' : 'var(--rule)';
    }
  };
  const onScroll = () => {
    const now = performance.now();
    if (now - last > 110) {
      last = now;
      requestAnimationFrame(tick);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  tick();
}

/* ---- chapters drawer ---- */
function initDrawer(): void {
  const root = document.getElementById('wop_drawer');
  const scrim = document.getElementById('wop_scrim');
  const nav = document.getElementById('wop_drawer_nav');
  const openBtn = document.getElementById('wop_menu');
  const closeBtn = document.getElementById('wop_drawer_close');
  if (!root || !openBtn) return;
  const setOpen = (open: boolean) => {
    root.classList.toggle('is-open', open);
    openBtn.setAttribute('aria-expanded', String(open));
    if (open) (nav?.querySelector('a') as HTMLElement | null)?.focus();
    else openBtn.focus();
  };
  openBtn.addEventListener('click', () => setOpen(!root.classList.contains('is-open')));
  closeBtn?.addEventListener('click', () => setOpen(false));
  scrim?.addEventListener('click', () => setOpen(false));
  nav?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) setOpen(false);
  });
}

/* ---- citation popover (shared, accessible) ---- */
function initCites(): void {
  const cites = document.querySelectorAll<HTMLElement>('.cite[data-src]');
  if (!cites.length) return;
  const tip = document.createElement('div');
  tip.id = 'wop_cite_tip';
  tip.setAttribute('role', 'tooltip');
  tip.hidden = true;
  document.body.appendChild(tip);
  let current: HTMLElement | null = null;
  let hideT: number | undefined;

  const hide = () => {
    tip.hidden = true;
    current?.setAttribute('aria-expanded', 'false');
    current = null;
  };
  const showFor = (btn: HTMLElement) => {
    window.clearTimeout(hideT);
    current?.setAttribute('aria-expanded', 'false');
    current = btn;
    btn.setAttribute('aria-expanded', 'true');
    const url = btn.dataset.url;
    tip.innerHTML = '';
    const txt = document.createElement('div');
    txt.className = 'cite-tip-text';
    txt.textContent = btn.dataset.src || '';
    tip.appendChild(txt);
    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'cite-tip-link';
      a.textContent = 'View source ↗';
      tip.appendChild(a);
    }
    tip.hidden = false;
    const r = btn.getBoundingClientRect();
    const w = Math.min(300, window.innerWidth * 0.82);
    tip.style.width = w + 'px';
    tip.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
    const above = r.top > tip.offsetHeight + 18;
    tip.style.top = above ? r.top - tip.offsetHeight - 10 + window.scrollY + 'px' : r.bottom + 10 + window.scrollY + 'px';
  };

  cites.forEach((btn) => {
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-describedby', 'wop_cite_tip');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      current === btn && !tip.hidden ? hide() : showFor(btn);
    });
    btn.addEventListener('mouseenter', () => showFor(btn));
    btn.addEventListener('mouseleave', () => {
      hideT = window.setTimeout(hide, 350);
    });
    btn.addEventListener('focus', () => showFor(btn));
    btn.addEventListener('blur', () => {
      hideT = window.setTimeout(hide, 150);
    });
  });
  tip.addEventListener('mouseenter', () => window.clearTimeout(hideT));
  tip.addEventListener('mouseleave', hide);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hide();
  });
  window.addEventListener('scroll', () => {
    if (!tip.hidden) hide();
  }, { passive: true });
}

export { initReveals, initChrome, initDrawer, initCites, countUp };

export function initEssayEngine(): void {
  initReveals();
  initChrome();
  initDrawer();
  initCites();
}
