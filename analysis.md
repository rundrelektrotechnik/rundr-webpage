# Legacy Website Analysis

> The full content captured from the live legacy site (company data, all four pages, privacy policy structure, images) is in [legacy.md](legacy.md). It supersedes the "Content Not Captured / Missing" list below for Kontakt, Datenschutz and Impressum.

## 1. Content Inventory

### Pages / URLs Present in Legacy Site

| Page | Legacy URL | Purpose | Notes |
|---|---|---|---|
| Home | `/home` | Main landing page | Contains company name, welcome text, phone contact, email contact, footer links. |
| Kontakt | `/kontakt` | Contact page | Linked from navigation and footer. Content not provided in extraction. |
| Datenschutz | `/datenschutz` | Privacy policy page | Linked from footer. Content not provided in extraction. |
| Impressum | `/impressum` | Legal notice / imprint page | Linked from footer. Content not provided in extraction. |

### Navigation / Header Content

| Element | Text / Content | Keep? | Notes |
|---|---|---|---|
| Site title / logo link | `R&R ELEKTROTECHNIK GMBH` | Yes | Company name and home link. |
| Primary navigation | `HOME` | Yes | Should become `/` in modern site. |
| Primary navigation | `KONTAKT` | Yes | Keep German label. |
| Mobile navigation | `More` | Optional | Google Sites mobile menu artifact. Not necessary in modern rebuild. |
| Mobile navigation duplicate | `HOME`, `KONTAKT` | Yes | Same links as desktop navigation. |
| Accessibility links | `Skip to main content`, `Skip to navigation` | Optional | Useful accessibility pattern, but not visible content. |
| Search UI | `Search this site` | No | Google Sites platform UI, not core site content. |
| Platform UI | `Page updated`, `Google Sites`, `Report abuse` | No | Platform chrome, not site content. |

### Home Page Content Blocks

| Section | Text / Content | Keep? | Notes |
|---|---|---|---|
| Main heading | `R&R ELEKTROTECHNIK GMBH` | Yes | Company name / main heading. |
| Welcome heading | `WILLKOMMEN` | Yes | German welcome heading. |
| Call-to-action heading | `GLEICH ANRUFEN` | Yes | Direct phone call CTA. |
| Phone contact | `PAUL REMPEL 0151-598 294 01` | Yes | Should be made clickable as `tel:` link. |
| Phone contact | `IVAN REMPEL 0177-360 82 40` | Yes | Should be made clickable as `tel:` link. |
| Email CTA heading | `ODER PER MAIL AN` | Yes | Email contact CTA. |
| Email address | `RUNDR.ELEKTROTECHNIK**@**GMAIL.COM` | Yes | Likely intended as `rundr.elektrotechnik@gmail.com`. The extraction contains formatting artifacts. |
| Embedded Files placeholder | `Embedded Files` | Yes / placeholder | Represents images, embeds, or media blocks whose actual content was not captured. |
| Empty heading placeholder | `#` | No | Appears to be an empty or broken heading artifact. |
| Empty section placeholders | Many `{}` and colon artifacts | No | Layout/platform artifacts, not user-facing content. |

### Footer Content

| Element | Text / Content | Keep? | Notes |
|---|---|---|---|
| Copyright | `© 2022 R&R Elektrotechnik GmbH created with Google.com` | Partially | Company copyright should be kept, but “created with Google.com” should be removed or replaced with neutral footer text. |
| Footer link | `HOME` | Yes | Same as primary navigation. |
| Footer link | `DATENSCHUTZ` | Yes | Privacy policy link. |
| Footer link | `IMPRESSUM` | Yes | Legal notice link. |

### Cookie Notice Content

| Element | Text / Content | Keep? | Notes |
|---|---|---|---|
| Cookie notice | `This site uses cookies from Google to deliver its services and to analyze traffic. Information about your use of this site is shared with Google. By using this site, you agree to its use of cookies.` | Optional | Google Sites cookie notice. May be replaced with proper cookie/privacy handling if needed. |
| Cookie link | `Learn more` | Optional | Google policy link. |
| Cookie button | `Got it` | Optional | Cookie consent button. |

### Text Blocks That Must Be Preserved

These are the main user-facing text blocks identified from the legacy content:

- `R&R ELEKTROTECHNIK GMBH`
- `HOME`
- `KONTAKT`
- `WILLKOMMEN`
- `GLEICH ANRUFEN`
- `PAUL REMPEL 0151-598 294 01`
- `IVAN REMPEL 0177-360 82 40`
- `ODER PER MAIL AN`
- `RUNDR.ELEKTROTECHNIK**@**GMAIL.COM`
- `© 2022 R&R Elektrotechnik GmbH`
- `DATENSCHUTZ`
- `IMPRESSUM`

### Content Not Captured / Missing

The provided extraction does not include the actual content of the linked pages:

- `/kontakt`
- `/datenschutz`
- `/impressum`

It also does not include:

- Actual image files or embedded media.
- CSS files.
- HTML source files.
- JavaScript files.
- Meta title, meta description, Open Graph data.
- Company address, postal address, tax details, register details, managing directors, or other Impressum details.
- Privacy policy details such as hosting provider, analytics tools, contact data processing, etc.

These missing items must be reviewed before rebuilding the site.

---

## 2. Structure Issues

### Legacy Platform / Extraction Issues

| Issue | Description | Impact |
|---|---|---|
| Google Sites extraction noise | The provided content contains many `{}`, colon separators, and layout artifacts. | These are not real user-facing content and should not be copied into the new site. |
| Empty placeholders | Several sections appear to contain empty headings or empty blocks. | May create broken layout, empty headings, or accessibility issues. |
| Embedded Files placeholder | `Embedded Files` appears without actual embedded content. | Images, maps, forms, or media may be missing from the extraction. |
| Platform chrome | `Search this site`, `Page updated`, `Google Sites`, `Report abuse` are Google Sites UI elements. | Should not be treated as website content. |
| Cookie notice | Google cookie notice is present. | May need replacement with proper privacy/cookie handling depending on legal requirements. |

### Semantic / HTML Issues

| Issue | Description | Impact |
|---|---|---|
| Unclear heading hierarchy | The extraction shows headings and empty headings without clear hierarchy. | Accessibility and SEO issues. |
| Empty heading | A heading appears as `#` with no visible text. | Bad accessibility and SEO signal. |
| No semantic structure visible | The extraction does not show proper `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>` structure. | Modern rebuild should use semantic HTML. |
| No visible alt text | Embedded images or media are not captured. | Accessibility and SEO issues. |
| No visible meta data | No page title, description, or structured data is visible. | SEO and social sharing issues. |

### Responsive / Layout Issues

| Issue | Description | Impact |
|---|---|---|
| Google Sites layout artifacts | The legacy page appears to rely on Google Sites generated layout blocks. | Hard to maintain and not fully custom responsive. |
| Unknown breakpoints | No CSS or responsive behavior was provided. | Cannot confirm mobile/table/desktop behavior. |
| Embedded media unknown | Embedded files/images are not captured. | Responsive image behavior cannot be verified. |
| Mobile menu artifact | `More` appears as a Google Sites mobile menu pattern. | Modern rebuild should use a clearer mobile navigation pattern. |

### Content / UX Issues

| Issue | Description | Impact |
|---|---|---|
| Very minimal content | The home page contains only company name, welcome heading, phone numbers, and email. | May not communicate services, value proposition, or trust signals. |
| Phone numbers not clearly clickable | Phone numbers are shown as text. | Mobile users expect tap-to-call links. |
| Email formatting artifact | Email appears as `RUNDR.ELEKTROTECHNIK**@**GMAIL.COM`. | Should be normalized to a clean clickable email link. |
| Outdated copyright | Copyright says `© 2022`. | May look outdated. |
| Google Sites branding | Footer says `created with Google.com`. | Unnecessary platform branding. |
| Missing legal content | Datenschutz and Impressum pages are linked but not provided. | Legal pages must be reviewed and completed. |
| Missing company details | No address, company registration, managing directors, or service description visible. | May be insufficient for Impressum and trust. |

### Accessibility Issues

| Issue | Description | Impact |
|---|---|---|
| Skip links present but unclear | `Skip to main content` and `Skip to navigation` appear, but target structure is unclear. | Useful, but needs proper semantic targets. |
| Empty headings | Empty heading placeholders may confuse screen readers. | Accessibility issue. |
| Unknown contrast | CSS not provided. | Cannot verify contrast compliance. |
| Unknown focus states | CSS not provided. | Cannot verify keyboard accessibility. |
| Unknown image alt text | Embedded media not captured. | Accessibility issue. |

### SEO Issues

| Issue | Description | Impact |
|---|---|---|
| No visible meta description | Not captured. | Poor search result control. |
| No visible structured data | Not captured. | Missing local business / organization signals. |
| Minimal page content | Home page has very little descriptive content. | Weak SEO relevance. |
| No visible image alt text | Embedded media not captured. | Missing image SEO and accessibility. |
| `/home` URL | Legacy uses `/home`. | Modern site should use `/` and redirect `/home` to `/`. |

---

## 3. Information Architecture

### Proposed Modern Sitemap

