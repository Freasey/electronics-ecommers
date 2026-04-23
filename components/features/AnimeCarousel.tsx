import AnimeCard, { AnimeCardProps } from '@/components/ui/AnimeCard'
import Link from 'next/link'

const featuredAnimeList: AnimeCardProps[] = [
  {
    id: 1,
    title: 'Solo Leveling Season 2',
    genres: ['Action', 'Fantasy'],
    totalEpisodes: 13,
    rating: 9.1,
    status: 'Tayang',
    posterColor: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
    featured: true,
  },
  {
    id: 2,
    title: 'Frieren: Beyond Journey\'s End',
    genres: ['Fantasy', 'Adventure'],
    totalEpisodes: 28,
    rating: 9.4,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #2d3561 0%, #c05c7e 100%)',
  },
  {
    id: 3,
    title: 'Jujutsu Kaisen Season 3',
    genres: ['Action', 'Supernatural'],
    totalEpisodes: 21,
    rating: 9.0,
    status: 'Tayang',
    posterColor: 'linear-gradient(145deg, #0d0d0d 0%, #1a0533 50%, #320759 100%)',
  },
  {
    id: 4,
    title: 'Dungeon Meshi',
    genres: ['Fantasy', 'Comedy'],
    totalEpisodes: 24,
    rating: 8.9,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #1b4332 0%, #40916c 100%)',
  },
  {
    id: 5,
    title: 'Kaiju No. 8',
    genres: ['Action', 'Sci-Fi'],
    totalEpisodes: 12,
    rating: 8.6,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #212121 0%, #424242 50%, #616161 100%)',
  },
]

export default function AnimeCarousel() {
  return (
    <section id="populer" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 scroll-mt-16">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">
            Pilihan Editor
          </p>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Sedang Populer
          </h2>
        </div>
        <Link
          href="/cari"
          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-150 flex items-center gap-1"
        >
          Lihat semua
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-fr">
        {featuredAnimeList.map((anime) => (
          <AnimeCard key={anime.id} {...anime} />
        ))}
      </div>
    </section>
  )
}
