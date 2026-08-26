/* ==========================================================================
   main.js — theme toggle, heading anchors, small shared helpers.
   Vanilla, no dependencies. Degrades cleanly if localStorage is blocked.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------- safe storage */
  var store = {
    get: function (k) {
      try { return window.localStorage.getItem(k); } catch (e) { return null; }
    },
    set: function (k, v) {
      try { window.localStorage.setItem(k, v); return true; } catch (e) { return false; }
    },
    remove: function (k) {
      try { window.localStorage.removeItem(k); } catch (e) {}
    }
  };
  window.ITIT_STORE = store;

  /* ---------------------------------------------------------------- theme */
  var THEME_KEY = 'itit-theme';

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme'); // dark is the default
    }
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      b.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      b.setAttribute('title', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      var lbl = b.querySelector('[data-theme-label]');
      if (lbl) { lbl.textContent = theme === 'light' ? 'dark' : 'light'; }
    }
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  // Applied as early as possible by an inline snippet in <head>; re-sync here.
  applyTheme(store.get(THEME_KEY) === 'light' ? 'light' : 'dark');

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-theme-toggle]') : null;
    if (!btn) { return; }
    e.preventDefault();
    var next = currentTheme() === 'light' ? 'dark' : 'light';
    applyTheme(next);
    store.set(THEME_KEY, next);
  });

  /* ------------------------------------------------- heading anchor links */
  function addAnchors() {
    var heads = document.querySelectorAll('main h2[id], main h3[id]');
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      if (h.querySelector('.anchor')) { continue; }
      var a = document.createElement('a');
      a.className = 'anchor';
      a.href = '#' + h.id;
      a.setAttribute('aria-label', 'Link to this section');
      a.textContent = '#';
      h.appendChild(a);
    }
  }

  /* ----------------------------------------------- highlight current chapter */
  function markCurrentNav() {
    var file = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var links = document.querySelectorAll('.site-header a[href]');
    for (var i = 0; i < links.length; i++) {
      var href = (links[i].getAttribute('href') || '').toLowerCase();
      if (href === file) { links[i].setAttribute('aria-current', 'page'); }
    }
  }

  /* ------------------------------------------------------------ boot */
  function boot() {
    addAnchors();
    markCurrentNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
