/* ==========================================================================
   quiz.js — the practice engine. Contains no question data of its own:
   it merges the globals declared by assets/data/*.js at runtime.

   Three question types:
     mcq   — multiple choice, auto-graded. multi:true makes it multi-select
             (checkbox behaviour, all-or-nothing grading).
     blank — fill in the blank, auto-graded, forgiving string comparison.
     open  — theory / code writing. NEVER graded, never scored, never marked
             right or wrong. The user writes an answer, asks for the model
             answer, and both stay on screen for self-comparison.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------- helpers */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function clock(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60);
    return pad(m) + ':' + pad(sec % 60);
  }
  function humanTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    if (m === 0) { return s + 's'; }
    return m + 'm ' + pad(s) + 's';
  }
  function numCmp(a, b) { return a - b; }
  var store = window.ITIT_STORE || {
    get: function () { return null; }, set: function () { return false; }, remove: function () {}
  };

  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  var SOURCE_NAMES = { tutorial: 'Tutorials', midterm: 'Midterm', final: 'Final exam' };
  var TYPE_NAMES = { mcq: 'Multiple choice', blank: 'Fill in the blank', open: 'Open-ended' };

  /* The note that sits under every revealed model answer. Open-ended answers
     are written from the summary sheet and the slides, not from a marking
     scheme, and the site should never pretend otherwise. */
  var MODEL_NOTE =
    'This is a guide answer, not an official marking scheme. Check it against ' +
    'your own lecture slides and notes before relying on it.';

  /* ------------------------------------------------------- question bank */
  /* The data files declare top-level `const`s. Those are NOT properties of
     window, so each one has to be reached by name through typeof — reading
     window['NAME'] silently yields nothing and empties the whole bank. */
  var BANK = [];
  function absorb(g) { if (g && g.length) { BANK = BANK.concat(g); } }
  try { if (typeof TUTORIAL_QUESTIONS !== 'undefined') { absorb(TUTORIAL_QUESTIONS); } } catch (e) {}
  try { if (typeof MIDTERM_QUESTIONS !== 'undefined') { absorb(MIDTERM_QUESTIONS); } } catch (e) {}
  try { if (typeof FINAL_QUESTIONS !== 'undefined') { absorb(FINAL_QUESTIONS); } } catch (e) {}
  try { if (typeof EXAM_QUESTIONS !== 'undefined') { absorb(EXAM_QUESTIONS); } } catch (e) {}

  /* Defend against a malformed entry rather than dying on question 12 of 25.
     Each type has its own minimum shape. */
  function usable(q) {
    if (!q || typeof q !== 'object' || !q.question) { return false; }
    var type = q.type || 'mcq';
    if (type === 'open') {
      return typeof q.modelAnswer === 'string' && q.modelAnswer.length > 0;
    }
    if (type === 'blank') {
      if (!Array.isArray(q.blanks) || !q.blanks.length) { return false; }
      for (var i = 0; i < q.blanks.length; i++) {
        var b = q.blanks[i];
        if (!b || !Array.isArray(b.accepts) || !b.accepts.length) { return false; }
      }
      return true;
    }
    if (!Array.isArray(q.options) || q.options.length < 2) { return false; }
    if (q.multi) {
      if (!Array.isArray(q.answer) || !q.answer.length) { return false; }
      for (var j = 0; j < q.answer.length; j++) {
        var a = q.answer[j];
        if (typeof a !== 'number' || a < 0 || a >= q.options.length) { return false; }
      }
      return true;
    }
    return typeof q.answer === 'number' && q.answer >= 0 && q.answer < q.options.length;
  }
  BANK = BANK.filter(usable);
  BANK.forEach(function (q) { if (!q.type) { q.type = 'mcq'; } });

  /* A question that was asked in more than one paper is stored once and lists
     every paper it appeared in, so the paper filter still finds it in each. */
  function papersOf(q) {
    if (Array.isArray(q.papers)) { return q.papers; }
    return [q.paper || 'tutorial'];
  }

  /* --------------------------------------------------- answer comparison */
  /* Blanks are typed by hand, so be forgiving: lowercase, collapse runs of
     whitespace, drop surrounding punctuation and quotes, and treat a leading
     article as optional. Never do fuzzy matching beyond that — a wrong word
     should still read as wrong. */
  function norm(s) {
    s = String(s == null ? '' : s).toLowerCase();
    s = s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
    s = s.replace(/\s+/g, ' ').trim();
    s = s.replace(/^[.,;:!?"'()\[\]–—\s]+/, '');
    s = s.replace(/[.,;:!?"'()\[\]–—\s]+$/, '');
    return s.trim();
  }
  function stripArticle(s) { return s.replace(/^(?:a|an|the) /, ''); }

  function blankOk(blank, typed) {
    var got = norm(typed);
    if (!got) { return false; }
    var gotBare = stripArticle(got);
    for (var i = 0; i < blank.accepts.length; i++) {
      var want = norm(blank.accepts[i]);
      if (got === want || gotBare === stripArticle(want)) { return true; }
    }
    return false;
  }

  function firstAccept(blank) { return blank.accepts[0]; }

  /* ---------------------------------------------------------------- state */
  var S = {
    mode: 'practice',
    questions: [],     // [{ q, order, answerIdx, answerIdxs }]
    resp: [],          // per-type response object, see newResp()
    locked: [],        // answer / model answer revealed
    index: 0,
    startedAt: 0,
    elapsed: 0,
    limitSec: 0,
    tickId: null,
    settings: null
  };

  function newResp(item) {
    var q = item.q;
    if (q.type === 'open') { return { text: '' }; }
    if (q.type === 'blank') {
      return { text: q.blanks.map(function () { return ''; }) };
    }
    if (q.multi) { return { chosen: [] }; }
    return { picked: null };
  }

  function isAnswered(i) {
    var q = S.questions[i].q, r = S.resp[i];
    if (q.type === 'open') { return norm(r.text).length > 0; }
    if (q.type === 'blank') {
      return r.text.some(function (t) { return norm(t).length > 0; });
    }
    if (q.multi) { return r.chosen.length > 0; }
    return r.picked !== null;
  }

  /* true / false for gradable types, null for open-ended — open-ended
     questions are deliberately outside the scoring system entirely. */
  function gradeOf(i) {
    var item = S.questions[i], q = item.q, r = S.resp[i];
    if (q.type === 'open') { return null; }
    if (q.type === 'blank') {
      for (var k = 0; k < q.blanks.length; k++) {
        if (!blankOk(q.blanks[k], r.text[k])) { return false; }
      }
      return true;
    }
    if (q.multi) {
      var want = item.answerIdxs.slice().sort(numCmp);
      var got = r.chosen.slice().sort(numCmp);
      if (want.length !== got.length) { return false; }
      for (var j = 0; j < want.length; j++) {
        if (want[j] !== got[j]) { return false; }
      }
      return true;
    }
    return r.picked !== null && r.picked === item.answerIdx;
  }

  /* -------------------------------------------------------------- screens */
  function show(name) {
    $('screen-setup').hidden = name !== 'setup';
    $('screen-run').hidden = name !== 'run';
    $('screen-results').hidden = name !== 'results';
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------- setup form */
  var SETTINGS_KEY = 'itit-quiz-settings';

  function readSetup() {
    var f = $('setup-form');
    return {
      chapter: f.elements.chapter.value,
      source: f.elements.source.value,
      qtype: f.elements.qtype.value,
      paper: f.elements.paper.value,
      priority: $('opt-priority').checked,
      mode: f.elements.mode.value,
      count: f.elements.count.value,
      shuffleQ: $('opt-shuffle-q').checked,
      shuffleO: $('opt-shuffle-o').checked,
      timed: $('opt-timer').checked,
      minutes: parseInt(f.elements.minutes.value, 10) || 30
    };
  }

  function checkRadio(name, value) {
    var el = document.querySelector('input[name="' + name + '"][value="' + value + '"]');
    if (el) { el.checked = true; return true; }
    return false;
  }

  function applySettings(s) {
    if (!s) { return; }
    if (s.chapter) { checkRadio('chapter', s.chapter); }
    if (s.source) { checkRadio('source', s.source); }
    if (s.qtype) { checkRadio('qtype', s.qtype); }
    if (s.paper) { checkRadio('paper', s.paper); }
    if (s.mode) { checkRadio('mode', s.mode); }
    if (s.count) { checkRadio('count', s.count); }
    if (s.minutes) { checkRadio('minutes', String(s.minutes)); }
    if (typeof s.shuffleQ === 'boolean') { $('opt-shuffle-q').checked = s.shuffleQ; }
    if (typeof s.shuffleO === 'boolean') { $('opt-shuffle-o').checked = s.shuffleO; }
    if (typeof s.timed === 'boolean') { $('opt-timer').checked = s.timed; }
    if (typeof s.priority === 'boolean') { $('opt-priority').checked = s.priority; }
  }

  function saveSettings(s) {
    try { store.set(SETTINGS_KEY, JSON.stringify(s)); } catch (e) {}
  }
  function loadSettings() {
    try {
      var raw = store.get(SETTINGS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function matching(s) {
    return BANK.filter(function (q) {
      if (s.chapter !== 'all' && String(q.chapter) !== String(s.chapter)) { return false; }
      if (s.source !== 'all' && q.source !== s.source) { return false; }
      if (s.qtype !== 'all' && q.type !== s.qtype) { return false; }
      if (s.paper !== 'all' && papersOf(q).indexOf(s.paper) === -1) { return false; }
      if (s.priority && !(q.repeats > 1)) { return false; }
      return true;
    });
  }

  /* Chapter and paper chips that can never yield anything are dimmed rather
     than hidden, so the shape of the bank stays visible. */
  function markEmptyChips() {
    var counts = { chapter: {}, paper: {} };
    BANK.forEach(function (q) {
      counts.chapter[q.chapter] = (counts.chapter[q.chapter] || 0) + 1;
      papersOf(q).forEach(function (p) {
        counts.paper[p] = (counts.paper[p] || 0) + 1;
      });
    });
    ['chapter', 'paper'].forEach(function (name) {
      var inputs = document.querySelectorAll('input[name="' + name + '"]');
      for (var i = 0; i < inputs.length; i++) {
        var v = inputs[i].value;
        if (v === 'all') { continue; }
        var lbl = document.querySelector('label[for="' + inputs[i].id + '"]');
        if (lbl) { lbl.classList.toggle('is-empty', !counts[name][v]); }
      }
    });
  }

  function refreshSummary() {
    var s = readSetup();
    var pool = matching(s);
    var want = s.count === 'all' ? pool.length : Math.min(parseInt(s.count, 10), pool.length);

    $('timer-field').hidden = s.mode !== 'exam';
    // Shuffling options only means anything for multiple choice.
    $('opt-shuffle-o').closest('.switch-row').hidden = s.qtype === 'blank' || s.qtype === 'open';

    var chapterTxt = s.chapter === 'all' ? 'all chapters' : 'Chapter ' + s.chapter;
    var bits = [chapterTxt];
    if (s.source !== 'all') { bits.push((SOURCE_NAMES[s.source] || s.source).toLowerCase()); }
    if (s.paper !== 'all') { bits.push(paperName(s.paper).toLowerCase()); }
    if (s.qtype !== 'all') { bits.push((TYPE_NAMES[s.qtype] || s.qtype).toLowerCase()); }
    if (s.priority) { bits.push('high priority only'); }

    var msg;
    if (pool.length === 0) {
      msg = 'No questions match ' + esc(bits.join(' + ')) + ' yet.';
      $('btn-start').disabled = true;
    } else {
      msg = '<b>' + want + '</b> question' + (want === 1 ? '' : 's') +
            ' from <b>' + esc(bits.join('</b> &middot; <b>')) + '</b>' +
            ' &nbsp;(' + pool.length + ' available)';
      $('btn-start').disabled = false;
    }
    $('filter-summary').innerHTML = msg;

    var examCount = BANK.filter(function (q) { return q.source === 'midterm' || q.source === 'final'; }).length;
    $('source-hint').textContent = examCount === 0
      ? 'No past-paper questions have been added yet — everything in the bank is from the tutorials and the summary.'
      : examCount + ' past-paper questions in the bank, alongside ' +
        (BANK.length - examCount) + ' from the tutorials.';
  }

  var PAPER_NAMES = {
    tutorial: 'Tutorials',
    'paper-a': 'Paper A',
    'paper-b': 'Paper B',
    'paper-c': 'Paper C',
    'final-paper': 'Final paper',
    revision: 'Revision sheet',
    additional: 'Additional task'
  };
  function paperName(p) { return PAPER_NAMES[p] || p; }

  /* ------------------------------------------------------------- starting */
  function buildRun(s, subset) {
    var pool = subset || matching(s);
    if (s.shuffleQ) { pool = shuffle(pool); }
    var want = s.count === 'all' ? pool.length : Math.min(parseInt(s.count, 10), pool.length);
    if (subset) { want = pool.length; }
    pool = pool.slice(0, want);

    S.questions = pool.map(function (q) {
      var item = { q: q, order: null, answerIdx: null, answerIdxs: null };
      if (q.type === 'mcq') {
        var order = q.options.map(function (_, i) { return i; });
        if (s.shuffleO) { order = shuffle(order); }
        item.order = order;
        if (q.multi) {
          item.answerIdxs = q.answer.map(function (a) { return order.indexOf(a); }).sort(numCmp);
        } else {
          item.answerIdx = order.indexOf(q.answer);
        }
      }
      return item;
    });
    S.resp = S.questions.map(newResp);
    S.locked = S.questions.map(function () { return false; });
    S.index = 0;
    S.mode = s.mode;
    S.settings = s;
    S.startedAt = Date.now();
    S.elapsed = 0;
    S.limitSec = (s.mode === 'exam' && s.timed) ? s.minutes * 60 : 0;

    startTicking();
    show('run');
    renderQuestion();
  }

  function startTicking() {
    stopTicking();
    updateTimer();
    S.tickId = window.setInterval(function () {
      updateTimer();
      if (S.limitSec > 0 && elapsedSec() >= S.limitSec) { finish(true); }
    }, 1000);
  }
  function stopTicking() {
    if (S.tickId) { window.clearInterval(S.tickId); S.tickId = null; }
  }
  function elapsedSec() { return (Date.now() - S.startedAt) / 1000; }

  function updateTimer() {
    var el = $('q-timer');
    if (S.limitSec > 0) {
      var left = S.limitSec - elapsedSec();
      el.textContent = clock(left) + ' left';
      el.classList.toggle('low', left <= 60);
    } else {
      el.textContent = clock(elapsedSec());
      el.classList.remove('low');
    }
  }

  /* ------------------------------------------------------------ rendering */
  function tagsFor(q, extra) {
    var html = '<span class="tag tag-accent">Chapter ' + esc(q.chapter) + '</span>' +
               '<span class="tag">' + esc(q.sourceLabel || SOURCE_NAMES[q.source] || q.source) + '</span>';
    if (q.type !== 'mcq') { html += '<span class="tag">' + esc(TYPE_NAMES[q.type]) + '</span>'; }
    if (q.marks) { html += '<span class="tag">' + esc(q.marks) + ' marks</span>'; }
    if (q.repeats > 1) {
      html += '<span class="tag tag-priority" title="Asked in ' + q.repeats +
              ' different papers">&#9733; asked ' + q.repeats + '&times;</span>';
    }
    if (extra) { html += extra; }
    return html;
  }

  /* Code samples are written into the DOM as text, never as markup — the
     samples contain real tags and would otherwise be parsed and vanish. */
  function renderCode(host, code) {
    host.innerHTML = '';
    if (!code) { host.hidden = true; return; }
    var pre = document.createElement('pre');
    pre.className = 'code-block';
    var el = document.createElement('code');
    el.textContent = code;
    pre.appendChild(el);
    host.appendChild(pre);
    host.hidden = false;
  }

  function renderQuestion() {
    var item = S.questions[S.index];
    if (!item) { return; }
    var q = item.q;
    var total = S.questions.length;

    $('q-now').textContent = S.index + 1;
    $('q-total').textContent = total;
    $('q-progress').style.width = ((S.index + 1) / total * 100) + '%';
    $('q-tags').innerHTML = tagsFor(q, S.mode === 'exam' ? '<span class="tag">Mock exam</span>' : '');

    var revealed = S.locked[S.index] && S.mode === 'practice';

    // The blank type prints its own sentence with the inputs threaded through it.
    if (q.type === 'blank') {
      $('q-text').hidden = true;
      $('q-text').textContent = '';
    } else {
      $('q-text').hidden = false;
      $('q-text').textContent = q.question;
    }
    renderCode($('q-code'), q.code);

    var box = $('q-options');
    box.innerHTML = '';
    box.className = 'options';
    if (q.type === 'mcq') { renderMcq(box, item, revealed); }
    else if (q.type === 'blank') { renderBlank(box, item, revealed); }
    else { renderOpen(box, item, revealed); }

    $('q-feedback').innerHTML = revealed ? answerHTML(item, S.index) : '';

    /* actions */
    $('btn-back').disabled = S.index === 0;
    var last = S.index === total - 1;
    $('btn-next').hidden = last;
    $('btn-finish').hidden = !last;
    $('btn-skip').hidden = revealed;

    var needsSubmit = S.mode === 'practice' && !revealed &&
                      (q.type === 'open' || q.type === 'blank' || (q.type === 'mcq' && q.multi));
    var check = $('btn-check');
    check.hidden = !needsSubmit;
    check.textContent = q.type === 'open' ? 'Show model answer' : 'Check answer';
  }

  function renderMcq(box, item, revealed) {
    var q = item.q, r = S.resp[S.index];
    if (q.multi) {
      var hint = document.createElement('p');
      hint.className = 'multi-hint';
      hint.textContent = 'Select ALL the correct answers, then check.';
      box.appendChild(hint);
    }

    item.order.forEach(function (origIdx, displayIdx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt';
      var chosen = q.multi ? r.chosen.indexOf(displayIdx) > -1 : r.picked === displayIdx;
      btn.setAttribute('aria-pressed', chosen ? 'true' : 'false');

      var markText = '';
      if (revealed) {
        btn.disabled = true;
        var isRight = q.multi
          ? item.answerIdxs.indexOf(displayIdx) > -1
          : displayIdx === item.answerIdx;
        if (isRight) {
          btn.classList.add('correct');
          markText = chosen ? 'correct' : 'missed';
        } else if (chosen) {
          btn.classList.add('incorrect');
          markText = 'your answer';
        }
      } else if (chosen) {
        btn.classList.add('selected');
      }

      var key = document.createElement('span');
      key.className = 'opt-key' + (q.multi ? ' opt-check' : '');
      key.setAttribute('aria-hidden', 'true');
      key.textContent = q.multi ? (chosen ? '✓' : '') : LETTERS[displayIdx];

      var body = document.createElement('span');
      body.className = 'opt-body';
      body.textContent = q.options[origIdx];

      btn.appendChild(key);
      btn.appendChild(body);
      if (markText) {
        var mark = document.createElement('span');
        mark.className = 'opt-mark';
        mark.textContent = markText;
        btn.appendChild(mark);
      }
      btn.addEventListener('click', function () { pick(displayIdx); });
      box.appendChild(btn);
    });
  }

  /* The sentence is split on its ______ runs and an input is dropped into
     each gap, so the question reads the way it does on the paper. */
  function renderBlank(box, item, revealed) {
    var q = item.q, r = S.resp[S.index];
    box.className = 'options blank-wrap';

    var p = document.createElement('p');
    p.className = 'blank-sentence';
    var parts = q.question.split(/_{3,}/);
    var gaps = Math.min(parts.length - 1, q.blanks.length);

    parts.forEach(function (chunk, i) {
      if (chunk) { p.appendChild(document.createTextNode(chunk)); }
      if (i >= gaps) { return; }
      p.appendChild(makeGap(q, r, i, revealed));
    });

    // A sentence whose gap markers went missing still needs its inputs.
    for (var k = gaps; k < q.blanks.length; k++) {
      p.appendChild(document.createTextNode(' '));
      p.appendChild(makeGap(q, r, k, revealed));
    }
    box.appendChild(p);

    if (revealed) {
      var acc = document.createElement('p');
      acc.className = 'blank-accepted';
      acc.textContent = q.blanks.length === 1
        ? 'Accepted answer: ' + firstAccept(q.blanks[0])
        : 'Accepted answers: ' + q.blanks.map(firstAccept).join(' · ');
      box.appendChild(acc);
    }
  }

  function makeGap(q, r, i, revealed) {
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'blank-input';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.setAttribute('aria-label', q.blanks.length === 1
      ? 'Answer' : 'Blank ' + (i + 1) + ' of ' + q.blanks.length);
    input.value = r.text[i] || '';
    input.size = Math.max(10, Math.min(28, firstAccept(q.blanks[i]).length + 4));
    if (revealed) {
      input.readOnly = true;
      input.classList.add(blankOk(q.blanks[i], r.text[i]) ? 'correct' : 'incorrect');
    } else {
      input.addEventListener('input', function () { r.text[i] = input.value; });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); submitCurrent(); }
      });
    }
    return input;
  }

  /* Open-ended: a textarea that is never cleared, never scored, and never
     marked. Revealing the model answer puts it *below* what the user wrote. */
  function renderOpen(box, item, revealed) {
    var q = item.q, r = S.resp[S.index];
    box.className = 'options open-wrap';

    var lbl = document.createElement('label');
    lbl.className = 'open-label';
    lbl.setAttribute('for', 'open-answer');
    lbl.textContent = 'Your answer';
    box.appendChild(lbl);

    var ta = document.createElement('textarea');
    ta.id = 'open-answer';
    ta.className = 'open-input';
    ta.rows = q.marks && q.marks >= 8 ? 10 : 6;
    ta.placeholder = 'Write your answer here, then reveal the model answer to compare.';
    ta.value = r.text;
    ta.addEventListener('input', function () { r.text = ta.value; });
    box.appendChild(ta);
  }

  /* ---------------------------------------------------- revealed answers */
  function modelAnswerHTML(q) {
    var html = '<div class="model-answer">';
    html += '<div class="model-label">Model answer</div>';
    String(q.modelAnswer).split(/\n{2,}/).forEach(function (para) {
      var t = para.replace(/^\n+|\n+$/g, '');
      if (!t) { return; }
      if (/^[-*] /.test(t)) {
        html += '<ul>';
        t.split('\n').forEach(function (line) {
          var item = line.replace(/^[-*] ?/, '');
          if (item) { html += '<li>' + esc(item) + '</li>'; }
        });
        html += '</ul>';
      } else if (/^```/.test(t)) {
        html += '<pre class="code-block"><code>' +
                esc(t.replace(/^```[a-z]*\n?/, '').replace(/\n?```$/, '')) + '</code></pre>';
      } else {
        html += '<p>' + esc(t).replace(/\n/g, '<br>') + '</p>';
      }
    });
    if (q.keyPoints && q.keyPoints.length) {
      html += '<p class="kp-label">Key points</p><ul>';
      q.keyPoints.forEach(function (k) { html += '<li>' + esc(k) + '</li>'; });
      html += '</ul>';
    }
    html += '<p class="model-note">' + esc(MODEL_NOTE) + '</p>';
    html += '</div>';
    return html;
  }

  function answerHTML(item, i) {
    var q = item.q;
    if (q.type === 'open') { return modelAnswerHTML(q); }

    var right = gradeOf(i);
    var answered = isAnswered(i);
    var html = '<div class="answer-box' + (right ? '' : ' was-wrong') + '">';
    html += '<div class="answer-verdict">' +
            (right ? 'Correct' : (answered ? 'Not quite' : 'Skipped')) + '</div>';

    if (!right && q.type === 'mcq') {
      if (q.multi) {
        html += '<p><b>Correct answers:</b> ' +
                q.answer.map(function (a) { return esc(q.options[a]); }).join('; ') + '</p>';
      } else {
        html += '<p><b>Correct answer:</b> ' +
                LETTERS[item.answerIdx] + '. ' + esc(q.options[q.answer]) + '</p>';
      }
    }
    if (q.explanation) { html += '<p>' + esc(q.explanation) + '</p>'; }
    if (q.keyPoints && q.keyPoints.length) {
      html += '<p class="kp-label">Key points</p><ul>';
      q.keyPoints.forEach(function (k) { html += '<li>' + esc(k) + '</li>'; });
      html += '</ul>';
    }
    html += '</div>';
    return html;
  }

  /* ------------------------------------------------------------ answering */
  function pick(displayIdx) {
    var item = S.questions[S.index], q = item.q, r = S.resp[S.index];
    if (S.locked[S.index]) { return; }
    if (q.multi) {
      var at = r.chosen.indexOf(displayIdx);
      if (at > -1) { r.chosen.splice(at, 1); } else { r.chosen.push(displayIdx); }
    } else {
      r.picked = displayIdx;
      if (S.mode === 'practice') { S.locked[S.index] = true; }
    }
    renderQuestion();
  }

  function submitCurrent() {
    if (S.mode !== 'practice' || S.locked[S.index]) { return; }
    S.locked[S.index] = true;
    renderQuestion();
    $('q-feedback').scrollIntoView({ block: 'nearest' });
  }

  function go(delta) {
    var next = S.index + delta;
    if (next < 0 || next >= S.questions.length) { return; }
    S.index = next;
    renderQuestion();
    var runTop = $('screen-run');
    if (runTop.getBoundingClientRect().top < 0) { runTop.scrollIntoView(); }
  }

  /* -------------------------------------------------------------- results */
  function finish(auto) {
    stopTicking();
    S.elapsed = Math.min(elapsedSec(), S.limitSec > 0 ? S.limitSec : elapsedSec());
    renderResults(auto);
    show('results');
  }

  function renderResults(auto) {
    var total = S.questions.length;
    var graded = 0, correct = 0, skipped = 0, openCount = 0;
    var byChapter = {};

    S.questions.forEach(function (item, i) {
      var g = gradeOf(i);
      if (g === null) { openCount++; return; }   // open-ended: outside scoring
      graded++;
      var ch = item.q.chapter;
      if (!byChapter[ch]) { byChapter[ch] = { right: 0, total: 0 }; }
      byChapter[ch].total++;
      if (!isAnswered(i)) { skipped++; }
      if (g) { correct++; byChapter[ch].right++; }
    });

    var pct = graded ? Math.round(correct / graded * 100) : 0;
    var pctEl = $('r-pct');
    var heroSub = $('r-sub');

    if (graded === 0) {
      pctEl.textContent = '—';
      pctEl.className = 'score-pct unscored';
      heroSub.textContent = (auto ? 'Time ran out. ' : '') +
        'Open-ended questions are not scored. ' + openCount +
        ' answer' + (openCount === 1 ? '' : 's') + ' to compare below.';
    } else {
      pctEl.textContent = pct + '%';
      pctEl.className = 'score-pct' + (pct >= 75 ? '' : (pct >= 50 ? ' mid' : ' low'));
      heroSub.textContent =
        (auto ? 'Time ran out — paper submitted automatically. ' : '') +
        correct + ' of ' + graded + ' correct' +
        (skipped ? ' · ' + skipped + ' skipped' : '') +
        (openCount ? ' · ' + openCount + ' open-ended (not scored)' : '');
    }

    $('r-stats').innerHTML =
      stat(graded ? correct + '/' + graded : '—', 'Score') +
      stat(graded ? pct + '%' : '—', 'Percentage') +
      stat(humanTime(S.elapsed), 'Time taken') +
      stat(S.mode === 'exam' ? 'Mock exam' : 'Practice', 'Mode');

    /* breakdown — graded questions only */
    var chapters = Object.keys(byChapter).sort(numCmp);
    var bd = '';
    chapters.forEach(function (ch) {
      var d = byChapter[ch];
      var p = d.total ? Math.round(d.right / d.total * 100) : 0;
      var cls = p >= 75 ? '' : (p >= 50 ? 'mid' : 'low');
      bd += '<div class="bd-row">' +
              '<div class="bd-name">Chapter ' + esc(ch) +
                '<small>' + esc(chapterTitle(ch)) + '</small>' +
                '<div class="bd-meter"><i class="' + cls + '" style="width:' + p + '%"></i></div>' +
              '</div>' +
              '<div class="bd-score">' + d.right + '/' + d.total + '</div>' +
            '</div>';
    });
    $('r-breakdown').innerHTML = bd;
    $('r-breakdown-panel').hidden = chapters.length < 2;

    if (chapters.length >= 2) {
      var worst = chapters.slice().sort(function (a, b) {
        return (byChapter[a].right / byChapter[a].total) - (byChapter[b].right / byChapter[b].total);
      })[0];
      if (byChapter[worst].right / byChapter[worst].total < 0.75) {
        // Only chapters 1–6 have a write-up on this site to send people back to.
        var reread = hasChapterPage(worst)
          ? '<a href="ch' + esc(worst) + '.html">re-read it</a> then '
          : 'go back to the slides for it, then ';
        $('r-breakdown').insertAdjacentHTML('afterend',
          '<p class="field-hint" style="margin-top:14px">Weakest chapter: <b>Chapter ' + esc(worst) +
          '</b> — ' + reread +
          '<a href="quiz.html?chapter=' + esc(worst) + '">drill it on its own</a>.</p>');
      }
    }

    /* full review */
    var rv = '';
    S.questions.forEach(function (item, i) {
      var q = item.q;
      var g = gradeOf(i);
      var cls = g === null ? 'open' : (!isAnswered(i) ? 'skipped' : (g ? '' : 'wrong'));

      rv += '<div class="review-item ' + cls + '">';
      rv += '<div class="q-tags"><span class="tag tag-accent">Q' + (i + 1) + '</span>' +
            tagsFor(q) + '</div>';
      rv += '<p class="review-q">' + esc(q.question) + '</p>';
      if (q.code) {
        rv += '<pre class="code-block"><code>' + esc(q.code) + '</code></pre>';
      }
      rv += reviewBody(item, i, g);
      rv += '</div>';
    });
    $('r-review').innerHTML = rv;

    var wrongCount = graded - correct;
    $('btn-retry-wrong').hidden = wrongCount === 0;
    $('btn-retry-wrong').textContent = 'Retry the ' + wrongCount + ' you missed';
  }

  function reviewBody(item, i, g) {
    var q = item.q, r = S.resp[i], rv = '';

    if (q.type === 'open') {
      rv += '<p class="review-line"><span class="rl-k">You wrote</span><span class="rl-v">' +
            (norm(r.text) ? esc(r.text).replace(/\n/g, '<br>') : '— nothing written —') +
            '</span></p>';
      rv += modelAnswerHTML(q);
      return rv;
    }

    if (q.type === 'blank') {
      q.blanks.forEach(function (bl, k) {
        var ok = blankOk(bl, r.text[k]);
        var label = q.blanks.length === 1 ? 'You' : 'Blank ' + (k + 1);
        rv += '<p class="review-line ' + (ok ? 'ok' : 'no') + '">' +
              '<span class="rl-k">' + esc(label) + '</span><span class="rl-v">' +
              (norm(r.text[k]) ? esc(r.text[k]) : '— skipped —') + '</span></p>';
        if (!ok) {
          rv += '<p class="review-line ok"><span class="rl-k">Answer</span>' +
                '<span class="rl-v">' + esc(firstAccept(bl)) + '</span></p>';
        }
      });
    } else if (q.multi) {
      var chosenTxt = r.chosen.length
        ? r.chosen.map(function (d) { return q.options[item.order[d]]; }).join('; ')
        : '— skipped —';
      rv += '<p class="review-line ' + (g ? 'ok' : 'no') + '"><span class="rl-k">You</span>' +
            '<span class="rl-v">' + esc(chosenTxt) + '</span></p>';
      if (!g) {
        rv += '<p class="review-line ok"><span class="rl-k">Correct</span><span class="rl-v">' +
              esc(q.answer.map(function (a) { return q.options[a]; }).join('; ')) + '</span></p>';
      }
    } else {
      rv += '<p class="review-line ' + (r.picked === null ? '' : (g ? 'ok' : 'no')) + '">' +
            '<span class="rl-k">You</span><span class="rl-v">' +
            (r.picked === null ? '— skipped —'
              : LETTERS[r.picked] + '. ' + esc(q.options[item.order[r.picked]])) +
            '</span></p>';
      if (!g) {
        rv += '<p class="review-line ok"><span class="rl-k">Correct</span><span class="rl-v">' +
              LETTERS[item.answerIdx] + '. ' + esc(q.options[q.answer]) + '</span></p>';
      }
    }

    if (q.explanation || (q.keyPoints && q.keyPoints.length)) {
      rv += '<div class="review-expl">';
      if (q.explanation) { rv += esc(q.explanation); }
      if (q.keyPoints && q.keyPoints.length) {
        rv += '<ul>';
        q.keyPoints.forEach(function (k) { rv += '<li>' + esc(k) + '</li>'; });
        rv += '</ul>';
      }
      rv += '</div>';
    }
    return rv;
  }

  function stat(v, l) {
    return '<div class="stat"><div class="stat-v">' + esc(v) + '</div><div class="stat-l">' + esc(l) + '</div></div>';
  }

  var CHAPTER_TITLES = {
    1: 'Introduction to the Internet and the Web',
    2: 'The World Wide Web',
    3: 'Electronic Mail',
    4: 'Privacy, Security and Ethics',
    5: 'Academic Research and Information Sources',
    6: 'Cloud Computing, IoT and Emerging Technologies',
    7: 'Not covered in these notes',
    8: 'HTML',
    9: 'CSS',
    10: 'JavaScript'
  };
  function chapterTitle(ch) { return CHAPTER_TITLES[ch] || ''; }
  function hasChapterPage(ch) { return Number(ch) >= 1 && Number(ch) <= 6; }

  /* ----------------------------------------------------------- url params */
  function applyUrlParams() {
    var qs = window.location.search.replace(/^\?/, '');
    if (!qs) { return; }
    var parts = qs.split('&');
    for (var i = 0; i < parts.length; i++) {
      var kv = parts[i].split('=');
      var k = decodeURIComponent(kv[0] || '').toLowerCase();
      var v = decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')).toLowerCase();
      if (k === 'chapter') { checkRadio('chapter', v); }
      else if (k === 'source') { checkRadio('source', v); }
      else if (k === 'type') { checkRadio('qtype', v); }
      else if (k === 'paper') { checkRadio('paper', v); }
      else if (k === 'priority') { $('opt-priority').checked = v !== '0' && v !== 'false'; }
      else if (k === 'mode' && (v === 'practice' || v === 'exam')) { checkRadio('mode', v); }
      else if (k === 'count') { checkRadio('count', v); }
    }
  }

  /* ------------------------------------------------------------ no bank? */
  function bankIsEmpty() {
    $('screen-setup').innerHTML =
      '<div class="panel"><div class="empty-state">' +
      '<strong>No questions loaded</strong>' +
      'The question files did not load. If you opened this page from a folder, make ' +
      'sure <code>assets/data/questions-tutorials.js</code> is still next to it.' +
      '</div></div>';
  }

  /* ---------------------------------------------------------------- wire */
  function init() {
    if (!BANK.length) { bankIsEmpty(); return; }

    applySettings(loadSettings());
    applyUrlParams();      // URL wins over remembered settings
    markEmptyChips();
    refreshSummary();

    $('setup-form').addEventListener('change', refreshSummary);
    $('setup-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var s = readSetup();
      saveSettings(s);
      buildRun(s);
    });

    $('btn-check').addEventListener('click', submitCurrent);
    $('btn-next').addEventListener('click', function () { go(1); });
    $('btn-back').addEventListener('click', function () { go(-1); });
    $('btn-skip').addEventListener('click', function () {
      if (S.index === S.questions.length - 1) { finish(false); } else { go(1); }
    });
    $('btn-finish').addEventListener('click', function () { finish(false); });
    $('btn-quit').addEventListener('click', function () {
      var unanswered = 0;
      S.questions.forEach(function (_, i) { if (!isAnswered(i)) { unanswered++; } });
      if (unanswered > 0 &&
          !window.confirm(unanswered + ' question' + (unanswered === 1 ? ' is' : 's are') +
                          ' still unanswered. End the quiz anyway?')) { return; }
      finish(false);
    });

    $('btn-new').addEventListener('click', function () { show('setup'); refreshSummary(); });
    $('btn-again').addEventListener('click', function () { buildRun(S.settings); });
    $('btn-retry-wrong').addEventListener('click', function () {
      var wrong = [];
      S.questions.forEach(function (item, i) {
        if (gradeOf(i) === false) { wrong.push(item.q); }   // never open-ended
      });
      if (!wrong.length) { return; }
      buildRun(S.settings, wrong);
    });

    /* keyboard: A–F to answer multiple choice, arrows to move */
    document.addEventListener('keydown', function (e) {
      if ($('screen-run').hidden) { return; }
      if (e.metaKey || e.ctrlKey || e.altKey) { return; }
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') { return; }

      var item = S.questions[S.index];
      if (!item) { return; }

      if (item.q.type === 'mcq' && !S.locked[S.index]) {
        var li = LETTERS.indexOf(e.key.toUpperCase());
        if (li > -1 && li < item.order.length) {
          e.preventDefault(); pick(li); return;
        }
      }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (!$('btn-check').hidden) { submitCurrent(); }
        else if (S.index === S.questions.length - 1) { finish(false); }
        else { go(1); }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
