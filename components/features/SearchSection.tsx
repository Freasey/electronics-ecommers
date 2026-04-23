'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import AnimeCard, { AnimeCardProps } from '@/components/ui/AnimeCard'
import { cn } from '@/lib/utils'

// ─── Konstanta ───────────────────────────────────────────────────────────────

const popularKeys = [
  'Naruto',
  'Kimetsu no Yaiba',
  'One Piece',
  'Attack on Titan',
  'Bleach',
  'Dragon Ball',
  'Hunter x Hunter',
  'Spy x Family',
  'Solo Leveling',
  'Jujutsu Kaisen',
]

const genreList = [
  'Action',
  'Adventure',
  'Comedy',
  'Fantasy',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller',
]

// ─── Mock Data ────────────────────────────────────────────────────────────────

const animeDatabase: (AnimeCardProps & { searchTokens: string[] })[] = [
  {
    id: 1,
    title: 'Naruto Shippuden',
    genres: ['Action', 'Adventure'],
    totalEpisodes: 500,
    rating: 8.7,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #f97316 0%, #ea580c 100%)',
    searchTokens: ['naruto', 'shippuden', 'action', 'adventure'],
  },
  {
    id: 2,
    title: 'Kimetsu no Yaiba',
    genres: ['Action', 'Supernatural'],
    totalEpisodes: 44,
    rating: 9.0,
    status: 'Tayang',
    posterColor: 'linear-gradient(145deg, #1e1b4b 0%, #7c3aed 100%)',
    searchTokens: ['kimetsu', 'yaiba', 'demon slayer', 'action', 'supernatural'],
  },
  {
    id: 3,
    title: 'One Piece',
    genres: ['Action', 'Adventure'],
    totalEpisodes: 1100,
    rating: 9.1,
    status: 'Tayang',
    posterColor: 'linear-gradient(145deg, #0c4a6e 0%, #0ea5e9 100%)',
    searchTokens: ['one piece', 'action', 'adventure'],
  },
  {
    id: 4,
    title: 'Attack on Titan',
    genres: ['Action', 'Thriller'],
    totalEpisodes: 87,
    rating: 9.2,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #292524 0%, #57534e 100%)',
    searchTokens: ['attack on titan', 'shingeki', 'action', 'thriller'],
  },
  {
    id: 5,
    title: 'Bleach: Thousand-Year Blood War',
    genres: ['Action', 'Supernatural'],
    totalEpisodes: 52,
    rating: 9.0,
    status: 'Tayang',
    posterColor: 'linear-gradient(145deg, #020617 0%, #1e3a5f 100%)',
    searchTokens: ['bleach', 'thousand year blood war', 'action', 'supernatural'],
  },
  {
    id: 6,
    title: 'Dragon Ball Super',
    genres: ['Action', 'Comedy'],
    totalEpisodes: 131,
    rating: 8.3,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #fbbf24 0%, #f59e0b 100%)',
    searchTokens: ['dragon ball', 'super', 'action', 'comedy'],
  },
  {
    id: 7,
    title: 'Hunter x Hunter (2011)',
    genres: ['Action', 'Adventure'],
    totalEpisodes: 148,
    rating: 9.1,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #14532d 0%, #22c55e 100%)',
    searchTokens: ['hunter x hunter', 'hxh', 'action', 'adventure'],
  },
  {
    id: 8,
    title: 'Spy x Family',
    genres: ['Comedy', 'Action'],
    totalEpisodes: 37,
    rating: 8.7,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #3b1f5e 0%, #a855f7 100%)',
    searchTokens: ['spy x family', 'comedy', 'action'],
  },
  {
    id: 9,
    title: 'Solo Leveling',
    genres: ['Action', 'Fantasy'],
    totalEpisodes: 25,
    rating: 9.1,
    status: 'Tayang',
    posterColor: 'linear-gradient(145deg, #1a1a2e 0%, #0f3460 100%)',
    searchTokens: ['solo leveling', 'action', 'fantasy'],
  },
  {
    id: 10,
    title: 'Jujutsu Kaisen Season 3',
    genres: ['Action', 'Supernatural'],
    totalEpisodes: 21,
    rating: 9.0,
    status: 'Tayang',
    posterColor: 'linear-gradient(145deg, #0d0d0d 0%, #320759 100%)',
    searchTokens: ['jujutsu kaisen', 'jjk', 'action', 'supernatural'],
  },
  {
    id: 11,
    title: 'Frieren: Beyond Journey\'s End',
    genres: ['Fantasy', 'Adventure'],
    totalEpisodes: 28,
    rating: 9.4,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #2d3561 0%, #c05c7e 100%)',
    searchTokens: ['frieren', 'fantasy', 'adventure'],
  },
  {
    id: 12,
    title: 'Dungeon Meshi',
    genres: ['Fantasy', 'Comedy'],
    totalEpisodes: 24,
    rating: 8.9,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #1b4332 0%, #40916c 100%)',
    searchTokens: ['dungeon meshi', 'delicious in dungeon', 'fantasy', 'comedy'],
  },
  {
    id: 13,
    title: 'Sword Art Online',
    genres: ['Action', 'Romance'],
    totalEpisodes: 96,
    rating: 7.8,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #1e3a5f 0%, #2563eb 100%)',
    searchTokens: ['sword art online', 'sao', 'action', 'romance'],
  },
  {
    id: 14,
    title: 'Your Lie in April',
    genres: ['Romance', 'Slice of Life'],
    totalEpisodes: 22,
    rating: 9.0,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #fff1f2 0%, #fda4af 100%)',
    searchTokens: ['your lie in april', 'romance', 'slice of life'],
  },
  {
    id: 15,
    title: 'Haikyuu!!',
    genres: ['Sports', 'Comedy'],
    totalEpisodes: 85,
    rating: 9.0,
    status: 'Selesai',
    posterColor: 'linear-gradient(145deg, #f97316 0%, #dc2626 100%)',
    searchTokens: ['haikyuu', 'sports', 'comedy'],
  },
]

// ─── Fungsi Filter ────────────────────────────────────────────────────────────

function filterAnime(query: string, activeGenres: string[]) {
  const q = query.toLowerCase().trim()

  return animeDatabase.filter((anime) => {
    const matchQuery =
      q === '' ||
      anime.searchTokens.some((token) => token.includes(q)) ||
      anime.title.toLowerCase().includes(q)

    const matchGenre =
      activeGenres.length === 0 ||
      activeGenres.every((g) => anime.genres.includes(g))

    return matchQuery && matchGenre
  })
}

// ─── Komponen Utama ───────────────────────────────────────────────────────────

export default function SearchSection() {
  const [query, setQuery] = useState('')
  const [activeGenres, setActiveGenres] = useState<string[]>([])
  const [results, setResults] = useState<AnimeCardProps[]>(animeDatabase)
  const [hasSearched, setHasSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const runSearch = useCallback((q: string, genres: string[]) => {
    setResults(filterAnime(q, genres))
    setHasSearched(true)
  }, [])

  // Jalankan search otomatis setiap query atau genre berubah
  useEffect(() => {
    if (query !== '' || activeGenres.length > 0) {
      runSearch(query, activeGenres)
    } else {
      setResults(animeDatabase)
      setHasSearched(false)
    }
  }, [query, activeGenres, runSearch])

  function handlePopularKeyClick(key: string) {
    setQuery(key)
    inputRef.current?.focus()
    // runSearch dipanggil otomatis via useEffect
  }

  function toggleGenre(genre: string) {
    setActiveGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    )
  }

  function clearAll() {
    setQuery('')
    setActiveGenres([])
    setHasSearched(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">

      {/* Page Header */}
      <div className="mb-8">
        <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">
          Pencarian
        </p>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Cari Anime
        </h1>
      </div>

      {/* Search Input */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-400 dark:text-neutral-500"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ketik judul anime..."
          autoFocus
          className={cn(
            'w-full h-12 pl-11 pr-12 rounded-xl text-sm',
            'border border-neutral-200 dark:border-neutral-700',
            'bg-white dark:bg-neutral-900',
            'text-neutral-900 dark:text-white',
            'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
            'focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:ring-offset-0',
            'transition-all duration-150'
          )}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-4 flex items-center text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            aria-label="Hapus pencarian"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Popular Keys */}
      <div className="mb-6">
        <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2.5">
          Populer
        </p>
        <div className="flex flex-wrap gap-2">
          {popularKeys.map((key) => (
            <button
              key={key}
              onClick={() => handlePopularKeyClick(key)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150',
                query.toLowerCase() === key.toLowerCase()
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Filter */}
      <div className="mb-8 pb-8 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            Filter Genre
          </p>
          {activeGenres.length > 0 && (
            <button
              onClick={() => setActiveGenres([])}
              className="text-[11px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Hapus filter
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {genreList.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-150',
                activeGenres.includes(genre)
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div>
        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {hasSearched || activeGenres.length > 0 ? (
              <>
                <span className="font-medium text-neutral-900 dark:text-white">{results.length}</span>
                {' '}hasil ditemukan
                {(query || activeGenres.length > 0) && (
                  <button
                    onClick={clearAll}
                    className="ml-3 text-xs underline underline-offset-2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                  >
                    Tampilkan semua
                  </button>
                )}
              </>
            ) : (
              <>
                <span className="font-medium text-neutral-900 dark:text-white">{results.length}</span>
                {' '}anime tersedia
              </>
            )}
          </p>
        </div>

        {/* Grid Hasil */}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {results.map((anime) => (
              <AnimeCard key={anime.id} {...anime} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mb-4">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-400 dark:text-neutral-500"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Anime tidak ditemukan
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-5">
              Coba kata kunci lain atau ubah filter genre
            </p>
            <button
              onClick={clearAll}
              className="text-xs px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Reset pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
