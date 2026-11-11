#!/usr/bin/env node
// Interactive intake. Zero dependencies (Node >= 18).
//
//   node intake/tool/fill.mjs               open the form in the browser
//   node intake/tool/fill.mjs --render      rewrite Docs/intake/*.md from answers.json
//   node intake/tool/fill.mjs --check       print the gate; exit 1 if required answers are missing
//   node intake/tool/fill.mjs --templates   regenerate the blank templates in intake/
//   options: --lang <code>  --port <n>  --no-open

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { files } from './schema.mjs';
import { emptyAnswers, normalize, renderFile, fileName } from './render.mjs';
import { gate, gatePasses } from './gate.mjs';

const TOOL = path.dirname(fileURLToPath(import.meta.url));
const INTAKE = path.dirname(TOOL);
const ROOT = path.dirname(INTAKE);
const DOCS = path.join(ROOT, 'Docs', 'intake');
const ANSWERS = path.join(DOCS, 'answers.json');
const ASSETS = path.join(DOCS, 'assets');
const APP = path.join(TOOL, 'app');

// ---------- args ----------
const argv = process.argv.slice(2);
const flag = (n) => argv.includes('--' + n);
const opt = (n, d) => {
  const i = argv.indexOf('--' + n);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : d;
};

const localeCodes = () => fs.readdirSync(path.join(TOOL, 'locales')).filter((f) => f.endsWith('.mjs')).map((f) => f.slice(0, -4));

async function loadLocale(code) {
  if (!/^[a-z]{2,3}$/.test(code) || !localeCodes().includes(code)) {
    console.error(`Unknown language "${code}". Available: ${localeCodes().join(', ')}`);
    process.exit(2);
  }
  return (await import(pathToFileURL(path.join(TOOL, 'locales', code + '.mjs')).href)).default;
}

// ---------- storage ----------
function readAnswers(lang) {
  try {
    return normalize(JSON.parse(fs.readFileSync(ANSWERS, 'utf8')), lang);
  } catch {
    return emptyAnswers(lang);
  }
}

function writeAll(answers, L) {
  fs.mkdirSync(DOCS, { recursive: true });
  fs.writeFileSync(ANSWERS, JSON.stringify(answers, null, 2) + '\n');
  for (const file of files) fs.writeFileSync(path.join(DOCS, fileName(file)), renderFile(file, answers, L));
}

function gateTable(answers, L) {
  const rows = gate(answers, L);
  const out = rows.map((r) => `${r.filled ? '  ok     ' : '  MISSING'}  ${r.file.padEnd(9)} ${r.label}`);
  return { rows, text: out.join('\n'), pass: gatePasses(rows) };
}

// ---------- one-shot commands ----------
const savedLang = readAnswers('en').lang;
const L0 = await loadLocale(opt('lang', savedLang));

if (flag('templates')) {
  for (const file of files) fs.writeFileSync(path.join(INTAKE, fileName(file)), renderFile(file, emptyAnswers(L0.lang), L0, { blank: true }));
  console.log(`Wrote ${files.length} blank templates to intake/`);
  process.exit(0);
}

if (flag('render')) {
  if (!fs.existsSync(ANSWERS)) {
    console.error('Docs/intake/answers.json does not exist yet. Run without flags to start the form.');
    process.exit(1);
  }
  writeAll(readAnswers(L0.lang), L0);
  console.log(`Rendered ${files.length} files in Docs/intake/`);
  process.exit(0);
}

if (flag('check')) {
  const g = gateTable(readAnswers(L0.lang), L0);
  console.log(g.text);
  console.log(g.pass ? '\nGate: PASS' : '\nGate: FAIL — fill the MISSING fields above.');
  process.exit(g.pass ? 0 : 1);
}

// ---------- server ----------
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json' };
const LIB_OK = /^(schema|render|gate)\.mjs$|^locales\/[a-z]{2,3}\.mjs$/;
const MAX_JSON = 5 * 1024 * 1024;
const MAX_ASSET = 50 * 1024 * 1024;

const send = (res, code, body, type = 'text/plain; charset=utf-8') => {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(body);
};

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) {
        reject(Object.assign(new Error('too large'), { code: 413 }));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function serveFile(res, base, rel) {
  const full = path.resolve(base, rel);
  if (!full.startsWith(base + path.sep) || !fs.existsSync(full) || !fs.statSync(full).isFile()) return send(res, 404, 'Not found');
  send(res, 200, fs.readFileSync(full), MIME[path.extname(full)] || 'application/octet-stream');
}

function safeName(raw) {
  const base = path.basename(String(raw || '').replace(/\\/g, '/'));
  const clean = base.replace(/[^\w.\-]+/g, '_').replace(/^\.+/, '');
  return clean || 'file';
}

function uniqueName(name) {
  const ext = path.extname(name);
  const stem = name.slice(0, name.length - ext.length);
  let n = name;
  for (let i = 1; fs.existsSync(path.join(ASSETS, n)); i += 1) n = `${stem}-${i}${ext}`;
  return n;
}

function startServer(port) {
  const server = http.createServer(async (req, res) => {
    try {
      const host = (req.headers.host || '').replace(/:\d+$/, '');
      if (!['localhost', '127.0.0.1', '[::1]'].includes(host)) return send(res, 403, 'Forbidden');
      const url = new URL(req.url, 'http://localhost');
      const p = url.pathname;

      if (req.method !== 'GET' && req.method !== 'HEAD') {
        const origin = req.headers.origin;
        if (origin && new URL(origin).host !== req.headers.host) return send(res, 403, 'Forbidden');
      }

      if (req.method === 'GET') {
        if (p === '/') return serveFile(res, APP, 'index.html');
        if (p.startsWith('/app/')) return serveFile(res, APP, p.slice(5));
        if (p.startsWith('/lib/')) {
          const rel = p.slice(5);
          return LIB_OK.test(rel) ? serveFile(res, TOOL, rel) : send(res, 404, 'Not found');
        }
        if (p === '/api/state') {
          return send(res, 200, JSON.stringify({ answers: { ...readAnswers(L0.lang), lang: L0.lang }, languages: localeCodes() }), MIME['.json']);
        }
        return send(res, 404, 'Not found');
      }

      if (req.method === 'PUT' && p === '/api/answers') {
        const body = await readBody(req, MAX_JSON);
        const answers = normalize(JSON.parse(body.toString('utf8')), L0.lang);
        const L = await loadLocale(localeCodes().includes(answers.lang) ? answers.lang : L0.lang);
        writeAll(answers, L);
        return send(res, 200, '{"ok":true}', MIME['.json']);
      }

      if (req.method === 'PUT' && p === '/api/assets') {
        const body = await readBody(req, MAX_ASSET);
        fs.mkdirSync(ASSETS, { recursive: true });
        const name = uniqueName(safeName(url.searchParams.get('name')));
        fs.writeFileSync(path.join(ASSETS, name), body);
        return send(res, 200, JSON.stringify({ name }), MIME['.json']);
      }

      return send(res, 404, 'Not found');
    } catch (e) {
      send(res, e.code === 413 ? 413 : 400, e.code === 413 ? 'Too large' : 'Bad request');
    }
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE' && port < 4400) startServer(port + 1);
    else throw e;
  });
  server.listen(port, '127.0.0.1', () => {
    const url = `http://localhost:${port}/`;
    console.log(`Intake form: ${url}\nAnswers are saved in Docs/intake/ (ignored by git). Press Ctrl+C to stop.`);
    if (!flag('no-open')) openBrowser(url);
  });
}

function openBrowser(url) {
  const cmd = process.platform === 'win32' ? ['cmd', ['/c', 'start', '""', url]] : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
  try {
    spawn(cmd[0], cmd[1], { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
  } catch {
    /* the URL is printed anyway */
  }
}

startServer(Number(opt('port', 4321)));
