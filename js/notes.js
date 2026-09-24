// notes.html?id=… — every highlight from one book, with a contents list and search.
import { findBook, loadBook } from './library.js';
import { $, $$, esc, fmt, cover, colorVars, showProblem } from './ui.js';

const main = $('main');
const id = new URLSearchParams(location.search).get('id');
const book = id && findBook(id);

if (!book) {
  showProblem(main, 'That book isn’t on the shelf.', id ? `No book has the id “${id}”.` : 'The link is missing a book id.');
} else {
  document.title = `Notes — ${book.title} · Bookshelf`;
  loadBook(book).then((b) => {
    render(b);
    trackContents();
    enableSearch(b);
    // The notes arrive after the page loads, so jump to "#chapter" links ourselves.
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  }).catch((err) => {
    console.error(`[bookshelf] ${err.message}`);
    showProblem(main, `Couldn’t open the notes for ${book.title}.`, err.message);
  });
}

function render(b) {
  const toc = b.toc.filter((t) => t.rank <= 1);
  const hasToc = toc.length > 1;
  main.innerHTML = `
  <header class="notes-head wrap">
    <a class="notes-book" href="book.html?id=${b.id}">
      ${cover(b, 'sm')}
      <span><span class="notes-title">${esc(b.title)}</span><span class="notes-author">${esc(b.author)}</span></span>
    </a>
    <label class="search"><span class="sr">Search highlights</span><input type="search" id="notes-q" placeholder="Search ${fmt(b.count)} highlights" autocomplete="off"></label>
  </header>
  <div class="notes-body wrap${hasToc ? '' : ' no-toc'}">
    ${hasToc ? `
    <aside class="toc" aria-label="Chapters">
      <details${matchMedia('(max-width: 900px)').matches ? '' : ' open'}><summary>Contents</summary>
        <ol>${toc.map((t) => `<li class="toc-${t.rank < 0 ? 'part' : t.rank}"><a href="#${t.id}">${esc(t.label)}</a></li>`).join('')}</ol>
      </details>
    </aside>` : ''}
    <article class="prose" style="${colorVars(b)}">
      <p class="notes-count eyebrow"><span id="notes-shown">${fmt(b.count)}</span> highlights</p>
      ${b.html}
      <p class="empty" hidden>No highlights match that.</p>
    </article>
  </div>`;
}

// Marks the chapter you're reading in the contents list.
function trackContents() {
  const links = $$('.toc a');
  const toc = $('.toc');
  const targets = links.map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1)))).filter(Boolean);
  if (!targets.length) return;

  const update = () => {
    let current = targets[0];
    for (const t of targets) if (t.getBoundingClientRect().top < 120) current = t;
    links.forEach((a) => a.classList.toggle('active', a.hash === `#${current.id}`));
    // Keep the active entry visible when the contents list scrolls on its own
    const active = links.find((a) => a.classList.contains('active'));
    if (active && toc.scrollHeight > toc.clientHeight && getComputedStyle(toc).position === 'sticky') {
      const r = active.getBoundingClientRect();
      const box = toc.getBoundingClientRect();
      if (r.top < box.top + 40 || r.bottom > box.bottom - 40) toc.scrollTop += r.top - box.top - box.height / 3;
    }
  };
  let frame = 0;
  addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }, { passive: true });
  update();
}

// Filters highlights as you type and marks the matching words.
function enableSearch(b) {
  const input = $('#notes-q');
  const prose = $('.prose');
  const items = $$('.hl', prose);
  const headings = $$('.nh', prose);
  const original = new Map(items.map((el) => [el, el.innerHTML]));
  const rank = (h) => (h.classList.contains('nh-part') ? -1 : Number(h.className.match(/nh-(\d)/)?.[1] ?? 9));
  let timer = 0;

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const needle = input.value.trim();
      const pattern = needle && new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      let shown = 0;
      items.forEach((el) => {
        el.innerHTML = original.get(el);
        const hit = !needle || el.textContent.toLowerCase().includes(needle.toLowerCase());
        el.classList.toggle('hidden', !hit);
        if (hit) shown++;
        if (hit && pattern) markMatches(el, pattern);
      });
      // Hide headings that have nothing visible under them
      headings.forEach((h) => {
        if (!needle) { h.classList.remove('hidden'); return; }
        let el = h.nextElementSibling;
        let any = false;
        while (el && !(el.classList.contains('nh') && rank(el) <= rank(h))) {
          if (!el.classList.contains('nh') && (el.matches('.hl:not(.hidden)') || el.querySelector('.hl:not(.hidden)'))) { any = true; break; }
          el = el.nextElementSibling;
        }
        h.classList.toggle('hidden', !any);
      });
      $('#notes-shown').textContent = needle ? `${fmt(shown)} of ${fmt(b.count)}` : fmt(b.count);
      $('.prose .empty').hidden = shown > 0;
    }, 120);
  });
}

function markMatches(root, pattern) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const s = node.nodeValue;
    pattern.lastIndex = 0;
    if (!pattern.test(s)) continue;
    const frag = document.createDocumentFragment();
    let last = 0;
    s.replace(pattern, (m, at) => {
      frag.append(s.slice(last, at));
      const mark = document.createElement('mark');
      mark.className = 'q';
      mark.textContent = m;
      frag.append(mark);
      last = at + m.length;
    });
    frag.append(s.slice(last));
    node.replaceWith(frag);
  }
}
