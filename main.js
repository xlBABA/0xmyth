/* 0xMYTH portfolio — boot sequence · reveals · status bar
   no dependencies, no build step */
(function () {
  'use strict';
  var html = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── boot sequence ── plays on load, skippable, honest values ── */
  var LINES = [
    '> mounting ~/htb... 8 modules loaded, sqlmap_essentials in_progress',
    '> checking ctf record... ucsi26: 1st | national: 3rd | bhmea25: rank 120/∞ [needed: top 100]',
    '> starting server...'
  ];

  function colorize(line) {
    return line
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/^>/, '<span class="bl-prompt">&gt;</span>')
      .replace(/in_progress/, '<span class="c-live">in_progress</span>')
      .replace(/\[needed: top 100\]/, '<span class="c-err">[needed: top 100]</span>');
  }

  var boot = document.getElementById('boot');
  var bootDone = false;

  function finishBoot() {
    if (bootDone) return;
    bootDone = true;
    html.classList.add('booted');
    if (boot) {
      boot.classList.add('done');
      setTimeout(function () { boot.remove(); }, 420);
    }
    window.removeEventListener('keydown', skipBoot);
    window.removeEventListener('pointerdown', skipBoot);
  }

  function skipBoot() { renderAll(); finishBoot(); }

  var pre = document.getElementById('boot-lines');
  var rows = [];
  function renderAll() {
    if (!pre) return;
    rows.forEach(function (row, i) { row.innerHTML = colorize(LINES[i]); });
  }

  if (!boot || !pre || reduced || getComputedStyle(boot).display === 'none') {
    if (boot) boot.remove();
    html.classList.add('booted');
  } else {
    LINES.forEach(function () {
      var div = document.createElement('div');
      pre.appendChild(div);
      rows.push(div);
    });
    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '▊';

    window.addEventListener('keydown', skipBoot);
    window.addEventListener('pointerdown', skipBoot);
    setTimeout(function () {
      var hint = document.getElementById('boot-skip');
      if (hint && !bootDone) hint.classList.add('show');
    }, 800);

    var li = 0;
    function typeLine() {
      if (bootDone) return;
      var line = LINES[li], ci = 0, row = rows[li];
      row.appendChild(cursor);
      (function tick() {
        if (bootDone) return;
        ci++;
        row.textContent = line.slice(0, ci);
        row.appendChild(cursor);
        if (ci < line.length) {
          setTimeout(tick, 12);
        } else {
          row.innerHTML = colorize(line);
          li++;
          if (li < LINES.length) {
            setTimeout(typeLine, 260);
          } else {
            setTimeout(finishBoot, 420);
          }
        }
      })();
    }
    typeLine();
  }

  /* ── scroll reveals ── 400ms fade + y-offset, once per element ── */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ── nav scrollspy ── the system knows where you are ── */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if ('IntersectionObserver' in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['now', 'projects', 'ctf', 'certs', 'writeups', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ── status bar ─────────────────────────────────────────────── */
  /* uptime since last deploy — document.lastModified reflects the
     deployed file's Last-Modified header on static hosts */
  var DEPLOY_FALLBACK = Date.parse('2026-07-14T20:00:00+03:00');
  var deployedAt = Date.parse(document.lastModified) || DEPLOY_FALLBACK;
  var upEl = document.getElementById('sb-uptime');

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tickUptime() {
    if (!upEl) return;
    var s = Math.max(0, Math.floor((Date.now() - deployedAt) / 1000));
    var d = Math.floor(s / 86400);
    var h = Math.floor((s % 86400) / 3600);
    var m = Math.floor((s % 3600) / 60);
    upEl.textContent = 'up ' + d + 'd ' + pad(h) + ':' + pad(m) + ':' + pad(s % 60);
  }
  tickUptime();
  setInterval(tickUptime, 1000);

  /* segments rotate on interval on narrow screens (CSS gates visibility) */
  var segs = Array.prototype.slice.call(document.querySelectorAll('.sb-seg'));
  if (segs.length > 1) {
    var si = 0;
    setInterval(function () {
      segs[si].classList.remove('on');
      si = (si + 1) % segs.length;
      segs[si].classList.add('on');
    }, 4000);
  }

  /* last public GitHub push — static fallback already in the HTML */
  var gitEl = document.getElementById('sb-git');
  if (gitEl && window.fetch) {
    fetch('https://api.github.com/users/xlbaba/events/public', {
      headers: { Accept: 'application/vnd.github+json' }
    }).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (events) {
        for (var i = 0; i < events.length; i++) {
          var e = events[i];
          if (e.type === 'PushEvent' && e.payload && e.payload.commits && e.payload.commits.length) {
            var c = e.payload.commits[e.payload.commits.length - 1];
            var repo = e.repo.name.split('/')[1];
            var msg = c.message.split('\n')[0];
            if (msg.length > 34) msg = msg.slice(0, 33) + '…';
            gitEl.textContent = 'git: ' + repo + ' — "' + msg + '"';
            return;
          }
        }
      })
      .catch(function () { /* keep static fallback */ });
  }
})();
