import { supabase } from '@/lib/supabaseClient';

export interface Simulacro {
  id: number;
  titulo: string;
  descripcion: string;
  total_preguntas: number;
  duracion_minutos: number;
  plan_minimo: number;
  activo: boolean;
  fecha_creacion: string;
  total_preguntas_reales?: number;
  areas?: string;
}

export interface Pregunta {
  id: number;
  simulacro_id: number;
  pregunta: string;
  opcion_a: string;
  opcion_b: string;
  opcion_c: string;
  opcion_d: string;
  correcta: string;
  area: string | null;
}

export interface HistorialItem {
  id: number;
  simulacro_id: number;
  puntaje: number;
  tiempo_minutos: number;
  fecha: string;
  simulacro_titulo: string;
}

export interface EstadisticasSimulacro {
  mejor_puntaje: number | null;
  promedio: number | null;
  veces_realizado: number;
}

export interface SimulacroInfoData {
  simulacro: Simulacro;
  estadisticas: EstadisticasSimulacro;
}

async function getUsuarioId(email: string): Promise<number> {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id')
    .eq('email', email)
    .single();
  if (error || !data) throw new Error('Usuario no encontrado');
  return data.id;
}

async function getPlanUsuario(email: string) {
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

export async function fetchSimulacrosData(email: string) {
  const { planId, usuarioId } = await getPlanUsuario(email);

  const { data: simulacrosRaw } = await supabase
    .from('simulacros_disponibles')
    .select('*')
    .eq('activo', true)
    .lte('plan_minimo', planId)
    .order('fecha_creacion', { ascending: false });

  const simulacros: Simulacro[] = [];
  for (const s of simulacrosRaw ?? []) {
    const { count } = await supabase
      .from('preguntas_icfes')
      .select('*', { count: 'exact', head: true })
      .eq('simulacro_id', s.id);

    const { data: areas } = await supabase
      .from('preguntas_icfes')
      .select('area')
      .eq('simulacro_id', s.id);

    const uniqueAreas = [...new Set((areas ?? []).map((a) => a.area).filter(Boolean))];

    simulacros.push({
      ...s,
      total_preguntas_reales: count ?? 0,
      areas: uniqueAreas.join(', '),
    });
  }

  const { data: historialRaw } = await supabase
    .from('simulacros_realizados')
    .select('id, simulacro_id, puntaje, tiempo_minutos, fecha')
    .eq('usuario_id', usuarioId)
    .order('fecha', { ascending: false })
    .limit(10);

  const historial: HistorialItem[] = [];
  for (const h of historialRaw ?? []) {
    const { data: sim } = await supabase
      .from('simulacros_disponibles')
      .select('titulo')
      .eq('id', h.simulacro_id)
      .single();
    historial.push({ ...h, simulacro_titulo: sim?.titulo ?? 'Simulacro' });
  }

  return { simulacros, historial };
}

export async function fetchSimulacroInfo(
  simulacroId: number,
  email: string
): Promise<SimulacroInfoData> {
  const usuarioId = await getUsuarioId(email);

  const { data: simulacro, error } = await supabase
    .from('simulacros_disponibles')
    .select('*')
    .eq('id', simulacroId)
    .eq('activo', true)
    .single();

  if (error || !simulacro) throw new Error('Simulacro no encontrado');

  const { count } = await supabase
    .from('preguntas_icfes')
    .select('*', { count: 'exact', head: true })
    .eq('simulacro_id', simulacroId);

  const { data: areas } = await supabase
    .from('preguntas_icfes')
    .select('area')
    .eq('simulacro_id', simulacroId);

  const uniqueAreas = [...new Set((areas ?? []).map((a) => a.area).filter(Boolean))];

  const { data: stats } = await supabase
    .from('simulacros_realizados')
    .select('puntaje')
    .eq('usuario_id', usuarioId)
    .eq('simulacro_id', simulacroId);

  const puntajes = (stats ?? []).map((s) => s.puntaje);

  return {
    simulacro: {
      ...simulacro,
      total_preguntas_reales: count ?? 0,
      areas: uniqueAreas.join(', '),
    },
    estadisticas: {
      mejor_puntaje: puntajes.length ? Math.max(...puntajes) : null,
      promedio: puntajes.length ? puntajes.reduce((a, b) => a + b, 0) / puntajes.length : null,
      veces_realizado: puntajes.length,
    },
  };
}

export async function fetchPreguntas(simulacroId: number, cantidad: number): Promise<Pregunta[]> {
  const { data } = await supabase
    .from('preguntas_icfes')
    .select('*')
    .eq('simulacro_id', simulacroId);

  if (!data || data.length === 0) throw new Error('Sin preguntas disponibles');

  // Shuffle client-side (suficiente para decenas de preguntas)
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(cantidad, shuffled.length));
}

export async function guardarResultado(
  email: string,
  simulacroId: number,
  puntaje: number,
  tiempoMinutos: number
): Promise<void> {
  const usuarioId = await getUsuarioId(email);
  const { error } = await supabase.from('simulacros_realizados').insert({
    usuario_id: usuarioId,
    simulacro_id: simulacroId,
    puntaje,
    tiempo_minutos: tiempoMinutos,
  });
  if (error) throw error;
}