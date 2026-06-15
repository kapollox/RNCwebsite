import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { CatalogPageContent } from '@/components/catalog/CatalogPageContent';
import { getCategories } from '@/lib/categories-db';

export const metadata: Metadata = {
  title: 'Parça Listesi',
  description:
    'Motosiklet yedek parça grupları. Motor, fren, elektrik, egzoz, zincir ve daha fazlası.',
};

export default async function ParcaListesiPage() {
  const categories = await getCategories();

  return (
    <>
      <Breadcrumb items={[{ label: 'Parça Listesi', labelKey: 'breadcrumb_parts' }]} />
      <CatalogPageContent categories={categories} />
    </>
  );
}
