'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import type { Product } from '@/types/product';

export function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const { locale } = useLanguage();

  const name = locale === 'tr' ? product.name_tr : product.name_en;
  const description = locale === 'tr' ? product.description_tr : product.description_en;
  const inCart = items.some((i) => i.product.id === product.id);
  const detailHref = `/parca-listesi/${product.category_id}/${product.subcategory_id}/${product.slug}`;

  return (
    <div className="bg-surface border border-border rounded-sm overflow-hidden flex flex-col group hover:border-primary hover:shadow-sm transition-all duration-150">
      {/* Görsel — tıklanabilir */}
      <Link href={detailHref} className="relative aspect-square bg-surface-muted border-b border-border overflow-hidden block">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-[1.04] transition-transform duration-200"
            quality={90}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          >
            <Package size={32} className="text-text-subtle" />
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-[10px] font-black tracking-[0.14em] uppercase text-text-muted border border-border bg-surface px-2 py-1 rounded-sm">
              {locale === 'tr' ? 'Tükendi' : 'Out of Stock'}
            </span>
          </div>
        )}
      </Link>

      {/* Bilgi */}
      <div className="p-4 flex flex-col flex-1">
        {/* Başlık — tıklanabilir */}
        <Link href={detailHref} className="block mb-1 hover:text-accent transition-colors">
          <h3 className="font-display font-bold text-primary text-sm leading-snug line-clamp-2">
            {name}
          </h3>
        </Link>
        {description && (
          <p className="text-text-muted text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          {product.price != null ? (
            <span className="font-bold text-accent text-base">
              {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </span>
          ) : (
            <span className="text-text-subtle text-xs">
              {locale === 'tr' ? 'Fiyat için sorun' : 'Ask for price'}
            </span>
          )}

          <button
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-sm transition-colors duration-150 ${
              inCart
                ? 'bg-primary text-white'
                : product.stock === 0
                ? 'bg-surface-muted text-text-subtle border border-border cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            <ShoppingCart size={13} />
            {inCart
              ? (locale === 'tr' ? 'Sepette' : 'In Cart')
              : (locale === 'tr' ? 'Ekle' : 'Add')}
          </button>
        </div>
      </div>
    </div>
  );
}
