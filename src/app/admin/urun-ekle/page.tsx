import { ProductForm } from '@/components/admin/ProductForm';

export default function UrunEklePage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-black text-2xl text-primary">Ürün Ekle</h1>
        <p className="text-text-muted text-sm mt-1">Yeni bir Honda parça ürünü ekle</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
