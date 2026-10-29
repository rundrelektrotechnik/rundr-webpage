# Anleitung: Inhalte der Website ändern

In diesem Ordner (`content`) stehen alle Texte, die Sie selbst ändern können.
Alles andere (Design, Impressum- und Datenschutz-Texte) bitte nicht anfassen.

| Datei | Was steht darin? |
|---|---|
| `firma.yml` | Anschrift, Telefonnummern, E-Mail, Handelsregister, USt-ID. Erscheint automatisch auf **allen** Seiten. |
| `startseite.yml` | Texte der Startseite (Überschrift, „Warum wir“, Kontaktbereich) |
| `leistungen.yml` | Die Leistungen mit Text und Foto |
| `kontakt.yml` | Texte der Kontaktseite |
| `bilder/` | Die Fotos für die Leistungen |

## So ändern Sie etwas (ohne Programme)

1. Auf **github.com** anmelden und das Projekt öffnen.
2. Den Ordner `content` öffnen und die gewünschte Datei anklicken (z. B. `firma.yml`).
3. Oben rechts auf das **Stift-Symbol** (Edit) klicken.
4. Den Text ändern.
5. Oben rechts auf **Commit changes…** klicken, dann im Fenster nochmals auf **Commit changes**.
6. Nach etwa 2 Minuten ist die Änderung auf der Website sichtbar.

Den Fortschritt sehen Sie im Reiter **Actions**: ein grüner Haken heißt „veröffentlicht“,
ein rotes Kreuz heißt „Fehler“ (siehe unten). Bei einem Fehler bleibt die **alte Website unverändert online**.

## Die wichtigsten Regeln

- **Texte immer in Anführungszeichen schreiben:** `titel: "Mein Text"`.
  Sonst gibt es Probleme bei Doppelpunkten oder dem &-Zeichen.
- **Leerzeichen am Zeilenanfang nicht ändern** (Einrückung). Keine Tabulator-Taste benutzen.
- Zeilen, die mit `#` beginnen, sind Hinweise für Sie und werden nicht angezeigt.
- Ein Text innerhalb der Anführungszeichen darf selbst keine geraden Anführungszeichen `"` enthalten.
  Verwenden Sie stattdessen „deutsche Anführungszeichen“.

## Häufige Aufgaben

**Telefonnummer ändern:** `firma.yml` öffnen, bei `telefon:` die Nummer ersetzen, z. B. `"0151 123 456 78"`.
Die Nummer wird überall automatisch angepasst, auch der Anruf-Link auf dem Handy.

**Neue Person als Ansprechpartner:** in `firma.yml` bei `ansprechpartner:` einen Block
(drei Zeilen mit `name`, `rolle`, `telefon`) kopieren, darunter einfügen und ändern.

**Einsatzgebiet oder Erreichbarkeit anzeigen:** in `firma.yml` bei `einsatzgebiet:` bzw. `oeffnungszeiten:`
einen Text eintragen. Dann erscheint auf der Kontaktseite automatisch ein eigener Kasten.
Leer lassen (`""`) = nichts wird angezeigt.

**Leistung ändern oder neue hinzufügen:** in `leistungen.yml` einen Block (von `- titel:` bis `alt:`)
ändern oder kopieren und darunter einfügen.

**Neues Foto verwenden:**
1. Foto im Ordner `content/bilder` hochladen: **Add file → Upload files**, Foto hineinziehen, **Commit changes**.
   Die Größe ist egal, die Website verkleinert das Foto automatisch. Querformat sieht am besten aus.
2. In `leistungen.yml` bei `bild:` den Dateinamen **ohne Endung** eintragen (`dach.jpg` → `bild: "dach"`).
3. Bei `alt:` in einem Satz beschreiben, was auf dem Foto zu sehen ist.

## Wenn ein roter Fehler erscheint

Klicken Sie im Reiter **Actions** auf den roten Eintrag und dann auf **Inhalte prüfen und Website bauen**.
Dort steht in einfachem Deutsch, was nicht stimmt und in welcher Datei, zum Beispiel:

> content/firma.yml: "plz": Die Postleitzahl muss aus 5 Ziffern bestehen …

Korrigieren Sie die genannte Stelle wie oben beschrieben (Stift-Symbol) und speichern Sie erneut.
Sie können nichts kaputt machen: Solange der Fehler besteht, bleibt die bisherige Website online.
Ein früherer Stand lässt sich im Reiter **History** der Datei jederzeit wiederherstellen.

## Für Entwickler

```bash
npm install
npm run validate   # nur Inhalte prüfen
npm run build      # prüfen und Website nach _site bauen
npm start          # bauen und lokal mit Live-Reload ansehen
```

Die Texte aus `content/*.yml` stehen in den Templates als `firma`, `startseite`, `leistungen` und `kontakt`
zur Verfügung. Neue Pflichtfelder gehören zusätzlich in `scripts/validate-content.mjs`.
