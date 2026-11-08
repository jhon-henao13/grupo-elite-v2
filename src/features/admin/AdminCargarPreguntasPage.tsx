import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsCloudDownload } from 'react-icons/bs';
import { toast } from 'sonner';
import { fetchSimulacro, cargarPreguntasDesdeLocal } from './adminApi';

export const AdminCargarPreguntasPage = () => {
  const { id } = useParams<{ id: string }>();
  const simulacroId = Number(id);
  const navigate = useNavigate();

  const [simulacro, setSimulacro] = useState<{ id: number; titulo: string } | null>(null);
  const [cantidad, setCantidad] = useState(10);
  const [area, setArea] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!simulacroId) return;
    fetchSimulacro(simulacroId).then(setSimulacro).catch(() => {});
  }, [simulacroId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (cantidad < 5 || cantidad > 50) {
      toast.error('La cantidad debe estar entre 5 y 50');
      return;
    }
    setBusy(true);
    try {
      const guardadas = await cargarPreguntasDesdeLocal(simulacroId, cantidad, area);
      toast.success(`✅ ${guardadas} preguntas cargadas`);
      navigate(`/admin/simulacro/${simulacroId}/preguntas`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        to={`/admin/simulacro/${simulacroId}/preguntas`}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-4 text-sm"
      >
        <BsArrowLeft /> Volver a preguntas
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass">
        <h1 className="text-2xl font-black mb-2 flex items-center gap-2">
          <BsCloudDownload className="text-gold" /> Cargar Preguntas ICFES
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          <strong className="text-white">Simulacro:</strong> {simulacro?.titulo ?? '…'}
        </p>

        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
          <p className="text-sm text-green-300 font-bold mb-1">📚 Dataset Local</p>
          <p className="text-xs text-gray-300">Preguntas reales del ICFES, 100% confiables, sin dependencias externas.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">🔢 ¿Cuántas preguntas descargar?</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              min={5}
              max={50}
              required
              className="input-modern"
              disabled={busy}
            />
            <small className="text-xs text-gray-500 mt-1 block">Mínimo 5, máximo 50</small>
          </div>

          <div>
            <label className="form-label">🎯 Área temática</label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="input-modern"
              disabled={busy}
            >
              <option value="" className="bg-elite-dark">🎯 TODAS las áreas (recomendado)</option>
              <option value="matematicas" className="bg-elite-dark">📐 Matemáticas</option>
              <option value="ciencias" className="bg-elite-dark">🔬 Ciencias</option>
              <option value="lenguaje" className="bg-elite-dark">📖 Lenguaje</option>
              <option value="sociales" className="bg-elite-dark">🌍 Sociales</option>
              <option value="ingles" className="bg-elite-dark">🗣️ Inglés</option>
              <option value="razonamiento" className="bg-elite-dark">🧠 Razonamiento</option>
            </select>
          </div>

          <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-xl p-4 text-xs text-gray-300 space-y-1">
            <p className="font-bold text-white mb-2">💡 Recomendaciones por plan</p>
            <p>· Plan Despega: 10-20 preguntas</p>
            <p>· Plan Modo Serio: 30-50 preguntas</p>
            <p>· Plan ELITE 500: 100+ preguntas</p>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="btn-gold w-full inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <BsCloudDownload />
            {busy ? 'Cargando…' : 'Cargar preguntas ICFES'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};