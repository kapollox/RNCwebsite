import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-accent text-xs font-semibold tracking-[0.12em] uppercase mb-3',
            align === 'center' && 'mx-auto'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-primary leading-tight tracking-tight">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-text-muted text-base md:text-lg leading-relaxed',
            align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
