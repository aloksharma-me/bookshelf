// HTML templates. Every page links with relative paths so the site works from file:// too.

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmt = (n) => n.toLocaleString('en-US');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = (iso) => (iso ? `${MONTHS[+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}` : '—');
const plural = (n, w) => `${fmt(n)} ${w}${n === 1 ? '' : 's'}`;

function hash(s) { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.codePointAt(0), 16777619); return h >>> 0; }

const colorVars = (b) => `--c:${b.colors.bg};--ink:${b.colors.ink}`;

function layout({ root, title, body, page, description = '' }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap" rel="stylesheet">
<script>try{const t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{}</script>
<link rel="stylesheet" href="${root}style.css">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="5" y="6" width="6" height="22" fill="#2f4a6d"/><rect x="13" y="3" width="5" height="25" fill="#8a3b2e"/><rect x="20" y="8" width="7" height="20" fill="#c49a3a" transform="rotate(8 23 28)"/></svg>')}">
</head>
<body class="page-${page}">
<header class="site-head wrap">
  <a class="brand" href="${root}index.html">Bookshelf</a>
  <nav>
    <a href="${root}index.html"${page === 'home' ? ' aria-current="page"' : ''}>Shelf</a>
    <a href="${root}books/index.html"${page === 'list' ? ' aria-current="page"' : ''}>Index</a>
    <button type="button" class="theme-toggle" aria-label="Switch to dark mode" title="Switch to dark mode">
      <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"/></svg>
      <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>
    </button>
  </nav>
</header>
${body}
<footer class="site-foot wrap"><span>Highlights &amp; notes, kept since 2021.</span><a href="#top" onclick="scrollTo({top:0,behavior:'smooth'});return false">Back to top ↑</a></footer>
<script src="${root}app.js"></script>
</body>
</html>`;
}

// ---------- pieces ----------

function spine(b, root) {
  const h = hash(b.slug);
  const width = Math.round(Math.min(74, Math.max(28, 18 + Math.sqrt(b.count) * 2.1)));
  const height = 196 + (h % 64) + Math.min(24, b.title.length / 2);
  const deco = ['none', 'bands', 'block', 'rule'][h % 4];
  return `<a class="spine deco-${deco}${width >= 40 && b.title.length > 16 ? ' wide' : ''}" href="${root}books/${b.slug}/index.html"
    style="${colorVars(b)};--w:${width}px;--h:${Math.round(height)}px"
    data-cat="${b.category}" data-title="${esc(b.title.replace(/^The /, ''))}" data-count="${b.count}" data-date="${b.date ?? ''}"
    data-label="${esc(b.title)}" data-author="${esc(b.author)}">
    <span class="spine-title">${esc(b.title)}</span>
    <span class="spine-author">${esc(b.author.split(/ & |, /)[0].split(' ').pop())}</span>
  </a>`;
}

function cover(b, size = 'lg') {
  return `<div class="cover cover-${size}" style="${colorVars(b)}" aria-hidden="true">
    <span class="cover-cat">${esc(b.categoryLabel)}</span>
    <span class="cover-title">${esc(b.title)}</span>
    <span class="cover-rule"></span>
    <span class="cover-author">${esc(b.author)}</span>
  </div>`;
}

function pickEvenly(arr, n) {
  if (arr.length <= n) return arr;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(((i + 0.5) * arr.length) / n)]);
}

const quotable = (b, min = 70, max = 260) => b.highlights.filter((x) => x.text.length >= min && x.text.length <= max && /^[A-Z“"‘']/.test(x.text));

// ---------- pages ----------

export function home(books, categories) {
  const root = '';
  const total = books.reduce((n, b) => n + b.count, 0);
  const years = books.map((b) => b.date?.slice(0, 4)).filter(Boolean).sort();
  const order = Object.keys(categories);
  const shelved = [...books].sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) || b.count - a.count);
  const pool = books.flatMap((b) => pickEvenly(quotable(b), 10).map((q) => ({ t: q.text, b: b.title, a: b.author, s: b.slug, c: b.colors.bg })));

  const body = `
<main id="top" class="home">
  <section class="intro wrap">
    <p class="eyebrow">${plural(books.length, 'book')} · ${fmt(total)} highlights · ${years[0]}–${years.at(-1)}</p>
    <h1>Every book I’ve finished, and every line I couldn’t leave unmarked.</h1>
  </section>

  <section class="shelf-wrap wrap" aria-label="Bookshelf">
    <div class="shelf-bar">
      <p class="shelf-caption" aria-live="polite"><span class="cap-default">Spine thickness is how much I underlined. Pick one.</span></p>
      <div class="arrange" role="group" aria-label="Arrange shelf">
        <span>Arrange</span>
        <button type="button" data-sort="cat" aria-pressed="true">Colour</button>
        <button type="button" data-sort="title" aria-pressed="false">A–Z</button>
        <button type="button" data-sort="count" aria-pressed="false">Most marked</button>
      </div>
    </div>
    <div class="shelf">${shelved.map((b) => spine(b, root)).join('')}</div>
    <ul class="legend" aria-label="Filter by category">
      ${order.map((k) => `<li><button type="button" data-cat="${k}" style="--c:hsl(${categories[k].hue} ${categories[k].sat}% ${categories[k].light}%)">${esc(categories[k].label)}</button></li>`).join('')}
    </ul>
  </section>

  <section class="margin wrap" aria-label="A random highlight">
    <p class="eyebrow">From the margins</p>
    <figure class="margin-quote">
      <blockquote id="mq-text"></blockquote>
      <figcaption><a id="mq-link" href="#"><span class="mq-dot"></span><span id="mq-book"></span></a> <span id="mq-author"></span></figcaption>
    </figure>
    <button type="button" class="btn-ghost" id="mq-next">Another one →</button>
  </section>
</main>
<script>window.MARGIN_POOL=${JSON.stringify(pool).replace(/</g, '\\u003c')};</script>`;
  return layout({ root, title: 'Bookshelf', body, page: 'home', description: `${books.length} books and ${total} highlights.` });
}

export function list(books, categories) {
  const root = '../';
  const rows = books.map((b) => `
    <li class="row" data-cat="${b.category}" data-title="${esc(b.title.replace(/^The /, ''))}" data-author="${esc(b.author.split(/ & |, /)[0].split(' ').pop())}" data-count="${b.count}" data-date="${b.date ?? ''}" data-search="${esc(`${b.title} ${b.subtitle ?? ''} ${b.author}`.toLowerCase())}">
      <a href="${b.slug}/index.html">
        <span class="row-swatch" style="${colorVars(b)}"></span>
        <span class="row-main"><span class="row-title">${esc(b.title)}</span>${b.subtitle ? `<span class="row-sub">${esc(b.subtitle)}</span>` : ''}</span>
        <span class="row-author">${esc(b.author)}</span>
        <span class="row-cat">${esc(b.categoryLabel)}</span>
        <span class="row-num">${fmt(b.count)}</span>
        <span class="row-date">${month(b.date)}</span>
      </a>
    </li>`).join('');

  const body = `
<main id="top" class="list wrap">
  <div class="page-title">
    <h1>Index</h1>
    <p class="eyebrow"><span id="list-count">${books.length}</span> of ${books.length} books</p>
  </div>
  <div class="controls">
    <label class="search"><span class="sr">Search books</span><input type="search" id="list-q" placeholder="Search title or author" autocomplete="off"></label>
    <div class="chips" role="group" aria-label="Category">
      <button type="button" data-cat="" aria-pressed="true">All</button>
      ${Object.entries(categories).map(([k, c]) => `<button type="button" data-cat="${k}" aria-pressed="false">${esc(c.label)}</button>`).join('')}
    </div>
  </div>
  <div class="table" role="table">
    <div class="thead">
      <span></span>
      <button type="button" data-sort="title" class="is-sorted" aria-sort="ascending">Title</button>
      <button type="button" data-sort="author">Author</button>
      <span class="th-cat">Shelf</span>
      <button type="button" data-sort="count" class="num">Highlights</button>
      <button type="button" data-sort="date" class="num">Read</button>
    </div>
    <ol class="rows">${rows}</ol>
    <p class="empty" hidden>Nothing on the shelf matches that.</p>
  </div>
</main>`;
  return layout({ root, title: 'Index · Bookshelf', body, page: 'list' });
}

export function details(b) {
  const root = '../../';
  const chapters = b.toc.filter((t) => t.rank <= 0);
  const max = Math.max(1, ...chapters.map((c) => c.count));
  const featured = pickEvenly(quotable(b, 90, 320), 3);
  const minutes = Math.max(1, Math.round(b.words / 230));

  const body = `
<main id="top" class="details wrap">
  <nav class="crumbs"><a href="../index.html">Index</a><span>/</span><span>${esc(b.categoryLabel)}</span></nav>
  <section class="book-head">
    ${cover(b)}
    <div class="book-info">
      <h1>${esc(b.title)}</h1>
      ${b.subtitle ? `<p class="subtitle">${esc(b.subtitle)}</p>` : ''}
      <p class="byline">by ${esc(b.author)}</p>
      <dl class="stats">
        <div><dt>Highlights</dt><dd>${fmt(b.count)}</dd></div>
        <div><dt>Chapters</dt><dd>${chapters.filter((c) => c.rank === 0).length || '—'}</dd></div>
        <div><dt>To reread</dt><dd>${minutes}<small> min</small></dd></div>
      </dl>
      <dl class="facts">
        <div><dt>Shelf</dt><dd>${esc(b.categoryLabel)}</dd></div>
        ${b.date ? `<div><dt>Last read</dt><dd>${month(b.date)}</dd></div>` : ''}
        ${b.goodreads ? `<div><dt>Elsewhere</dt><dd><a href="${esc(b.goodreads)}" target="_blank" rel="noopener">Goodreads ↗</a></dd></div>` : ''}
      </dl>
      <a class="btn" href="notes/index.html">Read the notes <span aria-hidden="true">→</span></a>
    </div>
  </section>

  ${b.keyIdeas.length ? `
  <section class="block">
    <h2 class="block-title">Key ideas</h2>
    <div>
      <ol class="ideas">${b.keyIdeas.slice(0, 12).map((k) => `<li>${esc(k)}</li>`).join('')}</ol>
      ${b.keyIdeas.length > 12 ? `<details class="more"><summary>Show all ${b.keyIdeas.length}</summary>
      <ol class="ideas" start="13">${b.keyIdeas.slice(12).map((k) => `<li>${esc(k)}</li>`).join('')}</ol></details>` : ''}
    </div>
  </section>` : ''}

  ${featured.length ? `
  <section class="block">
    <h2 class="block-title">Underlined</h2>
    <div class="featured">${featured.map((f) => `
      <figure><blockquote>${esc(f.text)}</blockquote>${f.chapter ? `<figcaption><a href="notes/index.html#${f.anchor}">${esc(f.chapter)}</a></figcaption>` : ''}</figure>`).join('')}
    </div>
  </section>` : ''}

  ${chapters.length > 1 ? `
  <section class="block">
    <h2 class="block-title">Contents</h2>
    <ol class="contents">${chapters.map((c) => c.rank < 0
      ? `<li class="part">${esc(c.label)}</li>`
      : `<li><a href="notes/index.html#${c.id}"><span class="ct">${esc(c.label)}</span><span class="cbar"><i style="width:${(c.count / max) * 100}%"></i></span><span class="cn">${c.count}</span></a></li>`).join('')}
    </ol>
  </section>` : ''}

  <nav class="pager">
    <a href="../${b.prev.slug}/index.html"><small>← Previous</small><span>${esc(b.prev.title)}</span></a>
    <a href="../${b.next.slug}/index.html" class="next"><small>Next →</small><span>${esc(b.next.title)}</span></a>
  </nav>
</main>`;
  return layout({ root, title: `${b.title} · Bookshelf`, body, page: 'details', description: `${b.count} highlights from ${b.title} by ${b.author}.` });
}

export function notes(b) {
  const root = '../../../';
  const toc = b.toc.filter((t) => t.rank <= 1);
  const body = `
<main id="top" class="notes">
  <header class="notes-head wrap">
    <a class="notes-book" href="../index.html">
      ${cover(b, 'sm')}
      <span><span class="notes-title">${esc(b.title)}</span><span class="notes-author">${esc(b.author)}</span></span>
    </a>
    <label class="search"><span class="sr">Search highlights</span><input type="search" id="notes-q" placeholder="Search ${fmt(b.count)} highlights" autocomplete="off"></label>
  </header>
  <div class="notes-body wrap${toc.length > 1 ? '' : ' no-toc'}">
    ${toc.length > 1 ? `
    <aside class="toc" aria-label="Chapters">
      <details open><summary>Contents</summary>
      <ol>${toc.map((t) => `<li class="toc-${t.rank < 0 ? 'part' : t.rank}"><a href="#${t.id}">${esc(t.label)}</a></li>`).join('')}</ol>
      </details>
    </aside>` : ''}
    <article class="prose" style="${colorVars(b)}">
      <p class="notes-count eyebrow"><span id="notes-shown">${fmt(b.count)}</span> highlights</p>
      ${b.notesHtml}
      <p class="empty" hidden>No highlights match that.</p>
    </article>
  </div>
</main>`;
  return layout({ root, title: `Notes — ${b.title} · Bookshelf`, body, page: 'notes' });
}
