'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const SCALE = [1, 2, 3, 4, 5]

export default function LogForm({ userId }: { userId: string }) {
  const [mood, setMood] = useState<number | null>(null)
  const [sleep, setSleep] = useState<number | null>(null)
  const [energy, setEnergy] = useState<number | null>(null)
  const [hotFlashes, setHotFlashes] = useState(false)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const supabase = createClient()
  const router = useRouter()

  async function handleSave() {
    setSaving(true)
    await supabase.from('symptom_logs').insert({
      user_id: userId,
      mood_rating: mood,
      sleep_quality: sleep,
      energy_level: energy,
      hot_flashes: hotFlashes,
      notes: notes || null,
    })
    setSaving(false)
    setSaved(true)
    setMood(null)
    setSleep(null)
    setEnergy(null)
    setHotFlashes(false)
    setNotes('')
    router.refresh()
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="card">
      <label className="label">Mood today</label>
      <div className="rating-row">
        {SCALE.map((n) => (
          <button
            key={n}
            className={`rating-btn ${mood === n ? 'selected' : ''}`}
            onClick={() => setMood(n)}
            type="button"
          >
            {n}
          </button>
        ))}
      </div>

      <label className="label">Sleep quality</label>
      <div className="rating-row">
        {SCALE.map((n) => (
          <button
            key={n}
            className={`rating-btn ${sleep === n ? 'selected' : ''}`}
            onClick={() => setSleep(n)}
            type="button"
          >
            {n}
          </button>
        ))}
      </div>

      <label className="label">Energy level</label>
      <div className="rating-row">
        {SCALE.map((n) => (
          <button
            key={n}
            className={`rating-btn ${energy === n ? 'selected' : ''}`}
            onClick={() => setEnergy(n)}
            type="button"
          >
            {n}
          </button>
        ))}
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="checkbox"
          checked={hotFlashes}
          onChange={(e) => setHotFlashes(e.target.checked)}
          style={{ width: 'auto', marginBottom: 0 }}
        />
        Had a hot flash today
      </label>

      <label className="label">Anything you want to remember about today</label>
      <textarea
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional"
      />

      <button className="primary" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Log today'}
      </button>
    </div>
  )
}
