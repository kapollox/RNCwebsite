export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  partCount: number;
  iconName: string;
  featured: boolean;
  subcategories: SubCategory[];
}

export interface Part {
  id: string;
  name: string;
  slug: string;
  partNumber: string;
  categoryId: string;
  categoryName: string;
  description: string;
  specs: Record<string, string>;
  availability: 'available' | 'limited' | 'inquiry';
  compatibleModels: string[];
  imageAlt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTimeMinutes: number;
}
