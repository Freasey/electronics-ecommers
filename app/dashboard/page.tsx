import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard User',
  description: 'Halaman dashboard khusus user login untuk pengelolaan data master.',
}

const quickStats = [
  {
    label: 'Total Kategori',
    value: '12',
    note: 'Kategori aktif di katalog',
  },
  {
    label: 'Total Product',
    value: '148',
    note: 'Produk yang ditampilkan',
  },
  {
    label: 'Perlu Review',
    value: '9',
    note: 'Item menunggu validasi',
  },
]

export default function DashboardHomePage() {
  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quickStats.map((stat) => (
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
          Pilih modul untuk mengelola data utama. Saat ini yang disiapkan adalah UI, sedangkan logika CRUD akan diintegrasikan berikutnya.
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
              Kelola informasi utama product seperti SKU, kategori, status, dan harga.
            </p>
          </Link>
        </div>
      </div>
    </section>
  )
}
