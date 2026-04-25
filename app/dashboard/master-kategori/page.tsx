import type { Metadata } from 'next'
import MasterKategoriManager from '@/components/features/dashboard/MasterKategoriManager'
import { getDashboardCategoriesAsync } from '@/lib/dashboardCatalogService'

export const metadata: Metadata = {
  title: 'Master Kategori',
  description: 'UI master kategori pada dashboard user yang sudah login.',
}

export default async function MasterKategoriPage() {
  const categories = await getDashboardCategoriesAsync()

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-1">
              Master Kategori
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Kelola kategori langsung dari dashboard. Anda dapat tambah, edit, dan hapus kategori secara realtime.
            </p>
          </div>
        </div>

        <MasterKategoriManager initialCategories={categories} />
      </div>
    </section>
  )
}
