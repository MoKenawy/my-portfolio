// Structure of the intake questionnaires. No user-visible prose lives here:
// every string is looked up in locales/<lang>.mjs by id, so a new language
// only needs a new locale file.
//
// Locale key conventions (id = field/section/file id):
//   t.<file> / ti.<file>   file title / intro
//   s.<sec> / si.<sec>     section title (may contain {token}) / intro
//   f.<id> / h.<id>        field label / placeholder hint
//   o.<id>.<opt>           option label
//   c.<id>.<col>           table column header
//   r.<id>                 table rows (hints or presets), array of arrays
//   i.<id>.<item>          checklist item text (markdown allowed)
//   ui.*                   interface strings

const f = (id, type = 'text', o = {}) => ({ id, type, ...o });
const sec = (id, fields, o = {}) => ({ id, fields, ...o });

export const files = [
  {
    id: 'about', slug: '01-about-me', num: 1,
    sections: [
      sec('about.identity', [
        f('about.name', 'text', { required: true }),
        f('about.role', 'text', { required: true }),
        f('about.city'),
        f('about.description', 'textarea', { required: true }),
        f('about.languages'),
      ], { maps: ['site.name', 'role', 'location', 'description'] }),
      sec('about.experience', [
        f('about.years'),
        f('about.situation', 'choice', { options: ['employed', 'freelance', 'student', 'looking'], allowOther: true }),
        f('about.stack', 'textarea'),
      ]),
      sec('about.built', [f('about.built', 'list')]),
      sec('about.want', [
        f('about.readers', 'choice', { multiple: true, options: ['employers', 'clients', 'collaborators', 'students'], allowOther: true }),
        f('about.action', 'choice', { multiple: true, options: ['hire', 'write', 'read'], allowOther: true }),
        f('about.rates', 'textarea'),
        f('about.areas', 'textarea'),
        f('about.values', 'textarea'),
        f('about.focus', 'textarea'),
      ], { maps: ['site.hero', 'site.pitch'] }),
      sec('about.pitch', [
        f('about.promise', 'textarea'),
        f('about.problem', 'textarea'),
        f('about.solution', 'textarea'),
        f('about.evidence', 'textarea'),
      ], { maps: ['site.pitch'] }),
      sec('about.contact', [
        f('about.email', 'text', { required: true }),
        f('about.preferred', 'choice', { options: ['email', 'form', 'linkedin'], allowOther: true }),
        f('about.github'),
        f('about.linkedin'),
        f('about.otherlinks'),
        f('about.closing'),
      ], { maps: ['site.contact', 'site.socials'] }),
    ],
  },
  {
    id: 'timeline', slug: '02-timeline', num: 2,
    sections: [
      sec('tl.beginning', [
        f('tl.beginning.when'),
        f('tl.beginning.believed', 'textarea'),
        f('tl.beginning.corrected', 'textarea'),
      ]),
      sec('tl.period', [
        f('tl.period.when'),
        f('tl.period.title'),
        f('tl.period.what', 'textarea'),
        f('tl.period.built', 'textarea'),
        f('tl.period.cost', 'textarea'),
        f('tl.period.changed', 'textarea'),
      ], { repeat: true }),
      sec('tl.programmes', [
        f('tl.programmes', 'table', { columns: ['name', 'issuer', 'dates', 'came'], rows: 'hint' }),
      ]),
      sec('tl.thread', [f('tl.thread', 'list')]),
      sec('tl.quote', [f('tl.quote', 'text')], { maps: ['aboutQuote'] }),
      sec('tl.sidebar', [
        f('tl.reading'),
        f('tl.lesson'),
        f('tl.framing'),
      ], { maps: ['site.sidebar'] }),
      sec('tl.second', [f('tl.second', 'textarea')]),
    ],
  },
  {
    id: 'projects', slug: '03-projects', num: 3,
    sections: [
      sec('pr.project', [
        f('pr.name', 'text', { required: true }),
        f('pr.label'),
        f('pr.meta', 'textarea'),
        f('pr.tags'),
        f('pr.tools'),
        f('pr.card', 'heading'),
        f('pr.problem', 'textarea', { required: true }),
        f('pr.built', 'textarea', { required: true }),
        f('pr.proof', 'textarea', { required: true }),
        f('pr.longer', 'heading'),
        f('pr.insight', 'textarea'),
        f('pr.overview', 'textarea'),
        f('pr.evidence', 'heading'),
        f('pr.evidencetable', 'table', { columns: ['kind', 'file', 'caption', 'alt'], rows: 'preset', dataCols: [1, 2, 3], uploadCol: 1 }),
        f('pr.linksh', 'heading'),
        f('pr.links', 'table', { columns: ['name', 'url'], rows: 'hint' }),
        f('pr.public', 'choice', { required: true, options: ['yes', 'partly', 'no'] }),
        f('pr.redact', 'textarea'),
      ], { repeat: true, minBlocks: 1 }),
      sec('pr.featured', [
        f('pr.ftitle'),
        f('pr.ftitle2'),
        f('pr.fsub'),
        f('pr.fwhy', 'textarea'),
        f('pr.flink'),
        f('pr.fcta'),
      ], { maps: ['site.featured'] }),
      sec('pr.dnp', [f('pr.dnp', 'list')]),
    ],
  },
  {
    id: 'brand', slug: '04-brand-and-voice', num: 4,
    sections: [
      sec('br.audience', [
        f('br.audience', 'table', { required: true, columns: ['who', 'convinces', 'ends'], rows: 'hint' }),
      ]),
      sec('br.voice', [
        f('br.words', 'text', { required: true }),
        f('br.notwords'),
        f('br.person', 'choice', { options: ['i', 'we'], allowOther: true }),
        f('br.banned', 'textarea'),
        f('br.admire', 'textarea'),
      ]),
      sec('br.habits', [
        f('br.lessons', 'textarea'),
        f('br.numbers', 'textarea'),
        f('br.parallel', 'choice', { options: ['yes', 'no'] }),
        f('br.ai', 'textarea'),
        f('br.framing'),
      ]),
      sec('br.proof', [
        f('br.prooftable', 'table', { columns: ['evidence', 'where', 'public'], rows: 'preset', dataCols: [1, 2] }),
      ]),
      sec('br.precheck', [
        f('br.precheck', 'checklist', { items: ['employer', 'private', 'claims', 'alt', 'aloud'] }),
      ]),
    ],
  },
  {
    id: 'look', slug: '05-look-and-structure', num: 5,
    sections: [
      sec('lk.pages', [
        f('lk.pagetable', 'table', { columns: ['label', 'sub', 'holds', 'primary'], rows: 'preset' }),
        f('lk.main'),
        f('lk.contactpage', 'choice', { options: ['email', 'page'], default: 'email' }),
      ], { maps: ['site.nav'] }),
      sec('lk.colour', [
        f('lk.mode', 'choice', { options: ['dark', 'light'], default: 'dark' }),
        f('lk.accent', 'choice', { options: ['keep', 'none'], default: 'keep', allowOther: true }),
        f('lk.avoid', 'textarea'),
      ], { maps: ['globals.css'] }),
      sec('lk.type', [
        f('lk.fonts', 'choice', { options: ['keep'], default: 'keep', allowOther: true }),
        f('lk.languages', 'choice', { options: ['en'], default: 'en', allowOther: true }),
        f('lk.rtl', 'choice', { options: ['no', 'yes'], default: 'no' }),
        f('lk.rtlwhere'),
      ], { maps: ['src/app/fonts/manuscript.ts'] }),
      sec('lk.feel', [
        f('lk.sites', 'textarea'),
        f('lk.dont', 'textarea'),
        f('lk.imagery', 'choice', { options: ['real', 'illustrations'], default: 'real' }),
        f('lk.photos', 'choice', { options: ['bw', 'colour'], default: 'bw' }),
      ]),
      sec('lk.logo', [
        f('lk.havelogo', 'choice', { options: ['svg', 'initials'] }),
        f('lk.initials'),
      ]),
      sec('lk.hosting', [
        f('lk.where', 'choice', { required: true, options: ['pages'], default: 'pages', allowOther: true }),
        f('lk.domain', 'text', { required: true }),
        f('lk.repo', 'text', { required: true }),
        f('lk.media', 'choice', { options: ['repo', 'cdn'], default: 'repo', allowOther: true }),
      ]),
    ],
  },
  {
    id: 'assets', slug: '06-assets', num: 6,
    sections: [
      sec('as.required', [
        f('as.required', 'checklist', { items: ['logo', 'portrait', 'favicon'], upload: true }),
      ]),
      sec('as.perproject', [
        f('as.perproject', 'checklist', { items: ['shots', 'recordings', 'captions'], upload: true }),
      ]),
      sec('as.optional', [
        f('as.optional', 'checklist', { items: ['cv', 'certs', 'teaching', 'specs'], upload: true }),
      ]),
      sec('as.rights', [
        f('as.rights', 'checklist', { items: ['own', 'consent', 'public'] }),
      ]),
    ],
  },
];

export const fileById = Object.fromEntries(files.map((x) => [x.id, x]));
export const sectionFields = (s) => s.fields.filter((x) => x.type !== 'heading');
