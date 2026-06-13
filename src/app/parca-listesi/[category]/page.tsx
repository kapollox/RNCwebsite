import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { CategoryTile } from '@/components/catalog/CategoryTile';
import { getCategoryBySlug } from '@/data/categories';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Kategori Bulunamadı' };
  return {
    title: category.name,
    description: `Honda motosiklet ${category.name.toLowerCase()} parçaları. ${category.description}`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Parça Listesi', href: '/parca-listesi' },
          { label: category.name },
        ]}
      />

      {/* Category header */}
      <div className="mb-7 rounded-sm border border-border bg-surface overflow-hidden">
        <div className="h-1 bg-accent" />
        <div className="px-5 py-4">
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
            <h1 className="font-display text-2xl md:text-3xl font-black text-primary tracking-tight">
              {category.name}
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase text-accent border border-accent/30 bg-rose-50 rounded-sm">
              {category.subcategories.length} Alt Kategori
            </span>
          </div>
          <p className="text-text-muted text-sm leading-relaxed">{category.description}</p>
        </div>
      </div>

      {category.subcategories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {category.subcategories.map((sub) => (
            <CategoryTile
              key={sub.id}
              name={sub.name}
              href={`/parca-listesi/${category.slug}/${sub.slug}`}
              iconName={category.iconName}
              imageSlug={`${category.slug}--${sub.slug}`}
              description={sub.description}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-20 border border-border rounded-sm bg-surface">
          <p className="text-text-muted text-sm">
            Bu kategoriye ait alt kategori henüz eklenmemiş.
          </p>
        </div>
      )}
    </>
  );
}
