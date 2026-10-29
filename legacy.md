# Legacy Website – Captured Information

Source: https://www.r-r.gmbh/ (Google Sites), fetched 2026-10-29. Complements [analysis.md](analysis.md).

## 1. Site Overview

| Item | Value |
|---|---|
| Platform | Google Sites (custom domain `www.r-r.gmbh`) |
| Language | German |
| Pages | `/home`, `/kontakt`, `/datenschutz`, `/impressum` (4 pages) |
| Page title (`<title>`) | `R&R ELEKTROTECHNIK GMBH` (same on the home page; Kontakt: `R&R Elektrotechnik GmbH - Kontakt`) |
| Meta description | none |
| Open Graph | `og:title` = `R&R ELEKTROTECHNIK GMBH`, `og:type` = website, `og:url` = `https://www.r-r.gmbh/home`, `og:image` = first home-page image (1280 px wide) |
| Forms / maps / video | none (a contact form is mentioned in the privacy policy, but none exists on the site) |
| Analytics | none named; Google Sites cookie banner only |

## 2. Company Data (the authoritative facts)

| Item | Value | Found on |
|---|---|---|
| Company | R&R Elektrotechnik GmbH | all pages |
| Address | Lauerbacher Weg 19, 64711 Erbach | Kontakt, Impressum, Datenschutz |
| Managing directors | Paul Rempel, Ivan Rempel | Kontakt, Impressum |
| Phone Paul Rempel | 0151-598 294 01 | Home, Kontakt, Impressum |
| Phone Ivan Rempel | 0177-360 82 40 | Home, Kontakt, Impressum |
| E-mail | rundr.elektrotechnik@gmail.com | Home, Kontakt, Impressum, Datenschutz |
| Register court / number | Amtsgericht Darmstadt, HRB 103111 | Kontakt, Impressum |
| VAT ID (USt-ID) | DE350732918 | Kontakt, Impressum |
| Responsible for content | Ivan Rempel, same address | Impressum |

Phone numbers for `tel:` links (international format): `+4915159829401` (Paul), `+491773608240` (Ivan).

## 3. Page-by-Page Content

### Home (`/home`)

- Navigation: `HOME` (`/home`), `KONTAKT` (`/kontakt`); mobile dropdown `More` with the same two links.
- Contact block: `GLEICH ANRUFEN` → `PAUL REMPEL 0151-598 294 01`, `IVAN REMPEL 0177-360 82 40` → `ODER PER MAIL AN` → `RUNDR.ELEKTROTECHNIK@GMAIL.COM`.
- Main section: heading `WILLKOMMEN`, followed by **8 images**. The first has alt text `Beratung`; the other seven have no alt text. All are hosted on `lh7-us.googleusercontent.com` (Google-hosted, not on the customer's domain).
- There is no running text: all services are communicated only through the images.
- Footer: `© 2022 R&R Elektrotechnik GmbH created with Google.com`, links `DATENSCHUTZ`, `IMPRESSUM`, `HOME`.

> The 8 images very likely correspond to the 8 services the customer named for the new Leistungen page (Beratung, Planung, PV-Anlagen, Elektro-Installation, Smart Home, SAT-Anlagen, Netzwerk, Glasfaser). This is an inference from the count and the first alt text `Beratung`; the images have not been viewed or downloaded yet.

### Kontakt (`/kontakt`)

Heading `KONTAKT`, then:

```
R&R Elektrotechnik GmbH
Lauerbacher Weg 19
64711 Erbach

Vertretungsberechtigte Geschäftsführer:
Paul Rempel: 0151-598 294 01
Ivan Rempel: 0177-360 82 40

E-Mail: rundr.elektrotechnik@gmail.com

Registergericht: Darmstadt HRB 103111
USt-ID: DE350732918
```

No form, map or images.

### Impressum (`/impressum`)

Same company, address, managing directors, phone numbers, e-mail, register court, HRB and USt-ID as above, plus "inhaltlich Verantwortlicher: Ivan Rempel". The exact legal wording was not captured verbatim; copy the text from the live page (or compare with `src/impressum.html`) before launch.

### Datenschutz (`/datenschutz`)

Generic German privacy-policy template (not tailored to the site). Headings:

- **Datenschutz auf einen Blick:** Allgemeine Hinweise; Datenerfassung auf unserer Website; Wer ist verantwortlich…; Wie erfassen wir Ihre Daten?; Wofür nutzen wir Ihre Daten?; Welche Rechte haben Sie…; Analyse-Tools und Tools von Drittanbietern.
- **Allgemeine Hinweise und Pflichtinformationen:** Datenschutz; Hinweis zur verantwortlichen Stelle; Widerruf der Einwilligung; Widerspruchsrecht (Art. 21 DSGVO); Beschwerderecht bei der Aufsichtsbehörde; Recht auf Datenübertragbarkeit; SSL-/TLS-Verschlüsselung; Auskunft, Sperrung, Löschung und Berichtigung; Recht auf Einschränkung der Verarbeitung.
- **Datenerfassung auf unserer Website:** Cookies; Server-Log-Dateien; Kontaktformular; Google reCAPTCHA.

Key facts:

- **Controller (verantwortliche Stelle):** Ivan Rempel, Lauerbacher Weg 19, 64711 Erbach, Telefon 0177/3608240, E-Mail rundr.elektrotechnik@gmail.com. A natural person is named here instead of the GmbH.
- **Hosting provider:** not named.
- **Server logs:** browser type/version, OS, referrer URL, hostname, request time, IP address (Art. 6(1)(f) GDPR).
- **Cookies:** mostly session cookies; necessary cookies under Art. 6(1)(f) GDPR.
- **Contact form** and **Google reCAPTCHA** sections exist but the legacy site has neither.

## 4. Platform Boilerplate (not content)

`Skip to main content`, `Skip to navigation`, `Search this site`, `Embedded Files`, `Google Sites`, `Report abuse`, `Page details`, `Page updated`, and the Google cookie banner (`Learn more` → https://www.google.com/policies/technologies/cookies/, button `Got it`).

## 5. Findings That Affect the Rebuild

1. **Page content now known.** The Kontakt, Impressum and Datenschutz content that `analysis.md` listed as missing is captured above.
2. **Impressum data:** address, register and VAT ID are available and must appear in the new Impressum and Kontakt page. `src/impressum.html` should be checked against the legacy text.
3. **Privacy policy is out of date for the new site.** It describes a contact form, reCAPTCHA and Google cookies/Google Sites hosting. The rebuild uses none of these (no form yet, no Google Sites). It must be rewritten once the hosting provider and any form or analytics are decided.
4. **Controller mismatch:** the policy names Ivan Rempel personally; as a GmbH the controller should be the company (R&R Elektrotechnik GmbH, represented by its managing directors).
5. **Images carry the services.** There is no text for the services, so the new Leistungen page has to supply the wording. The original images should be reviewed for reuse (see 6).
6. **Image reuse:** the 8 images are Google-hosted and have no alt text. If they are reused, they must be downloaded (with the customer's permission), optimized, and given German alt texts.
7. **Copyright:** `© 2022` and `created with Google.com` are outdated and should be dropped (the new footer already says © 2026).
8. **Address is not shown in the new site's footer yet;** consider adding it from section 2.
9. **URLs:** legacy uses `/home`, `/kontakt`, `/datenschutz`, `/impressum`. The new site uses `/` and `.html` files, so add redirects (`/home` → `/`, and the others to their new paths) at deployment.
