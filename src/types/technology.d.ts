export type TechCategory = 'frontend' | 'mobile' | 'backend' | 'tooling';

export interface Technology {
  id: string;
  name: string;
  icon: string;
  category: TechCategory;
  years: number;
  level: 'primary' | 'working' | 'familiar';
}

export interface TechCategoryGroup {
  key: TechCategory;
  label: string;
  blurb: string;
}
