export const config = { runtime: 'edge' };

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = process.env.SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_KEY!;

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export default async function handler(req: Request) {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    // 1. Validar Token de autorización
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return json({ error: 'Sin autorización' }, 401);

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return json({ error: 'Token inválido' }, 401);

    // 2. Verificar que el usuario tenga rol de admin en la base de datos
    const { data: perfil } = await supabase
      .from('usuarios')
      .select('role')
      .eq('email', user.email)
      .single();

    if (perfil?.role !== 'admin') {
      return json({ error: 'No admin' }, 403);
    }

    // 3. Procesar la acción solicitada
    const body = await req.json();
    const { action } = body;

    if (action === 'crear-suscripcion') return await crearSuscripcion(body);
    if (action === 'eliminar-usuario') return await eliminarUsuario(body);

    return json({ error: 'Acción inválida' }, 400);
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Error desconocido' }, 500);
  }
}

async function crearSuscripcion({ email, nombre, plan_id, monto }: {
  email: string; nombre?: string; plan_id: number; monto?: number;
}) {
  const cleanEmail = email.trim().toLowerCase();

  // 1. ¿Existe en usuarios?
  const { data: existing } = await supabase
    .from('usuarios')
    .select('id, auth_user_id')
    .eq('email', cleanEmail)
    .maybeSingle();

  let usuarioId: number;
  let tempPassword: string | null = null;
  let resetLink: string | null = null;
  let nuevo = false;

  if (!existing) {
    // Crear en auth.users
    tempPassword = Math.random().toString(36).slice(-10) + '!A1';
    const { data: authUser, error: authErr } = await supabase.auth.admin.createUser({
      email: cleanEmail,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { nombre: nombre ?? cleanEmail.split('@')[0] },
    });
    if (authErr || !authUser.user) throw new Error(authErr?.message ?? 'No se pudo crear auth user');

    const { data: newUser, error: insertErr } = await supabase
      .from('usuarios')
      .insert({
        nombre: nombre ?? cleanEmail.split('@')[0].replace(/\b\w/g, (c) => c.toUpperCase()),
        email: cleanEmail,
        password: 'SUPABASE_AUTH',
        role: 'premium',
        auth_user_id: authUser.user.id,
      })
      .select('id')
      .single();
    if (insertErr || !newUser) throw new Error(insertErr?.message ?? 'No se pudo crear usuario');

    usuarioId = newUser.id;
    nuevo = true;

    // Generar link de recuperación
    const { data: linkData } = await supabase.auth.admin.generateLink({ type: 'recovery', email: cleanEmail });
    resetLink = linkData?.properties?.action_link ?? null;
  } else {
    usuarioId = existing.id;
    await supabase.from('usuarios').update({ role: 'premium' }).eq('id', usuarioId);
  }

  // 2. Suscripción
  const { data: plan } = await supabase
    .from('planes').select('duracion_meses, precio').eq('id', plan_id).single();
  const duracion = plan?.duracion_meses ?? 1;
  const fin = new Date();
  fin.setDate(fin.getDate() + 30 * duracion);

  // Cancelar suscripciones activas previas
  await supabase.from('suscripciones')
    .update({ estado: 'cancelada' })
    .eq('usuario_id', usuarioId).eq('estado', 'activa');

  await supabase.from('suscripciones').insert({
    usuario_id: usuarioId,
    plan_id,
    estado: 'activa',
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_fin: fin.toISOString().split('T')[0],
  });

  // 3. Pago
  await supabase.from('pagos').insert({
    usuario_id: usuarioId,
    referencia: `MANUAL-${Date.now().toString(36)}`,
    monto: monto ?? plan?.precio ?? 0,
    metodo: 'Nequi',
    estado: 'approved',
  });

  return json({ success: true, usuarioId, nuevo, tempPassword, resetLink });
}

async function eliminarUsuario({ usuarioId }: { usuarioId: number }) {
  const { data: user } = await supabase
    .from('usuarios').select('auth_user_id').eq('id', usuarioId).single();

  // Borrar dependencias
  await Promise.all([
    supabase.from('pagos').delete().eq('usuario_id', usuarioId),
    supabase.from('simulacros_realizados').delete().eq('usuario_id', usuarioId),
    supabase.from('conversaciones_ia').delete().eq('usuario_id', usuarioId),
    supabase.from('suscripciones').delete().eq('usuario_id', usuarioId),
  ]);
  await supabase.from('usuarios').delete().eq('id', usuarioId);

  // Borrar auth user
  if (user?.auth_user_id) {
    await supabase.auth.admin.deleteUser(user.auth_user_id);
  }

  return json({ success: true });
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}