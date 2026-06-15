import { supabaseAdmin } from '@/lib/supabase-admin';
import { FeaturedProductsClient } from './FeaturedProductsClient';
import type { Product } from '@/types/product';

export async function FeaturedProducts() {
  const { data } = await supabaseAdmin
    .from('products')
    .select('id, name_tr, name_en, brand, price, image_url, slug, category_id, subcategory_id, stock, is_active, description_tr, description_en, compatible_models, created_at')
    .eq('is_active', true)
    .not('image_url', 'is', null)
    .order('created_at', { ascending: false })
    .limit(24);

  if (!data || data.length === 0) return null;

  // Rastgele 6 ürün seç
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  const featured = shuffled.slice(0, Math.min(6, shuffled.length)) as Product[];

  return <FeaturedProductsClient products={featured} />;
}
