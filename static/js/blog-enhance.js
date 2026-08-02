/* ===== Melhorias do tema — tema claro/escuro, voltar ao topo, progresso ===== */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* Controla o link #darkModeStyle do tema Archie (dark.css):
     - auto  -> restaura a media query original (segue o sistema)
     - light -> desabilita o dark.css
     - dark  -> habilita o dark.css sem media query */
  var darkStyle = document.getElementById("darkModeStyle");
  var ORIG_MEDIA = darkStyle ? (darkStyle.getAttribute("media") || "all") : null;

  function applyTheme(theme) {
    var resolved = theme === "auto" ? (systemPrefersDark() ? "dark" : "light") : theme;
    root.dataset.theme = resolved;                    // CSS novo (data-theme)
    root.classList.toggle("dark", resolved === "dark"); // fallback (.dark)
    root.style.colorScheme = resolved;

    if (darkStyle) {
      if (theme === "auto") {
        darkStyle.disabled = false;
        darkStyle.media = ORIG_MEDIA;
      } else if (theme === "light") {
        darkStyle.disabled = true;
      } else {
        darkStyle.disabled = false;
        darkStyle.media = "all";
      }
    }

    /* Box do tema ativo no seletor THEMA: LIGHT | DARK */
    var lightBtn = document.getElementById("theme-opt-light");
    var darkBtn = document.getElementById("theme-opt-dark");
    if (lightBtn && darkBtn) {
      var isDark = resolved === "dark";
      lightBtn.classList.toggle("active", !isDark);
      darkBtn.classList.toggle("active", isDark);
      lightBtn.setAttribute("aria-pressed", isDark ? "false" : "true");
      darkBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
    }
  }

  /* Troca de tema com transição suave:
     - View Transitions API quando disponível (crossfade da página inteira)
     - fallback: classe .theme-anim anima as cores via CSS por ~600ms */
  function transitionTheme(theme) {
    if (prefersReducedMotion()) {
      applyTheme(theme);
      return;
    }
    if (document.startViewTransition) {
      document.startViewTransition(function () { applyTheme(theme); });
    } else {
      applyTheme(theme);
      root.classList.add("theme-anim");
      clearTimeout(root._themeAnimTimer);
      root._themeAnimTimer = setTimeout(function () { root.classList.remove("theme-anim"); }, 600);
    }
  }

  function getSavedTheme() {
    try { return localStorage.getItem(STORAGE_KEY) || "auto"; } catch (e) { return "auto"; }
  }

  function setTheme(theme) {
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    transitionTheme(theme);
  }

  function init() {
    /* Seletor de tema textual: THEMA: LIGHT | DARK */
    var switcher = document.createElement("div");
    switcher.className = "theme-switcher";
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Tema do site");

    var label = document.createElement("span");
    label.className = "theme-label";
    label.textContent = "THEMA:";
    switcher.appendChild(label);

    function makeOpt(id, text, theme) {
      var b = document.createElement("button");
      b.type = "button";
      b.id = id;
      b.className = "theme-opt";
      b.textContent = text;
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { setTheme(theme); });
      return b;
    }

    var lightBtn = makeOpt("theme-opt-light", "LIGHT", "light");
    var sep = document.createElement("span");
    sep.className = "theme-sep";
    sep.textContent = "|";
    sep.setAttribute("aria-hidden", "true");
    var darkBtn = makeOpt("theme-opt-dark", "DARK", "dark");

    switcher.appendChild(lightBtn);
    switcher.appendChild(sep);
    switcher.appendChild(darkBtn);
    document.body.appendChild(switcher);

    applyTheme(getSavedTheme());

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
