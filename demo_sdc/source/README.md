# FuturePath AI — frontend prototype

SDC Hackathon 2026, Domain 1. Vite + React 19 + TypeScript (strict) + Tailwind v4 + shadcn/ui,
GSAP for motion, Lenis for landing scroll. Mock data only for now.

## Run

```bash
npm install
npm run dev        # http://localhost:5173  (use `npx vite --port 5180` if 5173 is taken)
npm run build      # type-check + production build
npm run lint       # oxlint
```

The product name lives in `src/config/product.ts` (also injected into `index.html`).

## Map

| Path | What |
|---|---|
| `src/styles/tokens.css` | colour/radius/shadow tokens, light + dark (`html[data-theme]`) |
| `src/index.css` | Tailwind theme mapping, base styles, view-transition rules |
| `src/lib/motion.ts` | entrance choreography (`data-enter`, `data-count`), press/flash helpers |
| `src/lib/theme.ts` | theme store + circular View Transition wipe |
| `src/components/layout/*` | app shell: sidebar, bottom nav, top bar, route transition |
| `src/components/page/page.tsx` | page frame: header + entrance + late-content reveal |
| `src/pages/*` | routes; `/design` is a living reference of tokens and motion |
| `docs/research/REFERENCE_EVIDENCE.md` | step-1 investigation of the reference sites |
