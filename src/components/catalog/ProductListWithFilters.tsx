'use client';

import { useState, useMemo } from 'react';
import { Search, X, MessageCircle } from 'lucide-react';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import type { Product } from '@/types/product';

interface Props {
  products: Product[];
  subcategoryName: string;
  subcategoryNameEn?: string;
  whatsappUrl: string;
}

const defaultFilters = {
  search: '',
  minPrice: '',
  maxPrice: '',
  inStockOnly: false,
  sort: 'newest',
};

export function ProductListWithFilters({ products, subcategoryName, subcategoryNameEn, whatsappUrl }: Props) {
  const [filters, setFilters] = useState(defaultFilters);
  const { locale } = useLanguage();
  const displayName = locale === 'en' && subcategoryNameEn ? subcategoryNameEn : subcategoryName;

  const set = <K extends keyof typeof defaultFilters>(key: K, value: typeof defaultFilters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const isFiltered =
    filters.search !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.inStockOnly ||
    filters.sort !== 'newest';

  const filtered = useMemo(() => {
    let result = [...products];

    // Arama
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name_tr.toLowerCase().includes(q) ||
          p.name_en.toLowerCase().includes(q) ||
          p.description_tr?.toLowerCase().includes(q) ||
          p.description_en?.toLowerCase().includes(q)
      );
    }

    // Min fiyat
    if (filters.minPrice !== '') {
      const min = parseFloat(filters.minPrice);
      if (!isNaN(min)) result = result.filter((p) => (p.price ?? 0) >= min);
    }

    // Max fiyat
    if (filters.maxPrice !== '') {
      const max = parseFloat(filters.maxPrice);
      if (!isNaN(max)) result = result.filter((p) => (p.price ?? Infinity) <= max);
    }

    // Stok
    if (filters.inStockOnly) result = result.filter((p) => p.stock > 0);

    // Sıralama
    switch (filters.sort) {
      case 'price_asc':
        result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'stock_desc':
        result.sort((a, b) => b.stock - a.stock);
        break;
      // newest: Supabase'den gelen sıra korunur
    }

    return result;
  }, [products, filters]);

  const inputCls =
    'w-full px-3 py-2 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors';

  return (
    <>
      {/* Filtre paneli */}
      <div className="bg-surface border border-border rounded-sm p-4 mb-6 flex flex-col sm:flex-row gap-3 flex-wrap items-end">
        {/* Arama */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none" />
          <input
            type="text"
            placeholder="Ürün ara..."
            value={filters.search}
            onChange={(e) => set('search', e.target.value)}
            className={`${inputCls} pl-8`}
          />
        </div>

        {/* Min fiyat */}
        <div className="w-28">
          <label className="text-[10px] font-bold uppercase tracking-wide text-text-subtle block mb-1">Min ₺</label>
          <input
            type="number"
            min="0"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => set('minPrice', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Max fiyat */}
        <div className="w-28">
          <label className="text-[10px] font-bold uppercase tracking-wide text-text-subtle block mb-1">Max ₺</label>
          <input
            type="number"
            min="0"
            placeholder="∞"
            value={filters.maxPrice}
            onChange={(e) => set('maxPrice', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Sıralama */}
        <div className="w-44">
          <label className="text-[10px] font-bold uppercase tracking-wide text-text-subtle block mb-1">Sırala</label>
          <select
            value={filters.sort}
            onChange={(e) => set('sort', e.target.value)}
            className={inputCls}
          >
            <option value="newest">En Yeni</option>
            <option value="price_asc">Fiyat: Düşük → Yüksek</option>
            <option value="price_desc">Fiyat: Yüksek → Düşük</option>
            <option value="stock_desc">Stok: Çok → Az</option>
          </select>
        </div>

        {/* Stok checkbox */}
        <label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap pb-0.5">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => set('inStockOnly', e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm text-primary font-semibold">Stokta olanlar</span>
        </label>

        {/* Temizle */}
        {isFiltered && (
          <button
            onClick={() => setFilters(defaultFilters)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-accent border border-accent/30 rounded-sm hover:bg-accent/5 transition-colors whitespace-nowrap"
          >
            <X size={13} />
            Temizle
          </button>
        )}
      </div>

      {/* Sonuç sayısı */}
      <div className="text-xs text-text-subtle mb-4">
        {filtered.length === products.length
          ? `${products.length} ürün`
          : `${filtered.length} / ${products.length} ürün`}
      </div>

      {/* Ürün grid */}
      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-10 bg-surface border border-border rounded-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              Aradığınız parçayı bulamadınız mı? WhatsApp&apos;tan sorun.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-whatsapp text-white text-sm font-semibold rounded-sm hover:bg-whatsapp-dark transition-colors shrink-0"
            >
              <MessageCircle size={15} />
              WhatsApp ile Sor
            </a>
          </div>
        </>
      ) : (
        /* Filtre sonucu boş */
        <div className="bg-surface border border-border rounded-sm p-10 flex flex-col items-center text-center">
          <Search size={28} className="text-text-subtle mb-3" />
          <p className="font-display font-bold text-primary mb-1">Sonuç bulunamadı</p>
          <p className="text-text-muted text-sm mb-4">
            <strong>&ldquo;{filters.search}&rdquo;</strong> için {displayName} kategorisinde ürün yok.
          </p>
          <button
            onClick={() => setFilters(defaultFilters)}
            className="text-xs font-semibold text-accent hover:underline"
          >
            Filtreleri temizle
          </button>
        </div>
      )}
    </>
  );
}
