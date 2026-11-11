// The gate from .claude/skills/portfolio-intake/SKILL.md, driven by the
// `required` flags in schema.mjs. Isomorphic: used by the CLI and the form.

import { files } from './schema.mjs';
import { normalize, blocksOf, isFilled, str } from './render.mjs';

// -> [{ file, section, id, label, filled }]
export function gate(answersIn, L) {
  const a = normalize(answersIn, L.lang);
  const rows = [];
  for (const file of files) {
    for (const s of file.sections) {
      const req = s.fields.filter((f) => f.required);
      if (!req.length) continue;
      const skipped = a.skipped.includes(s.id);
      if (s.repeat) {
        // one block must satisfy every required field: report the best one
        const scored = blocksOf(a, s).map((b) => ({ b, n: req.filter((f) => isFilled(f, b)).length }));
        const best = scored.sort((x, y) => y.n - x.n)[0].b;
        req.forEach((f) => rows.push({ file: file.id, section: s.id, id: f.id, label: str(L, 'f.' + f.id), filled: !skipped && isFilled(f, best) }));
      } else {
        req.forEach((f) => rows.push({ file: file.id, section: s.id, id: f.id, label: str(L, 'f.' + f.id), filled: !skipped && isFilled(f, a.values) }));
      }
    }
  }
  return rows;
}

export const gatePasses = (rows) => rows.every((r) => r.filled);

// Fields answered / total in a file, for the progress count in the form.
export function progress(file, answersIn, L) {
  const a = normalize(answersIn, L.lang);
  let done = 0;
  let total = 0;
  for (const s of file.sections) {
    const stores = s.repeat ? blocksOf(a, s) : [a.values];
    const skipped = a.skipped.includes(s.id);
    for (const store of stores) {
      for (const f of s.fields) {
        if (f.type === 'heading') continue;
        total += 1;
        if (skipped || isFilled(f, store)) done += 1;
      }
    }
  }
  return { done, total };
}
