import { supabase } from '@/lib/supabaseClient';
import { obtenerPreguntas } from './preguntasApi';

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

// ============================================================
// CAMBIO 3: Mapeo de simulacroId → área temática
// ============================================================
// Ajusta estos IDs según el contenido real de tu tabla simulacros_disponibles.
// Los IDs coinciden con lo que tienes en Supabase (3, 5, 7, 8, 9, 10, 11, 12).
const AREA_MAP: Record<number, string | 'mixed'> = {
  3: 'ciencias',      // "Química" - simulacro 2
  5: 'matematicas',   // "Simulacro de Matemáticas"
  7: 'ciencias',      // "Simulacro de Ciencias Naturales"
  8: 'sociales',      // "Simulacro de Ciencias Sociales"
  9: 'lenguaje',      // "Simulacro de Lenguaje y Literatura"
  10: 'ingles',       // "Simulacro de Inglés"
  11: 'razonamiento', // "Simulacro de Razonamiento Lógico"
  12: 'mixed',        // "Simulacro ICFES: Pon a Prueba Tus Conocimientos" (todas)
};

const ALL_AREAS = ['matematicas', 'ciencias', 'lenguaje', 'sociales', 'ingles', 'razonamiento'];

// ============================================================
// HELPERS
// ============================================================

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

// ============================================================
// FETCH: lista de simulacros + historial
// ============================================================
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
    // Ya no dependemos de preguntas en DB: mostramos siempre el total definido
    // (pero mantenemos el conteo real si existiera para compatibilidad)
    const { count } = await supabase
      .from('preguntas_icfes')
      .select('*', { count: 'exact', head: true })
      .eq('simulacro_id', s.id);

    const areaLabel = AREA_MAP[s.id];
    const areasLegibles = areaLabel === 'mixed' || !areaLabel
      ? 'Todas las áreas'
      : {
          matematicas: 'Matemáticas',
          ciencias: 'Ciencias Naturales',
          lenguaje: 'Lenguaje',
          sociales: 'Ciencias Sociales',
          ingles: 'Inglés',
          razonamiento: 'Razonamiento',
        }[areaLabel] ?? 'General';

    simulacros.push({
      ...s,
      // Si la DB no tiene preguntas, usamos el `total_preguntas` del simulacro
      // para que el usuario vea el número que se cargará dinámicamente
      total_preguntas_reales: (count ?? 0) > 0 ? count : s.total_preguntas,
      areas: areasLegibles,
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

// ============================================================
// FETCH: info detallada de un simulacro
// ============================================================
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

  const areaLabel = AREA_MAP[simulacroId];
  const areasLegibles = areaLabel === 'mixed' || !areaLabel
    ? 'Todas las áreas'
    : {
        matematicas: 'Matemáticas',
        ciencias: 'Ciencias Naturales',
        lenguaje: 'Lenguaje',
        sociales: 'Ciencias Sociales',
        ingles: 'Inglés',
        razonamiento: 'Razonamiento',
      }[areaLabel] ?? 'General';

  const { data: stats } = await supabase
    .from('simulacros_realizados')
    .select('puntaje')
    .eq('usuario_id', usuarioId)
    .eq('simulacro_id', simulacroId);

  const puntajes = (stats ?? []).map((s) => s.puntaje);

  return {
    simulacro: {
      ...simulacro,
      total_preguntas_reales: (count ?? 0) > 0 ? count : simulacro.total_preguntas,
      areas: areasLegibles,
    },
    estadisticas: {
      mejor_puntaje: puntajes.length ? Math.max(...puntajes) : null,
      promedio: puntajes.length ? puntajes.reduce((a, b) => a + b, 0) / puntajes.length : null,
      veces_realizado: puntajes.length,
    },
  };
}

// ============================================================
// CAMBIO 2 + 3: fetchPreguntas con área temática + fallback
// ============================================================
export async function fetchPreguntas(simulacroId: number, cantidad: number): Promise<Pregunta[]> {
  // 1. Determinar el área según el simulacro
  const areaMapping = AREA_MAP[simulacroId];

  // 2. Construir el pool de preguntas
  let pool: Awaited<ReturnType<typeof obtenerPreguntas>> = [];

  if (areaMapping === 'mixed' || !areaMapping) {
    // Simulacro general: mezclar todas las áreas
    const porArea = Math.ceil(cantidad / ALL_AREAS.length);
    const resultados = await Promise.all(
      ALL_AREAS.map((area) => obtenerPreguntas(area, porArea))
    );
    pool = resultados.flat();
  } else {
    // Simulacro de área específica
    pool = await obtenerPreguntas(areaMapping, cantidad);
  }

  // 3. Asegurar cantidad exacta (barajar y recortar)
  const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, cantidad);

  if (shuffled.length === 0) {
    throw new Error('No se pudieron cargar preguntas. Intenta de nuevo.');
  }

  // 4. Convertir al formato Pregunta con IDs virtuales
  return shuffled.map((p, idx) => ({
    id: idx + 1,
    simulacro_id: simulacroId,
    pregunta: p.pregunta,
    opcion_a: p.opciones[0],
    opcion_b: p.opciones[1],
    opcion_c: p.opciones[2],
    opcion_d: p.opciones[3],
    correcta: p.correcta,
    area: p.area,
  }));
}

// ============================================================
// GUARDAR resultado (sin cambios)
// ============================================================
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