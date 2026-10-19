# REA investigation: how demo.codeandchill.store/portfolio builds its motion

Target: `https://demo.codeandchill.store/portfolio/`, investigated 2026-10-18 with REA (rea-agents MCP) and headless Chrome.
Screenshots are in `evidence/` (`ref-*` = reference site, `build-*` = this build).

## Evidence chain

| Evidence ID | REA operation | What it established |
|---|---|---|
| `ev_694a11b9…3559` | `capture_browser_scenario` (launch, motion enabled, 1440×900, 3× PageDown) | Network: one HTML doc, **one JS bundle** `assets/index-BJNuUqxu.js`, one CSS file, `hero_center-BLC76ir0.png` (portrait), four project thumbnails, `contact_bg-*.mp4`, reel `meniscus.mp4`. Console: `[.WebGL…] GPU stall due to ReadPixels` → a WebGL context is running. Screenshots of the 3 intro stages. |
| `ev_25fe531e…f9b9` | `export_web_scripts` | Bundle body was **not** retained (`Body exceeds the 64 KiB retained-content budget`), so a second capture was needed. |
| `ev_52684ba5…e1` | `analyze_web_bundle` (CDP) | 2 scripts: bundle (420,890 bytes, sha256 `c8580a4f…3495`) + 709-byte inline script. Vendor fingerprint **React** (medium). **No source maps.** |
| `ev_d1679161…c2f41c` | `inspect_web_page` with script sources | Full debugger source of both scripts captured. |
| `ev_4835e216…473e` | `export_web_scripts` | Bundle exported to disk, digest-verified (`c8580a4f…3495`). |
| `ev_318883ed…c945` (summary `ev_0b0b6285…086c`) | `analyze_javascript_application` | 2 files parsed, 140,597 AST nodes, 0 parse failures; static only, nothing executed. Semantic coverage partial (23,856 unknowns), so the specific claims below come from reading the formatted bundle. |

Line numbers below refer to the bundle after Prettier formatting (22,416 lines). Variable names are the minifier's.

## Findings

**Stack (observed).** React 19 (`react.transitional.element`) + **GSAP core** (inlined, `registerPlugin`) + **ScrollTrigger** (inlined, registered at L20099–20100) + Tailwind v4 CSS. No three.js, no Lenis, no Framer Motion, no physics engine: keyword counts for `THREE`, `Lenis`, `framer`, `Matter` were all 0.

1. **Intro "falling letters" is a choreographed GSAP timeline, not physics** (`Vi`, L16608+). The name is split into `<span>`s. A dot drops and squashes with chained `scaleX/scaleY` tweens and `elastic.out`. The pivot letter tips to ±63°, and every other letter is flung along a two-tween arc (separate `x` and `y` tweens with different eases) to its slot. It waits on `document.fonts.ready`, wraps everything in `gsap.context()` for cleanup, and short-circuits under `prefers-reduced-motion`.
2. **Wordmark morph** (L17267): a 50 ms `setInterval` swaps letters `HASIBUL` → `PORTFOLIO` one by one. A GSAP timeline then moves the `h1` to `top: 74%` (`power3.inOut`), staggers in the role line and CTAs, and splits the two halves apart on `x`. `body.style.overflow = 'hidden'` holds the scroll until the timeline's `onComplete`.
3. **Particle portrait = hand-written WebGL2 point sprites** (`ea`, L17047; shaders in template strings with comments intact):
   - `$i()` draws the PNG into a small canvas and calls `getImageData` (L17000). Each bright pixel becomes a point with `aHome` (position in the photo), `aAir` (random screen position + depth), `aInfo` (brightness, delay, duration, phase) and `aCell` (atlas cell). About 7% extra points stay as drifting "dust" (the starfield in `ref-2`).
   - The vertex shader mixes air→home on `uReveal` with a cubic in-out ease, bends the path sideways ("a curved path reads as gathered"), scatters on `uScatter` (scroll), and pushes points away from `uMouse`. `gl_PointSize = max(size * uDpr, 1.0)` (L16920).
   - The fragment shader colours each tile from an atlas of project screenshots, normalised to full brightness, then scaled by the portrait's luminance.
   - Rendering runs on `G.ticker.add(A)` only while an `IntersectionObserver` reports the canvas visible (L17174–17176). `drawArrays(POINTS)` at L17171. The pointer position is lerped at 0.18 per frame.
4. **Scroll-reveal system** (`Hc` hook, L20117+): `gsap.matchMedia()` with `{motion: (prefers-reduced-motion: no-preference), desktop: (min-width: 768px)}` drives declarative attributes: `[data-reveal]` (direction presets), `[data-reveal-group]` (staggered children), `[data-reveal-lines]` (`.line` from `yPercent: 110` inside overflow masks), and `[data-parallax]` (`scrub: true`). All are `once: true` at `top 88%`. `ScrollTrigger.refresh()` runs on `load` and `fonts.ready`.
5. **About text** fills word by word from `#52525b`/0.2 to white with `scrub: true` (desktop only; mobile gets a single fade).
6. **Service rows** animate a CSS custom property, `--rule-scale`, that drives an `::after` hairline's `scaleX`.
7. **Components shelf**: `pin: !0, scrub: 1, anticipatePin, invalidateOnRefresh`, tweening `scrollLeft` (L21345–21358), with `onUpdate` feeding a progress bar. Below 1024 px it falls back to scroll-snap + pointer-capture drag. Cards are "racked" by distance from active (`scale-90 opacity-50`, `scale-[0.81] opacity-25`).
8. **Canvas 2D breakout game** whose bricks are a hard-coded 5×7 bitmap font (`pl`, L21576).
9. **Magnetic buttons**: `gsap.quickTo(e, 'x'|'y', {duration: .55, ease: 'power3.out'})` on `[data-magnetic]`, fine pointers only (L22119–22121).
10. **CSS marquee**: a `translate(-50%)` keyframe on a doubled track, `mask-image` fades at the edges, `animation-play-state: paused` on hover.
11. **Nav**: rAF-throttled scroll progress bar, plus an `IntersectionObserver` with `rootMargin: -45% 0px -45% 0px` for the active link.

**Unknowns / limits.** The analysis is static (REA never executed the bundle) plus the screenshots of one run; it doesn't establish which code paths ran beyond what the screenshots show. The contact video and reels were seen on the network but not analysed. Source maps were unavailable, so names are minified.

## How this build uses the techniques (original code, your content)

| Reference technique | This build |
|---|---|
| GSAP letter choreography + scroll lock | Your site's real boot lines type out, then `0xMYTH` **decrypts**: each glyph lands blurred, cycles through hex, and locks behind a scan line, with a short glitch. Skippable with any key; skipped under reduced motion. |
| Wordmark moves down and halves split | Same move (`top` → `--mark-top`, `0x`/`MYTH` part on `x`); above the head on phones. |
| WebGL2 `getImageData` particle portrait | `js/portrait.js`, new shaders: **your photo rebuilt from hex glyphs `0-f`** (glyph atlas drawn at runtime). Points arc home with the face resolving first. Glyphs cycle while in flight and lock on landing; about 4.5% land in accent orange. The pointer acts as a lens that swells and lights glyphs. Scrolling peels them off upward. Your selfie has a light background, so `assets/mee-cutout.png` adds a hand-traced feathered alpha mask. |
| `matchMedia` + `data-reveal*` system | Same declarative API, reimplemented. |
| Scrubbed word fill | `whoami` paragraph (desktop). |
| `--rule-scale` rows | HTB module list (`--rule`), plus a progress bar and a counter running up to 8/9. |
| Pinned + scrubbed shelf | Projects as systemd unit cards, pinned with `x` transform; drag/snap below 960 px. |
| 5×7 pixel font on canvas | CTF placements `1ST` / `3RD` / `#120` assemble from a scatter, and the pointer lens pushes cells aside in accent. |
| `quickTo` magnetics, marquee, nav spy | Contact links, stack marquees (focus/tools/infra/built-with), nav. |

All text and images come from 0xmyth.com (`index.html`, `main.js` boot lines, `pictures/BHME24.jpeg`, `pictures/nnet.jpg`) or from `Documents/mee.jpeg`.
