import { cn } from '@/lib/utils';

type BadgeVariant = 'category' | 'inquiry';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  category: 'bg-accent text-white',
  inquiry: 'bg-slate-100 text-slate-600 border border-slate-200',
};

export function Badge({ variant = 'category', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-semibold tracking-wide uppercase',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
