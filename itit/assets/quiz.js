/* ==========================================================================
   quiz.js — the practice engine. Contains no question data of its own:
   it merges the globals declared by assets/data/*.js at runtime.
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
  var store = window.ITIT_STORE || {
    get: function () { return null; }, set: function () { return false; }, remove: function () {}
  };

  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  var SOURCE_NAMES = { tutorial: 'Tutorials', midterm: 'Midterm', final: 'Final exam' };

  /* ------------------------------------------------------- question bank */
  var BANK = [];
  try { if (typeof TUTORIAL_QUESTIONS !== 'undefined' && TUTORIAL_QUESTIONS) { BANK = BANK.concat(TUTORIAL_QUESTIONS); } } catch (e) {}
  try { if (typeof EXAM_QUESTIONS !== 'undefined' && EXAM_QUESTIONS) { BANK = BANK.concat(EXAM_QUESTIONS); } } catch (e) {}

  // Defend against a malformed entry rather than dying on question 12 of 25.
  BANK = BANK.filter(function (q) {
    return q && typeof q === 'object' && Array.isArray(q.options) &&
           q.options.length > 1 && typeof q.answer === 'number' &&
           q.answer >= 0 && q.answer < q.options.length && q.question;
  });

  /* ---------------------------------------------------------------- state */
  var S = {
    mode: 'practice',
    questions: [],     // [{ q, order, answerIdx }]
    picked: [],        // index into displayed options, or null
    locked: [],        // practice mode: answer revealed
    index: 0,
    startedAt: 0,
    elapsed: 0,
    limitSec: 0,
    tickId: null,
    settings: null
  };

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
    if (s.mode) { checkRadio('mode', s.mode); }
    if (s.count) { checkRadio('count', s.count); }
    if (s.minutes) { checkRadio('minutes', String(s.minutes)); }
    if (typeof s.shuffleQ === 'boolean') { $('opt-shuffle-q').checked = s.shuffleQ; }
    if (typeof s.shuffleO === 'boolean') { $('opt-shuffle-o').checked = s.shuffleO; }
    if (typeof s.timed === 'boolean') { $('opt-timer').checked = s.timed; }
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
      return true;
    });
  }

  function refreshSummary() {
    var s = readSetup();
    var pool = matching(s);
    var want = s.count === 'all' ? pool.length : Math.min(parseInt(s.count, 10), pool.length);

    $('timer-field').hidden = s.mode !== 'exam';

    var chapterTxt = s.chapter === 'all' ? 'all chapters' : 'Chapter ' + s.chapter;
    var sourceTxt = s.source === 'all' ? 'all sources' : (SOURCE_NAMES[s.source] || s.source).toLowerCase();

    var msg;
    if (pool.length === 0) {
      msg = 'No questions match ' + chapterTxt + ' + ' + sourceTxt + ' yet.';
      $('btn-start').disabled = true;
    } else {
      msg = '<b>' + want + '</b> question' + (want === 1 ? '' : 's') +
            ' from <b>' + esc(chapterTxt) + '</b> &middot; ' + esc(sourceTxt) +
            ' &nbsp;(' + pool.length + ' available)';
      $('btn-start').disabled = false;
    }
    $('filter-summary').innerHTML = msg;

    // Exam-source hint: be honest that the bank is not filled in yet.
    var examCount = BANK.filter(function (q) { return q.source === 'midterm' || q.source === 'final'; }).length;
    $('source-hint').textContent = examCount === 0
      ? 'No past-paper questions have been added yet — everything in the bank is from the tutorials and the summary.'
      : examCount + ' past-paper questions in the bank.';
  }

  /* ------------------------------------------------------------- starting */
  function buildRun(s, subset) {
    var pool = subset || matching(s);
    if (s.shuffleQ) { pool = shuffle(pool); }
    var want = s.count === 'all' ? pool.length : Math.min(parseInt(s.count, 10), pool.length);
    if (subset) { want = pool.length; }
    pool = pool.slice(0, want);

    S.questions = pool.map(function (q) {
      var order = q.options.map(function (_, i) { return i; });
      if (s.shuffleO) { order = shuffle(order); }
      return { q: q, order: order, answerIdx: order.indexOf(q.answer) };
    });
    S.picked = S.questions.map(function () { return null; });
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
  function renderQuestion() {
    var item = S.questions[S.index];
    if (!item) { return; }
    var q = item.q;
    var total = S.questions.length;

    $('q-now').textContent = S.index + 1;
    $('q-total').textContent = total;
    $('q-progress').style.width = ((S.index + 1) / total * 100) + '%';

    var tags = '<span class="tag tag-accent">Chapter ' + esc(q.chapter) + '</span>' +
               '<span class="tag">' + esc(q.sourceLabel || SOURCE_NAMES[q.source] || q.source) + '</span>';
    if (S.mode === 'exam') { tags += '<span class="tag">Mock exam</span>'; }
    $('q-tags').innerHTML = tags;

    $('q-text').textContent = q.question;

    var revealed = S.mode === 'practice' && S.locked[S.index];
    var picked = S.picked[S.index];
    var box = $('q-options');
    box.innerHTML = '';

    item.order.forEach(function (origIdx, displayIdx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'opt';
      btn.setAttribute('data-i', displayIdx);
      btn.setAttribute('aria-pressed', picked === displayIdx ? 'true' : 'false');

      var mark = '';
      if (revealed) {
        btn.disabled = true;
        if (displayIdx === item.answerIdx) {
          btn.classList.add('correct');
          mark = '<span class="opt-mark">correct</span>';
        } else if (displayIdx === picked) {
          btn.classList.add('incorrect');
          mark = '<span class="opt-mark">your answer</span>';
        }
      } else if (picked === displayIdx) {
        btn.classList.add('selected');
      }

      btn.innerHTML =
        '<span class="opt-key" aria-hidden="true">' + LETTERS[displayIdx] + '</span>' +
        '<span class="opt-body">' + esc(q.options[origIdx]) + '</span>' + mark;

      btn.addEventListener('click', function () { pick(displayIdx); });
      box.appendChild(btn);
    });

    $('q-feedback').innerHTML = revealed ? answerHTML(item, picked) : '';

    $('btn-back').disabled = S.index === 0;
    var last = S.index === total - 1;
    $('btn-next').hidden = last;
    $('btn-finish').hidden = !last;
    $('btn-skip').hidden = revealed;
    if (S.mode === 'practice' && !revealed) {
      $('btn-next').disabled = false;
    }
  }

  function answerHTML(item, picked) {
    var q = item.q;
    var right = picked === item.answerIdx;
    var correctText = q.options[q.answer];

    var html = '<div class="answer-box' + (right ? '' : ' was-wrong') + '">';
    html += '<div class="answer-verdict">' +
            (right ? 'Correct' : (picked === null ? 'Skipped' : 'Not quite')) +
            '</div>';
    if (!right) {
      html += '<p><b>Correct answer:</b> ' +
              LETTERS[item.answerIdx] + '. ' + esc(correctText) + '</p>';
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

  function pick(displayIdx) {
    if (S.mode === 'practice' && S.locked[S.index]) { return; }
    S.picked[S.index] = displayIdx;
    if (S.mode === 'practice') { S.locked[S.index] = true; }
    renderQuestion();
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
    var correct = 0, skipped = 0;
    var byChapter = {};

    S.questions.forEach(function (item, i) {
      var ch = item.q.chapter;
      if (!byChapter[ch]) { byChapter[ch] = { right: 0, total: 0 }; }
      byChapter[ch].total++;
      if (S.picked[i] === null) { skipped++; }
      else if (S.picked[i] === item.answerIdx) { correct++; byChapter[ch].right++; }
    });

    var pct = total ? Math.round(correct / total * 100) : 0;
    var pctEl = $('r-pct');
    pctEl.textContent = pct + '%';
    pctEl.className = 'score-pct' + (pct >= 75 ? '' : (pct >= 50 ? ' mid' : ' low'));

    $('r-sub').textContent =
      (auto ? 'Time ran out — paper submitted automatically. ' : '') +
      correct + ' of ' + total + ' correct' +
      (skipped ? ' · ' + skipped + ' skipped' : '');

    $('r-stats').innerHTML =
      stat(correct + '/' + total, 'Score') +
      stat(pct + '%', 'Percentage') +
      stat(humanTime(S.elapsed), 'Time taken') +
      stat(S.mode === 'exam' ? 'Mock exam' : 'Practice', 'Mode');

    /* breakdown */
    var chapters = Object.keys(byChapter).sort(function (a, b) { return a - b; });
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
        $('r-breakdown').insertAdjacentHTML('afterend',
          '<p class="field-hint" style="margin-top:14px">Weakest chapter: <b>Chapter ' + esc(worst) +
          '</b> — <a href="ch' + esc(worst) + '.html">re-read it</a> then ' +
          '<a href="quiz.html?chapter=' + esc(worst) + '">drill it on its own</a>.</p>');
      }
    }

    /* full review */
    var rv = '';
    S.questions.forEach(function (item, i) {
      var q = item.q;
      var picked = S.picked[i];
      var right = picked === item.answerIdx;
      var cls = picked === null ? 'skipped' : (right ? '' : 'wrong');

      rv += '<div class="review-item ' + cls + '">';
      rv += '<div class="q-tags">' +
              '<span class="tag tag-accent">Q' + (i + 1) + '</span>' +
              '<span class="tag">Ch ' + esc(q.chapter) + '</span>' +
              '<span class="tag">' + esc(q.sourceLabel || SOURCE_NAMES[q.source] || q.source) + '</span>' +
            '</div>';
      rv += '<p class="review-q">' + esc(q.question) + '</p>';

      rv += '<p class="review-line ' + (picked === null ? '' : (right ? 'ok' : 'no')) + '">' +
              '<span class="rl-k">You</span><span class="rl-v">' +
              (picked === null ? '— skipped —'
                : LETTERS[picked] + '. ' + esc(q.options[item.order[picked]])) +
              '</span></p>';

      if (!right) {
        rv += '<p class="review-line ok"><span class="rl-k">Correct</span><span class="rl-v">' +
                LETTERS[item.answerIdx] + '. ' + esc(q.options[q.answer]) + '</span></p>';
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
      rv += '</div>';
    });
    $('r-review').innerHTML = rv;

    var wrongCount = total - correct;
    $('btn-retry-wrong').hidden = wrongCount === 0;
    $('btn-retry-wrong').textContent = 'Retry the ' + wrongCount + ' you missed';
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
    6: 'Cloud Computing, IoT and Emerging Technologies'
  };
  function chapterTitle(ch) { return CHAPTER_TITLES[ch] || ''; }

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
    refreshSummary();

    $('setup-form').addEventListener('change', refreshSummary);
    $('setup-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var s = readSetup();
      saveSettings(s);
      buildRun(s);
    });

    $('btn-next').addEventListener('click', function () { go(1); });
    $('btn-back').addEventListener('click', function () { go(-1); });
    $('btn-skip').addEventListener('click', function () {
      S.picked[S.index] = null;
      if (S.index === S.questions.length - 1) { finish(false); } else { go(1); }
    });
    $('btn-finish').addEventListener('click', function () { finish(false); });
    $('btn-quit').addEventListener('click', function () {
      var unanswered = S.picked.filter(function (p) { return p === null; }).length;
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
        if (S.picked[i] !== item.answerIdx) { wrong.push(item.q); }
      });
      if (!wrong.length) { return; }
      buildRun(S.settings, wrong);
    });

    /* keyboard: A–F to answer, arrows to move */
    document.addEventListener('keydown', function (e) {
      if ($('screen-run').hidden) { return; }
      if (e.metaKey || e.ctrlKey || e.altKey) { return; }
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') { return; }

      var key = e.key.toUpperCase();
      var li = LETTERS.indexOf(key);
      if (li > -1 && li < S.questions[S.index].order.length) {
        e.preventDefault(); pick(li); return;
      }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (e.key === 'Enter') {
        if (S.index === S.questions.length - 1) { e.preventDefault(); finish(false); }
        else { e.preventDefault(); go(1); }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
