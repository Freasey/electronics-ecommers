import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/layout/ThemeProvider'
import NavigationBar from '@/components/layout/NavigationBar'
import Footer from '@/components/layout/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Aditek Security',
    default: 'Aditek Security - Solusi Security System dan Infrastruktur',
  },
  description:
    'Platform katalog solusi security system, monitoring, dan infrastruktur untuk kebutuhan perusahaan.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <NavigationBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
