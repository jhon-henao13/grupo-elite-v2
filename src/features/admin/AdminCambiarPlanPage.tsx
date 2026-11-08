import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsPersonCircle, BsArrowRepeat, BsDashCircle, BsTrash } from 'react-icons/bs';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import {
  fetchUsuarioConSuscripcion, cambiarPlan, restarDias, quitarPremium,
} from './adminApi';

export const AdminCambiarPlanPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sub, setSub] = useState<any>(null);
  const [planes, setPlanes] = useState<{ id: number; nombre: string; precio: number }[]>([]);
  const [nuevoPlanId, setNuevoPlanId] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    if (!id) return;
    const [s, p] = await Promise.all([
      fetchUsuarioConSuscripcion(Number(id)).catch(() => null),
      supabase.from('planes').select('id, nombre, precio').order('precio'),
    ]);
    setSub(s);
    setPlanes(p.data ?? []);
    if (s?.plan_id) setNuevoPlanId(s.plan_id);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const handleChangePlan = async (e: FormEvent) => {
    e.preventDefault();
    if (!nuevoPlanId || !id) return;
    setBusy(true);
    try {
      await cambiarPlan(Number(id), Number(nuevoPlanId));
      toast.success('Plan actualizado');
      navigate('/admin');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  const handleRestarDias = async () => {
    const input = prompt('¿Cuántos días restar?', '7');
    if (!input || !id) return;
    setBusy(true);
    try {
      await restarDias(Number(id), parseInt(input, 10));
      toast.success('Días restados');
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  const handleQuitarPremium = async () => {
    if (!confirm('¿Quitar premium y cancelar suscripción?') || !id) return;
    setBusy(true);
    try {
      await quitarPremium(Number(id));
      toast.success('Premium removido');
      navigate('/admin');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="text-center py-24 text-gold animate-pulse-glow">Cargando…</div>;
  if (!sub) return <div className="max-w-2xl mx-auto px-4 py-24 text-center text-gray-400">Sin suscripción activa para este usuario.</div>;

  const usuario = sub.usuarios;
  const plan = sub.planes;
  const hoy = Date.now();
  const dias = Math.max(0, Math.ceil((new Date(sub.fecha_fin).getTime() - hoy) / 86400000));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-4 text-sm">
        <BsArrowLeft /> Volver al panel
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass mb-6">
        <div className="flex items-center gap-3 mb-4">
          <BsPersonCircle className="text-4xl text-gold" />
          <div>
            <h1 className="text-xl font-black">{usuario?.nombre}</h1>
            <p className="text-sm text-gray-400">{usuario?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Plan actual</p>
            <p className="font-bold text-gold">{plan?.nombre}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Vence</p>
            <p className="font-bold text-white text-sm">
              {new Date(sub.fecha_fin).toLocaleDateString('es-CO')}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-gray-500 mb-1">Días restantes</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              dias > 7 ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
            }`}>
              {dias} días
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-glass mb-6">
        <h2 className="font-bold mb-4 flex items-center gap-2"><BsArrowRepeat className="text-gold" /> Cambiar Plan</h2>
        <form onSubmit={handleChangePlan} className="space-y-3">
          <select value={nuevoPlanId} onChange={(e) => setNuevoPlanId(Number(e.target.value))}
            required className="input-modern">
            {planes.map((p) => (
              <option key={p.id} value={p.id} className="bg-elite-dark">
                {p.nombre} — ${p.precio.toLocaleString('es-CO')}
              </option>
            ))}
          </select>
          <button type="submit" disabled={busy} className="btn-gold w-full disabled:opacity-50">
            {busy ? 'Cambiando…' : 'Cambiar Plan'}
          </button>
        </form>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-glass">
          <h3 className="font-bold mb-3 flex items-center gap-2"><BsDashCircle className="text-yellow-400" /> Restar días</h3>
          <button onClick={handleRestarDias} disabled={busy} className="w-full py-3 rounded-full bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 font-bold disabled:opacity-50">
            − Restar días
          </button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-glass">
          <h3 className="font-bold mb-3 flex items-center gap-2"><BsTrash className="text-red-400" /> Quitar Premium</h3>
          <button onClick={handleQuitarPremium} disabled={busy} className="w-full py-3 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 font-bold disabled:opacity-50">
            Cancelar suscripción
          </button>
        </motion.div>
      </div>
    </div>
  );
};