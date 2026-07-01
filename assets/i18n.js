/* ============================================================
   CHASKI · lightweight i18n engine (no dependencies)
   - Each page defines window.I18N = { es:{key:val}, en:{...}, he:{...} }
   - Elements opt in with  data-i18n="key"  (innerHTML)
   - Attributes via  data-i18n-attr="placeholder:key;title:key2"
   - Language persists in localStorage; Hebrew flips dir=rtl.
   ============================================================ */
(function () {
  var LANGS = ["es", "en", "he"];
  var RTL = { he: true };
  var KEY = "chaski_lang";
  // Canonical legal footer — applied site-wide to any [data-i18n="foot_legal"] element.
  var LEGAL = {
    es: "Marca registrada en Indecopi (Perú): «Chaski, el poder mitológico». CHASKI es el nombre paraguas del ecosistema bajo esta marca. Operada por entidades legales separadas para fines comerciales y sin fines de lucro. © <span id='year'>2026</span> Pinjas ben David. Todos los derechos reservados.",
    en: "Registered trademark at Indecopi (Peru): “Chaski, el poder mitológico.” CHASKI is the ecosystem's umbrella name under this mark. Operated by separate legal entities for commercial and non-profit purposes. © <span id='year'>2026</span> Pinjas ben David. All rights reserved.",
    he: "סימן מסחר רשום ב-Indecopi (פרו): «Chaski, el poder mitológico». CHASKI הוא שם-המטרייה של האקוסיסטם תחת סימן זה. מופעל על-ידי ישויות משפטיות נפרדות למטרות מסחריות ולמטרות ללא כוונת רווח. © <span id='year'>2026</span> פנחס בן דוד. כל הזכויות שמורות."
  };

  function pick() {
    var u = new URLSearchParams(location.search).get("lang");
    if (u && LANGS.indexOf(u) > -1) return u;
    try { var s = localStorage.getItem(KEY); if (s && LANGS.indexOf(s) > -1) return s; } catch (e) {}
    var n = (navigator.language || "es").slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) > -1 ? n : "es";
  }

  function apply(lang) {
    var dict = (window.I18N && window.I18N[lang]) || {};
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", RTL[lang] ? "rtl" : "ltr");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"); if (p.length < 2) return;
        var attr = p[0].trim(), k = p[1].trim();
        if (dict[k] != null) el.setAttribute(attr, dict[k]);
      });
    });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    document.querySelectorAll('[data-i18n="foot_legal"]').forEach(function (el) { el.innerHTML = LEGAL[lang] || LEGAL.es; });
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.title = dict.__title || document.title;
  }

  window.setLang = function (l) { if (LANGS.indexOf(l) > -1) apply(l); };
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () { window.setLang(b.dataset.lang); });
    });
    apply(pick());
    var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  });
})();
