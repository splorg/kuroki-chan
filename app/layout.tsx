import { type Metadata } from 'next'

import { Navigation } from './ui/navigation'

import './globals.css'

export const metadata: Metadata = {
  title: 'kuroki-chan',
  description: 'Browsing cambodian basket-weaving forums since 2002!',
  metadataBase: new URL('https://kurokichan.vercel.app/')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
