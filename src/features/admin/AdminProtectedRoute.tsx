import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabaseClient';

export const AdminProtectedRoute = () => {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
  
    let cancelled = false;
  
    (async () => {
      try {
        const { data } = await supabase
          .from('usuarios')
          .select('role')
          .eq('email', user.email)
          .single();
        if (!cancelled) setRole(data?.role ?? null);
      } catch {
        if (!cancelled) setRole(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
  
    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-glow text-gold">Verificando permisos…</div>
      </div>
    );
  }

  if (!user || role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};