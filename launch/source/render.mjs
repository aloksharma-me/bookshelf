// node render.mjs stills 2.5 8 14 …   → stills/t-2.5.png …
// node render.mjs frames              → frames/00000.jpg … (every frame at the film's FPS)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { launch } from './cdp.mjs';

const dir = path.dirname(new URL(import.meta.url).pathname);
const types = { '.html': 'text/html', '.json': 'application/json', '.txt': 'text/plain', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const p = path.join(dir, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  fs.readFile(p, (err, data) => (err ? res.writeHead(404).end() : res.writeHead(200, { 'content-type': types[path.extname(p)] ?? 'application/octet-stream' }).end(data)));
}).listen(0);
const port = server.address().port;

const [mode, ...args] = process.argv.slice(2);
const c = await launch();
await c.size(1920, 1080, 1);
await c.goto(`http://127.0.0.1:${port}/film.html?render`);
await c.eval(`(async () => { for (let i = 0; i < 400 && !window.ready; i++) await new Promise(r => setTimeout(r, 50)); if (!window.ready) throw new Error('film did not get ready'); })()`);
const { duration, fps } = await c.eval(`({ duration: DURATION, fps: FPS })`);

// Let layout/paint settle for a frame before capturing
const frameAt = (t) => c.eval(`new Promise(r => { seek(${t}); requestAnimationFrame(() => requestAnimationFrame(r)); })`);

if (mode === 'stills') {
  fs.mkdirSync(path.join(dir, 'stills'), { recursive: true });
  for (const t of args) { await frameAt(+t); await c.shot(path.join(dir, 'stills', `t-${t}.png`)); console.log('still', t); }
} else {
  const out = path.join(dir, 'frames');
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out);
  const total = Math.round(duration * fps);
  const started = Date.now();
  for (let f = 0; f < total; f++) {
    await frameAt(f / fps);
    await c.shot(path.join(out, String(f).padStart(5, '0') + '.jpg'), { format: 'jpeg', quality: 94 });
    if (f % 300 === 0) console.log(`frame ${f}/${total} · ${((Date.now() - started) / 1000).toFixed(0)}s`);
  }
  console.log(`done: ${total} frames in ${((Date.now() - started) / 1000).toFixed(0)}s`);
}
c.close();
server.close();
