'use client';

import Link from 'next/link';
import { MessageCircle, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

const WHATSAPP_NUMBER = '905462096969';

export default function OdemePage() {
  const { items, totalPrice, clearCart } = useCart();
  const { locale } = useLanguage();

  const buildWhatsAppMessage = () => {
    const lines: string[] = [
      locale === 'tr'
        ? 'Merhaba, aşağıdaki ürünleri sipariş etmek istiyorum:'
        : 'Hello, I would like to order the following items:',
      '',
    ];

    items.forEach(({ product, quantity }, i) => {
      const name = locale === 'tr' ? product.name_tr : product.name_en;
      const price = product.price != null
        ? product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
        : (locale === 'tr' ? 'Fiyat soruşturulacak' : 'Price to be inquired');
      lines.push(`${i + 1}. ${name} — ${quantity} adet × ${price}`);
    });

    lines.push('');
    lines.push(
      locale === 'tr'
        ? `Toplam: ${totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}`
        : `Total: ${totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}`
    );

    return lines.join('\n');
  };

  const handleWhatsApp = () => {
    const text = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="bg-surface-muted min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-display font-black text-2xl text-primary mb-3">
            {locale === 'tr' ? 'Sepetiniz Boş' : 'Your Cart is Empty'}
          </h1>
          <Link href="/parca-listesi" className="text-accent text-sm font-semibold hover:underline">
            {locale === 'tr' ? 'Parça Listesine Dön' : 'Back to Parts Catalog'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-muted min-h-screen">
      <div className="container-main py-10 md:py-14 max-w-2xl">
        {/* Geri */}
        <Link
          href="/sepet"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          {locale === 'tr' ? 'Sepete Dön' : 'Back to Cart'}
        </Link>

        <h1 className="font-display font-black text-2xl md:text-3xl text-primary tracking-tight mb-8">
          {locale === 'tr' ? 'Siparişi Tamamla' : 'Complete Order'}
        </h1>

        {/* Ödeme bakım banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-5 mb-8 flex gap-3 items-start">
          <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm mb-1">
              {locale === 'tr' ? 'Ödeme altyapımız şu an bakımda' : 'Payment system is under maintenance'}
            </p>
            <p className="text-amber-700 text-sm leading-relaxed">
              {locale === 'tr'
                ? 'Siparişinizi WhatsApp üzerinden tamamlayabilirsiniz. Sipariş detayları otomatik olarak iletilecektir.'
                : 'You can complete your order via WhatsApp. Order details will be sent automatically.'}
            </p>
          </div>
        </div>

        {/* Sipariş özeti */}
        <div className="bg-surface border border-border rounded-sm p-6 mb-6">
          <h2 className="font-display font-bold text-primary text-base mb-4 pb-3 border-b border-border">
            {locale === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}
          </h2>
          <div className="space-y-3 mb-4">
            {items.map(({ product, quantity }) => {
              const name = locale === 'tr' ? product.name_tr : product.name_en;
              return (
                <div key={product.id} className="flex justify-between items-start gap-4 text-sm">
                  <span className="text-primary leading-snug flex-1">{name}</span>
                  <div className="text-right shrink-0">
                    <span className="text-text-muted text-xs block">×{quantity}</span>
                    {product.price != null && (
                      <span className="font-semibold text-primary">
                        {(product.price * quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-3 border-t border-border flex justify-between">
            <span className="font-bold text-primary">{locale === 'tr' ? 'Toplam' : 'Total'}</span>
            <span className="font-bold text-accent text-lg">
              {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </span>
          </div>
        </div>

        {/* WhatsApp butonu */}
        <button
          onClick={handleWhatsApp}
          className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-whatsapp text-white text-base font-semibold rounded-sm hover:bg-whatsapp-dark transition-colors"
        >
          <MessageCircle size={20} />
          {locale === 'tr' ? "WhatsApp'tan Siparişi Tamamla" : 'Complete Order via WhatsApp'}
        </button>
        <p className="text-text-subtle text-xs text-center mt-3 leading-relaxed">
          {locale === 'tr'
            ? 'Butona tıkladığınızda sipariş detaylarınız WhatsApp\'ta hazır olacak.'
            : 'Clicking the button will prepare your order details in WhatsApp.'}
        </p>
      </div>
    </div>
  );
}
