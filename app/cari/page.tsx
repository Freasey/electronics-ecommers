import type { Metadata } from 'next'
import { Suspense } from 'react'
import SearchSection from '@/components/features/SearchSection'
import { getProductsAsync } from '@/lib/productCatalogService'

export const metadata: Metadata = {
  title: 'Cari Solusi Security',
  description: 'Cari solusi security system dan infrastruktur berdasarkan nama, kategori, dan kebutuhan proyek.',
}

export default async function HalamanPencarian() {
  const products = await getProductsAsync()

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Suspense
        fallback={
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-sm text-neutral-500 dark:text-neutral-400">
            Memuat pencarian...
          </div>
        }
      >
        <SearchSection products={products} />
      </Suspense>
    </main>
  )
}
