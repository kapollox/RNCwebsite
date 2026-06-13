import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { getCategoryBySlug, getSubCategoryBySlug } from '@/data/categories';

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlug } = await params;
  const sub = getSubCategoryBySlug(catSlug, subSlug);
  if (!sub) return { title: 'Alt Kategori Bulunamadı' };
  return {
    title: sub.name,
    description: sub.description ?? `Honda motosiklet ${sub.name.toLowerCase()} parçaları.`,
  };
}

export default async function SubCategoryPage({ params }: PageProps) {
  const { category: catSlug, subcategory: subSlug } = await params;
  const category = getCategoryBySlug(catSlug);
  const subcategory = getSubCategoryBySlug(catSlug, subSlug);

  if (!category || !subcategory) notFound();

  const whatsappMessage = `Merhaba, Honda motosikletim için ${subcategory.name} parçası sorgulamak istiyorum. Model ve yıl bilgilerimi paylaşacağım.`;
  const whatsappUrl = `https://wa.me/905XXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Parça Listesi', href: '/parca-listesi' },
          { label: category.name, href: `/parca-listesi/${category.slug}` },
          { label: subcategory.name },
        ]}
      />

      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-black text-primary tracking-tight">
          {subcategory.name}
        </h1>
        {subcategory.description && (
          <p className="text-text-muted text-sm mt-2">{subcategory.description}</p>
        )}
      </div>

      {/* Coming soon state */}
      <div className="bg-surface border border-border rounded-sm overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 bg-accent" />

        <div className="px-8 py-14 flex flex-col items-center text-center max-w-md mx-auto">
          {/* Icon placeholder */}
          <div
            className="w-20 h-20 rounded-sm flex items-center justify-center mb-6"
            style={{
              backgroundColor: '#F1F5F9',
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          >
            <span className="part-number text-accent text-xs">
              {subcategory.slug.toUpperCase().substring(0, 6)}
            </span>
          </div>

          <h2 className="font-display font-black text-primary text-xl mb-3">
            Ürünler Yakında Eklenecek
          </h2>
          <p className="text-text-muted text-sm leading-relaxed mb-8">
            <strong className="text-primary">{subcategory.name}</strong> kategorisindeki
            Honda motosiklet parçaları kataloğa ekleniyor.
            <br />
            Şimdi WhatsApp üzerinden parça sorgulayabilirsiniz.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-whatsapp text-white text-sm font-semibold rounded-sm hover:bg-whatsapp-dark transition-colors"
            >
              <MessageCircle size={17} />
              WhatsApp ile Sor
            </a>
            <Link
              href={`/parca-listesi/${category.slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-primary text-sm font-semibold rounded-sm hover:bg-surface-muted transition-colors"
            >
              <ArrowLeft size={15} />
              {category.name}&apos;e Dön
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
