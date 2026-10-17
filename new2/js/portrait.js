/* Portrait — a WebGL2 point-sprite portrait built from hex glyphs.

   How it works (technique confirmed by the REA investigation, see REA-EVIDENCE.md):
   the photo is drawn into a small canvas and read back with getImageData. Every
   kept cell becomes one point with a "home" inside the photo's rect and an "air"
   position somewhere on screen. All motion lives in the vertex shader: JS uploads
   the attributes once, then sets a handful of uniforms per frame (clock, scroll,
   pointer). Rendering is paused by an IntersectionObserver when off screen. */
(function () {
  'use strict';

  var VERT = [
    '#version 300 es',
    'precision highp float;',
    '',
    'in vec2 aHome;   // 0..1 inside the photo rect',
    'in vec3 aAir;    // xy 0..1 across the canvas, z = depth',
    'in vec4 aInfo;   // brightness, delay, duration, phase',
    'in vec4 aTint;   // rgb from the photo, a = glyph 0..15 (negative = drifting dust)',
    '',
    'uniform vec2  uRes;',
    'uniform vec4  uRect;',
    'uniform float uCell;',
    'uniform float uDpr;',
    'uniform float uTime;',
    'uniform float uReveal;',
    'uniform float uScatter;',
    'uniform vec2  uMouse;',
    '',
    'out vec3  vColor;',
    'out float vAlpha;',
    'out float vGlyph;',
    'out float vLand;',
    'out float vSize;',
    'out float vLens;',
    '',
    'float inOut(float t) { return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t + 2.0, 3.0) / 2.0; }',
    '',
    'void main() {',
    '  float bright = aInfo.x;',
    '  float delay  = aInfo.y;',
    '  float dur    = aInfo.z;',
    '  float phase  = aInfo.w;',
    '  float depth  = aAir.z;',
    '  bool  dust   = aTint.a < 0.0;',
    '',
    '  // Idle drift: far specks move less, so the field reads as depth.',
    '  vec2 drift = vec2(sin(uTime*0.27 + phase*6.283), cos(uTime*0.19 + phase*7.7))',
    '             * (4.0 + 18.0*(1.0 - depth));',
    '  vec2 air  = aAir.xy * uRes + drift;',
    '  vec2 home = uRect.xy + aHome * uRect.zw;',
    '',
    '  float appear = smoothstep(0.0, 0.6, uReveal - delay*0.4);',
    '  float t = dust ? 0.0 : clamp((uReveal - delay) / dur, 0.0, 1.0);',
    '  float k = inOut(t);',
    '',
    '  // Scroll: bytes peel off upward, in an order set by their phase.',
    '  float q = clamp(uScatter*1.6 - phase*0.6, 0.0, 1.0);',
    '  q *= q;',
    '  float settle = k * (1.0 - q);',
    '',
    '  // Arc toward home instead of a straight tween; the arc flattens on landing.',
    '  vec2 d = home - air;',
    '  vec2 pos = mix(air, home, k);',
    '  pos += vec2(-d.y, d.x) * 0.22 * sin(3.14159 * k) * (phase - 0.5);',
    '  pos.y -= q * (260.0 + 520.0*phase);',
    '  pos.x += sin(phase*31.0) * q * 140.0;',
    '',
    '  // Pointer lens: glyphs under the cursor swell, light up and step aside.',
    '  vec2 m = pos - uMouse;',
    '  float ml = length(m);',
    '  float lens = smoothstep(140.0, 0.0, ml) * settle;',
    '  pos += (ml > 0.001 ? m/ml : vec2(0.0)) * lens * 10.0;',
    '',
    '  float land  = smoothstep(0.6, 1.0, settle);',
    '  float speck = mix(2.0, 1.0, depth);',
    '  float glyph = uCell * (0.72 + 0.28*bright);',
    '  float size  = mix(speck, glyph, land) * (1.0 + lens*0.9);',
    '',
    '  // In flight the glyphs cycle through 0-f; they lock once they land.',
    '  float cycling = floor(uTime*14.0 + phase*97.0);',
    '  float g = abs(aTint.a);',
    '  vGlyph = land > 0.98 ? g : mod(g + cycling, 16.0);',
    '',
    '  float dustA = dust ? mix(0.5, 0.18, smoothstep(2.0, 4.0, uReveal)) : 1.0;',
    '  vAlpha = appear * mix(0.22 + 0.5*(1.0 - depth), 1.0, land) * dustA * (1.0 - q*0.85);',
    '  vColor = aTint.rgb;',
    '  vLand  = land;',
    '  vLens  = lens;',
    '  vSize  = size * uDpr;',
    '',
    '  vec2 clip = pos / uRes * 2.0 - 1.0;',
    '  gl_Position  = vec4(clip.x, -clip.y, 0.0, 1.0);',
    '  gl_PointSize = max(size * uDpr, 1.0);',
    '}'
  ].join('\n');

  var FRAG = [
    '#version 300 es',
    'precision highp float;',
    '',
    'uniform sampler2D uGlyphs;  // 4x4 atlas of 0-f',
    'uniform vec3 uAccent;',
    '',
    'in vec3  vColor;',
    'in float vAlpha;',
    'in float vGlyph;',
    'in float vLand;',
    'in float vSize;',
    'in float vLens;',
    'out vec4 outColor;',
    '',
    'void main() {',
    '  vec2 pc = gl_PointCoord;',
    '  vec2 cell = vec2(mod(vGlyph, 4.0), floor(vGlyph / 4.0));',
    '  float g = texture(uGlyphs, (cell + pc) / 4.0).r;',
    '  // A landed glyph sits on a faint tile of its own colour so the face keeps',
    '  // its tone; a point a few pixels wide cannot show a glyph, so it stays a speck.',
    '  vec2 e = step(vec2(0.06), pc) * step(pc, vec2(0.94));',
    '  float tile = max(g, 0.27 * e.x * e.y);',
    '  float disc = smoothstep(0.5, 0.3, length(pc - 0.5));',
    '  float shape = mix(disc, tile, vLand * smoothstep(4.0, 8.0, vSize));',
    '',
    '  vec3 speck = vec3(0.86, 0.88, 0.95);',
    '  vec3 rgb = mix(speck, vColor, vLand);',
    '  rgb = mix(rgb, uAccent, vLens * 0.9);',
    '  float a = vAlpha * shape;',
    '  outColor = vec4(rgb * a, a);',
    '}'
  ].join('\n');

  var DUST = 0.08;          // extra free-floating specks, as a share of the portrait
  var ACCENT_SHARE = 0.045; // glyphs that land in the accent colour
  var FOCUS = [0.38, 0.3];  // roughly the face: it resolves first, the edges last
  var ACCENT = [1.0, 0.545, 0.239]; // #FF8B3D

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.decoding = 'async';
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = src;
    });
  }

  function compile(gl, type, source) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, source);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || 'shader');
    return sh;
  }

  // White 0-f on black, so the fragment shader can read coverage from .r.
  function glyphAtlas() {
    var c = document.createElement('canvas');
    c.width = c.height = 256;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#fff';
    ctx.font = '700 50px "JetBrains Mono", ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    '0123456789abcdef'.split('').forEach(function (ch, i) {
      ctx.fillText(ch, (i % 4) * 64 + 32, Math.floor(i / 4) * 64 + 35);
    });
    return c;
  }

  function cellSize(width) { return Math.min(11, Math.max(6, width / 110)); }

  // Read the photo back at one sample per glyph and turn each cell into a point.
  function sample(img, width) {
    var cell = cellSize(width);
    var cols = Math.max(24, Math.round(width / cell));
    var rows = Math.round(cols * img.naturalHeight / img.naturalWidth);
    var cv = document.createElement('canvas');
    cv.width = cols;
    cv.height = rows;
    var ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, cols, rows);
    var px = ctx.getImageData(0, 0, cols, rows).data;

    var n = cols * rows, lum = new Float32Array(n), kept = [];
    for (var i = 0; i < n; i++) {
      var o = i * 4;
      lum[i] = (0.2126 * px[o] + 0.7152 * px[o + 1] + 0.0722 * px[o + 2]) / 255;
      if (px[o + 3] > 128) kept.push(lum[i]);
    }
    kept.sort(function (a, b) { return a - b; });
    var lo = kept[Math.floor(kept.length * 0.02)] || 0;
    var hi = kept[Math.floor(kept.length * 0.98)] || 1;

    var home = [], air = [], info = [], tint = [], settle = 0;
    function push(hx, hy, bright, rgb, glyph, dust) {
      var dx = hx - FOCUS[0], dy = hy - FOCUS[1];
      var delay = 0.15 + Math.sqrt(dx * dx + dy * dy) * 1.3 + Math.random() * 0.45;
      var dur = 1.25 + Math.random() * 0.55;
      if (!dust) settle = Math.max(settle, delay + dur);
      home.push(hx, hy);
      air.push(Math.random() * 1.2 - 0.1, Math.random() * 1.2 - 0.1, Math.random());
      info.push(bright, delay, dur, Math.random());
      tint.push(rgb[0], rgb[1], rgb[2], glyph);
    }

    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var j = y * cols + x, p = j * 4, a = px[p + 3] / 255;
        if (a < 0.35 || (a < 0.8 && Math.random() > a)) continue;
        var norm = Math.min(1, Math.max(0, (lum[j] - lo) / (hi - lo)));
        if (norm < 0.12 && Math.random() < 0.35) continue; // thin the darkest areas
        var bright = 0.24 + 0.76 * Math.pow(norm, 0.75);
        var rgb;
        if (Math.random() < ACCENT_SHARE) {
          rgb = ACCENT.map(function (c) { return c * (0.6 + 0.4 * bright); });
        } else {
          // Keep the photo's hue, lift it toward white, let brightness decide value.
          var r = px[p] / 255, g = px[p + 1] / 255, b = px[p + 2] / 255;
          var peak = Math.max(r, g, b, 0.08);
          rgb = [r, g, b].map(function (c) {
            var v = 0.55 * (c / peak) + 0.45 * Math.min(1, c * 1.6);
            return Math.min(1, (v * 0.85 + 0.15) * bright * 1.08);
          });
        }
        push((x + 0.5) / cols, (y + 0.5) / rows, bright, rgb, Math.floor(Math.random() * 16), false);
      }
    }
    var count = home.length / 2;
    for (var k = 0; k < Math.round(count * DUST); k++) push(0.5, 0.5, 0.3, [1, 1, 1], -1, true);

    return {
      cell: cell,
      settle: settle,
      count: home.length / 2,
      home: new Float32Array(home),
      air: new Float32Array(air),
      info: new Float32Array(info),
      tint: new Float32Array(tint)
    };
  }

  /* mount({ canvas, anchor, src }) → { play(), destroy() }
     canvas: covers the hero; anchor: an invisible <img> that defines where the
     portrait sits; src: an image with the subject on a transparent background. */
  function mount(opts) {
    var canvas = opts.canvas, anchor = opts.anchor;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(pointer: fine)').matches;
    var gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
    var startAt = null, destroyed = false;

    function fallback() {
      document.documentElement.classList.add('no-webgl');
      canvas.style.display = 'none';
    }
    function setState(s) { if (canvas.dataset.state !== s) canvas.dataset.state = s; }

    var api = {
      play: function () { if (startAt === null) startAt = performance.now() / 1000 - (reduced ? 100 : 0); },
      destroy: function () {}
    };
    if (!gl) { fallback(); return api; }

    var prog;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'link');
    } catch (err) {
      console.error(err);
      fallback();
      return api;
    }
    gl.useProgram(prog);
    setState('idle');

    var U = {};
    ['uRes', 'uRect', 'uCell', 'uDpr', 'uTime', 'uReveal', 'uScatter', 'uMouse', 'uGlyphs', 'uAccent']
      .forEach(function (name) { U[name] = gl.getUniformLocation(prog, name); });

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    var buffers = [['aHome', 2], ['aAir', 3], ['aInfo', 4], ['aTint', 4]].map(function (attr) {
      var buf = gl.createBuffer(), loc = gl.getAttribLocation(prog, attr[0]);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, attr[1], gl.FLOAT, false, 0, 0);
      return buf;
    });
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform3f(U.uAccent, ACCENT[0], ACCENT[1], ACCENT[2]);

    var image = null, count = 0, cell = 8, settle = 0, builtWidth = -1, running = false, visible = true;
    var t0 = performance.now() / 1000;
    var mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    // Re-sample only when the anchor's width actually changes.
    function rebuild() {
      var w = anchor.getBoundingClientRect().width;
      if (!image || w < 10 || Math.abs(w - builtWidth) < 1) return;
      builtWidth = w;
      var s = sample(image, w);
      count = s.count;
      cell = s.cell;
      settle = s.settle;
      [s.home, s.air, s.info, s.tint].forEach(function (data, i) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[i]);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      });
    }

    function onMove(e) {
      var r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -999) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    }
    function onLeave() { mouse.tx = mouse.ty = mouse.x = mouse.y = -9999; }

    function frame() {
      if (!count || startAt === null) { gl.clear(gl.COLOR_BUFFER_BIT); return; }
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var cr = canvas.getBoundingClientRect();
      var w = Math.round(cr.width * dpr), h = Math.round(cr.height * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      rebuild();
      var ar = anchor.getBoundingClientRect();
      var now = performance.now() / 1000;
      var scatter = reduced ? 0 : Math.min(1, Math.max(0, -cr.top / (cr.height * 0.7)));
      mouse.x += (mouse.tx - mouse.x) * 0.16;
      mouse.y += (mouse.ty - mouse.y) * 0.16;

      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.uRes, cr.width, cr.height);
      gl.uniform4f(U.uRect, ar.left - cr.left, ar.top - cr.top, ar.width, ar.height);
      gl.uniform1f(U.uCell, cell);
      gl.uniform1f(U.uDpr, dpr);
      gl.uniform1f(U.uTime, now - t0);
      gl.uniform1f(U.uReveal, now - startAt);
      gl.uniform1f(U.uScatter, scatter);
      gl.uniform2f(U.uMouse, mouse.x, mouse.y);
      setState(scatter >= 1 ? 'gone' : scatter > 0 ? 'scattering' : now - startAt < settle ? 'gathering' : 'formed');
      gl.drawArrays(gl.POINTS, 0, count);
    }

    var tick = window.gsap ? null : function () { frame(); if (running) requestAnimationFrame(tick); };
    function run(on) {
      if (on === running) return;
      running = on;
      if (window.gsap) on ? gsap.ticker.add(frame) : gsap.ticker.remove(frame);
      else if (on) requestAnimationFrame(tick);
    }

    var io = new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      run(visible && count > 0);
    });
    io.observe(canvas);

    var fontReady = document.fonts && document.fonts.load
      ? document.fonts.load('700 50px "JetBrains Mono"').catch(function () {})
      : Promise.resolve();

    Promise.all([loadImage(opts.src), fontReady]).then(function (res) {
      if (destroyed) return;
      image = res[0];
      var tex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, glyphAtlas());
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.uniform1i(U.uGlyphs, 0);
      rebuild();
      run(visible && count > 0);
    }).catch(function (err) {
      console.error(err);
      fallback();
    });

    if (fine) {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }

    api.destroy = function () {
      destroyed = true;
      run(false);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      buffers.forEach(function (b) { gl.deleteBuffer(b); });
      gl.deleteVertexArray(vao);
      gl.deleteProgram(prog);
    };
    return api;
  }

  window.Portrait = { mount: mount };
})();
