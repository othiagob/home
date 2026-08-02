/* ===== Melhorias do tema — tema claro/escuro, voltar ao topo, progresso ===== */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(theme) {
    var resolved = theme === "auto" ? (systemPrefersDark() ? "dark" : "light") : theme;
    root.dataset.theme = resolved;                    // Archie novo (data-theme)
    root.classList.toggle("dark", resolved === "dark"); // Archie antigo (.dark)
    root.style.colorScheme = resolved;

    /* Tema Archie: dark.css é controlado pela media query do <link id="darkModeStyle"> */
    var darkLink = document.getElementById("darkModeStyle");
    if (darkLink) {
      if (theme === "auto") {
        darkLink.media = "(prefers-color-scheme: dark)";
      } else {
        darkLink.media = resolved === "dark" ? "all" : "not all";
      }
    }

    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-label", resolved === "dark" ? "Ativar tema claro" : "Ativar tema escuro");
      btn.textContent = resolved === "dark" ? "☀️" : "🌙";
    }
  }

  function getSavedTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || "auto"; } catch (e) { return "auto"; }
  }

  function toggleTheme() {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    applyTheme(next);
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function init() {
    /* Botão de tema */
    var toggleBtn = document.createElement("button");
    toggleBtn.id = "theme-toggle";
    toggleBtn.type = "button";
    toggleBtn.className = "enh-toggle";
    toggleBtn.setAttribute("aria-label", "Alternar tema claro/escuro");
    document.body.appendChild(toggleBtn);
    applyTheme(getSavedTheme());
    toggleBtn.addEventListener("click", toggleTheme);

    /* Botão voltar ao topo */
    var topBtn = document.createElement("button");
    topBtn.id = "back-to-top";
    topBtn.type = "button";
    topBtn.className = "enh-top";
    topBtn.setAttribute("aria-label", "Voltar ao topo");
    topBtn.textContent = "↑";
    topBtn.hidden = true;
    document.body.appendChild(topBtn);
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      topBtn.hidden = y < 400;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Barra de progresso de leitura */
    var bar = document.createElement("div");
    bar.id = "reading-progress";
    document.body.appendChild(bar);
    function onProgress() {
      var doc = document.documentElement;
      var total = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (total > 0 ? (doc.scrollTop / total) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", onProgress, { passive: true });
    window.addEventListener("resize", onProgress);
    onProgress();

    /* Reage à mudança de tema do sistema quando está em "auto" */
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function () { if (getSavedTheme() === "auto") applyTheme("auto"); };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
