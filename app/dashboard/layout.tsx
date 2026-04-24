import Link from 'next/link'

const dashboardMenus = [
  {
    label: 'Ringkasan Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Master Kategori',
    href: '/dashboard/master-kategori',
  },
  {
    label: 'Master Product',
    href: '/dashboard/master-product',
  },
]

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-black">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-6 mb-5 sm:mb-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 mb-2">
            Portal User
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
            Dashboard Pengelolaan Master Data
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-3xl">
            Area ini khusus untuk user yang sudah login. Gunakan menu di bawah untuk mengelola master kategori dan master product.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <aside className="lg:col-span-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-3 sm:p-4 h-fit">
            <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400 px-2 py-1 mb-2">
              Menu Dashboard
            </p>
            <nav className="space-y-1.5">
              {dashboardMenus.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className="block rounded-lg border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 px-3 py-2.5 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                >
                  {menu.label}
                </Link>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-9">{children}</div>
        </div>
      </section>
    </main>
  )
}
