// Turns the Obsidian/Kindle markdown in Books/ into highlights, chapters and HTML.
// Everything here works on plain strings — fetching the files happens in library.js.

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
  // "2022-10-18" would parse as UTC midnight (the previous day in some timezones), so read it as local
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const d = iso ? new Date(+iso[1], iso[2] - 1, +iso[3]) : new Date(s);
  return isNaN(d) ? null : d;
}

// Reads Goodreads link and "last read" date from the first lines of a notes file.
export function extractMeta(text) {
  const meta = {};
  for (const l of text.split('\n').slice(0, 20)) {
    const m = l.match(META_KEY);
    if (m) {
      const key = m[1].toLowerCase();
      const rest = l.slice(m[0].length).trim();
      if (key === 'goodreads' || key === 'full title') {
        const url = rest.match(/\((https?:\/\/[^)\s]*goodreads[^)\s]*)\)/);
        if (url) meta.goodreads ??= url[1].split('?')[0];
      }
      if (/last[- ]read|last highlighted/.test(key)) meta.lastRead ??= parseDate(rest);
      if (/date added|^added$/.test(key)) meta.added ??= parseDate(rest);
    } else if (DATEISH.test(l)) {
      meta.added ??= parseDate(l.replace(/^\s*-\s*/, ''));
    }
  }
  return meta;
}

// Drops the title/metadata block at the top of a notes file.
function stripHeader(text) {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const nextNonBlank = (j) => { while (j < lines.length && !lines[j].trim()) j++; return j; };
  let i = 0;
  // A leading "# Book title" followed by --- is the file's title, not a chapter.
  const first = nextNonBlank(0);
  if (/^#\s/.test(lines[first] ?? '') && /^\s*---\s*$/.test(lines[nextNonBlank(first + 1)] ?? '')) i = first + 1;
  while (i < lines.length && (!lines[i].trim() || /^\s*---\s*$/.test(lines[i]) || isMetaLine(lines[i]))) i++;
  return lines.slice(i).join('\n');
}

// ---------- sections ----------

const cleanLinkText = (s) => s.replace(/!?\[\[([^\]|]+\|)?([^\]]+)\]\]/g, (_, __, t) => t.split('/').pop().replace(/#.*/, ''));

// The [[links]] in a key-ideas list, as plain text.
export function listLinks(md) {
  return md.split('\n')
    .filter((l) => /^\s*[-*]\s+\[\[/.test(l) || /^\s*\[\[[^\]]+\]\]\s*$/.test(l))
    .map((l) => cleanLinkText(l.replace(/^\s*[-*]\s+/, '')).trim())
    .filter((t) => t.length > 3 && !/^\d+\.?\s|^key ideas/i.test(t));
}

// Removes "Key Ideas"/"Important Concepts" link lists and "To do" sections,
// returning the remaining text and the ideas that were listed.
function pullSections(md) {
  const lines = md.split('\n');
  const out = [];
  const ideas = [];
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^(#{1,6})\s*(.+?)\s*$/);
    const kind = h && (/^(key ideas|important concepts)\b/i.test(h[2]) ? 'ideas' : /^to ?do\b/i.test(h[2]) ? 'todo' : null);
    if (!kind) { out.push(lines[i]); continue; }
    let j = i + 1;
    while (j < lines.length && !/^#{1,6}\s/.test(lines[j]) && !/^\s*---\s*$/.test(lines[j])) j++;
    const section = lines.slice(i + 1, j);
    const allLinks = section.filter((l) => l.trim()).every((l) => /\[\[/.test(l));
    if (kind === 'todo' || allLinks) {
      if (kind === 'ideas') ideas.push(...listLinks(section.join('\n')));
      i = j - 1;
    } else out.push(lines[i]);
  }
  return { text: out.join('\n'), ideas };
}

// ---------- chapter files ----------

// A line that is only a link or embed, e.g. "[[1 – The Demo]]", "- [[CHAPTER 1]]" or "##![[Introduction]]".
const LINK_LINE = /^\s*(#{1,6})?\s*(?:[-*]\s+)?!?\[\[([^\]|#]+)(?:[#|][^\]]*)?\]\]\s*$/;
const NOT_NOTES = /\.(png|jpe?g|gif|webp|svg|pdf|mp4|mov)$/i;

function linkedName(line) {
  const m = line.match(LINK_LINE);
  if (!m) return null;
  const name = m[2].split('/').pop().trim();
  if (NOT_NOTES.test(name) || /^key ideas/i.test(name)) return null;
  return { name, level: m[1]?.length ?? null };
}

// Names of the chapter files an index page links to, in order (without ".md").
export function chapterLinks(indexText) {
  const { text } = pullSections(stripHeader(indexText));
  const names = text.split('\n').map(linkedName).filter(Boolean).map((l) => l.name);
  return [...new Set(names)];
}

// Shifts headings so the shallowest one lands on `top`.
function rebaseHeadings(md, top) {
  const levels = [...md.matchAll(/^(#{1,6})\s/gm)].map((m) => m[1].length);
  const shift = top - Math.min(...levels);
  return md.replace(/^(#{1,6})(\s)/gm, (_, h, s) => '#'.repeat(Math.min(6, Math.max(1, h.length + shift))) + s);
}

// ---------- markdown → blocks ----------

function parseBlocks(md) {
  const blocks = [];
  let para = null;
  let list = null;
  let quote = null; // the blockquote the previous line belonged to

  for (const rawLine of md.split('\n')) {
    const line = rawLine.replace(/(^|\s+)\^[a-z0-9-]{4,}\s*$/i, '').replace(/\\\s*$/, ''); // Obsidian block ids, hard breaks
    if (!line.trim()) { para = quote = null; continue; }
    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) { para = list = quote = null; continue; }
    if (/^\s*!\[\[[^\]]*\]\]\s*$/.test(line) || /^\s*!\[[^\]]*\]\([^)]*\)\s*$/.test(line)) continue; // images

    const h = line.match(/^(#{1,6})\s*(.*?)\s*#*\s*$/);
    if (h && !/^#[a-z]/i.test(line)) { // "#tag" is not a heading
      para = list = quote = null;
      if (h[2].trim()) blocks.push({ type: 'h', level: h[1].length, text: h[2].trim() });
      continue;
    }
    const q = line.match(/^\s*>\s?(.*)$/);
    if (q) {
      if (quote) quote.text += ' ' + q[1];
      else { para = list = null; quote = { type: 'quote', text: q[1] }; blocks.push(quote); }
      continue;
    }
    quote = null;
    const li = line.match(/^([\t ]*)([-*+]|\d+[.)])\s+(?:\[[ xX]\]\s+)?(.*)$/);
    if (li) {
      para = null;
      const indent = li[1].replace(/\t/g, '    ').length;
      if (!list) { list = { type: 'list', items: [], indents: [] }; blocks.push(list); }
      while (list.indents.length && indent < list.indents.at(-1)) list.indents.pop();
      if (!list.indents.length || indent > list.indents.at(-1)) list.indents.push(indent);
      list.items.push({ depth: list.indents.length - 1, ordered: /\d/.test(li[2]), text: li[3] });
      continue;
    }
    if (list && /^[\t ]+\S/.test(line)) { list.items.at(-1).text += '<br>' + line.trim(); continue; }
    if (para) { para.text += '<br>' + line.trim(); continue; }
    list = null;
    para = { type: 'p', text: line.trim() };
    blocks.push(para);
  }
  return pruneEmptyHeadings(blocks);
}

// Headings with nothing under them (e.g. a chapter with no highlights) are dropped.
function pruneEmptyHeadings(blocks) {
  for (;;) {
    const kept = blocks.filter((b, i) => {
      if (b.type !== 'h') return true;
      const next = blocks[i + 1];
      return next && !(next.type === 'h' && next.level <= b.level);
    });
    if (kept.length === blocks.length) return kept;
    blocks = kept;
  }
}

// ---------- inline markdown ----------

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(src) {
  return src.split('<br>').map((s) => {
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

const plain = (s) => inline(s).replace(/<[^>]+>/g, ' ')
  .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ').trim();

export const slugify = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'x';

// ---------- blocks → HTML, table of contents, highlights ----------

function render(blocks) {
  // Chapter level = shallowest heading level used at least 3 times. Shallower headings
  // are "parts" when they directly introduce a chapter, otherwise chapters themselves.
  const tally = {};
  blocks.forEach((b) => { if (b.type === 'h') tally[b.level] = (tally[b.level] ?? 0) + 1; });
  const levels = Object.keys(tally).map(Number).sort((a, b) => a - b);
  const chapterLevel = levels.find((l) => tally[l] >= 3) ?? levels[0];
  const deeper = levels.filter((l) => l >= chapterLevel);
  const rankOf = (b, i) => (b.level >= chapterLevel ? deeper.indexOf(b.level)
    : blocks[i + 1]?.type === 'h' && blocks[i + 1].level <= chapterLevel ? -1 : 0);

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
    } else if (b.type === 'p') {
      record(b.text);
      html += `<p class="hl">${inline(b.text)}</p>\n`;
    } else if (b.type === 'quote') {
      record(b.text);
      html += `<blockquote class="hl">${inline(b.text)}</blockquote>\n`;
    } else {
      html += renderList(b.items, record);
    }
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
    if (d === 0) record(it.text); // nested bullets belong to their parent highlight
    html += `<li${d === 0 ? ' class="hl"' : ''}>${inline(it.text)}`;
  }
  html += '</li>';
  while (stack.length > 1) html += `</${stack.pop()}></li>`;
  return html + `</${stack.pop()}>\n`;
}

// ---------- putting a book together ----------

// mainText:     contents of the book's `src` file
// chapterTexts: for index books, { "1 – The Demo": "…file contents…", … }
// keyIdeasText: contents of the book's `keyIdeas` file, if any
export function parseBook({ mainText, chapterTexts = {}, keyIdeasText = '' }) {
  const meta = extractMeta(mainText);
  const { text, ideas } = pullSections(stripHeader(mainText));
  let body = text;

  if (Object.keys(chapterTexts).length) {
    body = text.split('\n').map((line) => {
      const link = linkedName(line);
      const chapter = link && chapterTexts[link.name];
      if (chapter == null) return line;
      for (const [k, v] of Object.entries(extractMeta(chapter))) meta[k] ??= v;
      const pulled = pullSections(stripHeader(chapter));
      ideas.push(...pulled.ideas);
      let md = pulled.text;
      if (!/^#{1,6}\s/m.test(md)) md = `# ${link.name}\n${md}`; // chapter file without its own heading
      return rebaseHeadings(md, link.level ?? 2);
    }).join('\n');
  }

  if (keyIdeasText) ideas.push(...listLinks(keyIdeasText));
  const { html, toc, highlights } = render(parseBlocks(body));
  const date = meta.lastRead ?? meta.added ?? null;
  const pad = (n) => String(n).padStart(2, '0');

  return {
    html,
    toc,
    highlights,
    count: highlights.length,
    words: highlights.reduce((n, h) => n + h.text.split(/\s+/).length, 0),
    keyIdeas: [...new Map(ideas.map((x) => [x.toLowerCase(), x])).values()],
    goodreads: meta.goodreads ?? null,
    date: date ? `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` : null,
  };
}
