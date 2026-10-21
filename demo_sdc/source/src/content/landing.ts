// Landing copy and figures in one place so they can be edited without touching layout.
import type { CountFormat } from '@/lib/motion'

/** Boot lines typed by the landing intro. Segments are coloured by kind. */
export type BootSegment = { text: string; kind?: 'prompt' | 'demo' | 'ok' | 'dim' }
export const INTRO_LINES: BootSegment[][] = [
  [{ text: '>', kind: 'prompt' }, { text: ' scanning AI & job-market trends... ' }, { text: '[demo signals]', kind: 'demo' }],
  [{ text: '>', kind: 'prompt' }, { text: ' mapping skills to future roles... ' }, { text: '30 roles, 4 verified', kind: 'dim' }],
  [{ text: '>', kind: 'prompt' }, { text: ' linking roles to the UN SDGs... ' }, { text: '17 goals', kind: 'dim' }],
  [{ text: '>', kind: 'prompt' }, { text: ' ready', kind: 'ok' }],
]

/** Lines the curtain types while it carries you into the app. */
export const CURTAIN_LINES = {
  demo: [
    [{ text: '>', kind: 'prompt' }, { text: ' loading demo student... ' }, { text: '[fixture]', kind: 'demo' }],
    [{ text: '>', kind: 'prompt' }, { text: ' matching roles... ' }, { text: 'ok', kind: 'ok' }],
  ],
  profile: [[{ text: '>', kind: 'prompt' }, { text: ' opening profile builder... ' }, { text: 'ok', kind: 'ok' }]],
} satisfies Record<string, BootSegment[][]>

export const HERO = {
  eyebrow: 'AI career readiness · Malaysian students & fresh graduates',
  lines: ['Who you are today,', 'where you can be.'],
  body: 'Track how AI is reshaping jobs, see which future roles fit your skills, and get a roadmap to close the gap, with every role linked to the UN SDGs.',
}

export type StoryStep = { eyebrow: string; title: string; body: string }
export const STORY: StoryStep[] = [
  {
    eyebrow: 'Your skills today',
    title: 'Start with what you already have.',
    body: 'Add your degree, skills and projects. They map to a shared skills vocabulary, so the pivot tables in your coursework count as data analysis.',
  },
  {
    eyebrow: 'Rising & declining skills',
    title: 'See where demand is heading.',
    body: 'Market signals show which skills employers ask for more, and which routine tasks AI is absorbing. Every signal carries its source and date.',
  },
  {
    eyebrow: 'Matched future roles',
    title: 'Meet roles that fit you.',
    body: 'Each role gets an alignment estimate with the skills you match, the ones you are missing and at least one caveat. You decide what fits.',
  },
  {
    eyebrow: 'Learning pathway',
    title: 'Close the gap, step by step.',
    body: 'An ordered roadmap with hours for each step, plus portfolio projects that let you show the skill instead of only listing it.',
  },
  {
    eyebrow: 'SDG impact',
    title: 'Work that moves the world.',
    body: 'Every role and skill links to the UN Sustainable Development Goals, with a plain-language reason for each link.',
  },
]

export const MARQUEE_ROLES = [
  'Data analyst',
  'Sustainability coordinator',
  'Financial analyst',
  'Mechanical design engineer',
  'AI product analyst',
  'Climate data specialist',
  'Learning designer',
  'Supply chain planner',
]

/**
 * DEMO figures: placeholders for layout only. Every one is labelled DEMO in the UI and
 * will be replaced by cited statistics before the final submission.
 */
export type DemoStat = { value: number; format: CountFormat; suffix?: string; label: string }
export const DEMO_STATS: DemoStat[] = [
  { value: 62, format: 'percent', label: 'of sample job ads mention AI tools' },
  { value: 30, format: 'int', label: 'future roles in the catalogue' },
  { value: 120, format: 'hours', label: 'median roadmap to close one gap' },
  { value: 17, format: 'int', label: 'UN SDGs linked to roles & skills' },
]

export const PRINCIPLES = [
  {
    title: 'Evidence, not verdicts',
    body: 'Scores are alignment estimates with caveats beside them. The decision about your future stays with you.',
  },
  {
    title: 'Sources on everything',
    body: 'Each trend shows where it came from and when, and whether the data is live, cached or a demo.',
  },
  {
    title: 'Fair by design',
    body: 'Age, gender and background are never asked for or used. Only skills, experience and interests count.',
  },
]
