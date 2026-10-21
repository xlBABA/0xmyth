// Positions for the landing constellation: 17 nodes (one per SDG) rearranged into six
// formations. Coordinates are in a 600×600 viewBox. Pure data, so the desktop scroll
// timeline and the static mobile versions read exactly the same layouts.

export const N = 17
export const VIEW = 600

export type NodeState = { x: number; y: number; r: number; tone: string; o: number }
export type Label = {
  x: number
  y: number
  text: string
  size?: number
  weight?: number
  anchor?: 'start' | 'middle' | 'end'
  muted?: boolean
  fill?: string
}
export type Stage = { nodes: NodeState[]; labels: Label[]; chips: string[] }

const rad = (deg: number) => (deg * Math.PI) / 180

// 0 · hero: a phyllotaxis cloud
const hero: Stage = {
  nodes: Array.from({ length: N }, (_, i) => {
    const a = rad(i * 137.5)
    const d = 47 * Math.sqrt(i + 0.6)
    return { x: 300 + d * Math.cos(a), y: 300 + d * Math.sin(a), r: 16 - i * 0.5, tone: ['primary', 'ocean', 'teal', 'sky'][i % 4], o: 0.92 }
  }),
  labels: [],
  chips: [],
}

// 1 · skills today: eight labelled skills sized by level, the rest faint
const SKILLS = [
  { name: 'Python', level: 'Intermediate', x: 140, y: 145, r: 18 },
  { name: 'Excel', level: 'Advanced', x: 315, y: 145, r: 24 },
  { name: 'SQL', level: 'Beginner', x: 480, y: 145, r: 13 },
  { name: 'Statistics', level: 'Intermediate', x: 215, y: 305, r: 18 },
  { name: 'Communication', level: 'Advanced', x: 415, y: 305, r: 24 },
  { name: 'Teamwork', level: 'Advanced', x: 130, y: 460, r: 22 },
  { name: 'Presentation', level: 'Intermediate', x: 315, y: 460, r: 18 },
  { name: 'Report writing', level: 'Beginner', x: 480, y: 460, r: 13 },
]
const ghostAngles = [20, 62, 104, 150, 196, 236, 282, 318, 350]
const skills: Stage = {
  nodes: [
    ...SKILLS.map((s) => ({ x: s.x, y: s.y, r: s.r, tone: 'primary', o: 1 })),
    ...ghostAngles.map((g) => ({ x: 300 + 282 * Math.cos(rad(g)), y: 300 + 282 * Math.sin(rad(g)), r: 4, tone: 'faint', o: 0.35 })),
  ],
  labels: SKILLS.flatMap((s) => [
    { x: s.x, y: s.y + s.r + 22, text: s.name, size: 17, weight: 750, anchor: 'middle' as const },
    { x: s.x, y: s.y + s.r + 40, text: s.level, size: 12.5, weight: 600, anchor: 'middle' as const, muted: true },
  ]),
  chips: SKILLS.map((s) => s.name),
}

// 2 · trends: a diverging dot plot around a zero line at y = 300
export const TREND_AXIS = 300
const TRENDS = [0.95, 0.85, 0.76, 0.66, 0.55, 0.46, 0.37, 0.28, 0.19, 0.1, 0.03, -0.12, -0.24, -0.37, -0.52, -0.68, -0.84]
const trends: Stage = {
  nodes: TRENDS.map((t, j) => ({
    x: 60 + j * 30,
    y: TREND_AXIS - t * 205,
    r: 7 + Math.abs(t) * 7,
    tone: t > 0.08 ? 'good' : t < -0.08 ? 'coral' : 'faint',
    o: 1,
  })),
  // rising dots step down to the right, so above-right of each is free; declining mirror that
  labels: [
    { x: 76, y: 91, text: 'AI literacy', size: 16, weight: 750 },
    { x: 166, y: 151, text: 'Data analysis', size: 14, weight: 650, muted: true },
    { x: 256, y: 210, text: 'Sustainability reporting', size: 14, weight: 650, muted: true },
    { x: 526, y: 502, text: 'Manual data entry', size: 16, weight: 750, anchor: 'end' },
    { x: 436, y: 406, text: 'Routine bookkeeping', size: 14, weight: 650, anchor: 'end', muted: true },
    { x: 560, y: 70, text: 'rising ↑', size: 13, weight: 700, anchor: 'end', fill: 'var(--good)' },
    { x: 40, y: 545, text: 'declining ↓', size: 13, weight: 700, fill: 'var(--coral)' },
  ],
  chips: ['AI literacy ↑', 'Data analysis ↑', 'Sustainability reporting ↑', 'Manual data entry ↓'],
}

// 3 · matched roles: four hubs, nodes orbiting each
export const HUBS = [
  { x: 165, y: 165, name: ['Data', 'analyst'], tone: 'ocean', count: 5 },
  { x: 435, y: 165, name: ['Financial', 'analyst'], tone: 'sky', count: 4 },
  { x: 165, y: 435, name: ['Mechanical', 'design engineer'], tone: 'amber', count: 4 },
  { x: 435, y: 435, name: ['Sustainability', 'coordinator'], tone: 'teal', count: 4 },
]
export const HUB_RADIUS = 80
const roles: Stage = {
  nodes: HUBS.flatMap((h, hi) =>
    Array.from({ length: h.count }, (_, k) => {
      const a = rad(-90 + hi * 20 + (k * 360) / h.count)
      return { x: h.x + HUB_RADIUS * Math.cos(a), y: h.y + HUB_RADIUS * Math.sin(a), r: 9, tone: h.tone, o: 1 }
    }),
  ),
  labels: HUBS.flatMap((h) => [
    { x: h.x, y: h.y - 2, text: h.name[0], size: 16, weight: 800, anchor: 'middle' as const },
    { x: h.x, y: h.y + 17, text: h.name[1], size: 13.5, weight: 650, anchor: 'middle' as const, muted: true },
  ]),
  chips: HUBS.map((h) => h.name.join(' ')),
}

// 4 · pathway: nodes along an S-curve; every fourth is a milestone
const P0 = [70, 500], C1 = [260, 520], C2 = [200, 300], P1 = [300, 300]
const C3 = [400, 300], C4 = [340, 80], P2 = [530, 100]
export const PATH_D = `M${P0} C${C1} ${C2} ${P1} C${C3} ${C4} ${P2}`
const cubic = (a: number[], b: number[], c: number[], d: number[], t: number) =>
  [0, 1].map((k) => (1 - t) ** 3 * a[k] + 3 * (1 - t) ** 2 * t * b[k] + 3 * (1 - t) * t ** 2 * c[k] + t ** 3 * d[k])
const onPath = (t: number) => (t <= 0.5 ? cubic(P0, C1, C2, P1, t * 2) : cubic(P1, C3, C4, P2, (t - 0.5) * 2))
const MILESTONES: Record<number, { text: string; dx: number; dy: number; anchor: 'start' | 'end' }> = {
  0: { text: 'You, today', dx: -14, dy: 42, anchor: 'start' },
  4: { text: 'SQL foundations', dx: -24, dy: 0, anchor: 'end' },
  8: { text: 'Dashboard project', dx: -22, dy: -16, anchor: 'end' },
  12: { text: 'Power BI', dx: 24, dy: 8, anchor: 'start' },
  16: { text: 'Job-ready, with evidence', dx: -26, dy: -18, anchor: 'end' },
}
const pathway: Stage = {
  nodes: Array.from({ length: N }, (_, j) => {
    const [x, y] = onPath(j / (N - 1))
    const milestone = j in MILESTONES
    return { x, y, r: milestone ? 14 : 5, tone: milestone ? 'primary' : 'faint', o: milestone ? 1 : 0.7 }
  }),
  labels: Object.entries(MILESTONES).map(([j, m]) => {
    const [x, y] = onPath(Number(j) / (N - 1))
    return { x: x + m.dx, y: y + m.dy, text: m.text, size: 15, weight: 750, anchor: m.anchor }
  }),
  chips: Object.values(MILESTONES).map((m) => m.text),
}

// 5 · SDG impact: a ring in the 17 official colours
const sdg: Stage = {
  nodes: Array.from({ length: N }, (_, j) => {
    const a = rad(-90 + (j * 360) / N)
    return { x: 300 + 215 * Math.cos(a), y: 300 + 215 * Math.sin(a), r: 21, tone: `sdg-${j + 1}`, o: 1 }
  }),
  labels: [
    ...Array.from({ length: N }, (_, j) => {
      const a = rad(-90 + (j * 360) / N)
      return { x: 300 + 215 * Math.cos(a), y: 300 + 215 * Math.sin(a) + 5, text: String(j + 1), size: 14, weight: 800, anchor: 'middle' as const, fill: '#fff' }
    }),
    { x: 300, y: 300, text: '17', size: 88, weight: 800, anchor: 'middle' as const },
    { x: 300, y: 336, text: 'UN Sustainable', size: 16, weight: 700, anchor: 'middle' as const, muted: true },
    { x: 300, y: 357, text: 'Development Goals', size: 16, weight: 700, anchor: 'middle' as const, muted: true },
  ],
  chips: ['Quality education', 'Decent work', 'Industry & innovation', 'Climate action'],
}

export const STAGES: Stage[] = [hero, skills, trends, roles, pathway, sdg]
