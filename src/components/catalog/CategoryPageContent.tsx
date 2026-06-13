'use client';

import { SubcategoryTile } from '@/components/catalog/SubcategoryTile';
import { useLanguage } from '@/context/LanguageContext';
import type { Category } from '@/types';

interface Props {
  category: Category;
}

export function CategoryPageContent({ category }: Props) {
  const { t } = useLanguage();

  return (
    <>
      {/* Category header */}
      <div className="mb-7 rounded-sm border border-border bg-surface overflow-hidden">
        <div className="h-1 bg-accent" />
        <div className="px-5 py-4">
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
            <h1 className="font-display text-2xl md:text-3xl font-black text-primary tracking-tight">
              {category.name}
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase text-accent border border-accent/30 bg-rose-50 rounded-sm">
              {category.subcategories.length} {t('cat_page_badge')}
            </span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">{category.description}</p>
        </div>
      </div>

      {category.subcategories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {category.subcategories.map((sub) => (
            <SubcategoryTile
              key={sub.id}
              name={sub.name}
              href={`/parca-listesi/${category.slug}/${sub.slug}`}
              iconName={category.iconName}
              image={sub.image}
              description={sub.description}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-20 border border-border rounded-sm bg-surface">
          <p className="text-text-muted text-sm">
            {t('cat_page_empty')}
          </p>
        </div>
      )}
    </>
  );
}
