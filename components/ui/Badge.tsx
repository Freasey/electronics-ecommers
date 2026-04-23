import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  className?: string
}

export default function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium tracking-wide',
        'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
        'border border-neutral-200 dark:border-neutral-700',
        className
      )}
    >
      {label}
    </span>
  )
}
