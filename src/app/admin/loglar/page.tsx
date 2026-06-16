'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, PackagePlus, PackageCheck, Trash2, Upload, Clock, FileSpreadsheet, ArrowRight } from 'lucide-react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

type LogAction = 'product_create' | 'product_update' | 'product_delete' | 'bulk_upload';

interface FieldChange {
  field: string;
  old: unknown;
  new: unknown;
}

interface LogEntry {
  id: string;
  action: LogAction;
  meta: {
    product_name?: string;
    brand?: string;
    category_id?: string;
    price?: number | null;
    stock?: number;
    changes?: FieldChange[];
    inserted?: number;
    updated?: number;
    skipped?: number;
    failed?: number;
    file_name?: string;
    total_rows?: number;
  };
  created_at: string;
  user_id: string;
}

const ACTION_CONFIG: Record<LogAction, { label: string; icon: React.ReactNode; color: string }> = {
  product_create: {
    label: 'Ürün Eklendi',
    icon: <PackagePlus size={14} />,
    color: 'text-green-700 bg-green-50 border-green-200',
  },
  product_update: {
    label: 'Ürün Güncellendi',
    icon: <PackageCheck size={14} />,
    color: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  product_delete: {
    label: 'Ürün Silindi',
    icon: <Trash2 size={14} />,
    color: 'text-rose-700 bg-rose-50 border-rose-200',
  },
  bulk_upload: {
    label: 'Toplu Yükleme',
    icon: <Upload size={14} />,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
  },
};

const FIELD_LABELS: Record<string, string> = {
  name_tr: 'Ad (TR)',
  name_en: 'Ad (EN)',
  brand: 'Marka',
  price: 'Fiyat',
  stock: 'Stok',
  category_id: 'Kategori',
  subcategory_id: 'Alt Kategori',
  is_active: 'Durum',
  image_url: 'Görsel URL',
};

function formatValue(field: string, value: unknown): string {
  if (value === null || value === undefined || value === 'null') return '—';
  if (field === 'price') return Number(value).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' });
  if (field === 'is_active') return value === true || value === 'true' ? 'Aktif' : 'Pasif';
  if (field === 'image_url' && typeof value === 'string' && value.length > 40) return value.slice(0, 40) + '…';
  return String(value);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('tr-TR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const sb = createSupabaseBrowser();
  const { data: { session } } = await sb.auth.getSession();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.access_token ?? ''}`,
  };
}

export default function LoglarPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAuthHeaders()
      .then((h) => fetch('/api/admin/logs', { headers: h }))
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setLogs(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-black text-2xl text-primary">İşlem Logları</h1>
        <p className="text-text-muted text-sm mt-1">Admin panelinde yapılan tüm işlemlerin kaydı</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 rounded-sm text-rose-700 text-sm mb-6">
          <AlertCircle size={15} /> {error}
        </div>
      )}

      {loading ? (
        <div className="text-text-muted text-sm">Yükleniyor...</div>
      ) : logs.length === 0 ? (
        <div className="bg-surface border border-border rounded-sm p-12 text-center">
          <Clock size={32} className="text-text-subtle mx-auto mb-3" />
          <p className="text-text-muted text-sm">Henüz işlem kaydı bulunmuyor.</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle w-36">Tarih</th>
                <th className="text-left px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle w-36">İşlem</th>
                <th className="text-left px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle">Detay</th>
                <th className="text-left px-4 py-3 text-[11px] font-black tracking-[0.1em] uppercase text-text-subtle hidden md:table-cell w-28">Kullanıcı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => {
                const cfg = ACTION_CONFIG[log.action] ?? {
                  label: log.action,
                  icon: <Clock size={14} />,
                  color: 'text-text-muted bg-surface border-border',
                };
                return (
                  <tr key={log.id} className="hover:bg-surface-muted transition-colors align-top">
                    <td className="px-4 py-3 text-text-muted text-xs whitespace-nowrap">
                      {formatDate(log.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-sm border ${cfg.color}`}>
                        {cfg.icon}
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {log.action === 'bulk_upload' ? (
                        <div className="space-y-1.5">
                          {/* Dosya adı */}
                          {log.meta.file_name && (
                            <div className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                              <FileSpreadsheet size={12} className="text-text-subtle shrink-0" />
                              {log.meta.file_name}
                              {log.meta.total_rows != null && (
                                <span className="text-text-muted font-normal">({log.meta.total_rows} satır)</span>
                              )}
                            </div>
                          )}
                          {/* Sonuç özeti */}
                          <div className="flex flex-wrap gap-3 text-xs">
                            {log.meta.inserted != null && log.meta.inserted > 0 && (
                              <span className="text-green-700 font-semibold">+{log.meta.inserted} eklendi</span>
                            )}
                            {log.meta.updated != null && log.meta.updated > 0 && (
                              <span className="text-blue-700 font-semibold">↻{log.meta.updated} güncellendi</span>
                            )}
                            {log.meta.skipped != null && log.meta.skipped > 0 && (
                              <span className="text-text-muted">→{log.meta.skipped} atlandı</span>
                            )}
                            {log.meta.failed != null && log.meta.failed > 0 && (
                              <span className="text-accent font-semibold">✗{log.meta.failed} başarısız</span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {/* Ürün adı + temel bilgi */}
                          <div className="space-y-0.5">
                            {log.meta.product_name && (
                              <p className="font-semibold text-primary leading-snug">{log.meta.product_name}</p>
                            )}
                            <div className="flex flex-wrap gap-3 text-xs text-text-muted">
                              {log.meta.brand && <span>{log.meta.brand}</span>}
                              {log.meta.category_id && (
                                <span className="font-mono">{log.meta.category_id}</span>
                              )}
                              {log.action === 'product_create' && log.meta.price != null && (
                                <span className="font-semibold text-primary">
                                  {Number(log.meta.price).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                </span>
                              )}
                              {log.action === 'product_create' && log.meta.stock != null && (
                                <span>Stok: {log.meta.stock}</span>
                              )}
                            </div>
                          </div>

                          {/* Değişiklik diff — sadece update'te */}
                          {log.action === 'product_update' && log.meta.changes && log.meta.changes.length > 0 && (
                            <div className="mt-1.5 space-y-1">
                              {log.meta.changes.map((c) => (
                                <div key={c.field} className="flex items-center gap-1.5 text-xs">
                                  <span className="text-text-subtle font-medium w-20 shrink-0">
                                    {FIELD_LABELS[c.field] ?? c.field}
                                  </span>
                                  <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-sm font-mono line-through">
                                    {formatValue(c.field, c.old)}
                                  </span>
                                  <ArrowRight size={10} className="text-text-subtle shrink-0" />
                                  <span className="px-1.5 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded-sm font-mono">
                                    {formatValue(c.field, c.new)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          {log.action === 'product_update' && (!log.meta.changes || log.meta.changes.length === 0) && (
                            <p className="text-xs text-text-subtle italic">Değişiklik yok</p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-subtle text-xs hidden md:table-cell font-mono">
                      {log.user_id.slice(0, 8)}…
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
