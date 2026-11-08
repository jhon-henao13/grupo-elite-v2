import { supabase } from '@/lib/supabaseClient';

export interface AdminKPIs {
  total_usuarios: number;
  total_pagos: number;
  total_material: number;
  total_simulacros: number;
}

export interface MaterialAdmin {
  id: number;
  titulo: string;
  descripcion: string;
  pdf_url: string;
  anio: number;
  fecha_subida: string;
}

export interface SimulacroAdmin {
  id: number;
  titulo: string;
  descripcion: string;
  total_preguntas: number;
  total_preguntas_reales: number;
  duracion_minutos: number;
  plan_minimo: number;
  activo: boolean;
}

export interface SuscripcionAdmin {
  suscripcion_id: number;
  usuario_id: number;
  nombre: string;
  email: string;
  plan: string;
  plan_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  dias_restantes: number;
}

export interface PreguntaAdmin {
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

export interface BlogPostAdmin {
  id: number;
  titulo: string;
  slug: string;
  vistas: number;
  fecha_creacion: string;
}

// Dataset local (copiado de app.py)
const datasetLocal: Record<string, { pregunta: string; opciones: string[]; correcta: string; area: string }[]> = {
  matematicas: [
    { pregunta: '¿Cuál es el resultado de (2x + 3)² si x = 2?', opciones: ['25', '49', '36', '64'], correcta: 'b', area: 'Matemáticas' },
    { pregunta: '¿Cuál es el área de un círculo con radio 5?', opciones: ['25π', '10π', '50π', '15π'], correcta: 'a', area: 'Matemáticas' },
    { pregunta: '¿Cuál es la solución de x² - 5x + 6 = 0?', opciones: ['x = 2 ó x = 3', 'x = 1 ó x = 6', 'x = -2 ó x = -3', 'x = 0 ó x = 5'], correcta: 'a', area: 'Matemáticas' },
    { pregunta: '¿Cuál es el valor de log₁₀(1000)?', opciones: ['1', '2', '3', '4'], correcta: 'c', area: 'Matemáticas' },
    { pregunta: '¿Cuál es la derivada de f(x) = 3x²?', opciones: ['3x', '6x', '6x²', '3'], correcta: 'b', area: 'Matemáticas' },
  ],
  ciencias: [
    { pregunta: '¿Cuál es la fórmula molecular del ácido sulfúrico?', opciones: ['H₂SO₃', 'H₂SO₄', 'HSO₄', 'H₃SO₄'], correcta: 'b', area: 'Química' },
    { pregunta: '¿Cuál es el número atómico del Carbono?', opciones: ['6', '8', '12', '4'], correcta: 'a', area: 'Química' },
    { pregunta: '¿Cuál es la velocidad de propagación de la luz?', opciones: ['300,000 km/h', '300,000 m/s', '150,000 km/s', '3,000,000 m/s'], correcta: 'b', area: 'Física' },
    { pregunta: '¿Cuál es la función principal de las mitocondrias?', opciones: ['Sintetizar proteínas', 'Producir energía (ATP)', 'Almacenar agua', 'Fotosíntesis'], correcta: 'b', area: 'Biología' },
    { pregunta: '¿Cuál es el pH de una solución neutra?', opciones: ['0', '7', '14', '1'], correcta: 'b', area: 'Química' },
  ],
  lenguaje: [
    { pregunta: '¿Cuál es el sinónimo de "perspicaz"?', opciones: ['Ingenuo', 'Agudo', 'Torpe', 'Lento'], correcta: 'b', area: 'Lenguaje' },
    { pregunta: '¿Cuál es el antónimo de "abundancia"?', opciones: ['Riqueza', 'Escasez', 'Exceso', 'Plenitud'], correcta: 'b', area: 'Lenguaje' },
    { pregunta: '¿Qué figura literaria es "sus lágrimas eran ríos"?', opciones: ['Metáfora', 'Símil', 'Hipérbole', 'Metonimia'], correcta: 'a', area: 'Literatura' },
    { pregunta: 'Completa: "Si yo _____ sido más atento, lo hubiera notado"', opciones: ['sería', 'fuera', 'hubiera', 'seré'], correcta: 'c', area: 'Gramática' },
    { pregunta: '¿Cuál es el sujeto en "La casa está en la montaña"?', opciones: ['montaña', 'casa', 'está', 'la'], correcta: 'b', area: 'Gramática' },
  ],
  sociales: [
    { pregunta: '¿En qué año se firmó la Declaración de Independencia de Colombia?', opciones: ['1808', '1810', '1819', '1821'], correcta: 'c', area: 'Historia' },
    { pregunta: '¿Cuál es la capital de Colombia?', opciones: ['Cali', 'Medellín', 'Bogotá', 'Cartagena'], correcta: 'c', area: 'Geografía' },
    { pregunta: '¿Cuántos países limitan con Colombia?', opciones: ['3', '4', '5', '6'], correcta: 'c', area: 'Geografía' },
    { pregunta: '¿Cuál fue la causa principal de la Revolución Francesa?', opciones: ['Invasión napoleónica', 'Crisis económica y social', 'Guerre de Sucesión', 'Independencia americana'], correcta: 'b', area: 'Historia' },
    { pregunta: '¿En qué continente se encuentra Colombia?', opciones: ['América del Norte', 'América Central', 'América del Sur', 'Caribe'], correcta: 'c', area: 'Geografía' },
  ],
  ingles: [
    { pregunta: 'Traduce: "She has been studying English for 5 years"', opciones: ['Ella estudió inglés por 5 años', 'Ella ha estado estudiando inglés por 5 años', 'Ella estará estudiando inglés por 5 años', 'Ella es inglesa por 5 años'], correcta: 'b', area: 'Inglés' },
    { pregunta: '¿Cuál es el Past Participle de "go"?', opciones: ['Goed', 'Going', 'Gone', 'Goes'], correcta: 'c', area: 'Inglés' },
    { pregunta: 'Complete: "If I _____ you, I would help you"', opciones: ['am', 'was', 'were', 'have been'], correcta: 'c', area: 'Inglés' },
    { pregunta: '¿Cuál es el significado de "awkward"?', opciones: ['Incómodo', 'Gracias', 'Fuerte', 'Feliz'], correcta: 'a', area: 'Inglés' },
    { pregunta: 'Elige la oración correcta:', opciones: ['She dont like pizza', 'She doesnt like pizza', 'She not like pizza', 'She do not like pizza'], correcta: 'b', area: 'Inglés' },
  ],
  razonamiento: [
    { pregunta: '¿Cuál número sigue en la serie: 2, 4, 8, 16, ___?', opciones: ['24', '30', '32', '40'], correcta: 'c', area: 'Razonamiento' },
    { pregunta: 'Si todos los gatos son animales y Miau es un gato, entonces:', opciones: ['Miau es un perro', 'Miau es un animal', 'Miau no es un animal', 'No se puede determinar'], correcta: 'b', area: 'Lógica' },
    { pregunta: '¿Qué tiene la palabra "ICFES" que no tiene la palabra "TEST"?', opciones: ['Una vocal', 'Tres letras', 'La letra F', 'Dos vocales'], correcta: 'c', area: 'Razonamiento' },
  ],
};

// ---------- DASHBOARD ----------

export async function fetchAdminData() {
  const [usuariosC, pagosC, material, simulacrosRaw, suscripcionesRaw, posts] = await Promise.all([
    supabase.from('usuarios').select('*', { count: 'exact', head: true }),
    supabase.from('pagos').select('*', { count: 'exact', head: true }).eq('estado', 'approved'),
    supabase.from('material_educativo').select('*').order('id', { ascending: false }),
    supabase.from('simulacros_disponibles').select('*').eq('activo', true),
    supabase.from('suscripciones').select(`
      id, usuario_id, plan_id, fecha_inicio, fecha_fin,
      usuarios(nombre, email),
      planes(nombre)
    `).eq('estado', 'activa').gte('fecha_fin', new Date().toISOString().split('T')[0]),
    supabase.from('blog_posts').select('id, titulo, slug, vistas, fecha_creacion').order('fecha_creacion', { ascending: false }),
  ]);

  const simulacros: SimulacroAdmin[] = await Promise.all(
    (simulacrosRaw.data ?? []).map(async (s) => {
      const { count } = await supabase
        .from('preguntas_icfes').select('*', { count: 'exact', head: true }).eq('simulacro_id', s.id);
      return { ...s, total_preguntas_reales: count ?? 0 };
    })
  );

  const hoy = Date.now();
  const suscripciones: SuscripcionAdmin[] = (suscripcionesRaw.data ?? []).map((s: any) => ({
    suscripcion_id: s.id,
    usuario_id: s.usuario_id,
    nombre: s.usuarios?.nombre ?? '—',
    email: s.usuarios?.email ?? '—',
    plan: s.planes?.nombre ?? '—',
    plan_id: s.plan_id,
    fecha_inicio: s.fecha_inicio,
    fecha_fin: s.fecha_fin,
    dias_restantes: Math.max(0, Math.ceil((new Date(s.fecha_fin).getTime() - hoy) / 86400000)),
  }));

  return {
    kpis: {
      total_usuarios: usuariosC.count ?? 0,
      total_pagos: pagosC.count ?? 0,
      total_material: material.data?.length ?? 0,
      total_simulacros: simulacros.length,
    } as AdminKPIs,
    materiales: (material.data ?? []) as MaterialAdmin[],
    simulacros,
    suscripciones,
    posts: (posts.data ?? []) as BlogPostAdmin[],
  };
}

// ---------- MATERIAL ----------

export async function createMaterial(data: Omit<MaterialAdmin, 'id' | 'fecha_subida'>) {
  const { error } = await supabase.from('material_educativo').insert(data);
  if (error) throw error;
}

export async function updateMaterial(id: number, data: Partial<Pick<MaterialAdmin, 'titulo' | 'descripcion' | 'pdf_url' | 'anio'>>) {
  const { error } = await supabase.from('material_educativo').update(data).eq('id', id);
  if (error) throw error;
}

export async function deleteMaterial(id: number) {
  const { error } = await supabase.from('material_educativo').delete().eq('id', id);
  if (error) throw error;
}

// ---------- SIMULACRO ----------

export async function createSimulacro(data: {
  titulo: string; descripcion: string; total_preguntas: number;
  duracion_minutos: number; plan_minimo: number;
}) {
  const { error } = await supabase.from('simulacros_disponibles').insert({ ...data, activo: true });
  if (error) throw error;
}

export async function deleteSimulacro(id: number) {
  const { error } = await supabase.from('simulacros_disponibles').delete().eq('id', id);
  if (error) throw error;
}

export async function fetchSimulacro(id: number) {
  const { data, error } = await supabase.from('simulacros_disponibles').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// ---------- PREGUNTAS ----------

export async function fetchPreguntasBySimulacro(simulacroId: number): Promise<PreguntaAdmin[]> {
  const { data, error } = await supabase
    .from('preguntas_icfes').select('*').eq('simulacro_id', simulacroId).order('id');
  if (error) throw error;
  return data ?? [];
}

export async function createPregunta(data: Omit<PreguntaAdmin, 'id'>) {
  const { error } = await supabase.from('preguntas_icfes').insert(data);
  if (error) throw error;
}

export async function deletePregunta(id: number) {
  const { error } = await supabase.from('preguntas_icfes').delete().eq('id', id);
  if (error) throw error;
}

export async function cargarPreguntasDesdeLocal(simulacroId: number, cantidad: number, area: string) {
  let pool = area && datasetLocal[area.toLowerCase()]
    ? [...datasetLocal[area.toLowerCase()]]
    : Object.values(datasetLocal).flat();
  pool = pool.sort(() => Math.random() - 0.5).slice(0, cantidad);

  const rows = pool.map((p) => ({
    simulacro_id: simulacroId,
    pregunta: p.pregunta,
    opcion_a: p.opciones[0],
    opcion_b: p.opciones[1],
    opcion_c: p.opciones[2],
    opcion_d: p.opciones[3],
    correcta: p.correcta,
    area: p.area,
  }));

  const { error } = await supabase.from('preguntas_icfes').insert(rows);
  if (error) throw error;
  return rows.length;
}

// ---------- SUSCRIPCIONES (serverless) ----------

// ---------- SUSCRIPCIONES (serverless) ----------

export async function crearSuscripcionManual(data: {
  email: string; nombre?: string; plan_id: number; monto?: number;
}) {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`;
  }

  const res = await fetch('/api/admin', {
    method: 'POST',
    headers,
    body: JSON.stringify({ action: 'crear-suscripcion', ...data }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `Error ${res.status}`);
  }
  return res.json() as Promise<{
    success: boolean; usuarioId: number; nuevo: boolean;
    tempPassword: string | null; resetLink: string | null;
  }>;
}

export async function eliminarUsuarioCompleto(usuarioId: number) {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`;
  }

  const res = await fetch('/api/admin', {
    method: 'POST',
    headers,
    body: JSON.stringify({ action: 'eliminar-usuario', usuarioId }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `Error ${res.status}`);
  }
}

// ---------- ACCIONES SUSCRIPCIÓN ----------

export async function fetchUsuarioConSuscripcion(usuarioId: number) {
  const { data: sub, error } = await supabase
    .from('suscripciones')
    .select('*, usuarios(nombre, email), planes(nombre, precio, duracion_meses)')
    .eq('usuario_id', usuarioId).eq('estado', 'activa').maybeSingle();
  if (error) throw error;
  return sub;
}

export async function cambiarPlan(usuarioId: number, planId: number) {
  const { error } = await supabase
    .from('suscripciones').update({ plan_id: planId })
    .eq('usuario_id', usuarioId).eq('estado', 'activa');
  if (error) throw error;
}

export async function renovarSuscripcion(usuarioId: number) {
  const { data: sub } = await supabase
    .from('suscripciones')
    .select('id, fecha_fin, planes(duracion_meses, precio)')
    .eq('usuario_id', usuarioId).eq('estado', 'activa').single();
  if (!sub) throw new Error('Sin suscripción activa');

  const plan = (sub as any).planes;
  const nueva = new Date(sub.fecha_fin);
  nueva.setDate(nueva.getDate() + 30 * (plan?.duracion_meses ?? 1));

  await supabase.from('suscripciones').update({ fecha_fin: nueva.toISOString().split('T')[0] }).eq('id', sub.id);
  await supabase.from('pagos').insert({
    usuario_id: usuarioId,
    referencia: `RENOVACION-${Date.now().toString(36)}`,
    monto: plan?.precio ?? 0,
    metodo: 'Nequi',
    estado: 'approved',
  });
}

export async function restarDias(usuarioId: number, dias: number) {
  const { data: sub } = await supabase
    .from('suscripciones').select('id, fecha_fin')
    .eq('usuario_id', usuarioId).eq('estado', 'activa').single();
  if (!sub) throw new Error('Sin suscripción activa');

  const nueva = new Date(sub.fecha_fin);
  nueva.setDate(nueva.getDate() - dias);
  const str = nueva.toISOString().split('T')[0];
  const hoy = new Date().toISOString().split('T')[0];

  if (str < hoy) {
    await supabase.from('suscripciones').update({ fecha_fin: str, estado: 'cancelada' }).eq('id', sub.id);
    await supabase.from('usuarios').update({ role: 'free' }).eq('id', usuarioId);
  } else {
    await supabase.from('suscripciones').update({ fecha_fin: str }).eq('id', sub.id);
  }
}

export async function quitarPremium(usuarioId: number) {
  await supabase.from('suscripciones').update({ estado: 'cancelada' })
    .eq('usuario_id', usuarioId).eq('estado', 'activa');
  await supabase.from('usuarios').update({ role: 'free' }).eq('id', usuarioId);
}