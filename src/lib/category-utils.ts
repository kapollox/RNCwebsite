import type { Category, SubCategory } from '@/types';

type Locale = 'tr' | 'en';

export function getCatName(cat: Category, locale: Locale): string {
  if (locale === 'en') return cat.name_en || cat.id;
  return cat.name || cat.id;
}

export function getCatDescription(cat: Category, locale: Locale): string {
  if (locale === 'en') return cat.description_en || cat.description || cat.id;
  return cat.description || cat.id;
}

export function getSubCatName(sub: SubCategory, locale: Locale): string {
  if (locale === 'en') return sub.name_en || sub.id;
  return sub.name || sub.id;
}

export function getSubCatDescription(sub: SubCategory, locale: Locale): string | undefined {
  if (locale === 'en') return sub.description_en ?? sub.description;
  return sub.description;
}
