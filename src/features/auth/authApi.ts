import { supabase } from '@/lib/supabaseClient';

export const authApi = {
  // Iniciar sesión
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Registro (equivalente a tu inserción en 'usuarios' + hashing de bcrypt)
  signUp: async (email: string, password: string, nombre: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: nombre, // Se guarda en 'user_metadata'
          role: 'free',   // Rol por defecto
        },
      },
    });
    if (error) throw error;
    return data;
  },

  // Cerrar sesión
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Obtener la sesión actual
  getSession: () => supabase.auth.getSession(),
};