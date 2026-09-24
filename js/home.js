// index.html — the shelf, the category legend and "From the margins".
import { books, categories, loadAll, hash } from './library.js';
import { $, $$, esc, fmt, store, colorVars, pickEvenly, quotable } from './ui.js';

const shelf = $('#shelf');
const caption = $('.shelf-caption');
const defaultCaption = caption.innerHTML;
const order = Object.keys(categories);
const byTitle = (a, b) => a.dataset.title.localeCompare(b.dataset.title);

// ---------- spines ----------

// Spine width follows the number of highlights; until a book loads it stands at a default width.
const spineWidth = (count) => Math.round(Math.min(74, Math.max(28, 18 + Math.sqrt(count) * 2.1)));

function spine(b) {
  const h = hash(b.id);
  const height = Math.round(196 + (h % 64) + Math.min(24, b.title.length / 2));
  const deco = ['none', 'bands', 'block', 'rule'][h % 4];
  return `<a class="spine deco-${deco} is-loading" href="book.html?id=${b.id}"
      style="${colorVars(b)};--w:34px;--h:${height}px"
      data-id="${b.id}" data-cat="${b.category}" data-title="${esc(b.title.replace(/^The /, ''))}"
      data-label="${esc(b.title)}" data-author="${esc(b.author)}" data-count="0">
    <span class="spine-title">${esc(b.title)}</span>
    <span class="spine-author">${esc(b.author.split(/ & |, /)[0].split(' ').pop())}</span>
  </a>`;
}

const shelved = [...books].sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category));
shelf.innerHTML = shelved.map(spine).join('');
const spines = $$('.spine', shelf);

function sizeSpine(book) {
  const el = shelf.querySelector(`[data-id="${book.id}"]`);
  const width = spineWidth(book.count);
  el.style.setProperty('--w', `${width}px`);
  el.dataset.count = book.count;
  el.classList.remove('is-loading');
  el.classList.toggle('wide', width >= 40 && book.title.length > 16); // room for a two-line title
}

// Hovering a spine names it above the shelf.
function describe(el) {
  caption.innerHTML = '';
  const title = document.createElement('strong');
  title.textContent = el.dataset.label;
  const meta = document.createElement('span');
  meta.className = 'cap-meta';
  const n = Number(el.dataset.count);
  meta.textContent = `${el.dataset.author}${n ? ` · ${fmt(n)} highlights` : ''}`;
  caption.append(title, meta);
}
spines.forEach((s) => {
  s.addEventListener('mouseenter', () => describe(s));
  s.addEventListener('focus', () => describe(s));
});
shelf.addEventListener('mouseleave', () => { caption.innerHTML = defaultCaption; });

// ---------- arrange (spines slide to their new places) ----------

const sorters = {
  cat: null, // the order they were shelved in
  title: byTitle,
  count: (a, b) => b.dataset.count - a.dataset.count,
};

function arrange(key) {
  const before = new Map(spines.map((s) => [s, s.getBoundingClientRect()]));
  (sorters[key] ? [...spines].sort(sorters[key]) : spines).forEach((s) => shelf.appendChild(s));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  spines.forEach((s) => {
    const a = before.get(s);
    const b = s.getBoundingClientRect();
    if (a.left === b.left && a.top === b.top) return;
    s.animate([{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px)` }, { transform: 'none' }],
      { duration: 520, easing: 'cubic-bezier(.2,.8,.2,1)' });
  });
}

const arrangeButtons = $$('.arrange button');
function pressArrange(btn) {
  arrangeButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  arrange(btn.dataset.sort);
  store.set('shelf-sort', btn.dataset.sort);
}
arrangeButtons.forEach((btn) => btn.addEventListener('click', () => pressArrange(btn)));
if (store.get('shelf-sort') === 'title') pressArrange(arrangeButtons.find((b) => b.dataset.sort === 'title'));

// ---------- category legend (click to spotlight one shelf) ----------

$('#legend').innerHTML = order.map((k) => {
  const c = categories[k];
  return `<li><button type="button" data-cat="${k}" aria-pressed="false" style="--c:hsl(${c.hue} ${c.sat}% ${c.light}%)">${esc(c.label)}</button></li>`;
}).join('');
const legend = $$('#legend button');
legend.forEach((btn) => btn.addEventListener('click', () => {
  const on = btn.getAttribute('aria-pressed') !== 'true';
  legend.forEach((b) => b.setAttribute('aria-pressed', String(on && b === btn)));
  shelf.classList.toggle('has-filter', on);
  spines.forEach((s) => s.classList.toggle('on', on && s.dataset.cat === btn.dataset.cat));
}));

// ---------- from the margins ----------

function startMargins(pool) {
  const text = $('#mq-text');
  const link = $('#mq-link');
  const next = $('#mq-next');
  let last = -1;
  const show = (animate) => {
    let i;
    do { i = Math.floor(Math.random() * pool.length); } while (pool.length > 1 && i === last);
    last = i;
    const q = pool[i];
    const apply = () => {
      text.textContent = q.text;
      $('#mq-book').textContent = q.book.title;
      $('#mq-author').textContent = `— ${q.book.author}`;
      link.href = `book.html?id=${q.book.id}`;
      link.style.setProperty('--c', q.book.colors.bg);
      text.classList.remove('fading', 'is-loading');
    };
    if (animate) { text.classList.add('fading'); setTimeout(apply, 300); } else apply();
  };
  show(false);
  next.disabled = false;
  next.addEventListener('click', () => show(true));
}

// ---------- load everything ----------

$('#shelf-stats').textContent = `${books.length} books · opening…`;

loadAll(sizeSpine).then((loaded) => {
  const total = loaded.reduce((n, b) => n + b.count, 0);
  const years = loaded.map((b) => b.date?.slice(0, 4)).filter(Boolean).sort();
  $('#shelf-stats').textContent = `${loaded.length} books · ${fmt(total)} highlights`
    + (years.length ? ` · ${years[0]}–${years.at(-1)}` : '');
  arrangeButtons.find((b) => b.dataset.sort === 'count').disabled = false;
  if (store.get('shelf-sort') === 'count') pressArrange(arrangeButtons.find((b) => b.dataset.sort === 'count'));
  startMargins(loaded.flatMap((book) => pickEvenly(quotable(book), 10).map((q) => ({ text: q.text, book }))));
}).catch((err) => {
  $('#shelf-stats').textContent = 'The notes couldn’t be loaded';
  caption.textContent = err.message;
});
