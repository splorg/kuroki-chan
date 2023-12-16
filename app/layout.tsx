import { type Metadata } from 'next'

import { Inter } from 'next/font/google'

import { Navigation } from './ui/navigation'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'kuroki-chan',
  description: 'Browsing cambodian basket-weaving forums since 2002!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
