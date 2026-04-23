import Badge from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export interface AnimeCardProps {
  id: number
  title: string
  genres: string[]
  totalEpisodes: number
  rating: number
  status: 'Tayang' | 'Selesai'
  posterColor: string
  featured?: boolean
}

export default function AnimeCard({
  title,
  genres,
  totalEpisodes,
  rating,
  status,
  posterColor,
  featured = false,
}: AnimeCardProps) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border cursor-pointer',
        'border-neutral-200 dark:border-neutral-800',
        'bg-white dark:bg-neutral-900',
        'hover:border-neutral-400 dark:hover:border-neutral-600',
        'transition-all duration-300 hover:-translate-y-0.5',
        featured && 'md:col-span-2'
      )}
    >
      {/* Poster Area */}
      <div
        className={cn(
          'relative overflow-hidden',
          featured ? 'aspect-[16/9]' : 'aspect-[2/3]'
        )}
        style={{ background: posterColor }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-2.5 right-2.5">
          <span
            className={cn(
              'text-[10px] font-medium px-1.5 py-0.5 rounded',
              status === 'Tayang'
                ? 'bg-white/20 text-white backdrop-blur-sm border border-white/20'
                : 'bg-black/30 text-white/80 backdrop-blur-sm border border-white/10'
            )}
          >
            {status === 'Tayang' ? '● Tayang' : status}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-yellow-400"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-[11px] font-medium text-white">{rating.toFixed(1)}</span>
        </div>

        {/* Hover play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white translate-x-0.5"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex flex-col gap-1.5 p-3">
        <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 2).map((genre) => (
              <Badge key={genre} label={genre} />
            ))}
          </div>
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono shrink-0 ml-2">
            {totalEpisodes} eps
          </span>
        </div>
      </div>
    </article>
  )
}
