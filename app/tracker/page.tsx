import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogForm from './log-form'
import HistoryList from './history-list'

export default async function TrackerPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  const { data: logs } = await supabase
    .from('symptom_logs')
    .select('*')
    .eq('user_id', user.id)
    .order('logged_at', { ascending: false })
    .limit(30)

  const isSubscribed = profile?.subscription_status === 'active'

  return (
    <div className="container">
      <h1 className="brand-title">Your Tracker</h1>
      <p className="brand-sub">No judgment. Just witnessing how today went.</p>

      {!isSubscribed && (
        <div className="card" style={{ background: '#f4e9ee' }}>
          <p style={{ margin: 0 }}>
            You're on the free plan. <a href="/subscribe">Upgrade for $5.99/mo</a> to unlock
            unlimited history and trends.
          </p>
        </div>
      )}

      <LogForm userId={user.id} />
      <HistoryList logs={logs ?? []} locked={!isSubscribed} />
    </div>
  )
}
