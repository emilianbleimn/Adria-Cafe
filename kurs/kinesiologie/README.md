# Kinesiologie Basiskurs — Muskel, Muskelfaser & Rezeptoren

Ein vollständiger Anfängerkurs zur Bewegungslehre als statische Website.
Kein Build-Schritt, keine Frameworks, kein Tracking, keine externen Skripte.

## Öffnen

`index.html` einfach im Browser öffnen. Alternativ:

```bash
python3 -m http.server 8000
# danach http://localhost:8000/kurs/kinesiologie/ aufrufen
```

## Aufbau des Kurses

| Modul | Inhalt |
|-------|--------------------------------------------------------------|
| 1 | Orientierung: die zwei Bedeutungen von „Kinesiologie“, Grundvokabeln (Agonist/Antagonist/Synergist, Ursprung/Ansatz), die drei Arbeitsweisen |
| 2 | Der Muskel von außen nach innen: Faszikel, Faser, Myofibrille, Sarkomer; Epi-/Peri-/Endomysium; Muskelarchitektur |
| 3 | Kontraktion: motorische Einheit, Größenordnungsprinzip, Rekrutierung & Frequenzierung, Querbrückenzyklus, Gleitfilamenttheorie |
| 4 | Muskelfasertypen I / IIa / IIx: Eigenschaften, Einsatz, Trainierbarkeit, Sarkopenie |
| 5 | Rezeptoren: Propriozeption, Muskelspindel (Ia/II, γ-Motoneuron), Golgi-Sehnenorgan (Ib), Gelenk- und Hautrezeptoren |
| 6 | Reflexe: Reflexbogen, Eigen- vs. Fremdreflex, Dehnungsreflex, reziproke und autogene Hemmung, Muskeltonus |
| 7 | Praxis: Dehnmethoden, Dehnungs-Verkürzungs-Zyklus, neuronale Anpassungen, Muskelkater |

Dazu: Abschlusstest (12 Fragen), 24 Karteikarten, durchsuchbares Glossar
(43 Einträge) sowie ein Anhang zu Quellen, bewussten Vereinfachungen und Grenzen.

## Funktionen

- **7 Module** mit Lernzielen, Merksätzen, Tabellen und Praxisbeispielen
- **5 Abbildungen** als handgeschriebene Inline-SVGs (Bauebenen, Sarkomer,
  Fasertypvergleich, Muskelspindel/Golgi-Sehnenorgan, Reflexschaltungen)
- **42 Quizfragen** mit sofortiger Rückmeldung und Begründung zu jeder Antwort
- **Karteikarten** zum Umdrehen, Blättern und Mischen (Maus oder Tastatur)
- **Glossar** mit Volltextsuche
- **Fortschrittsanzeige** über alle Module, jederzeit zurücksetzbar
- **Helles und dunkles Design**, folgt der Systemeinstellung, manuell umschaltbar
- Responsiv bis 390 px Breite, `prefers-reduced-motion` wird berücksichtigt

## Dateien

```
index.html    – Inhalt und Struktur (alle Abbildungen als Inline-SVG)
kurs.css      – Design-System, Themes, Layout, Responsive
kurs.js       – Quizdaten, Karteikarten, Glossar, Fortschritt, Navigation
favicon.svg
```

Quizfragen, Karteikarten und Glossareinträge stehen als Datenstrukturen am
Anfang der jeweiligen Abschnitte in `kurs.js` (`QUIZ`, `CARDS`, `GLOSSARY`) und
lassen sich dort ohne Eingriff in die Logik ergänzen oder ändern.

## Datenschutz

Lernfortschritt und Quizergebnisse liegen ausschließlich im `localStorage` des
Browsers und verlassen das Gerät nicht. Die einzige externe Anfrage ist das
Laden der Schriften von Google Fonts; ohne Netzverbindung greift die
Fallback-Schriftfamilie.

## Inhaltlicher Hinweis

Der Kurs vermittelt Grundlagenwissen zu Bildungszwecken und ersetzt keine
medizinische Diagnose und keine physiotherapeutische oder ärztliche Beratung.
Er behandelt die Kinesiologie als Bewegungswissenschaft — nicht die
sogenannte „Angewandte Kinesiologie“, deren diagnostische Ansprüche
wissenschaftlich nicht belegt sind.
