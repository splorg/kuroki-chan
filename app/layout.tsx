import { type Metadata } from 'next'

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
        {children}
      </body>
    </html>
  )
}
