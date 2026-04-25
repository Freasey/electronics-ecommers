import type { Metadata } from 'next'
import {
  getDashboardCategoriesAsync,
  getDashboardProductsAsync,
} from '@/lib/dashboardCatalogService'
import MasterProductManager from '@/components/features/dashboard/MasterProductManager'

export const metadata: Metadata = {
  title: 'Master Product',
  description: 'UI master product pada dashboard user yang sudah login.',
}

export default async function MasterProductPage() {
  const [products, categories] = await Promise.all([
    getDashboardProductsAsync(),
    getDashboardCategoriesAsync(),
  ])

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-1">
              Master Product
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Kelola produk langsung dari dashboard termasuk upload multi-gambar per produk.
            </p>
          </div>
        </div>

        <MasterProductManager
          initialProducts={products}
          categories={categories.map((category) => ({ id: category.id, name: category.name }))}
        />
      </div>
    </section>
  )
}
