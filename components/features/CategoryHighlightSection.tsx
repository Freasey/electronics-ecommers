import Link from 'next/link'

const categories = [
  { name: 'Televisi', description: 'Layar UHD dan teknologi visual terbaru.', href: '#', total: '124 produk' },
  { name: 'Laptop', description: 'Perangkat kerja dan belajar performa tinggi.', href: '#', total: '86 produk' },
  { name: 'Audio', description: 'Speaker dan headphone dengan detail suara bersih.', href: '#', total: '142 produk' },
  { name: 'Perangkat Rumah', description: 'Elektronik rumah hemat energi dan tahan lama.', href: '#', total: '97 produk' },
]

export default function CategoryHighlightSection() {
  return (
    <section id="kategori" className="border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="mb-6 sm:mb-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 mb-2">
            Kategori Produk
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Temukan Kebutuhan Elektronik Anda
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
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                {category.description}
              </p>
              <p className="text-xs uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-500">
                {category.total}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
