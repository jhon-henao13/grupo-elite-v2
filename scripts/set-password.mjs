import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.migration' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const cambios = [
  { email: 'estiguar.dev.emails@gmail.com', password: 'administrador2026*' },
  { email: 'jhonestiwarhenao@gmail.com', password: '123456789' },
];

for (const { email, password } of cambios) {
  const { data: perfil } = await supabase
    .from('usuarios')
    .select('auth_user_id')
    .eq('email', email)
    .single();

  if (!perfil?.auth_user_id) {
    console.log(`❌ ${email}: no tiene auth_user_id. Ejecuta migrate-users.mjs primero.`);
    continue;
  }

  const { error } = await supabase.auth.admin.updateUserById(perfil.auth_user_id, {
    password,
  });

  if (error) console.log(`❌ ${email}: ${error.message}`);
  else console.log(`✅ ${email} → contraseña actualizada`);
}