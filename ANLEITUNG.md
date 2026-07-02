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

- `[Telefonnummer eintragen]` — kommt 3× vor (Header, Hero, Kontakt-Bereich)
- `[E-Mail eintragen]` — kommt 2× vor (Kontakt-Bereich, im Formular-Skript)
- `Region [Stadt] & Umgebung` — dein Einzugsgebiet

**So findest & ersetzt du sie:**
1. Öffne den Editor: 👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/eb-hochdruckreinigung-site-jl42wf/index.html
2. Mit **Strg+F** nach `[Telefonnummer eintragen]` suchen, überall durch deine
   echte Nummer ersetzen (Format z. B. `+49 151 23456789`).
3. Gleiches für `[E-Mail eintragen]` mit deiner E-Mail-Adresse.
4. Für die Telefonnummer im `tel:`-Link **keine Leerzeichen** verwenden,
   z. B. `tel:+4915123456789`.
5. Für die E-Mail im Kontaktformular auch die Datei `js/main.js` öffnen
   (👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/eb-hochdruckreinigung-site-jl42wf/js/main.js)
   und ganz unten `[E-Mail eintragen]` durch deine echte Adresse ersetzen.
6. Jeweils oben rechts **„Commit changes…"** klicken → bestätigen. ✅

---

## 🟫 B) Farben ändern

Alle Farben liegen an **einer einzigen Stelle**. Du musst nur den Farbwert tauschen,
der Rest der Seite zieht automatisch nach.

1. **Diesen Link öffnen:**
   👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/eb-hochdruckreinigung-site-jl42wf/css/style.css
2. Falls GitHub fragt: oben rechts **„Sign in"** und einloggen.
3. Ganz oben siehst du den Block `:root {` mit den Farben (Zeilen 6–30).
4. Einen Wert ändern, z. B. das Blau:
   `--blue: #0f6fb0;`  →  z. B.  `--blue: #1177c2;`
   (neue Farbcodes findest du hier: https://htmlcolorcodes.com/color-picker/ — den `#…`-Code kopieren)
5. Oben rechts den grünen Knopf **„Commit changes…"** klicken → nochmal **„Commit changes"** bestätigen. ✅
6. Nach 1–2 Minuten die **Live-Vorschau** neu laden (Strg+F5).

### Farb-Spickzettel
| Variable | Bedeutung |
|---|---|
| `--blue-deep` | Dunkles Blau – Header-Text, Überschriften |
| `--blue` / `--blue-bright` | Hauptblau – Hero-Hintergrund, Icons, Akzente |
| `--blue-pale` / `--sky` | Helles Blau – Hintergrundflächen |
| `--sun` / `--sun-2` | Sonnengelb/Orange – Buttons & Call-to-Actions |
| `--mint` | Frisches Grün – kleine Akzente |
| `--ink` | Textfarbe |

---

## ✍️ C) Texte ändern

1. **Diesen Link öffnen:**
   👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/eb-hochdruckreinigung-site-jl42wf/index.html
2. Im Editor mit **Strg+F** den Text suchen, den du ändern willst (z. B. „Kostenlose Einschätzung").
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
