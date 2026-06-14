'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function SepetPage() {
  const { items, totalCount, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const { locale } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="bg-surface-muted min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-sm bg-surface border border-border flex items-center justify-center">
            <ShoppingCart size={32} className="text-text-subtle" />
          </div>
          <h1 className="font-display font-black text-2xl text-primary mb-2">
            {locale === 'tr' ? 'Sepetiniz Boş' : 'Your Cart is Empty'}
          </h1>
          <p className="text-text-muted text-sm mb-8">
            {locale === 'tr'
              ? 'Henüz sepete ürün eklemediniz.'
              : 'You have not added any products yet.'}
          </p>
          <Link
            href="/parca-listesi"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors"
          >
            {locale === 'tr' ? 'Parça Kataloğuna Git' : 'Browse Parts Catalog'}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-muted min-h-screen">
      <div className="container-main py-10 md:py-14">
        {/* Başlık */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display font-black text-2xl md:text-3xl text-primary tracking-tight">
              {locale === 'tr' ? 'Sepetim' : 'My Cart'}
            </h1>
            <p className="text-text-muted text-sm mt-1">
              {totalCount} {locale === 'tr' ? 'ürün' : 'item'}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-text-subtle hover:text-accent transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={13} />
            {locale === 'tr' ? 'Sepeti Temizle' : 'Clear Cart'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ürün listesi */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map(({ product, quantity }) => {
              const name = locale === 'tr' ? product.name_tr : product.name_en;
              return (
                <div
                  key={product.id}
                  className="bg-surface border border-border rounded-sm p-4 flex gap-4 items-start"
                >
                  {/* Görsel */}
                  <div className="w-20 h-20 shrink-0 rounded-sm border border-border bg-surface-muted overflow-hidden relative">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={name}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart size={20} className="text-text-subtle" />
                      </div>
                    )}
                  </div>

                  {/* Bilgi */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-primary text-sm leading-snug mb-1 line-clamp-2">
                      {name}
                    </h3>
                    {product.price != null && (
                      <p className="text-accent font-bold text-base mb-3">
                        {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                      </p>
                    )}

                    {/* Adet */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-border rounded-sm overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2.5 py-1.5 text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-semibold text-primary min-w-[2rem] text-center border-x border-border">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2.5 py-1.5 text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-text-subtle hover:text-accent transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Satır toplamı */}
                  {product.price != null && (
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-text-subtle mb-0.5">
                        {locale === 'tr' ? 'Toplam' : 'Total'}
                      </p>
                      <p className="font-bold text-primary text-sm">
                        {(product.price * quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Özet kutusu */}
          <div className="lg:col-span-1">
            <div className="bg-surface border border-border rounded-sm p-6 sticky top-24">
              <h2 className="font-display font-bold text-primary text-base mb-5 pb-4 border-b border-border">
                {locale === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">
                    {locale === 'tr' ? 'Ara Toplam' : 'Subtotal'}
                  </span>
                  <span className="font-semibold text-primary">
                    {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">
                    {locale === 'tr' ? 'Kargo' : 'Shipping'}
                  </span>
                  <span className="text-text-subtle text-xs">
                    {locale === 'tr' ? 'Hesaplanacak' : 'To be calculated'}
                  </span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between">
                  <span className="font-bold text-primary">
                    {locale === 'tr' ? 'Toplam' : 'Total'}
                  </span>
                  <span className="font-bold text-accent text-lg">
                    {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </span>
                </div>
              </div>

              <Link
                href="/odeme"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors"
              >
                {locale === 'tr' ? 'Siparişi Tamamla' : 'Complete Order'}
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/parca-listesi"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-primary text-sm font-semibold rounded-sm hover:bg-surface-muted transition-colors"
              >
                {locale === 'tr' ? 'Alışverişe Devam Et' : 'Continue Shopping'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
