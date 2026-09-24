// Small helpers shared by every page, plus the light/dark toggle in the header.
export { esc } from './parser.js';
import { esc } from './parser.js';

export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];

export const fmt = (n) => n.toLocaleString('en-US');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const month = (iso) => (iso ? `${MONTHS[+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}` : '—');

export const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
};

export const colorVars = (b) => `--c:${b.colors.bg};--ink:${b.colors.ink}`;

// A plain typographic cover in the book's colour.
export function cover(b, size = 'lg') {
  return `<div class="cover cover-${size}" style="${colorVars(b)}" aria-hidden="true">
    <span class="cover-cat">${esc(b.categoryLabel)}</span>
    <span class="cover-title">${esc(b.title)}</span>
    <span class="cover-rule"></span>
    <span class="cover-author">${esc(b.author)}</span>
  </div>`;
}

// n items spread evenly through arr (so picks come from across the whole book).
export function pickEvenly(arr, n) {
  if (arr.length <= n) return arr;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(((i + 0.5) * arr.length) / n)]);
}

// Highlights that read well on their own: a full sentence of a sensible length.
export const quotable = (b, min = 70, max = 260) =>
  b.highlights.filter((x) => x.text.length >= min && x.text.length <= max && /^[A-Z“"‘']/.test(x.text));

// Replaces a page's content with a message — used when a book can't be found or loaded.
export function showProblem(el, title, detail = '') {
  el.innerHTML = `<div class="notice wrap"><h1>${esc(title)}</h1>${detail ? `<p>${esc(detail)}</p>` : ''}
    <p><a href="index.html">Back to the shelf</a></p></div>`;
}

// ---------- light / dark toggle ----------
// The <head> of every page sets data-theme before first paint; this keeps it in sync afterwards.

const root = document.documentElement;
const toggle = $('.theme-toggle');
const systemDark = matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  root.dataset.theme = theme;
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
  toggle?.setAttribute('aria-label', label);
  toggle?.setAttribute('title', label);
}

applyTheme(root.dataset.theme || (systemDark.matches ? 'dark' : 'light'));
toggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  store.set('theme', next);
});
// Follow the system until the reader picks a theme themselves.
systemDark.addEventListener('change', (e) => { if (!store.get('theme')) applyTheme(e.matches ? 'dark' : 'light'); });
