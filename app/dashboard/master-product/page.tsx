import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Master Product',
  description: 'UI master product pada dashboard user yang sudah login.',
}

const products = [
  {
    sku: 'PRD-0001',
    name: 'AI CCTV 4MP',
    category: 'Surveillance',
    price: 'Rp 3.250.000',
    status: 'Aktif',
  },
  {
    sku: 'PRD-0002',
    name: 'Smart Door Controller',
    category: 'Access Control',
    price: 'Rp 2.780.000',
    status: 'Aktif',
  },
  {
    sku: 'PRD-0003',
    name: 'Managed PoE Switch 24 Port',
    category: 'Network',
    price: 'Rp 6.150.000',
    status: 'Draft',
  },
]

export default function MasterProductPage() {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-1">
              Master Product
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Halaman UI untuk pengelolaan product. Semua komponen form dan tabel sudah disiapkan untuk integrasi logic berikutnya.
            </p>
          </div>
          <button
            type="button"
            className="h-10 px-4 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium"
          >
            + Tambah Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <input
            type="text"
            placeholder="Cari nama product"
            className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100"
          />
          <input
            type="text"
            placeholder="Cari SKU"
            className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100"
          />
          <select className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100">
            <option>Semua Kategori</option>
            <option>Surveillance</option>
            <option>Access Control</option>
            <option>Network</option>
          </select>
          <select className="h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 text-sm text-neutral-800 dark:text-neutral-100">
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Draft</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="min-w-full text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">SKU</th>
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Nama Product</th>
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Kategori</th>
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Harga</th>
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Status</th>
                <th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.sku} className="border-t border-neutral-200 dark:border-neutral-800">
                  <td className="px-4 py-3 text-neutral-700 dark:text-neutral-200">{product.sku}</td>
                  <td className="px-4 py-3 text-neutral-900 dark:text-neutral-100">{product.name}</td>
                  <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{product.category}</td>
                  <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{product.price}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full px-2.5 py-1 text-xs border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300">
                      {product.status}
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
