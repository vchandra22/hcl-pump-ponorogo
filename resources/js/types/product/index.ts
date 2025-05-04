import Meta from '../meta';

export interface Product {
    id: string;
    slug: string;
    title: string;
    short_description: string;
    price: number;
    sale_price?: number;
    is_featured: boolean;
    is_active: boolean;
    meta_id: string;
    created_at: string;
    updated_at: string;
    meta?: Meta;
    product_detail?: ProductDetail;
    product_images?: ProductImage[];
    [key: string]: unknown;
}

export interface ProductDetail {
    id: string;
    product_id: string;
    description: string;
    specification: string;
    additional_info: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface ProductImage {
    id: string;
    product_id: string;
    image_name: string;
    image_path: string;
    alt_text: string;
    [key: string]: unknown;
}

export type ProductFormData = {
  title: string;
  slug?: string;
  short_description: string;
  price: string;
  sale_price: string;
  is_featured: boolean;
  is_active: boolean;
  product_images?: File[] | null;
  description: string;
  specification: string;
  additional_info: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image?: File | null;
  image_alt: string | null;
    old_og_image?: string;
}