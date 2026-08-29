# 🎨 Anleitung: Website selbst bearbeiten

Diese Seite ist „von Hand" gebaut (HTML/CSS) — du kannst alles selbst ändern,
ganz ohne Programme zu installieren. Hier Schritt für Schritt, was du anklickst.

> **Repo (deine Projektdateien):**
> https://github.com/emilianbleimn/Adria-Cafe
> **Live-Vorschau (aktualisiert sich nach jedem Speichern):**
> https://raw.githack.com/emilianbleimn/Adria-Cafe/claude/eb-hochdruckreinigung-site-jl42wf/index.html

---

## 🟦 A) Zuerst wichtig: Platzhalter ausfüllen

Aktuell stehen an einigen Stellen noch Platzhalter in eckigen Klammern:

- `[Telefonnummer eintragen]` — kommt mehrfach vor (Header, Hero, Kontakt-Bereich)
- `[E-Mail eintragen]` — im Kontakt-Bereich
- `Region [Stadt] & Umgebung` — dein Einzugsgebiet

**So findest & ersetzt du sie:**
1. Öffne den Editor: 👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/eb-hochdruckreinigung-site-jl42wf/index.html
2. Mit **Strg+F** nach `[Telefonnummer eintragen]` suchen, überall durch deine
   echte Nummer ersetzen (Format z. B. `+49 151 23456789`).
3. Gleiches für `[E-Mail eintragen]` mit deiner E-Mail-Adresse.
4. Für die Telefonnummer im `tel:`-Link **keine Leerzeichen** verwenden,
   z. B. `tel:+4915123456789`.
5. Oben rechts **„Commit changes…"** klicken → bestätigen. ✅

---

## 📅 A.1) Buchungsformular aktivieren (Web3Forms-Key)

Das Buchungsformular (inkl. Foto-Upload) verschickt Anfragen über den
kostenlosen Dienst [Web3Forms](https://web3forms.com). Ohne eigenen
Zugangsschlüssel kommen keine Anfragen bei dir an — das dauert aber nur
1 Minute:

1. Gehe auf 👉 https://web3forms.com und klicke auf **„Create Access Key"**.
2. Gib deine E-Mail-Adresse ein (die, an die Anfragen gehen sollen) — kein
   Passwort, keine Kreditkarte nötig.
3. Du bekommst sofort einen Access Key angezeigt, z. B. `a1b2c3d4-...`.
   Kopiere ihn.
4. Öffne den Editor: 👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/eb-hochdruckreinigung-site-jl42wf/index.html
5. Mit **Strg+F** nach `[WEB3FORMS_ACCESS_KEY_EINTRAGEN]` suchen (steht in
   einem versteckten Formularfeld) und durch deinen Access Key ersetzen.
6. Oben rechts **„Commit changes…"** → bestätigen. ✅

Ab jetzt landen alle Buchungsanfragen inkl. hochgeladener Fotos direkt in
deinem E-Mail-Postfach.

---

## 🗓️ A.2) Belegte Termine im Kalender pflegen

Der Kalender auf der Website zeigt automatisch an, welche Tage frei sind.
Sonntag ist automatisch als „Geschlossen" markiert, Samstag als „Auf
Anfrage" (anklickbar, aber mit Hinweis, dass der Termin erst bestätigt
werden muss). Wenn ein Termin gebucht ist — egal ob Wochentag oder
Samstag — und nicht mehr frei sein soll:

1. Öffne den Editor: 👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/eb-hochdruckreinigung-site-jl42wf/js/main.js
2. Ganz oben findest du die Zeile:
   ```js
   var BLOCKED_DATES = [];
   ```
3. Trag das Datum im Format `"JJJJ-MM-TT"` ein, z. B. für den 14. Juli 2026:
   ```js
   var BLOCKED_DATES = ["2026-07-14"];
   ```
   Mehrere Tage einfach mit Komma trennen: `["2026-07-14", "2026-07-15"]`.
4. Oben rechts **„Commit changes…"** → bestätigen. ✅ Der Tag erscheint ab
   sofort im Kalender durchgestrichen als „Belegt".

*Hinweis:* Das ist kein Live-System mit mehreren Bearbeitern — die Liste
musst du selbst aktuell halten, sobald du eine Anfrage per Kalender
angenommen hast.

---

## 🟫 B) Farben ändern

Alle Farben liegen an **einer einzigen Stelle**. Du musst nur den Farbwert tauschen,
der Rest der Seite zieht automatisch nach.

1. **Diesen Link öffnen:**
   👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/eb-hochdruckreinigung-site-jl42wf/css/style.css
2. Falls GitHub fragt: oben rechts **„Sign in"** und einloggen.
3. Ganz oben siehst du den Block `:root {` mit den Farben (Zeilen 6–30).
4. Einen Wert ändern, z. B. das Blau:
   `--blue: #0081f8;`  →  z. B.  `--blue: #1177c2;`
   (neue Farbcodes findest du hier: https://htmlcolorcodes.com/color-picker/ — den `#…`-Code kopieren)
5. Oben rechts den grünen Knopf **„Commit changes…"** klicken → nochmal **„Commit changes"** bestätigen. ✅
6. Nach 1–2 Minuten die **Live-Vorschau** neu laden (Strg+F5).

### Farb-Spickzettel
| Variable | Bedeutung |
|---|---|
| `--blue-deep` | Dunkles Blau – Header-Text, Überschriften |
| `--blue` / `--blue-bright` | Hauptblau – Hero-Hintergrund, Icons, Akzente |
| `--blue-pale` / `--sky` | Helles Blau – Hintergrundflächen |
| `--sun` / `--sun-2` | Kräftiges Orange (Logo-Farbe) – Buttons & Call-to-Actions |
| `--mint` | Frisches Grün – kleine Akzente |
| `--ink` | Textfarbe |

---

## ✍️ C) Texte ändern

1. **Diesen Link öffnen:**
   👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/eb-hochdruckreinigung-site-jl42wf/index.html
2. Im Editor mit **Strg+F** den Text suchen, den du ändern willst (z. B. „Jetzt Termin buchen").
3. Den Text überschreiben — **nur den Text zwischen den spitzen Klammern** ändern,
   die `<…>`-Teile stehen lassen.
4. Oben rechts **„Commit changes…"** → bestätigen. ✅

---

## 🧰 D) Lieber alles auf einmal? (Komfort-Editor im Browser)

Öffne den **vollständigen Editor** (sieht aus wie ein Programm, links die Dateiliste):

👉 https://github.dev/emilianbleimn/Adria-Cafe

- Links Datei anklicken → ändern → links das **Quell-Symbol** (Verzweigung) → Häkchen/„Commit".
- Tipp: Du kannst auch einfach im Repo die Taste **`.`** (Punkt) drücken — dasselbe öffnet sich.

---

## 💻 E) Profi-Variante: auf dem eigenen Rechner

1. [VS Code](https://code.visualstudio.com/) installieren
2. Erweiterung **„Live Server"** installieren
3. `index.html` → Rechtsklick → **„Open with Live Server"** → Änderungen sofort sichtbar

---

## ❓ Häufige Fragen

- **Geht etwas kaputt?** Nein – jede Änderung wird gespeichert und lässt sich
  über die Datei-Historie (Tab „History" auf GitHub) wieder zurückholen.
- **Wo ist meine Änderung?** In der Live-Vorschau (Link oben), nach kurzer Wartezeit + Neuladen.
- **Eigene Internet-Adresse (Domain)?** Diese Vorschau ist zum Testen. Für eine echte
  öffentliche Adresse (z. B. `www.eb-hochdruckreinigung.de`) sag Bescheid – das richte ich dir ein.
