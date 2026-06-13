'use client';

import { CategoryTile } from '@/components/catalog/CategoryTile';
import { useLanguage } from '@/context/LanguageContext';
import type { Category } from '@/types';

interface Props {
  categories: Category[];
}

export function CatalogPageContent({ categories }: Props) {
  const { t } = useLanguage();

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-black text-primary tracking-tight">
          {t('catalog_page_title')}
        </h1>
        <p className="text-text-muted text-sm mt-1.5">
          {categories.length} {t('catalog_page_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryTile
            key={cat.id}
            name={cat.name}
            href={`/parca-listesi/${cat.slug}`}
            iconName={cat.iconName}
            image={cat.image}
            badge={`${cat.subcategories.length} ${t('catalog_badge_sub')}`}
            description={cat.description}
          />
        ))}
      </div>
    </>
  );
}
