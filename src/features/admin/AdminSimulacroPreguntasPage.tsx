import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BsArrowLeft, BsCloudDownload, BsPlusCircle, BsTrash, BsCheckCircle,
} from 'react-icons/bs';
import { toast } from 'sonner';
import {
  fetchSimulacro, fetchPreguntasBySimulacro, createPregunta, deletePregunta,
  type PreguntaAdmin,
} from './adminApi';

export const AdminSimulacroPreguntasPage = () => {
  const { id } = useParams<{ id: string }>();
  const simulacroId = Number(id);

  const [simulacro, setSimulacro] = useState<{ id: number; titulo: string } | null>(null);
  const [preguntas, setPreguntas] = useState<PreguntaAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [formOpen, setFormOpen] = useState(false);
  const [pregunta, setPregunta] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [correcta, setCorrecta] = useState<'a' | 'b' | 'c' | 'd'>('a');
  const [area, setArea] = useState('');

  const load = async () => {
    if (!simulacroId) return;
    setLoading(true);
    try {
      const [s, p] = await Promise.all([
        fetchSimulacro(simulacroId),
        fetchPreguntasBySimulacro(simulacroId),
      ]);
      setSimulacro(s);
      setPreguntas(p);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [simulacroId]);

  const handleCrear = async (e: FormEvent) => {
    e.preventDefault();
    if (!pregunta.trim() || !a || !b || !c || !d) {
      toast.error('Completa todos los campos');
      return;
    }
    setBusy(true);
    try {
      await createPregunta({
        simulacro_id: simulacroId,
        pregunta: pregunta.trim(),
        opcion_a: a,
        opcion_b: b,
        opcion_c: c,
        opcion_d: d,
        correcta,
        area: area.trim() || null,
      });
      toast.success('✅ Pregunta agregada');
      setPregunta(''); setA(''); setB(''); setC(''); setD(''); setCorrecta('a'); setArea('');
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (preguntaId: number) => {
    if (!confirm('¿Eliminar esta pregunta?')) return;
    setBusy(true);
    try {
      await deletePregunta(preguntaId);
      toast.success('Pregunta eliminada');
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <div className="text-center py-24 text-gold animate-pulse-glow">Cargando preguntas…</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-4 text-sm">
        <BsArrowLeft /> Volver al panel
      </Link>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-black">Preguntas de: {simulacro?.titulo}</h1>
        <p className="text-sm text-gray-400 mt-1">Total: {preguntas.length} preguntas</p>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Link
          to={`/admin/simulacro/${simulacroId}/cargar-preguntas`}
          className="btn-gold inline-flex items-center gap-2"
        >
          <BsCloudDownload /> Cargar desde API
        </Link>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="btn-outline-gold inline-flex items-center gap-2"
        >
          <BsPlusCircle /> {formOpen ? 'Ocultar formulario' : 'Agregar manual'}
        </button>
      </div>

      {formOpen && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleCrear}
          className="card-glass mb-6 space-y-3"
        >
          <h3 className="font-bold">Agregar pregunta manual</h3>
          <input
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            placeholder="Texto de la pregunta"
            required
            className="input-modern"
            disabled={busy}
          />
          <div className="grid md:grid-cols-2 gap-3">
            <input value={a} onChange={(e) => setA(e.target.value)} placeholder="Opción A" required className="input-modern" disabled={busy} />
            <input value={b} onChange={(e) => setB(e.target.value)} placeholder="Opción B" required className="input-modern" disabled={busy} />
            <input value={c} onChange={(e) => setC(e.target.value)} placeholder="Opción C" required className="input-modern" disabled={busy} />
            <input value={d} onChange={(e) => setD(e.target.value)} placeholder="Opción D" required className="input-modern" disabled={busy} />
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <select value={correcta} onChange={(e) => setCorrecta(e.target.value as any)} className="input-modern" disabled={busy}>
              <option value="a" className="bg-elite-dark">Correcta: A</option>
              <option value="b" className="bg-elite-dark">Correcta: B</option>
              <option value="c" className="bg-elite-dark">Correcta: C</option>
              <option value="d" className="bg-elite-dark">Correcta: D</option>
            </select>
            <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Área (opcional)" className="input-modern" disabled={busy} />
          </div>
          <button type="submit" disabled={busy} className="btn-gold w-full inline-flex items-center justify-center gap-2 disabled:opacity-50">
            <BsCheckCircle /> {busy ? 'Guardando…' : 'Agregar pregunta'}
          </button>
        </motion.form>
      )}

      <div className="card-glass">
        <h3 className="font-bold mb-3">Preguntas creadas ({preguntas.length})</h3>
        {preguntas.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">No hay preguntas aún. Usa "Cargar desde API" o "Agregar manual".</p>
        ) : (
          <ul className="space-y-2">
            {preguntas.map((p, i) => (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
              >
                <span className="text-xs font-bold text-gold shrink-0 mt-0.5">#{p.id}</span>
                <div className="flex-1 text-sm">
                  <p className="text-white mb-1">{p.pregunta}</p>
                  <p className="text-xs text-gray-400">
                    Correcta: <span className="text-gold font-bold">{p.correcta.toUpperCase()}</span>
                    {p.area && <> · Área: <span className="text-accent-cyan">{p.area}</span></>}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={busy}
                  className="text-red-400 hover:text-red-300 text-sm disabled:opacity-50"
                >
                  <BsTrash />
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};