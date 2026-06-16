import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { requireAdmin } from '@/lib/admin-auth';
import { writeLog } from '@/lib/admin-log';

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

const BRAND_ALIASES: [canonical: string, aliases: string[]][] = [
  ['RKS Motor', ['rks', 'rksmotor', 'rks-motor', 'rksmotor', 'rks123', 'rksmotors', 'rksmoto']],
  ['Kuba Motor', ['kuba', 'kubamotor', 'kuba-motor', 'kubamoto']],
  ['Mondial', ['mondial', 'mondıal', 'mondiel']],
  ['Arora', ['arora', 'aro']],
  ['Yuki', ['yuki', 'yukı']],
];

function normalizeBrand(raw: string): string {
  if (!raw?.trim()) return raw;
  const normalized = raw.trim()
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
  for (const [canonical, aliases] of BRAND_ALIASES) {
    const canonicalSlug = canonical.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalized === canonicalSlug || aliases.includes(normalized)) {
      return canonical;
    }
  }
  for (const [canonical, aliases] of BRAND_ALIASES) {
    if (aliases.some((a) => normalized.startsWith(a))) return canonical;
    const canonicalSlug = canonical.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalized.startsWith(canonicalSlug)) return canonical;
  }
  return raw.trim();
}

export type DuplicateMode = 'update' | 'skip' | 'error';

export interface BulkRow {
  brand: string;
  name_tr: string;
  name_en: string;
  category: string;      // slug veya Türkçe ad
  subcategory: string;   // slug veya Türkçe ad
  price: string;
  stock: string;
  description_tr: string;
  description_en: string;
  image_url: string;
}

export interface BulkResult {
  index: number;
  ok: boolean;
  action?: 'inserted' | 'updated' | 'skipped';
  error?: string;
  product?: {
    name_tr: string;
    name_en: string;
    brand: string | null;
    category_id: string;
    subcategory_id: string | null;
    price: number | null;
    stock: number;
  };
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const [{ data: cats }, { data: subs }] = await Promise.all([
    supabaseAdmin.from('categories').select('id, name_tr, slug'),
    supabaseAdmin.from('subcategories').select('id, name_tr, slug, category_id'),
  ]);

  return NextResponse.json({ categories: cats ?? [], subcategories: subs ?? [] });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const body = await req.json() as { rows: BulkRow[]; duplicateMode: DuplicateMode; fileName?: string };
  const { rows, duplicateMode, fileName } = body;

  const [{ data: cats }, { data: subs }] = await Promise.all([
    supabaseAdmin.from('categories').select('id, name_tr, slug'),
    supabaseAdmin.from('subcategories').select('id, name_tr, slug, category_id'),
  ]);

  const catMap = new Map<string, string>();
  for (const c of cats ?? []) {
    catMap.set(c.slug, c.id);
    catMap.set(toSlug(c.name_tr), c.id);
  }

  const subMap = new Map<string, string>();
  for (const s of subs ?? []) {
    subMap.set(`${s.category_id}:${s.slug}`, s.id);
    subMap.set(`${s.category_id}:${toSlug(s.name_tr)}`, s.id);
  }

  const results: BulkResult[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    const catKey = toSlug(row.category?.trim() ?? '');
    const categoryId = catMap.get(row.category?.trim()) ?? catMap.get(catKey) ?? '';

    let subcategoryId: string | null = null;
    if (row.subcategory?.trim() && categoryId) {
      const subKey = toSlug(row.subcategory.trim());
      subcategoryId =
        subMap.get(`${categoryId}:${row.subcategory.trim()}`) ??
        subMap.get(`${categoryId}:${subKey}`) ??
        null;
    }

    const slug = toSlug(row.name_tr) + '-' + Date.now() + '-' + i;

    const productData = {
      name_tr: row.name_tr.trim(),
      name_en: row.name_en?.trim() || row.name_tr.trim(),
      slug,
      brand: row.brand?.trim() ? normalizeBrand(row.brand) : null,
      category_id: categoryId,
      subcategory_id: subcategoryId,
      price: row.price ? parseFloat(row.price) : null,
      stock: row.stock ? parseInt(row.stock, 10) : 0,
      description_tr: row.description_tr?.trim() || null,
      description_en: row.description_en?.trim() || null,
      image_url: row.image_url?.trim() || null,
      is_active: true,
    };

    const { data: existing } = await supabaseAdmin
      .from('products')
      .select('id, slug')
      .eq('name_tr', productData.name_tr)
      .eq('category_id', productData.category_id)
      .maybeSingle();

    if (existing) {
      if (duplicateMode === 'error') {
        results.push({ index: i, ok: false, error: `"${productData.name_tr}" zaten mevcut (ID: ${existing.id})` });
        continue;
      }
      if (duplicateMode === 'skip') {
        results.push({ index: i, ok: true, action: 'skipped', product: productData });
        continue;
      }
      const { error } = await supabaseAdmin
        .from('products')
        .update({ ...productData, slug: existing.slug })
        .eq('id', existing.id);
      if (error) {
        results.push({ index: i, ok: false, error: error.message });
      } else {
        results.push({ index: i, ok: true, action: 'updated', product: productData });
      }
      continue;
    }

    const { error } = await supabaseAdmin.from('products').insert(productData);
    if (error) {
      results.push({ index: i, ok: false, error: error.message });
    } else {
      results.push({ index: i, ok: true, action: 'inserted', product: productData });
    }
  }

  const inserted = results.filter((r) => r.ok && r.action === 'inserted').length;
  const updated  = results.filter((r) => r.ok && r.action === 'updated').length;
  const skipped  = results.filter((r) => r.ok && r.action === 'skipped').length;
  const failed   = results.filter((r) => !r.ok).length;

  await writeLog(auth.userId!, 'bulk_upload', {
    inserted,
    updated,
    skipped,
    failed,
    total_rows: rows.length,
    file_name: fileName,
  });

  return NextResponse.json(results);
}
