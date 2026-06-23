# 🎨 Anleitung: Website selbst bearbeiten

Diese Seite ist „von Hand" gebaut (HTML/CSS) — du kannst alles selbst ändern,
ganz ohne Programme zu installieren. Hier Schritt für Schritt, was du anklickst.

> **Repo (deine Projektdateien):**
> https://github.com/emilianbleimn/Adria-Cafe
> **Live-Vorschau (aktualisiert sich nach jedem Speichern):**
> https://raw.githack.com/emilianbleimn/Adria-Cafe/claude/festive-mccarthy-in4dfn/index.html

---

## 🟫 A) Farben ändern (am einfachsten)

Alle Farben liegen an **einer einzigen Stelle**. Du musst nur den Farbwert tauschen,
der Rest der Seite zieht automatisch nach.

1. **Diesen Link öffnen:**
   👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/festive-mccarthy-in4dfn/css/style.css
2. Falls GitHub fragt: oben rechts **„Sign in"** und einloggen.
3. Ganz oben siehst du den Block `:root {` mit den Farben (Zeilen 6–28).
4. Einen Wert ändern, z. B. das Rot:
   `--bordeaux: #a8362b;`  →  z. B.  `--bordeaux: #c0392b;`
   (neue Farbcodes findest du hier: https://htmlcolorcodes.com/color-picker/ — den `#…`-Code kopieren)
5. Oben rechts den grünen Knopf **„Commit changes…"** klicken → nochmal **„Commit changes"** bestätigen. ✅
6. Nach 1–2 Minuten die **Live-Vorschau** neu laden (Strg+F5).

### Farb-Spickzettel
| Variable | Bedeutung |
|---|---|
| `--espresso` | Dunkles Braun – Hero, Karte, Kontakt |
| `--cream` | Creme – helle Hintergründe |
| `--bordeaux` | Rot – Buttons & Akzente |
| `--green` | Grün – Zitat-Band & Labels |
| `--brass` | Gelb/Gold – Ziffern, Preise, Linien |
| `--ink` | Textfarbe |

---

## ✍️ B) Texte ändern

1. **Diesen Link öffnen:**
   👉 https://github.com/emilianbleimn/Adria-Cafe/edit/claude/festive-mccarthy-in4dfn/index.html
2. Im Editor mit **Strg+F** den Text suchen, den du ändern willst (z. B. „Italienisches Eis").
3. Den Text überschreiben — **nur den Text zwischen den spitzen Klammern** ändern,
   die `<…>`-Teile stehen lassen.
4. Oben rechts **„Commit changes…"** → bestätigen. ✅

---

## 🖼️ C) Bilder austauschen

1. Ordner öffnen:
   👉 https://github.com/emilianbleimn/Adria-Cafe/tree/claude/festive-mccarthy-in4dfn/assets/img
2. Ein Bild anklicken → oben rechts auf **„…“ → „Delete file"** (löschen),
   dann oben **„Add file" → „Upload files"** und dein eigenes Foto mit
   **demselben Dateinamen** hochladen (z. B. `terrasse.jpg`).
   So bleibt alles automatisch an der richtigen Stelle.

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
  öffentliche Adresse (z. B. `www.eiscafe-adria.de`) sag Bescheid – das richte ich dir ein.
