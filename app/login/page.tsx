'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
const [email, setEmail] = useState('')
const [code, setCode] = useState('')
const [sent, setSent] = useState(false)
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const supabase = createClient()
const router = useRouter()

async function sendCode(e: React.FormEvent) {
e.preventDefault()
setLoading(true)
setError(null)
const { error } = await supabase.auth.signInWithOtp({
email,
})
setLoading(false)
if (error) setError(error.message)
else setSent(true)
}

async function verifyCode(e: React.FormEvent) {
e.preventDefault()
setLoading(true)
setError(null)
const { error } = await supabase.auth.verifyOtp({
email,
token: code,
type: 'email',
})
setLoading(false)
if (error) setError(error.message)
else router.push('/tracker')
}

async function signInWithProvider(provider: 'google' | 'apple') {
await supabase.auth.signInWithOAuth({
provider,
options: { redirectTo: ${window.location.origin}/auth/callback },
})
}

return (
<div className="container">
<h1 className="brand-title">YourGoingToBeOK</h1>
<p className="brand-sub">You're going to be okay. Let's track how you're really doing.</p>
<div className="card">
{sent ? (
<form onSubmit={verifyCode}>
<p style={{ marginBottom: '0.75rem' }}>We sent a 6-digit code to {email}. Enter it below.</p>
<label className="label">Code</label>
<input
type="text"
inputMode="numeric"
required
value={code}
onChange={(e) => setCode(e.target.value)}
placeholder="123456"
/>
<button className="primary" type="submit" disabled={loading}>
{loading ? 'Verifying…' : 'Verify and sign in'}
</button>
{error && <p style={{ color: 'crimson', marginTop: '0.75rem' }}>{error}</p>}
</form>
) : (
<form onSubmit={sendCode}>
<label className="label">Email</label>
<input
type="email"
required
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="you@example.com"
/>
<button className="primary" type="submit" disabled={loading}>
{loading ? 'Sending…' : 'Send me a sign-in code'}
</button>
{error && <p style={{ color: 'crimson', marginTop: '0.75rem' }}>{error}</p>}
</form>
)}
</div>
<div style={{ textAlign: 'center', color: '
#8a9a83', margin: '0.5rem 0' }}>or</div>
<div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
<button className="primary" style={{ background: '
#4285F4' }} onClick={() => signInWithProvider('google')}>
Continue with Google
</button>
<button className="primary" style={{ background: 'black' }} onClick={() => signInWithProvider('apple')}>
Continue with Apple
</button>
</div>
</div>
)




}
