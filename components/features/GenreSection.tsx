import Link from 'next/link'

const genreList = [
  { label: 'Action', slug: 'action', count: 842, icon: '⚡' },
  { label: 'Romance', slug: 'romance', count: 613, icon: '♡' },
  { label: 'Fantasy', slug: 'fantasy', count: 971, icon: '✦' },
  { label: 'Comedy', slug: 'comedy', count: 758, icon: '◎' },
  { label: 'Horror', slug: 'horror', count: 289, icon: '◈' },
  { label: 'Sci-Fi', slug: 'sci-fi', count: 447, icon: '◉' },
  { label: 'Slice of Life', slug: 'slice-of-life', count: 534, icon: '◇' },
  { label: 'Sports', slug: 'sports', count: 198, icon: '▷' },
]

export default function GenreSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-neutral-100 dark:border-neutral-800/60">
      {/* Section Header */}
      <div className="mb-6">
        <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">
          Kategori
        </p>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Jelajahi Genre
        </h2>
      </div>

      {/* Genre Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {genreList.map((genre) => (
          <Link
            key={genre.slug}
            href={`/genre/${genre.slug}`}
            className="group flex items-center justify-between p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-all duration-200"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base leading-none text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                {genre.icon}
              </span>
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {genre.label}
              </span>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600">
              {genre.count.toLocaleString('id-ID')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
