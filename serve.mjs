// Tiny static server for previewing ./site — node serve.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'site');
const port = Number(process.argv[2] ?? 4321);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };

http.createServer((req, res) => {
  let p = path.join(dir, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(dir)) return res.writeHead(403).end();
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, data) => {
    if (err) return res.writeHead(404).end('Not found');
    res.writeHead(200, { 'content-type': types[path.extname(p)] ?? 'application/octet-stream' }).end(data);
  });
}).listen(port, () => console.log(`Bookshelf → http://localhost:${port}`));
