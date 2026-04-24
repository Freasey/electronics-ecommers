import type { Metadata } from 'next'
import ElectronicHeroSection from '@/components/features/ElectronicHeroSection'
import FeaturedProductSection from '@/components/features/FeaturedProductSection'
import CategoryHighlightSection from '@/components/features/CategoryHighlightSection'

export const metadata: Metadata = {
  title: 'Aditek - Beranda',
  description:
    'Katalog solusi security system dan infrastruktur enterprise dengan tampilan modern dan navigasi efisien.',
  keywords: ['security system', 'infrastruktur IT', 'enterprise', 'aditek', 'solusi keamanan'],
  openGraph: {
    title: 'Aditek',
    description: 'Temukan solusi security system dan infrastruktur untuk kebutuhan operasional perusahaan.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <ElectronicHeroSection />
      <FeaturedProductSection />
      <CategoryHighlightSection />
    </main>
  )
}
