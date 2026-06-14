const token = () =>
  typeof window !== 'undefined'
    ? (sessionStorage.getItem('rnc-admin-token') ?? '')
    : '';

const headers = () => ({
  'Content-Type': 'application/json',
  'x-admin-token': token(),
});

export async function adminFetchProducts() {
  const res = await fetch('/api/admin/products', { headers: headers() });
  if (!res.ok) throw new Error('Ürünler yüklenemedi');
  return res.json();
}

export async function adminFetchProduct(id: string) {
  const res = await fetch(`/api/admin/products/${id}`, { headers: headers() });
  if (!res.ok) throw new Error('Ürün bulunamadı');
  return res.json();
}

export async function adminCreateProduct(payload: object) {
  const res = await fetch('/api/admin/products', {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Ürün eklenemedi');
  return data;
}

export async function adminUpdateProduct(id: string, payload: object) {
  const res = await fetch(`/api/admin/products/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Ürün güncellenemedi');
  return data;
}

export async function adminDeleteProduct(id: string) {
  const res = await fetch(`/api/admin/products/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!res.ok) throw new Error('Ürün silinemedi');
}
