'use client';

import Link from 'next/link';
import {
  Cog, CircleDot, Zap, Wind, Link as LinkIcon,
  Circle, ArrowRight, ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getCatName, getCatDescription } from '@/lib/category-utils';
import type { Category } from '@/types';

type LucideIcon = React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
const iconMap: Record<string, LucideIcon> = {
  Cog, CircleDot, Zap, Wind,
  Link: LinkIcon, Circle,
};

interface Props {
  featuredCategories: Category[];
}

export function CategoryGridClient({ featuredCategories }: Props) {
  const { t, locale } = useLanguage();

  return (
    <section className="bg-white border-b border-border">
      <div className="container-main py-16 md:py-20">

        {/* Başlık */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-accent shrink-0" />
              <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
                {t('cat_grid_eyebrow')}
              </span>
            </div>
            <h2 className="font-display font-black text-primary text-2xl md:text-3xl leading-tight tracking-tight">
              {t('cat_grid_title')}
            </h2>
            <p className="text-text-muted text-sm mt-2 max-w-md">{t('cat_grid_desc')}</p>
          </div>
          <Link
            href="/parca-listesi"
            className="group flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-dark transition-colors whitespace-nowrap shrink-0"
          >
            {t('cat_grid_all')}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Kategori grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {featuredCategories.map((category) => {
            const Icon = iconMap[category.iconName] ?? Cog;
            return (
              <Link
                key={category.id}
                href={`/parca-listesi/${category.slug}`}
                className="group flex items-center gap-4 bg-white border border-[#e8ecf0] rounded-[4px] p-5 hover:border-accent hover:shadow-[0_2px_16px_rgba(230,57,70,0.08)] transition-all duration-200"
              >
                {/* İkon */}
                <div className="shrink-0 w-11 h-11 flex items-center justify-center rounded-[3px] bg-[#f4f6f8] border border-[#e8ecf0] group-hover:bg-accent group-hover:border-accent transition-all duration-200">
                  <Icon
                    size={19}
                    className="text-slate-500 group-hover:text-white transition-colors duration-200"
                  />
                </div>

                {/* Metin */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="font-display font-bold text-primary text-sm group-hover:text-accent transition-colors duration-150 truncate">
                      {getCatName(category, locale)}
                    </h3>
                    <span className="font-mono text-[10px] text-slate-400 shrink-0">
                      {category.partCount}+
                    </span>
                  </div>
                  <p className="text-slate-400 text-[12px] leading-relaxed line-clamp-1">
                    {getCatDescription(category, locale)}
                  </p>
                </div>

                <ChevronRight size={14} className="text-slate-300 group-hover:text-accent shrink-0 transition-colors duration-150" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
