import Link from 'next/link'
import { getCategorySummariesAsync } from '@/lib/productCatalogService'

export default async function CategoryHighlightSection() {
  const categories = await getCategorySummariesAsync()

  return (
    <section
      id="kategori"
      className="scroll-mt-20 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="mb-6 sm:mb-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 mb-2">
            Domain Solusi
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Temukan Prioritas Keamanan Organisasi Anda
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-4 sm:p-5 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
            >
              <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                {category.name}
              </p>
              <p className="text-xs uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-500">
                {category.totalLabel}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
