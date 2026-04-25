import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductByIdAsync } from '@/lib/productCatalogService'
import ProductImageCarousel from '@/components/ui/ProductImageCarousel'

type ProductDetailPageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const numericId = Number(id)
  const product = Number.isFinite(numericId) ? await getProductByIdAsync(numericId) : undefined

  if (!product) {
    return {
      title: 'Solusi Tidak Ditemukan',
      description: 'Solusi yang Anda cari tidak tersedia dalam katalog saat ini.',
    }
  }

  return {
    title: `${product.name} - Detail Solusi`,
    description: product.description,
    keywords: [product.name, product.category, 'detail solusi', 'aditek security'],
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'website',
      images: product.primary_image_url ? [product.primary_image_url] : undefined,
    },
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const numericId = Number(id)

  if (!Number.isFinite(numericId)) {
    notFound()
  }

  const product = await getProductByIdAsync(numericId)
  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black pt-24 pb-16">
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <span aria-hidden="true">←</span>
          Kembali ke Katalog
        </Link>

        <div className="mt-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ProductImageCarousel images={product.images} productName={product.name} />

              <div className="mt-5">
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 mb-2">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {product.description}
              </p>
              </div>
            </div>

            <aside className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 p-5 sm:p-6 h-fit">
              <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-500 mb-2">
                Status
              </p>
              <p className="text-base font-medium text-neutral-900 dark:text-neutral-100 mb-5">{product.status || '-'}</p>

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-500 mb-2">
                  Kapabilitas Utama
                </p>
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-neutral-700 dark:text-neutral-300 border-l-2 border-neutral-300 dark:border-neutral-700 pl-3"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
