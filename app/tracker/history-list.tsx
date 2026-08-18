type Log = {
  id: string
  logged_at: string
  mood_rating: number | null
  sleep_quality: number | null
  energy_level: number | null
  hot_flashes: boolean
  notes: string | null
}

export default function HistoryList({ logs, locked }: { logs: Log[]; locked: boolean }) {
  const visible = locked ? logs.slice(0, 5) : logs

  return (
    <div className="card">
      <h3 style={{ marginTop: 0, color: 'var(--plum)' }}>Recent entries</h3>
      {visible.length === 0 && <p style={{ color: '#8a9a83' }}>Nothing logged yet — start above.</p>}
      {visible.map((log) => (
        <div key={log.id} style={{ borderBottom: '1px solid #f0e5ea', padding: '0.75rem 0' }}>
          <div style={{ fontSize: '0.85rem', color: '#8a9a83' }}>
            {new Date(log.logged_at).toLocaleDateString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div style={{ fontSize: '0.95rem' }}>
            Mood {log.mood_rating ?? '—'} · Sleep {log.sleep_quality ?? '—'} · Energy{' '}
            {log.energy_level ?? '—'} {log.hot_flashes ? '· 🔥 hot flash' : ''}
          </div>
          {log.notes && <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>{log.notes}</div>}
        </div>
      ))}
      {locked && logs.length > 5 && (
        <p style={{ marginTop: '1rem' }}>
          <a href="/subscribe">Upgrade</a> to see your full history and trends over time.
        </p>
      )}
    </div>
  )
}
