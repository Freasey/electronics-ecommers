import type { Metadata } from 'next'
import SearchSection from '@/components/features/SearchSection'

export const metadata: Metadata = {
  title: 'Cari Produk Elektronik',
  description: 'Cari produk elektronik berdasarkan nama, kategori, dan daftar recent product.',
}

export default function HalamanPencarian() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <SearchSection />
    </main>
  )
}
