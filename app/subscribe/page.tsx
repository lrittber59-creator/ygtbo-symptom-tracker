'use client'

import { useState } from 'react'

export default function SubscribePage() {
  const [loading, setLoading] = useState(false)

  async function startCheckout() {
    setLoading(true)
    const res = await fetch('/api/checkout', { method: 'POST' })
    const { url } = await res.json()
    if (url) window.location.href = url
    setLoading(false)
  }

  return (
    <div className="container">
      <h1 className="brand-title">Upgrade</h1>
      <p className="brand-sub">$5.99/month · cancel anytime</p>
      <div className="card">
        <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8 }}>
          <li>Unlimited history, not just your last 5 entries</li>
          <li>Trends over time so you can see patterns</li>
          <li>Everything backed by the same gentle, no-judgment approach</li>
        </ul>
        <button className="primary" onClick={startCheckout} disabled={loading}>
          {loading ? 'Redirecting…' : 'Continue to checkout'}
        </button>
      </div>
    </div>
  )
}
