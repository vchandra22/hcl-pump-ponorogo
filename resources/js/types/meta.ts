export default interface Meta {
  id: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string;
  image_alt: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}