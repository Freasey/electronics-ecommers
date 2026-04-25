'use client'

import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { type ElectronicCatalogItem } from '@/lib/electronicProductCatalog'
import ElectronicProductCard, {
  ElectronicProductCardProps,
} from '@/components/ui/ElectronicProductCard'

function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

type SearchSectionProps = {
  products: ElectronicCatalogItem[]
}

function getInitialCategories(urlCategories: string[], validCategories: Set<string>) {
  return Array.from(new Set(urlCategories.filter((category) => validCategories.has(category))))
}

function buildSearchTokens(product: ElectronicCatalogItem) {
  return Array.from(
    new Set([
      ...product.name.toLowerCase().split(' '),
      ...product.category.toLowerCase().split(' '),
      ...product.description.toLowerCase().split(' '),
      ...product.features.map((item) => item.toLowerCase()).join(' ').split(' '),
    ])
  ).filter(Boolean)
}

function mapProductsToCardProps(products: ElectronicCatalogItem[]): ElectronicProductCardProps[] {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    description: product.description,
    featured: product.is_featured,
  }))
}

function filterProducts(
  products: ElectronicCatalogItem[],
  query: string,
  activeCategories: string[]
): ElectronicProductCardProps[] {
  const normalizedQuery = query.toLowerCase().trim()

  return mapProductsToCardProps(
    products.filter((product) => {
      const searchTokens = buildSearchTokens(product)

    const matchQuery =
      normalizedQuery === '' ||
      searchTokens.some((token) => token.includes(normalizedQuery)) ||
      product.name.toLowerCase().includes(normalizedQuery)

    const matchCategory =
      activeCategories.length === 0 || activeCategories.includes(product.category)

      return matchQuery && matchCategory
    })
  )
}

export default function SearchSection({ products }: SearchSectionProps) {
  const recentProducts = useMemo(
    () => products.filter((item) => item.is_recent).map((item) => item.name),
    [products]
  )
  const electronicCategories = useMemo(
    () => Array.from(new Set(products.map((item) => item.category).filter(Boolean))),
    [products]
  )
  const validCategories = useMemo(() => new Set(electronicCategories), [electronicCategories])

  const searchParams = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [activeCategories, setActiveCategories] = useState<string[]>(() =>
    getInitialCategories(searchParams.getAll('domain'), validCategories)
  )
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo<ElectronicProductCardProps[]>(
    () => filterProducts(products, query, activeCategories),
    [products, query, activeCategories]
  )
  const hasSearched = query.trim() !== '' || activeCategories.length > 0

  function handleRecentProductClick(productName: string) {
    setQuery(productName)
    inputRef.current?.focus()
  }

  function toggleCategory(category: string) {
    setActiveCategories((previousValue) =>
      previousValue.includes(category)
        ? previousValue.filter((item) => item !== category)
        : [...previousValue, category]
    )
  }

  function clearAll() {
    setQuery('')
    setActiveCategories([])
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
      <div className="mb-8">
        <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">
          Pencarian
        </p>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Cari Solusi Security dan Infrastruktur
        </h1>
      </div>

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
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ketik nama solusi, perangkat, atau use case..."
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="mb-6">
        <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2.5">
          Kata Kunci Cepat
        </p>
        <div className="flex flex-wrap gap-2">
          {recentProducts.map((productName) => (
            <button
              key={productName}
              onClick={() => handleRecentProductClick(productName)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150',
                query.toLowerCase() === productName.toLowerCase()
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {productName}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 pb-8 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            Domain Solusi
          </p>
          {activeCategories.length > 0 && (
            <button
              onClick={() => setActiveCategories([])}
              className="text-[11px] text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Hapus filter
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {electronicCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-150',
                activeCategories.includes(category)
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-black border-neutral-900 dark:border-white'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {hasSearched || activeCategories.length > 0 ? (
              <>
                <span className="font-medium text-neutral-900 dark:text-white">
                  {results.length}
                </span>{' '}
                solusi ditemukan
                {(query || activeCategories.length > 0) && (
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
                <span className="font-medium text-neutral-900 dark:text-white">
                  {results.length}
                </span>{' '}
                solusi tersedia
              </>
            )}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((product) => (
              <ElectronicProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
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
              Solusi tidak ditemukan
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-5">
              Coba kata kunci lain atau ubah filter domain
            </p>
            <button
              onClick={clearAll}
              className="text-xs px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
