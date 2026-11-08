import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowRight, BsCheckCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import { useAuth } from '@/features/auth/AuthContext';
import {
  fetchPreguntas,
  fetchSimulacroInfo,
  guardarResultado,
  type Pregunta,
  type SimulacroInfoData,
} from './simulacrosApi';

export const SimulacroQuizPage = () => {
  const { simulacroId } = useParams<{ simulacroId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [info, setInfo] = useState<SimulacroInfoData | null>(null);
  const [questions, setQuestions] = useState<Pregunta[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime] = useState(() => Date.now());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!simulacroId || !user?.email) return;
    const sid = Number(simulacroId);

    fetchSimulacroInfo(sid, user.email)
      .then((data) => {
        setInfo(data);
        const cantidad =
          data.simulacro.total_preguntas > 0 ? data.simulacro.total_preguntas : 10;
        return fetchPreguntas(sid, cantidad);
      })
      .then(setQuestions)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [simulacroId, user?.email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selected) {
      toast.error('Selecciona una respuesta');
      return;
    }

    const current = questions[currentIndex];
    const isCorrect = selected === current.correcta;
    const nuevoCorrect = correctCount + (isCorrect ? 1 : 0);
    setCorrectCount(nuevoCorrect);

    if (currentIndex === questions.length - 1) {
      setSubmitting(true);
      const durationMin = Math.max(1, Math.round((Date.now() - startTime) / 60000));
      const puntaje = Math.round((nuevoCorrect / questions.length) * 100);

      try {
        if (user?.email && simulacroId) {
          await guardarResultado(user.email, Number(simulacroId), puntaje, durationMin);
        }
        navigate(`/simulacro/${simulacroId}/resultado`, {
          state: {
            puntaje,
            correctas: nuevoCorrect,
            total: questions.length,
            tiempo: durationMin,
            titulo: info?.simulacro.titulo ?? 'Simulacro',
          },
          replace: true,
        });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Error al guardar');
        setSubmitting(false);
      }
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelected('');
    }
  };

  if (loading)
    return <div className="text-center py-24 text-gold animate-pulse-glow">Preparando…</div>;
  if (error) return <div className="text-center py-24 text-red-400">{error}</div>;
  if (!questions.length)
    return <div className="text-center py-24 text-gray-400">Sin preguntas disponibles.</div>;

  const current = questions[currentIndex];
  const progreso = Math.round((currentIndex / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-sm text-white">
            Pregunta {currentIndex + 1} de {questions.length}
          </p>
          <span className="text-xs bg-gradient-primary text-elite-dark font-black px-2 py-0.5 rounded">
            {progreso}%
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progreso}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card-glass p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">{current.pregunta}</h2>
          {current.area && (
            <p className="text-xs text-gray-400 mb-4">
              🏷 Área: <strong className="text-gold">{current.area}</strong>
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {(['a', 'b', 'c', 'd'] as const).map((letter) => {
              const value = current[`opcion_${letter}` as keyof Pregunta] as string;
              const isSelected = selected === letter;
              return (
                <label
                  key={letter}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-gold bg-gold/10'
                      : 'border-white/10 hover:border-gold/40 hover:bg-white/5'
                  }`}
                >
                  <input
                    type="radio"
                    name="respuesta"
                    value={letter}
                    checked={isSelected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="sr-only"
                  />
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                      isSelected ? 'bg-gold text-elite-dark' : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {letter.toUpperCase()}
                  </span>
                  <span className="text-white flex-1">{value}</span>
                </label>
              );
            })}

            <button
              type="submit"
              disabled={!selected || submitting}
              className="btn-gold w-full mt-4 inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                'Guardando…'
              ) : currentIndex === questions.length - 1 ? (
                <>
                  <BsCheckCircle /> Terminar Simulacro
                </>
              ) : (
                <>
                  Siguiente <BsArrowRight />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};