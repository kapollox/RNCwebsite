import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CategoryNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="part-number text-accent text-sm mb-4">404</span>
      <h2 className="font-display font-black text-primary text-2xl mb-3">
        Kategori Bulunamadı
      </h2>
      <p className="text-text-muted text-sm mb-8 max-w-xs">
        Aradığınız parça kategorisi mevcut değil. Tüm kategorileri listelemek
        için parça listesine dönebilirsiniz.
      </p>
      <Link
        href="/parca-listesi"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors"
      >
        <ArrowLeft size={15} />
        Parça Listesine Dön
      </Link>
    </div>
  );
}
