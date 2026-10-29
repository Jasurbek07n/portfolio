# Portfolio — Jasurbek Nematov

A three-language portfolio (Uzbek by default, plus Russian and English) built
to answer four questions about each project: what the problem was, what I
personally built, which part was genuinely hard, and where AI was used.

**Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 ·
static export, no server runtime, no client-side JavaScript of my own.

```bash
npm install
npm run dev        # http://localhost:3100
npm run build      # static export into out/
npm run preview    # serve the built out/ directory
npm run typecheck
npm run lint
```

---

## Deploying

**Vercel (the live site).** The repo is connected to a Vercel project, so every
push to `main` builds and deploys automatically. Nothing to configure: Vercel
detects Next.js, runs `npm run build`, and serves `out/`. There are no
environment variables.

`vercel.json` holds one rule — a redirect from `/` to `/uz/` — because
`output: "export"` means a `redirects()` block in `next.config.ts` is never
applied. `trailingSlash` deliberately lives only in `next.config.ts`; setting
it in both places is a documented way to fail the build.

**Netlify (or any static host).** Drag the `out/` folder on. Nothing to
configure there either — with one caveat worth knowing.

Next's export writes its RSC prefetch payloads as nested directories
(`uz/__next.$d$lang/__PAGE__.txt`) while the client requests them
dot-flattened (`/uz/__next.$d$lang.__PAGE__.txt`). Vercel maps between the
two; a plain file server does not, so on another host those requests 404.
Nothing breaks — every page is prerendered HTML, so navigation just falls
back to a normal page load — but the console is noisy and React can report a
hydration error on first load. `lab/serve.mjs` reproduces Vercel's mapping so
local QA matches production.

`npm run build` also writes two things into `out/` that make the root URL
work:

- `out/index.html` — a meta refresh to `/uz/`, which is what makes the folder
  work when opened straight from disk.
- `out/_redirects` — the same redirect as a real 302, which is what Netlify
  reads.

If the site is set to `noindex` (it is, see below) Netlify will still serve it
normally; the tag only keeps it out of search results.

---

## Where the content lives

Two files. Nothing is hardcoded in a component.

| File | Holds |
|---|---|
| `content/projects.ts` | Every project: context, what I built, the hard parts, stack, AI usage, known limits, screenshots |
| `content/site.ts` | Contact links, the hero copy, the "how I work with AI" section, the AI statement |

Every piece of text is a `Record<"uz" \| "ru" \| "en", string>`, so a missing
translation is a **TypeScript error**, not an empty paragraph on the page.
Run `npm run typecheck` after editing and it will tell you what you missed.

### Before you send this

Open `content/site.ts` and check `contact` at the top:

```ts
export const contact = {
  email: "data365.services@gmail.com",  // change if you want a different one
  telegram: "",                         // empty = hidden
  github: "https://github.com/Jasurbek07n",
  upwork: "",
  linkedin: "",
};
```

Any link left as `""` is hidden everywhere rather than rendered as a dead
row. Telegram, Upwork and LinkedIn are currently empty.

---

## Structure

```
app/
  globals.css                     design tokens, dark + light
  icon.svg                        favicon
  [lang]/
    layout.tsx                    THE root layout — <html lang> per language
    page.tsx                      hero, project index, how I work, contact
    projects/[slug]/page.tsx      the project detail page
components/chrome.tsx             top bar, language switcher, footer
content/projects.ts               all project content
content/site.ts                   everything else
lib/i18n.ts                       the three languages and the string types
scripts/postbuild.mjs             writes the root redirect into out/
public/screenshots/               17 WebP screenshots
public/fonts/                     self-hosted woff2
```

### Why the root layout is `app/[lang]/layout.tsx`

There is deliberately **no `app/layout.tsx`**. Every route lives under
`/[lang]`, which makes that the root layout, which is what lets `<html lang>`
be correct per language instead of being hardcoded once for all three. The
cost is that `/` has no page of its own, which is what `scripts/postbuild.mjs`
exists to fix.

---

## Notes on the implementation

- **No client-side JavaScript of mine.** There is no scroll animation and no
  interactive widget; the language switcher is three ordinary links. So there
  is no way for the page to render blank if a bundle fails.
- **Dark and light** both supported through `prefers-color-scheme`. Every
  colour is a custom property, and the measured contrast ratio is written next
  to each one in `globals.css`.
- **Contrast is tested, not assumed.** A Playwright harness walks every text
  node on every page in both themes, composites the foreground over the real
  painted background, and fails anything under WCAG AA. It caught the muted
  `--dim` token at 3.36:1.
- **Screenshots are WebP at 1600px**, 1.1 MB for all seventeen, down from
  15 MB of PNG. Each one carries explicit `width`/`height` so nothing shifts
  as they load.
- **Lazy images are verified** by scrolling the whole page in the harness and
  asserting every image actually decoded — a lazy image that never fires a
  request looks fine in a screenshot of the top of the page.
- **Fonts are self-hosted** and subset, so there is no request to Google and
  no layout shift. Manrope ships no Cyrillic in these subsets, so Russian
  falls through to the platform UI face rather than to a serif default.
- **The site is indexable.** The only `noindex` left is on the root redirect
  stub written by `scripts/postbuild.mjs`, which is a redirect rather than
  content and should not be indexed on its own; `/` sends crawlers to `/uz/`.

---

## A note on what is claimed here

Every factual claim on this site was checked against the repository it
describes before it was written. The figures under each project — lines of
code, table counts, endpoint counts, test counts — are counted, not estimated.

There are no invented metrics, no invented clients, no testimonials and no
outcome numbers that nobody measured. Each project also carries a **Known
limits** section naming what is actually missing from it, including the one
with no tests at all.
