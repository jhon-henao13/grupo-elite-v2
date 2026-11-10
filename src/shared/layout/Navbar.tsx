import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { LogIn, UserPlus, LogOut, LayoutDashboard, Crown, Menu, X, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Efecto para detectar scroll y dar sombra dinámica al navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const AdminLink = ({ mobile = false }: { mobile?: boolean }) => {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      if (!user?.email) return;
      supabase.from('usuarios').select('role').eq('email', user.email).single()
        .then(({ data }) => setIsAdmin(data?.role === 'admin'));
    }, [user?.email]);
  
    if (!isAdmin) return null;

    if (mobile) {
      return (
        <Link 
          to="/admin" 
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold/10 border border-gold/30 text-gold font-bold text-sm"
        >
          <Crown className="w-4 h-4" /> Panel de Administración
        </Link>
      );
    }

    return (
      <Link to="/admin" className="nav-link text-gold flex items-center gap-1.5 font-bold drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
        <Crown className="w-4 h-4 text-gold animate-bounce" style={{ animationDuration: '2s' }} /> Admin
      </Link>
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'backdrop-blur-2xl bg-elite-dark/90 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
        : 'backdrop-blur-xl bg-elite-dark/75 border-b border-white/5'
    }`}>
      {/* Línea superior dorada brillante con gradiente */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-80 shadow-[0_0_15px_#fbbf24]" />
      
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Logo Institucional con Icono Personalizado */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-gold shadow-[0_0_15px_rgba(251,191,36,0.4)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-elite-dark rounded-[10px] flex items-center justify-center overflow-hidden">
              <img 
                src="/img/icon.png" 
                alt="Grupo Elite Logo" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-gradient-gold tracking-tight">
              Grupo Elite
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase -mt-1 hidden sm:block">
              EdTech ICFES IA
            </span>
          </div>
        </Link>

        {/* Navegación Escritorio */}
        <div className="hidden md:flex items-center gap-8">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link flex items-center gap-2 ${isActive('/dashboard') ? 'text-gold font-bold' : ''}`}
              >
                <LayoutDashboard className="w-4 h-4 text-gold" /> Dashboard
              </Link>
              <AdminLink />
              
              <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-semibold text-gray-200 max-w-[150px] truncate">{user.email}</span>
                  <span className="text-[10px] text-gold flex items-center gap-1 justify-end">
                    <Sparkles className="w-2.5 h-2.5" /> Miembro Pro
                  </span>
                </div>
                <button 
                  onClick={handleSignOut} 
                  className="btn-outline-gold text-xs py-2 px-4 flex items-center gap-1.5"
                  title="Cerrar Sesión"
                >
                  <LogOut className="w-3.5 h-3.5" /> Salir
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link flex items-center gap-2 text-sm">
                <LogIn className="w-4 h-4 text-gold/80" /> Iniciar Sesión
              </Link>
              <Link to="/suscripcion" className="btn-gold text-sm py-2.5 px-6 flex items-center gap-2 shadow-glow-gold">
                <UserPlus className="w-4 h-4" /> Únete Ahora
              </Link>
            </>
          )}
        </div>

        {/* Botón Menú Hamburguesa (Móvil) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-gold hover:bg-white/10 transition-colors"
          aria-label="Abrir Menú"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Menú Desplegable Móvil con Animación Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-elite-dark-2/95 backdrop-blur-2xl border-t border-white/10 shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 mb-1">
                    <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center text-gold font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-gray-400">Sesión activa</p>
                      <p className="text-sm text-white font-semibold truncate">{user.email}</p>
                    </div>
                  </div>

                  <Link 
                    to="/dashboard" 
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-gray-200 hover:text-gold hover:bg-gold/10 transition-all font-medium"
                  >
                    <LayoutDashboard className="w-5 h-5 text-gold" /> Dashboard
                  </Link>

                  <AdminLink mobile={true} />

                  <button 
                    onClick={() => { setMenuOpen(false); handleSignOut(); }} 
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 font-semibold text-sm hover:bg-red-500/20 transition-all mt-2"
                  >
                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                  >
                    <LogIn className="w-4 h-4 text-gold" /> Iniciar Sesión
                  </Link>
                  <Link 
                    to="/suscripcion" 
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-gold text-elite-dark font-black text-sm shadow-glow-gold transition-transform active:scale-95"
                  >
                    <UserPlus className="w-4 h-4" /> Únete Ahora
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