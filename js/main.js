/* ===================================================================
   Eiscafé Adria — interactions
   =================================================================== */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  function closeNav() {
    if (!links) return;
    links.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    document.addEventListener("click", function (e) {
      if (
        links.classList.contains("is-open") &&
        !links.contains(e.target) &&
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
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-stuck", y > 10);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
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

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- "Geöffnet / Geschlossen" indicator ----------
     Mo–Sa 09:00–23:00 · So & (vereinfacht) 10:00–23:00          */
  var stateEl = document.getElementById("openState");
  if (stateEl) {
    var now = new Date();
    var day = now.getDay(); // 0 = Sonntag
    var minutes = now.getHours() * 60 + now.getMinutes();
    var openMin = (day === 0 ? 10 : 9) * 60;
    var closeMin = 23 * 60;
    var isOpen = minutes >= openMin && minutes < closeMin;

    stateEl.classList.add(isOpen ? "is-open" : "is-closed");
    stateEl.innerHTML =
      '<span class="dot"></span>' +
      (isOpen
        ? "Jetzt geöffnet — wir freuen uns auf Sie!"
        : "Gerade geschlossen — bald wieder für Sie da.");
  }
})();
