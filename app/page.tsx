import type { Metadata } from 'next'
import ElectronicHeroSection from '@/components/features/ElectronicHeroSection'
import FeaturedProductSection from '@/components/features/FeaturedProductSection'
import CategoryHighlightSection from '@/components/features/CategoryHighlightSection'

export const metadata: Metadata = {
  title: 'Adite - Beranda',
  description:
    'Aplikasi penjualan produk elektronik dengan tampilan modern monochrome dan navigasi sederhana.',
  keywords: ['elektronik', 'ecommerce', 'produk elektronik', 'aditek', 'belanja online'],
  openGraph: {
    title: 'Aditek',
    description: 'Belanja produk elektronik modern dengan pengalaman visual monochrome.',
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
