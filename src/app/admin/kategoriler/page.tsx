'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Check, X, ChevronRight, AlertCircle, Loader2, FolderOpen, ImagePlus, ImageOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const sb = createSupabaseBrowser();
  const { data: { session } } = await sb.auth.getSession();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token ?? ''}`,
  };
}

interface Subcategory {
  id: string; name_tr: string; name_en: string; slug: string;
  category_id: string; image: string | null;
}
interface Category {
  id: string; name_tr: string; name_en: string; slug: string;
  sort_order: number; image: string | null; subcategories: Subcategory[];
}

const inputCls = 'px-3 py-2 text-sm border border-border rounded-sm bg-surface text-primary placeholder:text-text-subtle focus:outline-none focus:border-primary transition-colors';

// ── Küçük görsel yükleyici bileşeni ─────────────────────────────
function ImageUploader({
  currentImage,
  onUploaded,
  onRemoved,
  folder,
  id,
}: {
  currentImage: string | null;
  onUploaded: (url: string) => void;
  onRemoved: () => void;
  folder: 'categories' | 'subcategories';
  id: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr('');
    const ext = file.name.split('.').pop();
    const path = `${folder}/${id}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from('product-images')
      .upload(path, file, { upsert: true });
    if (upErr) { setErr('Yüklenemedi'); setUploading(false); return; }
    const { data } = supabase.storage.from('product-images').getPublicUrl(path);
    onUploaded(data.publicUrl);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex items-center gap-2">
      {currentImage ? (
        <div className="relative w-10 h-10 rounded-sm overflow-hidden border border-border shrink-0 bg-surface-muted">
          <Image src={currentImage} alt="" fill className="object-cover" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-sm border border-dashed border-border bg-surface-muted flex items-center justify-center shrink-0">
          <ImagePlus size={14} className="text-text-subtle" />
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="px-2 py-1 text-[11px] font-semibold border border-border rounded-sm hover:bg-surface-muted transition-colors text-primary disabled:opacity-50 shrink-0"
      >
        {uploading ? <Loader2 size={11} className="animate-spin inline" /> : (currentImage ? 'Değiştir' : 'Görsel Ekle')}
      </button>
      {currentImage && (
        <button
          type="button"
          onClick={onRemoved}
          className="p-1 text-text-subtle hover:text-accent rounded-sm hover:bg-rose-50 transition-colors"
          title="Görseli kaldır"
        >
          <ImageOff size={13} />
        </button>
      )}
      {err && <span className="text-[11px] text-accent">{err}</span>}
    </div>
  );
}

// ── Ana sayfa ────────────────────────────────────────────────────
export default function KategorilerPage() {
  const [cats, setCats]             = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');

  const [newCatTr, setNewCatTr] = useState('');
  const [newCatEn, setNewCatEn] = useState('');
  const [addingCat, setAddingCat] = useState(false);

  const [editCatId, setEditCatId] = useState<string | null>(null);
  const [editCatTr, setEditCatTr] = useState('');
  const [editCatEn, setEditCatEn] = useState('');
  const [editCatImg, setEditCatImg] = useState<string | null>(null);

  const [newSubTr, setNewSubTr] = useState('');
  const [newSubEn, setNewSubEn] = useState('');
  const [addingSub, setAddingSub] = useState(false);

  const [editSubId, setEditSubId] = useState<string | null>(null);
  const [editSubTr, setEditSubTr] = useState('');
  const [editSubEn, setEditSubEn] = useState('');
  const [editSubImg, setEditSubImg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/admin/categories', { headers: await getAuthHeaders() });
    if (!res.ok) { setError('Kategoriler yüklenemedi'); setLoading(false); return; }
    const data: Category[] = await res.json();
    setCats(data);
    if (data.length > 0 && !selectedId) setSelectedId(data[0].id);
    setLoading(false);
  }, [selectedId]);

  useEffect(() => { load(); }, []);

  const selected = cats.find((c) => c.id === selectedId) ?? null;

  // ── Kategori Ekle ─────────────────────────────────────────────
  const handleAddCat = async () => {
    if (!newCatTr.trim()) return;
    setAddingCat(true);
    const res = await fetch('/api/admin/categories', {
      method: 'POST', headers: await getAuthHeaders(),
      body: JSON.stringify({ name_tr: newCatTr.trim(), name_en: newCatEn.trim() || newCatTr.trim() }),
    });
    if (!res.ok) { setError('Kategori eklenemedi'); setAddingCat(false); return; }
    const cat: Category = await res.json();
    setCats((prev) => [...prev, { ...cat, subcategories: [] }]);
    setSelectedId(cat.id);
    setNewCatTr(''); setNewCatEn('');
    setAddingCat(false);
  };

  // ── Kategori Düzenle ──────────────────────────────────────────
  const startEditCat = (cat: Category) => {
    setEditCatId(cat.id); setEditCatTr(cat.name_tr);
    setEditCatEn(cat.name_en); setEditCatImg(cat.image ?? null);
  };
  const handleEditCat = async (id: string) => {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT', headers: await getAuthHeaders(),
      body: JSON.stringify({ name_tr: editCatTr.trim(), name_en: editCatEn.trim() || editCatTr.trim(), image: editCatImg }),
    });
    if (!res.ok) { setError('Güncellenemedi'); return; }
    const updated: Category = await res.json();
    setCats((prev) => prev.map((c) => c.id === id ? { ...c, ...updated } : c));
    setEditCatId(null);
  };

  // ── Kategori Sil ──────────────────────────────────────────────
  const handleDeleteCat = async (id: string, name: string) => {
    if (!confirm(`"${name}" kategorisi ve tüm alt kategorileri silinecek. Emin misin?`)) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE', headers: await getAuthHeaders() });
    if (!res.ok) { setError('Silinemedi'); return; }
    setCats((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(cats.find((c) => c.id !== id)?.id ?? null);
  };

  // ── Kategori görsel güncelleme (inline, edit modunda) ─────────
  const updateCatImage = async (id: string, image: string | null) => {
    const cat = cats.find((c) => c.id === id);
    if (!cat) return;
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT', headers: await getAuthHeaders(),
      body: JSON.stringify({ name_tr: cat.name_tr, name_en: cat.name_en, image }),
    });
    if (!res.ok) { setError('Görsel güncellenemedi'); return; }
    const updated: Category = await res.json();
    setCats((prev) => prev.map((c) => c.id === id ? { ...c, image: updated.image } : c));
  };

  // ── Alt Kategori Ekle ─────────────────────────────────────────
  const handleAddSub = async () => {
    if (!newSubTr.trim() || !selectedId) return;
    setAddingSub(true);
    const res = await fetch('/api/admin/categories/subcategories', {
      method: 'POST', headers: await getAuthHeaders(),
      body: JSON.stringify({ category_id: selectedId, name_tr: newSubTr.trim(), name_en: newSubEn.trim() || newSubTr.trim() }),
    });
    if (!res.ok) { setError('Alt kategori eklenemedi'); setAddingSub(false); return; }
    const sub: Subcategory = await res.json();
    setCats((prev) => prev.map((c) => c.id === selectedId ? { ...c, subcategories: [...c.subcategories, sub] } : c));
    setNewSubTr(''); setNewSubEn('');
    setAddingSub(false);
  };

  // ── Alt Kategori Düzenle ──────────────────────────────────────
  const startEditSub = (sub: Subcategory) => {
    setEditSubId(sub.id); setEditSubTr(sub.name_tr);
    setEditSubEn(sub.name_en); setEditSubImg(sub.image ?? null);
  };
  const handleEditSub = async (id: string) => {
    const res = await fetch(`/api/admin/categories/subcategories/${id}`, {
      method: 'PUT', headers: await getAuthHeaders(),
      body: JSON.stringify({ name_tr: editSubTr.trim(), name_en: editSubEn.trim() || editSubTr.trim(), image: editSubImg }),
    });
    if (!res.ok) { setError('Güncellenemedi'); return; }
    const updated: Subcategory = await res.json();
    setCats((prev) => prev.map((c) => ({
      ...c,
      subcategories: c.subcategories.map((s) => s.id === id ? { ...s, ...updated } : s),
    })));
    setEditSubId(null);
  };

  // ── Alt Kategori Sil ──────────────────────────────────────────
  const handleDeleteSub = async (id: string, name: string) => {
    if (!confirm(`"${name}" alt kategorisi silinecek. Emin misin?`)) return;
    const res = await fetch(`/api/admin/categories/subcategories/${id}`, { method: 'DELETE', headers: await getAuthHeaders() });
    if (!res.ok) { setError('Silinemedi'); return; }
    setCats((prev) => prev.map((c) => ({ ...c, subcategories: c.subcategories.filter((s) => s.id !== id) })));
  };

  // ── Alt kategori görsel güncelleme (inline) ───────────────────
  const updateSubImage = async (sub: Subcategory, image: string | null) => {
    const res = await fetch(`/api/admin/categories/subcategories/${sub.id}`, {
      method: 'PUT', headers: await getAuthHeaders(),
      body: JSON.stringify({ name_tr: sub.name_tr, name_en: sub.name_en, image }),
    });
    if (!res.ok) { setError('Görsel güncellenemedi'); return; }
    const updated: Subcategory = await res.json();
    setCats((prev) => prev.map((c) => ({
      ...c,
      subcategories: c.subcategories.map((s) => s.id === sub.id ? { ...s, image: updated.image } : s),
    })));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-black text-2xl text-primary">Kategori Yönetimi</h1>
        <p className="text-text-muted text-sm mt-1">{cats.length} kategori</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-sm text-rose-700 text-sm mb-5">
          <AlertCircle size={14} />
          {error}
          <button className="ml-auto text-rose-400 hover:text-rose-700" onClick={() => setError('')}><X size={13} /></button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <Loader2 size={15} className="animate-spin" /> Yükleniyor...
        </div>
      ) : (
        <div className="flex gap-5 items-start">

          {/* ── Sol: Kategoriler ── */}
          <div className="w-72 shrink-0 space-y-3">
            <div className="bg-surface border border-border rounded-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-border bg-surface-muted">
                <span className="text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">Ana Kategoriler</span>
              </div>

              {cats.length === 0 ? (
                <div className="p-6 text-center text-text-muted text-sm">
                  <FolderOpen size={24} className="mx-auto mb-2 text-text-subtle" />
                  Henüz kategori yok
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {cats.map((cat) => (
                    <li key={cat.id}>
                      {editCatId === cat.id ? (
                        <div className="p-3 space-y-2 bg-surface-muted">
                          <input className={inputCls + ' w-full'} value={editCatTr} onChange={(e) => setEditCatTr(e.target.value)} placeholder="Türkçe ad" />
                          <input className={inputCls + ' w-full'} value={editCatEn} onChange={(e) => setEditCatEn(e.target.value)} placeholder="İngilizce ad" />
                          {/* Görsel yükleme — edit modunda */}
                          <div className="pt-1">
                            <p className="text-[10px] text-text-subtle mb-1.5 font-semibold uppercase tracking-wider">Kart Görseli</p>
                            <ImageUploader
                              currentImage={editCatImg}
                              folder="categories"
                              id={cat.id}
                              onUploaded={(url) => setEditCatImg(url)}
                              onRemoved={() => setEditCatImg(null)}
                            />
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button onClick={() => handleEditCat(cat.id)} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-sm hover:bg-primary-dark transition-colors">
                              <Check size={12} /> Kaydet
                            </button>
                            <button onClick={() => setEditCatId(null)} className="px-3 py-1.5 border border-border text-text-muted text-xs rounded-sm hover:bg-surface transition-colors">
                              İptal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setSelectedId(cat.id); setEditSubId(null); }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors group ${
                            selectedId === cat.id ? 'bg-primary/8 text-primary font-semibold' : 'hover:bg-surface-muted text-text-muted'
                          }`}
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <ChevronRight size={13} className={`shrink-0 transition-transform ${selectedId === cat.id ? 'rotate-90 text-accent' : ''}`} />
                            {/* Küçük görsel önizleme */}
                            {cat.image ? (
                              <span className="relative w-5 h-5 rounded-sm overflow-hidden shrink-0 border border-border">
                                <Image src={cat.image} alt="" fill className="object-cover" />
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-sm border border-dashed border-border/60 bg-surface-muted shrink-0 flex items-center justify-center">
                                <ImagePlus size={9} className="text-text-subtle" />
                              </span>
                            )}
                            <span className="truncate">{cat.name_tr}</span>
                          </span>
                          <span className="shrink-0 text-[10px] text-text-subtle mr-1">{cat.subcategories.length}</span>
                          <span className="flex shrink-0 gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span onClick={(e) => { e.stopPropagation(); startEditCat(cat); }} className="p-1 hover:text-primary rounded-sm">
                              <Pencil size={12} />
                            </span>
                            <span onClick={(e) => { e.stopPropagation(); handleDeleteCat(cat.id, cat.name_tr); }} className="p-1 hover:text-accent rounded-sm">
                              <Trash2 size={12} />
                            </span>
                          </span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Kategori ekle formu */}
            <div className="bg-surface border border-border rounded-sm p-4 space-y-2">
              <p className="text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle mb-3">Yeni Kategori</p>
              <input className={inputCls + ' w-full'} value={newCatTr} onChange={(e) => setNewCatTr(e.target.value)} placeholder="Türkçe ad *" onKeyDown={(e) => e.key === 'Enter' && handleAddCat()} />
              <input className={inputCls + ' w-full'} value={newCatEn} onChange={(e) => setNewCatEn(e.target.value)} placeholder="İngilizce ad" onKeyDown={(e) => e.key === 'Enter' && handleAddCat()} />
              <button
                onClick={handleAddCat}
                disabled={addingCat || !newCatTr.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {addingCat ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                Kategori Ekle
              </button>
            </div>
          </div>

          {/* ── Sağ: Alt Kategoriler ── */}
          <div className="flex-1 space-y-3">
            {!selected ? (
              <div className="bg-surface border border-border rounded-sm p-12 text-center text-text-muted text-sm">
                <FolderOpen size={28} className="mx-auto mb-3 text-text-subtle" />
                Sol taraftan bir kategori seç
              </div>
            ) : (
              <>
                {/* Seçili kategorinin görseli */}
                <div className="bg-surface border border-border rounded-sm p-4">
                  <p className="text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle mb-3">
                    {selected.name_tr} — Kart Görseli
                  </p>
                  <div className="flex items-center gap-4">
                    {selected.image ? (
                      <div className="relative w-20 h-20 rounded-sm overflow-hidden border border-border bg-surface-muted shrink-0">
                        <Image src={selected.image} alt="" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-sm border border-dashed border-border bg-surface-muted flex items-center justify-center shrink-0">
                        <ImagePlus size={20} className="text-text-subtle" />
                      </div>
                    )}
                    <ImageUploader
                      currentImage={selected.image ?? null}
                      folder="categories"
                      id={selected.id}
                      onUploaded={(url) => updateCatImage(selected.id, url)}
                      onRemoved={() => updateCatImage(selected.id, null)}
                    />
                  </div>
                </div>

                {/* Alt kategoriler listesi */}
                <div className="bg-surface border border-border rounded-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-border bg-surface-muted flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">Alt Kategoriler</span>
                      <span className="ml-2 text-primary font-semibold text-sm">— {selected.name_tr}</span>
                    </div>
                    <span className="text-xs text-text-subtle">{selected.subcategories.length} alt kategori</span>
                  </div>

                  {selected.subcategories.length === 0 ? (
                    <div className="p-8 text-center text-text-muted text-sm">Bu kategoriye henüz alt kategori eklenmemiş.</div>
                  ) : (
                    <ul className="divide-y divide-border">
                      {selected.subcategories.map((sub) => (
                        <li key={sub.id} className="group">
                          {editSubId === sub.id ? (
                            <div className="px-5 py-4 space-y-3 bg-surface-muted">
                              <div className="flex items-center gap-3">
                                <input className={inputCls + ' flex-1'} value={editSubTr} onChange={(e) => setEditSubTr(e.target.value)} placeholder="Türkçe ad" />
                                <input className={inputCls + ' flex-1'} value={editSubEn} onChange={(e) => setEditSubEn(e.target.value)} placeholder="İngilizce ad" />
                                <button onClick={() => handleEditSub(sub.id)} className="p-1.5 bg-primary text-white rounded-sm hover:bg-primary-dark transition-colors">
                                  <Check size={13} />
                                </button>
                                <button onClick={() => setEditSubId(null)} className="p-1.5 border border-border text-text-muted rounded-sm hover:bg-surface transition-colors">
                                  <X size={13} />
                                </button>
                              </div>
                              {/* Alt kategori görsel yükleme */}
                              <div>
                                <p className="text-[10px] text-text-subtle mb-1.5 font-semibold uppercase tracking-wider">Kart Görseli</p>
                                <ImageUploader
                                  currentImage={editSubImg}
                                  folder="subcategories"
                                  id={sub.id}
                                  onUploaded={(url) => setEditSubImg(url)}
                                  onRemoved={() => setEditSubImg(null)}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="px-5 py-3 flex items-center justify-between hover:bg-surface-muted transition-colors">
                              <div className="flex items-center gap-3 min-w-0">
                                {/* Mini görsel önizleme */}
                                {sub.image ? (
                                  <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-border shrink-0">
                                    <Image src={sub.image} alt="" fill className="object-cover" />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-sm border border-dashed border-border bg-surface-muted flex items-center justify-center shrink-0">
                                    <ImagePlus size={11} className="text-text-subtle" />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-primary truncate">{sub.name_tr}</p>
                                  <p className="text-xs text-text-subtle">{sub.name_en} · <span className="font-mono">{sub.slug}</span></p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-3 shrink-0">
                                {/* Inline görsel yükleyici (edit moduna girmeden) */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ImageUploader
                                    currentImage={sub.image ?? null}
                                    folder="subcategories"
                                    id={sub.id}
                                    onUploaded={(url) => updateSubImage(sub, url)}
                                    onRemoved={() => updateSubImage(sub, null)}
                                  />
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => startEditSub(sub)} className="p-1.5 text-text-muted hover:text-primary hover:bg-surface rounded-sm transition-colors">
                                    <Pencil size={13} />
                                  </button>
                                  <button onClick={() => handleDeleteSub(sub.id, sub.name_tr)} className="p-1.5 text-text-muted hover:text-accent hover:bg-rose-50 rounded-sm transition-colors">
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Alt kategori ekle */}
                <div className="bg-surface border border-border rounded-sm p-4">
                  <p className="text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle mb-3">Yeni Alt Kategori</p>
                  <div className="flex gap-3">
                    <input className={inputCls + ' flex-1'} value={newSubTr} onChange={(e) => setNewSubTr(e.target.value)} placeholder="Türkçe ad *" onKeyDown={(e) => e.key === 'Enter' && handleAddSub()} />
                    <input className={inputCls + ' flex-1'} value={newSubEn} onChange={(e) => setNewSubEn(e.target.value)} placeholder="İngilizce ad" onKeyDown={(e) => e.key === 'Enter' && handleAddSub()} />
                    <button
                      onClick={handleAddSub}
                      disabled={addingSub || !newSubTr.trim()}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors disabled:opacity-50 shrink-0"
                    >
                      {addingSub ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                      Ekle
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
