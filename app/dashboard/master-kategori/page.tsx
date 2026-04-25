import type { Metadata } from 'next'
import { getCategorySummariesAsync } from '@/lib/productCatalogService'

export const metadata: Metadata = {
  title: 'Master Kategori',
  description: 'UI master kategori pada dashboard user yang sudah login.',
}

export default async function MasterKategoriPage() {
  const categorySummaries = await getCategorySummariesAsync()
  const categories = categorySummaries.map((category, index) => ({
    code: `CAT-${(index + 1).toString().padStart(3, '0')}`,
    name: category.name,
    slug: category.name.toLowerCase().replaceAll(' ', '-'),
    status: category.totalProducts > 0 ? 'Aktif' : 'Draft',
  }))

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-1">
              Master Kategori
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Halaman UI untuk pengelolaan kategori. Integrasi aksi simpan/edit/hapus akan ditambahkan setelah logika backend siap.
            </p>
          </div>
          <button
            type="button"
            className="h-10 px-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium"
          >
            + Tambah Kategori
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <input
            type="text"
            placeholder="Cari nama kategori"
            className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100"
          />
          <select className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100">
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Draft</option>
          </select>
          <button
            type="button"
            className="h-10 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-200"
          >
            Reset Filter
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Kode</th>
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Nama</th>
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Slug</th>
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Status</th>
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.code} className="border-t border-neutral-200 dark:border-neutral-800">
                  <td className="px-4 py-3 text-neutral-700 dark:text-neutral-200">{category.code}</td>
                  <td className="px-4 py-3 text-neutral-900 dark:text-neutral-100">{category.name}</td>
                  <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{category.slug}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2.5 py-1 text-xs border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
                      {category.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="h-8 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-200"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="h-8 px-3 rounded-md border border-red-300 dark:border-red-800 text-xs text-red-700 dark:text-red-300"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
