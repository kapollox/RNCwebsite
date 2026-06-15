'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Product } from '@/types/product';

interface Props {
  products: Product[];
}

function validImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.includes('picsum.photos')) return null;
  return url;
}

export function FeaturedProductsClient({ products }: Props) {
  const { t, locale } = useLanguage();

  const handleWhatsApp = (product: Product) => {
    const name = locale === 'en' ? (product.name_en || product.name_tr) : product.name_tr;
    const msg = encodeURIComponent(t('featured_whatsapp_msg').replace('{name}', name));
    window.open(`https://wa.me/905462096969?text=${msg}`, '_blank');
  };

  return (
    <section className="bg-[#f9fafb] border-b border-border">
      <div className="container-main py-16 md:py-20">

        {/* Başlık */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-accent shrink-0" />
              <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
                {t('featured_eyebrow')}
              </span>
            </div>
            <h2 className="font-display font-black text-primary text-2xl md:text-3xl leading-tight tracking-tight">
              {t('featured_title')}
            </h2>
          </div>
          <Link
            href="/parca-listesi"
            className="group flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-dark transition-colors whitespace-nowrap shrink-0"
          >
            {t('featured_view_all')}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Ürün grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => {
            const name = locale === 'en' ? (product.name_en || product.name_tr) : product.name_tr;
            return (
              <div
                key={product.id}
                className="group bg-white border border-[#e8ecf0] rounded-[4px] overflow-hidden hover:border-[#c8d0d8] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col"
              >
                {/* Görsel alanı */}
                <div className="relative h-52 bg-[#f4f6f8] overflow-hidden shrink-0">
                  {validImageUrl(product.image_url) ? (
                    <Image
                      src={validImageUrl(product.image_url)!}
                      alt={name}
                      fill
                      className="object-contain p-5 group-hover:scale-[1.04] transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <Package size={28} className="text-slate-300" />
                    </div>
                  )}
                  {/* Stok etiketi */}
                  {product.stock === 0 && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-800/90 text-white text-[10px] font-bold rounded-[2px] tracking-wide">
                      {t('featured_out_of_stock')}
                    </div>
                  )}
                </div>

                {/* Bilgi */}
                <div className="p-4 flex flex-col flex-1">
                  {product.brand && (
                    <span className="text-[10px] font-bold text-slate-400 tracking-[0.12em] uppercase mb-1.5">
                      {product.brand}
                    </span>
                  )}
                  <h3 className="font-semibold text-primary text-[0.875rem] leading-snug line-clamp-2 mb-4 flex-1">
                    {name}
                  </h3>

                  {/* Alt satır: fiyat + buton */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#eef0f2]">
                    <div className="flex flex-col">
                      {product.price != null ? (
                        <span className="font-display font-black text-primary text-xl leading-none">
                          {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm font-medium">{t('featured_price_ask')}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleWhatsApp(product)}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] text-white text-[11px] font-bold rounded-[3px] hover:bg-[#20bc5a] active:scale-[0.97] transition-all duration-150 shrink-0 shadow-sm shadow-[#25D366]/30"
                    >
                      <MessageCircle size={12} />
                      {t('featured_whatsapp_btn')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
