import ElectronicProductCard from '@/components/ui/ElectronicProductCard'
import { electronicProductCatalog } from '@/lib/electronicProductCatalog'

const featuredProducts = electronicProductCatalog.filter((product) => product.isFeaturedOnHome)

export default function FeaturedProductSection() {
  return (
    <section id="produk-unggulan" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 mb-2">
          Pilihan Utama
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Produk Unggulan Kami
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredProducts.map((product) => (
          <ElectronicProductCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  )
}
