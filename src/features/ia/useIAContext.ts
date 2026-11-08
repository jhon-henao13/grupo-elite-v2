import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { fetchMetricas, getPlanUsuario, type Metricas } from './iaApi';

export const useIAContext = () => {
  const { user } = useAuth();
  const [metricas, setMetricas] = useState<Metricas | null>(null);
  const [isElite, setIsElite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;
    Promise.all([fetchMetricas(user.email), getPlanUsuario(user.email)])
      .then(([m, plan]) => {
        setMetricas(m);
        setIsElite(plan.planId === 3);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user?.email]);

  return { user, metricas, isElite, loading, error };
};