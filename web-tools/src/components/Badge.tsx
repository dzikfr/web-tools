import { ClassValue } from 'clsx'

import { cn } from '../../lib/utils'

export default function Badge({
  className,
  text,
}: {
  className?: ClassValue
  text: string
}) {
  return (
    <div
      className={cn(
        'rounded-base border-2 text-text border-border dark:border-darkBorder bg-slate-300 px-3 py-2 text-sm font-base font-bold shadow-light dark:shadow-dark',
        className,
      )}
    >
      {text}
    </div>
  )
}