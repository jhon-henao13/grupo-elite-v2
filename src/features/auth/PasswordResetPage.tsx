import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsLock, BsCheckCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

export const PasswordResetPage = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Supabase-js procesa automáticamente el token de la URL y crea una sesión temporal.
  // Si no hay sesión, el enlace es inválido o expiró.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error('El enlace es inválido o ha expirado. Solicita uno nuevo.');
        navigate('/password/forgot');
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error('Error al actualizar la contraseña. Intenta de nuevo.');
    } else {
      toast.success('¡Contraseña actualizada! Ya puedes iniciar sesión.');
      navigate('/login');
    }
  };

  return (
    <div className="auth-card">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-white mb-2">Nueva Contraseña</h1>
        <p className="text-gray-400 text-sm">Crea una contraseña segura para tu cuenta.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label"><BsLock /> Nueva contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-modern" />
        </div>
        <div>
          <label className="form-label"><BsLock /> Confirmar contraseña</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="input-modern" />
        </div>
        <button type="submit" disabled={loading} className="btn-gold w-full inline-flex items-center justify-center gap-2">
          <BsCheckCircle /> {loading ? 'Guardando…' : 'Establecer nueva contraseña'}
        </button>
      </form>
    </div>
  );
};