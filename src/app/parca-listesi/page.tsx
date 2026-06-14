import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { CatalogPageContent } from '@/components/catalog/CatalogPageContent';
import { categories } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Parça Listesi',
  description:
    'Honda motosiklet yedek parça grupları. Motor, fren, elektrik, egzoz, zincir ve daha fazlası.',
};

export default function ParcaListesiPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Parça Listesi', labelKey: 'breadcrumb_parts' }]} />
      <CatalogPageContent categories={categories} />
    </>
  );
}
