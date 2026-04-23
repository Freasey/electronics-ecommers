import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-14 overflow-hidden">

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[600px] h-[400px] rounded-full bg-neutral-200 dark:bg-neutral-800 opacity-30 blur-3xl" />
      </div>

      {/* Announcement chip */}
      <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs text-neutral-500 dark:text-neutral-400">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white animate-pulse" />
        <span>Musim baru telah hadir — Summer 2025</span>
        <Link
          href="/terbaru"
          className="text-neutral-900 dark:text-white font-medium hover:underline underline-offset-2"
        >
          Lihat →
        </Link>
      </div>

      {/* Heading */}
      <h1 className="max-w-3xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.05] mb-5">
        Tonton anime{' '}
        <span className="relative inline-block">
          <span className="relative z-10">favoritmu</span>
          <span className="absolute inset-x-0 bottom-1 h-[10px] bg-neutral-200 dark:bg-neutral-700 -z-0 rounded" />
        </span>
        <br />
        tanpa batas
      </h1>

      {/* Subheading */}
      <p className="max-w-md text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
        Ribuan judul anime subtitle Indonesia. Dari klasik hingga terbaru, semuanya tersedia
        gratis tanpa iklan mengganggu.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/tonton"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors duration-200"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="translate-x-0.5"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Mulai Menonton
        </Link>
        <Link
          href="/populer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200"
        >
          Jelajahi Katalog
        </Link>
      </div>

      {/* Stats strip */}
      <div className="mt-14 flex items-center gap-6 sm:gap-10 divide-x divide-neutral-200 dark:divide-neutral-800">
        {[
          { value: '5.000+', label: 'Judul' },
          { value: '120K+', label: 'Penonton' },
          { value: '1080p', label: 'Kualitas' },
          { value: 'Gratis', label: 'Selamanya' },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center gap-0.5 ${index > 0 ? 'pl-6 sm:pl-10' : ''}`}
          >
            <span className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {stat.value}
            </span>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
