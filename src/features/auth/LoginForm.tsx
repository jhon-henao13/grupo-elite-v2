import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsEnvelope, BsLock, BsBoxArrowInRight, BsQuestionCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import { authApi } from './authApi';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.signIn(email, password);
      toast.success('¡Bienvenido de vuelta! 🎓');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16">
      <div className="auth-card">
        <div className="text-center mb-8">
          <img src="/img/logo.png" alt="Grupo Elite" className="auth-logo" />
          <h1 className="text-3xl md:text-4xl font-black text-gradient-gold mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-gray-400">Inicia sesión para acceder a tu panel de estudios</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="form-label">
              <BsEnvelope /> Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-modern"
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="form-label">
              <BsLock /> Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-modern"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <BsBoxArrowInRight />
            {loading ? 'Ingresando…' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-accent-blue/10 text-center space-y-2">
          <p className="text-gray-400">
            ¿No tienes cuenta?{' '}
            <Link to="/suscripcion" className="text-gold font-bold hover:underline">
              Suscríbete aquí
            </Link>
          </p>
          <Link
            to="/password/forgot"
            className="inline-flex items-center gap-1 text-gold font-bold hover:underline text-sm"
          >
            <BsQuestionCircle /> ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
};