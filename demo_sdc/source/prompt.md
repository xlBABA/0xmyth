SCOPE: Work ONLY inside the current working directory. Do not create, edit,
move or delete anything outside it. Other agents are working in other folders
at the same time.

Use REA to investigate how these sites build their animations, interactions,
transitions and theming, and show me the evidence (libraries loaded, key code
snippets, CSS variables, timing/easing values, scroll logic) for each one
BEFORE you build anything:

LANDING PAGE references (inspiration only, combine their ideas creatively):
  1. https://landonorris.com              → scroll-driven hero, element that follows/transforms with scroll
  2. https://www.apple.com/airpods-pro/   → pinned product that transforms with scroll, text reveals
  3. https://demo.codeandchill.store/mango/               → launch-page energy, huge typography, bold number reveals
  4. https://0xmyth.com/claude_version    → my own intro/boot-sequence animation style

APP references (everything after the landing page):
  5. https://demo.codeandchill.store/kelvo/#/overview     → copy its EXACT design language:
     - color tokens for BOTH light and dark mode
     - the dark/light toggle transition animation (same effect)
     - page load animation, page-to-page transitions, card/list entrance
       animations, hover and micro-interactions, loading states

Then build an ORIGINAL frontend prototype in THIS directory for our hackathon
project, using similar techniques but our own concept and content.
Do not copy their code, text, images, logos or brand identity verbatim;
re-implement the techniques. At the end, list every third-party library,
component or asset you used, with its license, so I can declare it.

== PROJECT CONTEXT ==
If these files exist in this directory, read them first: CLAUDE.md,
contracts/API_CONTRACT.md, contracts/openapi.yaml, MOHAMMAD_FRONTEND.md,
FRONTEND_HANDOFF.md. If they don't exist, rely on the context below.

Product: "FuturePath AI" (keep the name in ONE constant; it may change).
SDC Hackathon 2026, Domain 1 (sponsor: Aiversecity). An AI career-readiness app
for university students and fresh graduates in Malaysia: it tracks AI and
job-market trends, matches a student's skills to future roles, shows the skill
gap, compares moderate vs fast AI-disruption scenarios, builds a learning
roadmap, and links every role and skill to the UN SDGs.
Tagline idea: "From who you are today to where you can be in the AI era."

== STACK ==
Vite (port 5173) + React + TypeScript strict + Tailwind + shadcn/ui + Recharts
+ React Router + lucide-react. Use GSAP/ScrollTrigger, Lenis, Motion or
Three.js ONLY where the investigated techniques need them.
API base URL from VITE_API_BASE_URL, but this prototype uses mock data only.

== PAGES ==
1. /  LANDING (be creative here)
   - Short skippable intro in the spirit of my site's boot sequence, but with
     product content (e.g. "> scanning AI trends... > mapping roles... > ready").
   - Scroll-driven story where one persistent visual element transforms through
     5 stages: your skills today → rising/declining skill trends → matched future
     roles → learning pathway → SDG impact (17 official SDG colors at the end).
   - A stats section (use clearly marked DEMO numbers; we will replace them with
     real cited stats later).
   - Two CTAs: "Try with a demo student" → /dashboard with demo data,
     and "Build my profile" → /start.
2. /start  4-step intake wizard: education (level, degree, semester) → skills
   (searchable chips + beginner/intermediate/advanced) → projects & experience →
   interests → review → "Analyze". Include a "Load demo student" button.
   Show CV upload as a disabled "coming soon" option.
3. /dashboard  student summary, data-mode badge, ranked role match cards
   (4 demo roles: data_analyst, financial_analyst, mechanical_design_engineer,
   sustainability_coordinator), each with score ring labelled
   "alignment estimate", top matched/missing skills, trend arrow, SDG badges,
   at least one caveat. Catalog coverage note ("4 of 30 roles verified").
   Trend snapshot widget. Placeholder slot for a future "What changed" panel.
4. /roles/:roleId  role workspace with tabs:
   Overview (score breakdown chart: skills/experience/prerequisites/transferable,
   matched vs missing skills, explanation, caveats) | Trends (signals with
   direction, source, observed_at and retrieved_at, stale/unavailable status) |
   Scenarios (moderate vs fast ASSUMPTIONS side by side + uncertainty note;
   scores do NOT change between scenarios) | Roadmap (ordered timeline with
   hours, total hours, hours/week input) | Projects (portfolio project cards +
   "Simulate impact" showing baseline → simulated score with disclaimer) |
   SDGs (role and per-skill SDG mappings with reasons).
5. /methodology  how the score is calculated (50% skills, 20% experience,
   15% prerequisites, 15% transferable), what live/cached/fixture mean,
   what the system does NOT do, fairness note (no age/gender/background used).

Navigation: sidebar on desktop, bottom nav on mobile; theme toggle in header.

== MOCK DATA ==
In ./src/mocks/, typed, shaped EXACTLY like the backend responses
(APIEnvelope with data, data_mode, generated_at, warnings). data_mode "live"
only for profile/analyze, "fixture" everywhere else. Include empty-state and
error variants (404 PROFILE_NOT_FOUND, 503 PROVIDER_UNAVAILABLE).
Use fake source names and example.com URLs only.

== NON-NEGOTIABLE RULES ==
- No scoring logic in the frontend; all numbers come from mocks/API.
- Scores are "alignment estimate", never "chance", "probability" or "eligible".
- Always show >=1 caveat next to a score and the disclaimer next to a simulated score.
- Visible "Demo data" badge wherever data_mode is fixture.
- Tone: AI supports the student's decision, it does not decide for them.
- Respect prefers-reduced-motion; keep the landing light on mobile.
- Accessible: labels, focus states, contrast in both themes.

== WORKFLOW ==
1. Investigation + evidence report for all 5 sites → stop and show me.
2. Design tokens (light/dark) + theme toggle + app shell + transitions.
3. Landing page.
4. Remaining pages.
Suggest a git commit message after each step. Report changed files and how to run it.
