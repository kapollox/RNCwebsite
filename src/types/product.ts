export interface Product {
  id: string;
  name_tr: string;
  name_en: string;
  slug: string;
  category_id: string;
  subcategory_id: string | null;
  price: number | null;
  stock: number;
  description_tr: string | null;
  description_en: string | null;
  image_url: string | null;
  compatible_models: string[] | null;
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
