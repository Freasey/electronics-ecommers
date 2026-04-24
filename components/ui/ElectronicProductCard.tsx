import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export interface ElectronicProductCardProps {
  id: number
  name: string
  category: string
  summary: string
  badge?: string
  visualTone: string
  featured?: boolean
}

export default function ElectronicProductCard({
  id,
  name,
  category,
  summary,
  badge,
  visualTone,
  featured = false,
}: ElectronicProductCardProps) {
  return (
    <article
      className={cn(
        'group rounded-2xl border border-neutral-200 dark:border-neutral-800',
        'bg-white dark:bg-neutral-950 p-4 sm:p-5',
        'transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-600',
        featured && 'md:col-span-2'
      )}
    >
      <div className="relative mb-4 overflow-hidden rounded-xl border border-neutral-300/70 dark:border-neutral-700/80">
        <div className="h-32 sm:h-36" style={{ background: visualTone }} />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-black/10" />
        <div className="absolute left-3 top-3 h-10 w-10 rounded-lg border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="10" x="5" y="4" rx="2" />
            <path d="M2 20h20" />
            <path d="M8 14v6" />
            <path d="M16 14v6" />
          </svg>
        </div>
        {badge ? (
          <div className="absolute right-3 top-3">
            <Badge
              label={badge}
              className="border-white/30 bg-white/15 text-white backdrop-blur-sm"
            />
          </div>
        ) : null}
      </div>

      <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 mb-2">
        {category}
      </p>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 leading-tight mb-2">
        {name}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
        {summary}
      </p>

      <div className="flex items-end justify-between gap-4">
        <span className="text-xs uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-500">
          Kode Solusi {id.toString().padStart(3, '0')}
        </span>
        <Link
          href={`/produk/${id}`}
          className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          Lihat Detail Teknis
        </Link>
      </div>
    </article>
  )
}
