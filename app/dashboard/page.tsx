import type { Metadata } from 'next'
import Link from 'next/link'
import { getDashboardCategoriesAsync, getDashboardProductsAsync } from '@/lib/dashboardCatalogService'

export const metadata: Metadata = {
  title: 'Dashboard Admin',
  description: 'Halaman dashboard admin untuk pengelolaan data master.',
}

export default async function DashboardHomePage() {
  const [categories, products] = await Promise.all([
    getDashboardCategoriesAsync(),
    getDashboardProductsAsync(),
  ])

  const totalKategori = categories.length
  const totalProduk = products.length
  const tanpaGambar = products.filter((p) => p.images.length === 0).length
  const tanpaDokumen = products.filter((p) => p.documents.length === 0).length

  const stats = [
    { label: 'Total Kategori', value: totalKategori, note: 'Kategori aktif di katalog' },
    { label: 'Total Produk', value: totalProduk, note: 'Produk yang terdaftar' },
    { label: 'Tanpa Gambar', value: tanpaGambar, note: 'Produk belum ada foto' },
    { label: 'Tanpa Dokumentasi', value: tanpaDokumen, note: 'Produk belum ada dokumen' },
  ]

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4"
          >
            <p className="text-xs uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-500 mb-2">
              {stat.label}
            </p>
            <p className="text-2xl font-semibold text-neutral-900 dark:text-white mb-1">{stat.value}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{stat.note}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">
          Modul Master Data
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Pilih modul untuk mengelola data utama produk dan kategori.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/dashboard/master-kategori"
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-4 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors"
          >
            <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Master Kategori</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Kelola daftar kategori produk beserta status dan deskripsi singkat.
            </p>
          </Link>

          <Link
            href="/dashboard/master-product"
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-4 hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors"
          >
            <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Master Product</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Kelola informasi utama produk seperti SKU, kategori, status, dan harga.
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}
