/* Fuji San menu — progressive enhancement.
 * 1. Theme switcher (Sumi / Washi / Ai) for comparing the three designs.
 * 2. Highlights the nav chip of the section in view and keeps it visible in the bar.
 * 3. Fetches data/menu.json; if it differs from the version baked into index.html
 *    (hash mismatch), re-renders the menu from the JSON. Markup mirrors build.py.
 *
 * After the client picks a theme: set SHOW_SWITCHER = false and DEFAULT_THEME to the
 * chosen theme (e.g. "washi"), then run `python3 build.py` (it copies both values into
 * index.html so the right theme paints first, without any flash).
 */
const SHOW_SWITCHER = true;    // false = hide the switcher; everyone sees DEFAULT_THEME
const DEFAULT_THEME = "sumi";  // "sumi" | "washi" | "ai"

(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------ theme switcher */
  var FJ = window.FJ;

  function anchorEl() {
    // the element the reader is looking at, so a theme change keeps the same dish in the
    // same place on screen even though the three themes differ in height
    if (scrollY < 4) return null;
    // reading line ~30% down the screen (the same line that picks the active chip)
    var el = doc.elementFromPoint(innerWidth / 2, innerHeight * 0.3);
    el = el && el.closest(".item,.ft,.lvh,.sh,.cl,.climb,.sec,.hero,.foot-in > *,.foot");
    return el ? { el: el, top: el.getBoundingClientRect().top } : null;
  }
  function jumpTo(y) {
    var sb = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
    root.style.scrollBehavior = sb;
  }
  function keep(a) {
    if (!a) return;
    var d = a.el.getBoundingClientRect().top - a.top;
    if (Math.abs(d) > 0.5) jumpTo(scrollY + d);
  }
  // The new theme's fonts arrive a moment later and change line heights: keep the anchor
  // in place for a short while (with the browser's own scroll anchoring paused so the two
  // don't fight), and stop as soon as the reader touches, scrolls or types.
  var holdId = 0, HOLD_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"];
  function hold(a) {
    if (!a || !window.requestAnimationFrame) return;
    var id = ++holdId, until = Date.now() + 1500;
    function stop() {
      if (id === holdId) holdId++;
      root.style.overflowAnchor = "";
      HOLD_EVENTS.forEach(function (ev) { removeEventListener(ev, stop, true); });
    }
    root.style.overflowAnchor = "none";
    HOLD_EVENTS.forEach(function (ev) { addEventListener(ev, stop, { capture: true, passive: true }); });
    var lastY = scrollY;
    (function tick() {
      if (id !== holdId) return;
      if (Date.now() > until || Math.abs(scrollY - lastY) > 1) return stop(); // scrolled by someone else
      keep(a);
      lastY = scrollY;
      requestAnimationFrame(tick);
    })();
  }
  function pressed() {
    doc.querySelectorAll(".tsw-b").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-theme") === FJ.theme ? "true" : "false");
    });
  }
  function setTheme(t, save) {
    if (!FJ.T.hasOwnProperty(t)) return;
    if (t !== FJ.theme) {
      var a = anchorEl();
      root.className = root.className.replace(/\btheme-\w+/, "theme-" + t);
      FJ.theme = t;
      FJ.meta();
      var bye = doc.querySelector(".bye-img");   // the logo follows the class (CSS)
      if (bye) FJ.bye(bye);
      keep(a);
      hold(a);
      current = null;
      pickActive();
    }
    pressed();
    if (save) {
      try { localStorage.setItem(FJ.key, t); } catch (e) { /* private mode */ }
      try {
        var u = new URL(location.href);
        u.searchParams.set("theme", t);
        history.replaceState(history.state, "", u.pathname + u.search + u.hash);
      } catch (e) { /* old browser */ }
    }
  }
  function switcher() {
    if (!FJ || !FJ.T) return;                // index.html older than this app.js
    var box = doc.getElementById("tsw");
    if (!SHOW_SWITCHER) {
      if (box) box.remove();
      root.classList.remove("has-sw");
      if (FJ.theme !== DEFAULT_THEME) setTheme(DEFAULT_THEME, false);
      return;
    }
    if (!box) {                              // flag turned on but build.py not re-run yet
      var labels = { sumi: "سومي", washi: "واشي", ai: "آي" };
      box = doc.createElement("div");
      box.className = "tsw"; box.id = "tsw";
      box.setAttribute("role", "group"); box.setAttribute("aria-labelledby", "tsw-t");
      box.innerHTML = '<p class="tsw-t" id="tsw-t">اختر الثيم</p><div class="tsw-row">' + Object.keys(FJ.T).map(function (k) {
        return '<button type="button" class="tsw-b" data-theme="' + k + '" aria-pressed="false"><span class="tsw-sw" aria-hidden="true"></span>' + labels[k] + "</button>";
      }).join("") + "</div>";
      doc.body.insertBefore(box, doc.querySelector(".hero"));
      root.classList.add("has-sw");
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest(".tsw-b");
      if (b) setTheme(b.getAttribute("data-theme"), true);
    });
    pressed();
  }

  /* ------------------------------------------------------------ active chip */
  var io = null, current = null;

  function centerChip(chip) {
    var bar = doc.getElementById("chips");
    if (!bar || !chip) return;
    var b = bar.getBoundingClientRect(), c = chip.getBoundingClientRect();
    var delta = (c.left + c.width / 2) - (b.left + b.width / 2);
    if (Math.abs(delta) < 2) return;
    // scrollLeft grows to the right in every modern engine (negative in RTL), so a relative scroll works everywhere
    bar.scrollBy({ left: delta, behavior: reduce ? "auto" : "smooth" });
  }

  function setActive(id) {
    if (id === current) return;
    current = id;
    var chips = doc.querySelectorAll("#chips .chip"), active = null;
    for (var i = 0; i < chips.length; i++) {
      var on = chips[i].getAttribute("href") === "#" + id;
      if (on) { chips[i].setAttribute("aria-current", "true"); active = chips[i]; }
      else chips[i].removeAttribute("aria-current");
    }
    centerChip(active);
  }

  function pickActive() {
    var secs = doc.querySelectorAll("main .sec"), line = innerHeight * 0.35, id = null;
    for (var i = 0; i < secs.length; i++) {
      if (secs[i].getBoundingClientRect().top <= line) id = secs[i].id; else break;
    }
    setActive(id);
  }
  // A jump that skips whole sections (anchor link, footer link) never crosses the
  // observer's band, so also re-check once scrolling settles.
  var settle = 0;
  window.addEventListener("scroll", function () { clearTimeout(settle); settle = setTimeout(pickActive, 120); }, { passive: true });
  window.addEventListener("hashchange", function () { setTimeout(pickActive, 50); });

  function watchSections() {
    if (!("IntersectionObserver" in window)) return;
    if (io) io.disconnect();
    // The observer only signals that a section crossed the band 30–35% down the viewport;
    // the active one is then the last section whose top has passed that line. This also
    // stays correct after jumps (anchor links, the footer, the "climb" explainer).
    io = new IntersectionObserver(pickActive, { rootMargin: "-30% 0px -65% 0px" });
    doc.querySelectorAll("main .sec").forEach(function (s) { io.observe(s); });
  }

  /* ------------------------------------------------------------ rendering (mirror of build.py) */
  var esc = function (s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  };
  var RIYAL = '<svg class="ry" viewBox="0 0 1016 1118" role="img" aria-label="ريال"><use href="#ry"/></svg>';
  var dims = {};

  function pcsLabel(n) {
    if (!n) return "";
    if (n === 2) return "قطعتان";
    return n <= 10 ? n + " قطع" : n + " قطعة";
  }
  function imgTag(src, alt, cls, eager) {
    if (!src) return "";
    var d = dims[src], wh = d ? ' width="' + d[0] + '" height="' + d[1] + '"' : "";
    return '<img class="' + cls + '" src="' + esc(src) + '" alt="' + esc(alt) + '"' + wh +
      (eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">';
  }
  function meta(it) {
    var h = '<p class="meta"><span class="prices">';
    if (it.options && it.options.length) {
      h += it.options.map(function (o) {
        return '<span class="price"><span class="opt">' + esc(o.ar) + '</span><span class="num">' + o.price + "</span>" + RIYAL + "</span>";
      }).join('<span class="sep" aria-hidden="true">·</span>');
    } else {
      h += '<span class="price"><span class="num">' + it.price + "</span>" + RIYAL + "</span>";
    }
    h += "</span>";
    var f = "";
    if (it.pcs) f += '<span class="pcs">' + pcsLabel(it.pcs) + "</span>";
    if (it.cal != null) f += '<span class="cal"><span dir="ltr" lang="en">' + it.cal + " cal</span></span>";
    if (f) h += '<span class="facts">' + f + "</span>";
    return h + "</p>";
  }
  var badge = function (it) { return it.isNew ? '<span class="new">جديد · <span lang="en">New</span></span>' : ""; };
  var altText = function (it) { return "صورة " + it.ar; };
  var descP = function (it) { return it.desc ? '<p class="desc"><span dir="ltr" lang="en">' + esc(it.desc) + "</span></p>" : ""; };

  function itemLi(it, hl) {
    var d = dims[it.photo], wide = d && d[0] / d[1] >= 1.6;
    var ph = it.photo ? '<div class="ph' + (wide ? " ph--wide" : "") + '">' + imgTag(it.photo, altText(it), "ph-img") + "</div>" : "";
    return '<li class="item' + (ph ? "" : " item--nophoto") + '" id="i-' + esc(it.id) + '">' + ph + '<div class="bd">' +
      "<h" + hl + ' class="nm"><span class="ar">' + esc(it.ar) + "</span>" + badge(it) + "</h" + hl + ">" +
      '<p class="en"><span dir="ltr" lang="en">' + esc(it.en) + "</span></p>" + descP(it) + meta(it) + "</div></li>";
  }
  var fuji = function (k) { return '<svg class="fuji" viewBox="0 0 504 273" aria-hidden="true"><use href="#fuji-' + k + '"/></svg>'; };
  function levelHead(k, lv) {
    return '<h3 class="lvh"><span class="lvh-ar">' + fuji(k) + '<span class="lvh-name">' + esc(lv.ar) + '</span> <span class="lvh-type">' +
      esc(lv.typeAr) + '</span></span><span class="lvh-en"><span class="jp" lang="ja">' + esc(lv.jp) + '</span> <span dir="ltr" lang="en">' +
      esc(lv.en) + " · " + esc(lv.typeEn) + "</span></span></h3>";
  }
  function groupItems(items) {
    var order = [], g = {};
    items.forEach(function (it) {
      var k = it.level || "";
      if (!g[k]) { g[k] = []; order.push(k); }
      g[k].push(it);
    });
    return order.map(function (k) { return [k, g[k]]; });
  }
  function sectionHead(s) {
    return '<header class="sh"><div class="sh-t"><h2 id="' + esc(s.id) + '-h"><span class="sh-ar">' + esc(s.ar) +
      '</span><span class="sh-en" dir="ltr" lang="en" data-jp="' + esc(s.jp) + '">' + esc(s.en) + '</span></h2><svg class="brush" viewBox="0 0 1120 46" aria-hidden="true"><use href="#brush"/></svg></div>' +
      '<span class="sh-jp" lang="ja" aria-hidden="true">' + esc(s.jp) + "</span></header>";
  }
  function featured(it, i, kind) {
    return '<article class="ft ft--' + kind + (i % 2 ? " ft--alt" : "") + '" id="f-' + esc(it.id) + '"><div class="ft-ph"><span class="disc" aria-hidden="true"></span>' +
      imgTag(it.hero || it.photo, altText(it), "ft-img") + '</div><div class="ft-bd"><h3 class="ft-nm"><span class="ar">' + esc(it.ar) + "</span>" +
      (kind !== "new" ? badge(it) : "") + '</h3><p class="en"><span dir="ltr" lang="en">' + esc(it.en) + "</span></p>" + descP(it) + meta(it) + "</div></article>";
  }
  function climb(m) {
    var c = m.climb, rows = Object.keys(m.levels).map(function (k) {
      var lv = m.levels[k];
      return '<li class="cl lv-' + k + '"><span class="cl-main">' + fuji(k) + '<span class="cl-txt"><span class="cl-ar"><span class="lvh-name">' + esc(lv.ar) +
        "</span> · " + esc(lv.typeAr) + '</span><span class="cl-en" dir="ltr" lang="en">' + esc(lv.en) + " · " + esc(lv.typeEn) +
        '</span></span></span><span class="cl-jp" lang="ja" aria-hidden="true">' + esc(lv.jp) + "</span></li>";
    }).join("");
    return '<section class="climb" id="climb" aria-labelledby="climb-h"><h2 id="climb-h"><span class="sh-ar">' + esc(c.ar) +
      '</span><span class="climb-en" dir="ltr" lang="en">' + esc(c.en) + '</span></h2><p class="climb-ar">' + esc(c.textAr) +
      '</p><p class="climb-tx"><span dir="ltr" lang="en">' + esc(c.textEn) + '</span></p><ol class="cls">' + rows + "</ol></section>";
  }
  function renderSections(m) {
    var byId = {};
    m.sections.forEach(function (s) { s.items.forEach(function (it) { if (it.id) byId[it.id] = it; }); });
    var out = "";
    m.sections.forEach(function (s) {
      if (m.climb && m.climb.beforeSection === s.id) out += climb(m);
      var items = s.items.map(function (x) { return x.ref ? byId[x.ref] : x; }).filter(Boolean), body = "";
      if (s.layout === "featured") {
        var kind = s.id === "new" ? "new" : "box";
        body = '<div class="fts">' + items.map(function (it, i) { return featured(it, i, kind); }).join("") + "</div>";
      } else {
        groupItems(items).forEach(function (g) {
          var lv = m.levels[g[0]], hl = lv ? 4 : 3;
          body += '<div class="' + (lv ? "card card--lv lv-" + g[0] : "card") + '">' + (lv ? levelHead(g[0], lv) : "") +
            '<ul class="items">' + g[1].map(function (it) { return itemLi(it, hl); }).join("") + "</ul></div>";
        });
      }
      out += '<section class="sec sec--' + s.layout + '" id="' + esc(s.id) + '" aria-labelledby="' + esc(s.id) + '-h">' + sectionHead(s) + body + "</section>";
    });
    return out;
  }
  function contactHref(kind, v) {
    if (!v) return "";
    if (kind === "phone") return "tel:" + v.replace(/[^\d+]/g, "");
    if (kind === "whatsapp") return "https://wa.me/" + v.replace(/\D/g, "");
    return "https://instagram.com/" + v.replace(/^@/, "");
  }
  function updateContact(m) {
    var box = doc.getElementById("contact");
    if (!box || !m.contact) return;
    ["phone", "whatsapp", "instagram"].forEach(function (kind, i) {
      var el = box.children[i], href = contactHref(kind, m.contact[kind]);
      if (!el) return;
      var isLink = el.tagName === "A";
      if (href && !isLink) {
        var a = doc.createElement("a");
        a.className = "cb"; a.href = href; a.innerHTML = el.innerHTML;
        if (/^http/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
        el.replaceWith(a);
      } else if (href) el.setAttribute("href", href);
    });
  }

  function fnv1a(bytes) {
    var h = 0x811c9dc5;
    for (var i = 0; i < bytes.length; i++) { h ^= bytes[i]; h = Math.imul(h, 0x01000193) >>> 0; }
    return ("0000000" + h.toString(16)).slice(-8);
  }

  function refresh() {
    if (!window.fetch || !window.TextDecoder) return;
    fetch("data/menu.json", { cache: "no-cache" }).then(function (r) {
      return r.ok ? r.arrayBuffer() : null;
    }).then(function (buf) {
      if (!buf) return;
      var bytes = new Uint8Array(buf);
      if (fnv1a(bytes) === root.getAttribute("data-menu-hash")) return; // pre-rendered HTML is current
      var m = JSON.parse(new TextDecoder("utf-8").decode(bytes));
      doc.querySelectorAll("img[width]").forEach(function (im) { dims[im.getAttribute("src")] = [im.getAttribute("width"), im.getAttribute("height")]; });
      doc.getElementById("menu").innerHTML = renderSections(m);
      doc.getElementById("chips").innerHTML = m.sections.map(function (s) { return '<a class="chip" href="#' + esc(s.id) + '">' + esc(s.nav) + "</a>"; }).join("");
      updateContact(m);
      current = null;
      watchSections();
    }).catch(function () { /* offline or file:// — keep the pre-rendered menu */ });
  }

  switcher();
  watchSections();
  var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1200); };
  if (doc.readyState === "complete") idle(refresh);
  else window.addEventListener("load", function () { idle(refresh); });
})();
