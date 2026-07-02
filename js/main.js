/* ===================================================================
   EB Hochdruckreinigung — interactions
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

  /* ---------- Before / after slider ---------- */
  var baSlider = document.getElementById("baSlider");
  var baBefore = document.getElementById("baBefore");
  var baHandle = document.getElementById("baHandle");

  if (baSlider && baBefore && baHandle) {
    var dragging = false;

    function setPosition(percent) {
      percent = Math.min(100, Math.max(0, percent));
      baBefore.style.width = percent + "%";
      baHandle.style.left = percent + "%";
      baHandle.setAttribute("aria-valuenow", String(Math.round(percent)));
    }

    function positionFromClientX(clientX) {
      var rect = baSlider.getBoundingClientRect();
      var percent = ((clientX - rect.left) / rect.width) * 100;
      setPosition(percent);
    }

    baSlider.addEventListener("pointerdown", function (e) {
      dragging = true;
      baSlider.setPointerCapture(e.pointerId);
      positionFromClientX(e.clientX);
    });
    baSlider.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      positionFromClientX(e.clientX);
    });
    baSlider.addEventListener("pointerup", function () { dragging = false; });
    baSlider.addEventListener("pointercancel", function () { dragging = false; });

    baHandle.addEventListener("keydown", function (e) {
      var current = parseFloat(baHandle.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") { setPosition(current - 5); e.preventDefault(); }
      if (e.key === "ArrowRight") { setPosition(current + 5); e.preventDefault(); }
    });

    setPosition(50);
  }

  /* ---------- Contact form -> mailto ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();

      if (!name || !phone) {
        form.reportValidity();
        return;
      }

      var email = form.email.value.trim();
      var place = form.place.value.trim();
      var type = form.type.value;
      var message = form.message.value.trim();

      var subject = "Anfrage über die Website: " + type;
      var bodyLines = [
        "Name: " + name,
        "Telefon: " + phone,
        "E-Mail: " + (email || "-"),
        "PLZ / Ort: " + (place || "-"),
        "Art der Fläche: " + type,
        "",
        "Nachricht:",
        message || "-"
      ];

      var mailto =
        "mailto:[E-Mail eintragen]" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
    });
  }
})();
