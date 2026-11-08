import { supabase } from '@/lib/supabaseClient';

export interface Metricas {
  simulacros_total: number;
  promedio_puntaje: number;
  tiempo_total_minutos: number;
  areas_mas_practicadas: { titulo: string; veces_realizado: number }[];
}

export interface Conversacion {
  id: number;
  mensaje_usuario: string;
  respuesta_ia: string;
  fecha_creacion: string;
}

export async function getUsuarioId(email: string): Promise<number> {
  const { data, error } = await supabase.from('usuarios').select('id').eq('email', email).single();
  if (error || !data) throw new Error('Usuario no encontrado');
  return data.id;
}

export async function getPlanUsuario(email: string) {
  const usuarioId = await getUsuarioId(email);
  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase
    .from('suscripciones')
    .select('plan_id')
    .eq('usuario_id', usuarioId)
    .eq('estado', 'activa')
    .gte('fecha_fin', today)
    .order('fecha_fin', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data) throw new Error('Necesitas una suscripción activa');
  return { planId: data.plan_id, usuarioId };
}

export async function fetchMetricas(email: string): Promise<Metricas> {
  const usuarioId = await getUsuarioId(email);

  const { data: results } = await supabase
    .from('simulacros_realizados')
    .select('puntaje, tiempo_minutos, simulacro_id')
    .eq('usuario_id', usuarioId);

  const simulacros_total = results?.length ?? 0;
  const promedio_puntaje = simulacros_total > 0
    ? Math.round((results!.reduce((s, r) => s + r.puntaje, 0) / simulacros_total) * 10) / 10
    : 0;
  const tiempo_total_minutos = results?.reduce((s, r) => s + (r.tiempo_minutos ?? 0), 0) ?? 0;

  const counts: Record<number, number> = {};
  (results ?? []).forEach((r) => {
    counts[r.simulacro_id] = (counts[r.simulacro_id] ?? 0) + 1;
  });

  const areas_mas_practicadas: { titulo: string; veces_realizado: number }[] = [];
  for (const [sid, veces] of Object.entries(counts)) {
    const { data: sim } = await supabase
      .from('simulacros_disponibles')
      .select('titulo')
      .eq('id', Number(sid))
      .single();
    if (sim) areas_mas_practicadas.push({ titulo: sim.titulo, veces_realizado: veces });
  }
  areas_mas_practicadas.sort((a, b) => b.veces_realizado - a.veces_realizado);

  return {
    simulacros_total,
    promedio_puntaje,
    tiempo_total_minutos,
    areas_mas_practicadas: areas_mas_practicadas.slice(0, 5),
  };
}

export async function callAI(
  type: 'analisis' | 'estrategia' | 'chat',
  payload: { metrics?: Metricas; message?: string; name?: string }
): Promise<string> {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, ...payload }),
  });

  if (!res.ok) {
    // Leer body del error para mostrar detalle (silenciado si falla)
    const detail = await res.text().catch(() => '');
    const suffix = detail ? ` — ${detail.slice(0, 200)}` : '';
    throw new Error(
      `IA no disponible (${res.status}). Si estás en dev local, usa "vercel dev" en vez de "npm run dev".${suffix}`
    );
  }

  const data = (await res.json()) as { content?: string };
  return data.content ?? '';
}

export async function guardarConversacion(email: string, mensaje: string, respuesta: string) {
  const usuarioId = await getUsuarioId(email);
  await supabase.from('conversaciones_ia').insert({
    usuario_id: usuarioId,
    mensaje_usuario: mensaje,
    respuesta_ia: respuesta,
    tipo: 'mentor',
  });
}

export async function fetchConversaciones(email: string): Promise<Conversacion[]> {
  const usuarioId = await getUsuarioId(email);
  const { data } = await supabase
    .from('conversaciones_ia')
    .select('id, mensaje_usuario, respuesta_ia, fecha_creacion')
    .eq('usuario_id', usuarioId)
    .order('fecha_creacion', { ascending: false })
    .limit(20);
  return data ?? [];
}