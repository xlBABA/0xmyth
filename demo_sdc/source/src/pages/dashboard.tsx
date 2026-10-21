import { useEffect, useState } from 'react'
import { BriefcaseBusiness, History, TrendingUp, UserRoundPen } from 'lucide-react'
import { Link } from 'react-router'
import { DataModeBadge } from '@/components/data-mode-badge'
import { PageSkeleton } from '@/components/layout/page-skeleton'
import { Page } from '@/components/page/page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useDemoStudent } from '@/hooks/use-demo-student'

// Step 2 placeholder: shows the shell, loading state and entrance. Real content lands in step 4.
export default function Dashboard() {
  const demo = useDemoStudent()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(t)
  }, [])

  return (
    <Page
      title="Your career outlook"
      crumbs={[{ label: 'Workspace' }, { label: 'Dashboard' }]}
      subtitle="Ranked future roles, your skill gaps and the trends behind them. Use it to inform your choice, not to make it."
      meta={
        <>
          <DataModeBadge mode="fixture" />
          {demo && <Badge tone="primary">Demo student</Badge>}
        </>
      }
      actions={[
        <Button key="p" variant="secondary" asChild>
          <Link to="/start">
            <UserRoundPen />
            Edit profile
          </Link>
        </Button>,
      ]}
    >
      {loading ? (
        <PageSkeleton cards={3} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { icon: BriefcaseBusiness, title: 'Role matches', text: 'Four demo roles with alignment estimates, matched and missing skills.' },
            { icon: TrendingUp, title: 'Trend snapshot', text: 'Rising and declining skills from fixture sources.' },
            { icon: History, title: 'What changed', text: 'Reserved for a future panel that compares analyses over time.' },
          ].map((c) => (
            <Card key={c.title} lift>
              <CardHeader icon={c.icon} title={c.title} />
              <p data-enter="item" className="mb-4 text-muted-foreground">
                {c.text}
              </p>
              <div className="grid gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </Page>
  )
}
