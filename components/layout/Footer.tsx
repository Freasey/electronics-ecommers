import Link from 'next/link'

const footerSections = [
  {
    heading: 'Jelajahi',
    links: [
      { label: 'Beranda', href: '/' },
      { label: 'Produk Unggulan', href: '/#produk-unggulan' },
      { label: 'Kategori', href: '/#kategori' },
      { label: 'Pencarian', href: '/cari' },
    ],
  },
  {
    heading: 'Kategori',
    links: [
      { label: 'Televisi', href: '#' },
      { label: 'Laptop', href: '#' },
      { label: 'Audio', href: '#' },
      { label: 'Perangkat Rumah', href: '#' },
    ],
  },
  {
    heading: 'Informasi',
    links: [
      { label: 'Tentang Kami', href: '/tentang' },
      { label: 'Kebijakan Privasi', href: '/privasi' },
      { label: 'Syarat Penggunaan', href: '/syarat' },
      { label: 'Hubungi Kami', href: '/kontak' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-neutral-900 dark:bg-white flex items-center justify-center">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white dark:text-black"
                >
                    <rect x="4" y="5" width="16" height="10" rx="2" />
                    <path d="M2 19h20" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Aditek Elektronik
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[180px]">
                Solusi belanja produk elektronik modern dengan kualitas terjamin dan pengiriman cepat.
            </p>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.heading}>
              <p className="text-xs font-semibold text-neutral-900 dark:text-white mb-3 tracking-wide uppercase">
                {section.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-100 dark:border-neutral-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-neutral-400 dark:text-neutral-600">
            © {new Date().getFullYear()} Aditek Elektronik. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-600 font-mono">
            v1.0.0
          </p>
        </div>
      </div>
    </footer>
  )
}
