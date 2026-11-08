import { supabase } from '@/lib/supabaseClient';

export interface DashboardData {
  usuarioId: number;
  nombre: string;
  premium: boolean;
  plan: string | null;
  diasRestantes: number;
  materiales: Array<{ id: number; titulo: string; anio: number; descripcion: string; pdf_url: string }>;
  simulacrosTotal: number;
  añosDisponibles: number[];
  chartSimulacros: { labels: string[]; puntajes: number[] };
  chartDesempeño: number[];
}

export async function fetchDashboardData(email: string): Promise<DashboardData> {
  // 1. Perfil del usuario
  const { data: perfil, error: errPerfil } = await supabase
    .from('usuarios')
    .select('id, nombre')
    .eq('email', email)
    .single();

  if (errPerfil || !perfil) throw errPerfil ?? new Error('Perfil no encontrado');

  // 2. Suscripción activa
  const today = new Date().toISOString().split('T')[0];
  
  const { data: subRaw } = await supabase
    .from('suscripciones')
    .select('fecha_fin, plan_id, planes(nombre)')
    .eq('usuario_id', perfil.id)
    .eq('estado', 'activa')
    .gte('fecha_fin', today)
    .order('fecha_fin', { ascending: false })
    .limit(1)
    .maybeSingle();
  
  // Supabase infiere `planes` como array → lo aplanamos defensivamente
  const planesField = subRaw?.planes as
    | { nombre: string }
    | { nombre: string }[]
    | null
    | undefined;
  
  const plan = Array.isArray(planesField)
    ? planesField[0]?.nombre ?? null
    : planesField?.nombre ?? null;
  
  const premium = !!subRaw;
  const diasRestantes = subRaw
    ? Math.max(0, Math.ceil((new Date(subRaw.fecha_fin).getTime() - Date.now()) / 86400000))
    : 0;

  // 3. Material educativo (RLS filtra por suscripción)
  const { data: materiales } = await supabase
    .from('material_educativo')
    .select('id, titulo, anio, descripcion, pdf_url')
    .order('anio', { ascending: false });

  const añosDisponibles = [...new Set((materiales ?? []).map((m) => m.anio))].sort((a, b) => b - a);

  // 4. Simulacros realizados
  const { data: resultados } = await supabase
    .from('simulacros_realizados')
    .select('puntaje, fecha')
    .eq('usuario_id', perfil.id)
    .order('fecha', { ascending: true })
    .limit(7);

  const simulacrosTotal = resultados?.length ?? 0;

  const chartSimulacros = {
    labels: (resultados ?? []).map((r) =>
      new Date(r.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit' })
    ),
    puntajes: (resultados ?? []).map((r) => r.puntaje),
  };

  // 5. Distribución de desempeño
  const { data: todos } = await supabase
    .from('simulacros_realizados')
    .select('puntaje')
    .eq('usuario_id', perfil.id);

  const chartDesempeño = [
    (todos ?? []).filter((r) => r.puntaje >= 80).length,
    (todos ?? []).filter((r) => r.puntaje >= 60 && r.puntaje < 80).length,
    (todos ?? []).filter((r) => r.puntaje >= 40 && r.puntaje < 60).length,
    (todos ?? []).filter((r) => r.puntaje < 40).length,
  ];

  return {
    usuarioId: perfil.id,
    nombre: perfil.nombre,
    premium,
    plan,
    diasRestantes,
    materiales: materiales ?? [],
    simulacrosTotal,
    añosDisponibles,
    chartSimulacros,
    chartDesempeño,
  };
}