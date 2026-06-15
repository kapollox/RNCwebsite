'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Upload, Download, CheckCircle2, XCircle, AlertCircle,
  Loader2, FileSpreadsheet, X, RotateCcw, ChevronDown, ChevronUp,
  RefreshCcw, SkipForward, AlertTriangle,
} from 'lucide-react';
import type { DuplicateMode, BulkResult } from '@/app/api/admin/products/bulk/route';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const sb = createSupabaseBrowser();
  const { data: { session } } = await sb.auth.getSession();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token ?? ''}`,
  };
}

const KNOWN_BRANDS = ['RKS Motor', 'Kuba Motor', 'Mondial', 'Arora', 'Yuki'];
const COLUMNS = [
  'brand', 'name_tr', 'name_en', 'category', 'subcategory',
  'price', 'stock', 'description_tr', 'description_en', 'image_url',
];

interface CatRef { id: string; name_tr: string; slug: string; }
interface SubRef { id: string; name_tr: string; slug: string; category_id: string; }

interface RawRow {
  brand: string; name_tr: string; name_en: string;
  category: string; subcategory: string;
  price: string; stock: string;
  description_tr: string; description_en: string; image_url: string;
}

interface ValidatedRow extends RawRow {
  _errors: string[];
  _valid: boolean;
  _index: number;
  _resolvedCatId: string | null;   // çözümlenmiş kategori slug
  _resolvedSubId: string | null;
}

function toSlug(text: string): string {
  return text.toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function resolveCat(value: string, cats: CatRef[]): CatRef | null {
  if (!value.trim()) return null;
  const slug = toSlug(value.trim());
  return cats.find((c) => c.slug === value.trim() || c.slug === slug || toSlug(c.name_tr) === slug) ?? null;
}

function resolveSub(value: string, catId: string, subs: SubRef[]): SubRef | null {
  if (!value.trim()) return null;
  const slug = toSlug(value.trim());
  return subs.find(
    (s) => s.category_id === catId && (s.slug === value.trim() || s.slug === slug || toSlug(s.name_tr) === slug)
  ) ?? null;
}

function validateRow(row: RawRow, index: number, cats: CatRef[], subs: SubRef[]): ValidatedRow {
  const errors: string[] = [];
  if (!row.name_tr?.trim()) errors.push('name_tr zorunlu');
  if (!row.brand?.trim()) errors.push('brand zorunlu');

  const cat = resolveCat(row.category, cats);
  if (!row.category?.trim()) {
    errors.push('category zorunlu');
  } else if (!cat) {
    errors.push(`"${row.category}" kategorisi bulunamadı`);
  }

  let sub: SubRef | null = null;
  if (cat && row.subcategory?.trim()) {
    sub = resolveSub(row.subcategory, cat.id, subs);
    if (!sub) errors.push(`"${row.subcategory}" alt kategorisi bulunamadı`);
  }

  if (row.price && isNaN(parseFloat(row.price))) errors.push('price sayı olmalı');
  if (row.stock && isNaN(parseInt(row.stock, 10))) errors.push('stock tam sayı olmalı');

  return {
    ...row,
    _errors: errors,
    _valid: errors.length === 0,
    _index: index,
    _resolvedCatId: cat?.id ?? null,
    _resolvedSubId: sub?.id ?? null,
  };
}

function downloadTemplate() {
  const exampleRows = [
    { brand: 'RKS Motor', name_tr: 'Ön Far Grubu', name_en: 'Front Headlight Assembly', category: 'aydinlatma-grubu', subcategory: 'far-grubu', price: '450', stock: '10', description_tr: 'Orijinal ön far grubu', description_en: 'Original front headlight assembly', image_url: '' },
    { brand: 'Kuba Motor', name_tr: 'Disk Balatası Set', name_en: 'Disc Brake Pad Set', category: 'Motor Aksamı', subcategory: 'Piston', price: '280', stock: '25', description_tr: 'Yüksek performanslı disk balata seti', description_en: 'High performance disc brake pad set', image_url: '' },
  ];
  const ws = XLSX.utils.json_to_sheet(exampleRows, { header: COLUMNS });
  ws['!cols'] = [{ wch: 14 }, { wch: 28 }, { wch: 28 }, { wch: 28 }, { wch: 22 }, { wch: 10 }, { wch: 8 }, { wch: 32 }, { wch: 32 }, { wch: 40 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Ürünler');
  const wsMarkas = XLSX.utils.json_to_sheet(KNOWN_BRANDS.map((b) => ({ Marka: b })));
  XLSX.utils.book_append_sheet(wb, wsMarkas, 'Markalar');
  XLSX.writeFile(wb, 'rnc-urun-sablonu.xlsx');
}

const DUPLICATE_OPTIONS: { value: DuplicateMode; label: string; desc: string; icon: React.ReactNode }[] = [
  { value: 'skip',   label: 'Atla',     desc: 'Mevcut ürünü değiştirme, sadece yeni olanları ekle',  icon: <SkipForward size={14} /> },
  { value: 'update', label: 'Güncelle', desc: 'Aynı isimli ürünü yeni verilerle güncelle',            icon: <RefreshCcw size={14} /> },
  { value: 'error',  label: 'Hata Ver', desc: 'Aynı isimli ürün varsa o satırı hata olarak işaretle', icon: <AlertTriangle size={14} /> },
];

export default function TopluYuklePage() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [cats, setCats]   = useState<CatRef[]>([]);
  const [subs, setSubs]   = useState<SubRef[]>([]);
  const [catsLoading, setCatsLoading] = useState(true);

  const [rows, setRows]         = useState<ValidatedRow[]>([]);
  const [fileName, setFileName] = useState('');
  const [duplicateMode, setDuplicateMode] = useState<DuplicateMode>('skip');
  const [uploading, setUploading]         = useState(false);
  const [uploadDone, setUploadDone]       = useState(false);
  const [uploadResults, setUploadResults] = useState<BulkResult[]>([]);
  const [globalError, setGlobalError]     = useState('');
  const [expandedRows, setExpandedRows]   = useState<Set<number>>(new Set());

  // Kategori listesini çek
  useEffect(() => {
    getAuthHeaders()
      .then((h) => fetch('/api/admin/products/bulk', { headers: h }))
      .then((r) => r.json())
      .then((d) => { setCats(d.categories ?? []); setSubs(d.subcategories ?? []); })
      .catch(() => setGlobalError('Kategori listesi yüklenemedi.'))
      .finally(() => setCatsLoading(false));
  }, []);

  const validRows   = rows.filter((r) => r._valid);
  const invalidRows = rows.filter((r) => !r._valid);

  const handleFile = useCallback((file: File, catList: CatRef[], subList: SubRef[]) => {
    setGlobalError(''); setUploadDone(false); setUploadResults([]);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw: Record<string, string>[] = XLSX.utils.sheet_to_json(ws, { defval: '' });
        if (raw.length === 0) { setGlobalError('Dosya boş veya okunamadı.'); return; }
        setRows(raw.map((r, i) => validateRow({
          brand: String(r['brand'] ?? ''), name_tr: String(r['name_tr'] ?? ''),
          name_en: String(r['name_en'] ?? ''), category: String(r['category'] ?? ''),
          subcategory: String(r['subcategory'] ?? ''), price: String(r['price'] ?? ''),
          stock: String(r['stock'] ?? ''), description_tr: String(r['description_tr'] ?? ''),
          description_en: String(r['description_en'] ?? ''), image_url: String(r['image_url'] ?? ''),
        }, i, catList, subList)));
      } catch {
        setGlobalError('Dosya okunamadı. Geçerli bir .xlsx veya .csv dosyası yükleyin.');
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file, cats, subs);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file, cats, subs);
  };

  const reset = () => {
    setRows([]); setFileName(''); setUploadDone(false);
    setUploadResults([]); setGlobalError(''); setExpandedRows(new Set());
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (validRows.length === 0) return;
    setUploading(true); setGlobalError('');
    const payload = validRows.map(({ _errors: _e, _valid: _v, _index: _i, _resolvedCatId: _rc, _resolvedSubId: _rs, ...rest }) => rest);
    const res = await fetch('/api/admin/products/bulk', {
      method: 'POST',
      headers: await getAuthHeaders(),
      body: JSON.stringify({ rows: payload, duplicateMode }),
    });
    if (!res.ok) { setGlobalError('Sunucu hatası: ' + res.status); setUploading(false); return; }
    const results: BulkResult[] = await res.json();
    setUploadResults(results);
    setUploadDone(true);
    setUploading(false);
  };

  const toggleExpand = (i: number) =>
    setExpandedRows((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const inserted = uploadResults.filter((r) => r.ok && r.action === 'inserted');
  const updated  = uploadResults.filter((r) => r.ok && r.action === 'updated');
  const skipped  = uploadResults.filter((r) => r.ok && r.action === 'skipped');
  const failed   = uploadResults.filter((r) => !r.ok);

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-primary">Toplu Ürün Yükleme</h1>
          <p className="text-text-muted text-sm mt-1">Excel veya CSV dosyasından toplu ürün ekle</p>
        </div>
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border text-primary text-sm font-semibold rounded-sm hover:bg-surface-muted transition-colors shrink-0"
        >
          <Download size={15} />
          Şablon İndir
        </button>
      </div>

      {globalError && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-sm text-rose-700 text-sm mb-5">
          <AlertCircle size={14} /> {globalError}
          <button className="ml-auto" onClick={() => setGlobalError('')}><X size={13} /></button>
        </div>
      )}

      {/* ── Yükleme Sonucu ── */}
      {uploadDone && (
        <div className="space-y-4 mb-6">
          {/* Özet */}
          <div className={`p-4 rounded-sm border ${failed.length === 0 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-center gap-2 font-semibold text-sm mb-2">
              {failed.length === 0
                ? <><CheckCircle2 size={16} className="text-green-600" /><span className="text-green-800">Yükleme tamamlandı</span></>
                : <><AlertCircle size={16} className="text-amber-600" /><span className="text-amber-800">Kısmen başarılı</span></>
              }
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {inserted.length > 0 && <span className="text-green-700 font-semibold">✓ {inserted.length} eklendi</span>}
              {updated.length  > 0 && <span className="text-blue-700  font-semibold">↻ {updated.length} güncellendi</span>}
              {skipped.length  > 0 && <span className="text-text-muted font-semibold">→ {skipped.length} atlandı</span>}
              {failed.length   > 0 && <span className="text-accent    font-semibold">✗ {failed.length} başarısız</span>}
            </div>
          </div>

          {/* Başarısız satırlar */}
          {failed.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-sm p-4">
              <p className="text-xs font-bold text-accent mb-2 uppercase tracking-wider">Başarısız Kayıtlar</p>
              <ul className="space-y-1">
                {failed.map((r) => (
                  <li key={r.index} className="text-xs text-rose-700">
                    Satır {r.index + 1}: {r.error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Başarılı ürün listesi */}
          {(inserted.length > 0 || updated.length > 0) && (
            <div className="bg-surface border border-border rounded-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-surface-muted">
                <span className="text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">
                  Eklenen / Güncellenen Ürünler ({inserted.length + updated.length})
                </span>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-surface-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-2 text-left font-bold text-text-subtle w-8">#</th>
                    <th className="px-4 py-2 text-left font-bold text-text-subtle">İşlem</th>
                    <th className="px-4 py-2 text-left font-bold text-text-subtle">Marka</th>
                    <th className="px-4 py-2 text-left font-bold text-text-subtle">Ürün Adı (TR)</th>
                    <th className="px-4 py-2 text-left font-bold text-text-subtle">Kategori</th>
                    <th className="px-4 py-2 text-left font-bold text-text-subtle">Fiyat</th>
                    <th className="px-4 py-2 text-left font-bold text-text-subtle">Stok</th>
                    <th className="px-4 py-2 w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[...inserted, ...updated].map((r) => (
                    <>
                      <tr key={r.index} className="hover:bg-surface-muted transition-colors">
                        <td className="px-4 py-2.5 text-text-subtle">{r.index + 1}</td>
                        <td className="px-4 py-2.5">
                          {r.action === 'inserted'
                            ? <span className="inline-flex items-center gap-1 text-green-700 font-semibold"><CheckCircle2 size={11} /> Eklendi</span>
                            : <span className="inline-flex items-center gap-1 text-blue-700 font-semibold"><RefreshCcw size={11} /> Güncellendi</span>
                          }
                        </td>
                        <td className="px-4 py-2.5 font-semibold text-primary">{r.product?.brand ?? '—'}</td>
                        <td className="px-4 py-2.5 text-primary max-w-[200px] truncate">{r.product?.name_tr}</td>
                        <td className="px-4 py-2.5 text-text-muted font-mono">{r.product?.category_id}</td>
                        <td className="px-4 py-2.5 text-text-muted whitespace-nowrap">
                          {r.product?.price != null ? `${r.product.price.toLocaleString('tr-TR')} ₺` : '—'}
                        </td>
                        <td className="px-4 py-2.5 text-text-muted">{r.product?.stock}</td>
                        <td className="px-4 py-2.5">
                          <button onClick={() => toggleExpand(r.index)} className="p-0.5 text-text-subtle hover:text-primary transition-colors">
                            {expandedRows.has(r.index) ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          </button>
                        </td>
                      </tr>
                      {expandedRows.has(r.index) && r.product && (
                        <tr key={`${r.index}-detail`} className="bg-surface-muted">
                          <td colSpan={8} className="px-4 py-3">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-text-muted">
                              <div><span className="font-semibold text-primary">İngilizce Ad:</span> {r.product.name_en}</div>
                              <div><span className="font-semibold text-primary">Alt Kategori:</span> {r.product.subcategory_id ?? '—'}</div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 border border-border text-primary text-sm font-semibold rounded-sm hover:bg-surface-muted transition-colors">
            <RotateCcw size={14} /> Yeni Yükleme Yap
          </button>
        </div>
      )}

      {/* ── Dosya yükleme + önizleme ── */}
      {!uploadDone && (
        <>
          {rows.length === 0 ? (
            <div
              onDrop={onDrop} onDragOver={(e) => e.preventDefault()}
              onClick={() => !catsLoading && inputRef.current?.click()}
              className={`border-2 border-dashed border-border rounded-sm p-16 text-center transition-colors ${catsLoading ? 'cursor-wait opacity-60' : 'cursor-pointer hover:border-primary hover:bg-surface-muted'}`}
            >
              {catsLoading
                ? <><Loader2 size={28} className="mx-auto mb-3 text-text-subtle animate-spin" /><p className="text-text-muted text-sm">Kategoriler yükleniyor...</p></>
                : <><FileSpreadsheet size={40} className="mx-auto mb-4 text-text-subtle" />
                    <p className="text-primary font-semibold text-sm mb-1">Excel veya CSV dosyası sürükle ya da tıkla</p>
                    <p className="text-text-subtle text-xs">.xlsx, .xls, .csv — maks. 5 MB</p>
                  </>
              }
              <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={onInputChange} />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Özet bar */}
              <div className="flex items-center gap-4 p-4 bg-surface border border-border rounded-sm">
                <FileSpreadsheet size={20} className="text-text-subtle shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-primary truncate">{fileName}</p>
                  <p className="text-xs text-text-muted">{rows.length} satır okundu</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-green-700">
                    <CheckCircle2 size={15} />{validRows.length} geçerli
                  </span>
                  {invalidRows.length > 0 && (
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                      <XCircle size={15} />{invalidRows.length} hatalı
                    </span>
                  )}
                  <button onClick={reset} className="p-1.5 text-text-subtle hover:text-primary rounded-sm hover:bg-surface-muted transition-colors" title="Temizle">
                    <RotateCcw size={15} />
                  </button>
                </div>
              </div>

              {/* Duplicate mod seçimi */}
              <div className="bg-surface border border-border rounded-sm p-4">
                <p className="text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle mb-3">Aynı Ürün Varsa Ne Yapılsın?</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  {DUPLICATE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex-1 flex items-start gap-3 p-3 rounded-sm border cursor-pointer transition-colors ${
                        duplicateMode === opt.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40 hover:bg-surface-muted'
                      }`}
                    >
                      <input
                        type="radio" name="duplicateMode" value={opt.value}
                        checked={duplicateMode === opt.value}
                        onChange={() => setDuplicateMode(opt.value)}
                        className="mt-0.5 accent-primary shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mb-0.5">
                          {opt.icon}{opt.label}
                        </div>
                        <p className="text-xs text-text-muted leading-snug">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Önizleme tablosu */}
              <div className="bg-surface border border-border rounded-sm overflow-hidden">
                <div className="overflow-x-auto max-h-[440px] overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-surface-muted border-b border-border z-10">
                      <tr>
                        <th className="px-3 py-2 text-left font-bold text-text-subtle w-8">#</th>
                        <th className="px-3 py-2 text-left font-bold text-text-subtle w-8"></th>
                        <th className="px-3 py-2 text-left font-bold text-text-subtle">Marka</th>
                        <th className="px-3 py-2 text-left font-bold text-text-subtle">Ürün Adı (TR)</th>
                        <th className="px-3 py-2 text-left font-bold text-text-subtle">Kategori</th>
                        <th className="px-3 py-2 text-left font-bold text-text-subtle">Alt Kategori</th>
                        <th className="px-3 py-2 text-left font-bold text-text-subtle">Fiyat</th>
                        <th className="px-3 py-2 text-left font-bold text-text-subtle">Stok</th>
                        <th className="px-3 py-2 text-left font-bold text-text-subtle">Hata</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {rows.map((row) => (
                        <tr key={row._index} className={row._valid ? 'bg-green-50/40' : 'bg-rose-50/60'}>
                          <td className="px-3 py-2 text-text-subtle">{row._index + 1}</td>
                          <td className="px-3 py-2">
                            {row._valid
                              ? <CheckCircle2 size={14} className="text-green-600" />
                              : <XCircle size={14} className="text-accent" />
                            }
                          </td>
                          <td className="px-3 py-2 font-semibold text-primary whitespace-nowrap">
                            {row.brand || <span className="text-accent">—</span>}
                          </td>
                          <td className="px-3 py-2 text-primary max-w-[180px] truncate">
                            {row.name_tr || <span className="text-accent">—</span>}
                          </td>
                          <td className="px-3 py-2 max-w-[140px]">
                            {row._resolvedCatId
                              ? <span className="text-text-muted font-mono truncate block">{row._resolvedCatId}</span>
                              : <span className="text-accent">{row.category || '—'}</span>
                            }
                          </td>
                          <td className="px-3 py-2 max-w-[140px]">
                            {row._resolvedSubId
                              ? <span className="text-text-muted font-mono truncate block">{row._resolvedSubId}</span>
                              : <span className="text-text-subtle">{row.subcategory || '—'}</span>
                            }
                          </td>
                          <td className="px-3 py-2 text-text-muted whitespace-nowrap">
                            {row.price ? `${row.price} ₺` : '—'}
                          </td>
                          <td className="px-3 py-2 text-text-muted">{row.stock || '0'}</td>
                          <td className="px-3 py-2 text-accent max-w-[200px]">
                            {row._errors.length > 0 && (
                              <span className="line-clamp-2">{row._errors.join(' · ')}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Aksiyon butonları */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-text-muted text-sm">
                  {validRows.length > 0
                    ? <><span className="font-semibold text-primary">{validRows.length} ürün</span> Supabase&apos;e eklenecek.</>
                    : 'Yüklenecek geçerli ürün yok.'
                  }
                  {invalidRows.length > 0 && (
                    <span className="ml-2 text-accent">({invalidRows.length} hatalı satır atlanacak)</span>
                  )}
                </p>
                <div className="flex gap-3">
                  <button onClick={reset} className="px-4 py-2.5 border border-border text-primary text-sm font-semibold rounded-sm hover:bg-surface-muted transition-colors">
                    Yeni Dosya
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={uploading || validRows.length === 0}
                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {uploading
                      ? <><Loader2 size={15} className="animate-spin" />Yükleniyor...</>
                      : <><Upload size={15} />{validRows.length} Ürün Yükle</>
                    }
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Bilgi kutusu */}
      {!uploadDone && (
        <div className="mt-8 p-5 bg-surface border border-border rounded-sm">
          <p className="text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle mb-3">Kullanım Kılavuzu</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-muted">
            <div>
              <p className="font-semibold text-primary mb-1.5">Zorunlu Alanlar</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><code className="bg-surface-muted px-1 rounded">brand</code> — marka adı</li>
                <li><code className="bg-surface-muted px-1 rounded">name_tr</code> — Türkçe ürün adı</li>
                <li><code className="bg-surface-muted px-1 rounded">category</code> — kategori adı veya slug (örn: <code className="bg-surface-muted px-1 rounded">Motor Aksamı</code> veya <code className="bg-surface-muted px-1 rounded">motor-aksami</code>)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary mb-1.5">İpuçları</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Şablonu indir, doldurup geri yükle</li>
                <li>category ve subcategory için hem Türkçe ad hem slug kabul edilir</li>
                <li>Önizlemede yeşil = geçerli, kırmızı = hatalı</li>
                <li>Çözümlenen kategori/alt kategori slug olarak gösterilir</li>
              </ul>
            </div>
          </div>
          {cats.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="font-semibold text-primary text-xs mb-2">Mevcut Kategoriler ({cats.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {cats.map((c) => (
                  <span key={c.id} className="px-2 py-0.5 bg-surface-muted border border-border rounded-sm text-[11px] font-mono text-text-muted" title={c.name_tr}>
                    {c.slug}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
