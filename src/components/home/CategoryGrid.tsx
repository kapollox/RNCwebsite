'use client';

import Link from 'next/link';
import {
  Cog, CircleDot, Zap, Wind, Link as LinkIcon,
  Circle, ArrowRight,
} from 'lucide-react';
import { featuredCategories } from '@/data/categories';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, React.ElementType> = {
  Cog,
  CircleDot,
  Zap,
  Wind,
  Link: LinkIcon,
  Circle,
};

export function CategoryGrid() {
  const { t } = useLanguage();

  return (
    <section className="bg-surface-muted border-b border-border">
      <div className="container-main py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <SectionHeader
            eyebrow={t('cat_grid_eyebrow')}
            title={t('cat_grid_title')}
            description={t('cat_grid_desc')}
            className="mb-0"
          />
          <Link
            href="/parca-listesi"
            className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark transition-colors whitespace-nowrap"
          >
            {t('cat_grid_all')}
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCategories.map((category) => {
            const Icon = iconMap[category.iconName] ?? Cog;
            return (
              <Link
                key={category.id}
                href={`/parca-listesi/${category.slug}`}
                className="group flex items-start gap-4 bg-surface border border-border rounded-sm p-6 hover:border-primary transition-colors duration-150"
              >
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-sm bg-surface-muted border border-border group-hover:bg-accent group-hover:border-accent transition-colors duration-150">
                  <Icon
                    size={20}
                    className="text-text-muted group-hover:text-white transition-colors duration-150"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-primary text-sm group-hover:text-accent transition-colors duration-150">
                      {category.name}
                    </h3>
                    <span className="part-number text-text-subtle shrink-0">
                      {category.partCount}+
                    </span>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
