import { supabaseAdmin } from '@/lib/supabase-admin';
import type { Category, SubCategory } from '@/types';

type DbCategory = {
  id: string;
  name_tr: string;
  name_en: string;
  slug: string;
  sort_order: number;
  description_tr: string;
  description_en: string;
  icon_name: string;
  image: string | null;
  featured: boolean;
  part_count: number;
};

type DbSubcategory = {
  id: string;
  category_id: string;
  name_tr: string;
  name_en: string;
  slug: string;
  description_tr: string | null;
  description_en: string | null;
  image: string | null;
};

function toCategory(row: DbCategory, subs: DbSubcategory[]): Category {
  const subcategories: SubCategory[] = subs
    .filter((s) => s.category_id === row.id)
    .map((s) => ({
      id: s.id,
      name: s.name_tr,
      name_en: s.name_en,
      slug: s.slug,
      description: s.description_tr ?? undefined,
      description_en: s.description_en ?? undefined,
      image: s.image ?? undefined,
    }));

  return {
    id: row.id,
    name: row.name_tr,
    name_en: row.name_en,
    slug: row.slug,
    description: row.description_tr,
    description_en: row.description_en,
    partCount: row.part_count,
    iconName: row.icon_name,
    image: row.image ?? undefined,
    featured: row.featured,
    subcategories,
  };
}

export async function getCategories(): Promise<Category[]> {
  const [{ data: cats }, { data: subs }] = await Promise.all([
    supabaseAdmin
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true }),
    supabaseAdmin
      .from('subcategories')
      .select('*')
      .order('id', { ascending: true }),
  ]);

  if (!cats) return [];
  return (cats as DbCategory[]).map((c) => toCategory(c, (subs as DbSubcategory[]) ?? []));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const [{ data: cat }, { data: subs }] = await Promise.all([
    supabaseAdmin.from('categories').select('*').eq('slug', slug).single(),
    supabaseAdmin.from('subcategories').select('*').eq('category_id', slug).order('id'),
  ]);

  if (!cat) return null;
  return toCategory(cat as DbCategory, (subs as DbSubcategory[]) ?? []);
}

export async function getSubcategoryBySlug(
  categorySlug: string,
  subSlug: string
): Promise<SubCategory | null> {
  const { data } = await supabaseAdmin
    .from('subcategories')
    .select('*')
    .eq('category_id', categorySlug)
    .eq('slug', subSlug)
    .single();

  if (!data) return null;
  const s = data as DbSubcategory;
  return {
    id: s.id,
    name: s.name_tr,
    name_en: s.name_en,
    slug: s.slug,
    description: s.description_tr ?? undefined,
    description_en: s.description_en ?? undefined,
    image: s.image ?? undefined,
  };
}
