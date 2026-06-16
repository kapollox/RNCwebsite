import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '100'), 500);

  const { data, error } = await supabaseAdmin
    .from('admin_logs')
    .select('id, action, meta, created_at, user_id')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 });

  const body = await req.json().catch(() => ({})) as { ids?: string[] };

  if (body.ids && body.ids.length > 0) {
    // Seçili logları sil
    const { error } = await supabaseAdmin
      .from('admin_logs')
      .delete()
      .in('id', body.ids);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ deleted: body.ids.length });
  }

  // Tüm logları sil
  const { error } = await supabaseAdmin
    .from('admin_logs')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // tümünü sil trick
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: 'all' });
}
