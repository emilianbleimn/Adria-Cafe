/* ===================================================================
   EB-Hochdruckreinigung — interactions
   =================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  function closeNav() {
    if (!nav) return;
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        closeNav();
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("siteHeader");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-stuck", y > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---------- Light / dark mode toggle ---------- */
  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    var root = document.documentElement;

    function syncPressed() {
      themeToggle.setAttribute("aria-pressed", String(root.getAttribute("data-theme") === "dark"));
    }
    syncPressed();

    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("eb-theme", next); } catch (e) {}
      syncPressed();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Booking calendar ----------
     Belegte Tage hier eintragen (Format "JJJJ-MM-TT"), z. B.:
     var BLOCKED_DATES = ["2026-07-14", "2026-07-15"];
     Sonntag gilt automatisch als geschlossen, Samstag als "auf Anfrage". */
  var BLOCKED_DATES = [];
  var BOOKING_MAX_MONTHS_AHEAD = 3;

  var calDays = document.getElementById("calDays");
  var calMonthLabel = document.getElementById("calMonthLabel");
  var calPrev = document.getElementById("calPrev");
  var calNext = document.getElementById("calNext");
  var calSelectedText = document.getElementById("calSelectedText");
  var cfTermin = document.getElementById("cfTermin");
  var cfSlot = document.getElementById("cfSlot");

  var MONTH_NAMES = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ];
  var WEEKDAY_LABELS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  var selectedDateStr = "";
  var selectedSlot = "";
  var refreshCalendar = function () {};

  function formatSelected(y, m, d) {
    var date = new Date(y, m, d);
    var weekday = WEEKDAY_LABELS[date.getDay()];
    return weekday + ", " + d + ". " + MONTH_NAMES[m] + " " + y;
  }

  function updateSelectedText() {
    if (!calSelectedText) return;
    var span = calSelectedText.querySelector("span");

    if (!selectedDateStr) {
      calSelectedText.classList.remove("has-date");
      span.textContent = "Noch kein Termin ausgewählt — bitte oben im Kalender einen freien Tag anklicken.";
      return;
    }

    var parts = selectedDateStr.split("-");
    var dateLabel = formatSelected(+parts[0], +parts[1] - 1, +parts[2]);
    var isSaturday = new Date(+parts[0], +parts[1] - 1, +parts[2]).getDay() === 6;

    if (!selectedSlot) {
      calSelectedText.classList.remove("has-date");
      span.textContent = "Termin: " + dateLabel + " — bitte noch eine Uhrzeit auswählen.";
      return;
    }

    calSelectedText.classList.add("has-date");
    span.textContent = "Ausgewählter Termin: " + dateLabel + ", " + selectedSlot +
      (isSaturday ? " (Samstag nur auf Anfrage — ich bestätige, sobald ich Zeit habe)" : "");
  }

  function updateTimeOptions(isSaturday) {
    if (!cfSlot) return;
    var previousValue = cfSlot.value;
    var times = isSaturday ? ["12:00 Uhr"] : ["10:00 Uhr", "16:00 Uhr"];

    cfSlot.innerHTML = "";
    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.textContent = "Bitte wählen …";
    cfSlot.appendChild(placeholder);

    times.forEach(function (t) {
      var opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      cfSlot.appendChild(opt);
    });

    if (times.indexOf(previousValue) !== -1) {
      cfSlot.value = previousValue;
      selectedSlot = previousValue;
    } else {
      placeholder.selected = true;
      selectedSlot = "";
    }
  }

  if (cfSlot) {
    cfSlot.addEventListener("change", function () {
      selectedSlot = cfSlot.value;
      updateSelectedText();
    });
  }

  if (calDays && calMonthLabel && calPrev && calNext) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var minYear = today.getFullYear();
    var minMonth = today.getMonth();
    var maxDate = new Date(minYear, minMonth + BOOKING_MAX_MONTHS_AHEAD, 1);

    var viewYear = minYear;
    var viewMonth = minMonth;

    function toISODate(y, m, d) {
      return y + "-" + String(m + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    }

    function renderCalendar() {
      calMonthLabel.textContent = MONTH_NAMES[viewMonth] + " " + viewYear;
      calPrev.disabled = viewYear === minYear && viewMonth === minMonth;
      calNext.disabled = viewYear === maxDate.getFullYear() && viewMonth === maxDate.getMonth();

      calDays.innerHTML = "";

      var firstDay = new Date(viewYear, viewMonth, 1);
      var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      var leadingEmpty = (firstDay.getDay() + 6) % 7; // Montag = 0

      for (var i = 0; i < leadingEmpty; i++) {
        var empty = document.createElement("span");
        empty.className = "calendar-day calendar-day--empty";
        calDays.appendChild(empty);
      }

      for (var day = 1; day <= daysInMonth; day++) {
        var dateObj = new Date(viewYear, viewMonth, day);
        var iso = toISODate(viewYear, viewMonth, day);
        var isPast = dateObj < today;
        var isSunday = dateObj.getDay() === 0;
        var isSaturday = dateObj.getDay() === 6;
        var isBlocked = BLOCKED_DATES.indexOf(iso) !== -1;
        var isToday = dateObj.getTime() === today.getTime();
        var isSelected = iso === selectedDateStr;

        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "calendar-day";
        btn.textContent = String(day);

        if (isPast || isSunday || isBlocked) {
          btn.disabled = true;
          if (isBlocked && !isPast && !isSunday) {
            btn.classList.add("calendar-day--booked");
          }
        } else {
          if (isSaturday) btn.classList.add("calendar-day--onrequest");
          btn.addEventListener("click", function () {
            selectedDateStr = this.getAttribute("data-iso");
            if (cfTermin) cfTermin.value = selectedDateStr;
            var clickedDay = new Date(selectedDateStr + "T00:00:00").getDay();
            updateTimeOptions(clickedDay === 6);
            updateSelectedText();
            renderCalendar();
          });
        }

        btn.setAttribute("data-iso", iso);
        if (isToday) btn.classList.add("calendar-day--today");
        if (isSelected) btn.classList.add("calendar-day--selected");

        calDays.appendChild(btn);
      }
    }

    calPrev.addEventListener("click", function () {
      viewMonth--;
      if (viewMonth < 0) { viewMonth = 11; viewYear--; }
      renderCalendar();
    });
    calNext.addEventListener("click", function () {
      viewMonth++;
      if (viewMonth > 11) { viewMonth = 0; viewYear++; }
      renderCalendar();
    });

    refreshCalendar = renderCalendar;
    renderCalendar();
  }

  /* ---------- Photo previews ---------- */
  var photoInput = document.getElementById("cfPhotos");
  var photoPreviews = document.getElementById("photoPreviews");
  var previewUrls = [];

  if (photoInput && photoPreviews) {
    photoInput.addEventListener("change", function () {
      previewUrls.forEach(function (url) { URL.revokeObjectURL(url); });
      previewUrls = [];
      photoPreviews.innerHTML = "";

      Array.prototype.slice.call(photoInput.files, 0, 5).forEach(function (file) {
        var url = URL.createObjectURL(file);
        previewUrls.push(url);
        var img = document.createElement("img");
        img.src = url;
        img.alt = file.name;
        photoPreviews.appendChild(img);
      });
    });
  }

  /* ---------- Contact form -> Web3Forms ---------- */
  var form = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  function setStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.classList.remove("is-success", "is-error");
    if (type) formStatus.classList.add(type);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();

      if (!name || !phone) {
        form.reportValidity();
        return;
      }
      if (!cfTermin || !cfTermin.value) {
        setStatus("Bitte zuerst oben im Kalender einen freien Termin auswählen.", "is-error");
        return;
      }
      if (!selectedSlot) {
        setStatus("Bitte noch eine Uhrzeit auswählen.", "is-error");
        return;
      }

      var submitBtn = document.getElementById("cfSubmit");
      if (submitBtn) submitBtn.disabled = true;
      setStatus("Anfrage wird gesendet …", "");

      var formData = new FormData(form);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result.success) {
            setStatus("Danke! Deine Terminanfrage ist raus — ich melde mich in der Regel innerhalb von 24 Stunden.", "is-success");
            form.reset();
            if (photoPreviews) photoPreviews.innerHTML = "";
            if (cfTermin) cfTermin.value = "";
            selectedDateStr = "";
            selectedSlot = "";
            updateTimeOptions(false);
            updateSelectedText();
            refreshCalendar();
          } else {
            setStatus("Etwas ist schiefgelaufen. Ruf mich gerne direkt an: [Telefonnummer eintragen]", "is-error");
          }
        })
        .catch(function () {
          setStatus("Anfrage konnte nicht gesendet werden. Ruf mich gerne direkt an: [Telefonnummer eintragen]", "is-error");
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();
