import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Insurance Charge Predictor',
  description: 'Predict your insurance charges based on personal information',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
