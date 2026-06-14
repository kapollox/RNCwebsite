'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { adminCreateProduct, adminUpdateProduct } from '@/lib/admin-api';
import { categories } from '@/data/categories';
import type { Product } from '@/types/product';

interface ProductFormProps {
  initial?: Partial<Product>;
  mode: 'create' | 'edit';
}

export function ProductForm({ initial, mode }: ProductFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name_tr: initial?.name_tr ?? '',
    name_en: initial?.name_en ?? '',
    slug: initial?.slug ?? '',
    category_id: initial?.category_id ?? '',
    subcategory_id: initial?.subcategory_id ?? '',
    price: initial?.price?.toString() ?? '',
    stock: initial?.stock?.toString() ?? '0',
    description_tr: initial?.description_tr ?? '',
    description_en: initial?.description_en ?? '',
    compatible_models: initial?.compatible_models?.join(', ') ?? '',
    is_active: initial?.is_active ?? true,
  });

  const [imageUrl, setImageUrl] = useState<string | null>(initial?.image_url ?? null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleNameTr = (val: string) => {
    set('name_tr', val);
    if (mode === 'create') {
      const slug = val
        .toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      set('slug', slug);
    }
  };

  const selectedCategory = categories.find((c) => c.id === form.category_id);
  const subcategories = selectedCategory?.subcategories ?? [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');

    const ext = file.name.split('.').pop();
    const path = `products/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError('Görsel yüklenemedi: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name_tr || !form.name_en || !form.slug || !form.category_id) {
      setError('Türkçe ad, İngilizce ad, slug ve kategori zorunludur.');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      name_tr: form.name_tr,
      name_en: form.name_en,
      slug: form.slug,
      category_id: form.category_id,
      subcategory_id: form.subcategory_id || null,
      price: form.price ? parseFloat(form.price) : null,
      stock: parseInt(form.stock) || 0,
      description_tr: form.description_tr || null,
      description_en: form.description_en || null,
      image_url: imageUrl,
      compatible_models: form.compatible_models
        ? form.compatible_models.split(',').map((s) => s.trim()).filter(Boolean)
        : null,
      is_active: form.is_active,
    };

    try {
      if (mode === 'create') {
        await adminCreateProduct(payload);
      } else {
        await adminUpdateProduct(initial!.id!, payload);
      }
      router.push('/admin');
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  };

  const inputCls = 'w-full px-3.5 py-2.5 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors';
  const labelCls = 'text-[11px] font-semibold text-primary tracking-wide uppercase mb-1.5 block';

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-sm text-rose-700 text-sm">
          {error}
        </div>
      )}

      <section className="bg-surface border border-border rounded-sm p-6 space-y-4">
        <h2 className="font-display font-bold text-primary text-sm uppercase tracking-wider pb-3 border-b border-border">
          Ürün Adı
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Türkçe Ad *</label>
            <input className={inputCls} value={form.name_tr} onChange={(e) => handleNameTr(e.target.value)} placeholder="Honda CB500F Ön Fren Balatası" />
          </div>
          <div>
            <label className={labelCls}>İngilizce Ad *</label>
            <input className={inputCls} value={form.name_en} onChange={(e) => set('name_en', e.target.value)} placeholder="Honda CB500F Front Brake Pad" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Slug *</label>
          <input className={inputCls} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="honda-cb500f-on-fren-balatasi" />
        </div>
      </section>

      <section className="bg-surface border border-border rounded-sm p-6 space-y-4">
        <h2 className="font-display font-bold text-primary text-sm uppercase tracking-wider pb-3 border-b border-border">
          Kategori
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Kategori *</label>
            <select
              className={inputCls}
              value={form.category_id}
              onChange={(e) => { set('category_id', e.target.value); set('subcategory_id', ''); }}
            >
              <option value="">Kategori seç...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Alt Kategori</label>
            <select
              className={inputCls}
              value={form.subcategory_id}
              onChange={(e) => set('subcategory_id', e.target.value)}
              disabled={!form.category_id}
            >
              <option value="">Alt kategori seç...</option>
              {subcategories.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-surface border border-border rounded-sm p-6 space-y-4">
        <h2 className="font-display font-bold text-primary text-sm uppercase tracking-wider pb-3 border-b border-border">
          Fiyat & Stok
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Fiyat (₺)</label>
            <input type="number" step="0.01" min="0" className={inputCls} value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="0.00" />
          </div>
          <div>
            <label className={labelCls}>Stok Adedi</label>
            <input type="number" min="0" className={inputCls} value={form.stock} onChange={(e) => set('stock', e.target.value)} />
          </div>
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => set('is_active', e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm font-semibold text-primary">Aktif (sitede görünsün)</span>
        </label>
      </section>

      <section className="bg-surface border border-border rounded-sm p-6 space-y-4">
        <h2 className="font-display font-bold text-primary text-sm uppercase tracking-wider pb-3 border-b border-border">
          Açıklama
        </h2>
        <div>
          <label className={labelCls}>Türkçe Açıklama</label>
          <textarea rows={3} className={inputCls} value={form.description_tr} onChange={(e) => set('description_tr', e.target.value)} placeholder="Ürün açıklaması..." />
        </div>
        <div>
          <label className={labelCls}>İngilizce Açıklama</label>
          <textarea rows={3} className={inputCls} value={form.description_en} onChange={(e) => set('description_en', e.target.value)} placeholder="Product description..." />
        </div>
        <div>
          <label className={labelCls}>Uyumlu Modeller <span className="font-normal normal-case text-text-subtle">(virgülle ayır)</span></label>
          <input className={inputCls} value={form.compatible_models} onChange={(e) => set('compatible_models', e.target.value)} placeholder="Honda CB500F 2013–2023, Honda CB500X 2013–2023" />
        </div>
      </section>

      <section className="bg-surface border border-border rounded-sm p-6 space-y-4">
        <h2 className="font-display font-bold text-primary text-sm uppercase tracking-wider pb-3 border-b border-border">
          Ürün Görseli
        </h2>
        {imageUrl ? (
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 border border-border rounded-sm overflow-hidden bg-surface-muted">
              <Image src={imageUrl} alt="Ürün görseli" fill className="object-contain p-2" />
            </div>
            <button
              type="button"
              onClick={() => setImageUrl(null)}
              className="flex items-center gap-1.5 text-xs text-accent hover:underline"
            >
              <X size={13} /> Görseli kaldır
            </button>
          </div>
        ) : (
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-border rounded-sm text-sm text-text-muted hover:text-primary hover:border-primary transition-colors"
            >
              {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              {uploading ? 'Yükleniyor...' : 'Görsel Yükle'}
            </button>
          </div>
        )}
      </section>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          {mode === 'create' ? 'Ürünü Kaydet' : 'Değişiklikleri Kaydet'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-5 py-3 border border-border text-primary text-sm font-semibold rounded-sm hover:bg-surface-muted transition-colors"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
