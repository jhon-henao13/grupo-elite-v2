import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { fetchDashboardData, type DashboardData } from './dashboardApi';

export const useDashboardData = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    fetchDashboardData(user.email)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user?.email]);

  return { data, loading, error };
};