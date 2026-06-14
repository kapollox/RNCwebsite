'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { adminFetchProduct } from '@/lib/admin-api';
import { ProductForm } from '@/components/admin/ProductForm';
import type { Product } from '@/types/product';

export default function UrunDuzenlemePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    adminFetchProduct(id)
      .then(setProduct)
      .catch(() => setError('Ürün bulunamadı.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-text-muted text-sm py-8">
        <Loader2 size={16} className="animate-spin" />
        Ürün yükleniyor...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 rounded-sm text-rose-700 text-sm">
        <AlertCircle size={15} />
        {error || 'Ürün bulunamadı.'}
        <button
          onClick={() => router.push('/admin')}
          className="ml-2 underline hover:no-underline"
        >
          Geri dön
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-black text-2xl text-primary">Ürünü Düzenle</h1>
        <p className="text-text-muted text-sm mt-1 line-clamp-1">{product.name_tr}</p>
      </div>
      <ProductForm mode="edit" initial={product} />
    </div>
  );
}
