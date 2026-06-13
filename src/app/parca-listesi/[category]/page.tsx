import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { CategoryPageContent } from '@/components/catalog/CategoryPageContent';
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
      <CategoryPageContent category={category} />
    </>
  );
}
