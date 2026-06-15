'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Package, ArrowLeft, CheckCircle2, XCircle, Plus, Minus } from 'lucide-react';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { Toast } from '@/components/ui/Toast';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/product';

type BreadcrumbMeta = { categoryName: string; categoryNameEn: string; subName: string; subNameEn: string } | null;

function validImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.includes('picsum.photos')) return null;
  return url;
}

export default function ProductDetailPage() {
  const { category: catSlug, subcategory: subSlug, slug } = useParams<{
    category: string;
    subcategory: string;
    slug: string;
  }>();

  const { addItem, items, updateQuantity } = useCart();
  const { locale, t } = useLanguage();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [breadcrumbMeta, setBreadcrumbMeta] = useState<BreadcrumbMeta>(null);

  const showToast = useCallback((msg: string) => {
    setToast(null);
    setTimeout(() => setToast(msg), 10);
  }, []);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true);
        else setProduct(data);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (!catSlug || !subSlug) return;
    Promise.all([
      supabase.from('categories').select('name_tr,name_en').eq('id', catSlug).single(),
      supabase.from('subcategories').select('name_tr,name_en').eq('id', subSlug).single(),
    ]).then(([{ data: cat }, { data: sub }]) => {
      if (cat && sub) {
        setBreadcrumbMeta({
          categoryName: cat.name_tr,
          categoryNameEn: cat.name_en,
          subName: sub.name_tr,
          subNameEn: sub.name_en,
        });
      }
    });
  }, [catSlug, subSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-accent text-sm font-mono mb-4">404</span>
        <h2 className="font-display font-black text-primary text-2xl mb-3">
          {t('product_not_found_title')}
        </h2>
        <p className="text-text-muted text-sm mb-8 max-w-xs">
          {t('product_not_found_desc')}
        </p>
        <Link
          href={`/parca-listesi/${catSlug}/${subSlug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft size={15} />
          {t('product_back_to_list')}
        </Link>
      </div>
    );
  }

  const name = locale === 'tr' ? product.name_tr : product.name_en;
  const description = locale === 'tr' ? product.description_tr : product.description_en;
  const inStock = product.stock > 0;
  const cartItem = items.find((i) => i.product.id === product.id);
  const inCart = !!cartItem;

  const handleAddToCart = () => {
    if (inCart) {
      setConfirmUpdate(true);
      return;
    }
    addItem(product);
    if (qty > 1) updateQuantity(product.id, qty);
    showToast(t('product_added_toast').replace('{qty}', String(qty)));
  };

  const handleConfirmUpdate = () => {
    const newQty = (cartItem?.quantity ?? 0) + qty;
    updateQuantity(product.id, newQty);
    setConfirmUpdate(false);
    showToast(t('product_updated_toast').replace('{qty}', String(newQty)));
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Parça Listesi', labelKey: 'breadcrumb_parts', href: '/parca-listesi' },
          {
            label: breadcrumbMeta?.categoryName ?? catSlug,
            labelEn: breadcrumbMeta?.categoryNameEn,
            href: `/parca-listesi/${catSlug}`,
          },
          {
            label: breadcrumbMeta?.subName ?? subSlug,
            labelEn: breadcrumbMeta?.subNameEn,
            href: `/parca-listesi/${catSlug}/${subSlug}`,
          },
          { label: name },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Görsel */}
        <div className="relative aspect-square bg-surface border border-border rounded-sm overflow-hidden">
          {validImageUrl(product.image_url) ? (
            <Image
              src={validImageUrl(product.image_url)!}
              alt={name}
              fill
              className="object-contain p-8"
              quality={90}
              priority
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            >
              <Package size={64} className="text-text-subtle" />
            </div>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-xs font-black tracking-[0.14em] uppercase text-text-muted border border-border bg-surface px-3 py-1.5 rounded-sm">
                {t('product_out_of_stock')}
              </span>
            </div>
          )}
        </div>

        {/* Bilgiler */}
        <div className="flex flex-col">
          <h1 className="font-display font-black text-2xl md:text-3xl text-primary leading-tight tracking-tight mb-1">
            {product.name_tr}
          </h1>
          {product.name_en !== product.name_tr && (
            <p className="text-text-subtle text-sm mb-4">{product.name_en}</p>
          )}

          {/* Fiyat */}
          <div className="mt-4 mb-6 pb-6 border-b border-border">
            {product.price != null ? (
              <span className="font-display font-black text-3xl text-accent">
                {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
              </span>
            ) : (
              <span className="text-text-muted text-sm">{t('product_price_contact')}</span>
            )}
          </div>

          {/* Stok */}
          <div className="flex items-center gap-2 mb-6">
            {inStock ? (
              <>
                <CheckCircle2 size={16} className="text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  {t('product_in_stock')}
                </span>
                <span className="text-text-subtle text-xs">
                  ({product.stock} {t('product_cart_count')})
                </span>
              </>
            ) : (
              <>
                <XCircle size={16} className="text-accent" />
                <span className="text-sm font-semibold text-accent">
                  {t('product_out_of_stock')}
                </span>
              </>
            )}
          </div>

          {/* Adet + Sepete Ekle */}
          {inStock && (
            <div className="mb-6">
              {confirmUpdate && (
                <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 mb-4">
                  <p className="text-amber-800 text-sm font-semibold mb-3">
                    {t('product_confirm_msg')
                      .replace('{existing}', String(cartItem?.quantity ?? 0))
                      .replace('{qty}', String(qty))}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleConfirmUpdate}
                      className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-sm hover:bg-primary-dark transition-colors"
                    >
                      {t('product_confirm_yes')}
                    </button>
                    <button
                      onClick={() => setConfirmUpdate(false)}
                      className="px-4 py-2 border border-border text-primary text-xs font-semibold rounded-sm hover:bg-surface-muted transition-colors"
                    >
                      {t('product_confirm_cancel')}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2.5 text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
                    aria-label={t('product_qty_decrease')}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 py-2.5 text-sm font-bold text-primary min-w-[2.5rem] text-center border-x border-border select-none">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-2.5 text-text-muted hover:text-primary hover:bg-surface-muted transition-colors"
                    aria-label={t('product_qty_increase')}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark active:scale-[0.98] transition-all"
                >
                  <ShoppingCart size={15} />
                  {inCart ? t('product_add_more') : t('product_add_to_cart')}
                </button>
              </div>

              {inCart && (
                <p className="mt-2 text-xs text-text-subtle">
                  {t('product_in_cart_msg').replace('{qty}', String(cartItem?.quantity ?? 0))}
                  {' '}
                  <Link href="/sepet" className="text-accent hover:underline font-semibold">
                    {t('product_view_cart')}
                  </Link>
                </p>
              )}
            </div>
          )}

          {/* Açıklama */}
          {description && (
            <div className="mb-6">
              <h2 className="text-[11px] font-black tracking-[0.12em] uppercase text-text-subtle mb-2">
                {t('product_description')}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed">{description}</p>
            </div>
          )}

          {/* Uyumlu Modeller */}
          {product.compatible_models && product.compatible_models.length > 0 && (
            <div className="bg-surface border border-border rounded-sm p-4">
              <h2 className="text-[11px] font-black tracking-[0.12em] uppercase text-text-subtle mb-3">
                {t('product_compatible')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.compatible_models.map((model) => (
                  <span
                    key={model}
                    className="px-2.5 py-1 bg-surface-muted border border-border text-primary text-xs font-semibold rounded-sm"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </>
  );
}
