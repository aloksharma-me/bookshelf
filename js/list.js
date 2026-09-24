// books.html — every book in a sortable, searchable table.
import { books, categories, loadAll } from './library.js';
import { $, $$, esc, fmt, month, colorVars } from './ui.js';

const rowsEl = $('#rows');
const lastName = (author) => author.split(/ & |, /)[0].split(' ').pop();

rowsEl.innerHTML = books.map((b) => `
  <li class="row" data-id="${b.id}" data-cat="${b.category}" data-title="${esc(b.title.replace(/^The /, ''))}"
      data-author="${esc(lastName(b.author))}" data-count="0" data-date=""
      data-search="${esc(`${b.title} ${b.subtitle ?? ''} ${b.author}`.toLowerCase())}">
    <a href="book.html?id=${b.id}">
      <span class="row-swatch" style="${colorVars(b)}"></span>
      <span class="row-main"><span class="row-title">${esc(b.title)}</span>${b.subtitle ? `<span class="row-sub">${esc(b.subtitle)}</span>` : ''}</span>
      <span class="row-author">${esc(b.author)}</span>
      <span class="row-cat">${esc(b.categoryLabel)}</span>
      <span class="row-num is-loading">…</span>
      <span class="row-date is-loading">…</span>
    </a>
  </li>`).join('');

const rows = $$('.row', rowsEl);
$('#list-total').textContent = books.length;

// ---------- search + category filter ----------

const input = $('#list-q');
let category = '';

function filter() {
  const needle = input.value.trim().toLowerCase();
  let shown = 0;
  rows.forEach((r) => {
    const match = (!category || r.dataset.cat === category) && (!needle || r.dataset.search.includes(needle));
    r.hidden = !match;
    shown += match;
  });
  $('#list-count').textContent = shown;
  $('.list .empty').hidden = shown > 0;
}
input.addEventListener('input', filter);

$('#chips').innerHTML = `<button type="button" data-cat="" aria-pressed="true">All</button>`
  + Object.entries(categories).map(([k, c]) => `<button type="button" data-cat="${k}" aria-pressed="false">${esc(c.label)}</button>`).join('');
const chips = $$('#chips button');
chips.forEach((btn) => btn.addEventListener('click', () => {
  chips.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  category = btn.dataset.cat;
  filter();
}));
filter();

// Press "/" anywhere to jump to the search box.
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); }
});

// ---------- sorting (click a column heading; click again to reverse) ----------

const byTitle = (a, b) => a.dataset.title.localeCompare(b.dataset.title);
const sorters = {
  title: byTitle,
  author: (a, b) => a.dataset.author.localeCompare(b.dataset.author) || byTitle(a, b),
  count: (a, b) => b.dataset.count - a.dataset.count, // most first
  date: (a, b) => (b.dataset.date || '0').localeCompare(a.dataset.date || '0'), // newest first
};
const heads = $$('.thead button');
let current = 'title';
let direction = 1;

function sortRows() {
  [...rows].sort((a, b) => sorters[current](a, b) * direction).forEach((r) => rowsEl.appendChild(r));
}
heads.forEach((h) => h.addEventListener('click', () => {
  direction = h.dataset.sort === current ? -direction : 1;
  current = h.dataset.sort;
  heads.forEach((x) => { x.classList.toggle('is-sorted', x === h); x.removeAttribute('aria-sort'); });
  const natural = current === 'count' || current === 'date' ? 'descending' : 'ascending';
  const flipped = natural === 'ascending' ? 'descending' : 'ascending';
  h.setAttribute('aria-sort', direction === 1 ? natural : flipped);
  sortRows();
}));

// ---------- fill in highlight counts and dates as books load ----------

loadAll((book) => {
  const row = rowsEl.querySelector(`[data-id="${book.id}"]`);
  row.dataset.count = book.count;
  row.dataset.date = book.date ?? '';
  const num = $('.row-num', row);
  const date = $('.row-date', row);
  num.textContent = fmt(book.count);
  date.textContent = month(book.date);
  num.classList.remove('is-loading');
  date.classList.remove('is-loading');
}).then(() => {
  if (current !== 'title') sortRows(); // re-sort now that every number is in
}).catch((err) => {
  $('.list .empty').hidden = false;
  $('.list .empty').textContent = err.message;
});
