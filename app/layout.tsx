import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chess Learning App',
  description: 'Learn chess strategies and tactics',
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
