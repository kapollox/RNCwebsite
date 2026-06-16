'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Package, AlertCircle, Filter, Search, X, Loader2 } from 'lucide-react';
import { adminFetchProducts, adminDeleteProduct, adminBulkDeleteProducts } from '@/lib/admin-api';
import type { Product } from '@/types/product';

const BRAND_FILTERS = ['Tümü', 'RKS Motor', 'Kuba Motor', 'Mondial', 'Arora', 'Yuki', 'Diğer', 'Markasız'];
const KNOWN_BRANDS  = ['RKS Motor', 'Kuba Motor', 'Mondial', 'Arora', 'Yuki'];

export default function AdminPage() {
  const [products, setProducts]       = useState<Product[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [deletingId, setDeletingId]   = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected]       = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await adminFetchProducts();
      setProducts(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filtered = useMemo(() => {
    let result = products;
    if (brandFilter !== 'Tümü') {
      if (brandFilter === 'Markasız') result = result.filter((p) => !p.brand);
      else if (brandFilter === 'Diğer') result = result.filter((p) => p.brand && !KNOWN_BRANDS.includes(p.brand));
      else result = result.filter((p) => p.brand === brandFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) =>
        p.name_tr.toLowerCase().includes(q) ||
        (p.name_en ?? '').toLowerCase().includes(q) ||
        (p.brand ?? '').toLowerCase().includes(q) ||
        (p.category_id ?? '').toLowerCase().includes(q) ||
        (p.subcategory_id ?? '').toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, brandFilter, searchQuery]);

  // Seçim helpers
  const allFilteredSelected = filtered.length > 0 && filtered.every((p) => selected.has(p.id));
  const someSelected = selected.size > 0;

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allFilteredSelected) {
      // Filtreli listedeki seçimleri kaldır
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((p) => next.delete(p.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((p) => next.add(p.id));
        return next;
      });
    }
  };

  const clearSelection = () => setSelected(new Set());

  // Tekil silme
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" silinsin mi?`)) return;
    setDeletingId(id);
    try {
      await adminDeleteProduct(id);
      setProducts((p) => p.filter((x) => x.id !== id));
      setSelected((prev) => { const n = new Set(prev); n.delete(id); return n; });
    } catch (e) {
      alert('Silinemedi: ' + (e as Error).message);
    } finally {
      setDeletingId(null);
    }
  };

  // Toplu silme
  const handleBulkDelete = async () => {
    const ids = [...selected];
    if (!confirm(`Seçili ${ids.length} ürün kalıcı olarak silinecek. Emin misiniz?`)) return;
    setBulkDeleting(true);
    try {
      await adminBulkDeleteProducts(ids);
      setProducts((p) => p.filter((x) => !ids.includes(x.id)));
      clearSelection();
    } catch (e) {
      alert('Toplu silme başarısız: ' + (e as Error).message);
    } finally {
      setBulkDeleting(false);
    }
  };

  return (
    <div>
      {/* Başlık satırı */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-black text-2xl text-primary">Ürünler</h1>
          <p className="text-text-muted text-sm mt-1">{products.length} ürün</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ürün adı, marka, kategori..."
              className="pl-8 pr-8 py-2 text-sm bg-surface border border-border rounded-sm text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors w-64"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-subtle hover:text-primary transition-colors">
                <X size={13} />
              </button>
            )}
          </div>
          <Link
            href="/admin/urun-ekle"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors"
          >
            <Plus size={15} />
            Ürün Ekle
          </Link>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 rounded-sm text-rose-700 text-sm mb-6">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {/* Marka filtresi */}
      {!loading && products.length > 0 && (
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <Filter size={13} className="text-text-subtle shrink-0" />
          {BRAND_FILTERS.map((b) => (
            <button
              key={b}
              onClick={() => setBrandFilter(b)}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                brandFilter === b
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface text-text-muted border-border hover:border-primary hover:text-primary'
              }`}
            >
              {b}
            </button>
          ))}
          <span className="text-text-subtle text-xs ml-1">{filtered.length} sonuç</span>
        </div>
      )}

      {/* Toplu işlem action bar */}
      {someSelected && (
        <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-primary/5 border border-primary/20 rounded-sm">
          <span className="text-sm font-semibold text-primary">
            {selected.size} ürün seçildi
          </span>
          <button
            onClick={clearSelection}
            className="text-xs text-text-muted hover:text-primary transition-colors"
          >
            Seçimi temizle
          </button>
          <div className="ml-auto">
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-xs font-bold rounded-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {bulkDeleting
                ? <><Loader2 size={13} className="animate-spin" /> Siliniyor...</>
                : <><Trash2 size={13} /> {selected.size} Ürünü Sil</>
              }
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-text-muted text-sm">Yükleniyor...</div>
      ) : products.length === 0 ? (
        <div className="bg-surface border border-border rounded-sm p-12 text-center">
          <Package size={32} className="text-text-subtle mx-auto mb-3" />
          <p className="text-text-muted text-sm">Henüz ürün eklenmemiş.</p>
          <Link href="/admin/urun-ekle" className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent hover:underline">
            <Plus size={13} /> İlk ürünü ekle
          </Link>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Search size={28} className="text-text-subtle mx-auto mb-3" />
              <p className="text-text-muted text-sm font-semibold mb-1">Sonuç bulunamadı</p>
              <p className="text-text-subtle text-xs">
                {searchQuery ? `"${searchQuery}" için eşleşen ürün yok.` : 'Bu filtreye uyan ürün yok.'}
              </p>
              {(searchQuery || brandFilter !== 'Tümü') && (
                <button
                  onClick={() => { setSearchQuery(''); setBrandFilter('Tümü'); }}
                  className="mt-4 text-xs text-accent hover:underline font-semibold"
                >
                  Filtreleri temizle
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-surface-muted border-b border-border">
                <tr>
                  {/* Tümünü seç checkbox */}
                  <th className="px-4 py-3 w-8">
                    <input
                      type="checkbox"
                      checked={allFilteredSelected}
                      onChange={toggleAll}
                      className="accent-primary w-3.5 h-3.5 cursor-pointer"
                      title={allFilteredSelected ? 'Tüm seçimi kaldır' : 'Tümünü seç'}
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">Ürün</th>
                  <th className="text-left px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle hidden lg:table-cell">Marka</th>
                  <th className="text-left px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle hidden md:table-cell">Kategori</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">Fiyat</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">Stok</th>
                  <th className="text-right px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle hidden sm:table-cell">Durum</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => {
                  const isSelected = selected.has(product.id);
                  return (
                    <tr
                      key={product.id}
                      className={`transition-colors ${isSelected ? 'bg-primary/5' : 'hover:bg-surface-muted'}`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(product.id)}
                          className="accent-primary w-3.5 h-3.5 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0 rounded-sm border border-border bg-surface-muted overflow-hidden relative">
                            {product.image_url ? (
                              <Image src={product.image_url} alt={product.name_tr} fill className="object-contain p-1" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={14} className="text-text-subtle" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-primary leading-snug line-clamp-1">{product.name_tr}</p>
                            <p className="text-text-subtle text-xs line-clamp-1">{product.name_en}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {product.brand ? (
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-surface-muted text-text-muted border border-border">
                            {product.brand}
                          </span>
                        ) : (
                          <span className="text-text-subtle text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                        <span className="text-xs">{product.category_id}</span>
                        {product.subcategory_id && (
                          <span className="text-text-subtle text-xs block">{product.subcategory_id}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-primary">
                        {product.price != null
                          ? product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })
                          : <span className="text-text-subtle text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-semibold ${product.stock === 0 ? 'text-accent' : 'text-primary'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right hidden sm:table-cell">
                        <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          product.is_active
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-surface-muted text-text-subtle border border-border'
                        }`}>
                          {product.is_active ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/urun/${product.id}`}
                            className="p-1.5 text-text-muted hover:text-primary hover:bg-surface-muted rounded-sm transition-colors"
                          >
                            <Pencil size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name_tr)}
                            disabled={deletingId === product.id}
                            className="p-1.5 text-text-muted hover:text-accent hover:bg-rose-50 rounded-sm transition-colors disabled:opacity-40"
                          >
                            {deletingId === product.id
                              ? <Loader2 size={14} className="animate-spin" />
                              : <Trash2 size={14} />
                            }
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
