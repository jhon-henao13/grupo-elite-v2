import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.migration' });

const URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!URL || !SERVICE_KEY) {
  console.error('❌ Faltan SUPABASE_URL o SUPABASE_SERVICE_KEY en .env.migration');
  process.exit(1);
}

const supabase = createClient(URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function genPassword() {
  return (
    Math.random().toString(36).slice(-6) +
    Math.random().toString(36).slice(-6) +
    '!A1'
  );
}

async function main() {
  console.log('🔍 Cargando usuarios de la tabla `usuarios`…');
  const { data: usuarios, error } = await supabase
    .from('usuarios')
    .select('id, email, nombre, role, auth_user_id');

  if (error) {
    console.error('❌ Error consultando usuarios:', error);
    process.exit(1);
  }

  console.log(`📋 ${usuarios.length} usuarios encontrados.`);

  const { data: authList } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  const existingEmails = new Set((authList?.users ?? []).map((u) => u.email));

  const results = [];

  for (const u of usuarios) {
    if (!u.email) continue;

    if (u.auth_user_id && existingEmails.has(u.email)) {
      console.log(`⏭  ${u.email} — ya migrado (auth_user_id: ${u.auth_user_id})`);
      results.push({ email: u.email, status: 'skipped' });
      continue;
    }

    if (existingEmails.has(u.email)) {
      // Existe en auth pero no tiene auth_user_id vinculado — solo vincular
      const found = authList.users.find((a) => a.email === u.email);
      if (found) {
        await supabase.from('usuarios').update({ auth_user_id: found.id }).eq('id', u.id);
        console.log(`🔗 ${u.email} — vinculado a auth existente`);
        results.push({ email: u.email, status: 'linked' });
      }
      continue;
    }

    const tempPassword = genPassword();

    const { data: created, error: createErr } = await supabase.auth.admin.createUser({
      email: u.email,
      password: tempPassword,
      email_confirm: true,
      user_metadata: { nombre: u.nombre, role: u.role },
    });

    if (createErr || !created.user) {
      console.error(`❌ ${u.email}:`, createErr?.message);
      results.push({ email: u.email, status: 'error', error: createErr?.message });
      continue;
    }

    await supabase.from('usuarios').update({ auth_user_id: created.user.id }).eq('id', u.id);

    // Generar link de recuperación (el usuario define su contraseña)
    const { data: link } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: u.email,
    });

    console.log(`✅ ${u.email}`);
    console.log(`   🔑 Password temporal: ${tempPassword}`);
    console.log(`   🔗 Reset link: ${link?.properties?.action_link ?? 'N/A'}\n`);

    results.push({
      email: u.email,
      status: 'created',
      tempPassword,
      resetLink: link?.properties?.action_link,
    });
  }

  console.log('\n📊 Resumen:');
  console.log(JSON.stringify(results, null, 2));

  console.log('\n⚠️  Envía el reset link de cada usuario por email/WhatsApp.');
  console.log('   Los usuarios DEBEN definir su nueva contraseña con ese link.');
}

main().catch((e) => {
  console.error('💥', e);
  process.exit(1);
});