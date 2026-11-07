# Architecture – R&R Elektrotechnik GmbH website

Static, German-language company website (electrical contractor, Erbach, Hessen), rebuilt from a Google Sites page.
Live domain: `https://www.r-r.gmbh`. Built with **Eleventy 3 (Nunjucks) + Tailwind CSS 3**, deployed via **GitHub Actions**.
Customer-editable content lives in YAML files; the customer is non-technical and edits on github.com.

## Quick start

```bash
npm install
npm start            # validate + build, then serve at localhost:8080 with live reload
npm run build        # validate + build to _site/ (what CI deploys)
npm run validate     # only check content/*.yml (plain-German errors)
npm run preview      # offline ZIP for the customer: _preview/rr-website-vorschau-<date>.zip
npm run assets       # regenerate favicon PNGs + Open Graph image from src/favicon.svg + src/logo.svg
```

Node 22 in CI (local: any current Node). Open `_site/index.html` directly will look broken (root-absolute paths) – use `npm start` or `npm run preview`.

## Repository layout

```
content/                 Customer-editable data (see "Content model")
  firma.yml              Company data: name, address, phones, e-mail, register, USt-ID
  startseite.yml         Home page texts
  leistungen.yml         Intro + the 7 services (title, text, photo name, alt text)
  kontakt.yml            Contact page texts + 3 process steps
  bilder/                Source images for the services (+ CREDITS.md; Unsplash photos, smart-home/wallboxen are illustrations from scripts/generate-service-images.mjs)
  ANLEITUNG.md           German guide for the customer (how to edit, what errors mean)
src/                     Eleventy input
  _includes/layouts/base.njk      <head> (SEO, Open Graph, JSON-LD), skip link, header, main, footer, scripts
  _includes/partials/header.njk   Sticky nav + mobile menu panel
  _includes/partials/footer.njk   Address, contacts, legal links (reads firma.yml)
  _data/site.json        Technical settings only: url, locale, themeColor, ogImage, region, country
  src.json               Directory data: layout + permalink "{{ page.filePathStem }}.html" (flat .html URLs)
  index.html, leistungen.html, kontakt.html   Pages built from content/*.yml
  impressum.html, datenschutz.html            Legal pages: static text, company data from firma.yml
  404.html               Not-found page (noindex)
  sitemap.njk, robots.njk  Generated /sitemap.xml and /robots.txt
  css/input.css          Tailwind entry; js/menu.js (mobile menu), js/contact.js (mailto form)
  logo.svg (traced from the customer logo; used for the share image), logo-mark.svg (only the "R&R" mark, used in the header next to the text "Elektrotechnik GmbH"), favicon.svg, favicon-32.png, apple-touch-icon.png, images/og-image.png   Brand assets
scripts/
  load-content.js        Loads/parses content/*.yml (shared by build and validator)
  validate-content.mjs   Required fields, formats, photo existence, alt texts; German messages;
                         emits GitHub Actions annotations
  build-preview.mjs      Offline preview ZIP (see below)
  generate-assets.mjs    Renders PNG icons + share image from the SVG logo via sharp
eleventy.config.js       Global data, `tel` filter, passthrough copies, photo resize step, preview transform
tailwind.config.js       Scans src/**/*.{html,njk,js}
.github/workflows/deploy.yml   build (validate + build + upload) on push/PR; deploy job on main
```

Output: `_site/` (git-ignored). Preview output: `_preview/` (git-ignored).

## Build pipeline

1. `npm run build` = `validate` → `eleventy` → `tailwindcss` (CSS goes to `_site/css/style.css`).
2. **Validation first**: a content mistake fails the build before anything is published (live site stays unchanged).
3. Eleventy exposes `firma`, `startseite`, `leistungen`, `kontakt` (from YAML) and `buildYear` as global data.
   `loadContent()` is a function, so edits are picked up on every rebuild/watch.
4. `eleventy.after` event: every image in `content/bilder/` (jpg/jpeg/png/webp) is resized with sharp to 900×600 JPEG into
   `<output>/images/leistungen/<name>.jpg`. YAML refers to photos by name **without extension**.
5. Page `<title>`/description for index/leistungen/kontakt/impressum/datenschutz come from YAML via `eleventyComputed`
   (values use `| safe` because the layout escapes once).
6. `SITE_OUTPUT` env var changes the output folder (used only by the preview build).

## Content model (what the customer may change)

- `firma.yml` is the single source of truth for contact/legal data; footer, header name, Kontakt, Impressum, Datenschutz
  and the JSON-LD (`Electrician`) read it. Phone numbers are written naturally (`0151 598 294 01`); the `tel` filter builds
  `+49…` links. Optional `einsatzgebiet` / `oeffnungszeiten` render a box on Kontakt only when non-empty.
- Rules for the customer: all texts in double quotes, keep indentation (documented in `content/ANLEITUNG.md`).
- Adding a required field = add it to the YAML, the template, **and** `scripts/validate-content.mjs`.
- Not customer-editable on purpose: layout, legal texts (Impressum/Datenschutz wording), SEO plumbing.

## Preview build (`npm run preview`)

For sending to the customer, who has no Node/server. Sets `PREVIEW=1` and `SITE_OUTPUT=_preview/rr-website-vorschau`:
an Eleventy transform rewrites root-absolute `href/src` (`/x.html`, `/`) to relative (`x.html`, `index.html`; works because all
pages are flat in the output root) and injects a "Vorschau – noch nicht veröffentlicht" label; a German `LIES-MICH.txt` is
added and everything is zipped (adm-zip). **Never used for deployment.** Normal builds keep root-absolute paths
(required so `404.html` works at any URL depth; production is served from the domain root).

## Design and technical conventions

- Brief (original): trustworthy, precise, corporate-modern; navy/slate primary (`slate-900/950`), amber accent
  (`amber-400`) for CTAs, blue for links, light-gray/white sections; sans-serif system stack; mobile-first, semantic HTML5,
  accessible (skip link, labels, aria, focus rings), English code comments, German user-facing text.
- Page pattern: dark hero (`bg-slate-900`) → `bg-slate-50` section with white rounded cards → optional dark CTA band.
  Avoid duplicating the same visual block across pages (home teaser = image tiles, Leistungen = full cards,
  Kontakt = contact cards).
- Internal links are root-absolute (`/leistungen.html`); service cards have ids (`/leistungen.html#<photo-name>`).
- No cookies, no analytics, no third-party requests (no CDN, fonts, embedded maps). Map = plain OpenStreetMap link.
  If any tracker/embed is added, update `src/datenschutz.html` and consider consent handling.
- Contact form = `mailto:` builder (`js/contact.js`); nothing is sent through the site. Privacy text matches this.
- Decorative home-page tile images use `alt=""`; Leistungen images carry German alt texts (required by the validator).
- SEO: canonical per page (home = `/`), Open Graph/Twitter cards (`images/og-image.png`, 1200×630), `Electrician` JSON-LD on home,
  sitemap + robots. 404 is `noindex` and excluded from the sitemap.
- Files use LF in the repo; git on Windows warns about CRLF – harmless.

## Deployment

`.github/workflows/deploy.yml`: on push/PR runs `npm ci` + `npm run build`; on push to `main` deploys `_site`
(job uses GitHub Pages actions – **replace the `deploy` job if hosting differs**; the build job stays).
Local branch is currently named `master` but the workflow triggers on `main`.

## Background (legacy site)

Old site: Google Sites at `www.r-r.gmbh` with pages `/home`, `/kontakt`, `/datenschutz`, `/impressum`; home page was only a
welcome heading, the two managing directors' phone numbers, the e-mail address and 8 images (these correspond to the 8 services
now on the Leistungen page). All company data was carried over into `content/firma.yml`. The detailed analysis notes were in
`analysis.md`, `legacy.md` and `GOAL.md`, since removed from the tree; retrieve them with
`git show 99c76e7:legacy.md` / `git log --diff-filter=D -- analysis.md GOAL.md`.

## Decisions worth knowing

- Eleventy over web components: pre-rendered HTML for SEO/no-JS; shared header/footer defined once.
- Tailwind via CLI build (not the CDN script) so production CSS is small (~15 KB).
- Flat `.html` URLs (e.g. `/kontakt.html`) were kept to match earlier links; add redirects for old URLs (`/home`, `/kontakt`, …) at the host.
- Impressum uses current law references (DDG, MStV); the discontinued EU ODR platform link was removed.
- Stock photos are from Unsplash (free commercial use); see `content/bilder/CREDITS.md`. Smart Home photo shows a Nest thermostat.

## Open items / to confirm with the customer

- Hosting provider is Squarespace (named in `datenschutz.html`, section 3); if the CI `deploy` job still targets GitHub Pages, adjust it. Datenschutz states the mailbox is Google (Gmail) – confirm.
- Legal pages (Impressum, Datenschutz) are drafts: have a lawyer or generator review them before launch.
- Draft marketing copy to approve: "Warum R&R" points, service descriptions, Kontakt process steps.
- Missing content (do not invent): customer reviews/ratings, reference projects, service area, opening hours, certifications, founding year.
- Deploy target/branch/`CNAME` for the custom domain, redirects from legacy URLs.
- Possible next steps: form-based CMS (e.g. Pages CMS) on top of `content/*.yml`; real photos of the team/projects.
