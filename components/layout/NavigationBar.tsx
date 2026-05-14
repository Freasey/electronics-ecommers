import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/components/ui/ThemeToggle'
import logo from '@/app/original_logo.png'

const navigationLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Solusi', href: '/#produk-unggulan' },
  { label: 'Domain', href: '/#kategori' },
]

export default function NavigationBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Navigation Links */}
        <div className="hidden sm:flex items-center gap-0.5 h-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 mr-4"
          >
            <div className="w-20 h-10 rounded-sm px-1 bg-white flex items-center justify-center overflow-hidden">
              <Image
                src={logo}
                alt="Logo ADI"
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </Link>

        
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <Link
            href="/cari"
            aria-label="Cari solusi"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
