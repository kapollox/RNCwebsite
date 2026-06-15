import { createSupabaseBrowser } from '@/lib/supabase-browser';

async function getAuthHeaders(): Promise<Record<string, string>> {
  const supabase = createSupabaseBrowser();
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token ?? '';
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
}

export async function adminFetchProducts() {
  const res = await fetch('/api/admin/products', { headers: await getAuthHeaders() });
  if (!res.ok) throw new Error('Ürünler yüklenemedi');
  return res.json();
}

export async function adminFetchProduct(id: string) {
  const res = await fetch(`/api/admin/products/${id}`, { headers: await getAuthHeaders() });
  if (!res.ok) throw new Error('Ürün bulunamadı');
  return res.json();
}

export async function adminCreateProduct(payload: object) {
  const res = await fetch('/api/admin/products', {
    method: 'POST',
    headers: await getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Ürün eklenemedi');
  return data;
}

export async function adminUpdateProduct(id: string, payload: object) {
  const res = await fetch(`/api/admin/products/${id}`, {
    method: 'PUT',
    headers: await getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Ürün güncellenemedi');
  return data;
}

export async function adminDeleteProduct(id: string) {
  const res = await fetch(`/api/admin/products/${id}`, {
    method: 'DELETE',
    headers: await getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Ürün silinemedi');
}
