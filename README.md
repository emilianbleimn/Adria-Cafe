# EB-Hochdruckreinigung — Website

Eine professionelle, aber entspannte One-Page-Website für
**EB-Hochdruckreinigung** (Emilian Bleim) — Reinigung von Einfahrten,
Terrassen, Gehwegen und allen befestigten Bodenflächen rund ums Haus.

## Über den Betrieb

- **Leistungen:** Einfahrten, Terrassen (Stein, Fliesen, Holz), Gehwege &
  Hofeinfahrten, Pflaster- & Hofflächen, Poolumrandungen & Gartenwege,
  Garagenvorplätze
- **Kontaktdaten, Einzugsgebiet & Öffnungszeiten:** aktuell als Platzhalter
  hinterlegt (`[Telefonnummer eintragen]`, `[E-Mail eintragen]`,
  `Region [Stadt] & Umgebung`) — bitte vor Veröffentlichung ausfüllen,
  siehe `ANLEITUNG.md`.

## Aufbau der Website

Die Seite ist vollständig statisch und **ohne externe Bild-Abhängigkeiten**
gestaltet — alle Grafiken (Logo, Icons, Vorher/Nachher-Vergleich) sind als
handgefertigte SVG- und CSS-Illustrationen eingebettet. So lädt die Seite
überall schnell und zuverlässig, ganz ohne Stockfotos.

| Abschnitt        | Inhalt                                                        |
|------------------|-----------------------------------------------------------------|
| Hero             | Kernbotschaft, CTA "Jetzt Termin buchen", Vertrauens-Badges     |
| Leistungen       | 6 Leistungskarten für alle Bodenflächen                        |
| Preise           | Fester Quadratmeterpreis (2,50 €/m², keine Einschätzung nötig) |
| Vorher/Nachher   | Interaktiver Schieberegler-Vergleich                           |
| Ablauf           | 4 Schritte von der Terminwahl bis zum Ergebnis                 |
| Warum wir        | Ehrliche Vertrauensargumente (junger Betrieb, Einsatz, Preise …) |
| Kontakt/Buchung  | Kalender mit freien/belegten Tagen + Formular mit Foto-Upload  |

## Dateien

```
index.html         – Struktur & Inhalt
css/style.css       – Design-System (Farben, Typografie, Layout, Responsive)
js/main.js          – Navigation, Kalender, Foto-Vorschau, Formularversand
assets/favicon.svg
assets/logo-eb.png
```

## Lokal ansehen

Einfach `index.html` im Browser öffnen – es ist kein Build-Schritt nötig.
Alternativ ein einfacher lokaler Server:

```bash
python3 -m http.server 8000
# danach http://localhost:8000 im Browser öffnen
```

## Technik

- Reines HTML5, CSS3 und Vanilla JavaScript – keine Frameworks, keine Build-Tools
- Responsives Layout (Desktop, Tablet, Mobil)
- Schriften: *Poppins* & *Inter* (Google Fonts)
- Strukturierte Daten (schema.org `CleaningService`) für Suchmaschinen
- Berücksichtigt `prefers-reduced-motion`
- **Buchungskalender**: zeigt freie/belegte Tage direkt im Browser,
  Sonntag gilt automatisch als geschlossen, Samstag als "auf Anfrage".
  Belegte Tage werden in `js/main.js` in einer einfachen Liste gepflegt (kein Backend, kein
  Login) — siehe `ANLEITUNG.md`.
- **Kontakt-/Buchungsformular mit Foto-Upload** über den kostenlosen
  Dienst [Web3Forms](https://web3forms.com) (unterstützt Datei-Anhänge,
  die mailto-Links technisch nicht können) — braucht einen kostenlosen
  Access Key, siehe `ANLEITUNG.md`.
- Umschaltbarer **Hell-/Dunkelmodus** (Button oben rechts im Menü) — merkt
  sich die Wahl im Browser und folgt sonst der Systemeinstellung

## Farbkonzept

Direkt aus dem Logo übernommen:

- **Blau** `#0081f8` (Wasser, Vertrauen, Professionalität) als Hauptfarbe
- **Kräftiges Orange** `#fd5e01` als Akzent für Buttons & Call-to-Actions
  (steht bewusst im Kontrast zum Blau — wirkt einladend und "locker")
- **Weiß & helles Blaugrau** für ruhige, aufgeräumte Flächen

## Hinweis zu Inhalten

Texte sind beispielhaft und professionell, aber locker formuliert. Alle
Platzhalter (Telefonnummer, E-Mail, Region, Impressum/Datenschutz-Links)
müssen vor dem Livegang noch mit echten Angaben gefüllt werden — siehe
`ANLEITUNG.md`.
