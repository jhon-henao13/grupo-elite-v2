import { supabase } from '@/lib/supabaseClient';

export interface Plan {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion_meses: number;
}

export async function fetchPlans(): Promise<Plan[]> {
  const { data, error } = await supabase
    .from('planes')
    .select('*')
    .order('precio', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export function buildWhatsAppLink(plan: Plan, email?: string): string {
  const wsp = '573185168709';
  const base = `Hola, interesado en el plan ${plan.nombre} ($${plan.precio.toLocaleString('es-CO')})`;
  const suffix = email ? `. Email: ${email}` : '';
  return `https://wa.me/${wsp}?text=${encodeURIComponent(base + suffix)}`;
}