import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Blog Summarizer',
  description: 'Generate intelligent summaries of blog posts using Vercel AI SDK',
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
