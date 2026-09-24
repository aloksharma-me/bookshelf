// Minimal Chrome DevTools Protocol driver: launch headless Chrome, open a page, send commands.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CHROME = {
  arm64: `${os.homedir()}/.cache/puppeteer/chrome-headless-shell/mac_arm-146.0.7680.153/chrome-headless-shell-mac-arm64/chrome-headless-shell`,
  x64: `${os.homedir()}/.cache/puppeteer/chrome-headless-shell/mac-152.0.7977.54/chrome-headless-shell-mac-x64/chrome-headless-shell`,
}[process.arch];

export async function launch() {
  const dir = fs.mkdtempSync(path.join(path.dirname(new URL(import.meta.url).pathname), '.chrome-'));
  const proc = spawn(CHROME, ['--remote-debugging-port=0', `--user-data-dir=${dir}`, '--hide-scrollbars',
    '--force-color-profile=srgb', '--font-render-hinting=none', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
  const portFile = path.join(dir, 'DevToolsActivePort');
  for (let i = 0; i < 300 && !fs.existsSync(portFile); i++) await new Promise((r) => setTimeout(r, 100));
  const port = fs.readFileSync(portFile, 'utf8').split('\n')[0];
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const pending = new Map();
  const listeners = new Map();
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method) listeners.get(msg.method)?.forEach((f) => f(msg.params));
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
  const once = (method) => new Promise((r) => {
    const arr = listeners.get(method) ?? [];
    const f = (p) => { arr.splice(arr.indexOf(f), 1); r(p); };
    arr.push(f);
    listeners.set(method, arr);
  });
  await send('Page.enable');
  await send('Runtime.enable');

  const api = {
    send,
    async size(width, height, scale = 1, mobile = false) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile });
    },
    async theme(dark) {
      await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' }] });
    },
    async goto(url) { const loaded = once('Page.loadEventFired'); await send('Page.navigate', { url }); await loaded; },
    async eval(expression) {
      const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
      return r.result.value;
    },
    async shot(file, opts = {}) {
      const { data } = await send('Page.captureScreenshot', { format: opts.format ?? 'png', quality: opts.quality, optimizeForSpeed: !!opts.fast });
      fs.writeFileSync(file, Buffer.from(data, 'base64'));
    },
    close() { ws.close(); proc.kill(); },
  };
  return api;
}
