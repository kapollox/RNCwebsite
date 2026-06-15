import { getCategories } from '@/lib/categories-db';
import { CategoryGridClient } from './CategoryGridClient';

export async function CategoryGrid() {
  const categories = await getCategories();
  const featured = categories.filter((c) => c.featured);
  return <CategoryGridClient featuredCategories={featured} />;
}
