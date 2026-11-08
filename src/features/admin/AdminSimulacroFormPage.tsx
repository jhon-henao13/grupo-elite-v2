import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsPlus } from 'react-icons/bs';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { createSimulacro } from './adminApi';

interface Plan {
  id: number;
  nombre: string;
  precio: number;
}

export const AdminSimulacroFormPage = () => {
  const navigate = useNavigate();
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [totalPreguntas, setTotalPreguntas] = useState(150);
  const [duracion, setDuracion] = useState(180);
  const [planMinimo, setPlanMinimo] = useState(1);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.from('planes').select('id, nombre, precio').order('id').then(({ data }) => {
      setPlanes(data ?? []);
      if (data?.length) setPlanMinimo(data[0].id);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      toast.error('El título es obligatorio');
      return;
    }
    setBusy(true);
    try {
      await createSimulacro({
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        total_preguntas: totalPreguntas,
        duracion_minutos: duracion,
        plan_minimo: planMinimo,
      });
      toast.success('✅ Simulacro creado');
      navigate('/admin');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-4 text-sm">
        <BsArrowLeft /> Volver al panel
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass">
        <h1 className="text-2xl font-black mb-6 flex items-center gap-2">
          ➕ Crear Simulacro ICFES
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">📋 Título *</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              placeholder="Ej: Simulacro ICFES 2024 - Versión Completa"
              className="input-modern"
              disabled={busy}
            />
          </div>

          <div>
            <label className="form-label">📝 Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              placeholder="Describe el simulacro…"
              className="input-modern"
              disabled={busy}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">❓ Total preguntas</label>
              <input
                type="number"
                value={totalPreguntas}
                onChange={(e) => setTotalPreguntas(Number(e.target.value))}
                min={1}
                required
                className="input-modern"
                disabled={busy}
              />
            </div>
            <div>
              <label className="form-label">⏱️ Duración (min)</label>
              <input
                type="number"
                value={duracion}
                onChange={(e) => setDuracion(Number(e.target.value))}
                min={1}
                required
                className="input-modern"
                disabled={busy}
              />
            </div>
          </div>

          <div>
            <label className="form-label">🎯 Plan mínimo requerido</label>
            <select
              value={planMinimo}
              onChange={(e) => setPlanMinimo(Number(e.target.value))}
              required
              className="input-modern"
              disabled={busy}
            >
              {planes.map((p) => (
                <option key={p.id} value={p.id} className="bg-elite-dark">
                  {p.nombre} — ${p.precio.toLocaleString('es-CO')}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={busy}
              className="btn-gold flex-1 inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <BsPlus /> {busy ? 'Creando…' : 'Crear Simulacro'}
            </button>
            <Link to="/admin" className="btn-outline-gold text-center">Cancelar</Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};