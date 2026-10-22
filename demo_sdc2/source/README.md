# Mustaqbal AI — frontend prototype (demo 2)

SDC Hackathon 2026, Domain 1. Vite + React 19 + TypeScript (strict) + Tailwind v4 + shadcn/ui,
GSAP (+ ScrollTrigger, MotionPath) for motion, Lenis for landing scroll. Mock data only.

## Run

```bash
npm install
npm run dev        # http://localhost:5173  (use `npx vite --port 5181` if 5173 is taken)
npm run build      # type-check + production build
npm run lint       # oxlint
```

Mock states: add `?mock=empty`, `?mock=404` or `?mock=503` to any app URL.

## Map

| Path | What |
|---|---|
| `src/config/product.ts` | product name (also injected into `index.html`) |
| `src/styles/tokens.css` | light/dark tokens + 4 accent colours (`html[data-accent]`) + 17 SDG colours |
| `src/components/brand.tsx`, `public/brand/` | Mustaqbal AI mark and wordmark |
| `src/lib/theme.ts` | theme + accent store (knob switch, colour cross-fade) |
| `src/components/layout/*` | shell: top pill tabs, floating dock, mobile tabs, cross-fade route transition |
| `src/components/dashboard/*` | overview widgets |
| `src/components/landing/*` | intro, clip-reveal hero, manifesto, horizontal journey, cinema, numbers, footer |
| `src/mocks/*` | APIEnvelope-shaped fixtures, mock client with empty/404/503 states |
| `docs/research/REFERENCE_EVIDENCE.md` | REA investigation of Rapport / Mender / Halden |
