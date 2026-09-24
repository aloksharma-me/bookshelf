// book.html?id=… — one book: cover, numbers, key ideas, a few highlights and its contents.
import { findBook, loadBook, neighbours } from './library.js';
import { $, esc, fmt, month, cover, pickEvenly, quotable, showProblem } from './ui.js';

const main = $('main');
const id = new URLSearchParams(location.search).get('id');
const book = id && findBook(id);

if (!book) {
  showProblem(main, 'That book isn’t on the shelf.', id ? `No book has the id “${id}”.` : 'The link is missing a book id.');
} else {
  document.title = `${book.title} · Bookshelf`;
  loadBook(book).then(render).catch((err) => {
    console.error(`[bookshelf] ${err.message}`);
    showProblem(main, `Couldn’t open ${book.title}.`, err.message);
  });
}

function render(b) {
  const chapters = b.toc.filter((t) => t.rank <= 0);
  const mostInAChapter = Math.max(1, ...chapters.map((c) => c.count));
  const featured = pickEvenly(quotable(b, 90, 320), 3);
  const minutes = Math.max(1, Math.round(b.words / 230));
  const { prev, next } = neighbours(book);
  const ideas = (list, start = 0) => list.map((k, i) => `<li data-n="${String(start + i + 1).padStart(2, '0')}">${esc(k)}</li>`).join('');

  main.innerHTML = `
  <div class="wrap">
    <nav class="crumbs"><a href="books.html">Index</a><span>/</span><span>${esc(b.categoryLabel)}</span></nav>

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
        <a class="btn" href="notes.html?id=${b.id}">Read the notes <span aria-hidden="true">→</span></a>
      </div>
    </section>

    ${b.keyIdeas.length ? `
    <section class="block">
      <h2 class="block-title">Key ideas</h2>
      <div>
        <ol class="ideas">${ideas(b.keyIdeas.slice(0, 12))}</ol>
        ${b.keyIdeas.length > 12 ? `<details class="more"><summary>Show all ${b.keyIdeas.length}</summary>
          <ol class="ideas">${ideas(b.keyIdeas.slice(12), 12)}</ol></details>` : ''}
      </div>
    </section>` : ''}

    ${featured.length ? `
    <section class="block">
      <h2 class="block-title">Underlined</h2>
      <div class="featured">${featured.map((f) => `
        <figure>
          <blockquote>${esc(f.text)}</blockquote>
          ${f.chapter ? `<figcaption><a href="notes.html?id=${b.id}#${f.anchor}">${esc(f.chapter)}</a></figcaption>` : ''}
        </figure>`).join('')}
      </div>
    </section>` : ''}

    ${chapters.length > 1 ? `
    <section class="block">
      <h2 class="block-title">Contents</h2>
      <ol class="contents">${chapters.map((c) => (c.rank < 0
        ? `<li class="part">${esc(c.label)}</li>`
        : `<li><a href="notes.html?id=${b.id}#${c.id}">
             <span class="ct">${esc(c.label)}</span>
             <span class="cbar"><i style="width:${(c.count / mostInAChapter) * 100}%"></i></span>
             <span class="cn">${c.count}</span>
           </a></li>`)).join('')}
      </ol>
    </section>` : ''}

    <nav class="pager">
      <a href="book.html?id=${prev.id}"><small>← Previous</small><span>${esc(prev.title)}</span></a>
      <a href="book.html?id=${next.id}" class="next"><small>Next →</small><span>${esc(next.title)}</span></a>
    </nav>
  </div>`;
}
