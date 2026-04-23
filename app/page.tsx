import type { Metadata } from 'next'
import HeroSection from '@/components/features/HeroSection'
import AnimeCarousel from '@/components/features/AnimeCarousel'
import GenreSection from '@/components/features/GenreSection'

export const metadata: Metadata = {
  title: 'AniStream — Tonton Anime Subtitle Indonesia',
  description:
    'Platform streaming anime terlengkap dengan subtitle Indonesia. Ribuan judul dari berbagai genre tersedia gratis.',
  keywords: ['anime', 'streaming', 'subtitle indonesia', 'nonton anime', 'anime gratis'],
  openGraph: {
    title: 'AniStream — Tonton Anime Subtitle Indonesia',
    description: 'Platform streaming anime terlengkap dengan subtitle Indonesia.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <HeroSection />
      <AnimeCarousel />
      <GenreSection />
    </main>
  )
}
