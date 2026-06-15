'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { getCatName } from '@/lib/category-utils';
import type { Category } from '@/types';

interface Props {
  categories: Category[];
}

export function CategorySidebar({ categories }: Props) {
  const pathname = usePathname();
  const { t, locale } = useLanguage();
  const segments = pathname.split('/').filter(Boolean);
  const activeCategorySlug = segments[1];

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────── */}
      <div className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-24">
          <div className="mb-4 pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-3.5 bg-accent rounded-full" />
              <h3 className="text-[11px] font-black tracking-[0.12em] uppercase text-primary">
                {t('sidebar_title')}
              </h3>
            </div>
            <p className="text-[10px] text-text-subtle mt-1 ml-3.5">
              {categories.length} {t('sidebar_count_suffix')}
            </p>
          </div>
          <nav className="space-y-0.5">
            {categories.map((cat) => {
              const isActive = activeCategorySlug === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/parca-listesi/${cat.slug}`}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 text-[13px] rounded-sm transition-colors duration-100 group border-l-2',
                    isActive
                      ? 'text-accent font-bold bg-rose-50 border-accent'
                      : 'text-primary hover:bg-surface-muted hover:text-primary border-transparent hover:border-border'
                  )}
                >
                  <span className="leading-snug">{getCatName(cat, locale)}</span>
                  {isActive && (
                    <ChevronRight size={12} className="shrink-0 text-accent" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Mobile horizontal scroll ───────────────────── */}
      <div className="lg:hidden -mx-5 px-5 md:-mx-10 md:px-10 mb-6">
        <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-text-subtle mb-2">
          {t('sidebar_title')}
        </p>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-2 w-max">
            <Link
              href="/parca-listesi"
              className={cn(
                'px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-sm border transition-colors duration-100',
                !activeCategorySlug
                  ? 'border-accent bg-accent text-white'
                  : 'border-border text-primary hover:border-primary bg-surface'
              )}
            >
              {t('sidebar_all')}
            </Link>
            {categories.map((cat) => {
              const isActive = activeCategorySlug === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/parca-listesi/${cat.slug}`}
                  className={cn(
                    'px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-sm border transition-colors duration-100',
                    isActive
                      ? 'border-accent bg-accent text-white'
                      : 'border-border text-primary hover:border-primary bg-surface'
                  )}
                >
                  {getCatName(cat, locale)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
