import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { requireAdmin } from '@/lib/admin-auth';
import { writeLog } from '@/lib/admin-log';

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const { ids } = await req.json() as { ids: string[] };
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'ids dizisi boş' }, { status: 400 });
  }

  // Silmeden önce isimleri al (log için)
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('name_tr, brand')
    .in('id', ids);

  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .in('id', ids);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await writeLog(auth.userId!, 'product_delete', {
    product_name: `${ids.length} ürün toplu silindi`,
    brand: products?.map((p) => p.brand).filter(Boolean).join(', ') || undefined,
  });

  return NextResponse.json({ deleted: ids.length });
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from('products')
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await writeLog(auth.userId!, 'product_create', {
    product_name: data.name_tr,
    brand: data.brand,
    category_id: data.category_id,
    price: data.price,
    stock: data.stock,
  });

  return NextResponse.json(data, { status: 201 });
}
