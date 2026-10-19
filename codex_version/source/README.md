# 0xMYTH — original portfolio

Local portfolio for Mohammed Samir. Real content from https://0xmyth.com and the supplied portrait. Original editorial design with GSAP reveals, photo parallax, a pinned desktop project sequence, native mobile browsing, and magnetic contact interaction.

## Run

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite (normally http://127.0.0.1:5173).

```sh
npm run build
npm run preview
```

The built site (`npm run build -- --base ./`) is published in the parent `codex_version/` folder; this `source/` folder holds the project. The evidence folder is not part of the production build.

## Files

- `index.html`: semantic markup and real content; usable without JavaScript.
- `style.css`: responsive design and motion preference rules.
- `src.js`: GSAP/ScrollTrigger choreography and controls.
- `public/portrait.webp`: placeholder image (black background, "this is where my photo should be"); swap in a real photo at the same path.
- `EVIDENCE.md`: reference findings, exact source locations, REA IDs, caveats, and content provenance.
- `evidence/rea-bundle.json`: exported REA records.
- `evidence/verification.json`: browser checks and viewport results.

## Validation

With the dev server running, `npm test` checks desktop/mobile/tablet, reduced motion, project navigation, details, anchors, image loading, overflow, and browser errors using installed Google Chrome. Set the executable path in `scripts/verify.mjs` if your Chrome lives elsewhere.

Fonts use Google Fonts with local fallbacks. No backend, contact form, telemetry, or placeholder links. Project descriptions reflect the source site at retrieval time, 18 October 2026.
