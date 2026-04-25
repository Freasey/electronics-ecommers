import type { Metadata } from 'next'
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
      <SearchSection products={products} />
    </main>
  )
}
