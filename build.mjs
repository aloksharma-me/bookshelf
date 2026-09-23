// Builds a static bookshelf site from the Obsidian/Kindle highlight files in ./Books.
// Usage: node build.mjs   →   writes ./site
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { books as catalogue, categories } from './books.config.mjs';
import * as tpl from './src/templates.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const BOOKS_DIR = path.join(ROOT, 'Books');
const OUT = path.join(ROOT, 'site');

// ---------- file helpers ----------

const nfc = (s) => s.normalize('NFC');

// Resolve a path under Books/, tolerating NFC/NFD differences in filenames.
function resolveFile(rel) {
  let dir = BOOKS_DIR;
  for (const part of rel.split('/')) {
    const hit = fs.readdirSync(dir).find((f) => nfc(f) === nfc(part));
    if (!hit) throw new Error(`Missing file: Books/${rel}`);
    dir = path.join(dir, hit);
  }
  return dir;
}

const read = (abs) => fs.readFileSync(abs, 'utf8').replace(/\r\n?/g, '\n');

function siblingByName(dir, name) {
  const want = nfc(name.trim()).toLowerCase();
  const hit = fs.readdirSync(dir).find((f) => f.endsWith('.md') && nfc(f.slice(0, -3)).toLowerCase() === want);
  return hit ? path.join(dir, hit) : null;
}

// ---------- metadata ----------

const META_KEY = /^\s*[-*]?\s*\**\s*(full title|title|author|authors|goodreads|last[- ]read|last highlighted|date added|added|amazon-store|tags|keywords|category|url)\s*\**\s*:?\s*\**\s*:?/i;
const DATEISH = /^\s*-?\s*((mon|tue|wed|thu|fri|sat|sun)\w*\s+)?\d{1,2}\s+[a-z]+,?\s+\d{4}|^\s*-?\s*\d{4}-\d{2}-\d{2}\s*$|^\s*-?\s*\d{1,2}:\d{2}(\s*[ap]m)?\s*$/i;
const isMetaLine = (l) => META_KEY.test(l) || DATEISH.test(l) || /^\s*\[\[Kindle-Highlights\]\]\s*$/.test(l);

function parseDate(raw) {
  if (!raw) return null;
  const s = raw.replace(/\[\[|\]\]/g, '').replace(/\(.*?\)/g, '')
    .replace(/(\d)(st|nd|rd|th)\b/g, '$1').replace(/,/g, ' ')
    .replace(/^\s*(mon|tue|wed|thu|fri|sat|sun)\w*\s+/i, '').trim();
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d) ? null : d;
}

function extractMeta(text) {
  const head = text.split('\n').slice(0, 20);
  const meta = {};
  for (const l of head) {
    const m = l.match(META_KEY);
    const rest = m ? l.slice(m[0].length).trim() : '';
    if (m) {
      const key = m[1].toLowerCase();
      if (key === 'goodreads' || key === 'full title') {
        const url = rest.match(/\((https?:\/\/[^)\s]*goodreads[^)\s]*)\)/);
        if (url) meta.goodreads = url[1].split('?')[0];
      }
      if (/last[- ]read|last highlighted/.test(key)) meta.lastRead ??= parseDate(rest);
      if (/date added|^added$/.test(key)) meta.added ??= parseDate(rest);
    } else if (DATEISH.test(l)) {
      meta.added ??= parseDate(l.replace(/^\s*-\s*/, ''));
    }
  }
  return meta;
}

// Drop the frontmatter-ish block at the top of a highlights file.
function stripHeader(text) {
  const lines = text.split('\n');
  let i = 0;
  const nextNonBlank = (j) => { while (j < lines.length && !lines[j].trim()) j++; return j; };
  // A leading "# Book title" followed by --- is the file title, not content.
  const first = nextNonBlank(0);
  if (/^#\s/.test(lines[first] ?? '') && /^\s*---\s*$/.test(lines[nextNonBlank(first + 1)] ?? '')) i = first + 1;
  for (; i < lines.length; i++) {
    const l = lines[i];
    if (!l.trim() || /^\s*---\s*$/.test(l) || isMetaLine(l)) continue;
    break;
  }
  return lines.slice(i).join('\n');
}

// ---------- assembling a book's markdown ----------

const LINK_LINE = /^\s*(#{1,6})?\s*(?:[-*]\s+)?!?\[\[([^\]|#]+)(?:[#|][^\]]*)?\]\]\s*$/;

function assemble(entry) {
  const mainAbs = resolveFile(entry.src);
  const dir = path.dirname(mainAbs);
  const inFolder = dir !== BOOKS_DIR;
  const raw = read(mainAbs);
  const meta = extractMeta(raw);
  const keyIdeaFiles = new Set(entry.keyIdeas ? [resolveFile(entry.keyIdeas)] : []);

  let body = stripHeader(raw);
  if (inFolder) {
    body = body.split('\n').map((line) => {
      const m = line.match(LINK_LINE);
      if (!m) return line;
      const target = siblingByName(dir, m[2].split('/').pop());
      if (!target || target === mainAbs) return line;
      if (/^key ideas/i.test(path.basename(target)) || keyIdeaFiles.has(target)) {
        keyIdeaFiles.add(target);
        return '';
      }
      const childRaw = read(target);
      for (const [k, v] of Object.entries(extractMeta(childRaw))) meta[k] ??= v;
      let child = stripHeader(childRaw);
      if (!/^#{1,6}\s/m.test(child)) child = `# ${path.basename(target, '.md')}\n${child}`;
      return rebaseHeadings(child, m[1] ? m[1].length : 2);
    }).join('\n');
  }

  const { text, ideas } = pullSections(body);
  const keyIdeas = [...ideas];
  for (const f of keyIdeaFiles) keyIdeas.push(...listLinks(read(f)));
  return { body: text, meta, keyIdeas: dedupe(keyIdeas) };
}

// Shift headings so the shallowest one lands on `top`.
function rebaseHeadings(md, top) {
  const levels = [...md.matchAll(/^(#{1,6})\s/gm)].map((m) => m[1].length);
  const shift = top - Math.min(...levels);
  return md.replace(/^(#{1,6})(\s)/gm, (_, h, s) => '#'.repeat(Math.min(6, Math.max(1, h.length + shift))) + s);
}

const cleanLinkText = (s) => s.replace(/!?\[\[([^\]|]+\|)?([^\]]+)\]\]/g, (_, __, t) => t.split('/').pop().replace(/#.*/, ''));

function listLinks(md) {
  return md.split('\n')
    .filter((l) => /^\s*[-*]\s+\[\[/.test(l) || /^\s*\[\[[^\]]+\]\]\s*$/.test(l))
    .map((l) => cleanLinkText(l.replace(/^\s*[-*]\s+/, '')).trim())
    .filter((t) => t && !/^\d+\.?\s|^key ideas/i.test(t) && t.length > 3);
}

const dedupe = (arr) => [...new Map(arr.map((x) => [x.toLowerCase(), x])).values()];

// Remove "Key Ideas"/"Important Concepts" link lists and "To do" sections from the body.
function pullSections(md) {
  const lines = md.split('\n');
  const out = [];
  const ideas = [];
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^(#{1,6})\s*(.+?)\s*$/);
    const kind = h && (/^(key ideas|important concepts)\b/i.test(h[2]) ? 'ideas' : /^to ?do\b/i.test(h[2]) ? 'todo' : null);
    if (!kind) { out.push(lines[i]); continue; }
    const section = [];
    let j = i + 1;
    for (; j < lines.length; j++) {
      if (/^#{1,6}\s/.test(lines[j]) || /^\s*---\s*$/.test(lines[j])) break;
      section.push(lines[j]);
    }
    const linkish = section.filter((l) => l.trim()).every((l) => /\[\[/.test(l));
    if (kind === 'todo' || linkish) {
      if (kind === 'ideas') ideas.push(...listLinks(section.join('\n')));
      i = j - 1;
    } else out.push(lines[i]);
  }
  return { text: out.join('\n'), ideas };
}

// ---------- markdown → blocks ----------

function parseBlocks(md) {
  const blocks = [];
  let para = null;
  let list = null; // { items: [{ depth, ordered, text, children }] } flattened with depths
  const flush = () => { para = null; list = null; };

  for (const rawLine of md.split('\n')) {
    const line = rawLine.replace(/(^|\s+)\^[a-z0-9-]{4,}\s*$/i, '').replace(/\\\s*$/, ''); // Obsidian block ids, hard breaks
    if (!line.trim()) { para = null; continue; }
    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) { flush(); continue; }
    if (/^\s*!\[\[[^\]]*\]\]\s*$/.test(line) || /^\s*!\[[^\]]*\]\([^)]*\)\s*$/.test(line)) continue; // images / embeds

    const h = line.match(/^(#{1,6})\s*(.*?)\s*#*\s*$/);
    if (h && !/^#[a-z]/i.test(line)) {
      flush();
      const text = h[2].trim();
      if (text) blocks.push({ type: 'h', level: h[1].length, text });
      continue;
    }
    const q = line.match(/^\s*>\s?(.*)$/);
    if (q) {
      const prev = blocks.at(-1);
      if (prev?.type === 'quote' && !para && !list && prev.open) prev.text += ' ' + q[1];
      else { flush(); blocks.push({ type: 'quote', text: q[1], open: true }); }
      continue;
    }
    const li = line.match(/^([\t ]*)([-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?(.*)$/);
    if (li) {
      para = null;
      const indent = li[1].replace(/\t/g, '    ').length;
      if (!list) { list = { type: 'list', items: [], indents: [] }; blocks.push(list); }
      // depth from the stack of indents seen so far
      while (list.indents.length && indent < list.indents.at(-1)) list.indents.pop();
      if (!list.indents.length || indent > list.indents.at(-1)) list.indents.push(indent);
      const depth = list.indents.length - 1;
      list.items.push({ depth, ordered: /\d/.test(li[2]), text: li[3] });
      continue;
    }
    if (list && /^[\t ]+\S/.test(line)) { list.items.at(-1).text += '<br>' + line.trim(); continue; }
    blocks.forEach((b) => { if (b.type === 'quote') b.open = false; });
    if (para) { para.text += '<br>' + line.trim(); continue; }
    list = null;
    para = { type: 'p', text: line.trim() };
    blocks.push(para);
  }
  return pruneEmptyHeadings(blocks.filter((b) => b.type !== 'list' || b.items.length));
}

function pruneEmptyHeadings(blocks) {
  let changed = true;
  while (changed) {
    changed = false;
    blocks = blocks.filter((b, i) => {
      if (b.type !== 'h') return true;
      const next = blocks[i + 1];
      const empty = !next || (next.type === 'h' && next.level <= b.level);
      if (empty) changed = true;
      return !empty;
    });
  }
  return blocks;
}

// ---------- inline markdown ----------

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(src) {
  const brs = src.split('<br>');
  return brs.map((s) => {
    let t = esc(s)
      .replace(/\.fn\d+\b/g, '.') // Kindle footnote markers
      .replace(/([a-z)][.,;:!?]|[”"’])\d{1,3}(?=\s|$)/gi, '$1'); // trailing endnote numbers
    t = t.replace(/!\[\[[^\]]*\]\]/g, '');
    t = t.replace(/\[\[([^\]|]+\|)?([^\]]+)\]\]/g, (_, __, x) => `<span class="concept">${x.split('/').pop().replace(/#.*/, '')}</span>`);
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, url) =>
      /^https?:/.test(url) ? `<a href="${url}" target="_blank" rel="noopener">${text}</a>` : text);
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/__(.+?)__/g, '<strong>$1</strong>');
    t = t.replace(/(^|[^\w*])\*(?!\s)(.+?)(?<!\s)\*(?!\w)/g, '$1<em>$2</em>');
    t = t.replace(/(^|[\s(])_(?!\s)(.+?)(?<!\s)_(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');
    t = t.replace(/==(?!\s)(.+?)(?<!\s)==/g, '<mark>$1</mark>');
    t = t.replace(/(^|\s)#(book|kindle|pdf|goodnotes)\b/gi, '$1');
    return t.trim();
  }).filter(Boolean).join('<br>');
}

const plain = (s) => inline(s).replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

// ---------- structure & rendering ----------

const slugify = (s) => nfc(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x';

function structure(blocks) {
  // Chapter level = shallowest heading level used at least 3 times. Shallower headings
  // are "parts" when they directly introduce another heading, otherwise chapters.
  const hs = blocks.filter((b) => b.type === 'h');
  const tally = {};
  hs.forEach((b) => { tally[b.level] = (tally[b.level] ?? 0) + 1; });
  const levels = Object.keys(tally).map(Number).sort((a, b) => a - b);
  const chapterLevel = levels.find((l) => tally[l] >= 3) ?? levels[0];
  const deeper = levels.filter((l) => l >= chapterLevel);
  const rankOf = (b, i) => b.level >= chapterLevel ? deeper.indexOf(b.level) : blocks[i + 1]?.type === 'h' && blocks[i + 1].level <= chapterLevel ? -1 : 0;
  const used = new Set();
  const toc = [];
  const highlights = [];
  let chapter = null;
  let section = null;
  let html = '';
  const record = (text) => {
    const where = section ?? chapter;
    highlights.push({ text: plain(text), chapter: where?.label ?? null, anchor: where?.id ?? null });
    if (chapter) chapter.count++;
    if (section) section.count++;
  };

  blocks.forEach((b, i) => {
    if (b.type === 'h') {
      const r = rankOf(b, i);
      const label = plain(b.text);
      let id = slugify(label).slice(0, 60);
      while (used.has(id)) id += '-';
      used.add(id);
      const tag = r < 0 ? 'h2' : `h${Math.min(r + 2, 5)}`;
      html += `<${tag} id="${id}" class="nh ${r < 0 ? 'nh-part' : `nh-${Math.min(r, 3)}`}">${inline(b.text)}</${tag}>\n`;
      if (r <= 1) {
        const node = { id, label, rank: r, count: 0 };
        toc.push(node);
        if (r === 0) { chapter = node; section = null; } else if (r === 1) section = node;
      }
      return;
    }
    if (b.type === 'p') { record(b.text); html += `<p class="hl">${inline(b.text)}</p>\n`; }
    else if (b.type === 'quote') { record(b.text); html += `<blockquote class="hl">${inline(b.text)}</blockquote>\n`; }
    else if (b.type === 'list') { html += renderList(b.items, record); }
  });
  return { html, toc, highlights };
}

function renderList(items, record) {
  let html = '';
  let depth = -1;
  const stack = [];
  for (const it of items) {
    const d = Math.min(it.depth, depth + 1);
    if (d > depth) {
      const tag = it.ordered && d > 0 ? 'ol' : 'ul';
      html += d === 0 ? `<${tag} class="hls">` : `<${tag}>`;
      stack.push(tag);
    } else {
      html += '</li>';
      while (depth > d) { html += `</${stack.pop()}></li>`; depth--; }
    }
    depth = d;
    if (d === 0) record(it.text);
    html += `<li${d === 0 ? ' class="hl"' : ''}>${inline(it.text)}`;
  }
  html += '</li>';
  while (stack.length > 1) html += `</${stack.pop()}></li>`;
  html += `</${stack.pop()}>\n`;
  return html;
}

// ---------- colours ----------

function hash(s) { let h = 2166136261; for (const c of s) h = Math.imul(h ^ c.codePointAt(0), 16777619); return h >>> 0; }

function palette(book) {
  const c = categories[book.category];
  const h = hash(book.title);
  const hue = c.hue + ((h % 17) - 8);
  let light = c.light + ((h >> 5) % 13) - 6;
  let sat = c.sat + ((h >> 9) % 9) - 4;
  // Stories are mostly dark cloth; every third one gets a cream jacket for rhythm.
  if (book.category === 'stories' && h % 3 === 0) { light = 84 + (h % 5); sat = 22; }
  return { bg: `hsl(${hue} ${sat}% ${light}%)`, ink: light > 58 ? '#1b1a17' : '#f6f1e7' };
}

// ---------- build ----------

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, 'books'), { recursive: true });

  const books = catalogue.map((entry) => {
    const { body, meta, keyIdeas } = assemble(entry);
    const { html, toc, highlights } = structure(parseBlocks(body));
    const words = highlights.reduce((n, h) => n + h.text.split(/\s+/).length, 0);
    const date = meta.lastRead ?? meta.added ?? null;
    return {
      ...entry,
      slug: slugify(entry.title),
      categoryLabel: categories[entry.category].label,
      colors: palette(entry),
      goodreads: meta.goodreads ?? null,
      date: date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : null,
      keyIdeas, toc, notesHtml: html, highlights, count: highlights.length, words,
    };
  }).sort((a, b) => a.title.replace(/^The /, '').localeCompare(b.title.replace(/^The /, '')));

  books.forEach((b, i) => { b.prev = books[(i - 1 + books.length) % books.length]; b.next = books[(i + 1) % books.length]; });

  const write = (rel, html) => {
    const abs = path.join(OUT, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, html);
  };

  write('index.html', tpl.home(books, categories));
  write('books/index.html', tpl.list(books, categories));
  for (const b of books) {
    write(`books/${b.slug}/index.html`, tpl.details(b));
    write(`books/${b.slug}/notes/index.html`, tpl.notes(b));
  }
  for (const f of ['style.css', 'app.js']) fs.copyFileSync(path.join(ROOT, 'src', f), path.join(OUT, f));

  const total = books.reduce((n, b) => n + b.count, 0);
  console.log(`Built ${books.length} books, ${total.toLocaleString()} highlights → site/`);
  for (const b of books) console.log(`  ${String(b.count).padStart(5)}  ${String(b.toc.filter((t) => t.rank === 0).length).padStart(3)} ch  ${String(b.keyIdeas.length).padStart(3)} ideas  ${b.date ?? '—'.padEnd(10)}  ${b.title}`);
}

build();
