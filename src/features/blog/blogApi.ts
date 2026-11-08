import { supabase } from '@/lib/supabaseClient';

export interface BlogPost {
  id: number;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  imagen_url: string;
  meta_keywords: string;
  vistas: number;
  fecha_creacion: string;
}

export interface BlogPostFormData {
  titulo: string;
  resumen: string;
  contenido: string;
  imagen_url: string;
  meta_keywords: string;
}

// Convierte un título en un slug amigable para URL
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export async function fetchPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('fecha_creacion', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function createPost(formData: BlogPostFormData): Promise<BlogPost> {
  const slug = slugify(formData.titulo);
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({ ...formData, slug })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePost(
  id: number,
  formData: Partial<BlogPostFormData>
): Promise<BlogPost> {
  const updateData = { ...formData };
  if (formData.titulo) {
    (updateData as any).slug = slugify(formData.titulo);
  }
  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePost(id: number): Promise<void> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}