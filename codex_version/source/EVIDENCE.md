# Reference investigation — 18 October 2026

Target: https://demo.codeandchill.store/portfolio/

The reference is a React application with GSAP/ScrollTrigger choreography, custom WebGL portrait rendering, and a canvas game. The new portfolio implements selected animation techniques in original HTML/CSS/JavaScript. No reference implementation, images, project copy, or template styles are imported into the build.

## Evidence and reproducibility

REA captured two scripts and parsed both with zero parse failures. Its React fingerprint is a medium-confidence inference; the shipped HTML also identifies React + Tailwind. Source maps were unavailable, so original module names and authoring source remain unknown.

- **Bundle analysis:** `ev_2f6fd152a00c34b122c8f21531ff7c2c62d3235f574522723c58bc67f58230e9`
- **Initial scenario:** `ev_bed5e398f497341e317cab289494acf9da6dcced2eb650f9f530e24f2c6340ee` — navigate and wait seven seconds; accessibility captured PORT FOLIO.
- **Motion scenario:** `ev_1ad2372a097b93c0a954899f50e645124a489453051587cc198bcad28b15212c` — navigate, wait twelve seconds, press PageDown, wait 1.5 seconds; accessibility captured HASI BUL. This establishes changing introductory text, not completion of every downstream animation.
- **Screenshot:** `ev_0951daeb5e5daa2bef7f98051f6331e0db323afe775215a6f59734f497ac4997` — portrait and oversized PORTFOLIO typography. The actual captured viewport was 780 × 493; connect-mode environment settings did not establish the requested 1440 × 1000 viewport.

Complete exported records: [rea-bundle.json](evidence/rea-bundle.json). The screenshot artifact is retained there with its digest and base64 bytes; a decoded copy is [reference.png](evidence/reference.png).

Captured JS: [index-BJNuUqxu.js](https://demo.codeandchill.store/portfolio/assets/index-BJNuUqxu.js) (the downloaded copy and other third-party reference files are kept locally, not published here).

SHA-256: `c8580a4fb34a9c8b0311a1f7a995558c11b941675de7011619492840a5cc3495`

The independently downloaded file exactly matches the script digest observed by REA. [source-excerpts.json](evidence/source-excerpts.json) records searchable excerpts, line numbers, and zero-based UTF-8 byte offsets. These are manual static findings tied to REA's captured artifact, not additional REA runtime assertions.

## How the effects are built

| Technique | Evidence in the shipped bundle | Interpretation | Original implementation |
| --- | --- | --- | --- |
| Staggered section reveals | Line 115, byte 360873: `function Wc(e)`, child targets, `y:32`, `opacity:0`, configurable stagger, `once:!0` | GSAP animates groups when their ScrollTrigger enters view | `setupMotion()` uses independent reveal targets, vertical translation, opacity, and one-time triggers |
| Clipped text entrance | Line 115, byte 361128: `.line`, `yPercent:110`, duration 1.1, stagger .12, start `top 90%` | Lines travel upward from overflow-hidden wrappers | Hero name lines enter with a short stagger; content is present without JavaScript |
| Scroll parallax | Line 115, byte 361349: `data-parallax`, symmetric `yPercent`, `scrub:!0`, `top bottom` → `bottom top` | Position is tied continuously to scroll progress | Portrait shifts subtly on large screens |
| Horizontal project narrative | Line 115, byte 392771: `scrollLeft:i`, `pin:!0`, `scrub:1`, distance = scrollWidth − clientWidth | A pinned section converts vertical scroll into horizontal movement | Four real projects, desktop pin/scrub, native horizontal scrolling on smaller screens; previous/next controls work in both modes |
| Magnetic contact controls | Line 116, byte 412217: `quickTo(e,'x')`/`y`, duration .55, pointer position relative to center, reset on leave/blur | Smoothed pointer attraction, fine-pointer only | Subtle magnetic email heading with cleanup and motion toggle |
| Particle portrait | Line 115, byte 302734: `getContext('webgl2')`, shader uniforms `uReveal`, `uScatter`, `uMouse`, texture atlas, point drawing, GSAP ticker | GPU-rendered portrait tiles gather and respond to input; static fallback if context/shaders fail | Deliberately simplified to the user's real photo with parallax; no borrowed portrait or shader code |
| Interactive headline game | Line 116, byte 405178: `E=1/120`, requestAnimationFrame accumulator, paddle, ball collision, lives; keyboard ArrowLeft/Right, Space/Enter handlers | A fixed-step canvas brick-breaker simulation | Not reproduced: an unrelated game would add content beyond this portfolio's brief |
| Stop unnecessary work | Line 116, byte 406401: visibilitychange + IntersectionObserver + cancelAnimationFrame | Game loop pauses while hidden/offscreen | No continuous canvas loop; GSAP manages scoped effects |

The shipped bundle also explicitly checks `prefers-reduced-motion` and `pointer: fine`. The new site provides both system reduced-motion support and a manual Motion toggle. Reduced motion removes the pinned rail and reveals all content in its final state.

## What was observed vs. inferred

**Observed by REA:** the page, changing intro text across bounded scenarios, captured script identities, static parse results, and one screenshot. Scenario actions completed. Event coverage was marked incomplete; zero recorded errors is not proof that no errors ever occurred. CDP attach cannot recover earlier activity. No source maps were declared for retrieval.

**Derived by inspecting the matching script:** exact animation parameters and control flow above. Presence of shader/game/ScrollTrigger code does not prove every effect executed successfully on this machine. A later Playwright inspection found the intro had released body overflow and downstream sections existed; that supplemental check is not a REA evidence record.

**Unknown:** original unminified modules, all device/browser behaviors, source history, and performance on real phones. No exhaustive reference interaction test or frame-rate claim is made.

## Real-content provenance

All biographical claims, project descriptions, project status, achievements, tools, links, and contact information come from [0xmyth.com](https://0xmyth.com/), captured in [content-source.html](evidence/content-source.html).

- Name/handle: Mohammed Samir / 0xMYTH; first-year Cybersecurity student and OffSec enthusiast.
- Projects: autonomous CTF agent (in development), car rental app (live prototype), Tafweej workforce system (production), self-hosted infrastructure.
- Results: UCSI26 first place; Malaysian national CTF third place; Black Hat MEA 2025 qualifier rank 120, not a top-100 finish.
- Certification: CompTIA Network+.
- Current focus: HTB Web PT path / SQLMap Essentials, as published when retrieved. The old site's October completion goal is not presented as an achieved result.
- Contact: me@0xmyth.com; github.com/xlbaba; x.com/JustxMyth.
- Photo: this published copy uses a placeholder image (`public/portrait.webp`) instead of the real portrait.

Project diagrams are original, illustrative graphics of published features, not screenshots or claims of new functionality. No invented clients, endorsements, roles, or downloadable resume. Reference assets are evidence only and are excluded from the production output.

## Local build verification

`npm run build` passed. `npm test` passed five viewport/motion combinations (1440, 768, 390, and 320 px widths), plus a JavaScript-disabled content check. See [verification.json](evidence/verification.json). Supplemental keyboard checks confirmed the first Tab reaches Skip to content, Enter focuses main, and keyboard activation advances the project. Screenshots: [desktop](evidence/desktop.png), [mobile final state](evidence/verified-390.png). The screenshot mobile final state has motion disabled so all scroll-revealed content is visible.
