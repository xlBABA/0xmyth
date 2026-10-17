/* 0xMYTH — intro, scroll choreography and interactions.
   The techniques follow what REA recovered from the reference build (GSAP timelines,
   data-attribute ScrollTrigger reveals, gsap.matchMedia gating, a pinned + scrubbed
   shelf, quickTo magnetics); the code and motion design here are written fresh.
   Everything degrades: reduced motion skips the intro and scroll effects, and the
   page still works if GSAP or WebGL is unavailable. */
(function () {
  'use strict';

  var html = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  var HEX = '0123456789abcdef';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ── portrait ──────────────────────────────────────────────────── */
  var portrait = window.Portrait
    ? Portrait.mount({ canvas: $('#portrait'), anchor: $('#portrait-anchor'), src: 'assets/mee-cutout.png' })
    : null;

  /* ── intro ─────────────────────────────────────────────────────── */
  // the same boot lines 0xmyth.com prints, then the wordmark decrypts from hex
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

  var booted = false;
  function onBooted() {
    if (booted) return;
    booted = true;
    html.classList.remove('intro-on');
    html.classList.add('booted');
    if (portrait) portrait.play();
    if (hasGsap) {
      gsap.set('#hero-mark', { clearProps: 'top' });
      heroScrollOut();
      ScrollTrigger.refresh();
    }
  }

  function runIntro() {
    var pre = $('#boot-lines');
    var rows = LINES.map(function () {
      var row = document.createElement('div');
      pre.appendChild(row);
      return row;
    });
    var skipped = false, typing = 0, tl = null;

    function renderAll() { rows.forEach(function (row, i) { row.innerHTML = colorize(LINES[i]); }); }

    function skip() {
      if (skipped) return;
      skipped = true;
      clearTimeout(typing);
      renderAll();
      if (!tl) tl = decrypt();
      tl.progress(1);
    }

    function typeLines(done) {
      var li = 0, ci = 0;
      (function step() {
        if (skipped) return;
        var line = LINES[li];
        ci = Math.min(line.length, ci + 2);
        rows[li].innerHTML = colorize(line.slice(0, ci)) + '<span class="cursor">▊</span>';
        if (ci < line.length) { typing = setTimeout(step, 14); return; }
        rows[li].innerHTML = colorize(line);
        li++;
        ci = 0;
        if (li < LINES.length) typing = setTimeout(step, 180);
        else typing = setTimeout(done, 220);
      })();
    }

    function decrypt() {
      var chars = $$('.wm-ch');
      var finals = chars.map(function (c) { return c.textContent; });
      var mark = $('#hero-mark');
      var mobile = window.innerWidth < 720;
      var gap = mobile ? 0 : Math.min(150, window.innerWidth * 0.09);
      var t = gsap.timeline({ onComplete: onBooted });

      // each glyph lands blurred and oversized, cycles through hex, then locks
      chars.forEach(function (el, i) {
        var at = 0.1 + i * 0.11;
        var proxy = { p: 0 };
        t.call(function () { el.classList.add('is-scrambling'); }, null, at)
          .fromTo(el, { opacity: 0, yPercent: 26, scale: 1.3, filter: 'blur(10px)' },
            { opacity: 1, yPercent: 0, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' }, at)
          .to(proxy, {
            p: 1, duration: 0.6 + i * 0.05, ease: 'none',
            onUpdate: function () { el.textContent = proxy.p < 0.88 ? HEX[(Math.random() * 16) | 0] : finals[i]; },
            onComplete: function () { el.textContent = finals[i]; el.classList.remove('is-scrambling'); }
          }, at);
      });
      var lockAt = 0.1 + (chars.length - 1) * 0.11 + 0.6 + (chars.length - 1) * 0.05;
      t.fromTo('.wm-scan', { left: '0%', opacity: 1 }, { left: '100%', duration: lockAt, ease: 'none' }, 0.05)
        .to('.wm-scan', { opacity: 0, duration: 0.2 }, lockAt)
        // a short glitch as the last glyph locks
        .to('.wordmark', { skewX: -7, x: 5, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, lockAt)
        .set('.wordmark', { skewX: 0, x: 0 })

        .addLabel('settle', '+=0.35')
        .to('#boot-lines', { autoAlpha: 0, y: -24, duration: 0.6, ease: 'power2.in' }, 'settle')
        .to(mark, {
          top: function () { return getComputedStyle(mark).getPropertyValue('--mark-top').trim() || '76%'; },
          duration: 1.4, ease: 'power3.inOut'
        }, 'settle')
        .call(function () { if (portrait) portrait.play(); }, null, 'settle+=0.15')
        .to('.wm-a', { x: -gap / 2, duration: 1.4, ease: 'power3.out' }, 'settle+=0.3')
        .to('.wm-b', { x: gap / 2, duration: 1.4, ease: 'power3.out' }, 'settle+=0.3')
        .fromTo('[data-hero-rise]', { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }, 'settle+=0.8')
        // nav and status bar slide in via CSS transitions once intro-on is gone
        .call(function () { html.classList.remove('intro-on'); }, null, 'settle+=0.9');
      return t;
    }

    function start() {
      window.addEventListener('keydown', skip, { once: true });
      window.addEventListener('pointerdown', skip, { once: true });
      setTimeout(function () { if (!skipped) $('#intro-skip').classList.add('show'); }, 900);
      typeLines(function () {
        if (skipped) return;
        tl = decrypt();
        tl.eventCallback('onComplete', function () {
          window.removeEventListener('keydown', skip);
          window.removeEventListener('pointerdown', skip);
          onBooted();
        });
      });
    }

    // measure with real fonts, but never wait on them for long
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fonts, new Promise(function (r) { setTimeout(r, 1500); })]).then(start);
  }

  function heroScrollOut() {
    if (reduced) return;
    gsap.to('#hero-mark', {
      y: -90, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  if (hasGsap && html.classList.contains('intro-on')) {
    window.scrollTo(0, 0);
    runIntro();
  } else {
    onBooted();
  }

  /* ── scroll reveals ── declarative: data-reveal, data-reveal-group, data-reveal-lines, data-parallax */
  var FROM = { up: { y: 48 }, down: { y: -48 }, left: { x: -56 }, right: { x: 56 }, scale: { scale: 0.94 }, fade: {} };

  function reveals() {
    $$('[data-reveal]').forEach(function (el) {
      var from = FROM[el.dataset.reveal] || FROM.up;
      gsap.from(el, Object.assign({}, from, {
        opacity: 0, duration: 0.9, ease: 'power3.out',
        delay: parseFloat(el.dataset.revealDelay) || 0,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }));
    });
    $$('[data-reveal-group]').forEach(function (el) {
      var kids = $$(':scope > *', el);
      if (!kids.length) return;
      gsap.from(kids, {
        y: 32, opacity: 0, duration: 0.9, ease: 'power3.out',
        stagger: parseFloat(el.dataset.revealGroup) || 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    });
    $$('[data-reveal-lines]').forEach(function (el) {
      gsap.from($$('.line', el), {
        yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      });
    });
    $$('[data-parallax]').forEach(function (el) {
      var amt = parseFloat(el.dataset.parallax) || 40;
      gsap.fromTo(el, { yPercent: -amt / 10 }, {
        yPercent: amt / 10, ease: 'none',
        scrollTrigger: { trigger: el.closest('[data-parallax-frame]') || el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  /* ── whoami: words fill in as you scroll ───────────────────────── */
  function splitWords(root) {
    $$('*', root).concat([root]).forEach(function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType !== 3 || !child.textContent.trim()) return;
        var frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var span = document.createElement('span');
          span.className = 'word';
          span.textContent = part;
          frag.appendChild(span);
        });
        node.replaceChild(frag, child);
      });
    });
    return $$('.word', root);
  }

  var fillWords = splitWords($('#fill-text'));

  function fillText(desktop) {
    var p = $('#fill-text');
    if (!desktop) {
      gsap.from(p, { y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 88%', once: true } });
      return;
    }
    fillWords.forEach(function (w) { w.dataset.c = getComputedStyle(w).color; });
    gsap.fromTo(fillWords, { color: '#353a47' }, {
      color: function (i, el) { return el.dataset.c; },
      stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 50%', scrub: true }
    });
  }

  /* ── now: rows rise, rules draw, the counter runs ──────────────── */
  function nowSection() {
    var mods = $$('[data-mod]');
    gsap.timeline({ scrollTrigger: { trigger: '.mods', start: 'top 85%', once: true } })
      .from(mods, { yPercent: 40, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' })
      .from(mods, { '--rule': 0, duration: 0.8, stagger: 0.06, ease: 'power2.out' }, 0);

    var count = $('#mod-count'), target = parseInt(count.dataset.to, 10) || 0, obj = { v: 0 };
    count.textContent = '0';
    gsap.timeline({ scrollTrigger: { trigger: '#path', start: 'top 80%', once: true } })
      .from('#path-fill', { scaleX: 0, duration: 1.6, ease: 'power3.inOut' })
      .to(obj, { v: target, duration: 1.6, ease: 'power3.inOut', onUpdate: function () { count.textContent = Math.round(obj.v); } }, 0);
    return function () { count.textContent = target; };
  }

  /* ── certs: the certificate unmasks from the corner ────────────── */
  function certReveal() {
    gsap.timeline({ scrollTrigger: { trigger: '#cert', start: 'top 80%', once: true } })
      .fromTo('.cert-clip', { clipPath: 'inset(100% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' })
      .from('.cert-clip img', { scale: 1.25, duration: 1.8, ease: 'power3.out' }, 0);
  }

  /* ── writeups: the command types itself when the terminal arrives ─ */
  function terminal() {
    var cmd = $('#term-cmd'), out = $('#term-out'), full = cmd.textContent, timer = 0;
    cmd.textContent = '';
    out.style.visibility = 'hidden';
    ScrollTrigger.create({
      trigger: '.term', start: 'top 75%', once: true,
      onEnter: function () {
        var i = 0;
        (function step() {
          cmd.textContent = full.slice(0, ++i);
          if (i < full.length) timer = setTimeout(step, 65 + Math.random() * 50);
          else timer = setTimeout(function () { out.style.visibility = ''; }, 380);
        })();
      }
    });
    return function () { clearTimeout(timer); cmd.textContent = full; out.style.visibility = ''; };
  }

  /* ── contact: panel rises, rows follow, slow drift on desktop ──── */
  function contactPanel(desktop) {
    var panel = $('#contact-panel');
    gsap.timeline({ scrollTrigger: { trigger: panel, start: 'top 85%', once: true } })
      .from(panel, { y: 48, opacity: 0, duration: 1.1, ease: 'power3.out' })
      .from($$('[data-row]', panel), { yPercent: 60, opacity: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out' }, '-=0.75');
    if (desktop) {
      gsap.fromTo(panel, { yPercent: 4 }, {
        yPercent: -4, ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }
  }

  /* ── magnetic links ── gsap.quickTo keeps them springy and cheap ─ */
  function magnetic() {
    var off = [];
    $$('[data-magnetic]').forEach(function (el) {
      var k = parseFloat(el.dataset.magnetic) || 0.3;
      var toX = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
      var toY = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });
      function move(e) {
        var r = el.getBoundingClientRect();
        toX((e.clientX - (r.left + r.width / 2)) * k);
        toY((e.clientY - (r.top + r.height / 2)) * k);
      }
      function reset() { toX(0); toY(0); }
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', reset);
      el.addEventListener('blur', reset);
      off.push(function () {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', reset);
        el.removeEventListener('blur', reset);
        gsap.set(el, { clearProps: 'x,y' });
      });
    });
    return function () { off.forEach(function (f) { f(); }); };
  }

  /* ── projects: a shelf of systemd units ────────────────────────────
     desktop + motion: the section pins and vertical scroll scrubs the shelf;
     otherwise: native horizontal scroll with snap, mouse drag and arrow keys. */
  var shelf = (function () {
    var section = $('#projects'), viewport = $('#proj-viewport'), track = $('#proj-track');
    var cards = $$('.unit', track), n = cards.length;
    var meter = $('#proj-meter-fill'), label = $('#proj-index'), hint = $('#proj-hint');
    var active = -1, pinned = null;

    var dots = cards.map(function (card, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Go to ' + $('.unit-name', card).textContent);
      b.addEventListener('click', function () { goTo(i); });
      $('#proj-dots').appendChild(b);
      return b;
    });

    function setActive(i, progress) {
      if (progress != null) meter.style.width = (progress * 100).toFixed(2) + '%';
      if (i === active) return;
      active = i;
      cards.forEach(function (c, k) {
        var rack = Math.min(2, Math.abs(k - i));
        c.dataset.rack = rack;
        c.classList.toggle('active', rack === 0);
      });
      dots.forEach(function (d, k) { d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      label.textContent = pad2(i + 1) + ' / ' + pad2(n);
    }

    function offsetOf(i) { return cards[i].offsetLeft - cards[0].offsetLeft; }

    function goTo(i) {
      i = clamp(i, 0, n - 1);
      if (pinned) {
        var y = pinned.start + (pinned.end - pinned.start) * (i / (n - 1));
        window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
        return;
      }
      viewport.scrollTo({ left: offsetOf(i), behavior: reduced ? 'auto' : 'smooth' });
    }

    // native mode: track the card nearest the left edge
    var raf = 0;
    function measure() {
      var x = viewport.scrollLeft, best = 0, bestD = Infinity;
      cards.forEach(function (c, i) {
        var d = Math.abs(offsetOf(i) - x);
        if (d < bestD) { bestD = d; best = i; }
      });
      var max = viewport.scrollWidth - viewport.clientWidth;
      setActive(best, max > 0 ? x / max : 0);
    }
    viewport.addEventListener('scroll', function () {
      if (pinned) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    }, { passive: true });

    // mouse drag; touch keeps native momentum scrolling
    var drag = { on: false, x: 0, left: 0, moved: 0 };
    viewport.addEventListener('pointerdown', function (e) {
      if (pinned || e.pointerType === 'touch' || e.button !== 0) return;
      drag = { on: true, x: e.clientX, left: viewport.scrollLeft, moved: 0 };
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add('dragging');
    });
    viewport.addEventListener('pointermove', function (e) {
      if (!drag.on) return;
      var dx = e.clientX - drag.x;
      drag.moved = Math.max(drag.moved, Math.abs(dx));
      viewport.scrollLeft = drag.left - dx;
    });
    function endDrag(e) {
      if (!drag.on) return;
      drag.on = false;
      viewport.classList.remove('dragging');
      if (viewport.hasPointerCapture && viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
      measure();
      goTo(active);
    }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    // a drag that ends on a link must not follow it
    viewport.addEventListener('click', function (e) { if (drag.moved > 6) { e.preventDefault(); e.stopPropagation(); drag.moved = 0; } }, true);

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1); }
    });

    setActive(0, 0);

    return {
      pin: function () {
        section.classList.add('is-pinned');
        viewport.scrollLeft = 0;
        hint.textContent = '↓ scroll to browse units';
        var dist = function () { return Math.max(0, track.scrollWidth - viewport.clientWidth); };
        var tween = gsap.to(track, {
          x: function () { return -dist(); },
          ease: 'none',
          scrollTrigger: {
            trigger: section, start: 'top top', end: function () { return '+=' + dist(); },
            pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: function (self) { setActive(Math.round(self.progress * (n - 1)), self.progress); }
          }
        });
        pinned = tween.scrollTrigger;
        return function () {
          pinned = null;
          section.classList.remove('is-pinned');
          hint.textContent = '→ drag to browse units';
          gsap.set(track, { clearProps: 'x' });
          active = -1;
          measure();
        };
      }
    };
  })();

  /* ── ctf: placements in a 5×7 pixel font ───────────────────────────
     lit cells fly in from a scatter when the row scrolls in; the pointer
     acts as a lens that pushes cells aside and lights them in the accent. */
  var FONT = {
    '1': '..#../.##../..#../..#../..#../..#../.###.',
    '2': '.###./#...#/....#/...#./..#../.#.../#####',
    '3': '####./....#/....#/.###./....#/....#/####.',
    '0': '.###./#...#/#..##/#.#.#/##..#/#...#/.###.',
    'S': '.####/#..../#..../.###./....#/....#/####.',
    'T': '#####/..#../..#../..#../..#../..#../..#..',
    'R': '####./#...#/#...#/####./#.#../#..#./#...#',
    'D': '####./#...#/#...#/#...#/#...#/#...#/####.',
    '#': '.#.#./.#.#./#####/.#.#./#####/.#.#./.#.#.'
  };
  var TONES = { text: [232, 230, 225], dim: [153, 160, 176] };
  var ACC = [255, 139, 61];

  function pixnum(canvas) {
    var text = canvas.dataset.text, tone = TONES[canvas.dataset.tone] || TONES.text;
    var ctx = canvas.getContext('2d');
    var lit = [], W = 0, H = 0, cell = 0, cols = 0, dpr = 1;
    var progress = reduced || !hasGsap ? 1 : 0;
    var mouse = { x: -9999, y: -9999, inf: 0, target: 0 }, looping = false;

    // lit cells keep a stable random scatter so re-layouts don't reshuffle them
    Array.from(text).forEach(function (ch, ci) {
      (FONT[ch] || '').split('/').forEach(function (row, ry) {
        for (var rx = 0; rx < 5; rx++) {
          if (row[rx] !== '#') continue;
          lit.push({ gx: ci * 6 + rx, gy: ry, sx: Math.random() - 0.5, sy: Math.random() - 0.5, d: Math.random() * 0.25 });
        }
      });
    });
    var textCols = text.length * 6 - 1;

    function layout() {
      var r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      cell = Math.min(H / 7.4, W / (textCols + 1));
      cols = Math.floor(W / cell);
      draw();
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var oy = (H - cell * 7) / 2, size = cell * 0.78, inset = (cell - size) / 2;
      // a faint LED grid behind the digits
      ctx.fillStyle = 'rgba(232,230,225,0.05)';
      for (var y = 0; y < 7; y++) for (var x = 0; x < cols; x++) ctx.fillRect(x * cell + inset, oy + y * cell + inset, size, size);

      var R = cell * 4.5;
      lit.forEach(function (c) {
        var delay = c.gx / textCols * 0.45 + c.d;
        var t = clamp((progress * 1.7 - delay) / 0.8, 0, 1);
        var e = 1 - Math.pow(1 - t, 3);
        var hx = c.gx * cell, hy = oy + c.gy * cell;
        var x = hx + c.sx * W * 0.7 * (1 - e), y = hy + c.sy * H * 1.6 * (1 - e);
        var dx = x + cell / 2 - mouse.x, dy = y + cell / 2 - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
        var lens = dist < R ? (1 - dist / R) * mouse.inf * e : 0;
        if (lens > 0) { x += dx / (dist || 1) * lens * cell * 0.9; y += dy / (dist || 1) * lens * cell * 0.9; }
        var col = tone.map(function (v, i) { return Math.round(v + (ACC[i] - v) * Math.min(1, lens * 1.6)); });
        ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + e.toFixed(3) + ')';
        var s = size * (1 + lens * 0.35);
        ctx.fillRect(x + (cell - s) / 2, y + (cell - s) / 2, s, s);
      });
    }

    function loop() {
      mouse.inf += (mouse.target - mouse.inf) * 0.15;
      draw();
      if (mouse.target > 0 || mouse.inf > 0.01) requestAnimationFrame(loop);
      else { mouse.inf = 0; looping = false; draw(); }
    }
    function kick() { if (!looping) { looping = true; requestAnimationFrame(loop); } }

    if (fine) {
      canvas.addEventListener('pointermove', function (e) {
        var r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
        mouse.target = 1;
        kick();
      });
      canvas.addEventListener('pointerleave', function () { mouse.target = 0; kick(); });
    }

    if (window.ResizeObserver) new ResizeObserver(layout).observe(canvas);
    else window.addEventListener('resize', layout);
    layout();

    return {
      play: function () {
        var p = { v: 0 };
        gsap.to(p, { v: 1, duration: 1.8, ease: 'none', onUpdate: function () { progress = p.v; draw(); } });
      }
    };
  }

  var pixnums = $$('.pixnum').map(pixnum);

  function ctfSection() {
    $$('[data-rec]').forEach(function (rec, i) {
      ScrollTrigger.create({ trigger: rec, start: 'top 82%', once: true, onEnter: function () { pixnums[i].play(); } });
      gsap.from($('.rec-body', rec), { x: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: rec, start: 'top 82%', once: true } });
    });
  }

  /* ── marquees: repeat the set until it spans the widest screen, then double it */
  $$('.marquee-track').forEach(function (track) {
    var items = Array.prototype.slice.call(track.children);
    var width = track.scrollWidth || 1;
    var reps = Math.max(1, Math.ceil(Math.max(window.innerWidth, 1920) / width));
    for (var r = 1; r < reps; r++) items.forEach(function (it) { var c = it.cloneNode(true); c.dataset.clone = ''; track.appendChild(c); });
    Array.prototype.slice.call(track.children).forEach(function (it) {
      var c = it.cloneNode(true);
      c.dataset.clone = '';
      track.appendChild(c);
    });
  });

  /* ── wire up motion, gated by media queries ────────────────────── */
  if (hasGsap) {
    gsap.matchMedia().add({
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 960px)'
    }, function (ctx) {
      var c = ctx.conditions;
      if (!c.motion) return;
      var cleanups = [];
      reveals();
      fillText(c.desktop);
      cleanups.push(nowSection());
      certReveal();
      cleanups.push(terminal());
      contactPanel(c.desktop);
      ctfSection();
      if (fine) cleanups.push(magnetic());
      if (c.desktop) cleanups.push(shelf.pin());
      return function () { cleanups.forEach(function (f) { f && f(); }); };
    });
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }

  /* ── nav: scrolled state, progress hairline, active section ────── */
  (function nav() {
    var bar = $('#nav'), progress = $('#nav-progress'), ticking = false;
    function update() {
      var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      bar.classList.toggle('scrolled', y > 24);
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();

    var links = $$('.nav-links a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + e.target.id;
          a.classList.toggle('active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) {
      var target = document.getElementById(a.getAttribute('href').slice(1));
      if (target) spy.observe(target);
    });
  })();

  /* ── mobile menu ───────────────────────────────────────────────── */
  (function menu() {
    var btn = $('#menu-btn'), panel = $('#mobile-menu'), bar = $('#nav');
    var items = $$('a', panel), open = false;
    function set(on) {
      open = on;
      btn.setAttribute('aria-expanded', on);
      btn.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
      panel.classList.toggle('open', on);
      panel.setAttribute('aria-hidden', !on);
      bar.classList.toggle('menu-open', on);
      document.body.style.overflow = on ? 'hidden' : '';
      items.forEach(function (a, i) { a.style.transitionDelay = on ? 120 + i * 55 + 'ms' : '0ms'; });
    }
    btn.addEventListener('click', function () { set(!open); });
    items.forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    window.addEventListener('keydown', function (e) { if (open && e.key === 'Escape') { set(false); btn.focus(); } });
  })();

  /* ── status bar ── same signals as 0xmyth.com ──────────────────── */
  (function statusbar() {
    // uptime since last deploy: document.lastModified mirrors Last-Modified on static hosts
    var DEPLOY_FALLBACK = Date.parse('2026-07-14T20:00:00+03:00');
    var deployedAt = Date.parse(document.lastModified) || DEPLOY_FALLBACK;
    var up = $('#sb-uptime');
    function tick() {
      var s = Math.max(0, Math.floor((Date.now() - deployedAt) / 1000));
      up.textContent = 'up ' + Math.floor(s / 86400) + 'd ' + pad2(Math.floor(s % 86400 / 3600)) + ':' +
        pad2(Math.floor(s % 3600 / 60)) + ':' + pad2(s % 60);
    }
    tick();
    setInterval(tick, 1000);

    // narrow screens show one segment at a time
    var segs = $$('.sb-seg'), si = 0;
    setInterval(function () {
      segs[si].classList.remove('on');
      si = (si + 1) % segs.length;
      segs[si].classList.add('on');
    }, 4000);

    // latest public push; the static text stays if the request fails
    var git = $('#sb-git');
    if (!window.fetch) return;
    fetch('https://api.github.com/users/xlbaba/events/public', { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (events) {
        for (var i = 0; i < events.length; i++) {
          var e = events[i];
          if (e.type === 'PushEvent' && e.payload && e.payload.commits && e.payload.commits.length) {
            var c = e.payload.commits[e.payload.commits.length - 1];
            var msg = c.message.split('\n')[0];
            if (msg.length > 34) msg = msg.slice(0, 33) + '…';
            git.textContent = 'git: ' + e.repo.name.split('/')[1] + ' — "' + msg + '"';
            return;
          }
        }
      })
      .catch(function () {});
  })();
})();
