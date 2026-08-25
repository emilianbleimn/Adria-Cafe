/* ===================================================================
   Kinesiologie Basiskurs — Interaktionen
   Fortschritt, Quiz, Karteikarten, Glossar
   =================================================================== */
(function () {
  "use strict";

  var STORE_KEY = "kinesio.kurs.v1";
  var THEME_KEY = "kinesio.theme.v1";
  var MODULES = 7;

  /* ---------- Speicher (defensiv: kann blockiert sein) ---------- */
  function load() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function save(state) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignorieren — der Kurs funktioniert auch ohne Speicher */
    }
  }

  var state = load();
  if (!state.done) state.done = {};
  if (!state.scores) state.scores = {};

  /* ---------- Design-Umschalter ---------- */
  var themeBtn = document.getElementById("themeBtn");
  try {
    var savedTheme = window.localStorage.getItem(THEME_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  } catch (e) {}

  function currentTheme() {
    var attr = document.documentElement.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { window.localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---------- Mobile Navigation ---------- */
  var navBtn = document.getElementById("navBtn");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("scrim");

  function closeNav() {
    if (!sidebar) return;
    sidebar.classList.remove("is-open");
    if (scrim) scrim.classList.remove("is-open");
    if (navBtn) navBtn.setAttribute("aria-expanded", "false");
  }
  if (navBtn && sidebar) {
    navBtn.addEventListener("click", function () {
      var open = sidebar.classList.toggle("is-open");
      if (scrim) scrim.classList.toggle("is-open", open);
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
  }
  if (scrim) scrim.addEventListener("click", closeNav);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---------- Fortschritt ---------- */
  var progressBar = document.getElementById("progressBar");
  var progressText = document.getElementById("progressText");

  function renderProgress() {
    var count = 0;
    for (var i = 1; i <= MODULES; i++) if (state.done[i]) count++;

    if (progressBar) progressBar.style.width = (count / MODULES) * 100 + "%";
    if (progressText) progressText.textContent = count + "/" + MODULES;

    document.querySelectorAll(".toc a[data-module]").forEach(function (a) {
      a.classList.toggle("is-done", !!state.done[a.getAttribute("data-module")]);
    });

    document.querySelectorAll(".done-btn").forEach(function (btn) {
      var id = btn.getAttribute("data-done");
      var done = !!state.done[id];
      btn.classList.toggle("is-done", done);
      btn.textContent = done ? "✓ Modul abgeschlossen" : "Modul als erledigt markieren";
      btn.setAttribute("aria-pressed", done ? "true" : "false");
    });
  }

  document.querySelectorAll(".done-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-done");
      if (state.done[id]) delete state.done[id];
      else state.done[id] = true;
      save(state);
      renderProgress();
    });
  });

  var resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (!window.confirm("Fortschritt und Quizergebnisse in diesem Browser löschen?")) return;
      state = { done: {}, scores: {} };
      save(state);
      renderProgress();
      document.querySelectorAll(".quiz").forEach(function (el) {
        renderQuiz(el, el.getAttribute("data-quiz"));
      });
    });
  }

  /* ---------- Aktiver Punkt in der Navigation ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  var targets = tocLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && targets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          tocLinks.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-90px 0px -65% 0px", threshold: 0 }
    );
    targets.forEach(function (t) { observer.observe(t); });
  }

  /* =================================================================
     Quizfragen
     ================================================================= */
  var QUIZ = {
    "1": [
      {
        q: "Welche Aussage über das Wort „Kinesiologie“ trifft zu?",
        opts: [
          "Es bezeichnet ausschließlich ein alternativmedizinisches Testverfahren.",
          "Es bezeichnet die Bewegungslehre — und daneben ein alternativmedizinisches Verfahren, dessen diagnostische Ansprüche nicht belegt sind.",
          "Es ist ein geschützter Begriff für Physiotherapie.",
          "Es meint die Lehre von den Knochen."
        ],
        correct: 1,
        why: "Beide Bedeutungen existieren nebeneinander. Dieser Kurs behandelt die wissenschaftliche Bewegungslehre."
      },
      {
        q: "Beim Ellenbogenbeugen ist der M. triceps brachii …",
        opts: ["Agonist", "Antagonist", "Synergist", "Stabilisator"],
        correct: 1,
        why: "Der Trizeps ist der Gegenspieler des Bizeps: Er bremst und sichert die Beugebewegung."
      },
      {
        q: "Du senkst eine Hantel langsam und kontrolliert ab. Wie arbeitet der Bizeps?",
        opts: [
          "konzentrisch — er verkürzt sich",
          "isometrisch — die Länge bleibt gleich",
          "exzentrisch — er wird unter Spannung gedehnt",
          "gar nicht — die Schwerkraft macht die Arbeit"
        ],
        correct: 2,
        why: "Die Last ist größer als die Muskelkraft: Der Muskel gibt bremsend nach. Genau diese Arbeitsweise erzeugt typischerweise Muskelkater."
      },
      {
        q: "Wie heißt das körpernahe, meist unbewegliche Ende eines Muskels?",
        opts: ["Ansatz (Insertio)", "Ursprung (Origo)", "Sehne (Tendo)", "Bauch (Venter)"],
        correct: 1,
        why: "Ursprung = körpernah und fix, Ansatz = körperfern und beweglich."
      }
    ],
    "2": [
      {
        q: "Welche Reihenfolge stimmt — von groß nach klein?",
        opts: [
          "Muskel → Muskelfaser → Faszikel → Sarkomer → Myofibrille",
          "Muskel → Faszikel → Muskelfaser → Myofibrille → Sarkomer",
          "Faszikel → Muskel → Myofibrille → Muskelfaser → Sarkomer",
          "Muskel → Myofibrille → Faszikel → Muskelfaser → Sarkomer"
        ],
        correct: 1,
        why: "Der Muskel besteht aus Faszikeln, diese aus Fasern, diese aus Myofibrillen, diese aus Sarkomeren."
      },
      {
        q: "Welche Bindegewebshülle umgibt die einzelne Muskelfaser?",
        opts: ["Epimysium", "Perimysium", "Endomysium", "Sarkolemm"],
        correct: 2,
        why: "Endo- = innen, um die einzelne Faser. Das Sarkolemm ist dagegen die Zellmembran der Faser selbst."
      },
      {
        q: "Was ist an der Muskelfaser als Zelle ungewöhnlich?",
        opts: [
          "Sie besitzt keinen Zellkern.",
          "Sie hat viele Zellkerne, weil sie aus verschmolzenen Vorläuferzellen entsteht.",
          "Sie hat genau zwei Zellkerne.",
          "Sie besitzt keine Zellmembran."
        ],
        correct: 1,
        why: "Eine Muskelfaser ist vielkernig; die Kerne liegen randständig unter dem Sarkolemm."
      },
      {
        q: "Warum wirkt Skelettmuskulatur unter dem Mikroskop quergestreift?",
        opts: [
          "Weil sich Muskel- und Bindegewebe abwechseln.",
          "Weil die Sarkomere aller Myofibrillen auf gleicher Höhe liegen und ihre hellen und dunklen Zonen zu Streifen zusammenfallen.",
          "Weil die Fasern schräg verlaufen.",
          "Weil Blutgefäße quer durch den Muskel ziehen."
        ],
        correct: 1,
        why: "Die Querstreifung entsteht durch die exakte Ausrichtung der Sarkomere nebeneinander."
      }
    ],
    "3": [
      {
        q: "Was gehört zu einer motorischen Einheit?",
        opts: [
          "ein Muskel und seine Sehne",
          "ein α-Motoneuron und alle von ihm versorgten Muskelfasern",
          "eine Muskelfaser und ihre Muskelspindel",
          "ein Faszikel mit seinem Perimysium"
        ],
        correct: 1,
        why: "Sie ist die kleinste funktionelle Einheit, die das Nervensystem ansteuern kann."
      },
      {
        q: "Wie kann Kraft fein dosiert werden, obwohl jede Faser dem Alles-oder-Nichts-Prinzip folgt?",
        opts: [
          "Die einzelne Faser kontrahiert je nach Bedarf stärker oder schwächer.",
          "Über Rekrutierung (Zahl der Einheiten) und Frequenzierung (Impulsrate).",
          "Über die Länge der Sehne.",
          "Über die Zahl der Zellkerne pro Faser."
        ],
        correct: 1,
        why: "Mehr Einheiten plus höhere Feuerrate ergeben eine stufenlose Kraftdosierung."
      },
      {
        q: "Welche Bande bleibt bei der Kontraktion gleich lang?",
        opts: ["I-Bande", "A-Bande", "H-Zone", "das Sarkomer insgesamt"],
        correct: 1,
        why: "Die A-Bande entspricht der Ausdehnung des Myosins — und Myosin behält seine Länge. Kürzer werden nur I-Bande und H-Zone."
      },
      {
        q: "Welche Rolle spielt Kalzium bei der Kontraktion?",
        opts: [
          "Es liefert die Energie für den Kraftschlag.",
          "Es bindet an Troponin und gibt dadurch die Bindungsstellen am Aktin frei.",
          "Es löst die Myosinköpfe vom Aktin.",
          "Es baut Laktat ab."
        ],
        correct: 1,
        why: "Ca²⁺ ist der Schalter: Es verschiebt über Troponin das Tropomyosin. Energie liefert dagegen ATP."
      },
      {
        q: "Wofür wird ATP im Querbrückenzyklus unmittelbar gebraucht?",
        opts: [
          "um die Myosinköpfe an das Aktin zu binden",
          "um die Myosinköpfe wieder zu lösen und neu zu spannen (sowie Ca²⁺ zurückzupumpen)",
          "um das Aktinfilament zu verkürzen",
          "um die Z-Scheiben zu stabilisieren"
        ],
        correct: 1,
        why: "Ohne ATP bleiben die Köpfe gebunden — das ist der Grund für die Totenstarre."
      }
    ],
    "4": [
      {
        q: "Welcher Fasertyp ermüdet am schnellsten?",
        opts: ["Typ I", "Typ IIa", "Typ IIx", "alle gleich schnell"],
        correct: 2,
        why: "Typ IIx arbeitet anaerob-glykolytisch, hat wenige Mitochondrien und ist am kräftigsten, aber am wenigsten ausdauernd."
      },
      {
        q: "Welche Fasern werden bei ruhigem Stehen und Gehen vor allem eingesetzt?",
        opts: ["Typ IIx", "Typ IIa", "Typ I", "abwechselnd alle Typen"],
        correct: 2,
        why: "Nach dem Größenordnungsprinzip feuern zuerst die kleinen, leicht erregbaren Einheiten — das sind die Typ-I-Fasern."
      },
      {
        q: "Was verändert Training am ehesten?",
        opts: [
          "Es wandelt Typ-I- in Typ-II-Fasern um.",
          "Es verschiebt Fasern innerhalb der Typ-II-Familie (IIx → IIa) und verändert Eigenschaften innerhalb der Typen.",
          "Es erhöht die Gesamtzahl der Muskelfasern deutlich.",
          "Es verändert nichts, alles ist genetisch festgelegt."
        ],
        correct: 1,
        why: "Die Grenze zwischen Typ I und Typ II ist beim Menschen kaum verschiebbar; innerhalb der Typ-II-Familie dagegen schon."
      },
      {
        q: "Warum ist Krafttraining im Alter besonders wichtig?",
        opts: [
          "Weil vor allem die Typ-II-Fasern schwinden, die man zum schnellen Abfangen braucht.",
          "Weil Ausdauerfasern im Alter zuerst verloren gehen.",
          "Weil sich Sehnen sonst verkürzen.",
          "Weil die Zahl der Muskelfasern sonst zunimmt."
        ],
        correct: 0,
        why: "Die Sarkopenie trifft überwiegend die schnellen Fasern und große motorische Einheiten — genau die Reserve für Sturzsituationen."
      }
    ],
    "5": [
      {
        q: "Was misst die Muskelspindel?",
        opts: [
          "die Muskelspannung",
          "die Muskellänge und die Geschwindigkeit der Längenänderung",
          "die Gelenkstellung",
          "die Temperatur im Muskel"
        ],
        correct: 1,
        why: "Sie liegt parallel zu den Arbeitsfasern und wird mitgedehnt — sie ist ein Längen- und Geschwindigkeitssensor."
      },
      {
        q: "Wo liegt das Golgi-Sehnenorgan und wie ist es geschaltet?",
        opts: [
          "im Muskelbauch, parallel zu den Fasern",
          "am Muskel-Sehnen-Übergang, in Serie",
          "in der Gelenkkapsel, parallel",
          "in der Haut über dem Muskel"
        ],
        correct: 1,
        why: "Weil die gesamte Kraft durch das Organ läuft, misst es Spannung — unabhängig von der Muskellänge."
      },
      {
        q: "Welche Aufgabe hat das γ-Motoneuron?",
        opts: [
          "Es steuert die Arbeitsfasern des Muskels an.",
          "Es spannt die intrafusalen Fasern nach, damit die Spindel auch bei Verkürzung messfähig bleibt.",
          "Es hemmt das Golgi-Sehnenorgan.",
          "Es leitet Schmerzreize weiter."
        ],
        correct: 1,
        why: "Über die α-γ-Koaktivierung bleibt die Spindel im ganzen Bewegungsbereich empfindlich."
      },
      {
        q: "Welche Nervenfaser leitet die Information des Golgi-Sehnenorgans?",
        opts: ["Ia", "Ib", "Typ II", "γ"],
        correct: 1,
        why: "Ia und II kommen aus der Muskelspindel, Ib aus dem Golgi-Sehnenorgan."
      },
      {
        q: "Aus welchen drei Teilleistungen besteht die Propriozeption?",
        opts: [
          "Sehen, Hören, Tasten",
          "Stellungssinn, Bewegungssinn, Kraftsinn",
          "Druck, Temperatur, Schmerz",
          "Balance, Reaktion, Ausdauer"
        ],
        correct: 1,
        why: "Wo bin ich, wie bewege ich mich, wie viel Kraft setze ich ein."
      }
    ],
    "6": [
      {
        q: "Welche Glieder hat ein Reflexbogen — in richtiger Reihenfolge?",
        opts: [
          "Effektor → Zentrum → Rezeptor",
          "Rezeptor → afferenter Schenkel → Zentrum → efferenter Schenkel → Effektor",
          "Rezeptor → Gehirn → Muskel",
          "afferenter Schenkel → Rezeptor → Effektor"
        ],
        correct: 1,
        why: "Fünf Glieder — und der Weg führt beim Eigenreflex nicht über das Gehirn."
      },
      {
        q: "Was kennzeichnet einen Eigenreflex wie den Patellarsehnenreflex?",
        opts: [
          "Rezeptor und Effektor liegen im selben Organ, die Verschaltung ist monosynaptisch.",
          "Er läuft über mehrere Zwischenneurone und ermüdet schnell.",
          "Er wird vom Großhirn ausgelöst.",
          "Er tritt nur bei Kindern auf."
        ],
        correct: 0,
        why: "Genau eine Synapse im Rückenmark — daher die sehr kurze Latenz von etwa 20–40 ms."
      },
      {
        q: "Was passiert bei der reziproken Hemmung?",
        opts: [
          "Der Agonist hemmt sich selbst.",
          "Über ein Ia-Interneuron wird das Motoneuron des Antagonisten gehemmt.",
          "Beide Muskeln kontrahieren gleichzeitig maximal.",
          "Das Golgi-Sehnenorgan wird abgeschaltet."
        ],
        correct: 1,
        why: "Der Gegenspieler muss loslassen, sonst könnte die Bewegung nicht zügig ablaufen."
      },
      {
        q: "Wie wirkt eine steigende Spannung über das Golgi-Sehnenorgan auf den eigenen Muskel?",
        opts: ["erregend", "hemmend (autogene Hemmung)", "gar nicht", "erst erregend, dann erregend verstärkt"],
        correct: 1,
        why: "Spindel und Golgi-Sehnenorgan wirken gegenläufig: Die Spindel erregt den eigenen Muskel, das GSO dämpft ihn."
      }
    ],
    "7": [
      {
        q: "Worauf beruht der Beweglichkeitsgewinn beim Dehnen nach heutigem Stand vor allem?",
        opts: [
          "auf einer dauerhaften Reflexhemmung durch das Golgi-Sehnenorgan",
          "auf einer erhöhten Dehnungstoleranz, dazu viskoelastische und langfristig strukturelle Effekte",
          "auf dem Auseinanderziehen der Myosinfilamente",
          "auf einer Zunahme der Faserzahl"
        ],
        correct: 1,
        why: "Die reflektorische Hemmung ist zu kurz, um den Effekt zu erklären."
      },
      {
        q: "Was macht den Dehnungs-Verkürzungs-Zyklus wirksam?",
        opts: [
          "eine möglichst lange Pause im Umkehrpunkt",
          "die kurze Umkehr: gespeicherte elastische Energie, Dehnungsreflex und Vorspannung wirken zusammen",
          "das Ausatmen beim Absprung",
          "eine maximale Dehnung vor dem Absprung"
        ],
        correct: 1,
        why: "Bleibt man unten stehen, verpufft die elastische Energie und der Reflexanteil verhallt."
      },
      {
        q: "Warum werden Anfänger in den ersten Wochen schnell stärker, ohne sichtbar zuzunehmen?",
        opts: [
          "Weil sofort neue Muskelfasern gebildet werden.",
          "Weil zuerst neuronale Anpassungen greifen: bessere Rekrutierung, Frequenzierung und Koordination.",
          "Weil die Sehnen kürzer werden.",
          "Weil sich Typ-I- in Typ-II-Fasern umwandeln."
        ],
        correct: 1,
        why: "Hypertrophie folgt erst danach — anfangs lernt vor allem das Nervensystem."
      },
      {
        q: "Wodurch entsteht Muskelkater?",
        opts: [
          "durch Laktatansammlung im Muskel",
          "durch feinste Schäden vor allem nach ungewohnter exzentrischer Belastung, mit nachfolgender Entzündungsreaktion",
          "durch Flüssigkeitsmangel",
          "durch zu kurzes Aufwärmen allein"
        ],
        correct: 1,
        why: "Laktat ist längst abgebaut, bevor der Schmerz nach 12–24 Stunden überhaupt beginnt."
      }
    ]
  };

  QUIZ["final"] = [
    {
      q: "Welche Struktur begrenzt das Sarkomer?",
      opts: ["die M-Linie", "die Z-Scheibe", "das Sarkolemm", "das Endomysium"],
      correct: 1,
      why: "Ein Sarkomer reicht von Z-Scheibe zu Z-Scheibe. (Modul 3)"
    },
    {
      q: "Welche Hülle umgibt einen ganzen Faszikel?",
      opts: ["Endomysium", "Perimysium", "Epimysium", "Faszie"],
      correct: 1,
      why: "Peri- = um das Bündel herum. (Modul 2)"
    },
    {
      q: "Welcher Fasertyp hat die höchste Kapillar- und Mitochondriendichte?",
      opts: ["Typ I", "Typ IIa", "Typ IIx", "alle gleich"],
      correct: 0,
      why: "Typ I arbeitet aerob und ist entsprechend ausgestattet. (Modul 4)"
    },
    {
      q: "In welcher Reihenfolge werden motorische Einheiten rekrutiert?",
      opts: [
        "immer zuerst die größten",
        "zufällig, je nach Bedarf",
        "zuerst die kleinen, leicht erregbaren (Größenordnungsprinzip)",
        "abwechselnd, um Ermüdung zu vermeiden"
      ],
      correct: 2,
      why: "Henneman-Prinzip: klein vor groß, Typ I vor Typ II. (Modul 3 & 4)"
    },
    {
      q: "Die Muskelspindel liegt … zum Muskel, das Golgi-Sehnenorgan … .",
      opts: [
        "in Serie … parallel",
        "parallel … in Serie",
        "beide parallel",
        "beide in Serie"
      ],
      correct: 1,
      why: "Aus der Schaltung folgt die Messgröße: Länge bzw. Spannung. (Modul 5)"
    },
    {
      q: "Welche Afferenz meldet vor allem die Geschwindigkeit einer Dehnung?",
      opts: ["Ib", "Ia", "Typ II", "γ"],
      correct: 1,
      why: "Ia ist die dynamische Afferenz der Muskelspindel. (Modul 5)"
    },
    {
      q: "Was geschieht mit der A-Bande, wenn sich das Sarkomer verkürzt?",
      opts: ["sie wird schmaler", "sie bleibt gleich", "sie wird breiter", "sie verschwindet"],
      correct: 1,
      why: "Die Filamente gleiten, sie verkürzen sich nicht. (Modul 3)"
    },
    {
      q: "Welche Wirkung hat das Golgi-Sehnenorgan auf seinen eigenen Muskel?",
      opts: ["erregend", "hemmend", "keine", "erst hemmend, dann erregend"],
      correct: 1,
      why: "Autogene Hemmung über das Ib-Interneuron. (Modul 6)"
    },
    {
      q: "Wozu dient die α-γ-Koaktivierung?",
      opts: [
        "damit der Antagonist entspannt",
        "damit die Muskelspindel auch bei Verkürzung gespannt und messfähig bleibt",
        "damit das Golgi-Sehnenorgan aktiviert wird",
        "damit die Sehne elastischer wird"
      ],
      correct: 1,
      why: "Sonst würde die parallel liegende Spindel durchhängen. (Modul 5)"
    },
    {
      q: "Welche Arbeitsweise erlaubt die größten Kräfte?",
      opts: ["konzentrisch", "isometrisch", "exzentrisch", "alle gleich"],
      correct: 2,
      why: "Beim bremsenden Nachgeben ist die Kraft am höchsten — und der Muskelkater am wahrscheinlichsten. (Modul 1 & 3)"
    },
    {
      q: "Warum ist eine kurze Vordehnung vor dem Absprung wirksam?",
      opts: [
        "weil der Muskel dadurch länger wird",
        "weil elastische Energie gespeichert, der Dehnungsreflex genutzt und Vorspannung aufgebaut wird",
        "weil das Golgi-Sehnenorgan den Muskel abschaltet",
        "weil dadurch mehr Fasern gebildet werden"
      ],
      correct: 1,
      why: "Der Dehnungs-Verkürzungs-Zyklus — er funktioniert nur bei kurzer Umkehr. (Modul 7)"
    },
    {
      q: "Welche Aussage zur Faserzahl stimmt?",
      opts: [
        "Krafttraining erhöht die Faserzahl stark.",
        "Die Fasern werden vor allem dicker; die Zahl bleibt weitgehend gleich.",
        "Die Faserzahl sinkt durch Training.",
        "Die Faserzahl ändert sich täglich."
      ],
      correct: 1,
      why: "Hypertrophie heißt Dickenwachstum, nicht Vermehrung. (Modul 7)"
    }
  ];

  /* ---------- Quiz rendern ---------- */
  var LETTERS = ["A", "B", "C", "D"];

  function renderQuiz(container, key) {
    var questions = QUIZ[key];
    if (!questions) return;

    var answered = 0;
    var correct = 0;

    container.innerHTML = "";

    var head = document.createElement("div");
    head.className = "quiz__head";
    var title = document.createElement("span");
    title.className = "quiz__title";
    title.textContent = key === "final" ? "Abschlusstest · " + questions.length + " Fragen" : "Wissenscheck · " + questions.length + " Fragen";
    var score = document.createElement("span");
    score.className = "quiz__score";
    score.textContent = "0 / " + questions.length;
    head.appendChild(title);
    head.appendChild(score);

    var body = document.createElement("div");
    body.className = "quiz__body";

    var foot = document.createElement("div");
    foot.className = "quiz__foot";
    var result = document.createElement("span");
    result.className = "quiz__result";
    result.textContent = "Wähle bei jeder Frage eine Antwort.";
    var again = document.createElement("button");
    again.className = "btn";
    again.type = "button";
    again.textContent = "Quiz zurücksetzen";
    again.addEventListener("click", function () { renderQuiz(container, key); });
    foot.appendChild(result);
    foot.appendChild(again);

    questions.forEach(function (item, qi) {
      var wrap = document.createElement("div");
      wrap.className = "q";

      var text = document.createElement("p");
      text.className = "q__text";
      text.textContent = qi + 1 + ". " + item.q;
      wrap.appendChild(text);

      var opts = document.createElement("div");
      opts.className = "q__opts";

      var feedback = document.createElement("p");
      feedback.className = "q__feedback";

      item.opts.forEach(function (label, oi) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "opt";

        var kbd = document.createElement("span");
        kbd.className = "opt__key";
        kbd.textContent = LETTERS[oi] || String(oi + 1);

        var span = document.createElement("span");
        span.textContent = label;

        btn.appendChild(kbd);
        btn.appendChild(span);

        btn.addEventListener("click", function () {
          if (wrap.dataset.answered === "1") return;
          wrap.dataset.answered = "1";
          answered++;

          var isRight = oi === item.correct;
          if (isRight) correct++;

          Array.prototype.forEach.call(opts.children, function (child, ci) {
            child.disabled = true;
            if (ci === item.correct) child.classList.add("is-correct");
            else if (ci === oi) child.classList.add("is-wrong");
          });

          feedback.textContent = (isRight ? "Richtig. " : "Nicht ganz. ") + item.why;
          feedback.classList.add("is-shown");

          score.textContent = correct + " / " + questions.length;

          if (answered === questions.length) {
            var quota = Math.round((correct / questions.length) * 100);
            result.textContent =
              "Ergebnis: " + correct + " von " + questions.length + " richtig (" + quota + " %). " +
              (quota >= 75 ? "Sehr gut — weiter so." : "Schau dir die erklärten Stellen noch einmal an.");
            state.scores[key] = { correct: correct, total: questions.length };
            save(state);
          }
        });

        opts.appendChild(btn);
      });

      wrap.appendChild(opts);
      wrap.appendChild(feedback);
      body.appendChild(wrap);
    });

    container.appendChild(head);
    container.appendChild(body);
    container.appendChild(foot);

    var prev = state.scores[key];
    if (prev) {
      result.textContent = "Zuletzt: " + prev.correct + " von " + prev.total + " richtig. Neuer Versuch möglich.";
    }
  }

  document.querySelectorAll(".quiz").forEach(function (el) {
    renderQuiz(el, el.getAttribute("data-quiz"));
  });

  /* =================================================================
     Karteikarten
     ================================================================= */
  var CARDS = [
    ["Reihenfolge der Bauebenen im Muskel?", "Muskel → Faszikel → Muskelfaser → Myofibrille → Sarkomer"],
    ["Welche Hülle umgibt die einzelne Muskelfaser?", "Das Endomysium (Epimysium = ganzer Muskel, Perimysium = Faszikel)"],
    ["Was ist das Sarkolemm?", "Die Zellmembran der Muskelfaser"],
    ["Was sind T-Tubuli?", "Einstülpungen des Sarkolemms, die das Aktionspotenzial ins Faserinnere leiten"],
    ["Wofür ist das sarkoplasmatische Retikulum zuständig?", "Es speichert Ca²⁺, setzt es bei Erregung frei und pumpt es zur Entspannung aktiv zurück"],
    ["Von wo bis wo reicht ein Sarkomer?", "Von Z-Scheibe zu Z-Scheibe (ca. 2–2,5 µm)"],
    ["Welche Bande bleibt bei Kontraktion konstant?", "Die A-Bande — sie entspricht der Ausdehnung des Myosins"],
    ["Kernaussage der Gleitfilamenttheorie?", "Aktin und Myosin behalten ihre Länge und gleiten ineinander; das Sarkomer wird kürzer"],
    ["Welche Rolle spielt Ca²⁺?", "Es bindet an Troponin, verschiebt Tropomyosin und gibt die Bindungsstellen am Aktin frei"],
    ["Wofür wird ATP im Zyklus direkt gebraucht?", "Zum Lösen der Myosinköpfe und zum Zurückpumpen von Ca²⁺ (deshalb Totenstarre ohne ATP)"],
    ["Was ist eine motorische Einheit?", "Ein α-Motoneuron plus alle von ihm versorgten Muskelfasern"],
    ["Zwei Wege der Kraftdosierung?", "Rekrutierung (Zahl der Einheiten) und Frequenzierung (Impulsrate)"],
    ["Was besagt das Größenordnungsprinzip?", "Kleine, leicht erregbare Motoneurone feuern zuerst — Typ I vor Typ II (Henneman)"],
    ["Kennzeichen von Typ I?", "Langsam, ausdauernd, aerob, viele Mitochondrien und Kapillaren, geringe Kraft"],
    ["Kennzeichen von Typ IIx?", "Sehr schnell, sehr kräftig, anaerob-glykolytisch, ermüdet rasch"],
    ["Was verändert Training am Fasertypmuster?", "Vor allem Verschiebungen IIx → IIa; ein Wechsel zwischen Typ I und II ist kaum möglich"],
    ["Welche Fasern schwinden im Alter zuerst?", "Die Typ-II-Fasern — deshalb ist Krafttraining Sturzprophylaxe"],
    ["Was misst die Muskelspindel, und wie liegt sie?", "Länge und Dehnungsgeschwindigkeit; sie liegt parallel zu den Arbeitsfasern"],
    ["Was misst das Golgi-Sehnenorgan, und wie liegt es?", "Spannung (Kraft); es liegt in Serie am Muskel-Sehnen-Übergang"],
    ["Welche Afferenzen gehören wohin?", "Ia (dynamisch) und II (statisch) = Muskelspindel; Ib = Golgi-Sehnenorgan"],
    ["Wozu dient das γ-Motoneuron?", "Es spannt die intrafusalen Fasern nach, damit die Spindel auch bei Verkürzung messfähig bleibt"],
    ["Die drei Teilleistungen der Propriozeption?", "Stellungssinn, Bewegungssinn, Kraftsinn"],
    ["Die fünf Glieder des Reflexbogens?", "Rezeptor → afferenter Schenkel → Zentrum → efferenter Schenkel → Effektor"],
    ["Reziproke Hemmung — was passiert?", "Die Ia-Faser erregt den Agonisten und hemmt über ein Interneuron den Antagonisten"]
  ];

  var flashCard = document.getElementById("flashCard");
  var flashSide = document.getElementById("flashSide");
  var flashText = document.getElementById("flashText");
  var flashCount = document.getElementById("flashCount");
  var order = CARDS.map(function (_, i) { return i; });
  var pos = 0;
  var showBack = false;

  function renderCard() {
    if (!flashCard) return;
    var card = CARDS[order[pos]];
    flashSide.textContent = showBack ? "Antwort" : "Frage";
    flashText.textContent = showBack ? card[1] : card[0];
    flashCount.textContent = pos + 1 + " / " + CARDS.length;
  }
  function step(delta) {
    pos = (pos + delta + CARDS.length) % CARDS.length;
    showBack = false;
    renderCard();
  }

  if (flashCard) {
    flashCard.addEventListener("click", function () {
      showBack = !showBack;
      renderCard();
    });
    flashCard.addEventListener("keydown", function (e) {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        showBack = !showBack;
        renderCard();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    });
    document.getElementById("flashNext").addEventListener("click", function () { step(1); });
    document.getElementById("flashPrev").addEventListener("click", function () { step(-1); });
    document.getElementById("flashShuffle").addEventListener("click", function () {
      for (var i = order.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = order[i];
        order[i] = order[j];
        order[j] = tmp;
      }
      pos = 0;
      showBack = false;
      renderCard();
    });
    renderCard();
  }

  /* =================================================================
     Glossar
     ================================================================= */
  var GLOSSARY = [
    ["Aktin", "Dünnes Filament im Sarkomer, an der Z-Scheibe verankert. Trägt die Bindungsstellen für die Myosinköpfe."],
    ["Agonist", "Der Muskel, der eine Bewegung ausführt."],
    ["Antagonist", "Der Gegenspieler des Agonisten; bremst und sichert die Bewegung."],
    ["α-Motoneuron", "Nervenzelle im Rückenmark, die die Arbeitsfasern (extrafusale Fasern) ansteuert."],
    ["α-γ-Koaktivierung", "Gleichzeitige Ansteuerung von α- und γ-Motoneuronen, damit die Muskelspindel auch bei Verkürzung gespannt bleibt."],
    ["Autogene Hemmung", "Hemmung des eigenen Muskels über das Golgi-Sehnenorgan und sein Ib-Interneuron."],
    ["Dehnungsreflex", "Muskeleigenreflex: Plötzliche Dehnung reizt die Muskelspindel, der Muskel spannt reflektorisch an."],
    ["Dehnungs-Verkürzungs-Zyklus", "Abfolge aus schneller Vordehnung und sofortiger Verkürzung; nutzt elastische Energie, Dehnungsreflex und Vorspannung."],
    ["Endomysium", "Bindegewebshülle um die einzelne Muskelfaser."],
    ["Epimysium", "Bindegewebshülle um den gesamten Muskelbauch."],
    ["Exzentrisch", "Arbeitsweise, bei der der Muskel unter Spannung nachgibt und bremst."],
    ["Faszikel", "Bündel von Muskelfasern, umhüllt vom Perimysium."],
    ["Frequenzierung", "Kraftsteigerung über eine höhere Impulsrate des Motoneurons."],
    ["γ-Motoneuron", "Kleines Motoneuron, das die intrafusalen Fasern der Muskelspindel anspannt."],
    ["Gleitfilamenttheorie", "Erklärung der Kontraktion: Aktin und Myosin gleiten ineinander, ohne selbst kürzer zu werden."],
    ["Golgi-Sehnenorgan", "Spannungssensor am Muskel-Sehnen-Übergang, in Serie geschaltet; Afferenz Ib."],
    ["Größenordnungsprinzip", "Rekrutierungsregel nach Henneman: kleine Motoneurone zuerst, große zuletzt."],
    ["H-Zone", "Bereich des Myosins ohne Aktin-Überlappung; wird bei Kontraktion schmaler."],
    ["Hypertrophie", "Dickenwachstum der Muskelfasern durch Einlagerung zusätzlicher Myofibrillen."],
    ["Ia-Afferenz", "Schnell leitende Nervenfaser der Muskelspindel; meldet vor allem Dehnungsgeschwindigkeit."],
    ["Ib-Afferenz", "Nervenfaser des Golgi-Sehnenorgans; meldet Muskelspannung."],
    ["Intrafusale Fasern", "Dünne Spezialfasern im Inneren der Muskelspindel (im Gegensatz zu den extrafusalen Arbeitsfasern)."],
    ["Isometrisch", "Arbeitsweise mit Spannung, aber ohne Längenänderung."],
    ["Konzentrisch", "Arbeitsweise, bei der sich der Muskel gegen die Last verkürzt."],
    ["Motorische Einheit", "Ein α-Motoneuron und alle von ihm versorgten Muskelfasern."],
    ["Muskelspindel", "Längensensor im Muskelbauch, parallel geschaltet; Afferenzen Ia und II."],
    ["Muskeltonus", "Grundspannung des ruhenden Muskels aus passiven und aktiven (reflektorischen) Anteilen."],
    ["Myofibrille", "Fadenförmige Struktur im Faserinneren, aus in Reihe geschalteten Sarkomeren."],
    ["Myosin", "Dickes Filament im Sarkomer; seine Köpfe bilden die Querbrücken zum Aktin."],
    ["Perimysium", "Bindegewebshülle um einen Faszikel; führt Gefäße und Nerven."],
    ["Propriozeption", "Wahrnehmung von Stellung, Bewegung und Kraft des eigenen Körpers (Tiefensensibilität)."],
    ["Rekrutierung", "Kraftsteigerung durch Zuschalten weiterer motorischer Einheiten."],
    ["Reziproke Hemmung", "Hemmung des Antagonisten über ein Ia-Interneuron während der Agonist aktiviert wird."],
    ["Sarkomer", "Kleinste Baueinheit der Myofibrille, von Z-Scheibe zu Z-Scheibe."],
    ["Sarkopenie", "Altersbedingter Verlust an Muskelmasse und -kraft, vor allem der Typ-II-Fasern."],
    ["Sarkoplasmatisches Retikulum", "Kalziumspeicher, der die Myofibrillen netzartig umgibt."],
    ["Satellitenzellen", "Ruhende Stammzellen am Rand der Muskelfaser; steuern bei Wachstum und Reparatur Zellkerne bei."],
    ["Tetanus (physiologisch)", "Verschmelzung von Einzelzuckungen zu einer gleichmäßigen Dauerkontraktion bei hoher Reizfrequenz."],
    ["Troponin / Tropomyosin", "Regulatorproteine am Aktin: Tropomyosin verdeckt die Bindungsstellen, Ca²⁺ am Troponin gibt sie frei."],
    ["Typ-I-Faser", "Langsame, ausdauernde, aerob arbeitende Muskelfaser."],
    ["Typ-IIa-Faser", "Schnelle Faser mit gemischtem Stoffwechsel; gut trainierbarer Allrounder."],
    ["Typ-IIx-Faser", "Sehr schnelle, sehr kräftige, rasch ermüdende Faser mit anaerobem Stoffwechsel."],
    ["Z-Scheibe", "Begrenzung des Sarkomers und Verankerung der Aktinfilamente."]
  ];

  var glossaryList = document.getElementById("glossaryList");
  var glossarySearch = document.getElementById("glossarySearch");

  function renderGlossary(filter) {
    if (!glossaryList) return;
    var needle = (filter || "").trim().toLowerCase();
    glossaryList.innerHTML = "";

    var hits = GLOSSARY.filter(function (entry) {
      if (!needle) return true;
      return entry[0].toLowerCase().indexOf(needle) !== -1 || entry[1].toLowerCase().indexOf(needle) !== -1;
    });

    if (!hits.length) {
      var empty = document.createElement("p");
      empty.className = "glossary__empty";
      empty.textContent = "Kein Eintrag gefunden. Versuch es mit einem kürzeren Suchwort.";
      glossaryList.appendChild(empty);
      return;
    }

    hits.forEach(function (entry) {
      var item = document.createElement("div");
      item.className = "glossary__item";
      var term = document.createElement("p");
      term.className = "glossary__term";
      term.textContent = entry[0];
      var def = document.createElement("p");
      def.className = "glossary__def";
      def.textContent = entry[1];
      item.appendChild(term);
      item.appendChild(def);
      glossaryList.appendChild(item);
    });
  }

  if (glossarySearch) {
    glossarySearch.addEventListener("input", function () {
      renderGlossary(glossarySearch.value);
    });
  }
  renderGlossary("");

  renderProgress();
})();
