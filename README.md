# EB Hochdruckreinigung — Website

Eine professionelle, aber entspannte One-Page-Website für **EB Hochdruckreinigung**
— Reinigung von Einfahrten, Terrassen, Gehwegen und allen befestigten
Bodenflächen rund ums Haus.

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
| Hero             | Kernbotschaft, CTA "Kostenlose Einschätzung", Vertrauens-Badges |
| Leistungen       | 6 Leistungskarten für alle Bodenflächen                        |
| Preise           | Transparenter Quadratmeterpreis (ab 3 €/m²)                    |
| Vorher/Nachher   | Interaktiver Schieberegler-Vergleich                           |
| Ablauf           | 4 Schritte von der Anfrage bis zum Ergebnis                    |
| Warum wir        | Vertrauensargumente (Erfahrung, Technik, Preise, Termine …)    |
| Kontakt          | Kontaktinfos + Formular (öffnet vorausgefüllte E-Mail)         |

## Dateien

```
index.html         – Struktur & Inhalt
css/style.css       – Design-System (Farben, Typografie, Layout, Responsive)
js/main.js          – Navigation, Scroll-Animationen, Vorher/Nachher-Regler, Formular
assets/favicon.svg
assets/logo-eb.svg
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
- Kontaktformular funktioniert ohne eigenes Backend (öffnet das
  E-Mail-Programm des Besuchers mit vorausgefüllter Nachricht)

## Farbkonzept

- **Blau** (Wasser, Vertrauen, Professionalität) als Hauptfarbe
- **Sonnengelb/Orange** als warmer Akzent für Buttons & Call-to-Actions
  (steht bewusst im Kontrast zum Blau — wirkt einladend und "locker")
- **Weiß & helles Blaugrau** für ruhige, aufgeräumte Flächen

## Hinweis zu Inhalten

Texte sind beispielhaft und professionell, aber locker formuliert. Alle
Platzhalter (Telefonnummer, E-Mail, Region, Impressum/Datenschutz-Links)
müssen vor dem Livegang noch mit echten Angaben gefüllt werden — siehe
`ANLEITUNG.md`.
