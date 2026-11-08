import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-elite-dark/85 border-b border-white/5">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-black text-gradient-gold">Grupo Elite</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{user.email}</span>
                <button onClick={handleSignOut} className="btn-outline-gold text-sm py-1.5 px-4">
                  Salir
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Iniciar Sesión</Link>
              <Link to="/suscripcion" className="btn-gold text-sm py-2 px-5">
                Únete Ahora
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
          aria-label="Menú"
        >
          ☰
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-elite-dark-2 border-t border-white/5"
          >
            <div className="flex flex-col p-4 gap-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-300" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleSignOut} className="btn-outline-gold text-sm">
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300" onClick={() => setMenuOpen(false)}>
                    Iniciar Sesión
                  </Link>
                  <Link to="/suscripcion" className="btn-gold text-sm text-center" onClick={() => setMenuOpen(false)}>
                    Únete Ahora
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};