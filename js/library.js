// Loads books: reads the catalogue, fetches the markdown from Books/ and hands it to the parser.
import { books as catalogue, categories } from './catalogue.js';
import { parseBook, chapterLinks, slugify } from './parser.js';

export { categories };

export function hash(s) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.codePointAt(0), 16777619);
  return h >>> 0;
}

// Each book gets a shade of its category's colour, varied a little by its title.
function colors(book) {
  const c = categories[book.category];
  const h = hash(book.title);
  const hue = c.hue + ((h % 17) - 8);
  let light = c.light + ((h >> 5) % 13) - 6;
  let sat = c.sat + ((h >> 9) % 9) - 4;
  // Stories are mostly dark cloth; every third one gets a cream jacket for rhythm.
  if (book.category === 'stories' && h % 3 === 0) { light = 84 + (h % 5); sat = 22; }
  return { bg: `hsl(${hue} ${sat}% ${light}%)`, ink: light > 58 ? '#1b1a17' : '#f6f1e7' };
}

const sortTitle = (t) => t.replace(/^The /, '');

// The catalogue, A–Z, with an id, colours and category label added to each book.
export const books = catalogue
  .map((b) => {
    if (!categories[b.category]) console.error(`[bookshelf] "${b.title}" has unknown category "${b.category}" in js/catalogue.js`);
    return { ...b, id: slugify(b.title), categoryLabel: categories[b.category]?.label ?? b.category, colors: colors(b) };
  })
  .sort((a, b) => sortTitle(a.title).localeCompare(sortTitle(b.title)));

export const findBook = (id) => books.find((b) => b.id === id);

export function neighbours(book) {
  const i = books.indexOf(book);
  return { prev: books[(i - 1 + books.length) % books.length], next: books[(i + 1) % books.length] };
}

// ---------- fetching ----------

// "Atomic Habits/01. Atomic Habits.md" → "Books/Atomic%20Habits/01.%20Atomic%20Habits.md"
const urlFor = (path) => 'Books/' + path.split('/').map(encodeURIComponent).join('/');

async function fetchText(path) {
  let res;
  try {
    res = await fetch(urlFor(path));
  } catch {
    throw new Error(location.protocol === 'file:'
      ? 'The page was opened as a file. Browsers block reading other files that way, so run a local server (see README.md).'
      : `Couldn't reach Books/${path}`);
  }
  if (!res.ok) throw new Error(`Books/${path} → ${res.status} ${res.statusText || ''}`.trim());
  return res.text();
}

const loaded = new Map();

// Fetches and parses one book. Results are remembered, so asking twice costs nothing.
export function loadBook(book) {
  if (!loaded.has(book.id)) loaded.set(book.id, (async () => {
    const mainText = await fetchText(book.src);
    const folder = book.src.includes('/') ? book.src.slice(0, book.src.lastIndexOf('/') + 1) : '';

    const chapterTexts = {};
    if (book.index) {
      const names = chapterLinks(mainText);
      const texts = await Promise.all(names.map((name) => fetchText(`${folder}${name}.md`).catch((err) => {
        console.warn(`[bookshelf] ${book.title}: chapter skipped — ${err.message}`);
        return null;
      })));
      names.forEach((name, i) => { if (texts[i] != null) chapterTexts[name] = texts[i]; });
    }

    const keyIdeasText = book.keyIdeas ? await fetchText(book.keyIdeas).catch((err) => {
      console.warn(`[bookshelf] ${book.title}: key ideas skipped — ${err.message}`);
      return '';
    }) : '';

    return { ...book, ...parseBook({ mainText, chapterTexts, keyIdeasText }) };
  })());
  return loaded.get(book.id);
}

// Loads every book, a few at a time, calling onBook(book) as each one arrives.
// A book that fails to load is reported in the console and skipped.
export async function loadAll(onBook) {
  const queue = [...books];
  const done = [];
  const worker = async () => {
    while (queue.length) {
      const book = queue.shift();
      try {
        const full = await loadBook(book);
        done.push(full);
        onBook?.(full);
      } catch (err) {
        console.error(`[bookshelf] Couldn't load "${book.title}": ${err.message}`);
        if (location.protocol === 'file:') throw err;
      }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  return books.map((b) => done.find((d) => d.id === b.id)).filter(Boolean);
}
