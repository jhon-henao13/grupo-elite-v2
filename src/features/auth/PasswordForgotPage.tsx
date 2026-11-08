import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsEnvelope } from 'react-icons/bs';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

export const PasswordForgotPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/password/reset`,
    });
    setLoading(false);
    if (error) {
      toast.error('No se pudo enviar el correo. Verifica el email.');
    } else {
      toast.success('Si el correo existe, recibirás un enlace para restablecer tu contraseña.');
    }
  };

  return (
    <div className="auth-card">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-white mb-2">Recuperar Contraseña</h1>
        <p className="text-gray-400 text-sm">Te enviaremos un enlace para que crees una nueva.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label"><BsEnvelope /> Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-modern"
            placeholder="tu@email.com"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-gold w-full">
          {loading ? 'Enviando…' : 'Enviar enlace de recuperación'}
        </button>
      </form>
      <div className="text-center mt-4">
        <Link to="/login" className="text-gold text-sm inline-flex items-center gap-1">
          <BsArrowLeft /> Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};