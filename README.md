# Eiscafé Adria — Website

Eine elegante, professionelle One-Page-Website für das **Eiscafé Adria** in
Erbach im Odenwald – hausgemachte italienische Eisspezialitäten, Kuchen,
Waffeln, Crêpes sowie mediterrane Küche.

## Über das Café

- **Adresse:** Werner-von-Siemens-Straße 8, 64711 Erbach im Odenwald
- **Telefon:** 06062 41 68
- **E-Mail:** cafe-adria@t-online.de
- **Öffnungszeiten:** Mo–Sa 9:00–23:00 Uhr · So & Feiertage 10:00–23:00 Uhr
- **Betrieb:** Familienbetrieb (Frare & Tavian GbR)

## Aufbau der Website

Die Seite ist vollständig statisch und **ohne externe Bild-Abhängigkeiten**
gestaltet – alle Illustrationen sind als handgefertigte SVG- und CSS-Grafiken
eingebettet. So lädt die Seite überall schnell und zuverlässig.

| Abschnitt        | Inhalt                                                        |
|------------------|---------------------------------------------------------------|
| Hero             | Begrüßung, Kernbotschaft, Eckdaten                            |
| Highlights       | Hausgemachtes Eis · Patisserie · Küche · Terrasse            |
| Tradition        | Geschichte des Familienbetriebs                              |
| Spezialitäten    | Übersicht des kulinarischen Angebots                         |
| Karte            | Auszug aus der Speisekarte                                   |
| Impressionen     | Stimmungsvolle Galerie                                       |
| Erbach           | Lage in der historischen Altstadt + Karte                   |
| Kontakt          | Öffnungszeiten, Adresse, Live-„Geöffnet"-Anzeige            |

## Dateien

```
index.html        – Struktur & Inhalt
css/style.css     – Design-System (Farben, Typografie, Layout, Responsive)
js/main.js        – Navigation, Scroll-Animationen, Öffnungs-Status
assets/favicon.svg
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
- Schriften: *Bodoni Moda* & *Archivo* (Google Fonts)
- Strukturierte Daten (schema.org `IceCreamShop`) für Suchmaschinen
- Berücksichtigt `prefers-reduced-motion`

## Bilder

Die verwendeten Fotos stammen als lizenzfreie Platzhalter von
[Unsplash](https://unsplash.com) (kostenlose, kommerziell nutzbare Lizenz)
und liegen unter `assets/img/`. Für den finalen Auftritt empfiehlt es sich,
sie durch eigene Aufnahmen des Eiscafé Adria zu ersetzen – einfach die
Dateien gleichen Namens austauschen.

## Hinweis zu Inhalten

Texte und Eckdaten basieren auf öffentlich verfügbaren Informationen.
Die Preise und Gerichte in der Karte sind beispielhaft und sollten vor
Veröffentlichung mit dem aktuellen Angebot des Cafés abgeglichen werden.

## Weiterer Inhalt im Repository

Unter `kurs/kinesiologie/` liegt ein davon unabhängiger, eigenständiger
Lernkurs zur Bewegungslehre (Muskel, Muskelfaser und Rezeptoren). Er ist nicht
mit der Café-Website verlinkt und teilt weder CSS noch JavaScript mit ihr —
Details in `kurs/kinesiologie/README.md`.
