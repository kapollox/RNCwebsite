'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Package, AlertCircle } from 'lucide-react';
import { adminFetchProducts, adminDeleteProduct } from '@/lib/admin-api';
import type { Product } from '@/types/product';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" silinsin mi?`)) return;
    setDeletingId(id);
    try {
      await adminDeleteProduct(id);
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      alert('Silinemedi: ' + (e as Error).message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-black text-2xl text-primary">Ürünler</h1>
          <p className="text-text-muted text-sm mt-1">{products.length} ürün</p>
        </div>
        <Link
          href="/admin/urun-ekle"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors"
        >
          <Plus size={15} />
          Ürün Ekle
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 rounded-sm text-rose-700 text-sm mb-6">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-text-muted text-sm">Yükleniyor...</div>
      ) : products.length === 0 ? (
        <div className="bg-surface border border-border rounded-sm p-12 text-center">
          <Package size={32} className="text-text-subtle mx-auto mb-3" />
          <p className="text-text-muted text-sm">Henüz ürün eklenmemiş.</p>
          <Link
            href="/admin/urun-ekle"
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent hover:underline"
          >
            <Plus size={13} /> İlk ürünü ekle
          </Link>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">Ürün</th>
                <th className="text-left px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle hidden md:table-cell">Kategori</th>
                <th className="text-right px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">Fiyat</th>
                <th className="text-right px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">Stok</th>
                <th className="text-right px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle hidden sm:table-cell">Durum</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-surface-muted transition-colors">
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
                        className="p-1.5 text-text-muted hover:text-accent hover:bg-rose-50 rounded-sm transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
