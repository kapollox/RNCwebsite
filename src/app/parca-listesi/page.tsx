import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { CategoryTile } from '@/components/catalog/CategoryTile';
import { categories } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Parça Listesi',
  description:
    'Honda motosiklet yedek parça grupları. Motor, fren, elektrik, egzoz, zincir ve daha fazlası.',
};

export default function ParcaListesiPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Parça Listesi' }]} />

      <div className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl font-black text-primary tracking-tight">
          Parça Grupları
        </h1>
        <p className="text-text-muted text-sm mt-1.5">
          {categories.length} ürün grubu · Honda motosiklet yedek parçaları
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryTile
            key={cat.id}
            name={cat.name}
            href={`/parca-listesi/${cat.slug}`}
            iconName={cat.iconName}
            imageSlug={cat.slug}
            badge={`${cat.subcategories.length} alt kategori`}
            description={cat.description}
          />
        ))}
      </div>
    </>
  );
}
