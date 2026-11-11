// Shared by Node (server, CLI) and the browser form: no Node imports here.
//
// Answers shape (Docs/intake/answers.json):
//   { version: 1, lang: 'en',
//     values:  { [fieldId]: { value, source? } },          // non-repeating sections
//     blocks:  { [sectionId]: [ { [fieldId]: { value, source? } } ] }, // repeating sections
//     skipped: [sectionId] }
// Value by field type:
//   text/textarea/list  string            choice  'key' | 'other:text' (array when multiple)
//   table               string[][]        checklist { checked: {item: bool}, files: {item: string[]} }

import { files, sectionFields } from './schema.mjs';

export const emptyAnswers = (lang = 'en') => ({ version: 1, lang, values: {}, blocks: {}, skipped: [] });

export function normalize(a, lang = 'en') {
  const o = a && typeof a === 'object' ? a : {};
  return {
    version: 1,
    lang: typeof o.lang === 'string' ? o.lang : lang,
    values: o.values && typeof o.values === 'object' ? o.values : {},
    blocks: o.blocks && typeof o.blocks === 'object' ? o.blocks : {},
    skipped: Array.isArray(o.skipped) ? o.skipped : [],
  };
}

export const str = (L, key, fallback = '') => L.strings[key] ?? fallback;
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
export const ui = (L, key, vars = {}) => fill(str(L, 'ui.' + key, key), vars);

export const rowsOf = (L, field) => L.strings['r.' + field.id] || [];
export const isOther = (v) => typeof v === 'string' && v.startsWith('other:');

// The stored cell for a field, or undefined.
export const cellOf = (store, field) => (store ? store[field.id] : undefined);

export function valueOf(store, field) {
  const c = cellOf(store, field);
  if (c && c.value !== undefined) return c.value;
  if (field.type === 'choice' && field.default !== undefined) return field.multiple ? [field.default] : field.default;
  return undefined;
}

const nz = (s) => typeof s === 'string' && s.trim() !== '';
const rowHasData = (field, row) => {
  const cols = field.dataCols || field.columns.map((_, i) => i);
  return cols.some((i) => nz(row?.[i]));
};

export function isFilled(field, store) {
  const v = valueOf(store, field);
  switch (field.type) {
    case 'choice':
      return Array.isArray(v) ? v.some((x) => (isOther(x) ? nz(x.slice(6)) : nz(x))) : isOther(v) ? nz(v.slice(6)) : nz(v);
    case 'table':
      return Array.isArray(v) && v.some((r) => rowHasData(field, r));
    case 'list':
      return nz(v) && v.split('\n').some((l) => l.trim() !== '');
    case 'checklist':
      return !!v && Object.values(v.checked || {}).some(Boolean);
    case 'heading':
      return true;
    default:
      return nz(v);
  }
}

export const blocksOf = (answers, section) => {
  const b = answers.blocks[section.id];
  return Array.isArray(b) && b.length ? b : [{}];
};

// ---------- Markdown ----------

const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
const mapsText = (s) => (s.maps?.length ? ' (→ ' + s.maps.map((m) => '`' + m + '`').join(', ') + ')' : '');

function choiceLabel(L, field, key) {
  if (isOther(key)) return key.slice(6).trim();
  return str(L, `o.${field.id}.${key}`, key);
}

export function heading(L, section, store, blank) {
  const tpl = str(L, 's.' + section.id, section.id);
  return fill(tpl, Object.fromEntries(
    sectionFields(section).map((fl) => {
      const tok = fl.id.split('.').pop();
      const shown = blank ? `[${str(L, 'h.' + fl.id, '...')}]` : valueOf(store, fl) || `[${str(L, 'h.' + fl.id, '...')}]`;
      return [tok, shown];
    }),
  ));
}

function renderField(L, field, store, blank, required) {
  const label = str(L, 'f.' + field.id, field.id);
  const hint = str(L, 'h.' + field.id, '...');
  const c = cellOf(store, field);
  const src = !blank && c?.source ? ' ' + ui(L, 'fromConfirm', { source: c.source }) : '';
  const missing = required ? ui(L, 'todo') : ui(L, 'skipWord');
  const colon = /[?:]$/.test(label) ? "" : ":";
  const one = (value) => `- **${label}${colon}** ${value}`;

  switch (field.type) {
    case 'heading':
      return [`### ${label}`, ''];
    case 'text':
    case 'textarea': {
      if (blank) return [one(`[${hint}]`)];
      const v = valueOf(store, field);
      if (!nz(v)) return [one(missing)];
      const lines = v.trim().split(/\r?\n/);
      if (lines.length === 1) return [one(lines[0] + src)];
      return [`- **${label}${colon}**${src}`, ...lines.map((l) => '  ' + l)];
    }
    case 'list': {
      if (blank) return [`- [${hint}]`];
      if (!isFilled(field, store)) return [`- ${missing}`];
      const lines = valueOf(store, field).split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      return lines.map((l, i) => `- ${l.replace(/^[-*]\s+/, '')}${i === lines.length - 1 ? src : ''}`);
    }
    case 'choice': {
      const opts = field.options.map((o) => {
        const t = choiceLabel(L, field, o);
        return o === field.default ? `${t} (${ui(L, 'default')})` : t;
      });
      if (blank) {
        if (field.allowOther) opts.push(str(L, 'h.' + field.id, '...'));
        return [one(`[${opts.join(' / ')}]`)];
      }
      const v = valueOf(store, field);
      if (!isFilled(field, store)) return [one(missing)];
      const arr = Array.isArray(v) ? v : [v];
      return [one(arr.filter((x) => (isOther(x) ? nz(x.slice(6)) : nz(x))).map((x) => choiceLabel(L, field, x)).join(', ') + src)];
    }
    case 'table': {
      const head = '| ' + field.columns.map((k) => cell(str(L, `c.${field.id}.${k}`, k))).join(' | ') + ' |';
      const sep = '|' + field.columns.map(() => '---').join('|') + '|';
      let rows;
      if (blank) {
        const hints = rowsOf(L, field);
        const base = field.rows === 'preset' ? hints : hints.length ? hints : [[]];
        rows = base.map((r) => field.columns.map((_, i) => (r[i] !== undefined && r[i] !== '' ? (field.rows === 'preset' ? r[i] : `[${r[i]}]`) : '[...]')));
      } else {
        const v = valueOf(store, field);
        rows = (Array.isArray(v) ? v : []).filter((r) => rowHasData(field, r)).map((r) => field.columns.map((_, i) => r[i] ?? ''));
        if (!rows.length) return [required ? ui(L, 'todo') : ui(L, 'skipWord'), ''];
      }
      return [head, sep, ...rows.map((r) => '| ' + r.map(cell).join(' | ') + ' |'), ''];
    }
    case 'checklist': {
      const v = valueOf(store, field) || {};
      return field.items.map((it) => {
        const on = !blank && v.checked?.[it];
        const sent = !blank && v.files?.[it]?.length ? ` — ${ui(L, 'filesReceived')}: ${v.files[it].join(', ')}` : '';
        return `- [${on ? 'x' : ' '}] ${str(L, `i.${field.id}.${it}`, it)}${sent}`;
      });
    }
    default:
      return [];
  }
}

function renderSection(L, section, answers, blank) {
  const out = [];
  const skipped = !blank && answers.skipped.includes(section.id);
  const blocks = section.repeat ? (blank ? [{}] : blocksOf(answers, section)) : [answers.values];
  blocks.forEach((store) => {
    out.push(`## ${heading(L, section, store, blank)}${mapsText(section)}`, '');
    const intro = L.strings['si.' + section.id];
    if (intro) out.push(intro, '');
    if (skipped) {
      out.push(ui(L, 'skipWord'), '');
      return;
    }
    let prevList = false;
    section.fields.forEach((fl) => {
      const lines = renderField(L, fl, store, blank, !!fl.required);
      const isLine = fl.type !== 'heading' && fl.type !== 'table';
      if (!isLine && prevList) out.push('');
      out.push(...lines);
      prevList = isLine;
    });
    if (prevList) out.push('');
  });
  return out;
}

export function renderFile(file, answers, L, { blank = false } = {}) {
  const a = normalize(answers, L.lang);
  const out = [];
  const note = blank ? ui(L, 'generated', { lang: L.lang }) : ui(L, 'filledNote');
  out.push(`<!-- ${note} -->`, '');
  out.push(`# ${file.num}. ${str(L, 't.' + file.id, file.id)}`, '');
  const intro = L.strings['ti.' + file.id];
  if (intro) out.push(intro, '');
  file.sections.forEach((s) => out.push(...renderSection(L, s, a, blank)));
  return out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\n+$/, '\n');
}

export const fileName = (file) => file.slug + '.md';
export { files };
