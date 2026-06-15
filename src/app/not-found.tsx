import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* 404 */}
        <div className="font-display font-black text-[96px] md:text-[120px] leading-none text-[#f0f0f0] select-none mb-2">
          404
        </div>

        {/* Kırmızı çizgi */}
        <div className="w-12 h-1 bg-accent mx-auto mb-6 rounded-full" />

        <h1 className="font-display font-black text-primary text-2xl md:text-3xl mb-3">
          Sayfa Bulunamadı
        </h1>
        <p className="text-text-muted text-[15px] leading-relaxed mb-8">
          Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
          Ana sayfaya dönerek arama yapabilirsiniz.
        </p>

        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white text-sm font-bold rounded-[3px] hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft size={15} />
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/parca-listesi"
            className="inline-flex items-center gap-2 px-5 py-3 border border-border text-primary text-sm font-bold rounded-[3px] hover:border-primary hover:bg-surface-muted transition-colors"
          >
            <Search size={15} />
            Parça Kataloğu
          </Link>
        </div>

      </div>
    </div>
  );
}
