import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { requireAdmin } from '@/lib/admin-auth';
import { writeLog } from '@/lib/admin-log';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

const TRACKED_FIELDS: Array<keyof import('@/types/product').Product> = [
  'name_tr', 'name_en', 'brand', 'price', 'stock',
  'category_id', 'subcategory_id', 'is_active', 'image_url',
];

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  // Güncellemeden önce eski değerleri al
  const { data: before } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  const { data, error } = await supabaseAdmin
    .from('products')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Hangi alanlar değişti?
  const changes = before
    ? TRACKED_FIELDS
        .filter((f) => String(before[f]) !== String(data[f]))
        .map((f) => ({ field: f, old: before[f] ?? null, new: data[f] ?? null }))
    : [];

  await writeLog(auth.userId!, 'product_update', {
    product_name: data.name_tr,
    brand: data.brand,
    category_id: data.category_id,
    price: data.price,
    stock: data.stock,
    changes,
  });

  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const { id } = await params;

  // Silmeden önce ürün bilgilerini al (log için)
  const { data: product } = await supabaseAdmin
    .from('products')
    .select('name_tr, brand, category_id, price')
    .eq('id', id)
    .single();

  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await writeLog(auth.userId!, 'product_delete', {
    product_name: product?.name_tr,
    brand: product?.brand,
    category_id: product?.category_id,
    price: product?.price,
  });

  return new NextResponse(null, { status: 204 });
}
