// The intake form. All prose comes from the locale; this file has no user-visible strings.
import { files } from '/lib/schema.mjs';
import { renderFile, str, ui, valueOf, cellOf, blocksOf, rowsOf, isOther, heading } from '/lib/render.mjs';
import { gate, gatePasses, progress } from '/lib/gate.mjs';

let answers;
let L;
let current = files[0].id;
let preview = false;
let saveTimer = null;

// ---------- tiny DOM helper ----------
function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'class') el.className = v;
    else if (k === 'value') el.value = v;
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  for (const kid of kids.flat()) if (kid !== null && kid !== undefined && kid !== false) el.append(kid.nodeType ? kid : document.createTextNode(kid));
  return el;
}

// **bold** and `code` only.
function inline(text) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((p) => {
    if (p.startsWith('`')) return h('code', {}, p.slice(1, -1));
    if (p.startsWith('**')) return h('strong', {}, p.slice(2, -2));
    return p;
  });
}

const hintOf = (f) => {
  const s = str(L, 'h.' + f.id, '');
  return s === '...' ? '' : s;
};

// ---------- state ----------
function setCell(store, field, value) {
  store[field.id] = { value }; // editing counts as confirming: the source marker is dropped
  changed();
}

function newTable(field) {
  const hints = rowsOf(L, field);
  const width = field.columns.length;
  const pad = (r) => Array.from({ length: width }, (_, i) => r[i] ?? '');
  if (field.rows === 'preset') return hints.map(pad);
  return Array.from({ length: Math.max(hints.length, 1) }, () => pad([]));
}

function initStore(section, store) {
  for (const f of section.fields) if (f.type === 'table' && !store[f.id]) store[f.id] = { value: newTable(f) };
}

function ensureDefaults() {
  for (const file of files) {
    for (const s of file.sections) {
      if (s.repeat) {
        if (!Array.isArray(answers.blocks[s.id]) || !answers.blocks[s.id].length) answers.blocks[s.id] = [{}];
        answers.blocks[s.id].forEach((b) => initStore(s, b));
      } else initStore(s, answers.values);
    }
  }
}

function changed() {
  setStatus('saving');
  clearTimeout(saveTimer);
  saveTimer = setTimeout(save, 450);
  renderRail();
}

// Saves run one after another so an older request can never land after a newer one.
let saving = Promise.resolve();
function save({ keepalive = false } = {}) {
  clearTimeout(saveTimer);
  saveTimer = null;
  saving = saving.then(async () => {
    try {
      const r = await fetch('/api/answers', { method: 'PUT', body: JSON.stringify(answers), keepalive });
      setStatus(r.ok ? 'saved' : 'error');
    } catch {
      setStatus('error');
    }
  });
  return saving;
}

// Write any pending change now: when leaving a field, switching file, or closing the tab.
function flush(opts) {
  if (saveTimer) save(opts);
}
document.addEventListener('focusout', () => flush());
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush({ keepalive: true }); });
window.addEventListener('pagehide', () => flush({ keepalive: true }));

function setStatus(kind) {
  const el = document.getElementById('status');
  if (!el) return;
  el.className = 'status' + (kind === 'error' ? ' error' : '');
  el.textContent = kind === 'saving' ? ui(L, 'saving') : kind === 'saved' ? ui(L, 'saved') : ui(L, 'saveError');
}

async function upload(file) {
  const r = await fetch('/api/assets?name=' + encodeURIComponent(file.name), { method: 'PUT', body: file });
  if (!r.ok) throw new Error('upload failed');
  return (await r.json()).name;
}

// ---------- field widgets ----------
function labelFor(f, store) {
  const c = cellOf(store, f);
  return h('div', { class: 'label' }, str(L, 'f.' + f.id, f.id), f.required ? h('span', { class: 'req' }, ui(L, 'required')) : null, c?.source ? badge(f, store) : null);
}

function badge(f, store) {
  const c = cellOf(store, f);
  return h('span', { class: 'badge' }, ui(L, 'fromSource', { source: c.source }), h('button', { type: 'button', onclick: () => { delete c.source; changed(); renderMain(); } }, ui(L, 'confirm')));
}

function textWidget(f, store) {
  const v = valueOf(store, f) ?? '';
  if (f.type === 'text') return h('input', { type: 'text', value: v, placeholder: hintOf(f), oninput: (e) => setCell(store, f, e.target.value) });
  return h('textarea', { rows: f.type === 'list' ? 4 : 3, placeholder: hintOf(f), oninput: (e) => setCell(store, f, e.target.value) }, v);
}

function choiceWidget(f, store) {
  const cur = valueOf(store, f);
  const sel = f.multiple ? (Array.isArray(cur) ? cur : cur ? [cur] : []) : [cur];
  const otherSel = sel.find((x) => isOther(x));
  const kind = f.multiple ? 'checkbox' : 'radio';
  const name = 'c-' + f.id + '-' + Math.random().toString(36).slice(2, 6);
  const write = (arr) => setCell(store, f, f.multiple ? arr : arr[0] ?? '');
  const isDefault = (o) => o === f.default;

  const opts = f.options.map((o) =>
    h('label', {}, h('input', {
      type: kind, name, checked: sel.includes(o),
      onchange: (e) => {
        if (f.multiple) write(e.target.checked ? [...sel.filter((x) => x !== o), o] : sel.filter((x) => x !== o));
        else write([o]);
        renderMain();
      },
    }), str(L, `o.${f.id}.${o}`, o), isDefault(o) ? h('span', { class: 'opt' }, ui(L, 'default')) : null),
  );

  if (f.allowOther) {
    const text = otherSel ? otherSel.slice(6) : '';
    const on = otherSel !== undefined;
    const input = h('input', {
      type: 'text', class: 'other', value: text, placeholder: hintOf(f) || ui(L, 'other'), disabled: !on,
      oninput: (e) => write(f.multiple ? [...sel.filter((x) => !isOther(x)), 'other:' + e.target.value] : ['other:' + e.target.value]),
    });
    opts.push(h('label', {}, h('input', {
      type: kind, name, checked: on,
      onchange: (e) => {
        if (f.multiple) write(e.target.checked ? [...sel, 'other:'] : sel.filter((x) => !isOther(x)));
        else write(['other:']);
        renderMain();
      },
    }), ui(L, 'other')), input);
  }
  return h('div', { class: 'choices' }, opts);
}

function tableWidget(f, store) {
  const rows = valueOf(store, f) || [];
  const hints = f.rows === 'hint' ? rowsOf(L, f) : [];
  const head = h('tr', {}, f.columns.map((k) => h('th', {}, str(L, `c.${f.id}.${k}`, k))), h('th', {}));
  const body = rows.map((row, ri) =>
    h('tr', {}, f.columns.map((_, ci) => {
      const input = h('input', {
        type: 'text', value: row[ci] ?? '', placeholder: ci === 0 ? hints[ri]?.[0] ?? '' : hints[ri]?.[ci] ?? '',
        oninput: (e) => { row[ci] = e.target.value; setCell(store, f, rows); },
      });
      const up = f.uploadCol === ci
        ? h('label', { class: 'upload' }, ui(L, 'upload'), h('input', {
          type: 'file',
          onchange: async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            try { row[ci] = await upload(file); setCell(store, f, rows); renderMain(); } catch { setStatus('error'); }
          },
        }))
        : null;
      return h('td', {}, h('div', { class: 'cellwrap' }, input, up));
    }), h('td', { class: 'act' }, h('button', { type: 'button', class: 'btn danger', title: ui(L, 'removeRow'), 'aria-label': ui(L, 'removeRow'), onclick: () => { rows.splice(ri, 1); setCell(store, f, rows); renderMain(); } }, '×'))),
  );
  return h('div', {}, h('div', { class: 'tablewrap' }, h('table', {}, h('thead', {}, head), h('tbody', {}, body))),
    h('button', { type: 'button', class: 'btn', onclick: () => { rows.push(f.columns.map(() => '')); setCell(store, f, rows); renderMain(); } }, '+ ' + ui(L, 'addRow')));
}

function checklistWidget(f, store) {
  const v = valueOf(store, f) || { checked: {}, files: {} };
  v.checked = v.checked || {};
  v.files = v.files || {};
  const write = () => setCell(store, f, v);
  return h('ul', { class: 'checklist' }, f.items.map((it) => h('li', {},
    h('label', {}, h('input', { type: 'checkbox', checked: !!v.checked[it], onchange: (e) => { v.checked[it] = e.target.checked; write(); } }), h('span', {}, inline(str(L, `i.${f.id}.${it}`, it)))),
    f.upload
      ? h('div', { class: 'sent' },
        h('label', { class: 'upload' }, ui(L, 'upload'), h('input', {
          type: 'file', multiple: true,
          onchange: async (e) => {
            try {
              for (const file of e.target.files) { (v.files[it] = v.files[it] || []).push(await upload(file)); }
              v.checked[it] = true; write(); renderMain();
            } catch { setStatus('error'); }
          },
        })),
        v.files[it]?.length ? ` ${ui(L, 'filesReceived')}: ${v.files[it].join(', ')}` : '')
      : null)));
}

function fieldNode(f, store) {
  if (f.type === 'heading') return h('h4', { class: 'sub' }, str(L, 'f.' + f.id, f.id));
  const widget = { text: textWidget, textarea: textWidget, list: textWidget, choice: choiceWidget, table: tableWidget, checklist: checklistWidget }[f.type](f, store);
  const inputId = 'f-' + f.id;
  if (widget.tagName === 'INPUT' || widget.tagName === 'TEXTAREA') widget.id = inputId;
  const useLabel = f.type === 'text' || f.type === 'textarea' || f.type === 'list';
  return h('div', { class: 'field' },
    useLabel ? h('label', { for: inputId }, str(L, 'f.' + f.id, f.id), f.required ? h('span', { class: 'req' }, ui(L, 'required')) : null, cellOf(store, f)?.source ? badge(f, store) : null) : labelFor(f, store),
    widget);
}

// ---------- sections ----------
function sectionNode(s) {
  const skipped = answers.skipped.includes(s.id);
  const canSkip = !s.fields.some((f) => f.required);
  const card = h('section', { class: 'card', id: 's-' + s.id });
  const intro = L.strings['si.' + s.id];
  const titleOf = (store) => heading(L, s, store, false);

  if (!s.repeat) card.append(h('h3', {}, titleOf(answers.values)));
  if (s.maps?.length) card.append(h('p', { class: 'maps' }, s.maps.map((m) => h('code', {}, m))));
  if (intro) card.append(h('p', { class: 'intro' }, inline(intro)));

  if (skipped) card.append(h('p', { class: 'skipped' }, ui(L, 'skipped')));
  else if (s.repeat) {
    const list = answers.blocks[s.id];
    list.forEach((store, i) => {
      const block = h('div', { class: 'block' },
        h('div', { class: 'blockhead' }, h('h4', {}, titleOf(store)), list.length > 1 ? h('button', { type: 'button', class: 'btn danger', onclick: () => { list.splice(i, 1); changed(); renderMain(); } }, ui(L, 'removeBlock')) : null));
      s.fields.forEach((f) => block.append(fieldNode(f, store)));
      card.append(block);
    });
    card.append(h('button', { type: 'button', class: 'btn', onclick: () => { const b = {}; initStore(s, b); list.push(b); changed(); renderMain(); } }, '+ ' + ui(L, 'addBlock')));
  } else s.fields.forEach((f) => card.append(fieldNode(f, answers.values)));

  if (canSkip) {
    card.append(h('div', { class: 'skipbar' }, h('label', {}, h('input', {
      type: 'checkbox', checked: skipped,
      onchange: (e) => { answers.skipped = answers.skipped.filter((x) => x !== s.id); if (e.target.checked) answers.skipped.push(s.id); changed(); renderMain(); },
    }), ui(L, 'skip'))));
  }
  return card;
}

// ---------- layout ----------
function renderRail() {
  const rail = document.getElementById('rail');
  const rows = gate(answers, L);
  const missing = rows.filter((r) => !r.filled);
  const status = document.getElementById('status')?.textContent ?? '';
  const statusClass = document.getElementById('status')?.className ?? 'status';
  rail.replaceChildren(
    h('h1', {}, ui(L, 'title')),
    h('p', { class: 'note' }, ui(L, 'private')),
    h('h2', {}, ui(L, 'files')),
    h('ul', { class: 'files' }, files.map((f) => {
      const p = progress(f, answers, L);
      return h('li', {}, h('button', { type: 'button', 'aria-current': String(f.id === current), onclick: () => go(f.id) },
        h('span', {}, `${f.num}. ${str(L, 't.' + f.id)}`), h('span', { class: 'count' }, ui(L, 'progress', { done: p.done, total: p.total }))));
    })),
    h('h2', {}, ui(L, 'gate')),
    h('div', { class: 'gate' }, gatePasses(rows)
      ? h('div', { class: 'pass' }, ui(L, 'gatePass'))
      : h('div', {}, ui(L, 'gateFail'), h('ul', {}, missing.map((m) => h('li', {}, h('button', { type: 'button', onclick: () => go(m.file, 's-' + m.section) }, m.label)))))),
    h('div', { id: 'status', class: statusClass }, status),
  );
}

function go(id, anchor) {
  current = id;
  preview = false;
  renderRail();
  renderMain();
  if (anchor) document.getElementById(anchor)?.scrollIntoView({ block: 'start' });
  else window.scrollTo(0, 0);
}

function renderMain() {
  const main = document.getElementById('main');
  const file = files.find((x) => x.id === current);
  const idx = files.indexOf(file);
  const kids = [h('h2', { class: 'file' }, `${file.num}. ${str(L, 't.' + file.id)}`)];
  const intro = L.strings['ti.' + file.id];
  if (intro) kids.push(h('p', { class: 'intro' }, intro));
  kids.push(h('div', { class: 'toolbar' }, h('button', { type: 'button', class: 'btn', onclick: () => { preview = !preview; renderMain(); } }, preview ? ui(L, 'form') : ui(L, 'preview'))));

  if (preview) kids.push(h('pre', { class: 'preview' }, renderFile(file, answers, L)));
  else file.sections.forEach((s) => kids.push(sectionNode(s)));

  kids.push(h('div', { class: 'pager' },
    idx > 0 ? h('button', { type: 'button', class: 'btn', onclick: () => go(files[idx - 1].id) }, ui(L, 'back')) : h('span'),
    idx < files.length - 1 ? h('button', { type: 'button', class: 'btn primary', onclick: () => go(files[idx + 1].id) }, ui(L, 'next')) : h('span')));
  main.replaceChildren(...kids);
}

// ---------- boot ----------
async function boot() {
  const state = await (await fetch('/api/state')).json();
  answers = state.answers;
  L = (await import(`/lib/locales/${answers.lang}.mjs`)).default;
  document.documentElement.lang = L.lang;
  document.documentElement.dir = L.dir;
  document.title = ui(L, 'title');
  ensureDefaults();
  renderRail();
  renderMain();
  save();
}

boot().catch((e) => {
  document.getElementById('main').textContent = 'Could not start the form: ' + e.message;
});
