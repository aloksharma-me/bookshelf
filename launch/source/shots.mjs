import { launch } from './cdp.mjs';
const B = 'http://localhost:4322/';
const out = new URL('./shots/', import.meta.url).pathname;
const c = await launch();
const ready = (cond) => c.eval(`(async () => { await document.fonts.ready; for (let i = 0; i < 200 && !(${cond}); i++) await new Promise(r => setTimeout(r, 50)); await new Promise(r => setTimeout(r, 900)); return true; })()`);
const hover = async (sel) => {
  const r = await c.eval(`(() => { const b = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; })()`);
  await c.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: r.x, y: r.y });
  await new Promise((res) => setTimeout(res, 600));
};

async function take(name, url, { w = 1440, h = 900, scale = 2, mobile = false, dark = false, cond = 'true', then = '' } = {}) {
  await c.theme(dark);
  await c.size(w, h, scale, mobile);
  await c.goto(B + url);
  await c.eval(`try { localStorage.clear() } catch {}`);
  await ready(cond);
  if (then) { await c.eval(`(async () => { ${then} })()`); await new Promise((r) => setTimeout(r, 700)); }
  await c.shot(out + name + '.png');
  console.log('✓', name);
}

const loadedHome = `document.querySelector('#shelf-stats')?.textContent.includes('highlights')`;
await take('home', 'index.html', { h: 1500, cond: loadedHome });
await take('home-hover', 'index.html', { cond: loadedHome, then: `scrollTo(0, 420)` });
await hover('.spine[data-id="atomic-habits"]');
await c.shot(out + 'home-hover.png'); console.log('✓ home-hover (hovered)');
await take('home-dark', 'index.html', { dark: true, cond: loadedHome, then: `scrollTo(0, 420)` });
await take('index', 'books.html', { cond: `!document.querySelector('.row-num.is-loading')` });
await take('book', 'book.html?id=atomic-habits', { h: 2200, cond: `document.querySelector('.book-head')` });
await take('notes', 'notes.html?id=atomic-habits', { h: 1400, cond: `document.querySelector('.prose .hl')` });
await take('notes-search', 'notes.html?id=deep-work', { cond: `document.querySelector('#notes-q')`,
  then: `const i = document.querySelector('#notes-q'); i.value = 'attention'; i.dispatchEvent(new Event('input')); await new Promise(r => setTimeout(r, 400));` });
await take('notes-dark', 'notes.html?id=the-psychology-of-money', { dark: true, cond: `document.querySelector('.prose .hl')`, then: `document.getElementById('6-tails-you-win').scrollIntoView(); scrollBy(0, -40)` });
await take('m-home', 'index.html', { w: 390, h: 844, scale: 3, mobile: true, cond: loadedHome, then: `scrollTo(0, 330)` });
await take('m-notes-dark', 'notes.html?id=deep-work', { w: 390, h: 844, scale: 3, mobile: true, dark: true, cond: `document.querySelector('.prose .hl')`, then: `scrollTo(0, 0)` });
c.close();
