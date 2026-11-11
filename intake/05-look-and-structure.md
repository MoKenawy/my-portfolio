<!-- Generated from intake/tool/schema.mjs and intake/tool/locales/en.mjs. Edit those, not this file, then run `pnpm intake:templates`. -->

# 5. Look and structure

Defaults are given. Change only what you care about; "keep the default" is a fine answer.

## Pages and navigation (→ `site.nav`)

The starter has **Home** and **Projects**. Add pages only if you have real content for them.

| Label | Plain-word sub-label under it | Page holds | Primary? |
|---|---|---|---|
| Home | about | Your story and pitch | [...] |
| Projects | work | Your project index | yes |

- **Which page matters most? (It gets the heaviest nav weight):** [...]
- **Is there a contact page, or just an email link?** [email link (default) / page]

## Colour (→ `globals.css`)

Defaults: near-black ground, warm off-white text, one muted red accent used sparingly.

- **Default mode:** [dark (default) / light]
- **Keep the accent?** [yes (default) / none / change to #______]
- **Anything to avoid:** [...]

## Typography (→ `src/app/fonts/manuscript.ts`)

Defaults: Newsreader (serif for text), IBM Plex Mono (labels), IBM Plex Sans Arabic (Arabic text).

- **Keep the defaults?** [yes (default) / use: ______]
- **Languages on the site:** [English only (default) / English + ____]
- **Right-to-left text needed?** [no (default) / yes]
- **If yes, where:** [...]

## Look and feel

- **Three sites you like and what you like about each:** [...]
- **Three things you do not want:** [e.g. gradients, stock illustration, emoji, skill bars, rounded cards, a centred hero]
- **Imagery:** [real photographs and screenshots only (default) / illustrations allowed]
- **Photos: how should photographs look?** [black and white (default) / colour]

## Logo and favicon

- **Do you have a logo?** [yes, black on transparent (SVG) / no: use initials]
- **Initials for a monogram if none:** [...]

## Hosting

- **Where will it live?** [GitHub Pages (default) / other: ____]
- **Domain:** [username.github.io / custom domain ____]
- **Repository name (affects the URL on GitHub Pages project sites):** [...]
- **Large images or video:** [keep in the repo (default) / use an image CDN, say which / ...]
