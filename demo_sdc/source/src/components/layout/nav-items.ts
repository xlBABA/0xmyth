import { BookOpenText, BriefcaseBusiness, LayoutDashboard, UserRoundPen, type LucideIcon } from 'lucide-react'

export type NavItem = {
  to: string
  label: string
  /** shorter label for the mobile bottom bar */
  short: string
  icon: LucideIcon
  /** pathname prefix that marks this item active */
  match: string
  group: 'Workspace' | 'Understand'
}

export const NAV: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', short: 'Home', icon: LayoutDashboard, match: '/dashboard', group: 'Workspace' },
  { to: '/roles/data_analyst', label: 'Future roles', short: 'Roles', icon: BriefcaseBusiness, match: '/roles', group: 'Workspace' },
  { to: '/start', label: 'Build my profile', short: 'Profile', icon: UserRoundPen, match: '/start', group: 'Workspace' },
  { to: '/methodology', label: 'Methodology', short: 'Method', icon: BookOpenText, match: '/methodology', group: 'Understand' },
]

export const activeIndex = (pathname: string) => NAV.findIndex((n) => pathname === n.match || pathname.startsWith(`${n.match}/`))
