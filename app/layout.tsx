import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YourGoingToBeOK — Symptom Tracker',
  description: 'A gentle way to track how you\'re really doing.',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
