import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'TMS Admin Dashboard',
  description: 'Tealand Medical School Administration Panel',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full bg-gray-50`}>
      <body className="font-sans min-h-full antialiased text-gray-900">
        {children}
      </body>
    </html>
  )
}
