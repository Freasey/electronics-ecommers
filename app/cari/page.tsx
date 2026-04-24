import type { Metadata } from 'next'
import SearchSection from '@/components/features/SearchSection'

export const metadata: Metadata = {
  title: 'Cari Solusi Security',
  description: 'Cari solusi security system dan infrastruktur berdasarkan nama, kategori, dan kebutuhan proyek.',
}

export default function HalamanPencarian() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <SearchSection />
    </main>
  )
}
