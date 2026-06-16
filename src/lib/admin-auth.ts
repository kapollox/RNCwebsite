import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export type AdminRole = 'admin' | 'editor';

export interface AuthResult {
  ok: boolean;
  userId?: string;
  role?: AdminRole;
  error?: string;
}

/**
 * API route'larında Bearer token ile kullanıcıyı doğrular.
 * Token Supabase Auth JWT'sidir — client'tan Authorization: Bearer <token> olarak gönderilir.
 * profiles tablosunda role = 'admin' | 'editor' kontrolü yapılır.
 */
export async function requireAdmin(req: NextRequest): Promise<AuthResult> {
  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return { ok: false, error: 'Token eksik' };
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !user) {
    return { ok: false, error: 'Geçersiz veya süresi dolmuş token' };
  }

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = (profile?.role ?? 'editor') as AdminRole;

  return { ok: true, userId: user.id, role };
}

export async function requireAdminRole(req: NextRequest): Promise<AuthResult> {
  const result = await requireAdmin(req);
  if (!result.ok) return result;
  if (result.role !== 'admin') {
    return { ok: false, error: 'Bu işlem için admin yetkisi gerekiyor' };
  }
  return result;
}
