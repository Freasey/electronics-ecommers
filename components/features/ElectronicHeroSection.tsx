import Link from 'next/link'

export default function ElectronicHeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(160,160,160,0.22),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_50%)]" />
        <div className="absolute inset-0 opacity-40 [background:linear-gradient(to_right,#d4d4d4_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d4_1px,transparent_1px)] bg-size-[28px_28px] dark:opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="inline-flex rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/85 dark:bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
          Enterprise Security System
        </p>

        <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Solusi Keamanan dan Infrastruktur
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Rangkaian sistem CCTV, kontrol akses, monitoring jaringan, hingga ketahanan daya untuk
          mendukung operasional bisnis, fasilitas industri, dan lingkungan kerja berskala besar.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="#produk-unggulan"
            className="inline-flex items-center rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
          >
            Lihat Solusi
          </Link>
          <Link
            href="#kategori"
            className="inline-flex items-center rounded-lg border border-neutral-300 dark:border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Jelajahi Domain
          </Link>
        </div>
      </div>
    </section>
  )
}
